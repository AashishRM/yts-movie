import { useNavigate } from "react-router-dom";

export const FooterBar = () => {
  const navigate = useNavigate();

  const handleScrollTo = (e, id) => {
    e.preventDefault();

    // Always go to home first
    navigate("/", {
      state: { scrollTo: id },
      preventScrollReset: true,
    });
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="mx-auto px-[12vw] flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Logo & Copyright */}
        <div>
          <a
            href="#home"
            className="inline-block mb-2"
            onClick={(e) => handleScrollTo(e, "home")}
          >
            <img
              src="https://yts.mx/assets/images/website/logo-YTS.svg"
              alt="YTS Logo"
              className="h-10"
            />
          </a>
          <p className="text-sm text-gray-300 mt-2">
            © {new Date().getFullYear()} YTS.mx. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <button
            onClick={(e) => handleScrollTo(e, "latest")}
            className="text-base text-gray-200 hover:text-white hover:underline transition bg-transparent border-none cursor-pointer"
          >
            Latest
          </button>
          <button
            onClick={(e) => handleScrollTo(e, "popular")}
            className="text-base text-gray-200 hover:text-white hover:underline transition bg-transparent border-none cursor-pointer"
          >
            Popular
          </button>
          <button
            onClick={(e) => handleScrollTo(e, "most-liked")}
            className="text-base text-gray-200 hover:text-white hover:underline transition bg-transparent border-none cursor-pointer"
          >
            Most Liked
          </button>
        </div>

        {/* Credit */}
        <div className="text-sm text-gray-400">
          Built by{" "}
          <a
            href="https://github.com/AashishRM"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition"
          >
            Aashish Ruchal Magar
          </a>
        </div>
      </div>
    </footer>
  );
};
