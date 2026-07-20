import { useEffect, useState } from "react";
import type { Movie } from "./movie";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export default function useMoviesDetails(movie_id: string) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [movie, setMovie] = useState<Movie | null>(null);
    
    useEffect(() => {
        if(!movie_id) return;

        const controller = new AbortController();

        const fetchMovieDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `${baseUrl}/3/movie/${movie_id}?api_key=${apiKey}`,
                    { signal: controller.signal },
                );
                if (!response.ok) {
                    throw new Error("Error en la petición");
                }
                const data = await response.json();
                setMovie(data);
            } catch (err) {
                if ((err as Error).name === "AbortError") return;
                console.error(err);   
                setError("Error al cargar la película");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();

        return () => controller.abort();
    }, [movie_id]);
    
    return { loading, error, movie };
}