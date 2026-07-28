// ================= CART COUNT =================

function updateCartCount(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = document.getElementById("cart-count");

    if(count){
        count.innerText = cart.length;
    }

}

updateCartCount();


// ================= FEATURED PRODUCTS =================

const featuredContainer = document.getElementById("products-container");


const featuredProducts = [

 {
  name:"Wireless Headphones",
  price:99,
  image:"assets/headphones.jpg"
 },

 {
  name:"Smart Watch",
  price:149,
  image:"assets/smartwatch.jpg"
 },

 {
  name:"Gaming Mouse",
  price:59,
  image:"assets/mouse.jpg"
 },

 {
  name:"Bluetooth Speaker",
  price:89,
  image:"assets/speaker.jpg"
 }

];



if(featuredContainer){

    featuredProducts.forEach(product=>{


        featuredContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">


            <div class="product-info">

                <h3>${product.name}</h3>


                <p class="price">
                    $${product.price}
                </p>


                <a href="products.html" class="btn">
                    View Products
                </a>


            </div>


        </div>

        `;


    });

}
