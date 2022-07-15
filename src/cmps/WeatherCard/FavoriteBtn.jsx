import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const FavoriteBtn = ({ isFavorite, onToggleIsFavorite }) => {
  const icon = () => {
    return isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />;
  };
  const toggleIsFavorite = () => {
    onToggleIsFavorite();
  };

  const buttonTxt = () => {
    return isFavorite ? 'Remove from favorites' : 'Add to favorites';
  };
  return (
    <div className="favorite-btn-cont flex-center">
      <button onClick={toggleIsFavorite} className="favorite-btn">
        {icon()}
        <span>{buttonTxt()}</span>
      </button>
    </div>
  );
};
