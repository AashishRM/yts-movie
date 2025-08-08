import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HeaderBar } from "./components/partials/HeaderBar";
import { LandingPage } from "./pages/LandingPage";
import { SearchPage } from "./pages/SearchPage";
import { FooterBar } from "./components/partials/FooterBar";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";
import ReactGA from "react-ga4";
import { useEffect } from "react";

// Initialize GA4
ReactGA.initialize("G-J0G6YTBJH7");

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Track page views on every route change
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
      title: document.title,
    });
  }, [location]);

  // ✅ Handle search and send event to GA4
  const handleSearch = (keyword) => {
    const cleanKeyword = keyword.trim().toLowerCase();
    if (!cleanKeyword) return;

    // 📊 Track the search keyword
    ReactGA.event("search", {
      search_term: cleanKeyword, // 👈 This is what GA4 will analyze
    });

    // Navigate to search page
    navigate(`/search/${cleanKeyword}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Pass handleSearch to HeaderBar */}
      <HeaderBar onSearch={handleSearch} />
      <main className="flex-1 pt-[70px]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </main>
      <FooterBar />
    </div>
  );
}

export default App;
