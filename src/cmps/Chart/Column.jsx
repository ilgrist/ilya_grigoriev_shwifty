export const Column = ({ item, items }) => {
  function calcColumnHeight(columnData) {
    const yDataArr = items.map((item) => item.y);
    const maxHeight = Math.max(...yDataArr);
    const columnHeight = Math.floor((columnData / maxHeight) * 100);
    return `${columnHeight}%`;
  }

  const { y, color } = item;
  const columnHeight = calcColumnHeight(y);

  return (
    <div className="column">
      <div className="column-body" style={{ height: columnHeight, backgroundColor: color }}></div>
      <div className="column-y-value">{y}</div>
    </div>
  );
};
