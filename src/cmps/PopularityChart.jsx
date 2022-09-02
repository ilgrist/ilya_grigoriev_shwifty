import { useEffect, useState } from 'react';
import { rickAndMortyService } from '../services/rick-and-morty.service';
import { Chart } from './Chart/Chart';
import { ResourceTypes } from '../utils/constants';
import { utilService } from '../services/util.service';
import { userMsgService } from '../services/user-msg.service';

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

  useEffect(() => {
    if (error) userMsgService.showError(error);
  }, [error]);

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
        const newError = {
          msg: "Couldn't get characters for chart",
          error,
        };
        setError(newError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const prepChartData = (characterData) => {
    const chartDataModel = utilService.getChartDataModel();
    chartDataModel.title = 'Most popular characters';
    chartDataModel.axis.y = 'Num. of episodes';
    chartDataModel.items = characterData.map((character) => {
      return { x: character.name, y: character.episode.length };
    });
    return chartDataModel;
  };

  return (
    <div>
      {isLoading && <h2>Loading chart...</h2>}
      {error && <h2>Error getting characters</h2>}
      {chartData && <Chart chartData={chartData} isLoading={isLoading} />}
    </div>
  );
};
