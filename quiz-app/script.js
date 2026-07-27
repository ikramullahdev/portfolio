const questions = [

{
question:"HTML ka full form kya hai?",
options:[
"Hyper Text Markup Language",
"High Text Machine Language",
"Hyper Tool Multi Language",
"Home Text Markup Language"
],
answer:0
},

{
question:"CSS ka use kis liye hota hai?",
options:[
"Database",
"Styling Website",
"Programming",
"Server"
],
answer:1
},

{
question:"JavaScript kis type ki language hai?",
options:[
"Programming Language",
"Database",
"Operating System",
"Browser"
],
answer:0
},

{
question:"JavaScript file ka extension kya hota hai?",
options:[
".html",
".css",
".js",
".java"
],
answer:2
},

{
question:"SQL ka use kis liye hota hai?",
options:[
"Images",
"Database Management",
"Design",
"Animation"
],
answer:1
},

{
question:"GitHub kis liye use hota hai?",
options:[
"Code Hosting",
"Gaming",
"Editing",
"Photos"
],
answer:0
},

{
question:"React kya hai?",
options:[
"Database",
"JavaScript Library",
"Browser",
"Language"
],
answer:1
},

{
question:"Java kis company ne banayi?",
options:[
"Microsoft",
"Sun Microsystems",
"Google",
"Apple"
],
answer:1
},

{
question:"Responsive website ka matlab?",
options:[
"Fast Website",
"Mobile Friendly Website",
"Database Website",
"Offline Website"
],
answer:1
},

{
question:"Portfolio website kis liye hoti hai?",
options:[
"Games",
"Show Skills & Projects",
"Movies",
"Shopping"
],
answer:1
}

];


let currentQuestion = 0;
let score = 0;
let time = 30;
let timer;


const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerText = document.getElementById("timer");
const progress = document.getElementById("progress-bar");



function startQuiz(){

    currentQuestion=0;
    score=0;

    showQuestion();

}



function showQuestion(){

    clearInterval(timer);

    time=30;

    startTimer();


    let q = questions[currentQuestion];


    document.getElementById("question-number").innerHTML =
    `Question ${currentQuestion+1} / ${questions.length}`;


    questionText.innerHTML=q.question;


    optionsBox.innerHTML="";


    q.options.forEach((option,index)=>{


        let button=document.createElement("button");

        button.className="option";

        button.innerHTML=option;


        button.onclick=()=>checkAnswer(button,index);


        optionsBox.appendChild(button);


    });


    progress.style.width =
    ((currentQuestion+1)/questions.length)*100+"%";


    nextBtn.style.display="none";


}



function checkAnswer(button,index){


    let correct =
    questions[currentQuestion].answer;


    let buttons=document.querySelectorAll(".option");


    buttons.forEach(btn=>{
        btn.disabled=true;
    });


    if(index===correct){

        button.classList.add("correct");

        score++;

    }

    else{

        button.classList.add("wrong");

        buttons[correct].classList.add("correct");

    }


    nextBtn.style.display="block";


}




nextBtn.onclick=function(){


    currentQuestion++;


    if(currentQuestion < questions.length){

        showQuestion();

    }

    else{

        showResult();

    }

};




function startTimer(){

    timer=setInterval(()=>{


        time--;

        timerText.innerHTML=time+"s";


        if(time<=0){

            clearInterval(timer);

            currentQuestion++;


            if(currentQuestion < questions.length){

                showQuestion();

            }

            else{

                showResult();

            }

        }


    },1000);

}





function showResult(){


    clearInterval(timer);


    document.querySelector(".quiz-box").classList.add("hidden");


    document.getElementById("result").classList.remove("hidden");


    document.getElementById("score").innerHTML =
    `${score} / ${questions.length}`;


}



function restartQuiz(){

    document.querySelector(".quiz-box").classList.remove("hidden");

    document.getElementById("result").classList.add("hidden");


    startQuiz();

}



startQuiz();
