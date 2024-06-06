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
  console.log('MySQL entreprise_cons connecté');
});

// Get all enterprise consultancies
router.get('/', (req, res) => {
  con.query('SELECT * FROM entreprise_cons', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch enterprise consultancies' });
    } else {
      res.json(results);
    }
  });
});

// Add a new enterprise consultancy
router.post('/', (req, res) => {
  const { Id_Entr_Cons, Nom_Entr_Cons, Adr_Entr_Cons, Resp_Entr_Cons, Tel_Entr_Cons, Domaine_Entr_Cons, Notes_Entr_Cons } = req.body;
  const newEnterpriseCons = { Id_Entr_Cons, Nom_Entr_Cons, Adr_Entr_Cons, Resp_Entr_Cons, Tel_Entr_Cons, Domaine_Entr_Cons, Notes_Entr_Cons };
  con.query('INSERT INTO entreprise_cons SET ?', newEnterpriseCons, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add enterprise consultancy' });
    } else {
      res.status(201).json({ message: 'Enterprise consultancy added successfully', enterpriseId: result.insertId });
    }
  });
});

// Update an enterprise consultancy
router.put('/:id', (req, res) => {
  const enterpriseId = req.params.id;
  const { Nom_Entr_Cons, Adr_Entr_Cons, Resp_Entr_Cons, Tel_Entr_Cons, Domaine_Entr_Cons, Notes_Entr_Cons } = req.body;
  const updatedEnterpriseCons = { Nom_Entr_Cons, Adr_Entr_Cons, Resp_Entr_Cons, Tel_Entr_Cons, Domaine_Entr_Cons, Notes_Entr_Cons };
  con.query('UPDATE entreprise_cons SET ? WHERE Id_Entr_Cons = ?', [updatedEnterpriseCons, enterpriseId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update enterprise consultancy' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Enterprise consultancy not found' });
    } else {
      res.json({ message: 'Enterprise consultancy updated successfully' });
    }
  });
});

// Delete an enterprise consultancy
router.delete('/:id', (req, res) => {
  const enterpriseId = req.params.id;
  con.query('DELETE FROM entreprise_cons WHERE Id_Entr_Cons = ?', enterpriseId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete enterprise consultancy' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Enterprise consultancy not found' });
    } else {
      res.json({ message: 'Enterprise consultancy deleted successfully' });
    }
  });
});

// Route pour rechercher des entreprises par nom
router.get('/search', (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: 'Name query parameter is required' });
  }
  con.query('SELECT * FROM entreprise_cons WHERE Nom_Entr_Cons LIKE ?', [`%${name}%`], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to search enterprise consultancies' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
