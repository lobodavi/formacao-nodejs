import createItem from "./services/item.js";
import * as cartService from "./services/cart.js"

const myCart = [];


console.log("Welcome! \n");
const item1 = await createItem("hot wheels ferrari", 20.90,1);
const item2 = await createItem("hot wheels lamborghini", 30.00,3);
const item3 = await createItem("hot wheels aston martin", 10.00,2);

await cartService.addItem(myCart,item1);
await cartService.addItem(myCart,item2);
await cartService.addItem(myCart,item3);


await cartService.displayCart(myCart);


await cartService.removeItem(myCart,item2);
await cartService.deleteItem(myCart,"hot wheels aston martin");

await cartService.displayCart(myCart);
await cartService.calculateTotal(myCart);




