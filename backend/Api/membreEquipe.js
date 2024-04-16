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
  console.log('MySQL membre_equipe connecté');
});

// Get all team members
router.get('/', (req, res) => {
  con.query('SELECT * FROM membre_equipe', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch team members' });
    } else {
      res.json(results);
    }
  });
});

// Add a new team member
router.post('/', (req, res) => {
  const { Id_Mem_Eq, Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, Id_log, Role_Mem_Eq } = req.body;
  const newMember = { Id_Mem_Eq, Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, Id_log, Role_Mem_Eq };
  con.query('INSERT INTO membre_equipe SET ?', newMember, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add team member' });
    } else {
      res.status(201).json({ message: 'Team member added successfully', memberId: result.insertId });
    }
  });
});

// Update a team member
router.put('/:id', (req, res) => {
  const memberId = req.params.id;
  const { Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, Id_log, Role_Mem_Eq } = req.body;
  con.query('UPDATE membre_equipe SET Nom_Mem_Eq = ?, Pren_Mem_Eq = ?, Adr_Mem_Eq = ?, Email_Mem_Eq = ?, Tel_Mem_Eq = ?, Poste_Mem_eq = ?, Id_log = ?, Role_Mem_Eq = ? WHERE Id_Mem_Eq = ?', [Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, Id_log, Role_Mem_Eq, memberId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update team member' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Team member not found' });
    } else {
      res.json({ message: 'Team member updated successfully' });
    }
  });
});

// Delete a team member
router.delete('/:id', (req, res) => {
  const memberId = req.params.id;
  con.query('DELETE FROM membre_equipe WHERE Id_Mem_Eq = ?', memberId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete team member' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Team member not found' });
    } else {
      res.json({ message: 'Team member deleted successfully' });
    }
  });
});

module.exports = router;
