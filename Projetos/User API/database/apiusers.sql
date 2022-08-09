DROP TABLE IF EXISTS `passwordTokens`;

CREATE TABLE `passwordTokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(200) NOT NULL,
  `user_id` int NOT NULL,
  `used` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `passowordTokens_FK` (`user_id`),
  CONSTRAINT `passowordTokens_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

