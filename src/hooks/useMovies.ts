import type { Movie } from "./movie";
import { tmdbUrl } from "./tmdb";
import { useState, useEffect, useRef, useCallback } from "react";

export default function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [genre, setGenre] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [error, setError] = useState<string | null>(null);
    const currentPageRef = useRef(1);
    const totalPagesRef = useRef(1);
    const abortControllerRef = useRef<AbortController | null>(null);
    
    const doFetch = useCallback(async (isNextPage: boolean) => {
        if (isNextPage && currentPageRef.current >= totalPagesRef.current) return;

        const pageToFetch = isNextPage ? currentPageRef.current + 1 : 1;
        const isSearch = query.length > 0;
        const endpoint = isSearch ? `search/movie` : `discover/movie`;
        const params: Record<string, string> = {
            language: "en-US",
            page: pageToFetch.toString(),
        };

        if (isSearch) {
            params.query = query;
        } else {
            params.sort_by = sortBy;
            if (genre) params.with_genres = genre.toString();
        }

        const url = tmdbUrl(endpoint, params);

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const response = await fetch(url, { signal: controller.signal });

            if (!response.ok) throw new Error("Error al cargar las películas");

            const data = await response.json();

            if (data.results.length === 0 && !isNextPage) {
                setMovies([]);
                setError("No se encontraron películas para esta búsqueda");
                return;
            }

            totalPagesRef.current = data.total_pages;

            if (isNextPage) {
               setMovies((prevMovies) => [...prevMovies, ...data.results]);
               currentPageRef.current = pageToFetch;
            } else {
                setMovies(data.results);
                currentPageRef.current = 1;
            }
            
        } catch (err) {
            const error = err as Error;
            if (error.name === 'AbortError') return;
            console.error(error);
            setError("Hubo un problema al cargar las películas, intenta de nuevo");
        } finally {
            setLoading(false);
        }
    }, [query, genre, sortBy]);

    const fetchMovies = useCallback((isNextPage: boolean = false) => {
        setLoading(true);
        setError(null);
        doFetch(isNextPage);
    }, [doFetch]);

    const resetFilters = useCallback(() => {
        setGenre(null);
        setQuery("");
        setSortBy("popularity.desc");
    }, []);

    useEffect(() => {
        currentPageRef.current = 1;
        totalPagesRef.current = 1;
        // The state updates happen inside doFetch after await, not synchronously
        // eslint-disable-next-line react-hooks/set-state-in-effect
        doFetch(false);
    }, [query, genre, sortBy, doFetch]);
    
    return { movies, loading, query, setQuery, error, fetchMovies, setGenre, setSortBy, sortBy, resetFilters };
}