const form = document.getElementById("form");
const input = document.getElementById("form_input");

class todoApp {
    constructor(todoContainerId, onDoneId, searchFormId, searchInputId) {
        this.todoList = document.getElementById(todoContainerId);
        this.onDone = document.getElementById(onDoneId);
        this.searchForm = document.getElementById(searchFormId);
        this.searchInput = document.getElementById(searchInputId);

        this.todoArr = [];
        this.searchQuery = "";
        this.searchDebounceTimer = null; // debounce timer

        this.id = (() => {
            let i = 0;
            return () => ++i;
        })();

        this.bindEvents();
    }

    bindEvents() {
        this.onDone?.addEventListener("change", () => this.renderWork(this.getVisibleWorks()));

        // Search realtime + debounce 400ms
        this.searchInput?.addEventListener("input", () => {
            clearTimeout(this.searchDebounceTimer);
            this.searchDebounceTimer = setTimeout(() => {
                this.searchQuery = (this.searchInput?.value || "").trim().toLowerCase();
                this.renderWork(this.getVisibleWorks());
            }, 400);
        });

        // Submit vẫn chạy ngay (Enter / click search button)
        this.searchForm?.addEventListener("submit", (e) => {
            e.preventDefault();
            clearTimeout(this.searchDebounceTimer);
            this.searchQuery = (this.searchInput?.value || "").trim().toLowerCase();
            this.renderWork(this.getVisibleWorks());
        });

        // Event delegation: chỉ cần 1 listener cho cả list
        this.todoList?.addEventListener("click", (e) => {
            const btn = e.target.closest("button");
            if (!btn) return;

            const li = btn.closest("li");
            if (!li) return;

            const id = Number(li.dataset.id);
            if (!id) return;

            if (btn.dataset.action === "done") {
                this.doneWork(id);
            } else if (btn.dataset.action === "delete") {
                this.deleteWork(id);
            }
        });
    }

    addWork(workName) {
        if (!workName) return;

        this.todoArr.push({
            id: this.id(),
            done: false,
            name: workName,
        });

        this.renderWork(this.getVisibleWorks());
    }

    getVisibleWorks() {
        const onlyDone = !!this.onDone?.checked;
        const query = this.searchQuery;

        return this.todoArr.filter((w) => {
            const passDone = !onlyDone || w.done;
            const passSearch = !query || w.name.toLowerCase().includes(query);
            return passDone && passSearch;
        });
    }

    renderWork(renderData) {
        this.todoList.innerHTML = "";

        renderData.forEach((work) => {
            const li = document.createElement("li");
            li.dataset.id = String(work.id);

            const liContent = document.createElement("span");
            liContent.innerText = work.name;

            const doneBtn = document.createElement("button");
            doneBtn.type = "button";
            doneBtn.innerText = "Done";
            doneBtn.dataset.action = "done";
            doneBtn.classList.add("done-btn");
            if (work.done) doneBtn.classList.add("done-btn-green");

            const deleteBtn = document.createElement("button");
            deleteBtn.type = "button";
            deleteBtn.innerText = "✕";
            deleteBtn.dataset.action = "delete";

            li.appendChild(liContent);
            li.appendChild(doneBtn);
            li.appendChild(deleteBtn);

            this.todoList.appendChild(li);
        });
    }

    doneWork(id) {
        const index = this.todoArr.findIndex((w) => w.id === id);
        if (index === -1) return;

        this.todoArr[index].done = !this.todoArr[index].done;
        this.renderWork(this.getVisibleWorks());
    }

    deleteWork(id) {
        const index = this.todoArr.findIndex((w) => w.id === id);
        if (index === -1) return;

        this.todoArr.splice(index, 1);
        this.renderWork(this.getVisibleWorks());
    }
}

const todo1 = new todoApp("todo-list", "checkDone", "search", "search-input");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = input.value.trim();
    input.value = "";
    todo1.addWork(inputValue);
});
