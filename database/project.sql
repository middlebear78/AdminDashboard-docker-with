CREATE DATABASE  IF NOT EXISTS `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add role',6,'add_role'),(22,'Can change role',6,'change_role'),(23,'Can delete role',6,'delete_role'),(24,'Can view role',6,'view_role'),(25,'Can add user',7,'add_user'),(26,'Can change user',7,'change_user'),(27,'Can delete user',7,'delete_user'),(28,'Can view user',7,'view_user'),(29,'Can view users',7,'can_view_users'),(30,'Can add country',8,'add_country'),(31,'Can change country',8,'change_country'),(32,'Can delete country',8,'delete_country'),(33,'Can view country',8,'view_country'),(34,'Can add like',9,'add_like'),(35,'Can change like',9,'change_like'),(36,'Can delete like',9,'delete_like'),(37,'Can view like',9,'view_like'),(38,'Can add vacation',10,'add_vacation'),(39,'Can change vacation',10,'change_vacation'),(40,'Can delete vacation',10,'delete_vacation'),(41,'Can view vacation',10,'view_vacation');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `country_id` int NOT NULL AUTO_INCREMENT,
  `country_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'France'),(2,'Italy'),(3,'Japan'),(4,'Australia'),(5,'Sweden'),(6,'USA'),(7,'Spain'),(8,'Holland'),(9,'Germany'),(10,'Thailand'),(11,'Greece'),(12,'Israel'),(13,'Finland'),(14,'Mexico'),(15,'Brazil'),(16,'Cuba'),(17,'New Zealand'),(18,'Iceland'),(19,'United Kingdom'),(20,'Ireland'),(21,'Scotland'),(22,'Romania'),(23,'Test Country'),(25,'Kenya'),(26,'Maldives'),(27,'Norway'),(32,'Canada');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_users_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(5,'sessions','session'),(6,'users','role'),(7,'users','user'),(8,'vacations','country'),(9,'vacations','like'),(10,'vacations','vacation');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-10-12 20:20:55.563462'),(2,'contenttypes','0002_remove_content_type_name','2024-10-12 20:20:55.632431'),(3,'auth','0001_initial','2024-10-12 20:20:55.937104'),(4,'auth','0002_alter_permission_name_max_length','2024-10-12 20:20:56.052109'),(5,'auth','0003_alter_user_email_max_length','2024-10-12 20:20:56.062105'),(6,'auth','0004_alter_user_username_opts','2024-10-12 20:20:56.071114'),(7,'auth','0005_alter_user_last_login_null','2024-10-12 20:20:56.080114'),(8,'auth','0006_require_contenttypes_0002','2024-10-12 20:20:56.085105'),(9,'auth','0007_alter_validators_add_error_messages','2024-10-12 20:20:56.096118'),(10,'auth','0008_alter_user_username_max_length','2024-10-12 20:20:56.106108'),(11,'auth','0009_alter_user_last_name_max_length','2024-10-12 20:20:56.116105'),(12,'auth','0010_alter_group_name_max_length','2024-10-12 20:20:56.141109'),(13,'auth','0011_update_proxy_permissions','2024-10-12 20:20:56.151110'),(14,'auth','0012_alter_user_first_name_max_length','2024-10-12 20:20:56.160109'),(15,'users','0001_initial','2024-10-12 20:25:03.462480'),(16,'admin','0001_initial','2024-10-12 20:25:03.847507'),(17,'admin','0002_logentry_remove_auto_add','2024-10-12 20:25:03.877506'),(18,'admin','0003_logentry_add_action_flag_choices','2024-10-12 20:25:03.906510'),(19,'sessions','0001_initial','2024-10-12 20:25:04.012504'),(20,'vacations','0001_initial','2024-10-12 20:25:04.025503');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (2,64),(64,2),(29,79),(29,84),(64,84),(64,89),(29,89),(29,2),(67,83),(67,88),(67,13),(29,90),(64,90),(64,50),(64,10),(64,11),(64,94),(29,10),(29,11),(64,93),(64,95),(29,88),(29,92),(64,91),(64,88),(29,95),(29,83),(29,91),(29,94),(29,97),(29,107),(29,110),(29,105),(29,116),(29,111),(29,108),(29,118),(72,106),(72,103),(72,104),(72,100),(72,101),(73,106),(73,103),(73,118),(73,105),(73,109),(73,102),(29,104),(29,106),(77,103),(77,106),(77,120),(77,104),(77,121),(82,106),(82,120),(82,103),(82,108),(82,107),(82,111),(75,103),(75,103),(75,103),(75,106),(81,103),(81,106),(81,120),(81,121),(81,111);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'User'),(2,'Admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `firebase_uid` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `firebase_uid` (`firebase_uid`),
  KEY `users_role_id_1900a745_fk_roles_role_id` (`role_id`),
  CONSTRAINT `users_role_id_1900a745_fk_roles_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'123456',NULL,1,'urisham@gmail.com','uri','shamir','urisham@gmail.com',1,1,'2010-12-24 00:00:00.000000','4rMszfHZ63YMPZYbL6EqB28iRNI3',2),(2,'123456',NULL,0,'shani.netzer@gmail.com','shani','netzer','shani.netzer@gmail.com',1,1,'2010-12-24 00:00:00.000000','G8OUyQ9G5occFy0ErnEVPYNYkQg2',1),(3,'hashed_password_1','2024-10-15 12:00:00.000000',1,'user1','John','Doe','john.doe@example.com',1,1,'2024-09-01 09:00:00.000000','firebase_uid_1',1),(4,'hashed_password_2','2024-10-14 11:00:00.000000',0,'user2','Jane','Smith','jane.smith@example.com',0,1,'2024-09-02 10:00:00.000000','firebase_uid_2',1),(5,'hashed_password_3','2024-10-13 10:00:00.000000',0,'user3','Michael','Johnson','michael.johnson@example.com',1,1,'2024-09-03 11:00:00.000000','firebase_uid_3',1),(6,'hashed_password_4','2024-10-12 09:00:00.000000',0,'user4','Emily','Davis','emily.davis@example.com',0,0,'2024-09-04 12:00:00.000000','firebase_uid_4',1),(7,'hashed_password_5','2024-10-11 08:00:00.000000',1,'user5','Chris','Brown','chris.brown@example.com',1,1,'2024-09-05 08:00:00.000000','firebase_uid_5',1),(8,'hashed_password_6','2024-10-10 07:00:00.000000',0,'user6','Jessica','Wilson','jessica.wilson@example.com',1,1,'2024-09-06 07:00:00.000000','firebase_uid_6',1),(9,'hashed_password_7','2024-10-09 06:00:00.000000',1,'user7','David','Taylor','david.taylor@example.com',0,1,'2024-09-07 06:00:00.000000','firebase_uid_7',1),(10,'hashed_password_8','2024-10-08 05:00:00.000000',1,'user8','Sarah','Miller','sarah.miller@example.com',1,0,'2024-09-08 05:00:00.000000','firebase_uid_8',1),(11,'hashed_password_9','2024-10-07 04:00:00.000000',0,'user9','Daniel','Anderson','daniel.anderson@example.com',1,1,'2024-09-09 04:00:00.000000','firebase_uid_9',1),(12,'hashed_password_10','2024-10-06 03:00:00.000000',0,'user10','Laura','Moore','laura.moore@example.com',0,1,'2024-09-10 03:00:00.000000','firebase_uid_10',1),(13,'hashed_password_11','2024-10-05 02:00:00.000000',1,'user11','Robert','Jackson','robert.jackson@example.com',1,0,'2024-09-11 02:00:00.000000','firebase_uid_11',1),(14,'hashed_password_12','2024-10-04 01:00:00.000000',1,'user12','Alice','Martinez','alice.martinez@example.com',1,1,'2024-09-12 01:00:00.000000','firebase_uid_12',1),(15,'hashed_password_13','2024-10-03 12:00:00.000000',0,'user13','Ethan','Lopez','ethan.lopez@example.com',0,1,'2024-09-13 12:00:00.000000','firebase_uid_13',1),(16,'hashed_password_14','2024-10-02 11:00:00.000000',0,'user14','Sophia','Gonzalez','sophia.gonzalez@example.com',1,1,'2024-09-14 11:00:00.000000','firebase_uid_14',1),(17,'hashed_password_15','2024-10-01 10:00:00.000000',1,'user15','Jack','Perez','jack.perez@example.com',1,1,'2024-09-15 10:00:00.000000','firebase_uid_15',1),(18,'hashed_password_16','2024-09-30 09:00:00.000000',1,'user16','Amelia','King','amelia.king@example.com',0,1,'2024-09-16 09:00:00.000000','firebase_uid_16',1),(19,'hashed_password_17','2024-09-29 08:00:00.000000',0,'user17','James','Wright','james.wright@example.com',1,1,'2024-09-17 08:00:00.000000','firebase_uid_17',1),(20,'hashed_password_18','2024-09-28 07:00:00.000000',1,'user18','Mia','Hill','mia.hill@example.com',1,0,'2024-09-18 07:00:00.000000','firebase_uid_18',1),(21,'hashed_password_19','2024-09-27 06:00:00.000000',0,'user19','Lucas','Scott','lucas.scott@example.com',0,1,'2024-09-19 06:00:00.000000','firebase_uid_19',1),(22,'hashed_password_20','2024-09-26 05:00:00.000000',1,'user20','Ella','Green','ella.green@example.com',1,1,'2024-09-20 05:00:00.000000','firebase_uid_20',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_groups`
