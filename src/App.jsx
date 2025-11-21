import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import { FavoritesProvider } from "./context/FavoritesContext";

import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import TvPage from "./pages/TvPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import MoviesListPage from "./pages/MoviesListPage";
import TvListPage from "./pages/TvListPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* 👇 QUI! Avvolgi tutta l’app */}
      <FavoritesProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route path="/movies" element={<MoviesListPage />} />
            <Route path="/tv" element={<TvListPage />} />

            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/tv/:id" element={<TvPage />} />

            <Route path="/search" element={<SearchPage />} />

            <Route path="/favorites" element={<FavoritesPage />} />

            <Route path="/about" element={<AboutPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
}
