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
  console.log('MySQL besoins_etab_sco connecté');
});

// Get all needs for educational establishments
router.get('/', (req, res) => {
  con.query('SELECT * FROM besoins_etab_sco', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch needs for educational establishments' });
    } else {
      res.json(results);
    }
  });
});

// Add a need for an educational establishment
router.post('/', (req, res) => {
  const { Id_Bes, Qte_Bes, Date_Bes, Desc_Bes, Remarques_Bes, Id_Infra_Str } = req.body;
  const newNeed = { Id_Bes, Qte_Bes, Date_Bes, Desc_Bes, Remarques_Bes, Id_Infra_Str };
  con.query('INSERT INTO besoins_etab_sco SET ?', newNeed, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add need for educational establishment' });
    } else {
      res.status(201).json({ message: 'Need for educational establishment added successfully', needId: result.insertId });
    }
  });
});

// Delete a need for an educational establishment
router.delete('/:id', (req, res) => {
  const needId = req.params.id;
  con.query('DELETE FROM besoins_etab_sco WHERE Id_Bes = ?', needId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete need for educational establishment' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Need for educational establishment not found' });
    } else {
      res.json({ message: 'Need for educational establishment deleted successfully' });
    }
  });
});

module.exports = router;
