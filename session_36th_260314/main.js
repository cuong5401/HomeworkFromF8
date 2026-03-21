// tạo cấu hình API
const proCallApi = axios.create({
    baseURL: "https://dummyjson.com/products/",
    timeout: 3000,
    headers: { "Content-Type": "application/json" },
});

// gọi các Elêmnt của HTML
const main = document.querySelector("#main");
const modal = document.querySelector("#modal");
const addProductBtn = document.querySelector("#add-product-btn");

const formETitle = document.querySelector("#formE-title");
const titleInput = document.querySelector("#titleEdit");
const contentInput = document.querySelector("#contentEdit");
const imgInput = document.querySelector("#imgEdit");

const submitBtn = document.querySelector("#submit-btn");
const cancelBtn = document.querySelector("#submit-cance-btn");

let products = [];
let editingId = null;

function getFormPayload() {
    const imageValue = imgInput.value.trim();

    return {
        title: titleInput.value.trim(),
        description: contentInput.value.trim(),
        images: imageValue ? [imageValue] : [],
    };
}

function closeModal() {
    modal.style.display = "none";
}

function openModalForCreate() {
    editingId = null;
    formETitle.textContent = "Tạo bài viết";
    submitBtn.textContent = "Tạo";
    titleInput.value = "";
    contentInput.value = "";
    imgInput.value = "";
    modal.style.display = "block";
}

function openModalForEdit(id) {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    editingId = id;
    formETitle.textContent = "Sửa bài viết";
    submitBtn.textContent = "Sửa";
    titleInput.value = product.title || "";
    contentInput.value = product.description || "";
    imgInput.value = product.images?.[0] || "";
    modal.style.display = "block";
}

// tạo Element con để đưa và main
function createProductItem(product) {
    const li = document.createElement("li");
    li.dataset.id = String(product.id);

    const image = document.createElement("img");
    image.src = product.images?.[0] || "";
    image.alt = product.title || "product-image";

    const title = document.createElement("h2");
    title.textContent = product.title;

    const detailBtn = document.createElement("button");
    detailBtn.textContent = "xem chi tiết";
    detailBtn.addEventListener("click", () => {
        localStorage.setItem("title", product.title || "");
        localStorage.setItem("content", product.description || "");
        window.location.href = "./product_detail.html";
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "sua noi dung";
    editBtn.addEventListener("click", () => openModalForEdit(product.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Xoa bai viet";
    deleteBtn.addEventListener("click", () => handleDeleteProduct(product.id));

    li.append(image, title, detailBtn, editBtn, deleteBtn);
    return li;
}

// sửa
function replaceProductItem(product) {
    const currentLi = document.querySelector(`[data-id="${product.id}"]`);
    if (!currentLi) return;

    const newLi = createProductItem(product);
    currentLi.replaceWith(newLi);
}

function renderProducts(list) {
    main.innerHTML = "";
    const fragment = document.createDocumentFragment();

    list.forEach((product) => {
        fragment.appendChild(createProductItem(product));
    });

    main.appendChild(fragment);
}

function handleDeleteProduct(id) {
    const isDelete = confirm("ban co muon xoa bai viet nay khong?");
    if (!isDelete) return;

    deleteAPI(id).then((deletedProduct) => {
        if (!deletedProduct) return;

        products = products.filter((product) => product.id !== id);
        const li = document.querySelector(`[data-id="${id}"]`);
        li?.remove();
    });
}

function handleSubmit() {
    const payload = getFormPayload();
    if (!payload.title || !payload.description) return;

    if (editingId !== null) {
        const productIndex = products.findIndex(
            (product) => product.id === editingId,
        );
        if (productIndex === -1) return;

        patchAPI(editingId, payload).then((updatedProduct) => {
            if (!updatedProduct) return;

            const mergedProduct = normalizeProduct(updatedProduct, {
                ...products[productIndex],
                ...payload,
                id: editingId,
            });

            products[productIndex] = mergedProduct;
            replaceProductItem(mergedProduct);
            closeModal();
        });

        return;
    }

    postAPI(payload).then((createdProduct) => {
        if (!createdProduct) return;

        const newProduct = normalizeProduct(createdProduct, payload);

        products.push(newProduct);
        main.appendChild(createProductItem(newProduct));
        closeModal();
    });
}

async function init() {
    const apiProducts = await getProducts();
    products = apiProducts.map((product) => normalizeProduct(product));
    renderProducts(products);
}

addProductBtn.addEventListener("click", openModalForCreate);
cancelBtn.addEventListener("click", closeModal);
submitBtn.addEventListener("click", handleSubmit);

init();

// các hàm làm việc với API
async function getProducts() {
    try {
        const response = await proCallApi.get("");
        return response.data?.products || [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function patchAPI(id, data) {
    try {
        const response = await proCallApi.patch(String(id), data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function postAPI(data) {
    try {
        const response = await proCallApi.post("add", data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function deleteAPI(id) {
    try {
        const response = await proCallApi.delete(String(id));
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
