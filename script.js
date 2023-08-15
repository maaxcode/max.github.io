document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("addButton");
    const taskInput = document.getElementById("task");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        addTask(index, task.text, task.completed, task.selectedOption);
    });

    addButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(tasks.length, taskText, false, "Option 1");
            tasks.push({ text: taskText, completed: false, selectedOption: "Option 1" });
            saveTasks();
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(tasks.length, taskText, false, "Option 1");
                tasks.push({ text: taskText, completed: false, selectedOption: "Option 1" });
                saveTasks();
                taskInput.value = "";
            }
        }
    });

    function addTask(index, taskText, isCompleted, selectedOption) {
        const li = document.createElement("li");
        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.checked = isCompleted;
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        if (isCompleted) {
            taskSpan.classList.add("completed");
        }
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        const selectDropdown = document.createElement("select");
        const option1 = document.createElement("option");
        option1.value = "test";
        option1.textContent = "test";
        const option2 = document.createElement("option");
        option2.value = "Option 2";
        option2.textContent = "Option 2";
        const option3 = document.createElement("option");
        option3.value = "Option 3";
        option3.textContent = "Option 3";
        const option4 = document.createElement("option");
        option4.value = "Option 4";
        option4.textContent = "Option 4";

        selectDropdown.appendChild(option1);
        selectDropdown.appendChild(option2);
        selectDropdown.appendChild(option3);
        selectDropdown.appendChild(option4);

        // Set the selected option based on the saved value
        selectDropdown.value = selectedOption;

        li.appendChild(taskCheckbox);
        li.appendChild(taskSpan);
        li.appendChild(selectDropdown);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        taskCheckbox.addEventListener("change", function() {
            if (taskCheckbox.checked) {
                taskSpan.classList.add("completed");
            } else {
                taskSpan.classList.remove("completed");
            }
            updateTaskCompletion(index, taskCheckbox.checked);
            saveTasks();
        });

        selectDropdown.addEventListener("change", function() {
            updateTaskDropdown(index, selectDropdown.value);
            saveTasks();
        });

        deleteButton.addEventListener("click", function() {
            taskList.removeChild(li);
            tasks = tasks.filter((task, i) => i !== index);
            saveTasks();
        });
    }

    function updateTaskCompletion(index, isCompleted) {
        if (index >= 0 && index < tasks.length) {
            tasks[index].completed = isCompleted;
        }
    }

    function updateTaskDropdown(index, selectedOption) {
        if (index >= 0 && index < tasks.length) {
            tasks[index].selectedOption = selectedOption;
        }
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
