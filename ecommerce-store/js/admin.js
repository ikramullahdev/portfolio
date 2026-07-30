// ================= ADMIN GLOBAL =================


const adminOrders =
document.getElementById("admin-orders");


let orders =
JSON.parse(localStorage.getItem("orders")) || [];


let filteredOrders = [...orders];


// Product variables

const addProductBtn =
document.getElementById("add-product-btn");


const updateProductBtn =
document.getElementById("update-product-btn");


let editProductId = null;



// ================= DISPLAY ORDERS =================


function displayOrders(){


if(!adminOrders) return;


adminOrders.innerHTML = "";



if(filteredOrders.length === 0){


adminOrders.innerHTML = `

<h3>
No orders available
</h3>

`;


return;


}



filteredOrders.forEach(order=>{


adminOrders.innerHTML += `


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
Status:
<b>${order.status}</b>
</p>

<p>
👤 Customer:
${order.name || "Guest Customer"}
</p>


<p>
📧 Email:
${order.email || "No Email"}
</p>


<p>
📦 Items:
${order.items ? order.items.length : 0}
</p>

<select class="order-status-select"
<select onchange="updateStatus('${order.id}',this.value)">


<option value="Processing"
${order.status === "Processing" ? "selected" : ""}>
Processing
</option>


<option value="Shipped"
${order.status === "Shipped" ? "selected" : ""}>
Shipped
</option>


<option value="Delivered"
${order.status === "Delivered" ? "selected" : ""}>
Delivered
</option>


</select>



<button onclick="deleteOrder('${order.id}')">
🗑 Delete Order
</button>


</div>


</div>


`;


});


}





// ================= UPDATE ORDER STATUS =================


function updateStatus(id,status){


orders =
orders.map(order=>{


if(order.id === id){

order.status = status;

}


return order;


});



localStorage.setItem(
"orders",
JSON.stringify(orders)
);



filteredOrders = [...orders];


displayOrders();


loadAnalytics();


}




displayOrders();





// ================= LOGOUT =================


function logout(){


localStorage.removeItem("adminLogin");


window.location.href =
"admin-login.html";


}





// ================= ANALYTICS =================


function loadAnalytics(){


let orders =
JSON.parse(localStorage.getItem("orders")) || [];


let products =
JSON.parse(localStorage.getItem("products")) || [];



let revenue = 0;



orders.forEach(order=>{


revenue += Number(order.total);


});



document.getElementById("total-orders").innerText =
orders.length;



document.getElementById("total-revenue").innerText =
"$" + revenue.toFixed(2);



document.getElementById("total-products").innerText =
products.length;



let customers =
new Set(
orders.map(order =>
order.email ||
order.name ||
order.id
)
);



document.getElementById("total-customers").innerText =
customers.size;


}



loadAnalytics();





// ================= ADD PRODUCT =================



if(addProductBtn){



addProductBtn.addEventListener("click",()=>{



let products =
JSON.parse(localStorage.getItem("products")) || [];



const preview =
document.getElementById("image-preview");



const product = {


id: Date.now(),


name:
document.getElementById("product-name").value,


price:
Number(
document.getElementById("product-price").value
),


image:
preview ? preview.src : "",



category:
document.getElementById("product-category").value


};



products.push(product);



localStorage.setItem(
"products",
JSON.stringify(products)
);



alert("Product Added Successfully");


displayAdminProducts();


loadAnalytics();


});


}
// ================= DISPLAY ADMIN PRODUCTS =================


function displayAdminProducts(){


const box =
document.getElementById("admin-products");



if(!box) return;



let products =
JSON.parse(localStorage.getItem("products")) || [];



box.innerHTML = "";



products.forEach(product=>{


box.innerHTML += `


<div class="product-card">


<div class="product-info">


<h3>
${product.name}
</h3>


<p>
Price: $${product.price}
</p>


<p>
Category: ${product.category}
</p>



<button onclick="editProduct(${product.id})">

Edit

</button>



<button onclick="deleteProduct(${product.id})">

Delete

</button>



</div>


</div>


`;



});


}





displayAdminProducts();





// ================= DELETE PRODUCT =================


function deleteProduct(id){


let confirmDelete =
confirm("Delete this product?");



if(!confirmDelete){

return;

}



let products =
JSON.parse(localStorage.getItem("products")) || [];



products =
products.filter(product=>product.id !== id);



localStorage.setItem(
"products",
JSON.stringify(products)
);



alert("Product Deleted Successfully");



displayAdminProducts();


loadAnalytics();


}





// ================= EDIT PRODUCT =================


function editProduct(id){



let products =
JSON.parse(localStorage.getItem("products")) || [];



let product =
products.find(
product=>product.id === id
);



if(product){



document.getElementById("product-name").value =
product.name;



document.getElementById("product-price").value =
product.price;



document.getElementById("product-category").value =
product.category;



editProductId = id;



if(addProductBtn){

addProductBtn.style.display =
"none";

}



if(updateProductBtn){

updateProductBtn.style.display =
"block";

}


}



}





// ================= UPDATE PRODUCT =================



if(updateProductBtn){



updateProductBtn.addEventListener("click",()=>{



let products =
JSON.parse(localStorage.getItem("products")) || [];



products =
products.map(product=>{



if(product.id === editProductId){



product.name =
document.getElementById("product-name").value;



product.price =
Number(
document.getElementById("product-price").value
);



product.category =
document.getElementById("product-category").value;



}



return product;



});



localStorage.setItem(
"products",
JSON.stringify(products)
);



alert("Product Updated Successfully");



displayAdminProducts();



addProductBtn.style.display =
"block";



updateProductBtn.style.display =
"none";



});



}





// ================= IMAGE PREVIEW =================



