const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const text = document.getElementById("text");
const amount = document.getElementById("amount");
const list = document.getElementById("list");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


// Add Transaction

function addTransaction(){

    if(text.value === "" || amount.value === ""){
        alert("Please enter transaction details");
        return;
    }


    const transaction = {

        id: Date.now(),

        text:text.value,

        amount:Number(amount.value)

    };


    transactions.push(transaction);


    updateLocalStorage();


    displayTransactions();


    text.value="";
    amount.value="";

}


// Display Transactions

function displayTransactions(){

    list.innerHTML="";


    transactions.forEach(function(item){


        const li=document.createElement("li");


        li.innerHTML=`

        ${item.text}

        <span>
        $${item.amount}

        <button onclick="deleteTransaction(${item.id})">
        X
        </button>

        </span>

        `;


        list.appendChild(li);


    });


    updateBalance();

}


// Update Balance

function updateBalance(){

    let amounts = transactions.map(item=>item.amount);


    let total = amounts.reduce((sum,item)=>sum+item,0);


    let inc = amounts

    .filter(item=>item>0)

    .reduce((sum,item)=>sum+item,0);



    let exp = amounts

    .filter(item=>item<0)

    .reduce((sum,item)=>sum+item,0);



    balance.innerText="$"+total;

    income.innerText="$"+inc;

    expense.innerText="$"+Math.abs(exp);


}


// Delete Transaction

function deleteTransaction(id){

    transactions = transactions.filter(item=>item.id !== id);


    updateLocalStorage();


    displayTransactions();

}


// Local Storage

function updateLocalStorage(){

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}



displayTransactions();
