-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: smartbev
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `annoce`
--

DROP TABLE IF EXISTS `annoce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annoce` (
  `id_annonce` int NOT NULL AUTO_INCREMENT,
  `duree_affichage` varchar(50) NOT NULL,
  `ageMin` int NOT NULL,
  `ageMax` int NOT NULL,
  `path_video` varchar(100) DEFAULT NULL,
  `prix_annonce` double NOT NULL,
  `id_annonceur` int NOT NULL,
  `nom_annonce` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_annonce`),
  KEY `annoce_ibfk_1` (`id_annonceur`),
  CONSTRAINT `annoce_ibfk_1` FOREIGN KEY (`id_annonceur`) REFERENCES `annoceur` (`id_annonceur`)
) ENGINE=InnoDB AUTO_INCREMENT=18  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annoce`
--

LOCK TABLES `annoce` WRITE;
/*!40000 ALTER TABLE `annoce` DISABLE KEYS */;
INSERT INTO `annoce` VALUES (6,'semaines',20,47,'advertisement6.mp4',2000,6208,'kia v9'),(7,'jours',20,46,'advertisement7.mp4',2100,6208,'coffe beans'),(8,'jours',20,40,'advertisement8.mp4',2001,6208,'koka kola'),(11,'semaines',20,58,'advertisement11.mp4',51,6205,'FORD '),(13,'semaines',20,58,'advertisement13.mp4',51,6205,'kia v8');
/*!40000 ALTER TABLE `annoce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `annoceur`
--

DROP TABLE IF EXISTS `annoceur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annoceur` (
  `id_annonceur` int NOT NULL AUTO_INCREMENT,
  `nom_annonceur` varchar(50) NOT NULL,
  `prenom_annonceur` varchar(50) NOT NULL,
  `type_annonceur` varchar(50) DEFAULT NULL,
  `path_annonceur` varchar(160) DEFAULT NULL,
  PRIMARY KEY (`id_annonceur`)
) ENGINE=InnoDB AUTO_INCREMENT=6210  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annoceur`
--

LOCK TABLES `annoceur` WRITE;
/*!40000 ALTER TABLE `annoceur` DISABLE KEYS */;
INSERT INTO `annoceur` VALUES (6205,'attou','yacine','Personne','advertiser6205.png'),(6208,'hayla','ooredoo','Enterprise','advertiser6208.png'),(6209,'attou','yaccine','Personne','advertiser6209.png');
/*!40000 ALTER TABLE `annoceur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boisson`
--

DROP TABLE IF EXISTS `boisson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boisson` (
  `id_boisson` int NOT NULL AUTO_INCREMENT,
  `duree_preparation_boisson` varchar(50) NOT NULL,
  `libelle_boisson` varchar(50) NOT NULL,
  `description_boisson` varchar(50) NOT NULL,
  `prix_boisson` double DEFAULT NULL,
  `id_client` int DEFAULT NULL,
  `path_image_boisson` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_boisson`),
  KEY `id_client` (`id_client`),
  CONSTRAINT `boisson_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boisson`
--

LOCK TABLES `boisson` WRITE;
/*!40000 ALTER TABLE `boisson` DISABLE KEYS */;
/*!40000 ALTER TABLE `boisson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categ_boisson`
--

DROP TABLE IF EXISTS `categ_boisson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categ_boisson` (
  `id_boisson` int NOT NULL,
  `id_categorie` int NOT NULL,
  PRIMARY KEY (`id_boisson`,`id_categorie`),
  KEY `id_categorie` (`id_categorie`),
  CONSTRAINT `categ_boisson_ibfk_1` FOREIGN KEY (`id_boisson`) REFERENCES `boisson` (`id_boisson`),
  CONSTRAINT `categ_boisson_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categ_boisson`
--

LOCK TABLES `categ_boisson` WRITE;
/*!40000 ALTER TABLE `categ_boisson` DISABLE KEYS */;
/*!40000 ALTER TABLE `categ_boisson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorie` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `libelle_categorie` varchar(50) NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id_client` int NOT NULL,
  `nom_client` varchar(50) NOT NULL,
  `prenom_client` varchar(50) DEFAULT NULL,
  `type_client` varchar(50) NOT NULL,
  `ccp_client` varchar(50) DEFAULT NULL,
  `externel_account_id` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commande`
--

DROP TABLE IF EXISTS `commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commande` (
  `id_cmd` int NOT NULL AUTO_INCREMENT,
  `time_cmd` datetime NOT NULL,
  `prix_cmd` varchar(50) NOT NULL,
  `quantite_sucre` double DEFAULT NULL,
  `taille_goblet` int DEFAULT NULL,
  `etat_cmd` varchar(50) DEFAULT NULL,
  `id_boisson` int NOT NULL,
  `id_consommateur` int DEFAULT NULL,
  `numero_serie_distributeur` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_cmd`),
  KEY `id_boisson` (`id_boisson`),
  KEY `id_consommateur` (`id_consommateur`),
  KEY `numero_serie_distributeur` (`numero_serie_distributeur`),
  CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_boisson`) REFERENCES `boisson` (`id_boisson`),
  CONSTRAINT `commande_ibfk_2` FOREIGN KEY (`id_consommateur`) REFERENCES `consommateur` (`id_consommateur`),
  CONSTRAINT `commande_ibfk_3` FOREIGN KEY (`numero_serie_distributeur`) REFERENCES `distributeur` (`numero_serie_distributeur`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commande`
--

LOCK TABLES `commande` WRITE;
/*!40000 ALTER TABLE `commande` DISABLE KEYS */;
/*!40000 ALTER TABLE `commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commune`
--

DROP TABLE IF EXISTS `commune`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commune` (
  `id_commune` int NOT NULL,
  `numero_commune` int NOT NULL,
  `nom_commune` varchar(50) NOT NULL,
  `id_wilaya` int NOT NULL,
  PRIMARY KEY (`id_commune`),
  KEY `id_wilaya` (`id_wilaya`),
  CONSTRAINT `commune_ibfk_1` FOREIGN KEY (`id_wilaya`) REFERENCES `wilaya` (`id_wilaya`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commune`
--

LOCK TABLES `commune` WRITE;
/*!40000 ALTER TABLE `commune` DISABLE KEYS */;
/*!40000 ALTER TABLE `commune` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consommateur`
--

DROP TABLE IF EXISTS `consommateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consommateur` (
  `id_consommateur` int NOT NULL,
  `prenom_consommateur` varchar(50) NOT NULL,
  `nom_consommateur` varchar(50) NOT NULL,
  `sexe_consommateur` varchar(10) DEFAULT NULL,
  `path_consommateur` varchar(50) DEFAULT NULL,
  `mail_consommateur` varchar(50) NOT NULL,
  `payment_methode_id` varchar(80) DEFAULT NULL,
  `password_cosommateur` varchar(50) NOT NULL,
  PRIMARY KEY (`id_consommateur`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consommateur`
--

LOCK TABLES `consommateur` WRITE;
/*!40000 ALTER TABLE `consommateur` DISABLE KEYS */;
/*!40000 ALTER TABLE `consommateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detection_vol`
--

DROP TABLE IF EXISTS `detection_vol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detection_vol` (
  `id_vol` int NOT NULL,
  `date_vol` date NOT NULL,
  `heure_vol` time NOT NULL,
  `description_vol` varchar(50) DEFAULT NULL,
  `numero_serie_distributeur` varchar(50) NOT NULL,
  PRIMARY KEY (`id_vol`),
  KEY `numero_serie_distributeur` (`numero_serie_distributeur`),
  CONSTRAINT `detection_vol_ibfk_1` FOREIGN KEY (`numero_serie_distributeur`) REFERENCES `distributeur` (`numero_serie_distributeur`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detection_vol`
--

LOCK TABLES `detection_vol` WRITE;
/*!40000 ALTER TABLE `detection_vol` DISABLE KEYS */;
/*!40000 ALTER TABLE `detection_vol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distributeur`
--

DROP TABLE IF EXISTS `distributeur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distributeur` (
  `numero_serie_distributeur` varchar(50) NOT NULL,
  `etat_distributeur` varchar(50) DEFAULT NULL,
  `date_installation_distributeur` date DEFAULT NULL,
  `localisation_statique_distributeur` varchar(50) DEFAULT NULL,
  `id_client` int DEFAULT NULL,
  PRIMARY KEY (`numero_serie_distributeur`),
  KEY `id_client` (`id_client`),
  CONSTRAINT `distributeur_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distributeur`
--

LOCK TABLES `distributeur` WRITE;
/*!40000 ALTER TABLE `distributeur` DISABLE KEYS */;
/*!40000 ALTER TABLE `distributeur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outil`
--

DROP TABLE IF EXISTS `outil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outil` (
  `id_outil` int NOT NULL AUTO_INCREMENT,
  `libelle_outil` varchar(50) NOT NULL,
  PRIMARY KEY (`id_outil`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outil`
--

LOCK TABLES `outil` WRITE;
/*!40000 ALTER TABLE `outil` DISABLE KEYS */;
/*!40000 ALTER TABLE `outil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paiement`
--

DROP TABLE IF EXISTS `paiement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paiement` (
  `id_paiement` int NOT NULL AUTO_INCREMENT,
  `status` varchar(50) DEFAULT NULL,
  `date_paiement` date NOT NULL,
  `heure_paiement` time NOT NULL,
  `id_type_paiement` int NOT NULL,
  `id_cmd` int NOT NULL,
  PRIMARY KEY (`id_paiement`),
  UNIQUE KEY `id_cmd` (`id_cmd`),
  KEY `id_type_paiement` (`id_type_paiement`),
  CONSTRAINT `paiement_ibfk_1` FOREIGN KEY (`id_type_paiement`) REFERENCES `type_paiement` (`id_type_paiement`),
  CONSTRAINT `paiement_ibfk_2` FOREIGN KEY (`id_cmd`) REFERENCES `commande` (`id_cmd`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paiement`
--

LOCK TABLES `paiement` WRITE;
/*!40000 ALTER TABLE `paiement` DISABLE KEYS */;
/*!40000 ALTER TABLE `paiement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `panne`
--

DROP TABLE IF EXISTS `panne`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `panne` (
  `id_panne` varchar(50) NOT NULL,
  `objet_panne` varchar(50) NOT NULL,
  `date_panne` date NOT NULL,
  `heure_panne` time NOT NULL,
  `description_panne` varchar(50) DEFAULT NULL,
  `etat_panne` varchar(50) NOT NULL,
  `id_utilisateur` int NOT NULL,
  `numero_serie_distributeur` varchar(50) NOT NULL,
  PRIMARY KEY (`id_panne`),
  KEY `numero_serie_distributeur` (`numero_serie_distributeur`),
  KEY `id_utilisateur` (`id_utilisateur`),
  CONSTRAINT `panne_ibfk_1` FOREIGN KEY (`numero_serie_distributeur`) REFERENCES `distributeur` (`numero_serie_distributeur`),
  CONSTRAINT `panne_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panne`
--

LOCK TABLES `panne` WRITE;
/*!40000 ALTER TABLE `panne` DISABLE KEYS */;
/*!40000 ALTER TABLE `panne` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametre`
--

DROP TABLE IF EXISTS `parametre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parametre` (
  `localisation_dynamique_distributeur` varchar(50) NOT NULL,
  PRIMARY KEY (`localisation_dynamique_distributeur`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametre`
--

LOCK TABLES `parametre` WRITE;
/*!40000 ALTER TABLE `parametre` DISABLE KEYS */;
/*!40000 ALTER TABLE `parametre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pays`
--

DROP TABLE IF EXISTS `pays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pays` (
  `id_pays` varchar(50) NOT NULL,
  `nom_pays` varchar(50) NOT NULL,
  PRIMARY KEY (`id_pays`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pays`
--

LOCK TABLES `pays` WRITE;
/*!40000 ALTER TABLE `pays` DISABLE KEYS */;
/*!40000 ALTER TABLE `pays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profil`
--

DROP TABLE IF EXISTS `profil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profil` (
  `id_profil` int NOT NULL,
  `nom_utilisateur` varchar(50) NOT NULL,
  `prenom_utilisateur` varchar(50) DEFAULT NULL,
  `path_image_utilisateur` varchar(50) DEFAULT NULL,
  `sex_utilisateur` varchar(50) DEFAULT NULL,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id_profil`),
  UNIQUE KEY `id_utilisateur` (`id_utilisateur`),
  CONSTRAINT `profil_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profil`
--

LOCK TABLES `profil` WRITE;
/*!40000 ALTER TABLE `profil` DISABLE KEYS */;
/*!40000 ALTER TABLE `profil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reclamation`
--

DROP TABLE IF EXISTS `reclamation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reclamation` (
  `id_reclamation` int NOT NULL,
  `description_reclamation` varchar(50) NOT NULL,
  `date_reclamation` date NOT NULL,
  `heure_reclamtion` time NOT NULL,
  `id_cmd` int NOT NULL,
  PRIMARY KEY (`id_reclamation`),
  UNIQUE KEY `id_cmd` (`id_cmd`),
  CONSTRAINT `reclamation_ibfk_1` FOREIGN KEY (`id_cmd`) REFERENCES `commande` (`id_cmd`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclamation`
--

LOCK TABLES `reclamation` WRITE;
/*!40000 ALTER TABLE `reclamation` DISABLE KEYS */;
/*!40000 ALTER TABLE `reclamation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `id_region` int NOT NULL,
  `libelle_region` varchar(50) DEFAULT NULL,
  `id_commune` int NOT NULL,
  PRIMARY KEY (`id_region`),
  KEY `id_commune` (`id_commune`),
  CONSTRAINT `region_ibfk_1` FOREIGN KEY (`id_commune`) REFERENCES `commune` (`id_commune`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region_dynamique`
--

DROP TABLE IF EXISTS `region_dynamique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region_dynamique` (
  `id_region_dynamique` int NOT NULL,
  `centre_y` double NOT NULL,
  `diametre` double NOT NULL,
  `centre_x` double NOT NULL,
  PRIMARY KEY (`id_region_dynamique`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region_dynamique`
--

LOCK TABLES `region_dynamique` WRITE;
/*!40000 ALTER TABLE `region_dynamique` DISABLE KEYS */;
/*!40000 ALTER TABLE `region_dynamique` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id_role` int NOT NULL,
  `libelle_role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'SADM'),(2,'AC');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tache`
--

DROP TABLE IF EXISTS `tache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tache` (
  `id_tache` int NOT NULL,
  `etat_tache` varchar(50) NOT NULL,
  `description_tache` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_tache`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tache`
--

LOCK TABLES `tache` WRITE;
/*!40000 ALTER TABLE `tache` DISABLE KEYS */;
/*!40000 ALTER TABLE `tache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_paiement`
--

DROP TABLE IF EXISTS `type_paiement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_paiement` (
  `id_type_paiement` int NOT NULL,
  `libelle_type_paiement` varchar(50) NOT NULL,
  PRIMARY KEY (`id_type_paiement`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_paiement`
--

LOCK TABLES `type_paiement` WRITE;
/*!40000 ALTER TABLE `type_paiement` DISABLE KEYS */;
/*!40000 ALTER TABLE `type_paiement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id_utilisateur` int NOT NULL,
  `username_utilisateur` varchar(50) NOT NULL,
  `password_utilisateur` varchar(100) NOT NULL,
  `mail_utilisateur` varchar(50) DEFAULT NULL,
  `supervisor_id` int DEFAULT NULL,
  `regestration_token` varchar(100) DEFAULT NULL,
  `id_role` int NOT NULL,
  `id_client` int DEFAULT NULL,
  PRIMARY KEY (`id_utilisateur`),
  KEY `supervisor_id` (`supervisor_id`),
  KEY `id_role` (`id_role`),
  KEY `id_client` (`id_client`),
  CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`supervisor_id`) REFERENCES `utilisateur` (`id_utilisateur`),
  CONSTRAINT `utilisateur_ibfk_2` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`),
  CONSTRAINT `utilisateur_ibfk_3` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'name','$2a$12$apbKIcltth25Z21AxxMv0.aNKLaP3KPmQPlGPim9sgVqOdwOtupcC',NULL,NULL,NULL,1,NULL),(4,'agentAC','$2a$12$apbKIcltth25Z21AxxMv0.aNKLaP3KPmQPlGPim9sgVqOdwOtupcC',NULL,1,NULL,2,NULL);
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wilaya`
--

DROP TABLE IF EXISTS `wilaya`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wilaya` (
  `id_wilaya` int NOT NULL,
  `numero_wilaya` int NOT NULL,
  `nom_willaya` varchar(50) NOT NULL,
  `id_pays` varchar(50) NOT NULL,
  PRIMARY KEY (`id_wilaya`),
  KEY `id_pays` (`id_pays`),
  CONSTRAINT `wilaya_ibfk_1` FOREIGN KEY (`id_pays`) REFERENCES `pays` (`id_pays`)
) ENGINE=InnoDB  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wilaya`
--

LOCK TABLES `wilaya` WRITE;
/*!40000 ALTER TABLE `wilaya` DISABLE KEYS */;
/*!40000 ALTER TABLE `wilaya` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-14 11:31:42