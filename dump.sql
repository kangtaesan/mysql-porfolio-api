-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: portfoliodb
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `fk_user_id` int DEFAULT NULL,
  `fk_post_id` int DEFAULT NULL,
  `content` text NOT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `delete_at` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,'관리자 답변입니다.','2025-10-30 16:48:44','2025-11-03 02:02:20','2025-11-03 02:02:20'),(2,2,1,'질문자 답변입니다.','2025-10-30 16:50:16','2025-10-30 16:50:16',NULL),(3,3,2,'질문자 추가질문입니다.','2025-10-30 16:51:22','2025-10-30 16:51:22',NULL),(4,1,2,'관리자 답변입니다.','2025-10-30 16:51:44','2025-10-30 16:51:44',NULL),(5,1,3,'관리자 답변입니다.','2025-10-30 16:52:10','2025-10-30 16:52:10',NULL),(6,1,4,'관리자 답변입니다.','2025-10-30 16:54:15','2025-10-30 16:54:15',NULL),(7,1,5,'관리자 답변입니다.','2025-10-30 16:54:38','2025-10-30 16:54:38',NULL),(8,4,5,'질문자 추가질문입니다.','2025-10-30 16:55:08','2025-10-30 16:55:08',NULL),(9,1,6,'관리자 답변입니다.','2025-10-30 16:56:03','2025-10-30 16:56:03',NULL),(10,1,7,'관리자 답변입니다.','2025-10-30 16:56:35','2025-10-30 16:56:35',NULL),(11,6,8,'질문자 추가질문입니다.','2025-10-30 16:57:10','2025-10-30 16:57:10',NULL),(12,6,8,'질문자 추가질문입니다.','2025-10-30 16:57:19','2025-10-30 16:57:19',NULL),(13,1,8,'관리자 답변입니다.','2025-10-30 16:57:33','2025-10-30 16:57:33',NULL),(14,1,9,'관리자 답변입니다.','2025-10-30 16:57:45','2025-10-30 16:57:45',NULL),(15,1,10,'관리자 답변입니다.','2025-10-30 16:58:03','2025-10-30 16:58:48',NULL),(16,3,10,'질문자 추가질문입니다.','2025-10-30 16:58:34','2025-10-30 16:58:34',NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `fk_user_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `view_count` int DEFAULT '0',
  `status` enum('public','private','deleted') DEFAULT 'public',
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `delete_at` datetime DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,2,'더미테이터1','더미데이터입니다.',2,'public','2025-10-30 16:38:51','2025-11-03 00:56:11',NULL),(2,3,'더미테이터2','더미데이터입니다.',0,'public','2025-10-30 16:39:22','2025-10-30 16:39:22',NULL),(3,3,'더미테이터3','더미데이터입니다.',0,'public','2025-10-30 16:42:19','2025-10-30 16:42:19',NULL),(4,4,'더미테이터4','더미데이터입니다.',0,'public','2025-10-30 16:42:20','2025-10-30 16:42:20',NULL),(5,4,'더미테이터5','더미데이터입니다.',0,'public','2025-10-30 16:42:21','2025-10-30 16:42:21',NULL),(6,5,'더미테이터6','더미데이터입니다.',0,'public','2025-10-30 16:42:22','2025-10-30 16:42:22',NULL),(7,4,'더미테이터7','더미데이터입니다.',0,'public','2025-10-30 16:42:23','2025-10-30 16:42:23',NULL),(8,6,'더미테이터8','더미데이터입니다.',0,'public','2025-10-30 16:42:24','2025-10-30 16:42:24',NULL),(9,5,'더미테이터9','더미데이터입니다.',0,'public','2025-10-30 16:42:25','2025-10-30 16:42:25',NULL),(10,3,'더미테이터10','더미데이터입니다.',0,'public','2025-10-30 16:42:26','2025-10-30 16:42:26',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(10) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `create_at` datetime DEFAULT NULL,
  `delete_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@email.com','qwe123@@','admin','admin','2025-10-30 16:31:41',NULL),(2,'user1@email.com','qwe123@@','user1','user','2025-10-30 16:32:16',NULL),(3,'user2@email.com','qwe123@@','user2','user','2025-10-30 16:32:41',NULL),(4,'user3@email.com','qwe123@@','user3','user','2025-10-30 16:32:45',NULL),(5,'user4@email.com','qwe123@@','user4','user','2025-10-30 16:32:50',NULL),(6,'user5@email.com','qwe123@@','user5','user','2025-10-30 16:32:55',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'portfoliodb'
--

--
-- Dumping routines for database 'portfoliodb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-04  0:40:31
