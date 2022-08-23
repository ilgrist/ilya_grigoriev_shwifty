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
      //   const characters = [
      //     'Rick Sanchez',
      //     'Summer Smith',
      //     'Morty Smith',
      //     'Beth Smith',
      //     'Jerry Smith',
      //   ];
      //   const prms = characters.map((char) => rickAndMortyService.getCharacterByName(char));
      //   const chartData = await Promise.all(prms);
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
    const data = characterData.map((character) => {
      return { name: character.name, popularity: character.episode.length };
    });
    return data;
  };

  return (
    <div>
      {chartData && !isLoading && <pre>{JSON.stringify(chartData, null, 2)}</pre>}
      {isLoading && <h2>Loading character...</h2>}
      {chartData && <Chart chartData={chartData} />}
    </div>
  );
};
