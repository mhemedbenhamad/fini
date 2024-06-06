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


// Add a new route to fetch data from both suivi and projet tables
router.get('/suivi-projet', (req, res) => {
  con.query(`
    SELECT s.Date_Fin_Suiv, s.Remarques_Suiv, p.Nom_Proj, p.Date_Deb_Proj, p.Date_Fin_Proj
    FROM suivi s
    JOIN projet p ON s.Id_Proj = p.Id_Proj
  `, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data from suivi and projet tables' });
    } else {
      res.json(results);
    }
  });
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

// Update a suivi entry
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedSuiviEntry = req.body;
  con.query('UPDATE suivi SET ? WHERE Id_Suiv = ?', [updatedSuiviEntry, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update suivi entry' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Suivi entry not found' });
    } else {
      res.json({ message: 'Suivi entry updated successfully' });
    }
  });
});

// Get a suivi entry by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  con.query('SELECT * FROM suivi WHERE Id_Suiv = ?', id, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch suivi entry' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Suivi entry not found' });
    } else {
      res.json(results[0]); // Assuming there's only one matching entry
    }
  });
});



module.exports = router;
