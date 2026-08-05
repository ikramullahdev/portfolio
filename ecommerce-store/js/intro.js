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

"images/p1.jpg",
"images/p2.jpg",
"images/p3.jpg",
"images/p4.jpg",
"images/p5.jpg",
"images/p6.jpg",
"images/p7.jpg",
"images/p8.jpg",
"images/p9.jpg",
"images/p10.jpg"

];



let container=document.querySelector(".rain-container");



for(let i=0;i<20;i++){


let img=document.createElement("img");


img.src=images[i%images.length];


img.className="product";


img.style.left=Math.random()*90+"%";


img.style.animationDelay=Math.random()*3+"s";


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


window.location.href="index.html";


},1000);



}


},40);
