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
        const sortedCharacters = characters.sort((a, b) => a.episode.length - b.episode.length);
        const targetCharacter = sortedCharacters[0];
        setCharToDisplay(rickAndMortyService.prepCharToDisplay(targetCharacter, location));
      } catch (err) {
        setError(err);
        useEffect(() => {
          if (error !== null) console.log('Error getting character: ', error);
        }, [error]);
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

  return (
    <div>
      {isLoading && <h2>Loading character...</h2>}
      {error && <h2>Error getting character</h2>}
      {charToDisplay && !isLoading && (
        <CharacterTable
          character={charToDisplay}
          title={`The most unpopular character from ${locationName}`}
        />
      )}
    </div>
  );
};
