-- MySQL dump 10.13  Distrib 5.7.18, for Win64 (x86_64)
--
-- Host: localhost    Database: qjtx_db
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `qj_operaters`
--

DROP TABLE IF EXISTS `qj_operaters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qj_operaters` (
  `operaterid` varchar(30) NOT NULL,
  `opassword` varchar(100) DEFAULT NULL,
  `operatername` varchar(45) DEFAULT NULL,
  `operatergroup` varchar(45) DEFAULT NULL,
  `omobile` varchar(20) DEFAULT NULL,
  `omail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`operaterid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qj_operaters`
--

LOCK TABLES `qj_operaters` WRITE;
/*!40000 ALTER TABLE `qj_operaters` DISABLE KEYS */;
/*!40000 ALTER TABLE `qj_operaters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qj_orders`
--

DROP TABLE IF EXISTS `qj_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qj_orders` (
  `orderid` int(11) NOT NULL AUTO_INCREMENT,
  `orderdate` date DEFAULT NULL,
  `ordertime` datetime DEFAULT NULL,
  `orderprice` double DEFAULT NULL,
  `operatetime` datetime DEFAULT NULL,
  `operaterid` varchar(30) DEFAULT NULL,
  `operatestatus` int(11) DEFAULT NULL,
  `monthly_fee` double DEFAULT NULL COMMENT '套餐月费，可支持两位小数，单位（元）',
  `broadband_rat` int(11) DEFAULT NULL COMMENT '宽带速率',
  `effective_date` date DEFAULT NULL COMMENT '生效时间',
  `contract_period` varchar(20) DEFAULT NULL COMMENT '合约期',
  `package_details` varchar(200) DEFAULT NULL COMMENT '套餐详情',
  `package_name` varchar(100) DEFAULT NULL COMMENT '套餐名称',
  `operatorcompany` varchar(100) DEFAULT NULL COMMENT '运营商',
  `broadband_account` varchar(100) DEFAULT NULL COMMENT '宽带账号',
  `mobile` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `id_number` varchar(20) DEFAULT NULL COMMENT '身份证号',
  `cname` varchar(45) DEFAULT NULL COMMENT '机主姓名',
  `service_type` varchar(45) DEFAULT NULL COMMENT '业务类型包括（broadband、contractPhone、depositFee）宽带业务（broadband）合约机（contractPhone）存费送费（depositFee）',
  `installation_address` varchar(200) DEFAULT NULL COMMENT '安装地址',
  `package_price` double DEFAULT NULL COMMENT '优惠信息',
  `attach_info` varchar(200) DEFAULT NULL COMMENT '商家附加信息',
  `mix_user_id` varchar(100) DEFAULT NULL COMMENT '买家混淆user ID',
  `item_id` varchar(45) DEFAULT NULL COMMENT '商品ID',
  `id_images` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`orderid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qj_orders`
--

LOCK TABLES `qj_orders` WRITE;
/*!40000 ALTER TABLE `qj_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `qj_orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-03 17:35:44
