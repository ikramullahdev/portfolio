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
