import { useEffect, useState } from 'react';
import { rickAndMortyService } from '../services/rick-and-morty.service';
import { userMsgService } from '../services/user-msg.service';
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

  useEffect(() => {
    if (error) userMsgService.showError(error);
  }, [error]);

  const findUnpopularCharacterFromLocation = async (locationName) => {
    if (isLoading) {
      try {
        const location = await getTargetLocation(locationName);
        const targetCharacter = await getTargetCharFromLocation(location);
        setCharToDisplay(rickAndMortyService.prepCharToDisplay(targetCharacter, location));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getTargetLocation = async (locationName) => {
    try {
      const location = await rickAndMortyService.getResourceByName(
        ResourceTypes.location,
        locationName
      );
      return location;
    } catch (error) {
      const newError = {
        msg: "Couldn't find character location",
        error,
      };
      setError(newError);
      throw error;
    }
  };

  const getTargetCharFromLocation = async (location) => {
    try {
      const characterIds = getCharIdsFromLocation(location);
      const characters = await rickAndMortyService.getResourceByIds(
        ResourceTypes.character,
        characterIds
      );
      const sortedCharacters = characters.sort((a, b) => a.episode.length - b.episode.length);
      const targetCharacter = sortedCharacters[0];
      return targetCharacter;
    } catch (error) {
      const newError = {
        msg: "Couldn't get characters",
        error,
      };
      setError(newError);
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
