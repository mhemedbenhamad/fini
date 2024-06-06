const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// Charger le fichier de configuration
const config = require('./config'); 

// Initialiser l'application express
const app = express();
const port = 3000;

// Configurer le dossier statique pour les uploads
app.use('../uploads', express.static('uploads'));

// Charger les fichiers js des routes
const amenagement = require('../Api/amenagement');
const batimentAdmin = require('../Api/batimentAdmin');
const besoinsEtabSco = require('../Api/besoinsEtabSco');
const consignes = require('../Api/consignes');
const construction = require('../Api/construction');
const depouillement = require('../Api/depouillement');
const dortoir = require('../Api/dortoir');
const enterprise = require('../Api/enterprise');
const etablissementScolaire = require('../Api/etablissementScolaire');
const etudes = require('../Api/etudes');
const infrastructure = require('../Api/infrastructure');
const login = require('../Api/login');
const maintenance = require('../Api/maintenance');
const membreEquipe = require('../Api/membreEquipe');
const membreProjet = require('../Api/membreProjet');
const problem = require('../Api/probleme');
const project = require('../Api/project');
const reglementDefin = require('../Api/reglementDefin');
const resources = require('../Api/resources');
const responsableProjet = require('../Api/responsableProjet');
const restaurant = require('../Api/restaurant');
const role = require('../Api/role');
const suivi = require('../Api/suivi');

// Middleware
// Middleware
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-request-Methods", "*");
  res.setHeader("Content-Type", "application/json; charset=UTF-8");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Utiliser les routes
app.use('/amenagement', amenagement);
app.use('/batiment_admin', batimentAdmin);
app.use('/besoins_etab_sco', besoinsEtabSco);
app.use('/consignes', consignes);
app.use('/construction', construction);
app.use('/depouillement', depouillement);
app.use('/dortoir', dortoir);
app.use('/entreprise_cons', enterprise);
app.use('/etablissement_scolaire', etablissementScolaire);
app.use('/etudes', etudes);
app.use('/infrastructures', infrastructure);
app.use('/login', login);
app.use('/maintenance', maintenance);
app.use('/membre_equipe', membreEquipe);
app.use('/membre_projet', membreProjet);
app.use('/probleme', problem);
app.use('/project', project);
app.use('/reglement_defin', reglementDefin);
app.use('/ressources', resources);
app.use('/responsable_projet', responsableProjet);
app.use('/restaurant', restaurant);
app.use('/roles', role);
app.use('/suivi', suivi);

// Utiliser les paramètres de connexion à la base de données depuis le fichier de configuration
const con = mysql.createConnection(config.database);

// Démarrer serveur
con.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connexion à la base de données réussie!');
  }
});

// Serveur en écoute
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
