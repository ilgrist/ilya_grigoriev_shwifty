import { useEffect, useState } from 'react';
import { rickAndMortyApi } from '../services/api.service';
import { rickAndMortyService } from '../services/rickAndMorty.service';
import { ResourceTypes } from '../utils/constants';

export const UnpopularCharFromLocation = ({ targetLocation = 'Earth (C-137)' }) => {
  const [charToDisplay, setCharToDisplay] = useState({
    charName: '',
    originName: '',
    originDimension: '',
    popularity: '',
  });
  const [chars, setChars] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // findUnpopularCharacterFromLocation(targetLocation);
    findUnpopularCharacterFromLocation2(targetLocation);
  }, []);

  const findUnpopularCharacterFromLocation2 = async (targetLocation) => {
    setIsLoading(true);
    try {
      const location = await getLocationByName(targetLocation);
      const characterIds = getCharIdsFromLocation(location);
      const characters = await getCharactersByIds(characterIds);
      const charMapByEpisodes = characters.reduce((acc, character) => {
        if (character.origin.name === targetLocation) {
          const episodeCount = character.episode.length;
          if (!acc.has(episodeCount)) acc.set(episodeCount, []);
          const prevVal = acc.get(episodeCount);
          acc.set(episodeCount, [...prevVal, character]);
        }
        return acc;
      }, new Map());
      const lowestNumOfEpisodes = Math.min(...charMapByEpisodes.keys());
      const targetCharacter = charMapByEpisodes.get(lowestNumOfEpisodes)[0];
      console.log('targetCharacter:', targetCharacter);
      setCharToDisplay(targetCharacter);
    } catch (err) {
      setError(err);
      console.log('Error getting character: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocationByName = async (locationName) => {
    const resourceType = ResourceTypes.location;
    const filterBy = rickAndMortyService.getFilterBy(resourceType);
    filterBy.name = locationName;
    const payload = { resourceType, filterBy };
    const res = await rickAndMortyApi.get(payload);
    return res;
  };

  const getCharactersByIds = async (ids) => {
    const resourceType = ResourceTypes.character;
    const payload = { resourceType, ids };
    const res = await rickAndMortyApi.getByIds(payload);
    return res;
  };

  const findUnpopularCharacterFromLocation = async (targetLocation) => {
    setIsLoading(true);
    try {
      const location = await rickAndMortyApi.getLocationByName(targetLocation);
      const characterIds = getCharIdsFromLocation(location);
      const characters = await rickAndMortyApi.getCharactersByIds(characterIds);
      const unpopularCharacter = findCharWithMinEpisodes(characters);
      setCharToDisplay(unpopularCharacter);
    } catch (err) {
      setError(err);
      console.log('Error getting character: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCharIdsFromLocation = (location) => {
    const residents = location[0].residents || [];
    const residentsIds = residents.map((url) => url.split('/').pop());
    return residentsIds;
  };

  const findCharWithMinEpisodes = (chars) => {
    return chars.reduce((prev, curr) => (prev.episode.length < curr.episode.length ? prev : curr));
  };

  return (
    <div>
      <h1>UnpopularChar</h1>
      {charToDisplay.id && <pre>{JSON.stringify(charToDisplay, null, 2)}</pre>}
      {isLoading && <h2>Loading character</h2>}
    </div>
  );
};
