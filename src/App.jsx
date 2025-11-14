import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/HomePage";
import ListaFilm from "./pages/ListaFilm";
import MoviePage from "./pages/MoviePage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/lista" element={<ListaFilm />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
