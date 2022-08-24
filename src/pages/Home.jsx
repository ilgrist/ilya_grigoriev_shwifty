import { PopularityChart } from '../cmps/PopularityChart';
import { UnpopularCharFromLocation } from '../cmps/UnpopularCharFromLocation';

export const Home = () => {
  return (
    <div className="container">
      Home
      <UnpopularCharFromLocation />
      <hr />
      <PopularityChart></PopularityChart>
    </div>
  );
};
