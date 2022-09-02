import { useEffect, useState } from 'react';
import { rickAndMortyService } from '../services/rick-and-morty.service';
import { Chart } from './Chart';
import { ResourceTypes } from '../utils/constants';

export const PopularityChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    getCharacters();
  }, [isLoading]);

  const getCharacters = async () => {
    if (isLoading) {
      try {
        const charNames = rickAndMortyService.getChartCharacters();
        const prms = charNames.map((charName) =>
          rickAndMortyService.getResourceByName(ResourceTypes.character, charName)
        );
        const charData = await Promise.all(prms);
        const data = prepChartData(charData);
        setChartData(data);
      } catch (error) {
        setError(error);
        console.log("Couldn't get char data: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const prepChartData = (characterData) => {
    const d = rickAndMortyService.getChartDataModel();
    d.title = 'Most popular characters';
    d.axis.x = 'Character name';
    d.axis.y = 'Num. of episodes';
    d.data = characterData.map((character) => {
      return { x: character.name, y: character.episode.length };
    });
    return d;
  };

  return (
    <div>
      {isLoading && <h2>Loading chart...</h2>}
      {chartData && <Chart chartData={chartData} isLoading={isLoading} />}
    </div>
  );
};
