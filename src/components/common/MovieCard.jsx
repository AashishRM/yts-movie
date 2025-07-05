import { useNavigate } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="movie-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-[200px] cursor-pointer hover:scale-105"
    >
      <img
        src={movie.medium_cover_image}
        alt={movie.title}
        className="w-full h-[300px] object-cover"
      />
      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-500">{movie.year}</p>
      </div>
    </div>
  );
};
