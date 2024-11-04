// 요소 선택 및 배열 선언
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
let todoArr = [];

// 할일 쇼잉
function displayTodos() {
  //할일이 추가 될때 마다 보여줌
  todoList.innerHTML = "";
  todoArr.forEach((aTodo) => {
    //배열의 요소 수가 쇼잉해줘야할 요소 수
    const todoItem = document.createElement("li"); //리스트 만들땐 리스트 -ul -li
    const todoDelBtn = document.createElement("span"); //부가기능 - 삭제버튼 li에 넣어주기
    todoDelBtn.innerText = "x";
    todoDelBtn.title = "클릭시 삭제";
    todoItem.innerText = aTodo.todoText;
    //atodo-객체,todoText-속성명 -> appenChild
    // -> 문제발생 기존것 까지 복사함 forEach문 때문 그래서 innderHTML(원래것을 싹다 지운다)
    //함정 부가기능 할일 추가되면 li에는 삭제와 수정이 가능하도록 기능 추가 -> 삭제 버튼 +
    todoItem.title = "클릭시 완료";
    todoItem.classList.add(aTodo.todoDone ? "done" : "yet"); //class 속성 줌
    todoItem.appendChild(todoDelBtn); //todoDelBtn todoItem에 추가
    todoDelBtn.addEventListener("click", function () {
      //todoItem클릭 했을때 발생하는 이벤트
      handleTodoDelBtnClick(aTodo.todoId);
    });
    todoItem.addEventListener("click", function () {
      handleTodoItemClick(aTodo.todoId);
    });
    todoList.appendChild(todoItem);
  });
}

//할일 삭제
function handleTodoDelBtnClick(clickedId) {
  todoArr = todoArr.filter(function (aTodo) {
    //클릭된 리스트빼고 나머지는 남긴다
    return aTodo.todoId !== clickedId;
  });
  displayTodos();
  saveTodos();
}

//할일 수정
function handleTodoItemClick(clickedId) {
  todoArr = todoArr.map(function (aTodo) {
    //여러개의 할일 중 클릭한 것만 투두 던의 상태 바꾼다.
    return aTodo.todoId !== clickedId
      ? aTodo
      : { ...aTodo, todoDone: !aTodo.todoDone };
  });
  displayTodos();
  saveTodos();
}

// 로컬에 저장하기
function saveTodos() {
  const todoSting = JSON.stringify(todoArr); // 배열에 객체가 포함되어 있으면 stringify 해줘야함
  localStorage.setItem("myTodos", todoSting); //할일 추가할 때 마다 저장되야 하므로 myTodos에서 호출
}

// 로컬저장소에서 불러오기
function loadTodos() {
  //페이지를 열었을 때만 불러오면 됨-> load는 한번만 해주면 됨 -> 새로고침 해도 가능
  const myTodos = localStorage.getItem("myTodos"); //getItem 스는 이유
  todoArr = myTodos !== null ? JSON.parse(myTodos) : todoArr; //myTodos가 null일 때만 parse와 disply를 함 -안전한 처리를 위함
  displayTodos();
}

// 할일 추가
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

loadTodos(); // 시작할 때 한번만!

let link = document.location.href;
console.log(link);
