export const WeatherText = ({ weatherText }) => {
  return (
    <div className="weather-text-cont flex-center">
      <span className="prefix">Today, it's </span>
      <span className="weather-text">{weatherText}</span>
    </div>
  );
};
