import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HeaderBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;
    if (onSearch) {
      onSearch(trimmedKeyword);
    }
    navigate(`/search/${trimmedKeyword}`);
    setKeyword("");
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 md:px-[12vw] h-[70px]">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="https://yts.mx/assets/images/website/logo-YTS.svg"
            alt="yts-logo"
            className="h-[40px]"
          />
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-6">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Quick Search"
              className="px-3 py-1 rounded-l bg-white text-black focus:outline-none w-40 lg:w-56"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded-r bg-white text-red-700 hover:bg-red-600 hover:text-white transition"
            >
              Search
            </button>
          </form>

          {["Home", "Latest", "Popular", "Most Liked"].map((item) => (
            <button
              key={item}
              onClick={() =>
                navigate("/", {
                  state: { scrollTo: item.toLowerCase().replace(" ", "-") },
                })
              }
              className="px-4 py-2 hover:bg-white hover:text-red-700 rounded transition"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-800 py-4 space-y-4">
          <form onSubmit={handleSubmit} className="flex w-11/12">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Quick Search"
              className="px-3 py-1 rounded-l bg-white text-black focus:outline-none flex-1"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded-r bg-white text-red-700 hover:bg-red-600 hover:text-white transition"
            >
              Search
            </button>
          </form>

          {["Home", "Latest", "Popular", "Most Liked"].map((item) => (
            <button
              key={item}
              onClick={() => {
                navigate("/", {
                  state: { scrollTo: item.toLowerCase().replace(" ", "-") },
                });
                setMenuOpen(false);
              }}
              className="w-11/12 px-4 py-2 text-center hover:bg-white hover:text-red-700 rounded transition"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
