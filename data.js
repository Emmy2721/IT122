const items = [
  
   { id: 1, carModel: "Honda Accord", year: 2022, color: "Red", price: 25000 },

const getAll = () => {
  return items;
};

const getItem = (key) => {
  return items.find(item => item.carModel === key);
};

module.exports = {
  getAll,
  getItem
};
