////// Homework for january 13 ////////////
////////////////////////////////////////////

// task 1: You are building a sales revenue tracking function by product for a sales system.
// The data is divided into:
// Product list
// Order list
// Each order can contain multiple products.

// The data is in the following format:

const products = [
    { id: 1, name: 'iPhone', price: 2000 },
    { id: 2, name: 'Samsung', price: 1500 },
    { id: 3, name: 'Xiaomi', price: 1000 },
    { id: 4, name: 'Oppo', price: 1200 }
];

const orders = [
    {
        id: 1,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ]
    },
    {
        id: 2,
        items: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 3 }
        ]
    },
    {
        id: 3,
        items: [
            { productId: 2, quantity: 2 },
            { productId: 4, quantity: 1 }
        ]
    }
];

// The requirement is to write a function to find the product with the highest revenue.
function getHighestRevenueProduct() {
    let highestRevenue = 0;
    let productNumOne = "";

    // Revenue for each product type.
    for (order of orders) {
        for (item of order.items) {
            // In reality, IDs aren't ideal, so they need to be checked,
            // but here it's not necessary.
            const index = item.productId - 1;

            if (!products[index].revenue) {
                products[index].revenue = 0;
            }

            products[index].revenue += (products[index].price * item.quantity);
        }
    }

    // Find the product with the highest price.
    for (product of products) {
        if (product.revenue > highestRevenue) {
            highestRevenue = product.revenue;
            productNumOne = product.name;
        }
    }
    return productNumOne;
}

console.log(getHighestRevenueProduct());
