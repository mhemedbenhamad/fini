-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bd_crm
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_crm
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_crm` DEFAULT CHARACTER SET utf8mb4 ;
USE `bd_crm` ;

-- -----------------------------------------------------
-- Table `bd_crm`.`infrastructure_edu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`infrastructure_edu` (
  `Id_Infra_Str` INT(11) NOT NULL AUTO_INCREMENT,
  `Nom_Infra_Str` VARCHAR(50) NULL DEFAULT NULL,
  `Adr_Infra_Str` VARCHAR(50) NULL DEFAULT NULL,
  `Directeur_Infra_Str` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Infra_Str`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`projet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`projet` (
  `Id_Proj` INT(11) NOT NULL AUTO_INCREMENT,
  `Nom_Proj` VARCHAR(50) NULL DEFAULT NULL,
  `Desc_Proj` VARCHAR(50) NULL DEFAULT NULL,
  `Objectifs` VARCHAR(50) NULL DEFAULT NULL,
  `Date_Deb_Proj` DATE NULL DEFAULT NULL,
  `Date_Fin_Proj` DATE NULL DEFAULT NULL,
  `Budget_Proj` VARCHAR(50) NULL DEFAULT NULL,
  `Statut_Proj` VARCHAR(50) NULL DEFAULT NULL,
  `Id_Infra_Str` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Proj`),
  INDEX `Id_Infra_Str` (`Id_Infra_Str` ASC),
  CONSTRAINT `projet_ibfk_1`
    FOREIGN KEY (`Id_Infra_Str`)
    REFERENCES `bd_crm`.`infrastructure_edu` (`Id_Infra_Str`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`amenagement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`amenagement` (
  `Id_Proj` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Proj`),
  CONSTRAINT `amenagement_ibfk_1`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`batiment_admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`batiment_admin` (
  `Id_Infra_Str` INT(11) NOT NULL,
  `Surface_Bat` VARCHAR(50) NULL DEFAULT NULL,
  `Nb_Etages` VARCHAR(50) NULL DEFAULT NULL,
  `Usages` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Infra_Str`),
  CONSTRAINT `batiment_admin_ibfk_1`
    FOREIGN KEY (`Id_Infra_Str`)
    REFERENCES `bd_crm`.`infrastructure_edu` (`Id_Infra_Str`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`etablissement_scolaire`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`etablissement_scolaire` (
  `Id_Infra_Str` INT(11) NOT NULL,
  `Cat_Etab_Sco` VARCHAR(50) NULL DEFAULT NULL,
  `Effectif` VARCHAR(50) NULL DEFAULT NULL,
  `Nb_Salles` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Infra_Str`),
  CONSTRAINT `etablissement_scolaire_ibfk_1`
    FOREIGN KEY (`Id_Infra_Str`)
    REFERENCES `bd_crm`.`infrastructure_edu` (`Id_Infra_Str`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`besoins_etab_sco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`besoins_etab_sco` (
  `Id_Bes` INT(11) NOT NULL AUTO_INCREMENT,
  `Qte_Bes` VARCHAR(50) NULL DEFAULT NULL,
  `Date_Bes` DATE NULL DEFAULT NULL,
  `Desc_Bes` VARCHAR(50) NULL DEFAULT NULL,
  `Remarques_Bes` VARCHAR(50) NULL DEFAULT NULL,
  `Id_Infra_Str` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Bes`),
  INDEX `Id_Infra_Str` (`Id_Infra_Str` ASC),
  CONSTRAINT `besoins_etab_sco_ibfk_1`
    FOREIGN KEY (`Id_Infra_Str`)
    REFERENCES `bd_crm`.`etablissement_scolaire` (`Id_Infra_Str`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`login` (
  `id_log` INT(11) NOT NULL AUTO_INCREMENT,
  `users` VARCHAR(45) NULL DEFAULT NULL,
  `passwords` VARCHAR(45) NULL DEFAULT NULL,
  `role` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_log`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`membre_equipe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`membre_equipe` (
  `Id_Mem_Eq` INT(11) NOT NULL AUTO_INCREMENT,
  `Nom_Mem_Eq` VARCHAR(50) NULL DEFAULT NULL,
  `Pren_Mem_Eq` VARCHAR(50) NULL DEFAULT NULL,
  `Adr_Mem_Eq` VARCHAR(50) NULL DEFAULT NULL,
  `Email_Mem_Eq` VARCHAR(50) NULL DEFAULT NULL,
  `Tel_Mem_Eq` VARCHAR(50) NULL DEFAULT NULL,
  `Poste_Mem_eq` VARCHAR(50) NULL DEFAULT NULL,
  `login_id_log` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Mem_Eq`, `login_id_log`),
  UNIQUE INDEX `login_id_log_UNIQUE` (`login_id_log` ASC),
  INDEX `fk_membre_equipe_login1_idx` (`login_id_log` ASC),
  CONSTRAINT `fk_membre_equipe_login1`
    FOREIGN KEY (`login_id_log`)
    REFERENCES `bd_crm`.`login` (`id_log`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`consignes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`consignes` (
  `Id_Cons` INT(11) NOT NULL AUTO_INCREMENT,
  `Sujet_Cons` VARCHAR(50) NULL DEFAULT NULL,
  `Date_Cons` DATE NULL DEFAULT NULL,
  `Id_Mem_Eq` INT(11) NOT NULL,
  `Id_Proj` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Cons`),
  INDEX `Id_Mem_Eq` (`Id_Mem_Eq` ASC),
  INDEX `Id_Proj` (`Id_Proj` ASC),
  CONSTRAINT `consignes_ibfk_1`
    FOREIGN KEY (`Id_Mem_Eq`)
    REFERENCES `bd_crm`.`membre_equipe` (`Id_Mem_Eq`),
  CONSTRAINT `consignes_ibfk_2`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`construction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`construction` (
  `Id_Proj` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Proj`),
  CONSTRAINT `construction_ibfk_1`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`entreprise_cons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`entreprise_cons` (
  `Id_Entr_Cons` INT(11) NOT NULL AUTO_INCREMENT,
  `Nom_Entr_Cons` VARCHAR(50) NULL DEFAULT NULL,
  `Adr_Entr_Cons` VARCHAR(50) NULL DEFAULT NULL,
  `Resp_Entr_Cons` VARCHAR(50) NULL DEFAULT NULL,
  `Tel_Entr_Cons` VARCHAR(50) NULL DEFAULT NULL,
  `Domaine_Entr_Cons` VARCHAR(50) NULL DEFAULT NULL,
  `Notes_Entr_Cons` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Entr_Cons`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`depouillement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`depouillement` (
  `Id_Dep` INT(11) NOT NULL AUTO_INCREMENT,
  `Obj_Dep` VARCHAR(50) NULL DEFAULT NULL,
  `Desc_Dep` VARCHAR(50) NULL DEFAULT NULL,
  `Date_Deb_Dep` DATE NULL DEFAULT NULL,
  `Date_Fin_Dep` DATE NULL DEFAULT NULL,
  `Statut_Dep` VARCHAR(50) NULL DEFAULT NULL,
  `Remarques_Dep` VARCHAR(50) NULL DEFAULT NULL,
  `Id_Entr_Cons` INT(11) NOT NULL,
  `Id_Proj` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Dep`),
  INDEX `Id_Entr_Cons` (`Id_Entr_Cons` ASC),
  INDEX `Id_Proj` (`Id_Proj` ASC),
  CONSTRAINT `depouillement_ibfk_1`
    FOREIGN KEY (`Id_Entr_Cons`)
    REFERENCES `bd_crm`.`entreprise_cons` (`Id_Entr_Cons`),
  CONSTRAINT `depouillement_ibfk_2`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`dortoir`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`dortoir` (
  `Id_Infra_Str` INT(11) NOT NULL,
  `Genre_Dor` VARCHAR(50) NULL DEFAULT NULL,
  `Nb_Chamb` VARCHAR(50) NULL DEFAULT NULL,
  `Nb_Lits` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Infra_Str`),
  CONSTRAINT `dortoir_ibfk_1`
    FOREIGN KEY (`Id_Infra_Str`)
    REFERENCES `bd_crm`.`infrastructure_edu` (`Id_Infra_Str`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`etudes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`etudes` (
  `Id_Etu` INT(11) NOT NULL AUTO_INCREMENT,
  `Obj_Etu` VARCHAR(50) NULL DEFAULT NULL,
  `Desc_Etu` VARCHAR(50) NULL DEFAULT NULL,
  `Date_Deb_Etu` DATE NULL DEFAULT NULL,
  `Date_Fin_Etu` DATE NULL DEFAULT NULL,
  `Statut_Etu` VARCHAR(50) NULL DEFAULT NULL,
  `Remarques_Etu` VARCHAR(50) NULL DEFAULT NULL,
  `Id_Proj` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Etu`),
  INDEX `Id_Proj` (`Id_Proj` ASC),
  CONSTRAINT `etudes_ibfk_1`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`maintenance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`maintenance` (
  `Id_Proj` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Proj`),
  CONSTRAINT `maintenance_ibfk_1`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`membre_projet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`membre_projet` (
  `Id_Proj` INT(11) NOT NULL,
  `Id_Mem_Eq` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Proj`, `Id_Mem_Eq`),
  INDEX `Id_Mem_Eq` (`Id_Mem_Eq` ASC),
  CONSTRAINT `membre_projet_ibfk_1`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`),
  CONSTRAINT `membre_projet_ibfk_2`
    FOREIGN KEY (`Id_Mem_Eq`)
    REFERENCES `bd_crm`.`membre_equipe` (`Id_Mem_Eq`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`probleme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`probleme` (
  `Id_Prob` INT(11) NOT NULL AUTO_INCREMENT,
  `Type_Prob` VARCHAR(50) NULL DEFAULT NULL,
  `Desc_Prob` VARCHAR(50) NULL DEFAULT NULL,
  `Date_Det_Prob` DATE NULL DEFAULT NULL,
  `Solution` VARCHAR(50) NULL DEFAULT NULL,
  `Id_Proj` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Prob`),
  INDEX `Id_Proj` (`Id_Proj` ASC),
  CONSTRAINT `probleme_ibfk_1`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`reglement_defin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`reglement_defin` (
  `Id_Reg` INT(11) NOT NULL AUTO_INCREMENT,
  `Date_Reg` DATE NULL DEFAULT NULL,
  `Contrats_Fin` VARCHAR(50) NULL DEFAULT NULL,
  `Conform_Reg` VARCHAR(50) NULL DEFAULT NULL,
  `Autorisation_Reg` VARCHAR(50) NULL DEFAULT NULL,
  `Budget_Finalise` VARCHAR(50) NULL DEFAULT NULL,
  `Echeance_Conf` VARCHAR(50) NULL DEFAULT NULL,
  `Livrable_Valide` VARCHAR(50) NULL DEFAULT NULL,
  `Statut_Reg` VARCHAR(50) NULL DEFAULT NULL,
  `Remarques_Reg` VARCHAR(50) NULL DEFAULT NULL,
  `Id_Proj` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Reg`),
  INDEX `Id_Proj` (`Id_Proj` ASC),
  CONSTRAINT `reglement_defin_ibfk_1`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`responsable_projet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`responsable_projet` (
  `Id_Mem_Eq` INT(11) NOT NULL,
  `date_affectation` DATE NULL DEFAULT NULL,
  `Id_Proj` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Mem_Eq`),
  INDEX `Id_Proj` (`Id_Proj` ASC),
  CONSTRAINT `responsable_projet_ibfk_1`
    FOREIGN KEY (`Id_Mem_Eq`)
    REFERENCES `bd_crm`.`membre_equipe` (`Id_Mem_Eq`),
  CONSTRAINT `responsable_projet_ibfk_2`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`ressources`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`ressources` (
  `Id_Res` INT(11) NOT NULL AUTO_INCREMENT,
  `Qte_Res` VARCHAR(50) NULL DEFAULT NULL,
  `Unite_Res` VARCHAR(50) NULL DEFAULT NULL,
  `Cout_Uni_Res` VARCHAR(50) NULL DEFAULT NULL,
  `Cout_Tot_Res` VARCHAR(50) NULL DEFAULT NULL,
  `Date_Deb_Res` DATE NULL DEFAULT NULL,
  `Date_Fin_Res` DATE NULL DEFAULT NULL,
  `Etat_Res` VARCHAR(50) NULL DEFAULT NULL,
  `Id_Proj` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Res`),
  INDEX `Id_Proj` (`Id_Proj` ASC),
  CONSTRAINT `ressources_ibfk_1`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`restaurant` (
  `Id_Infra_Str` INT(11) NOT NULL,
  `Capacite` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Infra_Str`),
  CONSTRAINT `restaurant_ibfk_1`
    FOREIGN KEY (`Id_Infra_Str`)
    REFERENCES `bd_crm`.`infrastructure_edu` (`Id_Infra_Str`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `bd_crm`.`suivi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_crm`.`suivi` (
  `Id_Suiv` INT(11) NOT NULL AUTO_INCREMENT,
  `Obj_Suiv` VARCHAR(50) NULL DEFAULT NULL,
  `Desc_Suiv` VARCHAR(50) NULL DEFAULT NULL,
  `Date_Deb_Suiv` DATE NULL DEFAULT NULL,
  `Date_Fin_Suiv` DATE NULL DEFAULT NULL,
  `Statut_Suiv` VARCHAR(50) NULL DEFAULT NULL,
  `Remarques_Suiv` VARCHAR(50) NULL DEFAULT NULL,
  `Id_Proj` INT(11) NOT NULL,
  PRIMARY KEY (`Id_Suiv`),
  INDEX `Id_Proj` (`Id_Proj` ASC),
  CONSTRAINT `suivi_ibfk_1`
    FOREIGN KEY (`Id_Proj`)
    REFERENCES `bd_crm`.`projet` (`Id_Proj`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
