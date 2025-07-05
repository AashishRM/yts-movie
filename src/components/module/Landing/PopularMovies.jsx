import { useEffect, useState } from "react";
import { MovieCard } from "../../common/MovieCard";
import axios from "axios";

export const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get('https://yts.mx/api/v2/list_movies.json', {
        params: {
          limit: 10,
          sort_by: 'rating',   // sorted by popularity
          order_by: 'desc'
        }
      });

      const movieList = res.data?.data?.movies;
      if (movieList) {
        setMovies(movieList);
      }
    } catch (err) {
      console.error("Error loading popular movies", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="popular" className="px-[12vw] py-[80px] max-w-screen bg-gray-800">
      <div className="font-bold text-2xl text-white">🔥 Popular Movies</div>

      <div className="flex gap-6 flex-wrap justify-start mt-6 w-full text-white">
        {loading ? (
          <div className="text-sm">Loading...</div>
        ) : movies.length === 0 ? (
          <div>No popular movies found.</div>
        ) : (
          movies.map((movie, key) => <MovieCard movie={movie} key={key} />)
        )}
      </div>
    </section>
  );
};

