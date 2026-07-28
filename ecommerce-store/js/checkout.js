const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");


let cart = JSON.parse(localStorage.getItem("cart")) || [];


function loadCheckout(){

    checkoutItems.innerHTML = "";

    let total = 0;


    if(cart.length === 0){

        checkoutItems.innerHTML = `
        <p>
        Your cart is empty 🛒
        </p>
        `;

        checkoutTotal.innerHTML = "$0";

        return;

    }


    cart.forEach(item => {


        total += item.price * item.quantity;


        checkoutItems.innerHTML += `

        <div class="checkout-product">

            <h3>
            ${item.name}
            </h3>

            <p>
            Quantity: ${item.quantity}
            </p>

            <p>
            Price: $${item.price * item.quantity}
            </p>

        </div>

        `;


    });


    checkoutTotal.innerHTML = "$" + total.toFixed(2);


}


loadCheckout();



const orderForm = document.getElementById("order-form");


orderForm.addEventListener("submit", function(e){

    e.preventDefault();


    alert("✅ Order placed successfully!");


    localStorage.removeItem("cart");


    window.location.href = "index.html";


});
