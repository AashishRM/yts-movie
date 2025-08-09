import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef();

  useEffect(() => {
    loadRandomMovies();
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const loadRandomMovies = async () => {
    try {
      const res = await axios.get("https://yts.mx/api/v2/list_movies.json", {
        params: {
          limit: 10,
          sort_by: "download_count",
          order_by: "desc",
        },
      });
      if (res.data?.data?.movies) {
        setMovies(res.data.data.movies);
      }
    } catch (err) {
      console.error("Error fetching movies", err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToIndex = (index) => {
    const width = window.innerWidth;
    const newIndex = (index + movies.length) % movies.length;
    carouselRef.current.scrollTo({
      left: width * newIndex,
      behavior: "smooth",
    });
    setCurrentIndex(newIndex);
  };

  const scrollNext = () => scrollToIndex(currentIndex + 1);
  const scrollPrev = () => scrollToIndex(currentIndex - 1);

  return (
    <div id="home" className="relative h-screen overflow-hidden">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-full text-white">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      )}

      {/* Main Carousel Container */}
      {!loading && (
        <div
          ref={carouselRef}
          className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory h-full w-full scroll-smooth"
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
        >
          {movies.map((movie) => (
            <section
              key={movie.id}
              className="w-screen h-full flex-shrink-0 snap-center relative text-white"
              style={{
                backgroundImage: `url(${
                  movie.background_image_original || movie.large_cover_image
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay with gradient + scrollable content */}
              <div className="h-full flex items-center px-4 md:px-[12vw] bg-black/60 backdrop-blur-[2px] overflow-y-auto">
                {/* Content container */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 max-w-6xl mx-auto py-8">
                  {/* Movie Poster */}
                  <img
                    src={movie.large_cover_image || "/placeholder.jpg"}
                    alt={movie.title}
                    className="w-48 h-auto md:w-[300px] md:h-[500px] object-cover rounded shadow-xl flex-shrink-0"
                    loading="lazy"
                  />

                  {/* Text Content */}
                  <div className="text-center md:text-left max-w-xl md:max-w-2xl space-y-4 flex-shrink">
                    <h1
                      className="text-2xl md:text-4xl font-bold text-red-600"
                      style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                    >
                      {movie.title}
                    </h1>

                    <div className="text-sm md:text-base space-y-1 text-gray-100">
                      <p>
                        <strong>Rating:</strong> ⭐ {movie.rating} / 10
                      </p>
                      <p>
                        <strong>Runtime:</strong> ⏱ {movie.runtime} mins
                      </p>
                      <p>
                        <strong>Genres:</strong> 🎭{" "}
                        {movie.genres?.join(", ") || "N/A"}
                      </p>
                    </div>

                    <p
                      className="text-xs md:text-sm leading-relaxed text-gray-200 max-h-32 overflow-y-auto pr-2"
                      title={movie.description_full || movie.description_intro}
                    >
                      {movie.description_full ||
                        movie.description_intro ||
                        "No description available."}
                    </p>

                    {/* Download Section - Responsive & Scrollable */}
                    <div className="mt-4">
                      <h2 className="text-base md:text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        🎬 Download
                      </h2>
                      <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-2">
                        {movie.torrents?.length > 0 ? (
                          movie.torrents.map((torrent, idx) => (
                            <a
                              key={idx}
                              href={torrent.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs md:text-sm whitespace-nowrap transition"
                            >
                              {torrent.quality} ({torrent.type}) -{" "}
                              {torrent.size}
                            </a>
                          ))
                        ) : (
                          <span className="text-gray-300 text-sm">
                            No torrents available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Carousel Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-red-500 text-white p-2 md:p-3 rounded-full text-lg md:text-2xl hover:bg-red-600 transition z-10 shadow-lg"
      >
        ←
      </button>

      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-red-500 text-white p-2 md:p-3 rounded-full text-lg md:text-2xl hover:bg-red-600 transition z-10 shadow-lg"
      >
        →
      </button>
    </div>
  );
};
