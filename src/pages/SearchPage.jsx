import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ResultMovies } from "../components/module/Landing/ResultMovies";

export const SearchPage = () => {
  const { keyword } = useParams();

  useEffect(() => {
    console.log("Searching for:", keyword);
  }, [keyword]);

  return (
    <main>
        <ResultMovies keyword={keyword} />
    </main>
  );
};
