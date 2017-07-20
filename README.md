# bamazon

## Overview

Bamazon is an Amazon-like storefront with the MySQL. The app will take in orders from customers and deplete stock from the store's inventory.

## How It Works

 Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale

 ![List of products for sale](/images/products.png)

Then app  prompts users with two messages.
   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like

 ![Input questions](/images/input.png)

 Once the customer has placed the order,application checks if store has enough of the product to meet the customer's request .
   * if store does have enough of the product,it prints the total cost of purchase and updates its inventory.

   ![Total Price](/images/total.png)

   * If not, the app prints `Insufficient quantity!`



