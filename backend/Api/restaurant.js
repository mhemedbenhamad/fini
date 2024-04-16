const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Remontez d'un niveau pour accéder au dossier "serveur"
const config = require('../serveur/config'); 
const con = mysql.createConnection(config.database);

// Connection à la base
con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL restaurant connecté');
});

// Get all restaurants
router.get('/', (req, res) => {
  con.query('SELECT * FROM restaurant', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch restaurants' });
    } else {
      res.json(results);
    }
  });
});

// Add a new restaurant
router.post('/', (req, res) => {
  const newRestaurant = req.body;
  con.query('INSERT INTO restaurant SET ?', newRestaurant, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add restaurant' });
    } else {
      res.status(201).json({ message: 'Restaurant added successfully', restaurantId: result.insertId });
    }
  });
});

// Delete a restaurant
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  con.query('DELETE FROM restaurant WHERE Id_Infra_Str = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete restaurant' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Restaurant not found' });
    } else {
      res.json({ message: 'Restaurant deleted successfully' });
    }
  });
});

module.exports = router;
