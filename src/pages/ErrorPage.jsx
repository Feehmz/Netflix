import { Link } from "react-router-dom";
import "../styles/ErrorPage.css";

export default function ErrorPage() {
  return (
    <div className="container">
      <h1 className="title">404</h1>
      <p className="subtitle">Pagina non trovata</p>

      <Link to="/" className="button">
        Torna alla Home
      </Link>
    </div>
  );
}