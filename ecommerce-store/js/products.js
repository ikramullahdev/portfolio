let products = [
 {
  id: 1,
  name: "Wireless Headphones",
  price: 99,
  image: "assets/headphones.jpg",
  rating: 4.8,
  stock: true,
  category: "Electronics",
  description: "Premium wireless headphones with active noise cancellation and 40-hour battery life."
 },
 {
  id: 2,
  name: "Smart Watch",
  price: 149,
  image: "assets/smartwatch.jpg",
  rating: 4.7,
  stock: true,
  category: "Electronics",
  description: "Smart watch with fitness tracking, notifications and health monitoring features."
 },
 {
  id: 3,
  name: "Gaming Mouse",
  price: 59,
  image: "assets/mouse.jpg",
  rating: 4.6,
  stock: true,
  category: "Gaming",
  description: "High precision gaming mouse with fast response and comfortable design."
 },
 {
  id: 4,
  name: "Bluetooth Speaker",
  price: 89,
  image: "assets/speaker.jpg",
  rating: 4.8,
  stock: true,
  category: "Electronics",
  description: "Portable Bluetooth speaker with powerful sound and long battery life."
 },
 {
  id: 5,
  name: "Laptop Backpack",
  price: 79,
  image: "assets/backpack.jpg",
  rating: 4.5,
  stock: true,
  category: "Accessories",
  description: "Durable laptop backpack with multiple storage compartments."
 },
 {
  id: 6,
  name: "Mechanical Keyboard",
  price: 129,
  image: "assets/keyboard.jpg",
  rating: 4.9,
  stock: true,
  category: "Gaming",
  description: "Mechanical keyboard with RGB lighting and premium switches."
 }
];

// ================= ADMIN PRODUCTS =================


const adminProducts =
JSON.parse(localStorage.getItem("products")) || [];



products = [

    ...products,

    ...adminProducts

];
const container = document.getElementById("products");

function display(list){

    if(!container) return;

    container.innerHTML = "";

    list.forEach(product => {

        container.innerHTML += `

        <div class="product-card" onclick="openProduct(${product.id})">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="price">$${product.price}</p>

                <button onclick="event.stopPropagation(); addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>

        </div>

        `;

    });

}

display(products);

// ================= SEARCH =================

const search = document.getElementById("search");

if(search){

    search.addEventListener("keyup", function(e){

        const value = e.target.value.toLowerCase();

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(value)
        );

        display(filtered);

    });

}

// ================= SORT =================

const sort = document.getElementById("sort");

if(sort){

    sort.addEventListener("change", function(){

        let sorted = [...products];

        if(this.value === "low"){
            sorted.sort((a,b) => a.price - b.price);
        }

        else if(this.value === "high"){
            sorted.sort((a,b) => b.price - a.price);
        }

        else if(this.value === "name"){
            sorted.sort((a,b) => a.name.localeCompare(b.name));
        }

        display(sorted);

    });

}
// ================= CATEGORY FILTER =================

const categoryButtons = document.querySelectorAll(".category-btn");


categoryButtons.forEach(button => {

    button.addEventListener("click", function(){

        const category = this.dataset.category;


        if(category === "all"){

            display(products);

        }

        else{

            const filtered = products.filter(product =>
                product.category === category
            );

            display(filtered);

        }

    });

});
// ================= CART =================

function addToCart(id){

    const product = products.find(item => item.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    showToast();

}

function updateCartCount(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = document.getElementById("cart-count");

    if(count){
        count.innerText = cart.length;
    }

}

updateCartCount();

// ================= TOAST =================

function showToast(){

    const toast = document.getElementById("toast");

    if(toast){

        toast.classList.add("show");

        setTimeout(()=>{

            toast.classList.remove("show");

        },2000);

    }

}

// ================= PRODUCT PAGE =================

function openProduct(id){

    const product = products.find(item => item.id === id);

    localStorage.setItem(
        "selectedProduct",
        JSON.stringify(product)
    );

    window.location.href = "product.html";

}
