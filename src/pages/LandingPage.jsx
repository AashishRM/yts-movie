import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Home } from "../components/module/Landing/Home";
import { LatestMovies } from "../components/module/Landing/LatestMovies";
import { PopularMovies } from "../components/module/Landing/PopularMovies";
import { MostLiked } from "../components/module/Landing/MostLiked";

export const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
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
