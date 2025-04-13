 
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
// Import des modules de données et d'aide
const data = require('./data');
const helper = require('./helper');
// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
// Routes API
// GET /api/items - Récupérer tous les éléments
app.get('/api/items', (req, res, next) => {
  res.status(200).json(data.getAllItems());
});
// GET /api/items/:id - Récupérer un élément par ID
app.get('/api/items/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const item = data.getItemById(id);
  if (item) {
    return res.status(200).json(item);
  } else {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }
});
// POST /api/items - Créer un nouvel élément
app.post('/api/items', (req, res, next) => {
  const newItemData = req.body;
  if (!helper.validateRecipeData(newItemData)) {
    const err = new Error('Incomplete data: missing title or ingredients');
    err.status = 400;
    return next(err);
  }
  const newItem = data.addItem(newItemData);
  res.status(201).json(newItem);
});
// PUT /api/items/:id - Modifier un élément existant
app.put('/api/items/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const updatedData = req.body;
  if (!helper.validateRecipeData(updatedData)) {
    const err = new Error('Incomplete data: missing title or ingredients');
    err.status = 400;
    return next(err);
  }
  const updatedItem = data.updateItem(id, updatedData);
  if (!updatedItem) {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }
  res.status(200).json(updatedItem);
});
// DELETE /api/items/:id - Supprimer un élément
app.delete('/api/items/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const success = data.deleteItem(id);
  if (!success) {
    const err = new Error('Item not found');
    err.status = 404;
    return next(err);
  }
  res.status(200).json({ message: 'Item deleted successfully' });
});
// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.message });
});
// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});