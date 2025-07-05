import { useEffect, useState } from "react";
import { MovieCard } from "../../common/MovieCard";
import axios from "axios";

export const MostLiked = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get("https://yts.mx/api/v2/list_movies.json", {
        params: {
          limit: 10,
          sort_by: "like_count",
          order_by: "desc",
        },
      });

      const likedMovies = res.data?.data?.movies;
      if (likedMovies) {
        setMovies(likedMovies);
      }
    } catch (err) {
      console.error("Error fetching liked movies", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="most-liked" className="w-screen py-[80px] bg-gray-800">
      <div className="px-[12vw]">
        <h2 className="text-2xl font-bold text-white mb-6">
          👍 Most Liked Movies
        </h2>

        <div className="flex gap-6 justify-start flex-wrap text-white">
          {loading ? (
            <div className="text-sm">Loading...</div>
          ) : movies.length === 0 ? (
            <div>No movies found.</div>
          ) : (
            movies.map((movie, key) => <MovieCard movie={movie} key={key} />)
          )}
        </div>
      </div>
    </section>
  );
};
