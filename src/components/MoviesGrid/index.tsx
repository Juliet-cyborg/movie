import { useEffect, useMemo, useState } from 'react';
import type { MovieData } from '../../types/data.ts';
import { MovieCard } from '../MovieCard';

const matchesRating = (rating: string, filter: string) => {
  const value = Number(rating);
  switch (filter) {
    case 'good':
      return value >= 8;
    case 'ok':
      return value >= 5 && value < 8;
    case 'bad':
      return value < 5;
    default:
      return true;
  }
};

export const MoviesGrid = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('All Genres');
  const [rating, setRating] = useState('All');
  const [watchlist, setWatchlist] = useState<number[]>([]);

  useEffect(() => {
    fetch('movies.json')
      .then((response) => response.json())
      .then((data: MovieData[]) => setMovies(data))
      .catch((error) => console.error('Failed to load movies:', error));
  }, []);

  const genres = useMemo(
    () => ['All Genres', ...new Set(movies.map((movie) => movie.genre))],
    [movies],
  );

  const filteredMovies = useMemo(
    () =>
      movies.filter((movie) => {
        const matchesSearch = movie.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesGenre =
          genre === 'All Genres' ||
          movie.genre.toLowerCase() === genre.toLowerCase();
        return matchesSearch && matchesGenre && matchesRating(movie.rating, rating);
      }),
    [movies, searchTerm, genre, rating],
  );

  const toggleWatchlist = (id: number) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((movieId) => movieId !== id) : [...prev, id],
    );
  };

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="All">All</option>
            <option value="good">Good (8+)</option>
            <option value="ok">Ok (5 - 8)</option>
            <option value="bad">Bad (&lt; 5)</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isWatchlisted={watchlist.includes(movie.id)}
            onToggleWatchlist={toggleWatchlist}
          />
        ))}
      </div>
    </div>
  );
};