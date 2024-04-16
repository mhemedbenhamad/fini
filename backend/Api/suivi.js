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
  console.log('MySQL Suivi connecté');
});

// Get all suivi entries
router.get('/', (req, res) => {
  con.query('SELECT * FROM suivi', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch suivi entries' });
    } else {
      res.json(results);
    }
  });
});

// Add a new suivi entry
router.post('/', (req, res) => {
  const newSuiviEntry = req.body;
  con.query('INSERT INTO suivi SET ?', newSuiviEntry, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add suivi entry' });
    } else {
      res.status(201).json({ message: 'Suivi entry added successfully', suiviId: result.insertId });
    }
  });
});

// Delete a suivi entry
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  con.query('DELETE FROM suivi WHERE Id_Suiv = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete suivi entry' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Suivi entry not found' });
    } else {
      res.json({ message: 'Suivi entry deleted successfully' });
    }
  });
});

module.exports = router;
