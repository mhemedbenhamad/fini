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
  console.log('MySQL roles connecté');
});

// Get all roles
router.get('/', (req, res) => {
  con.query('SELECT * FROM roles', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch roles' });
    } else {
      res.json(results);
    }
  });
});

// Add a new role
router.post('/', (req, res) => {
  const { Id_Mem_Eq, Id_Proj, Role } = req.body;
  const newRole = { Id_Mem_Eq, Id_Proj, Role };
  con.query('INSERT INTO roles SET ?', newRole, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add role' });
    } else {
      res.status(201).json({ message: 'Role added successfully', roleId: result.insertId });
    }
  });
});

// Update a role
router.put('/:id', (req, res) => {
  const roleId = req.params.id;
  const { Id_Mem_Eq, Id_Proj, Role } = req.body;
  con.query('UPDATE roles SET Id_Mem_Eq = ?, Id_Proj = ?, Role = ? WHERE Id = ?', [Id_Mem_Eq, Id_Proj, Role, roleId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update role' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Role not found' });
    } else {
      res.json({ message: 'Role updated successfully' });
    }
  });
});

// Delete a role
router.delete('/:id', (req, res) => {
  const roleId = req.params.id;
  con.query('DELETE FROM roles WHERE Id = ?', roleId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete role' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Role not found' });
    } else {
      res.json({ message: 'Role deleted successfully' });
    }
  });
});


module.exports = router;
