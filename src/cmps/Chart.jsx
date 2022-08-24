export const Chart = ({ chartData, isLoading }) => {
  const Column = ({ entry }) => {
    const { x, y } = entry;
    const columnHeight = calcColumnHeight(y);
    return (
      <div className="chart-column">
        <div className="column-title">{entry.x}</div>
        <div className="column-body" style={{ height: columnHeight }}></div>
        <div className="column-y-value">{entry.y}</div>
      </div>
    );
  };

  const calcColumnHeight = (columnData) => {
    const yDataArr = chartData.data.map((entry) => entry.y);
    const maxHeight = Math.max(...yDataArr);
    const columnHeight = Math.floor((columnData / maxHeight) * 100);
    return `${columnHeight}%`;
  };

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }
  if (!isLoading && chartData)
    return (
      <div className="chart-cont">
        <span className="x-axis flex-center">{chartData.axis.x}</span>
        <span className="y-axis">{chartData.axis.y}</span>
        <span className="chart-title flex-center">{chartData.title}</span>
        <div className="chart">
          {chartData.data.map((entry, idx) => (
            <Column entry={entry} key={idx} />
          ))}
        </div>
      </div>
    );
  return <div>No data to show...</div>;
};
