var mysql = require("mysql");
var inquirer = require("inquirer");
var Bamazon=require("./bamazon.js")

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306  ,
    user: "your username",
    password: "your password",
    database: "bamazon"
});


var bamazon=new Bamazon(connection);
bamazon.openConnection();

bamazon.listProducts(getOrder);



function getOrder(){
inquirer.prompt([
          {
        name: "productId",
        type: "input",
        message: "Enter ID of the product you would like to buy: ",
        validate: function(value) {
          if (isNaN(value) == false) 
            return true;
          return false;
        }
      },
      {
        name: "qty",
        type: "input",
        message: " how many units of the product you would like to buy: ",
        validate: function(value) {
          if (isNaN(value) == false && value>0) 
            return true;
          return false;
        }
      },
]).then(function(answer){
    bamazon.placeOrder(answer.productId,answer.qty,newGetOrder);   
});

}



    function newGetOrder(){
      inquirer.prompt([{
        name:"newOrder",
        type:"confirm",
        message:"Would you like to place a new order? "
      }]).then(function(answer){
        if(answer.newOrder)
          bamazon.listProducts(getOrder);
        else{
          console.log("Thank You and have a nice day!");
          bamazon.closeConnection();
        }   
      });
      
    }