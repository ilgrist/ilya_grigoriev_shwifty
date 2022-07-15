import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

export const Conditions = ({ location, currentConditions }) => {
  const locationName = location ? location.LocalizedName : '';
  const locationCountry = location ? location.Country.LocalizedName : '';
  const temperature = currentConditions ? `${currentConditions.Temperature.Metric.Value}°C` : '';
  const iconCode = currentConditions ? currentConditions.WeatherIcon : 'default';

  return (
    <div className="conditions">
      <CardMedia
        component="img"
        height="100"
        image={require(`../../assets/weatherIcons/${iconCode}.png`)}
        alt={locationName}
      />
      <Card className="conditions-card" elevation={0}>
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
      </Card>
    </div>
  );
};
