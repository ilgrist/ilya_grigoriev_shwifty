import { DailyForecast } from './DailyForecast';

export const DailyForecasts = ({ dailyForecast }) => {
  return (
    <div className="daily-forecasts">
      {dailyForecast.DailyForecasts.map((forecast, idx) => (
        <DailyForecast forecast={forecast} key={idx} />
      ))}
    </div>
  );
};
