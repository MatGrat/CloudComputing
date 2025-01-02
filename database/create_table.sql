USE hsdb;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(5, 2),
    image_url VARCHAR(255)
);

INSERT INTO products (name, description, price, image_url)
VALUES 
('Gusseisen-Topf', 'Beschreibung von Produkt 1', 35.00, 'https://images.unsplash.com/photo-1521471109507-43d61bb345dd?
w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N
nx8YnJvdHxlbnwwfHwwfHx8MA='),
('500g Gurken', 'Beschreibung von Produkt 2', 3.49, 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?
w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8O
Hx8Z3Vya2V8ZW58MHx8MHx8fDA=');