# Bamazon App

## Overview

In this activity, you'll be creating an Amazon-like storefront with the MySQL skills you learned this unit. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.


### Technologies Used

1. Javascipt
2. Node.js
3. MySQL

### NPM packages

1. Inquirer
2. MySQl

## Instructions

1. SQL Files
  * schema.sql - contains the database and tables schemas to set up a MySQL Database, I have used MySql Worbench to achieve this.
  ![schema image](/images/schema.jpg)
  * seeds.sql - contains the seeds to be added to the database to get this databse loaded with informations
  
2. This application has two different programs that can be used 
  * bamazonCustomer.js
    * As a Bamazon Customer, this interface will allow you to see the available products in our database.
  * bamazonManager.js
    * As a Bamazon Manager, this interface will allow you to check and update inventory, and allow you to add new products to the database
    
 ## Bamazon Customer
 
 1. Run bamazonCustomer.js through the command prompt in a node environment by using: "node bamazonCustomer.js"
 2. Once Loaded - A list of products will be diplayed to your console with this information:
  * Item ID
  * Product Name
  * Department Name
  * Price
 3. The program will then prompt the user for the corresponding ID for which item they would like to purchase
 4. Next, the program will prompt the user for the quantity of units they would like to purchase
 5. Once the user has entered this information, the program will check the databse to see if there is enough stock the fulfill this order
  * If there is not enough stock, the program will alert the user that the store has Insufficient Quantity to complete the order
  * If there is enough, the program will alert the user of the total cost of the purchase, and then update the database to reflect the transaction
 6. Finally, the program will prompt the user to see if they would like to make another purchase
 
 ## Bamazon Manager
 
 1. Run bamazonManager.js throught the command prompt in a node environment using: "node bamazonManager.js"
 2. Once Loaded - A list of options will be displayed to the user
 * Display Products
    * This will display all of the products available showing their name, department, price, and quantity on hand
 * View Low Inventory
    * This function will query the database and return a list of products whose stock quantity is 5 or less
 * Add Inventory
    * This function allows the user to add stock to any product by their corresponding ID, this will update the database to reflect the changes
 * Add Product
    * This function allows the user to add a new product to the databse by following a series of prompts
 3. Once a function has been completed, the user will be returned to the main menu where they may select another menu option, or exit the program.
