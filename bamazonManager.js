var inquirer = require("inquirer")
var mysql = require("mysql")

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err
    loadMenu()
});

function loadMenu() {
    inquirer.prompt([
        {
            name: "menuOption",
            type: "list",
            message: "Please select a function from the following menu:\n",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ]).then(function (user) {
        switch (user.menuOption) {
            case "View Products for Sale": displayProducts()
                break

            case "View Low Inventory": viewLowInventory()
                break

            case "Add to Inventory": addInventory()
                break

            case "Add New Product": addProduct()
                break

            default: connection.end()
        }
    })
}
function displayProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err
        for (var i = 0; i < results.length; i++) {
            var displayItem = "Item ID: " + results[i].item_id + "\nProduct: " + results[i].product_name +
                "\nDepartment: " + results[i].department_name + "\nPrice: $" + results[i].price +
                "\nStock Quantity: " + results[i].stock_quantity +
                "\n--------------------------------------------------------------------\n"
            console.log(displayItem)
        }
        loadMenu()
    })
}
function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 6", function (err, results) {
        if (err) throw err
        console.log("------------------------------\n" +
            "PRODUCTS WITH STOCK 5 OR LESS\n" +
            "------------------------------\n")
        for (var i = 0; i < results.length; i++) {
            var displayItem = "Item ID: " + results[i].item_id + "\nProduct: " + results[i].product_name +
                "\nDepartment: " + results[i].department_name + "\nPrice: $" + results[i].price +
                "\nStock Quantity: " + results[i].stock_quantity +
                "\n--------------------------------------------------------------------\n"
            console.log(displayItem)
        }
        loadMenu()
    })
}
function addInventory() {
    connection.query("SELECT item_id, product_name, stock_quantity FROM products", function (err, results) {
        if (err) throw err
        console.log("------------------------------\n" +
            "Stock Quantities [ID, NAME, QUANTITY]\n" +
            "------------------------------\n")
        for(var i=0;i<results.length;i++){
            var displayItem = "[" + results[i].item_id + "] [" + results[i].product_name + "] [" + results[i].stock_quantity +"]\n"
            console.log(displayItem)
        }
    })
    inquirer.prompt([
        {
            name: "Id",
            type: "input",
            message: "Enter ID number to add to Inventory: "
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter number of units to add: "

        }
    ]).then(function(user){
        /*connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: + user.quantity
                },
                {
                    item_id: user.Id
                }
            ],
            function (error) {
                if (error) throw err
                console.log("Inventory Updated!\n")
            })
        })*/
        loadMenu()
    })
}