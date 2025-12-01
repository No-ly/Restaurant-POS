CREATE DATABASE  IF NOT EXISTS `restaurantedb1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `restaurantedb1`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: restaurantedb1
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Hamburguesas'),(2,'Bebidas'),(3,'Complementos'),(4,'Entradas'),(5,'Platos Fuertes'),(6,'Postres'),(7,'Ensaladas');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `especificaciones` text,
  `estado_preparacion` varchar(50) DEFAULT 'En Cola',
  PRIMARY KEY (`id`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
INSERT INTO `detalle_pedido` VALUES (1,1,2,2,35.00,'','Completado'),(2,1,3,1,45.00,'','Completado'),(3,1,1,2,120.00,'','Completado'),(4,2,3,1,45.00,'','Completado'),(5,3,2,1,35.00,'','Completado'),(6,3,1,1,120.00,'','Completado'),(7,4,2,1,35.00,'','Completado'),(8,4,1,1,120.00,'Sin Cebolla','Completado'),(9,5,2,1,35.00,'','Completado'),(10,5,1,1,120.00,'Sin Tomate','Completado'),(11,6,2,1,53.00,'Con Papas Extra','Completado'),(12,6,1,1,130.00,'Sin Cebolla, Con Chile Jalapeño','Completado'),(13,7,1,1,155.00,'Sin Cebolla, Con Doble Carne','Completado'),(14,8,18,1,40.00,'','Completado'),(15,9,18,1,40.00,'','Completado'),(16,10,18,1,40.00,'','Completado'),(17,11,12,1,90.00,'','Completado'),(18,12,3,1,53.00,'Con Salsa BBQ','Completado'),(19,13,4,1,150.00,'Sin Tocino','Completado');
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredientes`
--

DROP TABLE IF EXISTS `ingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio_extra` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredientes`
--

LOCK TABLES `ingredientes` WRITE;
/*!40000 ALTER TABLE `ingredientes` DISABLE KEYS */;
INSERT INTO `ingredientes` VALUES (1,'Carne Res',25.00),(2,'Queso Americano',10.00),(3,'Cebolla',0.00),(4,'Tomate',0.00),(5,'Lechuga',0.00),(6,'Pan Artesanal',15.00),(7,'Tocino Extra',25.00),(8,'Aguacate',20.00),(9,'Chile Jalapeño',10.00),(10,'Queso Derretido',15.00),(11,'Tocino Troceado',18.00),(12,'Tocino Extra',25.00),(13,'Queso Extra',15.00),(14,'Doble Carne',35.00),(15,'Salsa BBQ',8.00),(16,'Papas Extra',18.00),(17,'Queso Cheddar',15.00),(18,'Tocino',20.00),(19,'Aguacate',18.00),(20,'Champiñones',12.00),(21,'Jalapeños',8.00),(22,'Huevo',10.00),(23,'Cebolla Caramelizada',12.00),(24,'Pollo Grill',25.00),(25,'Salmón',40.00),(26,'Queso de Cabra',22.00),(27,'Nueces',15.00),(28,'Crutones',8.00),(29,'Extra Salsa',5.00),(30,'Extra Aderezo',5.00);
/*!40000 ALTER TABLE `ingredientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesas`
--

DROP TABLE IF EXISTS `mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(50) NOT NULL,
  `estado` varchar(50) DEFAULT 'Libre',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas`
--

LOCK TABLES `mesas` WRITE;
/*!40000 ALTER TABLE `mesas` DISABLE KEYS */;
INSERT INTO `mesas` VALUES (1,'Mesa 1','Libre'),(2,'Mesa 2','Libre'),(3,'Mesa 3','Libre'),(4,'Mesa 4','Libre'),(5,'Mesa 5','Libre'),(6,'Mesa 6','Libre'),(7,'Mesa 7','Libre'),(8,'Mesa 8','Libre'),(9,'Mesa 9','Libre'),(10,'Mesa 10','Libre'),(11,'Mesa 11','Libre'),(12,'Mesa 12','Libre'),(13,'Mesa 13','Libre'),(14,'Mesa 14','Libre'),(15,'Mesa 15','Libre');
/*!40000 ALTER TABLE `mesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_usuario` int NOT NULL,
  `mesa` varchar(50) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT '0.00',
  `estado` varchar(50) DEFAULT 'Pendiente',
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'2025-11-30 01:36:02',1,'Mesa 1',411.80,'Completado'),(2,'2025-11-30 01:38:10',2,'Mesa 2',52.20,'Completado'),(3,'2025-11-30 01:43:58',1,'Mesa 3',179.80,'Completado'),(4,'2025-11-30 02:30:47',1,'Mesa 4',179.80,'Completado'),(5,'2025-11-30 03:14:38',2,'Mesa 6',179.80,'Completado'),(6,'2025-11-30 13:01:50',1,'Mesa 2',212.28,'Completado'),(7,'2025-11-30 13:10:18',1,'Mesa 1',179.80,'Completado'),(8,'2025-11-30 14:31:22',1,'Mesa 2',46.40,'Completado'),(9,'2025-11-30 16:16:03',12,'Para Llevar',46.40,'Completado'),(10,'2025-11-30 16:17:03',12,'Mesa 13',46.40,'Completado'),(11,'2025-11-30 16:34:14',7,'Mesa 8',104.40,'Completado'),(12,'2025-11-30 17:50:45',6,'Para Llevar',61.48,'Completado'),(13,'2025-11-30 17:58:44',8,'Para Llevar',174.00,'Completado');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_ingredientes`
--

