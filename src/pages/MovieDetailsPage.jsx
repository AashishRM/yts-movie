import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await axios.get("https://yts.mx/api/v2/movie_details.json", {
        params: { movie_id: id },
      });
      setMovie(res.data?.data?.movie);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="p-[12vw] py-[100px]">Loading...</div>;

  return (
    <div className="min-h-[75vh] p-[12vw] py-[100px] bg-gray-800 text-white">
      <div className="flex flex-col lg:flex-row gap-10">
        <img
          src={movie.large_cover_image}
          alt={movie.title}
          className="w-[300px] rounded shadow-md"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-red-500">
            {movie.title}
          </h1>
          <p className="text-sm text-gray-100 mb-2">{movie.year}</p>

          <div className="text-sm text-gray-100 mb-4">
            <p>
              <strong>Rating:</strong> ⭐ {movie.rating} / 10
            </p>
            <p>
              <strong>Runtime:</strong> ⏱ {movie.runtime} mins
            </p>
            <p>
              <strong>Genres:</strong> 🎭 {movie.genres?.join(", ")}
            </p>
          </div>

          <p className="mb-4 text-gray-300 leading-relaxed">
            {movie.description_full || movie.description_intro}
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">🎬 Download</h2>
            {movie.torrents?.map((torrent, idx) => (
              <a
                key={idx}
                href={torrent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mr-3 mb-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
              >
                {torrent.quality} ({torrent.type}) - {torrent.size}
              </a>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="inline-block mr-3 mb-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        ← Go Back
      </button>
    </div>
  );
};
