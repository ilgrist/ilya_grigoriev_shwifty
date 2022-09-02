export const LegendItem = ({ item }) => {
  const { color } = item;
  return (
    <div className="chart-legend-item">
      <div className="color-square" style={{ backgroundColor: color }}></div>
      <div className="txt">{item.x}</div>
    </div>
  );
};
