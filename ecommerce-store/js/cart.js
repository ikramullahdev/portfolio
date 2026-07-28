const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// quantity add agar nahi hai
cart = cart.map(item => ({
    ...item,
    quantity: item.quantity || 1
}));


function loadCart(){

    cartItems.innerHTML = "";

    let grandTotal = 0;


    if(cart.length === 0){

        cartItems.innerHTML = `
            <h2 style="text-align:center;">
                Your cart is empty 🛒
            </h2>
        `;

        total.innerHTML = "$0";

        return;

    }


    cart.forEach((item,index)=>{


        grandTotal += item.price * item.quantity;


        cartItems.innerHTML += `

        <div class="product-card">


            <img src="${item.image}" alt="${item.name}">


            <div class="product-info">


                <h3>${item.name}</h3>


                <p class="price">
                    $${item.price}
                </p>


                <div class="qty">

                    <button onclick="decrease(${index})">
                        -
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button onclick="increase(${index})">
                        +
                    </button>

                </div>


                <p>
                Sub Total:
                $${item.price * item.quantity}
                </p>


                <button onclick="removeItem(${index})">
                    Remove 🗑
                </button>


            </div>


        </div>

        `;


    });


    total.innerHTML = "$" + grandTotal.toFixed(2);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

}



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



function updateCartCount(){

    const count = document.getElementById("cart-count");


    if(count){

        count.innerText = cart.length;

    }

}



loadCart();
