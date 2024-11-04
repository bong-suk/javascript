const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
let todoArr = [];

function displayTodos() {
  todoList.innerHTML = "";
  todoArr.forEach((aTodo) => {
    const todoItem = document.createElement("li");
    const todoDelBtn = document.createElement("span");
    todoDelBtn.innerText = "x";
    todoDelBtn.title = "삭제버튼";
    todoItem.innerText = aTodo.todoText;
    todoItem.title = "완료버튼";
    todoItem.classList.add(aTodo.todoDone ? "done" : "yet");
    todoItem.appendChild(todoDelBtn);
    todoDelBtn.addEventListener("click", function () {
      handleTodoDelBtnClick(aTodo.todoId);
    });
    todoItem.addEventListener("click", function () {
      handleTodoItemClick(aTodo.todoId);
    });
    todoList.appendChild(todoItem);
  });
}

function handleTodoDelBtnClick(clickedId) {
  todoArr = todoArr.filter(function (aTodo) {
    return aTodo.todoId !== clickedId;
  });
  displayTodos();
  saveTodos();
}

function handleTodoItemClick(clickedId) {
  todoArr = todoArr.map(function (aTodo) {
    return aTodo.todoId !== clickedId
      ? aTodo
      : { ...aTodo, todoDone: !aTodo.todoDone };
  });
  displayTodos();
  saveTodos();
}

function saveTodos() {
  const todoSting = JSON.stringify(todoArr);
  localStorage.setItem("myTodos", todoSting);
}

function loadTodos() {
  const myTodos = localStorage.getItem("myTodos");
  todoArr = myTodos !== null ? JSON.parse(myTodos) : todoArr;
  displayTodos();
}

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const toBeAdded = {
    todoText: todoForm.todo.value,
    todoId: new Date().getTime(),
    todoDone: false,
  };
  todoForm.todo.value = "";
  todoArr.push(toBeAdded);
  displayTodos();
  saveTodos();
});

loadTodos();
