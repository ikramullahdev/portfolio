const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");


quizBox.style.display="none";


startBtn.addEventListener("click",()=>{


    if(selectedCategory==="all"){

        alert("Please select a category first!");

        return;

    }


    startScreen.style.display="none";

    quizBox.style.display="block";


    startQuiz();


});
const questions = [

{
question:"What does HTML stand for?",
options:[
"Hyper Text Markup Language",
"High Text Machine Language",
"Hyperlink Text Management Language",
"Home Tool Markup Language"
],
answer:0
},

{
question:"Which language is used for styling web pages?",
options:[
"HTML",
"CSS",
"Java",
"SQL"
],
answer:1
},

{
question:"Which tag is used to create a link in HTML?",
options:[
"<link>",
"<a>",
"<href>",
"<url>"
],
answer:1
},

{
question:"Which property changes text color in CSS?",
options:[
"background",
"font-style",
"color",
"text-color"
],
answer:2
},

{
question:"JavaScript is mainly used for?",
options:[
"Database creation",
"Web page interactivity",
"Operating system",
"Image editing"
],
answer:1
},

{
question:"Which symbol is used for comments in JavaScript?",
options:[
"//",
"##",
"<!-- -->",
"**"
],
answer:0
},

{
question:"Which HTML tag is used for the largest heading?",
options:[
"<h6>",
"<heading>",
"<h1>",
"<head>"
],
answer:2
},

{
question:"Which CSS property controls element spacing inside?",
options:[
"margin",
"padding",
"border",
"width"
],
answer:1
},

{
question:"Which keyword declares a variable in JavaScript?",
options:[
"var",
"int",
"string",
"define"
],
answer:0
},

{
question:"Which file extension is used for JavaScript files?",
options:[
".html",
".css",
".js",
".java"
],
answer:2
},
    {

question:"Which programming language is known as platform independent?",

options:[
"Java",
"C",
"HTML",
"SQL"
],

answer:0

},

{

question:"Which keyword is used to create an object in Java?",

options:[
"class",
"new",
"object",
"create"
],

answer:1

},

{

question:"Which method is the entry point of a Java program?",

options:[
"start()",
"main()",
"run()",
"init()"
],

answer:1

},

{

question:"Which data type stores whole numbers in Java?",

options:[
"float",
"boolean",
"int",
"char"
],

answer:2

},

{

question:"OOP stands for?",

options:[
"Object Oriented Programming",
"Open Operating Program",
"Object Online Process",
"Output Oriented Programming"
],

answer:0

},

{

question:"Which loop runs while a condition is true?",

options:[
"if loop",
"while loop",
"switch loop",
"case loop"
],

answer:1

},

{

question:"Which symbol is used for multiplication in programming?",

options:[
"x",
"*",
"#",
"%"
],

answer:1

},

{

question:"Which concept allows one class to acquire properties of another class?",

options:[
"Encapsulation",
"Inheritance",
"Compilation",
"Iteration"
],

answer:1

},

{

question:"Which language is mainly used for Android development with Java?",

options:[
"Kotlin",
"HTML",
"SQL",
"CSS"
],

answer:0

},

{

question:"A compiler converts source code into?",

options:[
"Images",
"Machine code",
"Database",
"Text file"
],

answer:1

},
    {

question:"SQL stands for?",

options:[
"Structured Query Language",
"Simple Query Language",
"System Query Logic",
"Standard Question Language"
],

answer:0

},

{

question:"Which SQL command is used to retrieve data?",

options:[
"GET",
"SELECT",
"FETCHALL",
"SHOW"
],

answer:1

},

{

question:"Which command is used to add new data into a table?",

options:[
"INSERT",
"UPDATE",
"ADD",
"CREATE"
],

answer:0

},

{

question:"Which database is a relational database?",

options:[
"MySQL",
"HTML",
"CSS",
"JavaScript"
],

answer:0

},

{

question:"Primary key is used to?",

options:[
"Delete database",
"Uniquely identify records",
"Create website",
"Design page"
],

answer:1

},

{

question:"Which SQL command modifies existing records?",

options:[
"CHANGE",
"UPDATE",
"MODIFY TABLE",
"EDIT"
],

answer:1

},

{

question:"DBMS stands for?",

options:[
"Database Management System",
"Data Building Management System",
"Digital Base Management Software",
"Database Machine System"
],

answer:0

},

{

question:"Which normal form removes repeating groups of data?",

options:[
"1NF",
"2NF",
"3NF",
"4NF"
],

answer:0

},

{

question:"Which language is used to manage databases?",

options:[
"SQL",
"HTML",
"CSS",
"XML"
],

answer:0

},

{

question:"What is a database?",

options:[
"A collection of organized data",
"A programming language",
"A website design",
"A computer game"
],

answer:0

}

];


let selectedCategory = "all";
let quizQuestions = [];

const categories = document.querySelectorAll(".category");


categories.forEach(button => {

    button.addEventListener("click",()=>{


        categories.forEach(btn=>{
            btn.classList.remove("selected");
        });


        button.classList.add("selected");


        selectedCategory = button.dataset.category;


    });

});


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

    currentQuestion = 0;
    score = 0;


    if(selectedCategory === "web"){

        quizQuestions = questions.slice(0,10);

    }

    else if(selectedCategory === "java"){

        quizQuestions = questions.slice(10,20);

    }

    else if(selectedCategory === "sql"){

        quizQuestions = questions.slice(20,30);

    }


    showQuestion();

}



function showQuestion(){

    clearInterval(timer);

    time=30;

    startTimer();


    let q = quizQuestions[currentQuestion];


    document.getElementById("question-number").innerHTML =
    `Question ${currentQuestion+1} / $quizQuestions.length}`;


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
    ((currentQuestion+1)/quizQuestions.length)*100+"%";


    nextBtn.style.display="none";


}



function checkAnswer(button,index){


    let correct =
   quizQuestions[currentQuestion].answer;


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


    if(currentQuestion < quizQuestions.length){

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


            if(currentQuestion < quizQuestions.length){

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


    let percentage = Math.round(
        (score / quizQuestions.length) * 100
    );


    document.getElementById("score").innerHTML =

    `
    ${score} / ${quizQuestions.length}
    <br>
    <span style="font-size:30px">
    ${percentage}% Score
    </span>

    <p style="font-size:18px;margin-top:15px;">
    Correct Answers: ${score}
    <br>
    Wrong Answers: ${quizQuestions.length - score}
    </p>
    `;


}



function restartQuiz(){

    document.querySelector(".quiz-box").classList.remove("hidden");

    document.getElementById("result").classList.add("hidden");


}



startQuiz();
