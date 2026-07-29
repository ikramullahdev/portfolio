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

<div class="product-card">


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
