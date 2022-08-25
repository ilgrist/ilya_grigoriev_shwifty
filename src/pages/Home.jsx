import { PopularityChart } from '../cmps/PopularityChart';
import { UnpopularCharFromLocation } from '../cmps/UnpopularCharFromLocation';
import { rickAndMortyService } from '../services/rickAndMorty.service';

export const Home = () => {
  const charNames = rickAndMortyService.getChartCharacters();
  const locationName = 'Earth (C-137)';
  return (
    <div className="home container">
      <UnpopularCharFromLocation locationName={locationName} />
      <PopularityChart charNames={charNames} />
    </div>
  );
};
