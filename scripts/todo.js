const todoList = [];

function todo() {
  addTodoEventListeners();
}

function addTodoEventListeners() {
  const openTodoModal = document.getElementById("add-todo-button");
  const todoModal = document.getElementById("new-todo-modal");
  const todoTitleInput = document.getElementById("todo-title");
  const modalBg = document.getElementById("modal-bg");
  const exitModalButton = document.getElementById("exit-modal-button");

  // OPEN MODAL BUTTON
  openTodoModal.addEventListener("click", function () {
    todoTitleInput.value = "";
    openModal(todoModal, modalBg);
  });

  // EXIT MODAL BUTTON
  exitModalButton.addEventListener("click", function () {
    todoModal.classList.remove("modal-visible");
    modalBg.classList.remove("modal-visible");
    todoTitleInput.value = "";
  });

  // EXIT MODAL BACKGROUND
  modalBg.addEventListener("click", function () {
    closeModal(todoModal, modalBg);
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
    closeModal(todoModal, modalBg);
  });

  // CREATE TODO ON ENTER
  todoTitleInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      updateTodoList();
      closeModal(todoModal, modalBg);
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

function openModal(todoModal, modalBg) {
  todoModal.classList.add("modal-visible");
  modalBg.classList.add("modal-visible");
}

function closeModal(todoModal, modalBg) {
  todoModal.classList.remove("modal-visible");
  modalBg.classList.remove("modal-visible");
}
