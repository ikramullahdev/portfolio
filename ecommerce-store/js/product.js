const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (product) {

    document.getElementById("product-image").src = product.image;

    document.getElementById("product-name").textContent = product.name;

    document.getElementById("product-price").textContent =
    "$" + product.price;


    document.getElementById("product-description").textContent =
    product.description || "Premium quality product with modern design and excellent performance.";


    const btn = document.getElementById("add-cart-btn");

const wishlistBtn = document.getElementById("wishlist-btn");


if(wishlistBtn){

    wishlistBtn.addEventListener("click", function(){

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


        wishlist.push(product);


        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );


        alert(product.name + " added to wishlist ❤️");

    });

}


    btn.addEventListener("click", function () {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert(product.name + " added to cart!");

    });

}
