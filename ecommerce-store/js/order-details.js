const container = document.getElementById("order-details");



const selectedOrder =
JSON.parse(localStorage.getItem("selectedOrder"));



if(selectedOrder){


container.innerHTML = `


<div class="product-card">


<div class="product-info">


<h3>
Order ID: ${selectedOrder.id}
</h3>


<p>
Date: ${selectedOrder.date}
</p>


<p>
Status: ${selectedOrder.status}
</p>


<h3>
Products
</h3>


${selectedOrder.items.map(item=>`

<p>
${item.name} x ${item.quantity || 1}
</p>

`).join("")}



<h2>
Total: $${selectedOrder.total}
</h2>



<button onclick="cancelOrder()"
class="wishlist-btn">

Cancel Order

</button>



</div>


</div>


`;



}





function cancelOrder(){


let orders =
JSON.parse(localStorage.getItem("orders")) || [];



orders = orders.filter(order=>

order.id !== selectedOrder.id

);



localStorage.setItem(
"orders",
JSON.stringify(orders)
);



alert("Order cancelled successfully");



window.location.href="orders.html";


}
// ================= ORDER TRACKING =================


const tracking =
document.getElementById("order-tracking");


if(tracking && selectedOrder){


let status = selectedOrder.status;



tracking.innerHTML = `


<div class="tracking-box">


<h2>
Order Tracking
</h2>



<div class="steps">


<div class="step active">

🟢

<p>
Processing
</p>

</div>



<div class="line"></div>



<div class="step ${status==="Shipped" || status==="Delivered" ? "active":""}">

📦

<p>
Shipped
</p>

</div>



<div class="line"></div>



<div class="step ${status==="Delivered" ? "active":""}">

✅

<p>
Delivered
</p>

</div>



</div>


</div>


`;



}
