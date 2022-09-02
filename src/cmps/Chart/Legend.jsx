import { LegendItem } from './LegendItem';

export const Legend = ({ items }) => {
  return (
    <div className="chart-legend">
      {items.map((item, idx) => (
        <LegendItem item={item} key={idx} />
      ))}
    </div>
  );
};
