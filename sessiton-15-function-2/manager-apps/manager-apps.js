// Array to store product names
let products = ["Sony Xperia", "Samsung Galaxy", "Nokia 6", "Xiaomi Redmi Note 4", "Apple iPhone 6S"];

// Hàm hiển thị sản phẩm
function displayProducts() {
    const tableBody = document.querySelector("#productTable tbody");
    const productCount = document.getElementById("productCount");

    // xóa bảng ban đầu
    tableBody.innerHTML = "";

    // tạo bảng
    products.forEach((product, index) => {
        const row = `
            <td>${product}</td>
            <td>
                <button class="edit" onclick="editProduct(${index})">Edit</button>
                <button class="delete" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;

        tableBody.innerHTML += row;
    });

    // cập nhật số sản phẩm
    productCount.textContent = `${products.length} products`;
}

// Hàm thêm mới sản phẩm
function addProduct() {
    const newProductInput = document.getElementById("newProduct");
    const newProductName = newProductInput.value.trim();

    if (newProductName === "") {
        alert("Please enter a product name.");
        return;
    }

    products.push(newProductName);
    newProductInput.value = "";
    displayProducts();
}

// Hàm chỉnh sửa tên sản phẩm
function editProduct(index) {
    const newName = prompt("Nhập tên sản phẩm mới:", products[index]);

    if ( newName.trim() !== "") {
        products[index] = newName.trim();
        displayProducts();
    }
}

// Hàm xóa sản phẩm
function deleteProduct(index) {
    if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
        products.splice(index, 1);
        displayProducts();
    }
}

// Thêm sự kiện khi click vào nút
document.getElementById("addButton").addEventListener("click", addProduct);

// load lại trang
displayProducts();
