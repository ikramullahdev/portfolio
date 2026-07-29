const ordersContainer =
document.getElementById("orders-container");



const orders =
JSON.parse(localStorage.getItem("orders")) || [];



if(orders.length === 0){

    ordersContainer.innerHTML = `

    <h3>
    No orders found
    </h3>

    `;

}


else{


orders.forEach(order=>{


ordersContainer.innerHTML += `

<div class="product-card"
onclick="openOrder('${order.id}')">


<div class="product-info">


<h3>
Order ID: ${order.id}
</h3>


<p>
Date: ${order.date}
</p>


<p>
Total: $${order.total}
</p>


<p>
Status: ${order.status}
</p>


</div>


</div>

`;

});


}
function openOrder(id){

    const orders =
    JSON.parse(localStorage.getItem("orders")) || [];


    const order =
    orders.find(order=>order.id === id);


    localStorage.setItem(
        "selectedOrder",
        JSON.stringify(order)
    );


    window.location.href="order-details.html";

}
