import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchAPI } from "../api/tmdb";
import "../styles/SearchPage.css";

export default function SearchPage() {
    const [params] = useSearchParams();
    const query = params.get("q") || "";

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query) return;
        fetchResults();
    }, [query]);

    async function fetchResults() {
        try {
            setLoading(true);
            setError("");

            const data = await searchAPI.multi(query);

            const filtered = data.results.filter(
                (item) =>
                    (item.media_type === "movie" || item.media_type === "tv") &&
                    item.poster_path !== null
            );


            setResults(filtered);
        } catch (err) {
            console.error(err);
            setError("Errore durante la ricerca. Riprova.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="search-page">
            <h1>Risultati per: “{query}”</h1>

            {loading && <p className="loading">Caricamento...</p>}

            {error && <p className="error">{error}</p>}

            {!loading && !error && results.length === 0 && (
                <p className="empty">Nessun risultato trovato.</p>
            )}

            <div className="search-grid">
                {results.map((item) => (
                    <Link
                        key={item.id}
                        to={`/${item.media_type}/${item.id}`}
                        className="search-card"
                    >
                        <img
                            src={
                                item.poster_path
                                    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                                    : "https://via.placeholder.com/300x450?text=No+Image"
                            }
                            alt={item.title || item.name}
                            loading="lazy"
                        />

                        <p>{item.title || item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
