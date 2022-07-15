import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { utilService } from '../../services/util.service';

export const DailyForecast = ({ forecast }) => {
  const dayName = () => {
    const forecastDay = new Date(forecast.Date).getDay();
    return utilService.getDayNameFromDay(forecastDay);
  };

  return (
    <div className="daily-forecast">
      <Card className="forecast-card flex-center">
        <Typography gutterBottom variant="h5" fontWeight={'bold'} component="div">
          {dayName()}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {forecast.Temperature.Minimum.Value} - {forecast.Temperature.Maximum.Value}°C
        </Typography>
      </Card>
    </div>
  );
};
