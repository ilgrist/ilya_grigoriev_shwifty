import Card from '@mui/material/Card';
import { Conditions } from './Conditions';
import { FavoriteBtn } from './FavoriteBtn';
import { DailyForecasts } from './DailyForecasts';
import { WeatherText } from './WeatherText';

export const WeatherCard = ({
  location,
  currentConditions,
  dailyForecast,
  onToggleIsFavorite,
  isFavorite,
}) => {
  if (!currentConditions && !dailyForecast && !location)
    return <div>No conditions, no forecast</div>;
  return (
    <Card className="weather-card" elevation={3}>
      <Conditions location={location} currentConditions={currentConditions} />
      <FavoriteBtn onToggleIsFavorite={onToggleIsFavorite} isFavorite={isFavorite} />
      <WeatherText weatherText={currentConditions.WeatherText} />
      <DailyForecasts dailyForecast={dailyForecast} />
    </Card>
  );
};
