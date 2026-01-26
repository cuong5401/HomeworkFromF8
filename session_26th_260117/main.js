/**********************************************************
 **************** Homework for january 17 ******************
 ***********************************************************/

// You are building an ordering feature.
// product has the form

// {
// id: number,
// name: string,
// price: number,
// remaining: number
// }

const products = [
    { id: 1, name: "ST25 Rice (5kg)", price: 180000, remaining: 20 },
    { id: 2, name: "Simply Cooking Oil (1L)", price: 65000, remaining: 15 },
    { id: 3, name: "Nam Ngu Fish Sauce (750ml)", price: 45000, remaining: 30 },
    { id: 4, name: "Vinamilk Fresh Milk (1L)", price: 38000, remaining: 25 },
    { id: 5, name: "Chicken Eggs (10)", price: 42000, remaining: 18 },
];

// Order có dạng:
// {
// id: number,
// productId: number,
// quantity: number
// }

const orders = [];

// Write a function `createOrder(productId, orderQuantity)`
// The order ID automatically increments (starting from 1)
// `productId` and `orderQuantity` must not be null
// If `productId` does not exist, throw an error "Product not found"
// Decrement `product.remaining` by `orderQuantity`

// Check if it is a positive integer
function isPositiveNumber(value) {
    return typeof value === "number" && !isNaN(value) && value > 0 && value - Math.floor(value) === 0;
}

// create local ID variable
const getNextId = (() => {
    let id = 0;
    return () => ++id;
})();

// Check if the stock quantity is sufficient and update it.
function deductStock(product, quantity) {
    const isStock = product.remaining >= quantity;
    if (isStock) product.remaining -= quantity;
    else console.error("out of stock");
    return isStock;
}

// Write a function `createOrder(productId, orderQuantity)`
function createOrder(productId, orderQuantity) {
    // input validation
    if (!isPositiveNumber(productId) || !isPositiveNumber(orderQuantity)) {
        console.error("Invalid input");
        return;
    }

    // Check if the product exists
    const product = products.find((product) => product.id === productId);
    if (!product) {
        console.error("Product not found");
        return;
    }

    // Check if the stock quantity is sufficient and update it.
    if (!deductStock(product, orderQuantity)) {
        return;
    }

    // Create order and assign it to the array
    const id = getNextId();
    const order = {
        id,
        productId,
        quantity: orderQuantity,
    };
    orders.push(order);
    return order;
}

console.log(createOrder(3, 10));
console.log(createOrder(3, 10));
console.log(createOrder(3, 9));
console.log(createOrder(3, 3));
console.log(createOrder(1, 3));
console.log(createOrder(2, 13));
console.log(createOrder(5, 30));
console.log(orders);
console.log(products);

// Write a function updateOrder(orderId, quantity)
// If the product's remaining stock is insufficient, log an "out of stock" error.
// Calculate the difference between the new and old remaining stock.
// If the quantity is increased but the inventory is insufficient, log an "out of stock" error.

function updateOrder(orderId, newQuantity) {
    // input validation
    if (!isPositiveNumber(orderId) || !isPositiveNumber(newQuantity)) {
        console.error("Invalid input");
        return;
    }

    // Check if the order exists
    const order = orders.find((order) => order.id === orderId);
    if (!order) {
        console.error("Update order not found");
        return;
    }

    // search for products
    const product = products.find((product) => product.id === order.productId);
    // check for changes
    const quantityChanges = newQuantity - order.quantity;

    // Check if the stock quantity is sufficient and update it.
    if (quantityChanges > 0) {
        if (!deductStock(product, quantityChanges)) {
            return;
        }
    } else product.remaining += -quantityChanges;

    // update new quantity
    order.quantity = newQuantity;
    console.log("Update successful");
}

updateOrder(1, 1);
console.log(products);
console.log(orders);

updateOrder(20, 19);
console.log(products);
console.log(orders);

// Write a function to deleteOrder(orderId)
// If orderId does not exist, throw an error "not found"
// If deleted successfully, return the product quantity to product.remaining

function deleteOrder(orderId) {
    // input validation
    if (!isPositiveNumber(orderId)) {
        console.error("Invalid input");
        return;
    }

    // Check if the order exists
    const orderIndex = orders.findIndex((order) => order.id === orderId);
    if (orderIndex === -1) {
        console.error("Delete order not found");
        return;
    }