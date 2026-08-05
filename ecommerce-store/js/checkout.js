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
    let invoices =
JSON.parse(localStorage.getItem("invoices")) || [];





  const order = {


    id: "NS" + Date.now(),


    date: new Date().toLocaleDateString(),


    total: total.toFixed(2),


    status: "Processing",


    name:
    document.getElementById("name").value,


    email:
    document.getElementById("email").value,


    address:
    document.getElementById("address").value,


    phone:
    document.getElementById("phone").value,


    items: cart



};




    orders.push(order);
    const invoice = {

    id: "INV-" + Date.now(),

    orderId: order.id,

    customer: order.name,

    email: order.email,

    phone: order.phone,

    address: order.address,

    amount: order.total,

    date: order.date,

    status: "Paid",

    items: order.items

};

invoices.push(invoice);





    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

localStorage.setItem(

    "invoices",

    JSON.stringify(invoices)

);





    alert("✅ Order placed successfully!");





    localStorage.removeItem("cart");





    window.location.href = "orders.html";



});


}
