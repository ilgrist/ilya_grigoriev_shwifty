import { favoriteService } from '../../services/favoriteService';
import { utilService } from '../../services/util.service';
import { UserMsgTypes } from '../../utils/constants';

export function loadFavorites() {
  return async (dispatch) => {
    try {
      const favorites = await favoriteService.query();
      dispatch({ type: 'SET_FAVORITES', favorites });
    } catch (error) {
      console.log("Couldn't load favorites: ", error);
      const userMsgTxt = `Could not load favorites, see console for details`;
      utilService.sendUserMsg(UserMsgTypes.error, userMsgTxt);
    }
  };
}

export function getFavoriteById(favoriteId) {
  return async (dispatch) => {
    try {
      const favorite = await favoriteService.getById(favoriteId);
      dispatch({ type: 'SET_FAVORITE', favorite });
      return favorite;
    } catch (error) {
      console.log("Couldn't get favorite: ", error);
      const userMsgTxt = `Could not get favorite, see console for details`;
      utilService.sendUserMsg(UserMsgTypes.error, userMsgTxt);
    }
  };
}

export function removeFavorite(favoriteId) {
  return async (dispatch) => {
    try {
      await favoriteService.remove(favoriteId);
      dispatch({ type: 'REMOVE_FAVORITE', favoriteId });
      const userMsgTxt = `Favorite removed`;
      utilService.sendUserMsg(UserMsgTypes.info, userMsgTxt);
    } catch (error) {
      console.log("Couldn't remove favorites: ", error);
      const userMsgTxt = `Could not remove favorite, see console for details`;
      utilService.sendUserMsg(UserMsgTypes.error, userMsgTxt);
    }
  };
}

export function saveFavorite(favoriteToSave) {
  return async (dispatch) => {
    try {
      const type = favoriteToSave.id ? 'UPDATE_FAVORITE' : 'ADD_FAVORITE';
      const favorite = await favoriteService.save(favoriteToSave);
      dispatch({ type, favorite });
      const userMsgTxt = `Favorite saved`;
      utilService.sendUserMsg(UserMsgTypes.info, userMsgTxt);
    } catch (error) {
      console.log("Couldn't save favorite: ", error);
      const userMsgTxt = `Could not save favorite, see console for details`;
      utilService.sendUserMsg(UserMsgTypes.error, userMsgTxt);
    }
  };
}

export function setFavorite(favorite) {
  return (dispatch) => {
    dispatch({ type: 'SET_FAVORITE', favorite });
  };
}
