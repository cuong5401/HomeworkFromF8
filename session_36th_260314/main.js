const proCallApi = axios.create({
    baseURL: "https://dummyjson.com/products",
    timeout: 1000,
    headers: { "Content-Type": "application/json" },
});
const main = document.querySelector("#main");
const addProduct = document.querySelector("#add-product-btn");

async function frintMain(path = "") {
    try {
        const fullData = await proCallApi.get(path);
        const products = fullData.data.products;

        products.forEach((product) => {
            const li = document.createElement("li");
            li.dataset.id = product.id;

            const image = document.createElement("img");
            image.src = product.images[0];

            const content = document.createElement("h2");
            content.innerText = product.title;

            const detailBtn = document.createElement("button");
            detailBtn.innerText = "xem chi tiết";

            li.appendChild(image);
            li.appendChild(content);
            li.appendChild(detailBtn);
            main.appendChild(li);
        });
    } catch (e) {
        console.log(e);
    }
}

addProduct.addEventListener("click", () => {
    const productTitle = prompt("Tiêu đề bài post");
});
frintMain();

// const newTab = window.open("page2.html");

// newTab.onload = () => {
//   newTab.postMessage({ name: "Tuan" }, "*");
// };
