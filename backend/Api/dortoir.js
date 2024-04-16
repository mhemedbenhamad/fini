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
  console.log('MySQL dortoir connecté');
});

// Get all dortoirs
router.get('/', (req, res) => {
  con.query('SELECT * FROM dortoir', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch dortoirs' });
    } else {
      res.json(results);
    }
  });
});

// Add a new dortoir
router.post('/', (req, res) => {
  const { Id_Infra_Str, Genre_Dor, Nb_Chamb, Nb_Lits } = req.body;
  const newDortoir = { Id_Infra_Str, Genre_Dor, Nb_Chamb, Nb_Lits };
  con.query('INSERT INTO dortoir SET ?', newDortoir, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add dortoir' });
    } else {
      res.status(201).json({ message: 'Dortoir added successfully', dortoirId: result.insertId });
    }
  });
});

// Delete a dortoir
router.delete('/:id', (req, res) => {
  const dortoirId = req.params.id;
  con.query('DELETE FROM dortoir WHERE Id_Infra_Str = ?', dortoirId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete dortoir' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Dortoir not found' });
    } else {
      res.json({ message: 'Dortoir deleted successfully' });
    }
  });
});

module.exports = router;
