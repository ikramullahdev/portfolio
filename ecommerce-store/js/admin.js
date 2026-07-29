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
