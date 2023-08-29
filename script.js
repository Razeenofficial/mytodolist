document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const deleteAllTasksButton = document.getElementById("deleteAllTasks");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = createTaskElement(task, index);
            taskList.appendChild(li);
        });
    }

    function createTaskElement(task, index) {
        const li = document.createElement("li");
        li.textContent = task;

        const deleteButton = createButton("Delete", "deleteBtn", index);

        li.appendChild(deleteButton);
        return li;
    }

    function createButton(text, className, index) {
        const button = document.createElement("button");
        button.textContent = text;
        button.className = className;
        button.dataset.index = index;
        return button;
    }

    renderTasks();

    addTaskButton.addEventListener("click", function() {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            renderTasks();
        }
    });

    taskList.addEventListener("click", function(event) {
        const target = event.target;
        const index = target.dataset.index;

        if (target.classList.contains("deleteBtn")) {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    });

    deleteAllTasksButton.addEventListener("click", function() {
        tasks.length = 0;
        localStorage.removeItem("tasks"); 
        renderTasks();
    });
});
