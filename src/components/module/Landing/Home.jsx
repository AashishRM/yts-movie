import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ add this
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef();

  useEffect(() => {
    loadRandomMovies();
  }, []);

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
    const newIndex = (index + movies.length) % movies.length; // loop around
    carouselRef.current.scrollTo({
      left: width * newIndex,
      behavior: "smooth",
    });
    setCurrentIndex(newIndex);
  };

  const scrollNext = () => scrollToIndex(currentIndex + 1);
  const scrollPrev = () => scrollToIndex(currentIndex - 1);

  return (
    <div id="home" className="relative">
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden snap-x snap-mandatory h-screen w-full scroll-smooth"
      >
        {movies.map((movie, _index) => (
          <section
            key={movie.id}
            className="w-screen h-screen flex-shrink-0 snap-center relative text-white"
            style={{
              backgroundImage: `url(${
                movie.background_image_original || movie.large_cover_image
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="h-full flex items-center px-[12vw]">
              <div className="flex items-center gap-10 max-w-6xl">
                <img
                  src={movie.large_cover_image}
                  alt={movie.title}
                  className="w-[300px] h-[500px] object-cover rounded shadow-xl"
                />
                <div>
                  <h1
                    className="text-4xl font-bold mb-3 text-red-700"
                    style={{
                      textShadow: "2px 2px 4px white",
                    }}
                  >
                    {movie.title}
                  </h1>
                  <p>
                    <strong>Rating:</strong> ⭐ {movie.rating} / 10
                  </p>
                  <p>
                    <strong>Runtime:</strong> ⏱ {movie.runtime} mins
                  </p>
                  <p>
                    <strong>Genres:</strong> 🎭 {movie.genres?.join(", ")}
                  </p>
                  <br />
                  <p className="mb-4 text-white leading-relaxed">
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
            </div>
          </section>
        ))}
      </div>

      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-2xl hover:bg-red-600 transition"
      >
        ←
      </button>

      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-2xl hover:bg-red-600 transition"
      >
        →
      </button>
    </div>
  );
};
