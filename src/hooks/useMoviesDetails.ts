import { useEffect, useState } from "react";
import type { Movie } from "./movie";

export default function useMoviesDetails(movie_id: string) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [movie, setMovie] = useState<Movie | null>(null);
    
    useEffect(() => {
        if(!movie_id) return;

        const fetchMovieDetails = async () => {
            setLoading(true);
            setError(null);

            const endpoint = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${import.meta.env.VITE_API_KEY}`;

            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error("Error en la petición");
                }
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                console.error(err);   
                setError("Error al cargar la película");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movie_id]);
    
    return { loading, error, movie };
}