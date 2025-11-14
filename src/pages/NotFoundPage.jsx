import { Link } from "react-router-dom";
import "../styles/NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>La pagina che stai cercando non esiste.</p>
      <Link to="/">Torna alla Home</Link>
    </div>
  );
}
