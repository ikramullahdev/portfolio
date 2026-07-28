const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart(){

    cartItems.innerHTML = "";

    let grandTotal = 0;

    cart.forEach((item,index)=>{

        grandTotal += item.price;

        cartItems.innerHTML += `

        <div class="product-card">

            <img src="${item.image}" alt="">

            <div class="product-info">

                <h3>${item.name}</h3>

                <p class="price">$${item.price}</p>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        </div>

        `;

    });

    total.innerHTML = "$" + grandTotal;

}

loadCart();

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    loadCart();

}
