CREATE TABLE guiapress.categories (
   id INT NOT NULL AUTO_INCREMENT,
   title varchar(255) NOT NULL,
   slug varchar(255) NOT NULL,
   createdAt datetime NOT NULL,
   updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE guiapress.articles (
   id INT NOT NULL AUTO_INCREMENT,
   title varchar(255) NOT NULL,
   slug varchar(255) NOT NULL,
   body text NOT NULL,
   categoryId int NOT NULL REFERENCES guiapress.categories(id),
   createdAt datetime NOT NULL,
   updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE guiapress.users (
   id INT NOT NULL AUTO_INCREMENT,
   username varchar(255) NOT NULL,
   password varchar(255) NOT NULL,
   createdAt datetime NOT NULL,
   updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
);

