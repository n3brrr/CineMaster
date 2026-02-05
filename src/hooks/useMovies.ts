import type { Movie } from "./movie";
import { useState } from "react";
import { useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;


export default function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    
    async function fetchPopular(){
        
        try {
            const response = await fetch(`${baseUrl}movie/popular?api_key=${apiKey}`);
            const data = await response.json();

            setMovies(data.results);
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    }
    async function getMovies(searchTerm: string = ""){
     setLoading(true); 
     const endpoint = searchTerm 
     ? `search/movie?query=${searchTerm}`
     : `movie/popular`;

     const url = `${baseUrl}${endpoint}&api_key=${apiKey}`;

     try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
     } catch (error) {
        console.error(error);
     } finally {
        setLoading(false);
     }
    }
    async function getMoviesByGenre(genre: string){
        setLoading(true);
        const endpoint = `discover/movie?with_genres=${genre}`;
        const url = `${baseUrl}${endpoint}&api_key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchPopular();
    }, []);
    
    return {movies, loading, query, setQuery, getMovies, getMoviesByGenre};
}