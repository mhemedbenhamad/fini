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
  console.log('MySQL maintenance connecté');
});

// Get all maintenance records
router.get('/', (req, res) => {
  con.query('SELECT * FROM maintenance', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch maintenance records' });
    } else {
      res.json(results);
    }
  });
});

// Add a new maintenance record
router.post('/', (req, res) => {
  const { Id_Proj } = req.body;
  const newMaintenance = { Id_Proj };
  con.query('INSERT INTO maintenance SET ?', newMaintenance, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add maintenance record' });
    } else {
      res.status(201).json({ message: 'Maintenance record added successfully', maintenanceId: result.insertId });
    }
  });
});

// Delete a maintenance record
router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  con.query('DELETE FROM maintenance WHERE Id_Proj = ?', projectId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete maintenance record' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Maintenance record not found' });
    } else {
      res.json({ message: 'Maintenance record deleted successfully' });
    }
  });
});

module.exports = router;
