import { NavLink } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
    const year = new Date().getFullYear();

    return (<footer className="footer"> <div className="footer-left"> <NavLink to="/" className="footer-logo">
        NetFlexx </NavLink> <p>© {year} NetFlexx. Tutti i diritti riservati.</p> </div>

        <div className="footer-center">
            <NavLink to="/about" className="footer-link">About</NavLink>
            <NavLink to="/favorites" className="footer-link">Preferiti</NavLink>
            <NavLink to="/privacy" className="footer-link">Privacy</NavLink>
            <NavLink to="/" className="footer-link">Home</NavLink>
        </div>

        <div className="footer-right">
            <p>Seguici sui social:</p>
            <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            </div>
        </div>
    </footer>


    );
}
