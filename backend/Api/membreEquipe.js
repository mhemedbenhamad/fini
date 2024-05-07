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
router.post('/add', (req, res) => {
  const { Id_Mem_Eq, Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, login_id_log } = req.body;
  const newMember = { Id_Mem_Eq, Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, login_id_log };
  con.query('INSERT INTO membre_equipe SET ?', newMember, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add team member' });
    } else {
      res.status(201).json({ message: 'Team member added successfully', memberId: result.insertId });
    }
  });
});

// Update a team member
router.put('/update/:id', (req, res) => {
  const memberId = req.params.id;
  const { Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, login_id_log } = req.body;

  con.query(
    'UPDATE membre_equipe SET Nom_Mem_Eq = ?, Pren_Mem_Eq = ?, Adr_Mem_Eq = ?, Email_Mem_Eq = ?, Tel_Mem_Eq = ?, Poste_Mem_eq = ?, login_id_log = ? WHERE Id_Mem_Eq = ?',
    [Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, login_id_log, memberId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Échec de la mise à jour du membre de l\'équipe' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Membre de l\'équipe introuvable' });
      } else {
        res.json({ message: 'Membre de l\'équipe mis à jour avec succès' });
      }
    }
  );
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

// Fonction pour récupérer les données des membres d'équipe avec les informations de login
function recupererDonneesMembreEquipeEtLogin() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT membre_equipe.*, login.username, login.password, login.role FROM membre_equipe INNER JOIN login ON membre_equipe.login_id_log = login.id_log';
    con.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Récupérer tous les membres d'équipe avec les informations de login
router.get('/membre_equipe_et_login', async (req, res) => {
  try {
    const membresEquipeAvecLogin = await recupererDonneesMembreEquipeEtLogin();
    res.json(membresEquipeAvecLogin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team members with login info' });
  }
});

// Récupérer un membre d'équipe et login par son ID
router.get('/membre_equipe_login/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT membre_equipe.*, login.username, login.password, login.role FROM membre_equipe INNER JOIN login ON membre_equipe.login_id_log = login.id_log WHERE membre_equipe.Id_Mem_Eq = ?';
  con.query(sql, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Failed to fetch team member with login info' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Team member not found' });
      } else {
        res.json(results[0]);
      }
    }
  });
});

// Fonction pour modifier à la fois le membre d'équipe et le login
function modifierMembreEquipeEtLogin(id, nouveauNom, nouveauPrenom, nouvelleAdresse, nouvelEmail, nouveauTelephone, nouveauPoste, nouveauRole, nouveauUsername, nouveauPassword) {
  return new Promise((resolve, reject) => {
    con.beginTransaction((err) => {
      if (err) {
        reject(err);
      }

      // Vérifier si les nouvelles valeurs ne sont pas vides
      if (!nouveauNom || !nouveauPrenom || !nouvelleAdresse || !nouvelEmail || !nouveauTelephone || !nouveauPoste || !nouveauRole || !nouveauUsername || !nouveauPassword) {
        return reject("Toutes les valeurs doivent être fournies pour la mise à jour");
      }

      const sqlMembreEquipe = 'UPDATE membre_equipe SET Nom_Mem_Eq = ?, Pren_Mem_Eq = ?, Adr_Mem_Eq = ?, Email_Mem_Eq = ?, Tel_Mem_Eq = ?, Poste_Mem_eq = ? WHERE Id_Mem_Eq = ?';
      con.query(sqlMembreEquipe, [nouveauNom, nouveauPrenom, nouvelleAdresse, nouvelEmail, nouveauTelephone, nouveauPoste, id], (error1, result1) => {
        if (error1) {
          return con.rollback(() => {
            reject(error1);
          });
        }

        const sqlLogin = 'UPDATE login SET role = ?, username = ?, password = ? WHERE id_log = (SELECT login_id_log FROM membre_equipe WHERE Id_Mem_Eq = ?)';
        con.query(sqlLogin, [nouveauRole, nouveauUsername, nouveauPassword, id], (error2, result2) => {
          if (error2) {
            return con.rollback(() => {
              reject(error2);
            });
          }

          con.commit((err) => {
            if (err) {
              return con.rollback(() => {
                reject(err);
              });
            }
            resolve('Modification réussie');
          });
        });
      });
    });
  });
}



// Modifier à la fois le membre d'équipe et le login
router.put('/modifier_membre_login/:id', async (req, res) => {
  const id = req.params.id;
  const { nouveauNom, nouveauPrenom, nouvelleAdresse, nouvelEmail, nouveauTelephone, nouveauPoste, nouveauRole, nouveauUsername, nouveauPassword } = req.body;
  try {
    // Vérifier si toutes les valeurs sont fournies
    if (!nouveauNom || !nouveauPrenom || !nouvelleAdresse || !nouvelEmail || !nouveauTelephone || !nouveauPoste || !nouveauRole || !nouveauUsername || !nouveauPassword) {
      return res.status(400).json({ error: 'Toutes les valeurs doivent être fournies pour la mise à jour' });
    }
    
    const resultat = await modifierMembreEquipeEtLogin(id, nouveauNom, nouveauPrenom, nouvelleAdresse, nouvelEmail, nouveauTelephone, nouveauPoste, nouveauRole, nouveauUsername, nouveauPassword);
    res.json({ message: resultat });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team member and login info' });
  }
});



module.exports = router;
