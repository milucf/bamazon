var mysql = require("mysql");
var inquirer = require("inquirer");
var Bamazon=require("./bamazon.js")

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "your usermane",
    password: "your password",
    database: "bamazon"
});


var bamazon=new Bamazon(connection);
bamazon.openConnection();

runManager();

function runManager() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          bamazon.listProductsMng(runManager);
          break;

        case "View Low Inventory":
           bamazon.viewLowInventory(runManager);
          break;

        case "Add to Inventory":
          bamazon.listProductsMng(addInventoryPrompt);
          break;

        case "dd New Product":
          newProductPrompt();
          break;
        case "Exit":
          console.log("Have a nice day!");bamazon.closeConnection();
          break;
      }
    });
}


function addInventoryPrompt(){
inquirer.prompt([
          {
        name: "productId",
        type: "input",
        message: "Enter ID of the product you would like to add more item: ",
        validate: function(value) {
          if (isNaN(value) == false) 
            return true;
          return false;
        }
      },
      {
        name: "qty",
        type: "input",
        message: " how many units of the product you would like to add: ",
        validate: function(value) {
          if (isNaN(value) == false && value>0) 
            return true;
          return false;
        }
      }
]).then(function(answer){
    bamazon.addInventory(answer.productId,answer.qty,runManager);   
});
}

function newProductPrompt(){
inquirer.prompt([
          {
        name: "productName",
        type: "input",
        message: "Enter name of the product you would like to add: ",
      },
      {
        name: "departmentName",
        type: "input",
        message: "Enter dapartment name of the product you would like to add: ",
      },
      {
        name: "price",
        type: "input",
        message: "Enter price of the product you would like to add: ",
        validate: function(value) {
          if (isNaN(value) == false && value>0) 
            return true;
          return false;
        }
      },
      {
        name: "qty",
        type: "input",
        message: "how much of the product is available: ",
        validate: function(value) {
          if (isNaN(value) == false && value>0) 
            return true;
          return false;
        }
      }
]).then(function(answer){
    bamazon.addNewProduct(answer.productName,answer.departmentName,answer.price,answer.qty,runManager);   
});
}