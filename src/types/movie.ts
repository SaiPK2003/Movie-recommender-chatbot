export interface Movie {
  id: string;
  title: string;
  year: number;
  plot: string;
  genre: string[];
  director: string;
  actors: string[];
  posterUrl: string;
  rating: number;
}