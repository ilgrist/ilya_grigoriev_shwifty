export const utilService = {
  saveToStorage,
  loadFromStorage,
  getRandomColor,
  getChartDataModel,
};

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getChartDataModel() {
  return {
    title: '',
    axis: {
      x: '',
      y: '',
    },
    data: [],
  };
}
