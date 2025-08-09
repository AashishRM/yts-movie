import { useEffect, useState, useRef } from "react";
import { MovieCard } from "../../common/MovieCard";
import axios from "axios";

export const ResultMovies = ({ keyword }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const resultsRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Debounced search
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (!keyword?.trim()) {
      setMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceTimeout.current = setTimeout(async () => {
      try {
        const res = await axios.get("https://yts.mx/api/v2/list_movies.json", {
          params: {
            limit: 20,
            sort_by: "year",
            order_by: "desc",
            query_term: keyword,
          },
        });

        const result = res.data?.data?.movies || [];
        setMovies(result);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [keyword]);

  // Detect scroll to show "Back to Top"
  useEffect(() => {
    const handleScroll = () => {
      if (resultsRef.current) {
        const { top } = resultsRef.current.getBoundingClientRect();
        setShowBackToTop(top < -100); // Show after scrolling past
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Empty state
  if (!keyword?.trim()) {
    return (
      <section className="min-h-[75vh] w-full py-12 bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Enter a search term to begin.</p>
      </section>
    );
  }

  return (
    <section
      ref={resultsRef}
      className="min-h-[75vh] w-full py-8 sm:py-10 md:py-20 bg-gray-900"
      id="search-results"
    >
      <div className="px-4 sm:px-6 md:px-[12vw] max-w-screen-2xl mx-auto">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">
          🔍 Search Results for: <span className="text-red-400">{keyword}</span>
        </h2>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {loading ? (
            // Skeletons
            Array.from({ length: 10 }).map((_, index) => (
              <MovieCard skeleton key={`skeleton-search-${index}`} />
            ))
          ) : movies.length === 0 ? (
            // No results
            <div className="col-span-full text-center py-12 text-gray-400">
              <p>
                No movies found for <strong>"{keyword}"</strong>.
              </p>
            </div>
          ) : (
            // Render movies
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          )}
        </div>

        {/* Back to Top Button (only when scrolled) */}
        {showBackToTop && movies.length > 0 && (
          <div className="text-center mt-12 transition-opacity duration-300">
            <button
              onClick={() => {
                const section = document.getElementById("search-results");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-sm px-5 py-2.5 rounded-full transition transform hover:scale-105 shadow-md"
            >
              ⬆️ Back to Top
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
