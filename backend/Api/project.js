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

// Afficher les détails d'un projet avec son nom de projet
router.get('/details/nom/:nom', (req, res) => {
  const projectName = req.params.nom;
  const sql = `
    SELECT projet.*, etudes.*, depouillement.*, entreprise_cons.*, suivi.*, reglement_defin.*
    FROM projet
    LEFT JOIN etudes ON projet.Id_Proj = etudes.Id_Proj
    LEFT JOIN depouillement ON projet.Id_Proj = depouillement.Id_Proj
    LEFT JOIN entreprise_cons ON depouillement.Id_Entr_Cons = entreprise_cons.Id_Entr_Cons
    LEFT JOIN suivi ON projet.Id_Proj = suivi.Id_Proj
    LEFT JOIN reglement_defin ON projet.Id_Proj = reglement_defin.Id_Proj
    WHERE projet.Nom_Proj = ?
  `;
  con.query(sql, projectName, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Échec de récupération des détails du projet avec le nom de projet.' });
    } else {
      res.json(results);
    }
  });
});

// Afficher les détails d'un projet avec ses études, son dépouillement, son entreprise de conseil, son suivi et ses règlements définis
router.get('/details/:id', (req, res) => {
  const projectId = req.params.id;
  const sql = `
    SELECT 
      projet.Id_Proj,
      projet.Nom_Proj,
      projet.Desc_Proj,
      projet.Objectifs,
      projet.Date_Deb_Proj,
      projet.Date_Fin_Proj,
      projet.Budget_Proj,
      projet.Statut_Proj,
      projet.Id_Infra_Str,
      etudes.*,
      depouillement.*,
      entreprise_cons.*,
      suivi.*,
      reglement_defin.*
    FROM projet
    LEFT JOIN etudes ON projet.Id_Proj = etudes.Id_Proj
    LEFT JOIN depouillement ON projet.Id_Proj = depouillement.Id_Proj
    LEFT JOIN entreprise_cons ON depouillement.Id_Entr_Cons = entreprise_cons.Id_Entr_Cons
    LEFT JOIN suivi ON projet.Id_Proj = suivi.Id_Proj
    LEFT JOIN reglement_defin ON projet.Id_Proj = reglement_defin.Id_Proj
    WHERE projet.Id_Proj = ?
  `;
  con.query(sql, projectId, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Échec de récupération des détails du projet avec les études, le dépouillement, l\'entreprise de conseil, le suivi et les réglementations définies.' });
    } else {
      // Parsing des résultats JSON pour chaque table
      const formattedResults = results.map(result => {
        return {
          projet: {
            Id_Proj: result.Id_Proj,
            Nom_Proj: result.Nom_Proj,
            Desc_Proj: result.Desc_Proj,
            Objectifs: result.Objectifs,
            Date_Deb_Proj: result.Date_Deb_Proj,
            Date_Fin_Proj: result.Date_Fin_Proj,
            Budget_Proj: result.Budget_Proj,
            Statut_Proj: result.Statut_Proj,
            Id_Infra_Str: result.Id_Infra_Str
          },
          etudes: result.Id_Etu ? [{ 
            Id_Etu: result.Id_Etu,
            Obj_Etu: result.Obj_Etu,
            Desc_Etu: result.Desc_Etu,
            Date_Deb_Etu: result.Date_Deb_Etu,
            Date_Fin_Etu: result.Date_Fin_Etu,
            Statut_Etu: result.Statut_Etu,
            Remarques_Etu: result.Remarques_Etu
          }] : [],
          depouillement: result.Id_Dep ? [{
            Id_Dep: result.Id_Dep,
            Obj_Dep: result.Obj_Dep,
            Desc_Dep: result.Desc_Dep,
            Date_Deb_Dep: result.Date_Deb_Dep,
            Date_Fin_Dep: result.Date_Fin_Dep,
            Statut_Dep: result.Statut_Dep,
            Remarques_Dep: result.Remarques_Dep
          }] : [],
          entreprise_cons: result.Id_Entr_Cons ? [{
            Id_Entr_Cons: result.Id_Entr_Cons,
            Nom_Entr_Cons: result.Nom_Entr_Cons,
            Adr_Entr_Cons: result.Adr_Entr_Cons,
            Resp_Entr_Cons: result.Resp_Entr_Cons,
            Tel_Entr_Cons: result.Tel_Entr_Cons,
            Domaine_Entr_Cons: result.Domaine_Entr_Cons,
            Notes_Entr_Cons: result.Notes_Entr_Cons
          }] : [],
          suivi: result.Id_Suiv ? [{
            Id_Suiv: result.Id_Suiv,
            Obj_Suiv: result.Obj_Suiv,
            Desc_Suiv: result.Desc_Suiv,
            Date_Deb_Suiv: result.Date_Deb_Suiv,
            Date_Fin_Suiv: result.Date_Fin_Suiv,
            Statut_Suiv: result.Statut_Suiv,
            Remarques_Suiv: result.Remarques_Suiv
          }] : [],
          reglement_defin: result.Id_Reg ? [{
            Id_Reg: result.Id_Reg,
            Date_Reg: result.Date_Reg,
            Contrats_Fin: result.Contrats_Fin,
            Conform_Reg: result.Conform_Reg,
            Autorisation_Reg: result.Autorisation_Reg,
            Budget_Finalise: result.Budget_Finalise,
            Echeance_Conf: result.Echeance_Conf,
            Livrable_Valide: result.Livrable_Valide,
            Statut_Reg: result.Statut_Reg,
            Remarques_Reg: result.Remarques_Reg
          }] : []
        };
      });
      res.json(formattedResults);
    }
  });
});


