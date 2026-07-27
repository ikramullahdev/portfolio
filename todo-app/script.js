const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearCompleted = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

clearCompleted.addEventListener("click", function () {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    displayTasks();
});

filterButtons.forEach(button => {
    button.addEventListener("click", function () {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        displayTasks();

    });
});

function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const originalIndex = tasks.indexOf(task);

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete">Delete</button>
        `;

        const span = li.querySelector("span");

        span.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        span.addEventListener("dblclick", function () {

            const newText = prompt("Edit Task", task.text);

            if (newText && newText.trim() !== "") {

                task.text = newText.trim();

                saveTasks();

                displayTasks();

            }

        });

        li.querySelector(".delete").addEventListener("click", function () {

            tasks.splice(originalIndex, 1);

            saveTasks();

            displayTasks();

        });

        taskList.appendChild(li);

    });

    updateCounter();

}

function updateCounter() {

    const completed = tasks.filter(task => task.completed).length;

    taskCounter.textContent =
        `Total: ${tasks.length} | Completed: ${completed}`;

}

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text: text,

        completed: false

    });

    taskInput.value = "";

    saveTasks();

    displayTasks();

}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

displayTasks();
