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
  console.log('MySQL construction connecté');
});

// Get all construction projects
router.get('/', (req, res) => {
  con.query('SELECT * FROM construction', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch construction projects' });
    } else {
      res.json(results);
    }
  });
});

// Add a new construction project
router.post('/', (req, res) => {
  const { Id_Proj } = req.body;
  const newConstructionProject = { Id_Proj };
  con.query('INSERT INTO construction SET ?', newConstructionProject, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add construction project' });
    } else {
      res.status(201).json({ message: 'Construction project added successfully', projectId: result.insertId });
    }
  });
});

// Delete a construction project
router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  con.query('DELETE FROM construction WHERE Id_Proj = ?', projectId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete construction project' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Construction project not found' });
    } else {
      res.json({ message: 'Construction project deleted successfully' });
    }
  });
});

module.exports = router;
