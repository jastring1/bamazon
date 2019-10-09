CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT(11) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price FLOAT NOT NULL,
stock_quantity INT(10) DEFAULT 0,
PRIMARY KEY (item_id)
);