import { toast } from 'react-toastify';
import { UserMsgTypes } from '../utils/constants';

export const utilService = {
  getRandomIntInclusive,
  saveToStorage,
  loadFromStorage,
  debounce,
  makeId,
  sendUserMsg,
  getDayNameFromDay,
};

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function debounce(func, wait = 500) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function makeId(length = 10) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getDayNameFromDay(day) {
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return;
  }
}

function sendUserMsg(type, txt) {
  const options = {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  switch (type) {
    case UserMsgTypes.success:
      toast.success(txt, options);
      break;
    case UserMsgTypes.info:
      toast.info(txt, options);
      break;
    case UserMsgTypes.error:
      toast.error(txt, options);
      break;
    case UserMsgTypes.warning:
      toast.warning(txt, options);
      break;
    default:
      break;
  }
}
