export const FooterBar = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="mx-auto px-[12vw] flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Logo and Text */}
        <div className="text-center md:text-left">
          <div className="text-xl font-bold mb-1"><a href="/">
          <img
            src="https://yts.mx/assets/images/website/logo-YTS.svg"
            alt="yts-logo"
            className="h-[40px]"
          />
        </a></div>
          <p className="text-md text-gray-200">
            © {new Date().getFullYear()} YTS.mx. All rights reserved.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex gap-6 text-md">
          <a href="#latest" className="hover:underline px-4 py-2">Latest</a>
          <a href="#popular" className="hover:underline px-4 py-2">Popular</a>
          <a href="#most-liked" className="hover:underline px-4 py-2">Most Liked</a>
        </div>

        {/* Right: Socials or Credits */}
        <div className="text-md text-gray-200 text-center md:text-right">
          Built by <a href="https://github.com/AashishRM" className="underline hover:text-white">Aashish Ruchal Magar</a>
        </div>
      </div>
    </footer>
  );
};
