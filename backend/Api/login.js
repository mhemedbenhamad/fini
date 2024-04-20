const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');


// Remontez d'un niveau pour accéder au dossier "serveur"
const config = require('../serveur/config'); 
const con = mysql.createConnection(config.database);

// Connection à la base login
con.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('MySQL login connecté');
  });

// Route pour la création d'un utilisateur
router.post('/', (req, res) => {
  const { users, passwords } = req.body;
  const insertQuery = 'INSERT INTO login (users, passwords) VALUES (?, ?)';
  con.query(insertQuery, [users, passwords], (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur :' });
    } else {
      res.status(201).send('Utilisateur créé avec succès');
    }
  });
});

// Route pour la récupération de tous les utilisateurs
router.get('/', (req, res) => {
  const selectQuery = 'SELECT * FROM login';
  con.query(selectQuery, (err, data) => {
    if (err) {
        res.status(500).send('erreur de récupération');
        return;
    } else {
      res.json(data);
    }
  });
});

// Route pour la récupération d'un utilisateur
router.get('/:id', (req, res) => {
  const loginId = req.params.id;
  const selectQuery = 'SELECT * FROM login WHERE Id_log = ?';
  con.query(selectQuery, [loginId], (err, results) => {
    if (err) {
      res.status(500).json({ erreur: 'erreur de récupération' });
    } else if (results.length === 0) {
      res.status(404).json({ erreur: 'utilisateur non trouvé' });
    } else {
      res.json(results[0]);
    }
  });
});

// Route pour la mise à jour d'un utilisateur
router.put('/:id', (req, res) => {
  const loginId = req.params.id;
  const { users, passwords } = req.body;
  const updateQuery = 'UPDATE login SET users = ?, passwords = ? WHERE Id_log = ?';
  con.query(updateQuery, [users, passwords, loginId], (err, result) => {
    if (err) {
      res.status(500).json({ erreur: 'erreur de mise à jour' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ erreur: 'utilisateur non trouvé' });
    } else {
      res.json({ message: 'mise à jour avec succée' });
    }
  });
});

// Route pour la suppression d'un utilisateur
router.delete('/:id', (req, res) => {
  const loginId = req.params.id;
  const deleteQuery = 'DELETE FROM login WHERE Id_log = ?';
  con.query(deleteQuery, [loginId], (err, data) => {
    if (err) {
      res.status(500).json({ erreur: 'Erreur lors de la suppression de l\'utilisateur : ' });
    } else if (data.affectedRows === 0) {
      res.status(404).json({ erreur: 'utilisateur non trouvé' });
    } else {
      res.status(201).send('Utilisateur supprimé avec succès');
    }
  });
});


//Création du token
router.post('/token', (req, res) => {
  const { users, passwords} = req.body;
  con.query('SELECT * FROM login WHERE users = ? AND passwords = ? ', [users, passwords], (error, results, fields) => {
      if (error) {
          console.error('Erreur lors de l\'exécution de la requête : ', error);
          res.status(500).json({ message: 'Erreur interne du serveur' });
          return;
      }
      if (results.length > 0) {
          const user = results[0];
          const token = jwt.sign({ username: user.users, role: user.role }, jwtSecret, { expiresIn: '1h' });
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



module.exports = router;
