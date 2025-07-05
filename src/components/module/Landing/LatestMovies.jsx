import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCard } from "../../common/MovieCard";

export const LatestMovies = () => {
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
          sort_by: "date_added",
          order_by: "desc",
        },
      });
      if (res.data?.data?.movies) {
        setMovies(res.data.data.movies);
      }
    } catch (err) {
      console.error("Error fetching movies", err);
    }
    setLoading(false);
  };

  return (
    <section id="latest" className="px-[12vw] py-[80px] max-w-screen bg-gray-800">
      <div className="font-bold text-2xl text-white">🍿 Latest Movies</div>
      <div className="flex gap-[16px] flex-wrap justify-between mt-[24px] w-full text-white">
        {loading ? (
          <div>Loading...</div>
        ) : movies.length === 0 ? (
          <div>No movies found.</div>
        ) : (
          movies.map((v, key) => <MovieCard movie={v} key={key} />)
        )}
      </div>
    </section>
  );
};
