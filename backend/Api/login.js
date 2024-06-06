const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs'); // Importer bcrypt pour le cryptage du mot de passe
const jwt = require('jsonwebtoken');
const config = require('../serveur/config');
const authenticateToken = require('../serveur/middleware/authenticateToken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const con = mysql.createConnection(config.database);

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL login connecté');
});

// Définition de l'emplacement de stockage des images téléchargées
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/')) // Chemin absolu du répertoire "uploads"
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

// Configuration de multer avec le stockage défini ci-dessus
const upload = multer({ storage: storage });

// Fonction pour crypter le mot de passe
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10); // Générer un sel
    const hashedPassword = await bcrypt.hash(password, salt); // Crypter le mot de passe avec le sel
    return hashedPassword;
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe :', error);
    throw error;
  }
};

// Route pour ajouter un utilisateur avec une image
router.post('/user/add', upload.single('image'), (req, res) => {
  const { username, password, role } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  hashPassword(password)
    .then((hashedPassword) => {
      const newUser = { username, password: hashedPassword, role, image: req.file.filename };

      con.query('SELECT MAX(id_log) as maxId FROM login', (err, result) => {
        if (err) {
          console.error('Error checking login table:', err);
          return res.status(500).json({ message: 'Server Error' });
        }

        const maxId = result[0].maxId || 0;
        newUser.id_log = maxId + 1;

        con.query('INSERT INTO login SET ?', newUser, (err, result) => {
          if (err) {
            console.error('Error adding user:', err);
            return res.status(500).json({ message: 'Server Error' });
          }

          const userId = result.insertId || newUser.id_log;

          con.query('SELECT * FROM login WHERE id_log = ?', [userId], (err, user) => {
            if (err) {
              console.error('Error fetching added user:', err);
              return res.status(500).json({ message: 'Server Error' });
            }

            res.status(201).json({ message: 'User added successfully', user: user[0] });
          });
        });
      });
    })
    .catch((error) => {
      console.error('Error hashing password:', error);
      return res.status(500).json({ message: 'Server Error' });
    });
});






// Route pour réinitialiser le mot de passe d'un utilisateur (administrateur seulement)
router.put('/user/reset-password/:id',  (req, res) => {
  const userId = req.params.id;
  const { newPassword } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé' });
  }

  if (!newPassword) {
    return res.status(400).json({ message: 'Nouveau mot de passe requis' });
  }

  bcrypt.hash(newPassword, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    con.query('UPDATE login SET password = ? WHERE id_log = ?', [hash, userId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      res.json({ message: 'Mot de passe réinitialisé avec succès' });
    });
  });
});

// Route pour mettre à jour le rôle d'un utilisateur par ID
router.put('/user/update-role/:id', authenticateToken, (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: 'Role is required' });
  }

  con.query('UPDATE login SET role = ? WHERE id_log = ?', [role, userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la modification du rôle de l\'utilisateur :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Rôle de l\'utilisateur modifié avec succès' });
  });
});



// Route pour mettre à jour les informations d'un utilisateur par ID
router.put('/user_modifiee/:id', authenticateToken, upload.single('image'), (req, res) => {
  const userId = req.params.id;
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  // Crypter le nouveau mot de passe avant de le mettre à jour dans la base de données
  hashPassword(password)
    .then((hashedPassword) => {
      // Préparer les valeurs de mise à jour
      const updateValues = [username, hashedPassword, role];
      let query = 'UPDATE login SET username = ?, password = ?, role = ?';

      // Vérifiez si un fichier image a été envoyé
      if (req.file) {
        updateValues.push(req.file.filename); // Nom du fichier de l'image téléchargée
        query += ', image = ?';
      }

      updateValues.push(userId);
      query += ' WHERE id_log = ?';

      // Exécuter la requête UPDATE avec les valeurs mises à jour et l'ID de l'utilisateur
      con.query(query, updateValues, (err, result) => {
        if (err) {
          console.error('Erreur lors de la modification de l\'utilisateur :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json({ message: 'Utilisateur modifié avec succès' });
      });
    })
    .catch((error) => {
      console.error('Erreur lors du cryptage du mot de passe :', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    });
});







// Route de connexion
router.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  con.query('SELECT * FROM login WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('MySQL error:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length === 0) {
      console.log('No user found with that username');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Bcrypt error:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (!isMatch) {
        console.log('Password does not match');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (['admin', 'responsable', 'member_equipe', 'school', 'gestionnaire-projet'].includes(user.role)) {
        const token = jwt.sign({ id: user.id_log, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token, role: user.role });
      } else {
        console.log('Unauthorized role');
        return res.status(401).json({ message: 'Unauthorized role' });
      }
    });
  });
});

