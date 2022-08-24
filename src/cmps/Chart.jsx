import { useEffect, useState } from 'react';
import { utilService } from '../services/util.service';

export const Chart = ({ chartData, isLoading }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const preparedData = prepData(chartData);
    setData(preparedData);
  }, [chartData]);

  const prepData = (dataFromProps) => {
    const sortedDataWithColors = dataFromProps.data
      .sort((itemA, itemB) => itemA.y - itemB.y)
      .map((item) => {
        const color = utilService.getRandomColor();
        return { ...item, color };
      });
    return { ...dataFromProps, data: sortedDataWithColors };
  };

  const Column = ({ item }) => {
    const { x, y, color } = item;
    const columnHeight = calcColumnHeight(y);
    return (
      <div className="chart-column">
        {/* <div className="column-title">{x}</div> */}
        <div className="column-body" style={{ height: columnHeight, backgroundColor: color }}></div>
        <div className="column-y-value">{y}</div>
      </div>
    );
  };

  const calcColumnHeight = (columnData) => {
    const yDataArr = data.data.map((item) => item.y);
    const maxHeight = Math.max(...yDataArr);
    const columnHeight = Math.floor((columnData / maxHeight) * 100);
    return `${columnHeight}%`;
  };

  const Legend = () => {
    return (
      <div className="chart-legend">
        {data.data.map((item, idx) => (
          <LegendItem item={item} key={idx} />
        ))}
      </div>
    );
  };

  const LegendItem = ({ item }) => {
    const { color } = item;
    return (
      <div className="chart-legend-item">
        <div className="color-square" style={{ backgroundColor: color }}></div>
        <div className="txt">{item.x}</div>
      </div>
    );
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
        <div className="chart-y-axis">
          <span className="txt">{data.axis.y}</span>
        </div>
        <div className="chart">
          {data.data.map((item, idx) => (
            <Column item={item} key={idx} />
          ))}
        </div>
        <Legend />
      </div>
    );
  return <div>No data to show...</div>;
};
