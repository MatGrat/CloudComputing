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
    ProductImageURL VARCHAR(255)
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
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE IF NOT EXISTS ShopCarts (
    ShopCartID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    ProductID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductImageURL)
SELECT 'Gusseisen-Topf', 'Beschreibung von Produkt 1', 35.00, 'https://images.unsplash.com/photo-1521471109507-43d61bb345dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnJvdHxlbnwwfHwwfHx8MA='
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE ProductName = 'Gusseisen-Topf');

INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductImageURL)
SELECT '500g Gurken', 'Beschreibung von Produkt 2', 3.49, 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3Vya2V8ZW58MHx8MHx8fDA='
WHERE NOT EXISTS (SELECT 1 FROM Products WHERE ProductName = '500g Gurken');