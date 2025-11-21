import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  function addFavorite(item) {
    if (!isFavorite(item.id)) {
      setFavorites([...favorites, item]);
    }
  }

  function removeFavorite(id) {
    setFavorites(favorites.filter((f) => f.id !== id));
  }

  function isFavorite(id) {
    return favorites.some((f) => f.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
