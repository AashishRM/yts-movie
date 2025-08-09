import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeaderBar } from "../components/partials/HeaderBar";
import { FooterBar } from "../components/partials/FooterBar";
import { LandingRoutes } from "../routes/LandingRoutes";

export const LandingLayout = () => {
  const location = useLocation();

  // Handle smooth scroll when navigating with state (e.g. { scrollTo: "popular" })
  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <HeaderBar />

      <main className="flex-1 pt-[70px] px-4 sm:px-6 md:px-[12vw]">
        <LandingRoutes />
      </main>

      <FooterBar />
    </div>
  );
};
