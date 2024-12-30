CREATE DATABASE homi_shoppi_db;
CREATE USER 'user' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON homi_shoppi_db.* TO 'user';
FLUSH PRIVILEGES;