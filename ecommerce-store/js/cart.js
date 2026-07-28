const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Quantity add agar pehle se nahi hai
cart = cart.map(item => ({
    ...item,
    quantity: item.quantity || 1
}));

function loadCart(){

    cartItems.innerHTML = "";

    let grandTotal = 0;

    cart.forEach((item,index)=>{

        grandTotal += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="product-card">

            <img src="${item.image}" alt="${item.name}">

            <div class="product-info">

                <h3>${item.name}</h3>

                <p class="price">$${item.price}</p>

                <div class="qty">

                    <button onclick="decrease(${index})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increase(${index})">+</button>

                </div>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        </div>

        `;

    });

    total.innerHTML = "$" + grandTotal.toFixed(2);

    localStorage.setItem("cart", JSON.stringify(cart));
}

loadCart();

function increase(index){
    cart[index].quantity++;
    loadCart();
}

function decrease(index){
    if(cart[index].quantity > 1){
        cart[index].quantity--;
    }
    loadCart();
}

function removeItem(index){
    cart.splice(index,1);
    loadCart();
}
