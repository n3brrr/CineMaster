import type { Movie } from "./movie";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;


export default function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [genre, setGenre] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    
    async function fetchMovies(isNextPage: boolean = false){
        
      setLoading(true);

        const pageToFetch = isNextPage ? currentPage + 1 : 1;
        const isSearch = query.length > 0;
        const endpoint = isSearch ? `search/movie` : `discover/movie`;
        const params = new URLSearchParams({
            api_key: apiKey,
            language: "en-US",
            
        });
        params.append("page", pageToFetch.toString());

        if(isSearch){
            params.append("query", query);
        }else{
            params.append("sort_by", sortBy);
            if (genre) params.append("with_genres", genre.toString());
        }
        
        const url = `${baseUrl}${endpoint}?${params.toString()}`;

        if(abortControllerRef.current){
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, { signal: controller.signal });

            if (!response.ok) {
                throw new Error("Error al cargar las películas");
            }
            const data = await response.json();

            if(data.results.length === 0 && !isNextPage){
                setMovies([]);
                setError("No se encontraron películas para esta búsqueda");
                return;
            }

            if(isNextPage){
               setMovies((prevMovies) => [...prevMovies, ...data.results]);
               setCurrentPage(pageToFetch);
            }else{
                setMovies(data.results);
                setCurrentPage(1);
            }
            
        } catch (err) {
            const error = err as Error;
            if (error.name === 'AbortError') return;
            console.log(err);

            setError("Hubo un problema al cargar las películas, intenta de nuevo");
        } finally {
            setLoading(false);
        }
    }   
        

    useEffect(() => {
        fetchMovies();
    }, [query, genre, sortBy]);
    
    return {movies, loading, query, setQuery, error, fetchMovies, setGenre, setSortBy, sortBy, setCurrentPage};
}