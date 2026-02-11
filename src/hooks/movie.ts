  
export interface Movie {
    id: number,
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
    backdrop_path: string,
    genres: {
      id: number,
      name: string,
    }[],
    overview: string,
    runtime: number,
  };