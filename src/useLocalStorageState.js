import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  //Getting the array of movies stored in localStorage
  const [value, setValue] = useState(function () {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : initialState;
  });

  //Adding any movies listed to movieDetails into localStorage
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
