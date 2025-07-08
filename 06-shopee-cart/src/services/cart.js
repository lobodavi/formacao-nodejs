// adicionar item no carrinho
async function addItem(userCart,item){
    userCart.push(item);
}

// mostra os itens do carrinho
async function displayCart(userCart) {
    console.log("Cart List: \n");
    userCart.forEach((item,index) => {
        console.log(`${index + 1}. ${item.name} - R$ ${item.price} - ${item.quantity} un(s)`); 

    });
}
//deletar item
async function deleteItem(userCart,name) {
    const index = userCart.findIndex((item) => item.name === name);

    if(index !== -1){
        userCart.splice(index, 1);
        console.log(`\n ${name} foi removido.\n`)
    }
}

//remover item
async function removeItem(userCart, item) {
    const indexFound = userCart.findIndex((p) => p.name === item.name)
    
    if(indexFound == -1){
        console.log("Item nao encontrado.")
        return;
    }

    if(userCart[indexFound].quantity > 1){
        userCart[indexFound].quantity -= 1
       
        return;
    }

    if(userCart[indexFound].quantity == 1){
        userCart.splice(indexFound, 1)
        return;
    }
}
    

// calcular total
async function calculateTotal(userCart) {
   let result = 0;
   userCart.forEach((item) => {result = (item.price * item.quantity) + result})
   
   console.log(`\nTotal: ${result}`)
}

export {
    addItem,
    displayCart,
    deleteItem,
    removeItem,
    calculateTotal,
}
