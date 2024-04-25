const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt =require('jsonwebtoken')

// Remontez d'un niveau pour accéder au dossier "serveur"
const config = require('../serveur/config'); 
const con = mysql.createConnection(config.database);

// Connection à la base de donnée
con.connect((err) => {
  if (err) {
    throw err;
    
  }
  console.log('MySQL login connecté');
});

// Route pour la récupération de tout les utilisateurs
router.get('/', (req, res) => {
  con.query('SELECT * FROM login', (err, results) => {
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
  const selectQuery = 'SELECT * FROM login WHERE id_log = ?';
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
  const { id_log, users,passwords ,role } = req.body;
  const newMember = { id_log, users,passwords, role };
  con.query('INSERT INTO login SET ?', newMember, (err, result) => {
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
  const {users, passwords,role } = req.body;
  con.query('UPDATE login SET users = ?,passwords= ? ,role = ? WHERE id_log = ?', [ users, passwords,role, memberId], (err, result) => {
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
  con.query('DELETE FROM login WHERE id_log = ?', memberId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'impossible de supprimer membre' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'membre non trouvé' });
    } else {
      res.json({ message: 'membre supprimé avec succé' });
    }
  });
  
});




//Création du token
router.post('/token', (req, res) => {
  const { users, passwords } = req.body;
  con.query('SELECT * FROM login WHERE users = ? AND passwords = ?', [users, passwords], (error, results, fields) => {
    if (error) {
          console.error('Erreur lors de l\'exécution de la requête : ', error);
          res.status(500).json({ message: 'Erreur interne du serveur' });
          return;
      }
      if (results.length > 0) {
          const user = results[0];
          const jwtSecret = config.jwtSecret;
          const token = jwt.sign({ username: user.user, role: user.role }, jwtSecret, { expiresIn: '1h' });
          res.json({ token });
      } else {
          res.status(401).json({ message: 'utilisateur ou mot de passe incorrecte' });
      }
  });
});

// Middleware pour vérifier le token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
  }
  jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: 'Token invalide' });
      }
      req.user = decoded;
      next();
  });
}

// Route pour la page d'accueil
router.get('/accueil', verifyToken, (req, res) => {
  if (req.user.role === 'respnsable') {
      res.send('Bienvenue sur la page d\'accueil (utilisateur normal)');
  } else  {
    res.status(403).json({ message: 'Accès interdit : vous n\'êtes pas utilisateur' });
  }
});

// Route pour la page d'administration
router.get('/admin', verifyToken, (req, res) => {
  if (req.user.role === 'admin') {
      res.send('Bienvenue sur la page d\'administration');
  } else {
      res.status(403).json({ message: 'Accès interdit : vous n\'êtes pas administrateur' });
  }
});

module.exports = router;


