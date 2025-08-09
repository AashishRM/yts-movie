// import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import { HeaderBar } from "./components/partials/HeaderBar";
// import { LandingPage } from "./pages/LandingPage";
// import { SearchPage } from "./pages/SearchPage";
// import { FooterBar } from "./components/partials/FooterBar";
// import { MovieDetailsPage } from "./pages/MovieDetailsPage";
// import ReactGA from "react-ga4";
// import { useEffect } from "react";

// // Initialize GA4
// ReactGA.initialize("G-J0G6YTBJH7");

// function App() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // ✅ Track page views on every route change
//   useEffect(() => {
//     ReactGA.send({
//       hitType: "pageview",
//       page: location.pathname + location.search,
//       title: document.title,
//     });
//   }, [location]);

//   // ✅ Handle search and send event to GA4
//   const handleSearch = (keyword) => {
//     const cleanKeyword = keyword.trim().toLowerCase();
//     if (!cleanKeyword) return;

//     // 📊 Track the search keyword
//     ReactGA.event("search", {
//       search_term: cleanKeyword, // 👈 This is what GA4 will analyze
//     });

//     // Navigate to search page
//     navigate(`/search/${cleanKeyword}`);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Pass handleSearch to HeaderBar */}
//       <HeaderBar onSearch={handleSearch} />
//       <main className="flex-1 pt-[70px]">
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/search/:keyword" element={<SearchPage />} />
//           <Route path="/movie/:id" element={<MovieDetailsPage />} />
//         </Routes>
//       </main>
//       <FooterBar />
//     </div>
//   );
// }

// export default App;

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

  // Track page views on route change
  useEffect(() => {
    // Avoid duplicate tracking on first load (GA4 auto-tracks initial pageview in some cases)
    // But it's safe to send again — GA4 deduplicates well
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
      title: document.title,
    });
  }, [location]);

  // Handle search and send event to GA4
  const handleSearch = (keyword) => {
    const cleanKeyword = keyword.trim().toLowerCase();
    if (!cleanKeyword) return;

    // 📊 Track search event in GA4
    ReactGA.event("search", {
      search_term: cleanKeyword,
    });

    // Navigate to search page
    navigate(`/search/${encodeURIComponent(cleanKeyword)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <HeaderBar onSearch={handleSearch} />

      {/* Main Content */}
      <main className="flex-1 pt-[70px]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <FooterBar />
    </div>
  );
}

export default App;
