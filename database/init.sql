CREATE DATABASE IF NOT EXISTS hsdb;
CREATE USER IF NOT EXISTS 'user' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON hsdb.* TO 'user';
FLUSH PRIVILEGES;

USE hsdb;

CREATE TABLE IF NOT EXISTS Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    ProductDescription TEXT,
    ProductPrice DECIMAL(5, 2),
    ProductImageURL VARCHAR(255),
    ProductInventory INT NOT NULL,
    ProductDeliveryDays INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(255) NOT NULL,
    UserMail VARCHAR(255) NOT NULL,
    UserFirstName VARCHAR(255) NOT NULL,
    UserLastName VARCHAR(255) NOT NULL,
    UserPassword VARCHAR(255) NOT NULL,
    UserStreet VARCHAR(255) NOT NULL,
    UserCity VARCHAR(255) NOT NULL,
    UserPostalCode VARCHAR(20) NOT NULL,
    UserIBAN VARCHAR(22)
);

CREATE TABLE IF NOT EXISTS Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ProductID INT NOT NULL,
    OrderQuantity INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE IF NOT EXISTS ShopCarts (
    ShopCartID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ProductID INT NOT NULL,
    OrderQuantity INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductImageURL, ProductInventory, ProductDeliveryDays)
SELECT 'Gusseisen-Topf', 'Beschreibung von Produkt 1', 35.00, 'https://images.unsplash.com/photo-1521471109507-43d61bb345dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnJvdHxlbnwwfHwwfHx8MA=', 10, 2
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE ProductName = 'Gusseisen-Topf');

INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductImageURL, ProductInventory, ProductDeliveryDays)
SELECT '400g Tomaten', 'Beschreibung von Produkt 2', 2.99, 'https://images.unsplash.com/photo-1444731961956-751ed90465a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRvbWF0ZXxlbnwwfHwwfHx8MA==', 12, 3
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE ProductName = '400g Tomaten');

INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductImageURL, ProductInventory, ProductDeliveryDays)
SELECT '500g Gurken', 'Beschreibung von Produkt 3', 3.49, 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3Vya2V8ZW58MHx8MHx8fDA=', 7, 2
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE ProductName = '500g Gurken');

INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductImageURL, ProductInventory, ProductDeliveryDays)
SELECT 'Hocker', 'Beschreibung von Produkt 4', 19.99, 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1aGx8ZW58MHx8MHx8fDA=', 5, 4
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE ProductName = 'Hocker');

INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductImageURL, ProductInventory, ProductDeliveryDays)
SELECT 'Kopfhörer', 'Beschreibung von Produkt 5', 39.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8S29wZmglQzMlQjZyZXJ8ZW58MHx8MHx8fDA=', 25, 2
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE ProductName = 'Kopfhörer');

INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductImageURL, ProductInventory, ProductDeliveryDays)
SELECT 'PC-Maus', 'Beschreibung von Produkt 6', 19.99, 'https://images.unsplash.com/photo-1656457538054-b5c0d11d895d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fENvbXB1dGVyJTIwbWF1c3xlbnwwfHwwfHx8MA==', 18, 1
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE ProductName = 'PC-Maus');

INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductImageURL, ProductInventory, ProductDeliveryDays)
SELECT 'Schere', 'Beschreibung von Produkt 7', 15.99, 'https://images.unsplash.com/photo-1668853060231-210c26cadebb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fFNjaGVyZXxlbnwwfHwwfHx8MA==', 9, 2
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE ProductName = 'Schere');

INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductImageURL, ProductInventory, ProductDeliveryDays)
SELECT '100g Käse', 'Beschreibung von Produkt 8', 3.99, 'https://images.unsplash.com/photo-1668104129962-66e931ec9a61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fEslQzMlQTRzZXxlbnwwfHwwfHx8MA==', 6, 6
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE ProductName = '100g Käse');