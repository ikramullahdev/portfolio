let text="Welcome to NovaShop";

let i=0;


function typing(){


if(i<text.length){

document.getElementById("welcome").innerHTML += text[i];

i++;

setTimeout(typing,100);

}


}


typing();




// PRODUCTS RAIN


let images=[

"assets/backpack.jpg",
"assets/headphones.jpg",
"assets/keyboard.jpg",
"assets/mouse.jpg",
"assets/smartwatch.jpg",
"assets/speaker.jpg"

];




let container=document.querySelector(".rain-container");



for(let i=0;i<20;i++){


let img=document.createElement("img");


img.src=images[i%images.length];


img.className="product";


img.style.left=Math.random()*90+"%";


img.style.width =
(50 + Math.random()*70) + "px";


img.style.animationDuration =
(3 + Math.random()*3) + "s";


img.style.animationDelay =
Math.random()*3+"s";


container.appendChild(img);



}





// PROGRESS BAR


let progress=0;


let bar=document.getElementById("progress");


let loading=setInterval(()=>{


progress++;

bar.style.width=progress+"%";



if(progress>=100){


clearInterval(loading);


setTimeout(()=>{


sessionStorage.setItem("introShown","true");

window.location.href="index.html";



},1000);



}


},40);
