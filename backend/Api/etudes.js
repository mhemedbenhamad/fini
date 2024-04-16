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
  console.log('MySQL etudes connecté');
});

// Get all etudes
router.get('/', (req, res) => {
  con.query('SELECT * FROM etudes', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch etudes' });
    } else {
      res.json(results);
    }
  });
});

// Add a new etude
router.post('/', (req, res) => {
  const { Id_Etu, Obj_Etu, Desc_Etu, Date_Deb_Etu, Date_Fin_Etu, Statut_Etu, Remarques_Etu, Id_Proj } = req.body;
  const newEtude = { Id_Etu, Obj_Etu, Desc_Etu, Date_Deb_Etu, Date_Fin_Etu, Statut_Etu, Remarques_Etu, Id_Proj };
  con.query('INSERT INTO etudes SET ?', newEtude, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add etude' });
    } else {
      res.status(201).json({ message: 'Etude added successfully', etudeId: result.insertId });
    }
  });
});

// Delete an etude
router.delete('/:id', (req, res) => {
  const etudeId = req.params.id;
  con.query('DELETE FROM etudes WHERE Id_Etu = ?', etudeId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete etude' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Etude not found' });
    } else {
      res.json({ message: 'Etude deleted successfully' });
    }
  });
});

module.exports = router;