const imageInput =
document.getElementById("product-image");



const preview =
document.getElementById("image-preview");



if(imageInput){



imageInput.addEventListener("change",function(){



let file =
this.files[0];



if(file){



let reader =
new FileReader();



reader.onload=function(e){


preview.src =
e.target.result;


preview.style.display =
"block";


}



reader.readAsDataURL(file);



}



});


}
// ================= DELETE ORDER =================


function deleteOrder(id){


let confirmDelete =
confirm("Delete this order?");



if(!confirmDelete){

return;

}



orders =
orders.filter(
order=>order.id !== id
);



localStorage.setItem(
"orders",
JSON.stringify(orders)
);



filteredOrders = [...orders];


displayOrders();


loadAnalytics();


loadCustomers();


}





// ================= ORDER SEARCH FILTER =================



const orderSearch =
document.getElementById("order-search");



const orderFilter =
document.getElementById("order-status-filter");




function filterOrders(){



let searchValue =
orderSearch ?
orderSearch.value.toLowerCase()
:
"";



let status =
orderFilter ?
orderFilter.value
:
"all";




filteredOrders =
orders.filter(order=>{



let searchMatch =
order.id
.toString()
.includes(searchValue);



let statusMatch =
status === "all" ||
order.status === status;



return searchMatch && statusMatch;



});



displayOrders();



}





if(orderSearch){


orderSearch.addEventListener(
"keyup",
filterOrders
);


}




if(orderFilter){


orderFilter.addEventListener(
"change",
filterOrders
);


}



// ================= CUSTOMER MANAGEMENT =================


function loadCustomers(){


const customerList =
document.getElementById("customer-list");



if(!customerList) return;



let orders =
JSON.parse(localStorage.getItem("orders")) || [];



customerList.innerHTML = "";



if(orders.length === 0){


customerList.innerHTML = `

<tr>

<td colspan="5">

No Customers Available

</td>

</tr>

`;

return;

}



let customers = {};



orders.forEach(order=>{


let email =
order.email || "guest@customer.com";


let name =
order.name || "Guest Customer";



if(!customers[email]){


customers[email] = {

name:name,

email:email,

orders:0,

spent:0

};


}



customers[email].orders += 1;


customers[email].spent += Number(order.total);



});




Object.values(customers).forEach(customer=>{


customerList.innerHTML += `


<tr>

<td>
${customer.name}
</td>


<td>
${customer.email}
</td>


<td>
${customer.orders}
</td>


<td>
$${customer.spent.toFixed(2)}
</td>


<td>

<button onclick="viewCustomer('${customer.email}')">
View
</button>

</td>


</tr>


`;


});


}



loadCustomers();

// ================= VIEW CUSTOMER =================


function viewCustomer(email){


let orders =
JSON.parse(localStorage.getItem("orders")) || [];



let customerOrders =
orders.filter(order =>
(order.email || "guest@customer.com") === email
);



let box =
document.getElementById("customer-details");



if(!box) return;



if(customerOrders.length === 0){


box.innerHTML = `

<h3>
No Orders Found
</h3>

`;

return;

}



let customer =
customerOrders[0];



let totalSpent = 0;



customerOrders.forEach(order=>{


totalSpent += Number(order.total);


});




box.innerHTML = `


<div class="customer-profile">


<div class="profile-header">


<div class="avatar">

<i class="fa-solid fa-user"></i>

</div>



<div>


<h2>
${customer.name || "Customer"}
</h2>


<p>
${customer.email || "No Email"}
</p>


</div>


</div>





<div class="customer-info">


<div class="info-box">

<h4>
📞 Phone
</h4>

<p>
${customer.phone || "Not Available"}
</p>

</div>



<div class="info-box">

<h4>
📍 Address
</h4>

<p>
${customer.address || "Not Available"}
</p>

</div>



<div class="info-box">

<h4>
🛒 Orders
</h4>

<p>
${customerOrders.length}
</p>

</div>



<div class="info-box">

<h4>
💰 Spending
</h4>

<p>
$${totalSpent.toFixed(2)}
</p>

</div>


</div>




<button 
class="close-btn"
onclick="closeCustomerDetails()">

Close

</button>


<h2 class="history-title">

Order History

</h2>


</div>


`;






customerOrders.forEach(order=>{


let statusClass =
order.status.toLowerCase();



box.innerHTML += `


<div class="order-history-card">


<div class="order-top">


<h3>
🧾 ${order.id}
</h3>



<span class="status ${statusClass}">
${order.status}
</span>


</div>




<p>
📅 Date:
${order.date}
</p>



<p>
💰 Amount:
$${order.total}
</p>



<p>
📦 Items:
${order.items.length}
</p>




<button onclick="viewOrder('${order.id}')">

View Order

</button>



</div>


`;


});


}

// ================= VIEW ORDER DETAILS =================


function viewOrder(id){


let orders =
JSON.parse(localStorage.getItem("orders")) || [];



let order =
orders.find(order=>order.id === id);



let box =
document.getElementById("order-details");



if(!box) return;



if(!order){


box.innerHTML = `

<h3>
Order Not Found
</h3>

`;

return;

}



box.innerHTML = `


<div class="order-details-box">


<h2>
Order Details
</h2>


<p>
Order ID:
${order.id}
</p>


<p>
Date:
${order.date}
</p>


<p>
Status:
<b>
${order.status}
</b>
</p>



<h3>
Products
</h3>



</div>


`;





order.items.forEach(item=>{


box.innerHTML += `


<div class="product-card">


<img 
src="${item.image}"
width="80"
>



<h3>
${item.name}
</h3>


<p>
Quantity:
${item.quantity}
</p>


<p>
Price:
$${item.price}
</p>



</div>


`;



});



}
