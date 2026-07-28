const products = [

{
id:1,
name:"Wireless Headphones",
price:99,
image:"https://picsum.photos/400?1"
},

{
id:2,
name:"Smart Watch",
price:149,
image:"https://picsum.photos/400?2"
},

{
id:3,
name:"Gaming Mouse",
price:59,
image:"https://picsum.photos/400?3"
},

{
id:4,
name:"Bluetooth Speaker",
price:89,
image:"https://picsum.photos/400?4"
},

{
id:5,
name:"Laptop Backpack",
price:79,
image:"https://picsum.photos/400?5"
},

{
id:6,
name:"Mechanical Keyboard",
price:129,
image:"https://picsum.photos/400?6"
}

];

const container=document.getElementById("products");

function display(list){

container.innerHTML="";

list.forEach(product=>{

container.innerHTML+=`

<div class="product-card">

<img src="${product.image}">

<div class="product-info">

<h3>${product.name}</h3>

<p class="price">$${product.price}</p>

<button>Add to Cart</button>

</div>

</div>

`;

});

}

display(products);

document
.getElementById("search")
.addEventListener("keyup",e=>{

const value=e.target.value.toLowerCase();

const filtered=products.filter(product=>

product.name.toLowerCase().includes(value)

);

display(filtered);

});
