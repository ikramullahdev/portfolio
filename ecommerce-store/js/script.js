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
function updateWishlistCount(){

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const count = document.getElementById("wishlist-count");

    if(count){

        count.innerText = wishlist.length;

    }

}

updateWishlistCount();
// ================= MOBILE MENU =================

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");


if(menuToggle && nav){

    menuToggle.addEventListener("click",()=>{

        nav.classList.toggle("active");

    });

}
// ================= DARK MODE =================

const themeToggle = document.getElementById("theme-toggle");


if(themeToggle){

    const savedTheme = localStorage.getItem("theme");


    if(savedTheme === "dark"){

        document.body.classList.add("dark");

        themeToggle.classList.remove("fa-moon");

        themeToggle.classList.add("fa-sun");

    }


    themeToggle.addEventListener("click",()=>{


        document.body.classList.toggle("dark");


        if(document.body.classList.contains("dark")){

            localStorage.setItem("theme","dark");

            themeToggle.classList.remove("fa-moon");

            themeToggle.classList.add("fa-sun");

        }

        else{

            localStorage.setItem("theme","light");

            themeToggle.classList.remove("fa-sun");

            themeToggle.classList.add("fa-moon");

        }


    });

}
// ================= SCROLL ANIMATION =================


const cards =
document.querySelectorAll(".product-card");



const observer =
new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.style.opacity="1";

}


});


});



cards.forEach(card=>{

observer.observe(card);

});
// ================= HERO TYPING =================

let heroText = "Discover Amazing Products";

let heroIndex = 0;


function heroTyping(){

    const box = document.getElementById("hero-text");


    if(!box) return;


    if(heroIndex < heroText.length){

        box.innerHTML += heroText[heroIndex];

        heroIndex++;

        setTimeout(heroTyping,80);

    }

}


heroTyping();
