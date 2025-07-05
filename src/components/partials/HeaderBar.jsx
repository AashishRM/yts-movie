import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HeaderBar = () => {
  const [keyword, setkeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setkeyword("");
    }
  };

  const scrollToSection = (id) => {
    navigate("/");
    const interval = setInterval(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        clearInterval(interval);
      }
    }, 100);
  };

  return (
    <nav className="flex items-center justify-between fixed top-0 left-0 h-[70px] w-full bg-gray-900 text-white px-[12vw] shadow-md z-50">
      <div className="logo">
        <a href="/">
          <img
            src="https://yts.mx/assets/images/website/logo-YTS.svg"
            alt="yts-logo"
            className="h-[40px]"
          />
        </a>
      </div>

      <div className="nav-items flex items-center space-x-6">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setkeyword(e.target.value)}
            placeholder="Quick Search"
            className="px-3 py-1 rounded-l bg-white text-black"
          />
          <button
            type="submit"
            className="px-3 py-1 rounded-r bg-white text-red-700 hover:bg-red-600 hover:text-white transition"
          >
            Search
          </button>
        </form>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "home" } });
          }}
          className="px-4 py-2 hover:bg-white hover:text-red-700 rounded transition"
        >
          Home
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "latest" } });
          }}
          className="px-4 py-2 hover:bg-white hover:text-red-700 rounded transition"
        >
          Latest
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "popular" } });
          }}
          className="px-4 py-2 hover:bg-white hover:text-red-700 rounded transition"
        >
          Popular
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "most-liked" } });
          }}
          className="px-4 py-2 hover:bg-white hover:text-red-700 rounded transition"
        >
          Most Liked
        </a>
      </div>
    </nav>
  );
};
