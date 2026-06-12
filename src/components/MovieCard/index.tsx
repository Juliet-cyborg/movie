import type { MovieData } from '../../types/data.ts';

const getRatingClass = (rating: string) => {
  const value = Number(rating);
  if (value >= 8) return 'rating-good';
  if (value >= 5) return 'rating-ok';
  return 'rating-bad';
};

interface MovieCardProps {
  movie: MovieData;
  isWatchlisted: boolean;
  onToggleWatchlist: (id: number) => void;
}

export const MovieCard = ({
  movie,
  isWatchlisted,
  onToggleWatchlist,
}: MovieCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'images/default.jpg';
  };

  return (
    <div className="movie-card">
      <img
        src={`images/${movie.image}`}
        alt={movie.title}
        onError={handleImageError}
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
          {movie.rating}
        </p>
        <p className="movie-card-genre">{movie.genre}</p>
        <button
          className="watchlist-btn"
          onClick={() => onToggleWatchlist(movie.id)}
        >
          {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};