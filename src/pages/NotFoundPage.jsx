import { Link } from "react-router-dom"; 
import "../styles/NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <p className="notfound-message">
          Ops! La pagina che stai cercando non esiste.
        </p>
        <Link to="/" className="notfound-btn">Torna alla Home</Link>
      </div>
    </div>
  );
}