// Route pour récupérer les données des utilisateurs avec mots de passe décryptés
router.get('/user/data-decrypted', (req, res) => {
  con.query('SELECT * FROM login', (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête SQL :', err);
      res.status(500).send('Erreur serveur');
    } else {
      const decryptedUserData = results.map(user => {
        // Comparer le mot de passe en clair avec le mot de passe hashé
        const isPasswordMatch = bcrypt.compareSync('password', user.password);
        if (isPasswordMatch) {
          // Si les mots de passe correspondent, ajouter l'utilisateur avec le mot de passe en clair
          return { id: user.id_log, username: user.username, role: user.role, password: 'password' };
        } else {
          // Si les mots de passe ne correspondent pas, ajouter l'utilisateur avec un message d'erreur
          return { id: user.id_log, username: user.username, role: user.role, password: 'Mot de passe non disponible' };
        }
      });
      res.json(decryptedUserData);
    }
  });
});


// Route pour récupérer le profil utilisateur
router.get('/api/profile', authenticateToken, (req, res) => {
  const userId = req.user.id;

  con.query('SELECT id_log, username, role, image FROM login WHERE id_log = ?', [userId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération du profil utilisateur :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Profil utilisateur non trouvé' });
    }

    res.json({ profile: results[0] });
  });
});




// Route pour changer le mot de passe
router.put('/api/user/password', authenticateToken, (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Old password and new password are required' });
  }

  con.query('SELECT password FROM login WHERE id_log = ?', [userId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification du mot de passe :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Ancien mot de passe incorrect' });
    }

    const user = results[0];

    if (!user.password) {
      console.error('Le mot de passe récupéré est indéfini');
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
      if (err) {
        console.error('Bcrypt error:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Ancien mot de passe incorrect' });
      }

      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
          console.error('Erreur lors du hachage du mot de passe :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        con.query('UPDATE login SET password = ? WHERE id_log = ?', [hash, userId], (err) => {
          if (err) {
            console.error('Erreur lors de la modification du mot de passe :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
          }

          res.json({ message: 'Mot de passe modifié avec succès' });
        });
      });
    });
  });
});

// Route protégée
router.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Route pour compter les utilisateurs
router.get('/user/count', (req, res) => {
  con.query('SELECT COUNT(*) AS userCount FROM login', (err, result) => {
    if (err) {
      console.error('Erreur lors de la requête SQL :', err);
      res.status(500).send('Erreur serveur');
    } else {
      const userCount = result[0].userCount;
      res.json({ userCount });
    }
  });
});

// Route pour récupérer les données des utilisateurs
router.get('/user/data', (req, res) => {
  con.query('SELECT * FROM login', (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête SQL :', err);
      res.status(500).send('Erreur serveur');
    } else {
      results.forEach(user => {
        if (user.image && user.image.data) {
          // Convertir les données binaires en une chaîne Base64
          const imageData = Buffer.from(user.image.data).toString('base64');
          user.image = {
            type: 'Buffer',
            data: imageData
          };
        }
      });
      res.json(results);
    }
  });
});




// Route pour récupérer l'image d'un utilisateur
router.get('/user/image/:id', (req, res) => {
  const userId = req.params.id;

  con.query('SELECT image FROM login WHERE id_log = ?', [userId], (err, result) => {
      if (err) {
          console.error('Erreur lors de la récupération de l\'image de l\'utilisateur :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
      }

      if (result.length === 0 || !result[0].image) {
          return res.status(404).json({ message: 'Image utilisateur non trouvée' });
      }

      const imagePath = path.join(__dirname, '..', 'uploads', result[0].image.toString());
      // Lire le fichier image
      fs.readFile(imagePath, (err, data) => {
          if (err) {
              console.error('Erreur lors de la lecture du fichier :', err);
              return res.status(500).json({ message: 'Erreur serveur' });
          }
          // Convertir les données en base64
          const base64Image = Buffer.from(data).toString('base64');
          const imageData = `data:image/jpeg;base64,${base64Image}`;
          // Envoyer les données de l'image encodée en base64 en tant que réponse
          res.json({ imageData });
      });
  });
});




  

router.get('/user/:id',  (req, res) => {
    const userId = req.params.id;
  
    con.query('SELECT username, role FROM login WHERE id_log = ?', [userId], (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Données utilisateur non trouvées' });
      }
  
      res.json(results[0]);
    });
  });
  

// Route pour mettre à jour les informations d'un utilisateur par ID
router.put('/user/:id', authenticateToken, (req, res) => {
  const userId = req.params.id;
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Erreur lors du hachage du mot de passe :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    con.query('UPDATE login SET username = ?, password = ?, role = ? WHERE id_log = ?', [username, hash, role, userId], (err, result) => {
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
});

// Route pour supprimer un utilisateur par ID
router.delete('/user/delete/:id', authenticateToken, (req, res) => {
  const userId = req.params.id;

  // Vérifier le rôle de l'utilisateur
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
  }

  con.query('DELETE FROM login WHERE id_log = ?', [userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Utilisateur supprimé avec succès' });
  });
});


module.exports = router;

