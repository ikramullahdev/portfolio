const toggle =
document.getElementById("chat-toggle");


const windowBox =
document.getElementById("chat-window");


const send =
document.getElementById("send-message");


const input =
document.getElementById("user-message");


const messages =
document.getElementById("chat-messages");



toggle.onclick=function(){

windowBox.style.display =
windowBox.style.display==="block"
?
"none"
:
"block";

};



send.onclick=function(){


let text =
input.value.toLowerCase();


if(text==="") return;



messages.innerHTML +=

`<p><b>You:</b> ${text}</p>`;


let reply="";


if(text.includes("delivery")){

reply="Delivery usually takes 3-5 working days.";

}

else if(text.includes("order")){

reply="You can place an order from cart and checkout.";

}

else if(text.includes("return")){

reply="Our return policy allows easy product returns.";

}

else if(text.includes("price")){

reply="You can see product prices on the product page.";

}

else{

reply="Sorry, I can help with products, orders, delivery and returns.";

}



messages.innerHTML +=

`<p><b>NovaBot:</b> ${reply}</p>`;


input.value="";


messages.scrollTop =
messages.scrollHeight;


};
