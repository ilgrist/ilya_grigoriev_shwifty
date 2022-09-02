import { useEffect, useState } from 'react';
import { utilService } from '../../services/util.service';
import { Column } from './Column';
import { Legend } from './Legend';

export const Chart = ({ chartData, isLoading }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const preparedData = prepData(chartData);
    setData(preparedData);
  }, [chartData]);

  const prepData = (chartData) => {
    const sortedDataWithColors = chartData.items
      .sort((itemA, itemB) => itemA.y - itemB.y)
      .map((item) => {
        const color = utilService.getRandomColor();
        return { ...item, color };
      });
    return { ...chartData, items: sortedDataWithColors };
  };

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }
  if (!isLoading && data)
    return (
      <div className="chart-cont">
        <div className="chart-title flex-center">
          <span className="txt">{data.title}</span>
        </div>
        <div className="chart">
          <span className="y-title">{data.axis.y}</span>
          <div className="columns">
            {data.items.map((item, idx) => (
              <Column item={item} key={idx} items={data.items} />
            ))}
          </div>
        </div>
        <Legend items={data.items} />
      </div>
    );
  return <div>No data to show...</div>;
};
