import { useEffect, useState } from 'react';
import { rickAndMortyService } from '../services/rickAndMorty.service';
import { ResourceTypes } from '../utils/constants';
import { CharacterTable } from './CharacterTable';

export const UnpopularCharFromLocation = ({ locationName = 'Earth (C-137)' }) => {
  const [charToDisplay, setCharToDisplay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    findUnpopularCharacterFromLocation(locationName);
  }, [isLoading]);

  const findUnpopularCharacterFromLocation = async (locationName) => {
    if (isLoading) {
      try {
        const location = await rickAndMortyService.getResourceByName(
          ResourceTypes.location,
          locationName
        );
        const characterIds = getCharIdsFromLocation(location);
        const characters = await rickAndMortyService.getResourceByIds(
          ResourceTypes.character,
          characterIds
        );
        const sortedCahracters = characters.sort((a, b) => a.episode.length - b.episode.length);
        const targetCharacter = sortedCahracters[0];
        setCharToDisplay(prepCharToDisplay(targetCharacter, location));
      } catch (err) {
        setError(err);
        console.log('Error getting character: ', error);
      } finally {
        setIsLoading(false);
      }
    }
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
