const input = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";


function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") {
            return !todo.completed;
        }

        if (currentFilter === "completed") {
            return todo.completed;
        }

        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");

        li.dataset.id = todo.id;

        li.innerHTML = `
            <input 
                type="checkbox" 
                data-action="complete"
                ${todo.completed ? "checked" : ""}
            >

            <span>${todo.text}</span>

            <button data-action="delete">Delete</button>
        `;

        todoList.appendChild(li);
    });
}


function addTodo() {
    const text = input.value.trim();

    if (!text) return;

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);

    saveTodos();
    renderTodos();

    input.value = "";
}

addBtn.addEventListener("click", addTodo);


// Event delegation
todoList.addEventListener("click", event => {

    const action = event.target.dataset.action;
    const li = event.target.closest("li");

    if (!li) return;

    const id = Number(li.dataset.id);

    if (action === "delete") {
        todos = todos.filter(todo => todo.id !== id);

        saveTodos();
        renderTodos();
    }

    if (action === "complete") {
        const todo = todos.find(todo => todo.id === id);

        if (todo) {
            todo.completed = event.target.checked;
        }

        saveTodos();
        renderTodos();
    }
});
document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        renderTodos();
    });
});
renderTodos();