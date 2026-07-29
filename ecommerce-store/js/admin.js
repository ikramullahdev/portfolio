const adminOrders =
document.getElementById("admin-orders");



let orders =
JSON.parse(localStorage.getItem("orders")) || [];

let filteredOrders = [...orders];


function displayOrders(){


    adminOrders.innerHTML = "";



    if(orders.length === 0){


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



        <button onclick="updateStatus('${order.id}','Processing')">
        📦 Processing
        </button>


        <button onclick="updateStatus('${order.id}','Shipped')">
        🚚 Shipped
        </button>


        <button onclick="updateStatus('${order.id}','Delivered')">
        ✅ Delivered
        </button>


        <button onclick="deleteOrder('${order.id}')">

🗑 Delete Order

</button>



        </div>


        </div>


        `;


    });


}



function updateStatus(id,status){


    orders = orders.map(order=>{


        if(order.id === id){

            order.status = status;

        }


        return order;


    });



    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );



    displayOrders();


}



displayOrders();

function logout(){

    localStorage.removeItem("adminLogin");

    window.location.href="admin-login.html";

}
// ================= ADMIN ANALYTICS =================


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
products.length || 6;



document.getElementById("total-customers").innerText =
orders.length;



}



loadAnalytics();
// ================= PRODUCT MANAGEMENT =================


const addProductBtn =
document.getElementById("add-product-btn");



if(addProductBtn){


addProductBtn.addEventListener("click",()=>{


let products =
JSON.parse(localStorage.getItem("products")) || [];

const updateProductBtn =
document.getElementById("update-product-btn");


let editProductId = null;

const product = {


id: Date.now(),


name:
document.getElementById("product-name").value,


price:
Number(document.getElementById("product-price").value),


image:
preview.src,


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



});


}




function displayAdminProducts(){


const box =
document.getElementById("admin-products");



if(!box) return;



let products =
JSON.parse(localStorage.getItem("products")) || [];



box.innerHTML="";



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




function deleteProduct(id){


const confirmDelete =
confirm("Are you sure you want to delete this product?");



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
// ================= IMAGE PREVIEW =================


const imageInput =
document.getElementById("product-image");


const preview =
document.getElementById("image-preview");



if(imageInput){


imageInput.addEventListener("change",function(){


const file = this.files[0];



if(file){


const reader = new FileReader();



reader.onload=function(e){


preview.src = e.target.result;

preview.style.display="block";


};



reader.readAsDataURL(file);


}


});


}
// ================= EDIT PRODUCT =================


function editProduct(id){


let products =
JSON.parse(localStorage.getItem("products")) || [];



const product =
products.find(product=>product.id === id);



if(product){


document.getElementById("product-name").value =
product.name;


document.getElementById("product-price").value =
product.price;


document.getElementById("product-category").value =
product.category;



editProductId = id;



document.getElementById("add-product-btn").style.display =
"none";


document.getElementById("update-product-btn").style.display =
"block";


}


}




// ================= UPDATE PRODUCT =================


if(updateProductBtn){


updateProductBtn.addEventListener("click",()=>{


let products =
JSON.parse(localStorage.getItem("products")) || [];



products = products.map(product=>{


if(product.id === editProductId){


product.name =
document.getElementById("product-name").value;


product.price =
Number(document.getElementById("product-price").value);


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



document.getElementById("add-product-btn").style.display =
"block";


document.getElementById("update-product-btn").style.display =
"none";



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
orders.filter(order=>order.id !== id);



localStorage.setItem(
"orders",
JSON.stringify(orders)
);



filteredOrders = [...orders];


displayOrders();


loadAnalytics();


}
// ================= ORDER SEARCH =================


const orderSearch =
document.getElementById("order-search");


const orderFilter =
document.getElementById("order-status-filter");



function filterOrders(){


let value =
orderSearch.value.toLowerCase();



let status =
orderFilter.value;



filteredOrders =
orders.filter(order=>{


let matchSearch =
order.id.toString().includes(value);



let matchStatus =
status === "all" ||
order.status === status;



return matchSearch && matchStatus;


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


const customerBox =
document.getElementById("admin-customers");



if(!customerBox) return;



let orders =
JSON.parse(localStorage.getItem("orders")) || [];



customerBox.innerHTML = "";



if(orders.length === 0){


customerBox.innerHTML = `

<h3>
No Customers Available
</h3>

`;


return;

}




let customers = {};



orders.forEach(order=>{


let email =
order.email || "Guest Customer";


let name =
order.name || "Guest";



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


customerBox.innerHTML += `


<div class="product-card">


<div class="product-info">


<h3>
${customer.name}
</h3>


<p>
Email: ${customer.email}
</p>


<p>
Total Orders: ${customer.orders}
</p>


<p>
Total Spent: $${customer.spent.toFixed(2)}
</p>



</div>


</div>


`;


});



}



loadCustomers();
