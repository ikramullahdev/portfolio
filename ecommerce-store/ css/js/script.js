const products = [

{
    name:"Wireless Headphones",
    price:"$99",
    image:"https://picsum.photos/400/400?random=1"
},

{
    name:"Smart Watch",
    price:"$149",
    image:"https://picsum.photos/400/400?random=2"
},

{
    name:"Gaming Mouse",
    price:"$59",
    image:"https://picsum.photos/400/400?random=3"
},

{
    name:"Bluetooth Speaker",
    price:"$89",
    image:"https://picsum.photos/400/400?random=4"
}

];

const container = document.getElementById("products-container");

products.forEach(product => {

container.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<div class="product-info">

<h3>${product.name}</h3>

<p class="price">${product.price}</p>

<button>Add to Cart</button>

</div>

</div>

`;

});
