/* =========================================
   TODO LIST APPLICATION
   JavaScript Functionality
   ========================================= */


/* ---------- DOM Elements ---------- */

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");

const taskCounter = document.getElementById("taskCounter");

const clearCompletedBtn =
    document.getElementById("clearCompletedBtn");

const filterButtons =
    document.querySelectorAll(".filter-btn");


/* ---------- Application Data ---------- */

let tasks = [];

let currentFilter = "all";


/* ---------- Load Tasks from Local Storage ---------- */

function loadTasks() {

    const savedTasks = localStorage.getItem("todoTasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }

    renderTasks();
}


/* ---------- Save Tasks to Local Storage ---------- */

function saveTasks() {

    localStorage.setItem(
        "todoTasks",
        JSON.stringify(tasks)
    );
}


/* ---------- Add New Task ---------- */

function addTask() {

    const taskText = taskInput.value.trim();

    /* Prevent empty tasks */

    if (taskText === "") {

        alert("Please enter a task.");

        taskInput.focus();

        return;
    }


    /* Create task object */

    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false
    };


    /* Add task to array */

    tasks.push(newTask);


    /* Save tasks */

    saveTasks();


    /* Clear input */

    taskInput.value = "";


    /* Focus input */

    taskInput.focus();


    /* Display tasks */

    renderTasks();
}


/* ---------- Delete Task ---------- */

function deleteTask(taskId) {

    tasks = tasks.filter(function (task) {

        return task.id !== taskId;

    });


    saveTasks();

    renderTasks();
}


/* ---------- Toggle Task Completion ---------- */

function toggleTask(taskId) {

    tasks = tasks.map(function (task) {

        if (task.id === taskId) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });


    saveTasks();

    renderTasks();
}


/* ---------- Get Filtered Tasks ---------- */

function getFilteredTasks() {

    if (currentFilter === "active") {

        return tasks.filter(function (task) {

            return !task.completed;

        });

    }


    if (currentFilter === "completed") {

        return tasks.filter(function (task) {

            return task.completed;

        });

    }


    return tasks;
}


/* ---------- Render Tasks ---------- */

function renderTasks() {

    /* Clear existing list */

    taskList.innerHTML = "";


    /* Get filtered tasks */

    const filteredTasks = getFilteredTasks();


    /* Show empty message */

    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    /* Create each task */

    filteredTasks.forEach(function (task) {

        const listItem = document.createElement("li");

        listItem.className = "task-item";


        /* Add completed class */

        if (task.completed) {

            listItem.classList.add("completed");

        }


        /* Checkbox */

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        checkbox.addEventListener(
            "change",
            function () {

                toggleTask(task.id);

            }
        );


        /* Task text */

        const taskText = document.createElement("span");

        taskText.className = "task-text";

        taskText.textContent = task.text;


        /* Delete button */

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";

        deleteButton.type = "button";


        deleteButton.addEventListener(
            "click",
            function () {

                deleteTask(task.id);

            }
        );


        /* Add elements to list item */

        listItem.appendChild(checkbox);

        listItem.appendChild(taskText);

        listItem.appendChild(deleteButton);


        /* Add task to task list */

        taskList.appendChild(listItem);

    });


    /* Update statistics */

    updateStatistics();
}


/* ---------- Update Statistics ---------- */

function updateStatistics() {

    const total = tasks.length;


    const completed = tasks.filter(function (task) {

        return task.completed;

    }).length;


    const active = total - completed;


    totalTasks.textContent = total;

    activeTasks.textContent = active;

    completedTasks.textContent = completed;

    taskCounter.textContent = active;
}


/* ---------- Change Filter ---------- */

function changeFilter(filter) {

    currentFilter = filter;


    /* Update active filter button */

    filterButtons.forEach(function (button) {

        button.classList.remove("active");

        if (button.dataset.filter === filter) {

            button.classList.add("active");

        }

    });


    renderTasks();
}


/* ---------- Clear Completed Tasks ---------- */

function clearCompletedTasks() {

    tasks = tasks.filter(function (task) {

        return !task.completed;

    });


    saveTasks();

    renderTasks();
}


/* ---------- Event: Add Task Button ---------- */

addTaskBtn.addEventListener(
    "click",
    addTask
);


/* ---------- Event: Enter Key ---------- */

taskInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


/* ---------- Event: Filter Buttons ---------- */

filterButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const filter =
                button.dataset.filter;

            changeFilter(filter);

        }
    );

});


/* ---------- Event: Clear Completed ---------- */

clearCompletedBtn.addEventListener(
    "click",
    clearCompletedTasks
);


/* ---------- Start Application ---------- */

loadTasks();