// Count projects
router.get('/count', (req, res) => {
  const query = 'SELECT COUNT(Id_Proj) AS projectCount FROM projet';

  con.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err); // Enregistrer l'erreur pour le débogage côté serveur
      res.status(500).json({ error: 'Échec du comptage des projets' });
    } else {
      const projectCount = results[0]?.projectCount || 0; // Assurer une valeur par défaut si results[0] est indéfini
      res.json({ count: projectCount });
    }
  });
});


// Get delayed projects details by month and year
router.get('/retards/par_mois_annee', (req, res) => {
  const currentDate = new Date(); 
  

  const sql = `
    SELECT 
      YEAR(Date_Fin_Proj) AS Annee, 
      MONTH(Date_Fin_Proj) AS Mois, 
      Nom_Proj, 
      Date_Fin_Proj,
      TIMESTAMPDIFF(MONTH, Date_Fin_Proj, ?) AS Nb_Mois_Retard,
      TIMESTAMPDIFF(YEAR, Date_Fin_Proj, ?) AS Nb_Annees_Retard
    FROM projet
    WHERE Date_Fin_Proj > ?
    ORDER BY YEAR(Date_Fin_Proj), MONTH(Date_Fin_Proj), Date_Fin_Proj
  `;

  con.query(sql, [currentDate, currentDate, currentDate], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch delayed projects by month and year' });
    } else {
      // Group results by year and month
      const groupedResults = results.reduce((acc, project) => {
        const key = `${project.Annee}-${project.Mois}`;
        if (!acc[key]) {
          acc[key] = {
            Annee: project.Annee,
            Mois: project.Mois,
            Nb_Projets_Retard: 0,
            Projets: []
          };
        }
        acc[key].Nb_Projets_Retard += 1;
        acc[key].Projets.push({
          Nom_Proj: project.Nom_Proj,
          Date_Fin_Proj: project.Date_Fin_Proj,
          Nb_Mois_Retard: project.Nb_Mois_Retard,
          Nb_Annees_Retard: project.Nb_Annees_Retard
        });
        return acc;
      }, {});

      // Convert grouped results to an array
      const finalResults = Object.values(groupedResults);

      res.json(finalResults);
    }
  });
});


// Count projects by year
router.get('/count_annee', (req, res) => {
  con.query('SELECT YEAR(Date_Deb_Proj) AS year, COUNT(Id_Proj) AS projectCount FROM projet GROUP BY YEAR(Date_Deb_Proj)', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to count projects by year' });
    } else {
      res.json(results);
    }
  });
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

// Search projects
router.get('/search', (req, res) => {
  const keyword = req.query.keyword; // Assuming the keyword is passed as a query parameter
  const searchQuery = '%' + keyword + '%'; // Assuming you want to search for projects containing the keyword
  
  const sql = 'SELECT * FROM projet WHERE Nom_Proj LIKE ? OR Desc_Proj LIKE ?';
  con.query(sql, [searchQuery, searchQuery], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to search projects' });
    } else {
      res.json(results);
    }
  });
});

// Get projects in progress
router.get('/en_cours', (req, res) => {
  con.query('SELECT * FROM projet WHERE Statut_Proj = "En cours"', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch projects in progress' });
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
  const { Id_Proj, Nom_Proj, Desc_Proj, Objectifs, Date_Deb_Proj, Date_Fin_Proj, Budget_Proj, Statut_Proj, Id_Infra_Str} = req.body;
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
  const { Nom_Proj, Desc_Proj, Objectifs, Date_Deb_Proj, Date_Fin_Proj, Budget_Proj, Statut_Proj, Id_Infra_Str} = req.body;
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
