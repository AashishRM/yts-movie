import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ResultMovies } from "../components/module/Landing/ResultMovies";

export const SearchPage = () => {
  const { keyword } = useParams();

  // Normalize keyword
  const decodedKeyword = decodeURIComponent(keyword || "").trim();

  useEffect(() => {
    if (decodedKeyword) {
      console.log("Searching for:", decodedKeyword);
    } else {
      console.log("Search page loaded with no keyword");
    }
  }, [decodedKeyword]);

  return (
    <main className="min-h-[75vh]">
      <ResultMovies keyword={decodedKeyword} />
    </main>
  );
};
