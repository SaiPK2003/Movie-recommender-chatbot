import React from 'react';
import { Star } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={movie.posterUrl} 
        alt={movie.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{movie.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">{movie.year}</p>
        <p className="text-sm text-gray-700 mb-2">{movie.plot}</p>
        <div className="flex flex-wrap gap-1">
          {movie.genre.map((g) => (
            <span 
              key={g} 
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};