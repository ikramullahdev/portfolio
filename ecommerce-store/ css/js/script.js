const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99,
        image: "https://picsum.photos/400/400?random=1"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 149,
        image: "https://picsum.photos/400/400?random=2"
    },
    {
        id: 3,
        name: "Gaming Mouse",
        price: 59,
        image: "https://picsum.photos/400/400?random=3"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 89,
        image: "https://picsum.photos/400/400?random=4"
    }
];

const container = document.getElementById("products-container");

function displayProducts() {
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
        `;
    });
}

displayProducts();

function addToCart(id) {

    const product = products.find(item => item.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.name + " added to cart!");
}
