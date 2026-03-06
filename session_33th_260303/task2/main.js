// Get required elements from the DOM
const productIdInput = document.getElementById("inId");
const orderButton = document.getElementById("orderBtn");
const messageElement = document.getElementById("message");
const orderingStatusElement = document.getElementById("isOdering");

// State variables to prevent duplicate orders while processing
let isOrderingInProgress;
let orderingMessageTimeout;

// Sample product list in stock
const products = [
    { productId: 1, name: "iPhone", price: 20000000, stock: 5 },
    { productId: 2, name: "Samsung Galaxy", price: 18000000, stock: 8 },
    { productId: 3, name: "Xiaomi 14", price: 15000000, stock: 12 },
    { productId: 4, name: "OPPO Reno", price: 11000000, stock: 7 },
    { productId: 5, name: "Vivo V30", price: 10500000, stock: 6 },
    { productId: 6, name: "Google Pixel", price: 17000000, stock: 4 },
    { productId: 7, name: "Nokia X", price: 7000000, stock: 10 },
    { productId: 8, name: "Realme GT", price: 9000000, stock: 0 },
    { productId: 9, name: "Sony Xperia", price: 16000000, stock: 3 },
    { productId: 10, name: "Asus ROG Phone", price: 22000000, stock: 2 },
];

orderButton.addEventListener("click", () => {
    // If an order is being processed, show a message and block new orders
    if (isOrderingInProgress) {
        orderingStatusElement.innerText = "Đang trong quá trình đặt hàng, vui lòng chờ kết thúc trước khi đặt hàng mới";
        if (!orderingMessageTimeout) {
            orderingMessageTimeout = setTimeout(() => {
                orderingStatusElement.innerText = "";
                orderingMessageTimeout = null;
            }, 1000);
        }
        return;
    }

    // Validate product ID input
    const productId = Number(productIdInput.value);
    if (!productId || isNaN(productId)) {
        messageElement.innerText = "Dạng Id không hợp lệ";
        return;
    }

    // Run order flow: get product -> process payment -> create order
    isOrderingInProgress = true;
    const orderFlowPromise = getProduct(productId);
    orderFlowPromise.then(processPayment).then(createOrder).then(successHandle).catch(errorHandle);
});

// Step 1: Check whether the product exists by productId
function getProduct(productId) {
    messageElement.innerText = "Kiểm tra sản phẩm hợp lệ không...";
    const matchedProduct = products.find((product) => product.productId === productId);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (matchedProduct) resolve(matchedProduct);
            else reject("Sản phẩm không tồn tại");
        }, 1000);
    });
}

// Step 2: Process payment and check stock
function processPayment(product) {
    messageElement.innerText = "sản phẩm hợp lệ \n Đang thanh toán...";
    const currentStock = product.stock;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (currentStock > 0) resolve({ ...product, stock: currentStock - 1 });
            else reject("Hết hàng");
        }, 1500);
    });
}

// Step 3: Create the order and update stock
function createOrder(product) {
    messageElement.innerText = "Thanh toán thành công! \n Đang tạo đơn hàng...";
    const productIndex = products.findIndex((existingProduct) => existingProduct.productId === product.productId);
    products[productIndex].stock = product.stock;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(product);
        }, 1000);
    });
}

// Handle success when the full order flow completes
function successHandle(product) {
    messageElement.innerText = `Đã đặt thành công 1 chiếc ${product.name}`;
    console.log(product);
    isOrderingInProgress = false;
}

// Handle errors from any step in the Promise flow
function errorHandle(error) {
    messageElement.innerText = error;
    isOrderingInProgress = false;
}
