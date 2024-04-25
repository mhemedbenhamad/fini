const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Remontez d'un niveau pour accéder au dossier "serveur"
const config = require('../serveur/config'); 
const con = mysql.createConnection(config.database);

// Connection à la base de donnée
con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL membre_equipe connecté');
});

// Route pour la récupération de tout les utilisateurs
router.get('/', (req, res) => {
  con.query('SELECT * FROM membre_equipe', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'impossible de parcourir les membres' });
    } else {
      res.json(results);
    }
  });
});


// Route pour la récupération d'un utilisateur
router.get('/:id', (req, res) => {
  const loginId = req.params.id;
  const selectQuery = 'SELECT * FROM membre_equipe WHERE id_Mem_Eq = ?';
  con.query(selectQuery, [loginId], (err, results) => {
    if (err) {
      res.status(500).json({ erreur: 'récupération impossible' });
    } else if (results.length === 0) {
      res.status(404).json({ erreur: 'utilisateur non trouvé' });
    } else {
      res.json(results[0]);
        
    }
  });
});

// Route pour l'ajout d'un utilisateur
router.post('/', (req, res) => {
  const { Id_Mem_Eq, Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq ,login_id_log} = req.body;
  const newMember = { Id_Mem_Eq, Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq ,login_id_log };
  con.query('INSERT INTO membre_equipe SET ?', newMember, (err, result) => {
    if (err) {
      res.status(500).json({ error: "impossible d'ajouter membre" });
    } else {
      res.status(201).json({ message: 'membre ajouté avec succé', memberId: result.insertId });
    }
  });
});

// Route pour la modification d'un utilisateur
router.put('/:id', (req, res) => {
  const memberId = req.params.id;
  const { Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq  ,login_id_log} = req.body;
  con.query('UPDATE membre_equipe SET Nom_Mem_Eq = ?, Pren_Mem_Eq = ?, Adr_Mem_Eq = ?, Email_Mem_Eq = ?, Tel_Mem_Eq = ?, Poste_Mem_eq = ? WHERE Id_Mem_Eq = ? ', [Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq , memberId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'impossible de modifier membre' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'membre non trouvé' });
    } else {
      res.json({ message: 'membre modifié avec succé' });
    }
  });
});

// Route pour la suppression d'un utilisateur
router.delete('/:id', (req, res) => {
  const memberId = req.params.id;
  con.query('DELETE FROM membre_equipe WHERE Id_Mem_Eq = ?', memberId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'impossible de supprimer membre' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'membre non trouvé' });
    } else {
      res.json({ message: 'membre supprimé avec succé' });
    }
  });
});



module.exports = router;


