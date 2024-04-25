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
  console.log('MySQL projet connecté');
});

// Get all projects
router.get('/', (req, res) => {
  con.query('SELECT * FROM projet', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    } else {
      res.json(results);
    }
  });
});

// Get a single project
router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  con.query('SELECT * FROM projet WHERE Id_Proj = ?', projectId, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch project' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new project
router.post('/', (req, res) => {
  const { Id_Proj, Nom_Proj, Desc_Proj, Objectifs, Date_Deb_Proj, Date_Fin_Proj, Budget_Proj, Statut_Proj, Id_Infra_Str } = req.body;
  const newProject = {
    Id_Proj,
    Nom_Proj,
    Desc_Proj,
    Objectifs,
    Date_Deb_Proj,
    Date_Fin_Proj,
    Budget_Proj,
    Statut_Proj,
    Id_Infra_Str
    
  };
  con.query('INSERT INTO projet SET ?', newProject, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add project' });
    } else {
      res.status(201).json({ message: 'Project added successfully', projectId: result.insertId });
    }
  });
});

// Update a project
router.put('/:id', (req, res) => {
  const projectId = req.params.id;
  const { Nom_Proj, Desc_Proj, Objectifs, Date_Deb_Proj, Date_Fin_Proj, Budget_Proj, Statut_Proj, Id_Infra_Str } = req.body;
  const updatedProject = {
    Nom_Proj,
    Desc_Proj,
    Objectifs,
    Date_Deb_Proj,
    Date_Fin_Proj,
    Budget_Proj,
    Statut_Proj,
    Id_Infra_Str
  };
  con.query('UPDATE projet SET ? WHERE Id_Proj = ?', [updatedProject, projectId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update project' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      res.json({ message: 'Project updated successfully' });
    }
  });
});

// Delete a project
router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  con.query('DELETE FROM projet WHERE Id_Proj = ?', projectId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete project' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      res.json({ message: 'Project deleted successfully' });
    }
  });
});

module.exports = router;
