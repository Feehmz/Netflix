import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Global.css"; 

export default function MainLayout() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      {/* footer opzionale in futuro */}
      <Footer />
    </div>
  );
}
