
module.exports=Bamazon;

function Bamazon(dbConnection){
	this.connection=dbConnection;

	this.openConnection=function(){
           this.connection.connect(function(err) {
           if (err) throw err;
           });
	}

	this.closeConnection=function(){
           this.connection.end();
	}

	this.listProducts=function(callback){		   
           var query = "SELECT item_id, product_name, price FROM products";
           this.connection.query(query,function(err,res){
               if(err) throw err;

               for(i=0;i<res.length;i++)
               	console.log("id: "+res[i].item_id+" || "+"PRODUCT: "+res[i].product_name+" || "+"PRICE: $"+res[i].price);
				callback();
          });
	}
	this.placeOrder=function(item_id,quantity,callback){
        var updateCon=this.connection;
		var queryRead = "SELECT  product_name,price,stock_quantity FROM products WHERE item_id=?";
		this.connection.query(queryRead,[item_id],function(err,res){
              if(err) throw err;
              
			  if(res.length>0){
				  if(quantity>res[0].stock_quantity){
					  console.log("Insufficient quantity!");
					  callback();
				  }
				  else
				  {
                      var balanceQuantity=parseInt(res[0].stock_quantity)-quantity;
					  var totalPrice=res[0].price*quantity
                      var query="UPDATE products SET stock_quantity=?,product_sales=product_sales+? WHERE item_id=?"
		              updateCon.query(query,[balanceQuantity,totalPrice,item_id],function(updateerr,updateres){
                      if(updateerr) throw updateerr;
                      console.log("Your Total Purchasing is: $"+(totalPrice));
					  callback();
		            });
				  }
			  }else{console.log("Item not find"); callback();}

		});
      
	}

	this.listProductsMng=function(callback){		   
           var query = "SELECT item_id, product_name, price,stock_quantity FROM products";
           this.connection.query(query,function(err,res){
               if(err) throw err;

               for(i=0;i<res.length;i++)
               	console.log("id: "+res[i].item_id+" || PRODUCT: "+res[i].product_name+" || PRICE: $"+res[i].price+" || QUANTITY: "+res[i].stock_quantity);
				callback();
          });
	}

	this.viewLowInventory=function(callback){		   
           var query = "SELECT item_id, product_name,stock_quantity FROM products where stock_quantity<5";
           this.connection.query(query,function(err,res){
               if(err) throw err;

               for(i=0;i<res.length;i++)
               	console.log("id: "+res[i].item_id+" || "+"PRODUCT: "+res[i].product_name+" || "+"quantity: "+res[i].stock_quantity);
				callback();
          });
	}
	this.addInventory=function(item_id,addedQty,callback){		   
           var query = "UPDATE products SET  stock_quantity=stock_quantity+? WHERE item_id=?";
           this.connection.query(query,[addedQty,item_id],function(err,res){
               if(err) throw err;
               
			   console.log(res);
				callback();
          });
	}
	this.addNewProduct=function(name,depName,price,qty,callback){	
		   var values={
			   product_name:name,
			   department_name:depName,
			   price:price,
			   stock_quantity:qty
		   }	   
           var query = "INSERT INTO products SET ? ";
           this.connection.query(query,values,function(err,res){
               if(err) throw err;
               
			   console.log(res);
				callback();
          });
	}

	this.viewDepartmentSale=function(callback){		   
           var query = "select d.department_id, d.department_name,d.over_head_costs as cost,sum(p.product_sales) as sale,sum(p.product_sales)-d.over_head_costs as total_profit"+
                       " from products p inner join departments d on p.department_name=d.department_name"+
                       " group by d.department_id, d.department_name,d.over_head_costs;";
           this.connection.query(query,function(err,res){
               if(err) throw err;
               
			    for(i=0;i<res.length;i++)
               	console.log("id: "+res[i].department_id+" || DEPARTMENT: "+res[i].department_name+" || OVER HEAD COSTS: $"+res[i].cost+
				            " || PRODUCT SALES: "+res[i].sale+" || TOTAL PROFIT: "+res[i].total_profit);
				callback();

          });
	}
		this.addNewDepartment=function(depName,cost,callback){	
		   var values={
			   department_name:depName,
			   over_head_costs:cost
		   }	   
           var query = "INSERT INTO departments SET ? ";
           this.connection.query(query,values,function(err,res){
               if(err) throw err;
               
			   console.log(res);
				callback();
          });
	}
}