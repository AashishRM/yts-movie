import { useNavigate } from "react-router-dom";

export const MovieCard = ({ movie, skeleton }) => {
  const navigate = useNavigate();

  if (skeleton) {
    return (
      <div className="movie-card bg-white rounded-xl overflow-hidden shadow-md w-full max-w-xs mx-auto animate-pulse">
        <div className="w-full h-auto aspect-[2/3] bg-gray-300"></div>
        <div className="p-3 bg-gray-50">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="movie-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 transform w-full max-w-xs sm:max-w-[280px] mx-auto"
    >
      <img
        src={
          movie.medium_cover_image ||
          "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.title}
        className="w-full h-auto aspect-[2/3] object-cover object-center"
      />
      <div className="p-3 bg-gray-50">
        <h3
          className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[2.8em]"
          title={movie.title}
        >
          {movie.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{movie.year}</p>
      </div>
    </div>
  );
};
