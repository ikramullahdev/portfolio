const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99,
    image: "assets/headphones.jpg"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 149,
    image: "assets/smartwatch.jpg"
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 59,
    image: "assets/mouse.jpg"
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 89,
    image: "assets/speaker.jpg"
  },
  {
    id: 5,
    name: "Laptop Backpack",
    price: 79,
    image: "assets/backpack.jpg"
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: 129,
    image: "assets/keyboard.jpg"
  }
];

const container = document.getElementById("products");

function display(list) {

  container.innerHTML = "";

  list.forEach(product => {

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

display(products);

document.getElementById("search").addEventListener("keyup", function(e){

  const value = e.target.value.toLowerCase();

  const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value)
  );

  display(filtered);

});

function addToCart(id){

    const product = products.find(item => item.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));
  function addToCart(id){

    const product = products.find(item => item.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();   // 👈 Ye line yahan add karni hai

    showToast();

}

    alert(product.name + " added to cart!");

}
function updateCartCount(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = document.getElementById("cart-count");

    if(count){
        count.innerText = cart.length;
    }

}

function updateCartCount(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = document.getElementById("cart-count");

    if(count){
        count.innerText = cart.length;
    }

}

function updateCartCount(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = document.getElementById("cart-count");

    if(count){
        count.innerText = cart.length;
    }

}

updateCartCount();
function showToast(){

    const toast = document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}
