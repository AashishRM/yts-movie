import { useEffect, useState } from "react";
import { MovieCard } from "../../common/MovieCard";
import axios from "axios";

export const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cachedPages, setCachedPages] = useState({});
  const limit = 10;
  const MAX_PAGES = 6;

  const loadData = async (append = false) => {
    // Check cache first
    if (cachedPages[page]) {
      if (append) {
        setMovies((prev) => {
          const seen = new Set(prev.map((m) => m.id));
          const newMovies = cachedPages[page].filter((m) => !seen.has(m.id));
          return [...prev, ...newMovies];
        });
      } else {
        setMovies(cachedPages[page]);
      }
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("https://yts.mx/api/v2/list_movies.json", {
        params: {
          limit,
          page,
          sort_by: "rating",
          order_by: "desc",
        },
      });

      const newMovies = res.data?.data?.movies || [];
      const movieCount = res.data?.data?.movie_count || 0;

      // Cache this page
      setCachedPages((prev) => ({
        ...prev,
        [page]: newMovies,
      }));

      // Update movies list with deduplication
      if (append) {
        setMovies((prev) => {
          const seen = new Set(prev.map((m) => m.id));
          const uniqueNewMovies = newMovies.filter(
            (movie) => !seen.has(movie.id)
          );
          return [...prev, ...uniqueNewMovies];
        });
      } else {
        setMovies(newMovies);
      }

      // Stop if max pages reached or no more movies
      if (page >= MAX_PAGES || movies.length + newMovies.length >= movieCount) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading popular movies", err);
      if (page === 1) setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (loading || !hasMore || page >= MAX_PAGES) return;
    setLoading(true);
    setPage((prev) => prev + 1);
  };

  const handleClearAll = () => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setCachedPages({});
    setLoading(true);
    loadData(); // Reload first page
  };

  // Initial load with mount guard
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (mounted) {
        await loadData();
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  // Load more when page changes (if not cached)
  useEffect(() => {
    if (page > 1 && !cachedPages[page]) {
      setLoading(true);
      loadData(true);
    }
  }, [page]);

  return (
    <section
      id="popular"
      className="w-full py-8 sm:py-10 md:py-20 bg-gray-900"
      style={{ scrollMarginTop: "100px" }}
    >
      <div
        className="px-4 sm:px-6 md:px-[12vw] max-w-screen-2xl mx-auto"
        style={{ scrollMarginTop: "100px" }}
      >
        {/* Header */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-2">
          🔥 Popular Movies
        </h2>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {/* First Load Skeletons */}
          {loading && page === 1
            ? Array.from({ length: 10 }).map((_, index) => (
                <MovieCard skeleton key={`skeleton-first-${index}`} />
              ))
            : null}

          {/* Load More Skeletons */}
          {page > 1 && loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <MovieCard skeleton key={`skeleton-more-${index}`} />
              ))
            : null}

          {/* No Movies Found */}
          {!loading && movies.length === 0 && page === 1 ? (
            <div className="col-span-full text-center py-12 text-gray-400">
              <p>No popular movies found.</p>
            </div>
          ) : null}

          {/* Render Real Movies (only if not loading) */}
          {!loading &&
            movies.length > 0 &&
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
        </div>

        {/* Load More Button */}
        {!loading && hasMore && movies.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-medium px-6 py-3 rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              🔼 Load More
            </button>
          </div>
        )}

        {/* Back to Top & Clear All Buttons */}
        {page > 2 && movies.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {/* Back to Top */}
            <button
              onClick={() => {
                const section = document.getElementById("popular");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-sm px-5 py-2.5 rounded-full transition transform hover:scale-105 shadow-md"
            >
              ⬆️ Back to Top
            </button>

            {/* Clear All */}
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-sm px-5 py-2.5 rounded-full transition transform hover:scale-105 shadow-md"
            >
              🗑️ Clear All
            </button>
          </div>
        )}

        {/* End of List Message */}
        {!loading && !hasMore && movies.length > 0 && (
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Showing top {MAX_PAGES * limit} popular movies.</p>
          </div>
        )}
      </div>
    </section>
  );
};
