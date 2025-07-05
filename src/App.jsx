import { Routes, Route } from "react-router-dom";
import { HeaderBar } from "./components/partials/HeaderBar";
import { LandingPage } from "./pages/LandingPage";
import { SearchPage } from "./pages/SearchPage";
import { FooterBar } from "./components/partials/FooterBar";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderBar />
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
