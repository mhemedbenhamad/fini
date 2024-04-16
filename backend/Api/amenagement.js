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
  console.log('MySQL amenagement connecté');
});

// Get all amenities for projects
router.get('/', (req, res) => {
  con.query('SELECT * FROM amenagement', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch amenities' });
    } else {
      res.json(results);
    }
  });
});

// Add amenity for a project
router.post('/', (req, res) => {
  const { Id_Proj } = req.body;
  const newAmenity = { Id_Proj };
  con.query('INSERT INTO amenagement SET ?', newAmenity, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add amenity' });
    } else {
      res.status(201).json({ message: 'Amenity added successfully', amenityId: result.insertId });
    }
  });
});

// Delete amenity for a project
router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  con.query('DELETE FROM amenagement WHERE Id_Proj = ?', projectId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete amenity' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Amenity not found' });
    } else {
      res.json({ message: 'Amenity deleted successfully' });
    }
  });
});

module.exports = router;
