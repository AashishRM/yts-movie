import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCard } from "../../common/MovieCard";

export const ResultMovies = ({ keyword }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, [keyword]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://yts.mx/api/v2/list_movies.json", {
        params: {
          limit: 10,
          sort_by: "date_added",
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
  };

  return (
    <section className="min-h-[75vh] w-screen py-[10px] bg-gray-800">
      <div className="px-[12vw]">
        <h2 className="text-2xl font-bold text-white mb-6">
          🔍 Search Results for:{" "}
          <span className="text-red-600 underline">{keyword}</span>
        </h2>

        <div className="flex gap-6 justify-start flex-wrap text-white">
          {loading ? (
            <div className="text-sm">Loading...</div>
          ) : movies.length === 0 ? (
            <div>No movies found.</div>
          ) : (
            movies.map((movie, index) => <MovieCard key={index} movie={movie} />)
          )}
        </div>
      </div>
    </section>
  );
};
