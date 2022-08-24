import { useEffect, useState } from 'react';
import { rickAndMortyService } from '../services/rickAndMorty.service';
import characters from '../data/chartChars.json';
import { Chart } from './Chart';

export const PopularityChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = async () => {
    setIsLoading(true);
    try {
      // const characters = rickAndMortyService.getChartCharacters();
      // const prms = characters.map((char) => rickAndMortyService.getCharacterByName(char));
      // const chartData = await Promise.all(prms);
      const data = prepChartData(characters);
      setChartData(data);
    } catch (error) {
      setError(error);
      console.log("Couldn't get char data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const prepChartData = (characterData) => {
    const d = rickAndMortyService.getChartDataModel();
    d.title = 'Most popular characters';
    d.axis.x = 'Character name';
    d.axis.y = 'Popularity (episode num.)';
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
