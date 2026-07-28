const wishlistContainer = document.getElementById("wishlist-container");


let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


function displayWishlist(){

    wishlistContainer.innerHTML = "";


    if(wishlist.length === 0){

        wishlistContainer.innerHTML = `
        <h2>
        No items in wishlist ❤️
        </h2>
        `;

        return;
    }


    wishlist.forEach((product,index)=>{

        wishlistContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="price">$${product.price}</p>
                <button onclick="addWishlistToCart(${index})">
    Add To Cart 🛒
</button>

                <button onclick="removeWishlist(${index})">
                    Remove ❤️
                </button>

            </div>

        </div>

        `;

    });

}


displayWishlist();


function removeWishlist(index){

    wishlist.splice(index,1);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    displayWishlist();

}
