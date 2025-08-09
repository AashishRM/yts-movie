import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://yts.mx/api/v2/movie_details.json",
          {
            params: { movie_id: id },
          }
        );
        if (res.data?.data?.movie) {
          setMovie(res.data.data.movie);
        } else {
          setMovie(null);
        }
      } catch (err) {
        console.error("Failed to fetch movie details", err);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetails();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[75vh] p-6">
        <p className="text-xl text-gray-300">Loading movie details...</p>
      </div>
    );
  }

  // Not Found
  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-[75vh] p-6 text-center">
        <div>
          <h2 className="text-2xl text-red-500 mb-2">Movie Not Found</h2>
          <p className="text-gray-400">
            The requested movie could not be loaded.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[75vh] bg-gray-900 text-white pt-4"
      id="movie-details"
    >
      {/* Responsive padding */}
      <div className="px-4 sm:px-6 lg:px-[12vw] py-8 sm:py-12">
        {/* Flex layout: column on mobile, row on lg */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Movie Poster */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <img
              src={movie.large_cover_image}
              alt={movie.title}
              className="w-64 sm:w-72 lg:w-80 h-auto rounded shadow-lg object-cover mx-auto lg:mx-0"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1 space-y-5 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 leading-tight">
              {movie.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-300">{movie.year}</p>

            {/* Movie Metadata */}
            <div className="text-sm sm:text-base text-gray-200 space-y-2">
              <p>
                <strong>Rating:</strong> ⭐ {movie.rating} / 10
              </p>
              <p>
                <strong>Runtime:</strong> ⏱ {movie.runtime} mins
              </p>
              <p>
                <strong>Genres:</strong> 🎭 {movie.genres?.join(", ") || "N/A"}
              </p>
            </div>

            {/* Scrollable Description */}
            <div className="text-sm sm:text-base text-gray-300 leading-relaxed max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {movie.description_full ||
                movie.description_intro ||
                "No description available."}
            </div>

            {/* Download Links */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                🎬 Download
              </h2>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {movie.torrents?.length > 0 ? (
                  movie.torrents.map((torrent, idx) => (
                    <a
                      key={idx}
                      href={torrent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm whitespace-nowrap transition-all duration-200 transform hover:scale-105"
                    >
                      {torrent.quality} ({torrent.type}) - {torrent.size}
                    </a>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">
                    No torrents available
                  </span>
                )}
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded text-sm font-medium transition hover:scale-105"
              >
                ← Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
