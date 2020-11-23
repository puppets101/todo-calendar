const todoList = [];

function todo() {
  addTodoEventListeners();
}

function addTodoEventListeners() {
  const openTodoModal = document.getElementById("add-todo-button");
  const todoModal = document.getElementById("new-todo-modal");
  const todoTitleInput = document.getElementById("todo-title");

  // OPEN MODAL BUTTON
  openTodoModal.addEventListener("click", function () {
    todoTitleInput.value = "";
    todoModal.classList.add("modal-visible");
  });

  // EXIT MODAL BUTTON
  const exitModalButton = document.getElementById("exit-modal-button");
  exitModalButton.addEventListener("click", function () {
    todoModal.classList.remove("modal-visible");
    todoTitleInput.value = "";
  });

  // INPUT FIELD
  todoTitleInput.addEventListener("change", function () {
    addNewTodo(this.value);
  });

  // CREATE TODO ON BUTTON CLICK
  const createTodoButton = document.getElementById("create-todo-button");
  createTodoButton.addEventListener("click", function () {
    updateTodoList();
    todoModal.classList.remove("modal-visible");
  });

  // CREATE TODO ON ENTER
  todoTitleInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      updateTodoList();
      todoModal.classList.remove("modal-visible");
    }
  });
}

function addNewTodo(titleInput) {
  const todoObject = {
    title: titleInput,
    date: new Date(),
  };
  todoList.push(todoObject);
}
