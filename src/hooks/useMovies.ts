import type { Movie } from "./movie";
import { useState } from "react";
import { useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;


export default function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [genre, setGenre] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState("popularity.desc");
    
    
    async function fetchMovies(){
      setLoading(true);

        const isSearch = query.length > 0;
        const endpoint = isSearch ? `search/movie` : `discover/movie`;
        const params = new URLSearchParams({
            api_key: apiKey,
            language: "en-US"
        });

        if(isSearch){
            params.append("query", query);
        }else{
            params.append("sort_by", sortBy);
            if (genre) params.append("with_genres", genre.toString());
        }
        
        const url = `${baseUrl}${endpoint}?${params}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results){
                setMovies(data.results);
            }
            
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    }   

    useEffect(() => {
        fetchMovies();
    }, [query, genre, sortBy]);
    
    return {movies, loading, query, setQuery, fetchMovies, setGenre, setSortBy, sortBy};
}