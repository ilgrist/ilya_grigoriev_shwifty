import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFavorites, removeFavorite } from '../store/actions/favoriteActions';
import { FavoriteList } from '../cmps/FavoriteList';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favoriteModule);

  useEffect(() => {
    dispatch(loadFavorites());
  }, []);

  const onRemoveFavorite = (favoriteId) => {
    dispatch(removeFavorite(favoriteId));
  };

  if (!favorites.length)
    return (
      <div className="favorites-page container flex-center">
        <Card sx={{ minWidth: 275 }} elevation={0}>
          <CardContent>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No favorites yet! Try adding some from the
              <Link to={'/'}>
                <span>
                  <Typography variant="h4" color="text.secondary" gutterBottom>
                    homepage.
                  </Typography>
                </span>
              </Link>
            </Typography>
          </CardContent>
        </Card>
        <span></span>
      </div>
    );

  return (
    <div className="favorites-page container">
      <FavoriteList favorites={favorites} onRemoveFavorite={onRemoveFavorite} />
    </div>
  );
};
