import { PopularityChart } from '../cmps/PopularityChart';
import { UnpopularCharFromLocation } from '../cmps/UnpopularCharFromLocation';

export const Home = () => {
  return (
    <div className="container homepage">
      <UnpopularCharFromLocation />
      <hr />
      <PopularityChart />
    </div>
  );
};
