const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (product) {

    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = "$" + product.price;

    const btn = document.getElementById("add-cart-btn");

    btn.addEventListener("click", function () {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(product.name + " added to cart!");

    });

}
