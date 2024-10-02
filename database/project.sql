CREATE DATABASE  IF NOT EXISTS `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project
-- ------------------------------------------------------
-- Server version	8.0.37

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
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk_users_roles_idx` (`role_id`),
  CONSTRAINT `fk_users_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (30,'John','Doe','john.doe@example.com','password1',1),(31,'Jane','Smith','jane.smith@example.com','password2',1),(32,'Michael','Johnson','michael.johnson@example.com','password3',1),(33,'Emily','Williams','emily.williams@example.com','password4',1),(34,'David','Brown','david.brown@example.com','password5',1),(35,'Jessica','Jones','jessica.jones@example.com','password6',1),(36,'Daniel','Garcia','daniel.garcia@example.com','password7',1),(37,'Olivia','Martinez','olivia.martinez@example.com','password8',1),(38,'William','Robinson','william.robinson@example.com','password9',1),(39,'Sophia','Clark','sophia.clark@example.com','password10',1),(40,'James','Lewis','james.lewis@example.com','password11',1),(41,'Ava','Lee','ava.lee@example.com','password12',1),(42,'Benjamin','Taylor','benjamin.taylor@example.com','password13',1),(43,'Isabella','Moore','isabella.moore@example.com','password14',1),(44,'Liam','Anderson','liam.anderson@example.com','password15',1),(45,'Charlotte','White','charlotte.white@example.com','password16',1),(46,'Mason','Harris','mason.harris@example.com','password17',1),(47,'Amelia','Martin','amelia.martin@example.com','password18',1),(48,'Ethan','Thompson','ethan.thompson@example.com','password19',1),(49,'Harper','Garcia','harper.garcia@example.com','password20',1),(53,'uriel','shamiro','122345@gmail.com','djfkdlij32',1),(54,'first_Test_name1','last_test_name1','email_test12345@gmail.com','passwort12345',1),(55,'Test_name1','_last_test_name1','email_test1@gmail.com','password1',1),(56,'Test_name2','_last_test_name2','email_test2@gmail.com','password2',1),(57,'Test_name3','_last_test_name3','email_test3@gmail.com','password3',1),(58,'Test_name4','_last_test_name4','email_test4@gmail.com','password4',1),(59,'Test_name4','_last_test_name4','email_test@gmail.com','password4',1),(60,'Test_name5','_last_test_name5','email_test5@gmail.com','password5',1),(61,'Test_name6','_last_test_name6','email_test6@gmail.com','password6',1),(62,'Test_name7','_last_test_name7','email_test7@gmail.com','password7',1),(63,'Test_name8','_last_test_name8','email_test8@gmail.com','password8',1),(65,'basel','hernan','basel.hernan@gmail.com','hello123',1),(66,'uri','shamir','urisahm@gmail.com','123456',1),(67,'uri','shator','urisham1@gmail.com','1234567',1),(68,'my dfsjfdsk','whats my last name','email@email.com','456786434',1),(69,'אורי','שמיר','v.monitin@gmail.com','uri123',1),(70,'אורי','שמיר','123@gmail.com','13579',1),(71,'uri','shamir','1234@gmail.com','12345',1),(72,'uri','shamir','u@gmail.com','1234321',1),(73,'boobs','netzer','boss@gmail.com','boss12345',1),(74,'ti','ta','ta@gmail.com','ta12345',1),(75,'uri','shamir','uri@gmail.com','1234567',2),(76,'shiran','yosef','shiran@gmail.com','1234567',1),(77,'gfdsfsd','fdsfds','fdsfds@gmail.com','12345',1),(78,'uri','shamir','urish@gmail.com','f0d7f417ab3f56c628a589269b7ac295c5e518f88aeb2dc9547c587f4bb9aba14f3fc182074f16ca30b2994f881214a3a92a83aee41dea152225d676b6582b17',1),(79,'uri','shamir','uri.shamir@gmail.com','eed120b27d3c7aeb7168399cc654bcd116723d18de3f10401b60e4de6cbda516897763bdc251887a0cbccd72c2d9d0eeca570480128d203b470e0f25575b8042',1),(80,'uri','shamir','urisham@gmail.com','eed120b27d3c7aeb7168399cc654bcd116723d18de3f10401b60e4de6cbda516897763bdc251887a0cbccd72c2d9d0eeca570480128d203b470e0f25575b8042',2),(81,'shani','netzer','shan@gmail.com','a48bfc55bb6d9f7864e139fdf7f8831a4e5b2e5a30f880fde571fa3d4fdf5e58144f4a70a63fcefaae487114b22ab35deaadaea70febcd5d5cdebd7a88036d70',1),(82,'אורי','שמיר','uri12345@gmail.com','24d7eb51eed47a350d3ce7176e9ec8e8689ece11f2a5b972bd9f47aac7c1d5ddb3f8be71e4fe0134c1e2f3eff3dfd634f1ade64a6cbfa05c229d25f99649928a',1),(83,'assaf','amir','assaf@gmail.com','f0d7f417ab3f56c628a589269b7ac295c5e518f88aeb2dc9547c587f4bb9aba14f3fc182074f16ca30b2994f881214a3a92a83aee41dea152225d676b6582b17',1),(84,'Test_name9','_last_test_name9','email_test9@gmail.com','password9',1),(85,'Test_name9','_last_test_name9','email_test21@gmail.com','password9',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (100,'Parisian Elegance','Experience the romance and charm of Paris with guided tours of the Eiffel Tower, Louvre Museum, and charming Montmartre. Enjoy a Seine River cruise and savor exquisite French cuisine in local bistros.','2024-08-24','2024-08-31',4550.00,'2f8a47cc-ced7-4036-99c3-e689aa5dc85d.jpg',1,12,8),(101,'Sydney Escapade','Enjoy the stunning views of Sydney\'s Opera House and Harbour Bridge. Relax on Bondi Beach, visit the Taronga Zoo, and take a scenic cruise around the harbor.','2024-08-25','2024-09-06',6500.00,'3bd67756-c9f9-4825-99a3-2ac65110a20e.jpg',4,1,13),(102,'New York City Highlights','Explore the vibrant cityscape of New York with trips to Times Square, Central Park, the Statue of Liberty, and Broadway shows. Experience diverse neighborhoods and iconic landmarks.','2024-09-01','2024-09-30',9899.00,'e0d493df-4ddd-43c6-8e95-f55f99079de8.jpg',6,47,30),(103,'Rome\'s Timeless Wonders','Discover the ancient history of Rome with guided tours of the Colosseum, Roman Forum, and Vatican City. Enjoy authentic Italian pizza and pasta in the heart of the city.','2024-08-11','2024-08-18',5999.00,'4790608e-9a8c-4337-8b37-6ebb3307e633.jpg',2,26,8),(104,'Nakuru National Park','Visit Lake Nakuru National Park, renowned for its flamingo population and diverse wildlife. Enjoy game drives, bird watching, and stunning views of Lake Nakuru and the surrounding landscapes.','2024-08-11','2024-08-18',4999.00,'9528cb6c-f1aa-4f0e-97d0-7d4941b747e0.jpg',25,3,8),(105,'Discover Japan: A Journey Through the Land of the Rising Sun','Experience the enchanting beauty and rich culture of Japan, a country where ancient traditions blend seamlessly with cutting-edge modernity. From the serene temples of Kyoto to the bustling streets of Tokyo, this vacation offers an unforgettable exploration of Japan’s diverse landscapes and vibrant cities.','2024-10-12','2024-10-26',5000.00,'48237347-de29-4e22-b9af-8bddc7e6ea67.jpg',3,28,15),(106,'Tropical Paradise: A Blissful Getaway to the Maldives','Escape to the Maldives, a tropical paradise of stunning coral reefs, crystal-clear waters, and luxurious overwater bungalows. This vacation promises a serene retreat with opportunities for adventure and relaxation amidst one of the most beautiful island chains in the world.','2024-08-10','2024-08-15',5500.00,'5fb1cc19-6260-4237-ab85-96a92ec89672.jpg',26,8,6),(107,'Enchanting Thailand: A Journey Through Culture and Beauty','Immerse yourself in the vibrant culture and breathtaking landscapes of Thailand, a country known for its rich history, stunning temples, and lively street markets. From the bustling city life of Bangkok to the tranquil beaches of Phuket, this vacation offers a perfect blend of adventure and relaxation.','2024-08-18','2024-08-24',3499.00,'56fe45c2-828b-474c-8a4c-3e4890b21a35.jpg',10,2,7),(108,'New Zealand: Adventure and Serenity','Explore the awe-inspiring landscapes and unique culture of New Zealand, where adventure awaits around every corner. From the vibrant cities of Auckland and Wellington to the breathtaking fjords and geothermal wonders, this vacation offers an unforgettable journey through one of the world’s most stunning destinations.','2024-08-11','2024-08-25',10000.00,'f6f9087f-dc20-4673-ac32-9015b187ffdd.jpg',17,14,15),(109,'Epic Iceland: A Journey Through Fire and Ice','Experience the dramatic landscapes and natural wonders of Iceland, a land of fire, ice, and stunning natural beauty. From the awe-inspiring Northern Lights to the majestic waterfalls and geothermal hot springs, this vacation promises an unforgettable adventure in one of the most unique destinations on Earth.','2024-08-25','2024-08-31',7500.00,'f514662f-bf9d-45a6-81b5-59b1f1e844f4.jpg',18,1,7),(110,'Israel Uncovered: A Journey Through History and Culture','Discover the rich tapestry of history, culture, and natural beauty in Israel. From the ancient wonders of Jerusalem to the vibrant modernity of Tel Aviv and the serene landscapes of the Dead Sea, this vacation offers an immersive exploration of one of the world\'s most historically significant regions.','2024-08-31','2024-09-07',5000.00,'750f54c4-1ce0-47f7-8244-c42075fb0e59.jpg',12,5,8),(111,'Vibrant Brazil','Embark on an exhilarating adventure through Brazil, a country known for its vibrant culture, stunning landscapes, and lively festivals. From the bustling city of Rio de Janeiro to the lush Amazon rainforest, this vacation offers a perfect blend of urban excitement and natural beauty.','2024-08-17','2024-08-31',8500.00,'79d774b7-4965-4741-96a7-521bec8f3b34.jpg',15,10,15),(121,'shiran vacation','description','2024-08-14','2024-08-30',10000.00,'cc86a151-609b-47a3-b5e2-09ef78a07985.jpg',17,2,17),(124,'test vacation','this is assaf vacation','2024-08-26','2024-08-31',3500.00,'2b7854ea-067e-493f-9e26-0542422424c8.jpg',2,0,6),(125,'ido\'s vacation','hello','2024-08-30','2024-09-07',10000.00,'6950ab97-f433-4e57-a5e5-77301f297ed6.jpg',17,0,9);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'project'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-28 21:32:36
