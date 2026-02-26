const form = document.getElementById("form");
const input = document.getElementById("form_input");

const todoList = document.getElementById("todo-list");

class todoApp {
    constructor() {
        this.todoArr = [];
        this.id = (() => {
            let i = 0;
            return () => ++i;
        })();
    }

    addWork() {
        const inputValue = input.value.trim();
        input.value = "";
        if (!inputValue) return;
        const work = {
            id: id(),
            done: false,
            name: inputValue,
        };
    }
}

const todoArr = [];
const id = (() => {
    let i = 0;
    return () => ++i;
})();

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = input.value.trim();
    input.value = "";
    if (!inputValue) return;

    todoArr.push(work);

    const li = document.createElement("li");
    li.innerText = inputValue + " ";

    const doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.classList.add("done-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✕";

    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    doneBtn.addEventListener("click", (e) => {
        e.target.classList.toggle("done-btn-green");
    });

    deleteBtn.addEventListener("click", (e) => {
        li.remove();
    });
});
