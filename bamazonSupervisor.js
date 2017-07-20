var mysql = require("mysql");
var inquirer = require("inquirer");
var Bamazon=require("./bamazon.js")

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "your username",
    password: "your password",
    database: "bamazon"
});


var bamazon=new Bamazon(connection);
bamazon.openConnection();

runSuperviser();


function runSuperviser() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Product Sales by Department",
        "Create New Department",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Product Sales by Department":
          bamazon.viewDepartmentSale(runSuperviser);
          break;
        case "Create New Department":
          newDepartmentPrompt();
          break;
        case "Exit":
          console.log("Have a nice day!");bamazon.closeConnection();
          break;
        }
    });
}

function newDepartmentPrompt(){
inquirer.prompt([
      {
        name: "departmentName",
        type: "input",
        message: "Enter dapartment name  you would like to add: ",
      },
      {
        name: "cost",
        type: "input",
        message: "Enter over head cost of the departmen you would like to add: ",
        validate: function(value) {
          if (isNaN(value) == false) 
            return true;
          return false;
         }
      }
      ]).then(function(answer){
            bamazon.addNewDepartment(answer.departmentName,answer.cost,runSuperviser);
      });
}
      