export const Chart = ({ chartData }) => {
  const Column = ({ character }) => {
    const { popularity } = character;
    const columnHeight = calcColumnHeight(popularity);
    return (
      <div style={{ width: '100px', height: columnHeight, backgroundColor: 'red' }}>
        {character.name} {popularity}
      </div>
    );
  };

  const calcColumnHeight = (popularity) => {
    const popArr = chartData.map((char) => char.popularity);
    const maxHeight = Math.max(...popArr);
    const columnHeight = Math.floor((popularity / maxHeight) * 100);
    return `${columnHeight}%`;
  };

  return (
    <div>
      {chartData && (
        <div className="popularity-chart">
          {chartData.map((character, idx) => (
            <Column character={character} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};
