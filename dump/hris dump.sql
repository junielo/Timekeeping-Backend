CREATE DATABASE  IF NOT EXISTS `hris_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `hris_db`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hris_db
-- ------------------------------------------------------
-- Server version	5.7.25-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_datetime` datetime DEFAULT NULL,
  `deleted_datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'IT','Information Technoloty','2019-12-01 17:24:42',NULL,NULL),(2,'MIS','Masters in Informatiion System','2019-12-01 17:24:42',NULL,NULL);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_group`
--

DROP TABLE IF EXISTS `department_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `department_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_id` int(11) DEFAULT NULL,
  `dept_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_group`
--

LOCK TABLES `department_group` WRITE;
/*!40000 ALTER TABLE `department_group` DISABLE KEYS */;
INSERT INTO `department_group` VALUES (1,1,1),(3,2,1),(4,2,2),(9,7,1),(10,7,2),(11,8,1),(12,8,2),(14,0,1),(15,0,2),(16,0,1),(17,0,2),(18,9,1),(19,9,2);
/*!40000 ALTER TABLE `department_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_status`
--

DROP TABLE IF EXISTS `employee_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `employee_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(125) DEFAULT NULL,
  `description` text,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_datetime` datetime DEFAULT NULL,
  `deleted_datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_status`
--

LOCK TABLES `employee_status` WRITE;
/*!40000 ALTER TABLE `employee_status` DISABLE KEYS */;
INSERT INTO `employee_status` VALUES (1,'Provision','Employees under 6 months','2019-11-30 15:16:31',NULL,NULL),(2,'Regular','Employees over 6 months','2019-11-30 15:16:31',NULL,NULL),(3,'Resigned','With proper resignation','2019-12-25 20:42:46',NULL,NULL),(4,'AWOL','Absent wighout leave','2019-12-25 20:42:47',NULL,NULL);
/*!40000 ALTER TABLE `employee_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) DEFAULT NULL,
  `mname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `number` varchar(12) DEFAULT NULL,
  `status_id` tinyint(4) DEFAULT NULL,
  `sick_num` tinyint(4) DEFAULT '0',
  `vacation_num` tinyint(4) DEFAULT '0',
  `date_employed` date DEFAULT NULL,
  `date_regularized` date DEFAULT NULL,
  `date_unemployed` date DEFAULT NULL,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Junielo','Pino','Guardalupe',1,'1995-06-23','jun.guardalupe@gmail.com','09055591952',2,12,12,'2019-11-30',NULL,NULL,'2019-11-30 15:18:58'),(2,'Ipa','Wew','Tulfo',4,'1995-06-23','mark.ivan@gmail.com','09123456789',2,5,6,'2019-11-30',NULL,NULL,'2019-12-04 22:54:55'),(7,'Testing1','Testing1','Testing1',1,'2019-12-03','fasd@fdasf','123',1,1,1,'2019-12-03',NULL,NULL,'2019-12-09 19:40:23'),(8,'Testing2','Testing2','Testing2',1,'2019-12-03','fasdf@fasdf','123',1,6,1,'2019-12-02',NULL,NULL,'2019-12-09 19:41:59'),(9,'Test3','Test3','Test3',2,'2019-12-04','fasdf@asdf','123',1,6,6,'2019-12-03',NULL,NULL,'2019-12-10 01:23:15');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaves`
--

DROP TABLE IF EXISTS `leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `leaves` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_id` int(11) DEFAULT NULL,
  `leave_type` varchar(20) DEFAULT NULL,
  `reason` text,
  `sched_date` date DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `approved_date` date DEFAULT NULL,
  `cancelled_by` int(11) DEFAULT NULL,
  `cancelled_date` date DEFAULT NULL,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaves`
--

LOCK TABLES `leaves` WRITE;
/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
INSERT INTO `leaves` VALUES (1,1,'vacation','headache','2019-12-10',NULL,NULL,NULL,NULL,'2019-12-10 07:52:29'),(2,2,'vacation','toothache','2019-12-10',NULL,NULL,NULL,NULL,'2019-12-10 07:52:47'),(3,1,'vacation','sick','2018-12-10',NULL,NULL,NULL,NULL,'2018-12-10 07:52:29'),(4,1,'vacation','out of town','2019-12-10',NULL,NULL,NULL,NULL,'2019-12-10 07:52:47'),(5,9,'vacation','Reason from sick leave','2019-12-18',NULL,NULL,NULL,NULL,'2019-12-11 01:06:12'),(6,9,'vacation','Another Leave','2019-12-18',NULL,NULL,NULL,NULL,'2019-12-11 01:28:41'),(7,9,'sick','Im sick sorry','2019-12-11',NULL,NULL,NULL,NULL,'2019-12-11 01:29:02'),(8,1,'vacation','Test Test 123','2019-12-31',NULL,NULL,NULL,NULL,'2019-12-16 01:09:37'),(9,9,'vacation','Testing 2018','2018-12-31',NULL,NULL,NULL,NULL,'2018-12-16 01:09:37');
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `positions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(125) DEFAULT NULL,
  `description` text,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_datetime` datetime DEFAULT NULL,
  `deleted_datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES (1,'Android Programmer','Creating android applications for businesses','2019-11-30 15:14:59',NULL,NULL),(2,'Web Programmer','Web programming using angular framework','2019-11-30 15:14:59',NULL,NULL),(3,'Backend Developer','Creating backend processes using nodejs','2019-11-30 15:14:59',NULL,NULL),(4,'Project Manager','Organizing project for the team','2019-12-04 23:34:11',NULL,NULL);
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_master`
--

DROP TABLE IF EXISTS `user_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_id` int(11) DEFAULT NULL,
  `user_type` int(11) DEFAULT NULL,
  `usernname` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_master`
--

LOCK TABLES `user_master` WRITE;
/*!40000 ALTER TABLE `user_master` DISABLE KEYS */;
INSERT INTO `user_master` VALUES (1,0,1,'devmaster','devmaster');
/*!40000 ALTER TABLE `user_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-13  0:40:40
