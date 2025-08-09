import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { SearchPage } from "../pages/SearchPage";
import { MovieDetailsPage } from "../pages/MovieDetailsPage";

export const LandingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search/:keyword" element={<SearchPage />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
    </Routes>
  );
};
