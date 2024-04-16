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
  console.log('MySQL probleme connecté');
});

// Get all problems for a specific project
router.get('/:projId', (req, res) => {
  const { projId } = req.params;
  con.query('SELECT * FROM probleme WHERE Id_Proj = ?', projId, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch problems' });
    } else {
      res.json(results);
    }
  });
});

// Add a new problem for a specific project
router.post('/:projId', (req, res) => {
  const { projId } = req.params;
  const { Type_Prob, Desc_Prob, Date_Det_Prob, Solution } = req.body;
  const newProblem = { Type_Prob, Desc_Prob, Date_Det_Prob, Solution, Id_Proj: projId };
  con.query('INSERT INTO probleme SET ?', newProblem, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add problem' });
    } else {
      res.status(201).json({ message: 'Problem added successfully', problemId: result.insertId });
    }
  });
});

// Update a problem
router.put('/:probId', (req, res) => {
  const { probId } = req.params;
  const { Type_Prob, Desc_Prob, Date_Det_Prob, Solution } = req.body;
  con.query(
    'UPDATE probleme SET Type_Prob = ?, Desc_Prob = ?, Date_Det_Prob = ?, Solution = ? WHERE Id_Prob = ?',
    [Type_Prob, Desc_Prob, Date_Det_Prob, Solution, probId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to update problem' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Problem not found' });
      } else {
        res.json({ message: 'Problem updated successfully' });
      }
    }
  );
});

// Delete a problem
router.delete('/:probId', (req, res) => {
  const { probId } = req.params;
  con.query('DELETE FROM probleme WHERE Id_Prob = ?', probId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete problem' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Problem not found' });
    } else {
      res.json({ message: 'Problem deleted successfully' });
    }
  });
});

module.exports = router;
