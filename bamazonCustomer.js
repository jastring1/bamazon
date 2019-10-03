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
    displayProducts()
});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err
        for (var i = 0; i < results.length; i++) {
            var displayItem = "Item ID: " + results[i].item_id + "\nProduct: " + results[i].product_name +
                "\nDepartment: " + results[i].department_name + "\nPrice: $" + results[i].price + 
                "\n--------------------------------------------------------------------\n"
            console.log(displayItem)
        }
        promptUser()
    });

}
function promptUser() {
    inquirer.prompt([
        {
            name: "itemID",
            type: "input",
            message: "Please enter the ID of the product you wish to buy"
        },
        {
            name: "purchaseQuantity",
            type: "input",
            message: "How many units would you like to purchase?"
        }

    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE item_id=" + answer.itemID, function (err, results) {
            if (err) throw err
            if (answer.purchaseQuantity > results[0].stock_quantity) {
                console.log("Insufficient Quantity!")
                startOver()
            } else {
                let newQuantity = results[0].stock_quantity - answer.purchaseQuantity
                let salePrice = answer.purchaseQuantity * results[0].price
                console.log("\n\n----------------Placing Order----------------\n\n")
                console.log("You Purchased " + answer.purchaseQuantity + " " + results[0].product_name + " for a total price of $" + salePrice +"\n\n")
                updateBamazon(answer.itemID, newQuantity)
            }
        })

    })
}
function updateBamazon(id, quantity) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantity
            },
            {
                item_id: id
            }
        ],
        function (error) {
            if (error) throw err
            console.log("Inventory Updated!\n")
            startOver()
        })

}
function startOver() {
    inquirer.prompt([
        {
            name: "anotherPurchase",
            message: "Would you like to make another purchase?",
            type: "list",
            choices: ["yes", "no"]

        }
    ]).then(function (user) {
        user.anotherPurchase === "yes" ? displayProducts() : connection.end()
    })
}

