import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviesListPage";
import TvPage from "./pages/TvListPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import MoviesListPage from "./pages/MoviesListPage";
import TvListPage from "./pages/TvListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* liste */}
          <Route path="/movies" element={<MoviesListPage />} />
          <Route path="/tv" element={<TvListPage />} />

          {/* dettaglio dinamico */}
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/tv/:id" element={<TvPage />} />

          <Route path="/search" element={<SearchPage />} /> 
          

          {/* preferiti */}
          <Route path="/favorites" element={<FavoritesPage />} />

          {/* about */}
          <Route path="/about" element={<AboutPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
