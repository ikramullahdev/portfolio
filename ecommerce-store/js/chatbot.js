// ================= NOVABOT =================


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



// OPEN / CLOSE CHAT

if(toggle){

toggle.onclick=function(){

windowBox.style.display =
windowBox.style.display==="block"
?
"none"
:
"block";

};

}



// SEND MESSAGE

function sendMessage(){


let text =
input.value.trim().toLowerCase();


if(text==="") return;



messages.innerHTML +=

`
<p class="user-msg">
<b>You:</b> ${text}
</p>
`;



input.value="";



botReply(text);


}




// ENTER KEY

if(input){

input.addEventListener("keypress",function(e){

if(e.key==="Enter"){

sendMessage();

}

});

}




if(send){

send.onclick=sendMessage;

}




// BOT RESPONSE

function botReply(text){



let reply="";



if(text.includes("hello") || text.includes("hi")){


reply =
"Hello 👋 Welcome to NovaShop. How can I help you today?";


}


else if(
text.includes("product") ||
text.includes("item") ||
text.includes("show")
){

let products =
JSON.parse(localStorage.getItem("products")) || [];


if(products.length > 0){

reply =
"I found these products: ";


products.slice(0,3).forEach(product=>{

reply += product.name + " $" + product.price + ", ";

});


reply += " You can view them on the Products page.";

}
else{

reply =
"Please visit our Products page to explore items.";

}

}



else if(text.includes("cart")){


reply =
"You can add products to cart and checkout anytime.";


}



else if(text.includes("delivery")){


reply =
"Delivery usually takes 3-5 working days 🚚";


}



else if(text.includes("order")){


reply =
"You can check your order status from the Orders page.";


}



else if(text.includes("return")){


reply =
"Our return policy allows easy product returns within the allowed period.";


}



else if(text.includes("price") || text.includes("cost")){


reply =
"Product prices are displayed on every product card.";


}



else if(text.includes("thank")){


reply =
"You're welcome 😊 Happy shopping with NovaShop!";


}



else{


reply =
"I can help you with products, orders, delivery, returns and shopping assistance 🤖";


}



showBot(reply);



}




// BOT TYPING EFFECT

function showBot(text){


let typing =

`
<p>
<b>NovaBot:</b> Typing...
</p>
`;

messages.innerHTML += typing;


messages.scrollTop =
messages.scrollHeight;



setTimeout(()=>{


messages.lastElementChild.innerHTML =

`
<b>NovaBot:</b> ${text}
`;



// VOICE

speak(text);



messages.scrollTop =
messages.scrollHeight;



},1000);



}




// ================= NOVABOT VOICE =================

function speak(text){

    let voices = speechSynthesis.getVoices();


    let msg = new SpeechSynthesisUtterance(text);


    let englishVoice = voices.find(voice =>
        voice.lang.includes("en")
    );


    if(englishVoice){

        msg.voice = englishVoice;

    }


    msg.volume = 1;

    msg.rate = 0.9;

    msg.pitch = 1;


    speechSynthesis.cancel();

    speechSynthesis.speak(msg);

}
// ================= VOICE INPUT =================


const voiceBtn =
document.getElementById("voice-btn");


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(voiceBtn && SpeechRecognition){


const recognition =
new SpeechRecognition();


recognition.lang = "en-US";


recognition.continuous = false;



voiceBtn.onclick=function(){


recognition.start();


voiceBtn.innerHTML="🎙️";


};



recognition.onresult=function(event){


let voiceText =
event.results[0][0].transcript;



input.value = voiceText;



sendMessage();



voiceBtn.innerHTML="🎤";


};



recognition.onerror=function(){


voiceBtn.innerHTML="🎤";


alert("Voice not detected");


};


}
