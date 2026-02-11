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
    const [currentPage, setCurrentPage] = useState(1);
    
    
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


        try {
            const response = await fetch(url);
            const data = await response.json();
          
            if(isNextPage){
               setMovies((prevMovies) => [...prevMovies, ...data.results]);
               setCurrentPage(pageToFetch);
            }else{
                setMovies(data.results);
                setCurrentPage(1);
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
    
    return {movies, loading, query, setQuery, fetchMovies, setGenre, setSortBy, sortBy, setCurrentPage};
}