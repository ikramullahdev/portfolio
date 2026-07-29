const adminOrders =
document.getElementById("admin-orders");



let orders =
JSON.parse(localStorage.getItem("orders")) || [];




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




    orders.forEach(order=>{


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
        Processing
        </button>


        <button onclick="updateStatus('${order.id}','Shipped')">
        Shipped
        </button>


        <button onclick="updateStatus('${order.id}','Delivered')">
        Delivered
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


let products =
JSON.parse(localStorage.getItem("products")) || [];



products =
products.filter(product=>product.id !== id);



localStorage.setItem(
"products",
JSON.stringify(products)
);



displayAdminProducts();


}



displayAdminProducts();
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
