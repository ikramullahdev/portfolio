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

                <button
                class="btn quick-view"
                onclick='openProduct(${JSON.stringify(product)})'>
                Quick View
                </button>


 



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
// ================= QUICK VIEW + CART =================

let selectedProduct = null;


function openProduct(product){


selectedProduct = product;


document.getElementById("modal-image").src =
product.image;


document.getElementById("modal-name").innerText =
product.name;


document.getElementById("modal-price").innerText =
"$" + product.price;


modal.style.display="flex";


}



// ADD TO CART FROM MODAL

const modalCart =
document.getElementById("modal-cart");


if(modalCart){


modalCart.onclick=function(){


let cart =
JSON.parse(localStorage.getItem("cart")) || [];



cart.push({

name:selectedProduct.name,

price:selectedProduct.price,

image:selectedProduct.image,

quantity:1

});



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



alert("Product added to cart 🛒");



modal.style.display="none";



if(typeof updateCartCount === "function"){

updateCartCount();

}


};


}

// CLOSE MODAL OUTSIDE CLICK

window.onclick=function(e){

    const modal =
    document.getElementById("product-modal");


    if(e.target === modal){

        modal.style.display="none";

    }

}
// ================= USER SESSION =================

function loadUserSession(){

    const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

    const loginLink =
    document.getElementById("login-link");

    const profileBox =
    document.getElementById("user-profile");

    if(currentUser){

        if(loginLink){

            loginLink.style.display = "none";

        }

        if(profileBox){

            profileBox.innerHTML = `

            <span class="user-name">

            👋 ${currentUser.name}

            </span>

            <button
            onclick="userLogout()"
            class="logout-btn">

            Logout

            </button>

            `;

        }

    }

}

loadUserSession();
