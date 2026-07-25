const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", addTask);


function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete">Delete</button>
        `;


        li.querySelector("span").addEventListener("click", function(){
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });


        li.querySelector(".delete").addEventListener("click", function(){
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });


        taskList.appendChild(li);

    });

}


function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Please enter a task");
        return;
    }


    tasks.push({
        text: text,
        completed: false
    });


    saveTasks();

    displayTasks();

    taskInput.value = "";

}


function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


displayTasks();
