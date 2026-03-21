const main = document.querySelector("#main");
const cart = document.querySelector("#cart");
const quantity = document.querySelector("#quantity");
const cartListPrint = document.querySelector("#cart-list-print");
const cartListClear = document.querySelector("#cart-list-clear");

let products = [];

// gọi và render cart đã lưu nếu có
let cartlist = JSON.parse(sessionStorage.getItem("cart")) || [];
cartlist.forEach((product) => renderCart(product.title));

// gọi API để render ra màn hình
fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
        products = data.products || [];
        renderProducts(products);
    })
    .catch((error) => {
        console.log(error);
        main.textContent = " Không thể tải danh sách sản phẩm.";
    });

function renderProducts(products) {
    main.innerHTML = "";

    products.forEach((product) => {
        const card = document.createElement("li");

        const image = document.createElement("img");
        image.src = product.thumbnail || product.images?.[0] || "";
        image.alt = product.title || "product-image";

        const title = document.createElement("h2");
        title.textContent = product.title || "Khong co ten";

        const price = document.createElement("p");
        price.textContent = `Gia: $${product.price ?? 0}`;

        const stock = document.createElement("p");
        stock.textContent = `Stock: ${product.stock ?? 0}`;

        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Them vao gio hang";
        addToCartBtn.addEventListener("click", () => {
            // thêm dữ liệu vào thẻ cart
            cartlist.push(product);
            sessionStorage.setItem("cart", JSON.stringify(cartlist));
            renderCart(product.title);
        });

        card.append(image, title, price, stock, addToCartBtn);
        main.appendChild(card);
    });
}

// add thêm vào cart trên màn hình
function renderCart(cartName) {
    quantity.textContent = cartlist.length !== 0 ? cartlist.length : "0";
    let li = document.createElement("li");
    li.textContent = cartName;
    cartListPrint.append(li);
}

// xóa hết
cartListClear.addEventListener("click", () => {
    cartlist = [];
    quantity.textContent = "0";
    sessionStorage.removeItem("cart");
    cartListPrint.textContent = "";
});
