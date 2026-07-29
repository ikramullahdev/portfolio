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

console.log("Wishlist Button:", wishlistBtn);

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

// ================= REVIEWS =================


const reviewBtn = document.getElementById("submit-review");


function loadReviews(){

    const product = JSON.parse(
        localStorage.getItem("selectedProduct")
    );


    const reviews =
    JSON.parse(localStorage.getItem("reviews")) || [];


    const list = document.getElementById("reviews-list");


    if(!list) return;


    list.innerHTML="";


    const productReviews = reviews.filter(
        review => review.id === product.id
    );


    productReviews.forEach(review=>{


        list.innerHTML += `

        <div class="review-card">

            <div class="review-stars">
                ${"⭐".repeat(review.rating)}
            </div>

            <p>
                ${review.text}
            </p>

        </div>

        `;


    });
// Calculate Average Rating

const ratingElement = document.getElementById("average-rating");
const starsElement = document.getElementById("average-stars");


if(productReviews.length > 0){


    let total = 0;


    productReviews.forEach(review=>{

        total += review.rating;

    });



    let average = total / productReviews.length;


    average = average.toFixed(1);



    if(ratingElement){

        ratingElement.innerText =
        `(${average} - ${productReviews.length} Reviews)`;

    }



    if(starsElement){

        starsElement.innerText =
        "⭐".repeat(Math.round(average));

    }


}
else{


    if(ratingElement){

        ratingElement.innerText =
        "(No Reviews)";

    }


}

}



if(reviewBtn){

    reviewBtn.addEventListener("click",()=>{


        const product =
        JSON.parse(localStorage.getItem("selectedProduct"));


        const rating =
        document.getElementById("rating").value;


        const text =
        document.getElementById("review-text").value;


        if(text.trim()===""){

            alert("Please write a review");

            return;

        }


        let reviews =
        JSON.parse(localStorage.getItem("reviews")) || [];


        reviews.push({

            id:product.id,

            rating:Number(rating),

            text:text

        });


        localStorage.setItem(
            "reviews",
            JSON.stringify(reviews)
        );


        document.getElementById("review-text").value="";


        loadReviews();


    });

}


loadReviews();
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
