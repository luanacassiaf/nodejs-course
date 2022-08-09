DROP TABLE IF EXISTS `estudios`;

CREATE TABLE `estudios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `games`;

CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `preco` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `games_estudios`;

CREATE TABLE `games_estudios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_id` int NOT NULL,
  `estudio_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `games_estudios_FK` (`game_id`),
  KEY `games_estudios_FK_1` (`estudio_id`),
  CONSTRAINT `games_estudios_FK` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `games_estudios_FK_1` FOREIGN KEY (`estudio_id`) REFERENCES `estudios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

