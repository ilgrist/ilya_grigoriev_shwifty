import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

export const Favorite = ({ favorite, onRemoveFavorite }) => {
  const { location, currentConditions, id } = favorite;
  const locationName = location ? location.LocalizedName : '';
  const locationCountry = location ? location.Country.LocalizedName : '';
  const temperature = currentConditions ? `${currentConditions.Temperature.Metric.Value}°C` : '';
  const iconCode = currentConditions ? currentConditions.WeatherIcon : 'default';

  const removeFavorite = (ev) => {
    ev.preventDefault();
    onRemoveFavorite(id);
  };

  return (
    <Card className="favorite-card" elevation={3}>
      <Link to={'/' + id}>
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          <CardMedia
            component="img"
            height="100"
            image={require(`../assets/weatherIcons/${iconCode}.png`)}
            alt={locationName}
          />
          <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {locationName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {locationCountry}
              </Typography>
              <Typography gutterBottom variant="h4" component="div">
                {temperature}
              </Typography>
            </CardContent>
          </Grid>

          <CardActions>
            <IconButton aria-label="remove" onClick={removeFavorite}>
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Link>
    </Card>
  );
};
