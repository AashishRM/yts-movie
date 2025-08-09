import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Home } from "../components/module/Landing/Home";
import { LatestMovies } from "../components/module/Landing/LatestMovies";
import { PopularMovies } from "../components/module/Landing/PopularMovies";
import { MostLiked } from "../components/module/Landing/MostLiked";

export const LandingPage = () => {
  const location = useLocation();
  const hasScrolled = useRef(false); // Prevent multiple scrolls

  useEffect(() => {
    // Avoid multiple executions
    if (hasScrolled.current) return;

    const { scrollTo } = location.state || {};
    if (!scrollTo) return;

    const section = document.getElementById(scrollTo);
    if (section) {
      // Scroll immediately if element exists
      section.scrollIntoView({ behavior: "smooth" });
      hasScrolled.current = true;
    } else {
      // If not found, try again once after render settles
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          hasScrolled.current = true;
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    // Reset if navigating to same page with new scroll target
    return () => {
      if (!location.state?.scrollTo) {
        hasScrolled.current = false;
      }
    };
  }, [location]);

  return (
    <main>
      <Home />
      <LatestMovies />
      <PopularMovies />
      <MostLiked />
    </main>
  );
};
