import { useEffect, useState } from 'react';
import { rickAndMortyApi } from '../services/api.service';
import { rickAndMortyService } from '../services/rickAndMorty.service';
import { ResourceTypes } from '../utils/constants';
import { CharacterTable } from './CharacterTable';

export const UnpopularCharFromLocation = ({ locationName = 'Earth (C-137)' }) => {
  const [charToDisplay, setCharToDisplay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    findUnpopularCharacterFromLocation(locationName);
  }, []);

  const findUnpopularCharacterFromLocation = async (locationName) => {
    setIsLoading(true);
    try {
      const location = await getLocationByName(locationName);
      const characterIds = getCharIdsFromLocation(location);
      const characters = await getCharactersByIds(characterIds);
      const charMapByEpisodes = characters.reduce((acc, character) => {
        if (character.origin.name === locationName) {
          const episodeCount = character.episode.length;
          if (!acc.has(episodeCount)) acc.set(episodeCount, []);
          const prevVal = acc.get(episodeCount);
          acc.set(episodeCount, [...prevVal, character]);
        }
        return acc;
      }, new Map());
      const lowestNumOfEpisodes = Math.min(...charMapByEpisodes.keys());
      const targetCharacter = charMapByEpisodes.get(lowestNumOfEpisodes)[0];
      setCharToDisplay(prepCharToDisplay(targetCharacter, location));
    } catch (err) {
      setError(err);
      console.log('Error getting character: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocationByName = async (locationName) => {
    const resourceType = ResourceTypes.location;
    const filterBy = rickAndMortyService.getEmptyFilterBy(resourceType);
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

  const getCharIdsFromLocation = (location) => {
    const residents = location.residents || [];
    const residentsIds = residents.map((url) => url.split('/').pop());
    return residentsIds;
  };

  const prepCharToDisplay = (char, location) => {
    let charToReturn = rickAndMortyService.getEmptyCharacter();
    charToReturn.name = char.name;
    charToReturn.origin = char.origin.name;
    charToReturn.popularity = char.episode.length;
    charToReturn.dimension = location.dimension;
    return charToReturn;
  };

  return (
    <div>
      {isLoading && <h2>Loading character...</h2>}
      {charToDisplay && !isLoading && (
        <CharacterTable
          character={charToDisplay}
          title={`The most unpopular character from ${locationName}`}
        />
      )}
    </div>
  );
};
