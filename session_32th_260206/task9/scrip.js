const form = document.getElementById("form");
const input = document.getElementById("form_input");

class todoApp {
    constructor(todoContainerId, onDoneId, searchId) {
        this.todoList = document.getElementById(todoContainerId);
        this.onDone = document.getElementById(onDoneId);
        this.search = document.getElementById(searchId);

        this.todoArr = [];
        this.id = (() => {
            let i = 0;
            return () => ++i;
        })();

        this.onDone && this.onDone.addEventListener("change", (e) => this.onDoneHandle(e));
        this.search && this.search.addEventListener("submit", (e) => this.searchHandle(e));
    }

    addWork(workName) {
        if (!workName) return;
        const work = {
            id: this.id(),
            done: false,
            name: workName,
        };

        this.todoArr.push(work);
        this.renderWork(this.todoArr);
        this.onDone.checked = false;
    }

    renderWork(renderData) {
        this.todoList.innerHTML = "";
        renderData.forEach((work) => {
            const li = document.createElement("li");
            li.id = work.id;

            const liContnet = document.createElement("span");
            liContnet.innerText = work.name;

            const doneBtn = document.createElement("button");
            doneBtn.innerText = "Done";
            doneBtn.classList.add("done-btn");
            work.done && doneBtn.classList.add("done-btn-green");

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "✕";

            li.appendChild(liContnet);
            li.appendChild(doneBtn);
            li.appendChild(deleteBtn);

            doneBtn.addEventListener("click", (e) => this.doneWork(e));
            deleteBtn.addEventListener("click", (e) => this.deleteWork(e));
            this.todoList.appendChild(li);
        });
    }

    doneWork(workElement) {
        const li = workElement.target.closest("li");
        const index = this.todoArr.findIndex((w) => w.id === Number(li.id));

        this.todoArr[index].done = this.todoArr[index].done === true ? false : true;
        workElement.target.classList.toggle("done-btn-green", this.todoArr[index].done);
    }

    deleteWork(workElement) {
        const li = workElement.target.closest("li");
        const index = this.todoArr.findIndex((w) => w.id === Number(li.id));
        this.todoArr.splice(index, 1);
        li.remove();
    }

    onDoneHandle(e) {
        const renderWork = e.target.checked === true ? this.todoArr.filter((w) => w.done === true) : this.todoArr;
        this.renderWork(renderWork);
    }

    searchHandle(searchElement) {
        searchElement.preventDefault();
        const searchChar = searchElement.target.elements[0].value.trim().toLowerCase();

        const renderSearch = searchChar ? this.todoArr.filter((w) => w.name.toLowerCase().includes(searchChar)) : this.todoArr;
        this.renderWork(renderSearch);
        this.onDone.checked = false;
    }
}

const todo1 = new todoApp("todo-list", "checkDone", "search");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = input.value.trim();
    input.value = "";
    todo1.addWork(inputValue);
});
