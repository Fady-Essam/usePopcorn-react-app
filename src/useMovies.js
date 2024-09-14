import { useEffect, useState } from "react";

const KEY = "1bf7be6d";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        setIsError("");
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Faild to fetch!");
          const data = await res.json();
          if (data.Response === "False")
            throw new Error("Something goes wrong!");
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setIsError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setIsError("");
        setMovies([]);
        return;
      }
      //   handleClosedDetails();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, isError };
}
