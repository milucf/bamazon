CREATE DATABASE bamazon;

USE bamazon ;


CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INTEGER,
    product_sales DECIMAL(10,2),
    PRIMARY KEY(item_id)
);


CREATE TABLE departments (
    department_id INTEGER AUTO_INCREMENT,
    department_name VARCHAR(50),
    over_head_costs DECIMAL(10,2),
    PRIMARY KEY(department_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity,product_sales)
VALUES( 'PlayStation','Electronics',349,34,40000 ),
('Star Wars DVD','Movies',30,4,1000),
('iPad','Electronics',500,21,2000),
('Harry Potter Collection','books',66,5,800),
('Classic Lego','Toys',27,3,1000),
('iPhone','Electronics',820,30,60000),
('Soccer Ball','Sports',8,12,500),
('Artist Color Oil Paint','Art',18,2,900),
('Teddy Bear','Toys',15,7,200),
('tv 24inch','Electronics',180,15,3000);

INSERT INTO departments (department_name,over_head_costs)
VALUES( 'Electronics',30000 ),
('books',400),
('Movies',8000),
('Art',400),
('Toys',1000),
('Sports',5000)