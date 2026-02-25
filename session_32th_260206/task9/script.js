const taskInput = document.querySelector("#task-input");
const addButton = document.querySelector("#add-work");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
const doneOnlyCheckbox = document.querySelector("#doneWork");
const taskList = document.querySelector("#task-list");

const tasks = [];
let currentKeyword = "";

function normalizeTaskName(taskName) {
    return taskName.trim().toLowerCase();
}

function renderTasks() {
    const doneOnly = doneOnlyCheckbox.checked;

    taskList.innerHTML = "";

    tasks
        .filter((task) => {
            const matchKeyword = task.name.toLowerCase().includes(currentKeyword);
            const matchDone = !doneOnly || task.done;
            return matchKeyword && matchDone;
        })
        .forEach((task) => {
            const li = document.createElement("li");
            li.className = "task-item";

            const taskName = document.createElement("span");
            taskName.className = "task-name";
            taskName.textContent = task.name;

            if (task.done) {
                taskName.classList.add("done");
            }

            const actions = document.createElement("div");
            actions.className = "task-actions";

            const doneButton = document.createElement("button");
            doneButton.className = "done-btn";
            doneButton.textContent = "done";

            if (task.done) {
                doneButton.classList.add("active");
            }

            doneButton.addEventListener("click", () => {
                task.done = !task.done;
                renderTasks();
            });

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "delete";

            deleteButton.addEventListener("click", () => {
                const taskIndex = tasks.indexOf(task);
                if (taskIndex >= 0) {
                    tasks.splice(taskIndex, 1);
                    renderTasks();
                }
            });

            actions.appendChild(doneButton);
            actions.appendChild(deleteButton);
            li.appendChild(taskName);
            li.appendChild(actions);
            taskList.appendChild(li);
        });
}

addButton.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if (!taskName) {
        taskInput.value = "";
        return;
    }

    const normalizedNewTask = normalizeTaskName(taskName);
    const isDuplicateTask = tasks.some((task) => normalizeTaskName(task.name) === normalizedNewTask);

    if (isDuplicateTask) {
        alert("Công việc đã tồn tại. Vui lòng nhập công việc khác.");
        taskInput.focus();
        return;
    }

    tasks.push({
        name: taskName,
        done: false,
    });

    taskInput.value = "";
    taskInput.focus();
    renderTasks();
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
});

searchButton.addEventListener("click", () => {
    currentKeyword = searchInput.value.trim().toLowerCase();
    renderTasks();
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

doneOnlyCheckbox.addEventListener("change", renderTasks);

renderTasks();
