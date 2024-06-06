-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 03 juin 2024 à 19:50
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bd_crm`
--

-- --------------------------------------------------------

--
-- Structure de la table `amenagement`
--

CREATE TABLE `amenagement` (
  `Id_Proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `batiment_admin`
--

CREATE TABLE `batiment_admin` (
  `Id_Infra_Str` int(11) NOT NULL,
  `Surface_Bat` varchar(50) DEFAULT NULL,
  `Nb_Etages` varchar(50) DEFAULT NULL,
  `Usages` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `besoins_etab_sco`
--

CREATE TABLE `besoins_etab_sco` (
  `Id_Bes` int(11) NOT NULL,
  `Qte_Bes` varchar(50) DEFAULT NULL,
  `Date_Bes` date DEFAULT NULL,
  `Desc_Bes` varchar(50) DEFAULT NULL,
  `Remarques_Bes` varchar(50) DEFAULT NULL,
  `Id_Infra_Str` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `consignes`
--

CREATE TABLE `consignes` (
  `Id_Cons` int(11) NOT NULL,
  `Sujet_Cons` varchar(50) DEFAULT NULL,
  `Date_Cons` date DEFAULT NULL,
  `Id_Mem_Eq` int(11) NOT NULL,
  `Id_Proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `construction`
--

CREATE TABLE `construction` (
  `Id_Proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contacte`
--

CREATE TABLE `contacte` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `fonction` varchar(255) NOT NULL,
  `numero` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contacte`
--

INSERT INTO `contacte` (`id`, `nom`, `prenom`, `fonction`, `numero`) VALUES
(1, 'khaled', 'mokhtar', 'admin', '+21628998114');

-- --------------------------------------------------------

--
-- Structure de la table `depouillement`
--

CREATE TABLE `depouillement` (
  `Id_Dep` int(11) NOT NULL,
  `Obj_Dep` varchar(50) DEFAULT NULL,
  `Desc_Dep` varchar(50) DEFAULT NULL,
  `Date_Deb_Dep` date DEFAULT NULL,
  `Date_Fin_Dep` date DEFAULT NULL,
  `Statut_Dep` varchar(50) DEFAULT NULL,
  `Remarques_Dep` varchar(50) DEFAULT NULL,
  `Id_Entr_Cons` int(11) NOT NULL,
  `Id_Proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `depouillement`
--

INSERT INTO `depouillement` (`Id_Dep`, `Obj_Dep`, `Desc_Dep`, `Date_Deb_Dep`, `Date_Fin_Dep`, `Statut_Dep`, `Remarques_Dep`, `Id_Entr_Cons`, `Id_Proj`) VALUES
(1, 'Analyse des performances', 'Effectuer une analyse', '2024-05-13', '2024-05-20', 'En cours', 'Nécessite une expertise approfondie en analyse de ', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `dortoir`
--

CREATE TABLE `dortoir` (
  `Id_Infra_Str` int(11) NOT NULL,
  `Genre_Dor` varchar(50) DEFAULT NULL,
  `Nb_Chamb` varchar(50) DEFAULT NULL,
  `Nb_Lits` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `entreprise_cons`
--

CREATE TABLE `entreprise_cons` (
  `Id_Entr_Cons` int(11) NOT NULL,
  `Nom_Entr_Cons` varchar(50) DEFAULT NULL,
  `Adr_Entr_Cons` varchar(50) DEFAULT NULL,
  `Resp_Entr_Cons` varchar(50) DEFAULT NULL,
  `Tel_Entr_Cons` varchar(50) DEFAULT NULL,
  `Domaine_Entr_Cons` varchar(50) DEFAULT NULL,
  `Notes_Entr_Cons` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `entreprise_cons`
--

INSERT INTO `entreprise_cons` (`Id_Entr_Cons`, `Nom_Entr_Cons`, `Adr_Entr_Cons`, `Resp_Entr_Cons`, `Tel_Entr_Cons`, `Domaine_Entr_Cons`, `Notes_Entr_Cons`) VALUES
(1, 'ben kilanii', 'gabes', 'ali', '75222555', 'construction', 'bien');

-- --------------------------------------------------------

--
-- Structure de la table `etablissement_scolaire`
--

CREATE TABLE `etablissement_scolaire` (
  `Id_Infra_Str` int(11) NOT NULL,
  `Cat_Etab_Sco` varchar(50) DEFAULT NULL,
  `Effectif` varchar(50) DEFAULT NULL,
  `Nb_Salles` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `etudes`
--

CREATE TABLE `etudes` (
  `Id_Etu` int(11) NOT NULL,
  `Obj_Etu` varchar(50) DEFAULT NULL,
  `Desc_Etu` varchar(50) DEFAULT NULL,
  `Date_Deb_Etu` date DEFAULT NULL,
  `Date_Fin_Etu` date DEFAULT NULL,
  `Statut_Etu` varchar(50) DEFAULT NULL,
  `Remarques_Etu` varchar(50) DEFAULT NULL,
  `Id_Proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etudes`
--

INSERT INTO `etudes` (`Id_Etu`, `Obj_Etu`, `Desc_Etu`, `Date_Deb_Etu`, `Date_Fin_Etu`, `Statut_Etu`, `Remarques_Etu`, `Id_Proj`) VALUES
(1, 'Étude de marché', 'Réaliser une étude ', '2024-05-01', '2024-06-30', 'En cours', 'Nécessite des analyses sectorielles détaillées.', 1);

-- --------------------------------------------------------

--
-- Structure de la table `infrastructure_edu`
--

CREATE TABLE `infrastructure_edu` (
  `Id_Infra_Str` int(11) NOT NULL,
  `Nom_Infra_Str` varchar(50) DEFAULT NULL,
  `Adr_Infra_Str` varchar(50) DEFAULT NULL,
  `Directeur_Infra_Str` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `infrastructure_edu`
--

INSERT INTO `infrastructure_edu` (`Id_Infra_Str`, `Nom_Infra_Str`, `Adr_Infra_Str`, `Directeur_Infra_Str`) VALUES
(1, 'ecole', 'douze', 'ali');

-- --------------------------------------------------------

--
-- Structure de la table `login`
--

CREATE TABLE `login` (
  `id_log` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','responsable','member_equipe','school','gestionnaire-projet') DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `login`
--

INSERT INTO `login` (`id_log`, `username`, `password`, `role`, `image`) VALUES
(1, 'khaled', '$2a$10$zHY4VEhuZH1GaFEPJhK0T.koE98aG2xz3UWr6nBOjUQraAWmDwAnS', 'admin', '1717010414073-khaled.jpg'),
(75, 'ali', '$2a$10$MssxicgJLIvqNdQDsauiJOjw3RmoAAc4TdIGGm2Nx87myzXGegE2G', 'gestionnaire-projet', '1717011040215-logo.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `maintenance`
--

CREATE TABLE `maintenance` (
  `Id_Proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `membre_equipe`
--

CREATE TABLE `membre_equipe` (
  `Id_Mem_Eq` int(11) NOT NULL,
  `Nom_Mem_Eq` varchar(50) DEFAULT NULL,
  `Pren_Mem_Eq` varchar(50) DEFAULT NULL,
  `Adr_Mem_Eq` varchar(50) DEFAULT NULL,
  `Email_Mem_Eq` varchar(50) DEFAULT NULL,
  `Tel_Mem_Eq` varchar(50) DEFAULT NULL,
  `Poste_Mem_eq` varchar(50) DEFAULT NULL,
  `login_id_log` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `membre_projet`
--

CREATE TABLE `membre_projet` (
  `Id_Proj` int(11) NOT NULL,
  `Id_Mem_Eq` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `probleme`
--

CREATE TABLE `probleme` (
  `Id_Prob` int(11) NOT NULL,
  `Type_Prob` varchar(50) DEFAULT NULL,
  `Desc_Prob` varchar(50) DEFAULT NULL,
  `Date_Det_Prob` date DEFAULT NULL,
  `Solution` varchar(50) DEFAULT NULL,
  `Id_Proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `projet`
--

CREATE TABLE `projet` (
  `Id_Proj` int(11) NOT NULL,
  `Nom_Proj` varchar(50) DEFAULT NULL,
  `Desc_Proj` varchar(50) DEFAULT NULL,
  `Objectifs` varchar(50) DEFAULT NULL,
  `Date_Deb_Proj` date DEFAULT NULL,
  `Date_Fin_Proj` date DEFAULT NULL,
  `Budget_Proj` varchar(50) DEFAULT NULL,
  `Statut_Proj` varchar(50) DEFAULT NULL,
  `Id_Infra_Str` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `projet`
--

INSERT INTO `projet` (`Id_Proj`, `Nom_Proj`, `Desc_Proj`, `Objectifs`, `Date_Deb_Proj`, `Date_Fin_Proj`, `Budget_Proj`, `Statut_Proj`, `Id_Infra_Str`) VALUES
(1, 'batiment', 'bien', 'bb', '2023-01-01', '2023-01-10', '10000', 'En attente', 1),
(2, 'ecole', 'mouvee', 'e', '2022-01-10', '2024-12-30', '1000', 'En cours', 1),
(3, 'construction', 'bien', 'traduire', '2024-01-01', '2024-12-01', '1500000', 'En cours', 1),
(4, 'Project Delta', 'Description Delta', 'Objective Delta', '2021-01-05', '2021-06-05', '150000', 'Completed', 1),
(5, 'Project Epsilon', 'Description Epsilon', 'Objective Epsilon', '2021-03-15', '2021-09-15', '200000', 'Completed', 1),
(6, 'Project Zita', 'Description Zeta', 'Objective Zeta', '2021-05-24', '2021-11-24', '250000', 'Completed', 1),
(7, 'Project Eta', 'Description Eta', 'Objective Eta', '2022-01-10', '2022-07-10', '300000', 'Completed', 1),
(8, 'Project Theta', 'Description Theta', 'Objective Theta', '2022-03-20', '2022-09-20', '350000', 'Completed', 1),
(9, 'Project Iota', 'Description Iota', 'Objective Iota', '2022-06-05', '2022-12-05', '400000', 'Completed', 1),
(10, 'Project Kappa', 'Description Kappa', 'Objective Kappa', '2022-08-15', '2023-02-15', '450000', 'Completed', 1),
(11, 'Project Lambda', 'Description Lambda', 'Objective Lambda', '2023-01-20', '2023-07-20', '500000', 'Ongoing', 1),
(12, 'Project Mu', 'Description Mu', 'Objective Mu', '2023-04-05', '2023-10-05', '550000', 'Ongoing', 1),
(13, 'Project Nu', 'Description Nu', 'Objective Nu', '2023-07-15', '2024-01-15', '600000', 'Planned', 1),
(14, 'Project Xi', 'Description Xi', 'Objective Xi', '2023-09-25', '2024-03-25', '650000', 'Planned', 1),
(15, 'Project Omicron', 'Description Omicron', 'Objective Omicron', '2024-01-05', '2024-07-05', '700000', 'Planned', 1),
(16, 'Project Pi', 'Description Pi', 'Objective Pi', '2024-03-15', '2024-09-15', '750000', 'Planned', 1);

-- --------------------------------------------------------

--
-- Structure de la table `reglement_defin`
--

CREATE TABLE `reglement_defin` (
  `Id_Reg` int(11) NOT NULL,
  `Date_Reg` date DEFAULT NULL,
  `Contrats_Fin` varchar(50) DEFAULT NULL,
  `Conform_Reg` varchar(50) DEFAULT NULL,
  `Autorisation_Reg` varchar(50) DEFAULT NULL,
  `Budget_Finalise` varchar(50) DEFAULT NULL,
  `Echeance_Conf` varchar(50) DEFAULT NULL,
  `Livrable_Valide` varchar(50) DEFAULT NULL,
  `Statut_Reg` varchar(50) DEFAULT NULL,
  `Remarques_Reg` varchar(50) DEFAULT NULL,
  `Id_Proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reglement_defin`
--

INSERT INTO `reglement_defin` (`Id_Reg`, `Date_Reg`, `Contrats_Fin`, `Conform_Reg`, `Autorisation_Reg`, `Budget_Finalise`, `Echeance_Conf`, `Livrable_Valide`, `Statut_Reg`, `Remarques_Reg`, `Id_Proj`) VALUES
(1, '2024-05-13', 'true', 'true', 'true', '5000', '2024-06-30', 'true', 'Finalisé', 'Aucune remarque', 1);

-- --------------------------------------------------------

--
-- Structure de la table `responsable_projet`
--

CREATE TABLE `responsable_projet` (
  `Id_Mem_Eq` int(11) NOT NULL,
  `date_affectation` date DEFAULT NULL,
  `Id_Proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ressources`
--

CREATE TABLE `ressources` (
  `Id_Res` int(11) NOT NULL,
  `Qte_Res` varchar(50) DEFAULT NULL,
  `Unite_Res` varchar(50) DEFAULT NULL,
  `Cout_Uni_Res` varchar(50) DEFAULT NULL,
  `Cout_Tot_Res` varchar(50) DEFAULT NULL,
  `Date_Deb_Res` date DEFAULT NULL,
  `Date_Fin_Res` date DEFAULT NULL,
  `Etat_Res` varchar(50) DEFAULT NULL,
  `Id_Proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `restaurant`
--

CREATE TABLE `restaurant` (
  `Id_Infra_Str` int(11) NOT NULL,
  `Capacite` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `suivi`
--

CREATE TABLE `suivi` (
  `Id_Suiv` int(11) NOT NULL,
  `Obj_Suiv` varchar(50) DEFAULT NULL,
  `Desc_Suiv` varchar(50) DEFAULT NULL,
  `Date_Deb_Suiv` date DEFAULT NULL,
  `Date_Fin_Suiv` date DEFAULT NULL,
  `Statut_Suiv` varchar(50) DEFAULT NULL,
  `Remarques_Suiv` varchar(50) DEFAULT NULL,
  `Id_Proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `suivi`
--

INSERT INTO `suivi` (`Id_Suiv`, `Obj_Suiv`, `Desc_Suiv`, `Date_Deb_Suiv`, `Date_Fin_Suiv`, `Statut_Suiv`, `Remarques_Suiv`, `Id_Proj`) VALUES
(1, 'controle', 'bien', '2024-05-18', '2024-05-15', 'en cour', 'bien', 1),
(2, 'controle', 'ecole', '2024-04-28', '2024-12-31', 'en cour', 'bien', 2),
(3, 'controle', 'bien', '2024-04-27', '2024-07-17', 'en cour', 'bien', 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `amenagement`
--
ALTER TABLE `amenagement`
  ADD PRIMARY KEY (`Id_Proj`);

--
-- Index pour la table `batiment_admin`
--
ALTER TABLE `batiment_admin`
  ADD PRIMARY KEY (`Id_Infra_Str`);

--
-- Index pour la table `besoins_etab_sco`
--
ALTER TABLE `besoins_etab_sco`
  ADD PRIMARY KEY (`Id_Bes`),
  ADD KEY `Id_Infra_Str` (`Id_Infra_Str`);

--
-- Index pour la table `consignes`
--
ALTER TABLE `consignes`
  ADD PRIMARY KEY (`Id_Cons`),
  ADD KEY `Id_Mem_Eq` (`Id_Mem_Eq`),
  ADD KEY `Id_Proj` (`Id_Proj`);

--
-- Index pour la table `construction`
--
ALTER TABLE `construction`
  ADD PRIMARY KEY (`Id_Proj`);

--
-- Index pour la table `contacte`
--
ALTER TABLE `contacte`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `depouillement`
--
ALTER TABLE `depouillement`
  ADD PRIMARY KEY (`Id_Dep`),
  ADD KEY `Id_Entr_Cons` (`Id_Entr_Cons`),
  ADD KEY `Id_Proj` (`Id_Proj`);

--
-- Index pour la table `dortoir`
--
ALTER TABLE `dortoir`
  ADD PRIMARY KEY (`Id_Infra_Str`);

--
-- Index pour la table `entreprise_cons`
--
ALTER TABLE `entreprise_cons`
  ADD PRIMARY KEY (`Id_Entr_Cons`);

--
-- Index pour la table `etablissement_scolaire`
--
ALTER TABLE `etablissement_scolaire`
  ADD PRIMARY KEY (`Id_Infra_Str`);

--
-- Index pour la table `etudes`
--
ALTER TABLE `etudes`
  ADD PRIMARY KEY (`Id_Etu`),
  ADD KEY `Id_Proj` (`Id_Proj`);

--
-- Index pour la table `infrastructure_edu`
--
ALTER TABLE `infrastructure_edu`
  ADD PRIMARY KEY (`Id_Infra_Str`);

--
-- Index pour la table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_log`);

--
-- Index pour la table `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`Id_Proj`);

--
-- Index pour la table `membre_equipe`
--
ALTER TABLE `membre_equipe`
  ADD PRIMARY KEY (`Id_Mem_Eq`,`login_id_log`),
  ADD UNIQUE KEY `login_id_log_UNIQUE` (`login_id_log`),
  ADD KEY `fk_membre_equipe_login1_idx` (`login_id_log`);

--
-- Index pour la table `membre_projet`
--
ALTER TABLE `membre_projet`
  ADD PRIMARY KEY (`Id_Proj`,`Id_Mem_Eq`),
  ADD KEY `Id_Mem_Eq` (`Id_Mem_Eq`);

--
-- Index pour la table `probleme`
--
ALTER TABLE `probleme`
  ADD PRIMARY KEY (`Id_Prob`),
  ADD KEY `Id_Proj` (`Id_Proj`);

--
-- Index pour la table `projet`
--
ALTER TABLE `projet`
  ADD PRIMARY KEY (`Id_Proj`),
  ADD KEY `Id_Infra_Str` (`Id_Infra_Str`);

--
-- Index pour la table `reglement_defin`
--
ALTER TABLE `reglement_defin`
  ADD PRIMARY KEY (`Id_Reg`),
  ADD KEY `Id_Proj` (`Id_Proj`);

--
-- Index pour la table `responsable_projet`
--
ALTER TABLE `responsable_projet`
  ADD PRIMARY KEY (`Id_Mem_Eq`),
  ADD KEY `Id_Proj` (`Id_Proj`);

--
-- Index pour la table `ressources`
--
ALTER TABLE `ressources`
  ADD PRIMARY KEY (`Id_Res`),
  ADD KEY `Id_Proj` (`Id_Proj`);

--
-- Index pour la table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`Id_Infra_Str`);

--
-- Index pour la table `suivi`
--
ALTER TABLE `suivi`
  ADD PRIMARY KEY (`Id_Suiv`),
  ADD KEY `Id_Proj` (`Id_Proj`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `besoins_etab_sco`
--
ALTER TABLE `besoins_etab_sco`
  MODIFY `Id_Bes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `consignes`
--
ALTER TABLE `consignes`
  MODIFY `Id_Cons` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `contacte`
--
ALTER TABLE `contacte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `depouillement`
--
ALTER TABLE `depouillement`
  MODIFY `Id_Dep` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `entreprise_cons`
--
ALTER TABLE `entreprise_cons`
  MODIFY `Id_Entr_Cons` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `etudes`
--
ALTER TABLE `etudes`
  MODIFY `Id_Etu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `infrastructure_edu`
--
ALTER TABLE `infrastructure_edu`
  MODIFY `Id_Infra_Str` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `login`
--
ALTER TABLE `login`
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT pour la table `membre_equipe`
--
ALTER TABLE `membre_equipe`
  MODIFY `Id_Mem_Eq` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `probleme`
--
ALTER TABLE `probleme`
  MODIFY `Id_Prob` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `projet`
--
ALTER TABLE `projet`
  MODIFY `Id_Proj` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `reglement_defin`
--
ALTER TABLE `reglement_defin`
  MODIFY `Id_Reg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `ressources`
--
ALTER TABLE `ressources`
  MODIFY `Id_Res` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `suivi`
--
ALTER TABLE `suivi`
  MODIFY `Id_Suiv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `amenagement`
--
ALTER TABLE `amenagement`
  ADD CONSTRAINT `amenagement_ibfk_1` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`);

--
-- Contraintes pour la table `batiment_admin`
--
ALTER TABLE `batiment_admin`
  ADD CONSTRAINT `batiment_admin_ibfk_1` FOREIGN KEY (`Id_Infra_Str`) REFERENCES `infrastructure_edu` (`Id_Infra_Str`);

--
-- Contraintes pour la table `besoins_etab_sco`
--
ALTER TABLE `besoins_etab_sco`
  ADD CONSTRAINT `besoins_etab_sco_ibfk_1` FOREIGN KEY (`Id_Infra_Str`) REFERENCES `etablissement_scolaire` (`Id_Infra_Str`);

--
-- Contraintes pour la table `consignes`
--
ALTER TABLE `consignes`
  ADD CONSTRAINT `consignes_ibfk_1` FOREIGN KEY (`Id_Mem_Eq`) REFERENCES `membre_equipe` (`Id_Mem_Eq`),
  ADD CONSTRAINT `consignes_ibfk_2` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`);

--
-- Contraintes pour la table `construction`
--
ALTER TABLE `construction`
  ADD CONSTRAINT `construction_ibfk_1` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`);

--
-- Contraintes pour la table `depouillement`
--
ALTER TABLE `depouillement`
  ADD CONSTRAINT `depouillement_ibfk_1` FOREIGN KEY (`Id_Entr_Cons`) REFERENCES `entreprise_cons` (`Id_Entr_Cons`),
  ADD CONSTRAINT `depouillement_ibfk_2` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`);

--
-- Contraintes pour la table `dortoir`
--
ALTER TABLE `dortoir`
  ADD CONSTRAINT `dortoir_ibfk_1` FOREIGN KEY (`Id_Infra_Str`) REFERENCES `infrastructure_edu` (`Id_Infra_Str`);

--
-- Contraintes pour la table `etablissement_scolaire`
--
ALTER TABLE `etablissement_scolaire`
  ADD CONSTRAINT `etablissement_scolaire_ibfk_1` FOREIGN KEY (`Id_Infra_Str`) REFERENCES `infrastructure_edu` (`Id_Infra_Str`);

--
-- Contraintes pour la table `etudes`
--
ALTER TABLE `etudes`
  ADD CONSTRAINT `etudes_ibfk_1` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`);

--
-- Contraintes pour la table `maintenance`
--
ALTER TABLE `maintenance`
  ADD CONSTRAINT `maintenance_ibfk_1` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`);

--
-- Contraintes pour la table `membre_equipe`
--
ALTER TABLE `membre_equipe`
  ADD CONSTRAINT `fk_membre_equipe_login1` FOREIGN KEY (`login_id_log`) REFERENCES `login` (`id_log`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `membre_projet`
--
ALTER TABLE `membre_projet`
  ADD CONSTRAINT `membre_projet_ibfk_1` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`),
  ADD CONSTRAINT `membre_projet_ibfk_2` FOREIGN KEY (`Id_Mem_Eq`) REFERENCES `membre_equipe` (`Id_Mem_Eq`);

--
-- Contraintes pour la table `probleme`
--
ALTER TABLE `probleme`
  ADD CONSTRAINT `probleme_ibfk_1` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`);

--
-- Contraintes pour la table `projet`
--
ALTER TABLE `projet`
  ADD CONSTRAINT `projet_ibfk_1` FOREIGN KEY (`Id_Infra_Str`) REFERENCES `infrastructure_edu` (`Id_Infra_Str`);

--
-- Contraintes pour la table `reglement_defin`
--
ALTER TABLE `reglement_defin`
  ADD CONSTRAINT `reglement_defin_ibfk_1` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`);

--
-- Contraintes pour la table `responsable_projet`
--
ALTER TABLE `responsable_projet`
  ADD CONSTRAINT `responsable_projet_ibfk_1` FOREIGN KEY (`Id_Mem_Eq`) REFERENCES `membre_equipe` (`Id_Mem_Eq`),
  ADD CONSTRAINT `responsable_projet_ibfk_2` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`);

--
-- Contraintes pour la table `ressources`
--
ALTER TABLE `ressources`
  ADD CONSTRAINT `ressources_ibfk_1` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`);

--
-- Contraintes pour la table `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`Id_Infra_Str`) REFERENCES `infrastructure_edu` (`Id_Infra_Str`);

--
-- Contraintes pour la table `suivi`
--
ALTER TABLE `suivi`
  ADD CONSTRAINT `suivi_ibfk_1` FOREIGN KEY (`Id_Proj`) REFERENCES `projet` (`Id_Proj`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
