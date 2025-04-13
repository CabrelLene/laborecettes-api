
let items = []; // Tableau qui contiendra les éléments (ex: recettes)
let currentId = 1;
function getAllItems() {
  return items;
}
function getItemById(id) {
  return items.find(item => item.id === id);
}
function addItem(newData) {
  const item = {
    id: currentId++,
    ...newData,
    created: new Date().toISOString()
  };
  items.push(item);
  return item;
}
function updateItem(id, newData) {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...newData };
  return items[index];
}
function deleteItem(id) {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}
module.exports = {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem
};