--

DROP TABLE IF EXISTS `users_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_groups_user_id_group_id_fc7788e8_uniq` (`user_id`,`group_id`),
  KEY `users_groups_group_id_2f3517aa_fk_auth_group_id` (`group_id`),
  CONSTRAINT `users_groups_group_id_2f3517aa_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `users_groups_user_id_f500bee5_fk_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_groups`
--

LOCK TABLES `users_groups` WRITE;
/*!40000 ALTER TABLE `users_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_permissions`
--

DROP TABLE IF EXISTS `users_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_permissions_user_id_permission_id_3b86cbdf_uniq` (`user_id`,`permission_id`),
  KEY `users_user_permissio_permission_id_6d08dcd2_fk_auth_perm` (`permission_id`),
  CONSTRAINT `users_user_permissio_permission_id_6d08dcd2_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `users_user_permissions_user_id_92473840_fk_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_permissions`
--

LOCK TABLES `users_user_permissions` WRITE;
/*!40000 ALTER TABLE `users_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_id` int NOT NULL AUTO_INCREMENT,
  `vacation_name` varchar(100) DEFAULT NULL,
  `vacation_description` varchar(2000) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `vacation_img` varchar(255) DEFAULT NULL,
  `country_id` int NOT NULL,
  `likes` int DEFAULT NULL,
  `vacation_days` int DEFAULT NULL,
  PRIMARY KEY (`vacation_id`),
  KEY `fk_Vacations_Countries1_idx` (`country_id`),
  CONSTRAINT `fk_Vacations_Countries1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (100,'Parisian Elegance','Experience the romance and charm of Paris with guided tours of the Eiffel Tower, Louvre Museum, and charming Montmartre. Enjoy a Seine River cruise and savor exquisite French cuisine in local bistros.','2024-08-24','2024-08-31',4550.00,'2f8a47cc-ced7-4036-99c3-e689aa5dc85d.jpg',1,12,8),(101,'Sydney Escapade','Enjoy the stunning views of Sydney\'s Opera House and Harbour Bridge. Relax on Bondi Beach, visit the Taronga Zoo, and take a scenic cruise around the harbor.','2024-08-25','2024-09-06',6500.00,'3bd67756-c9f9-4825-99a3-2ac65110a20e.jpg',4,1,13),(102,'New York City Highlights','Explore the vibrant cityscape of New York with trips to Times Square, Central Park, the Statue of Liberty, and Broadway shows. Experience diverse neighborhoods and iconic landmarks.','2024-09-01','2024-09-30',9899.00,'e0d493df-4ddd-43c6-8e95-f55f99079de8.jpg',6,47,30),(103,'Rome\'s Timeless Wonders','Discover the ancient history of Rome with guided tours of the Colosseum, Roman Forum, and Vatican City. Enjoy authentic Italian pizza and pasta in the heart of the city.','2024-08-11','2024-08-18',5999.00,'4790608e-9a8c-4337-8b37-6ebb3307e633.jpg',2,26,8),(104,'Nakuru National Park','Visit Lake Nakuru National Park, renowned for its flamingo population and diverse wildlife. Enjoy game drives, bird watching, and stunning views of Lake Nakuru and the surrounding landscapes.','2024-08-11','2024-08-18',4999.00,'9528cb6c-f1aa-4f0e-97d0-7d4941b747e0.jpg',25,3,8),(105,'Discover Japan: A Journey Through the Land of the Rising Sun','Experience the enchanting beauty and rich culture of Japan, a country where ancient traditions blend seamlessly with cutting-edge modernity. From the serene temples of Kyoto to the bustling streets of Tokyo, this vacation offers an unforgettable exploration of Japan’s diverse landscapes and vibrant cities.','2024-10-12','2024-10-26',5000.00,'48237347-de29-4e22-b9af-8bddc7e6ea67.jpg',3,28,15),(106,'Tropical Paradise: A Blissful Getaway to the Maldives','Escape to the Maldives, a tropical paradise of stunning coral reefs, crystal-clear waters, and luxurious overwater bungalows. This vacation promises a serene retreat with opportunities for adventure and relaxation amidst one of the most beautiful island chains in the world.','2024-08-10','2024-08-15',5500.00,'5fb1cc19-6260-4237-ab85-96a92ec89672.jpg',26,8,6),(107,'Enchanting Thailand: A Journey Through Culture and Beauty','Immerse yourself in the vibrant culture and breathtaking landscapes of Thailand, a country known for its rich history, stunning temples, and lively street markets. From the bustling city life of Bangkok to the tranquil beaches of Phuket, this vacation offers a perfect blend of adventure and relaxation.','2024-08-18','2024-08-24',3499.00,'56fe45c2-828b-474c-8a4c-3e4890b21a35.jpg',10,2,7),(108,'New Zealand: Adventure and Serenity','Explore the awe-inspiring landscapes and unique culture of New Zealand, where adventure awaits around every corner. From the vibrant cities of Auckland and Wellington to the breathtaking fjords and geothermal wonders, this vacation offers an unforgettable journey through one of the world’s most stunning destinations.','2024-08-11','2024-08-25',10000.00,'f6f9087f-dc20-4673-ac32-9015b187ffdd.jpg',17,14,15),(109,'Epic Iceland: A Journey Through Fire and Ice','Experience the dramatic landscapes and natural wonders of Iceland, a land of fire, ice, and stunning natural beauty. From the awe-inspiring Northern Lights to the majestic waterfalls and geothermal hot springs, this vacation promises an unforgettable adventure in one of the most unique destinations on Earth.','2024-08-25','2024-08-31',7500.00,'f514662f-bf9d-45a6-81b5-59b1f1e844f4.jpg',18,1,7),(110,'Israel Uncovered: A Journey Through History and Culture','Discover the rich tapestry of history, culture, and natural beauty in Israel. From the ancient wonders of Jerusalem to the vibrant modernity of Tel Aviv and the serene landscapes of the Dead Sea, this vacation offers an immersive exploration of one of the world\'s most historically significant regions.','2024-08-31','2024-09-07',5000.00,'750f54c4-1ce0-47f7-8244-c42075fb0e59.jpg',12,5,8),(111,'Vibrant Brazil','Embark on an exhilarating adventure through Brazil, a country known for its vibrant culture, stunning landscapes, and lively festivals. From the bustling city of Rio de Janeiro to the lush Amazon rainforest, this vacation offers a perfect blend of urban excitement and natural beauty.','2024-08-17','2024-08-31',8500.00,'79d774b7-4965-4741-96a7-521bec8f3b34.jpg',15,10,15),(121,'shiran vacation','description','2024-08-14','2024-08-30',10000.00,'cc86a151-609b-47a3-b5e2-09ef78a07985.jpg',17,2,17),(124,'test vacation','this is assaf vacation','2024-08-26','2024-08-31',3500.00,'2b7854ea-067e-493f-9e26-0542422424c8.jpg',2,0,6),(125,'ido\'s vacation','hello','2024-08-30','2024-09-07',10000.00,'6950ab97-f433-4e57-a5e5-77301f297ed6.jpg',17,0,9),(126,'Beach Paradise','Relax on the pristine beaches of Maldives.','2024-08-01','2024-10-30',1500.00,'beach_paradise.jpg',1,120,90),(127,'Mountain Adventure','Explore the Rocky Mountains and enjoy hiking.','2024-09-01','2024-10-20',1200.00,'mountain_adventure.jpg',2,85,50),(128,'City Lights','Experience the nightlife of New York City.','2024-07-15','2024-11-01',1800.00,'city_lights.jpg',3,200,110),(129,'Safari Journey','Go on a thrilling safari in Kenya.','2024-06-10','2024-10-25',2200.00,'safari_journey.jpg',4,95,75),(130,'Cultural Europe','Discover the rich history of European cities.','2024-08-05','2024-10-31',2500.00,'cultural_europe.jpg',5,140,88),(131,'Tropical Escape','Stay in luxurious resorts in Hawaii.','2024-07-20','2024-12-15',1900.00,'tropical_escape.jpg',6,160,100),(132,'Mediterranean Cruise','Sail through the Mediterranean Sea.','2024-09-10','2024-11-30',3000.00,'mediterranean_cruise.jpg',7,180,80),(133,'Desert Expedition','Experience the vast deserts of Morocco.','2024-06-15','2024-11-05',1300.00,'desert_expedition.jpg',8,110,100),(134,'Rainforest Adventure','Explore the Amazon Rainforest.','2024-08-10','2024-11-15',2100.00,'rainforest_adventure.jpg',9,100,95),(135,'Winter Wonderland','Enjoy skiing and snowboarding in the Alps.','2024-09-05','2024-12-01',1700.00,'winter_wonderland.jpg',10,90,87),(136,'Asian Expedition','Discover the hidden gems of Asia.','2024-12-01','2025-02-01',2400.00,'asian_expedition.jpg',11,50,60),(137,'Caribbean Getaway','Sail through the Caribbean Islands.','2024-12-15','2025-01-30',1600.00,'caribbean_getaway.jpg',12,75,46),(138,'Nordic Adventure','Explore the breathtaking landscapes of Scandinavia.','2024-12-20','2025-02-15',2200.00,'nordic_adventure.jpg',13,80,57),(139,'African Safari','Discover the wildlife of South Africa.','2024-11-05','2025-01-15',2500.00,'african_safari.jpg',14,90,70),(140,'Australian Adventure','Explore the Great Barrier Reef.','2024-12-01','2025-03-01',2900.00,'australian_adventure.jpg',15,105,92),(141,'Japanese Cherry Blossom','Experience Japan during the cherry blossom season.','2025-02-15','2025-03-30',2000.00,'cherry_blossom.jpg',16,95,45),(142,'New Zealand Trek','Hike the stunning trails of New Zealand.','2025-01-01','2025-02-28',2300.00,'new_zealand_trek.jpg',17,120,58),(143,'South American Journey','Explore the vibrant cities of South America.','2024-11-15','2025-02-01',2600.00,'south_american_journey.jpg',18,130,75),(144,'Canadian Wilderness','Explore the beautiful wilderness of Canada.','2024-12-25','2025-02-10',1800.00,'canadian_wilderness.jpg',19,80,47),(145,'Greek Island Hopping','Hop between the beautiful Greek islands.','2024-11-30','2025-01-20',2100.00,'greek_island_hopping.jpg',20,70,52);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-21  1:02:16
