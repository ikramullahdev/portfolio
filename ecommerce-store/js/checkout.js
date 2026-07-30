// ================= CHECKOUT =================


const checkoutItems = document.getElementById("checkout-items");

const checkoutTotal = document.getElementById("checkout-total");



let cart = JSON.parse(localStorage.getItem("cart")) || [];




// ================= LOAD CHECKOUT =================


function loadCheckout(){


    if(!checkoutItems || !checkoutTotal) return;


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





    cart.forEach(item=>{


        let quantity = item.quantity || 1;



        total += item.price * quantity;



        checkoutItems.innerHTML += `


        <div class="checkout-product">


            <h3>
            ${item.name}
            </h3>


            <p>
            Quantity: ${quantity}
            </p>


            <p>
            Price: $${(item.price * quantity).toFixed(2)}
            </p>


        </div>


        `;



    });



    checkoutTotal.innerHTML =
    "$" + total.toFixed(2);



}




loadCheckout();





// ================= CREATE ORDER =================



const orderForm = document.getElementById("order-form");



if(orderForm){


orderForm.addEventListener("submit", function(e){


    e.preventDefault();




    let total = 0;



    cart.forEach(item=>{


        let quantity = item.quantity || 1;


        total += item.price * quantity;


    });






    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];





   const order = {


    id: "NS" + Date.now(),


    date: new Date().toLocaleDateString(),


    total: total.toFixed(2),


    status: "Processing",


    name:
    document.getElementById("customer-name").value,


    email:
    document.getElementById("customer-email").value,


    address:
    document.getElementById("customer-address").value,


    items: cart


};





    orders.push(order);





    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );







    alert("✅ Order placed successfully!");





    localStorage.removeItem("cart");





    window.location.href = "orders.html";



});


}