DROP TABLE IF EXISTS `producto_ingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_ingredientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `id_ingrediente` int NOT NULL,
  `cantidad_default` int DEFAULT '1',
  `es_modificable` tinyint(1) DEFAULT '1',
  `es_default` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_ingrediente` (`id_ingrediente`),
  CONSTRAINT `producto_ingredientes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `producto_ingredientes_ibfk_2` FOREIGN KEY (`id_ingrediente`) REFERENCES `ingredientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_ingredientes`
--

LOCK TABLES `producto_ingredientes` WRITE;
/*!40000 ALTER TABLE `producto_ingredientes` DISABLE KEYS */;
INSERT INTO `producto_ingredientes` VALUES (1,1,6,1,1,1),(2,1,1,1,1,1),(3,1,2,1,1,1),(4,1,4,1,1,1),(5,1,3,1,1,1),(16,1,12,0,1,0),(17,1,8,0,1,0),(18,1,9,0,1,0),(19,1,13,0,1,0),(20,1,14,0,1,0),(21,3,13,0,1,0),(22,3,15,0,1,0),(23,3,16,0,1,0),(25,13,5,1,1,1),(26,13,26,1,1,1),(27,13,4,1,1,1),(28,13,3,1,1,1),(29,13,27,1,1,0),(30,13,25,1,1,0),(31,13,24,1,1,0),(32,10,10,1,1,1),(33,10,11,1,1,1),(34,10,29,1,1,1),(35,10,8,1,1,0),(36,10,9,1,1,0),(37,10,19,1,1,0),(38,11,15,1,0,1),(39,11,29,1,1,0),(40,11,30,1,1,0),(41,4,1,1,1,1),(42,4,17,1,1,1),(43,4,18,1,1,1),(44,4,23,1,1,1),(45,4,15,1,0,1),(46,4,6,1,0,1),(47,4,19,1,1,0),(48,4,21,1,1,0),(49,4,22,1,1,0),(50,5,1,1,1,1),(51,5,17,1,1,1),(52,5,21,1,1,1),(53,5,29,1,0,1),(54,5,6,1,0,1),(55,5,18,1,1,0),(56,5,19,1,1,0),(57,5,22,1,1,0),(58,6,19,1,1,1),(59,6,20,1,1,1),(60,6,3,1,1,1),(61,6,4,1,1,1),(62,6,5,1,1,1),(63,6,6,1,0,1),(64,6,26,1,1,0),(65,6,27,1,1,0),(66,6,17,1,1,0),(67,7,17,1,1,1),(68,7,20,1,1,1),(69,7,24,1,1,0),(70,7,18,1,1,0),(71,7,27,1,1,0),(72,8,23,1,1,1),(73,8,20,1,1,1),(74,8,29,1,1,1),(75,8,18,1,1,0),(76,8,27,1,1,0),(77,9,30,1,1,1),(78,9,27,1,1,1),(79,9,26,1,1,0),(80,9,24,1,1,0),(81,9,19,1,1,0),(82,12,5,1,1,1),(83,12,28,1,1,1),(84,12,30,1,1,1),(85,12,24,1,1,0),(86,12,25,1,1,0),(87,12,26,1,1,0),(88,12,27,1,1,0);
/*!40000 ALTER TABLE `producto_ingredientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen_url` text,
  `area_cocina` varchar(50) NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Hamburguesa Clásica',120.00,'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhbWJ1cmd1ZXNhfGVufDB8fDB8fHww','Cocina',1),(2,'Refresco Cola',35.00,'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Barra',2),(3,'Papas Fritas',45.00,'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',3),(4,'Hamburguesa BBQ',150.00,'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',1),(5,'Hamburguesa Picante',140.00,'https://plus.unsplash.com/premium_photo-1666830497610-c303d845474e?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',1),(6,'Hamburguesa Vegetariana',130.00,'https://plus.unsplash.com/premium_photo-1675864532183-8f37e8834db5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',1),(7,'Pasta Alfredo',180.00,'https://images.unsplash.com/photo-1748012199672-2a94ab9cbb19?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',5),(8,'Filete Mignon',320.00,'https://images.unsplash.com/photo-1694345598429-00511c301452?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',5),(9,'Salmón a la Plancha',280.00,'https://images.unsplash.com/photo-1560717845-968823efbee1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',5),(10,'Nachos Supreme',95.00,'https://images.unsplash.com/photo-1582169296194-e4d644c48063?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',4),(11,'Alitas BBQ',110.00,'https://images.unsplash.com/photo-1645371958635-88dd6c8e1be7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',4),(12,'Ensalada César',90.00,'https://images.unsplash.com/photo-1746211108786-ca20c8f80ecd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',7),(13,'Ensalada Griega',110.00,'https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?q=80&w=679&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',7),(14,'Pastel de Café',75.00,'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',6),(15,'Cheesecake Lotus',80.00,'https://images.unsplash.com/photo-1708175313856-8573b2bf8a3a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',6),(16,'Flan',60.00,'https://images.unsplash.com/photo-1702728109878-c61a98d80491?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Cocina',6),(17,'Limonada Natural',35.00,'https://images.unsplash.com/photo-1574689685526-a9281777ee89?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Barra',2),(18,'Jugo de Naranja',40.00,'https://images.unsplash.com/photo-1641659735894-45046caad624?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Barra',2),(19,'Café Americano',30.00,'https://images.unsplash.com/photo-1536227661368-deef57acf708?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Barra',2),(20,'Refresco',25.00,'https://i.pinimg.com/564x/82/78/54/82785454bff004d7a75f05fd712ea666.jpg','Barra',2);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan Pérez','Mesero'),(2,'Maria López','Caja'),(3,'Carlos Chef','Cocina'),(4,'Ana García','mesero'),(5,'Luis Martínez','mesero'),(6,'Sofia Rodríguez','mesero'),(7,'Miguel Torres','cajero'),(8,'Elena Castro','admin'),(9,'Roberto Díaz','cocina'),(10,'Carmen Reyes','cocina'),(11,'Jorge Mendoza','mesero'),(12,'Patricia Silva','cajero'),(13,'David Herrera','admin');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-30 19:59:11
