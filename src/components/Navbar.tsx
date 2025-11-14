import { Link } from "react-router-dom";
import "../styles/global.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">NetFlexx</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/movie/1">Film esempio</Link>
      </div>
    </nav>
  );
}
