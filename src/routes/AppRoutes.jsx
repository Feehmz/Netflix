import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home.jsx";
import Movies from "../pages/Movies.jsx";
import MovieDitail from "../pages/MovieDitail.jsx";


const AppRoutes = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <main >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie-ditail" element={<MovieDitail />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;