const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt =require('jsonwebtoken');

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

// Login API
router.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Perform authentication logic (replace this with your actual authentication logic)
    con.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('MySQL error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length === 1) {
            const user = results[0];
            // Vérification du rôle de l'utilisateur
            switch (user.role) {
                case 'admin':
                    res.json({ message: 'Login successful', role: 'admin' });
                    break;
                case 'responsable':
                    res.json({ message: 'Login successful', role: 'responsable' });
                    break;
                case 'member_equipe':
                    res.json({ message: 'Login successful', role: 'member_equipe' });
                    break;
                case 'school':
                    
                    res.json({ message: 'Login successful', role: 'school' });
                    break;
                default:
                    res.status(403).json({ message: 'Unauthorized access' });
                    break;
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Data API
router.get('/user/data', (req, res) => {
    con.query('SELECT * FROM login', (err, results) => {
        if (err) {
            console.error('Erreur lors de la requête SQL :', err);
            res.status(500).send('Erreur serveur');
        } else {
            res.json(results);
        }
    });
});

router.post('/user/add', (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Username, password, and role are required' });
    }

    // Obtenir le prochain numéro d'identification disponible (id_log)
    con.query('SELECT MAX(id_log) AS maxId FROM login', (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération du dernier id_log :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }

        // Calculer le prochain id_log disponible
        const nextId = result[0].maxId ? result[0].maxId + 1 : 1;

        // Créer le nouvel utilisateur avec le prochain id_log disponible
        const newUser = { id_log: nextId, username, password, role };

        // Insérer le nouvel utilisateur dans la base de données
        con.query('INSERT INTO login SET ?', newUser, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
                return res.status(500).json({ message: 'Erreur serveur' });
            }

            // Récupérer l'utilisateur ajouté pour envoyer en réponse
            con.query('SELECT * FROM login WHERE id_log = ?', nextId, (err, user) => {
                if (err) {
                    console.error('Erreur lors de la récupération de l\'utilisateur ajouté :', err);
                    return res.status(500).json({ message: 'Erreur serveur' });
                }

                res.status(201).json({ message: 'Utilisateur ajouté avec succès', user });
            });
        });
    });
});



// Modifier un utilisateur
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { username, password, role } = req.body;

    // Validation des données d'entrée
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Username, password, and role are required' });
    }

    // Utilisation d'une requête préparée pour éviter les attaques par injection SQL
    con.query('UPDATE login SET username = ?, password = ?, role = ? WHERE id_log = ?', [username, password, role, userId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la modification de l\'utilisateur :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json({ message: 'Utilisateur modifié avec succès' });
    });
});



// Supprimer un utilisateur
router.delete('/user/delete/:id', (req, res) => {
    const userId = req.params.id;

    con.query('DELETE FROM login WHERE id_log = ?', userId, (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', err);
            res.status(500).json({ message: 'Erreur serveur' });
        } else {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.json({ message: 'Utilisateur supprimé avec succès' });
        }
    });
});

//Création du token
router.post('/token', (req, res) => {
    const { username, password } = req.body;
    con.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
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



  //bcrypt
  router.post('/bcrypt', (req, res) => {
    const { username, password ,role} = req.body;
  (async()=>{

    const bcrypt = require('bcrypt');
    try {
        let salt =await bcrypt.genSalt(10)
        let hash =await bcrypt.hash(password,salt)
        const newUser = { username, hash, role }; // Inclure le rôle dans le nouvel utilisateur

        con.query('INSERT INTO login SET ?', newUser, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
                return res.status(500).json({ message: 'Erreur serveur' });
            } })

        let compare =await bcrypt.compare(text,hash)
        console.log(compare)
    } catch (error) {
        console.log (error.message)
    }
  })()});

module.exports = router;
