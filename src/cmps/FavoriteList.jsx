import { Favorite } from './Favorite';

export function FavoriteList({ favorites, onRemoveFavorite }) {
  return (
    <div className="favorites-list specific-cards-grid">
      {favorites.map((favorite) => (
        <Favorite key={favorite.id} favorite={favorite} onRemoveFavorite={onRemoveFavorite} />
      ))}
    </div>
  );
}
