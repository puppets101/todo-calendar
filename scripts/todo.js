/**
 * @param {Array<Object>} todo dateId, title, description
 */
let todoList = [];

/**
 * Initiate eventlisteners for todo.js file
 */
function addTodoEventListeners() {
  const openTodoModal = document.getElementById("add-todo-button");
  const todoModal = document.getElementById("new-todo-modal");
  const titleInput = document.getElementById("todo-title");
  const descriptionInput = document.getElementById("todo-description");
  const dateInput = document.getElementById("todo-date");
  const modalBg = document.getElementById("modal-bg");
  const exitModalButton = document.getElementById("exit-modal-button");

  // OPEN CREATE TODO MODAL BUTTON
  openTodoModal.addEventListener("click", function () {
    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value = formatDate(new Date());
    openModal(todoModal, modalBg);
  });

  // EXIT CREATE TODO MODAL BUTTON
  exitModalButton.addEventListener("click", function () {
    todoModal.classList.remove("modal-visible");
    modalBg.classList.remove("modal-visible");
    titleInput.value = "";
  });

  // EXIT CREATE TODO MODAL BACKGROUND
  modalBg.addEventListener("click", function () {
    closeModal(todoModal, modalBg);
  });

  // CREATE TODO ON BUTTON CLICK + ERROR HANDLING
  const createTodoButton = document.getElementById("create-todo-button");
  createTodoButton.addEventListener("click", function () {
    const noTitle = "Please add a title";

    if (titleInput.value === "" || titleInput.value === noTitle) {
      titleInput.classList.add("text-red-500");
      titleInput.value = noTitle;
      titleInput.onfocus = function () {
        titleInput.classList.remove("text-red-500");
        titleInput.value = "";
      };
    } else {
      addNewTodo(titleInput.value, descriptionInput.value, dateInput.value);
      updateTodaysTodoList();
      closeModal(todoModal, modalBg);
    }
  });
}

/**
 * Runs on load and saves all todos from local storage to the dateList array
 */
function getTodosFromLs() {
  try {
    todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  } catch (error) {
    console.error("error parsing todolist in LS");
    todolist = [];
  }
}

/**
 * pushes a todo object to the todo array and saves the array to local storage
 * @param {String} titleInput Todo title in add new todo modal
 * @param {String} descriptionInput Todo description in add new todo modal
 * @param {String} dateInput Todo date in add new todo modal
 */
function addNewTodo(titleInput, descriptionInput, dateInput) {
  const todoObject = {
    title: titleInput,
    description: descriptionInput,
    dateId: dateInput,
  };

  todoList.push(todoObject);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  populateCalendar();
}

/**
 * Sets the create new todo modal to visible
 * @param {HTMLElement} modal Create new todo modal
 * @param {HTMLElement} modalBg Calendar background
 */
function openModal(modal, modalBg) {
  modal.classList.add("modal-visible");
  modalBg.classList.add("modal-visible");
}

/**
 * Sets the create new todo modal to hidden
 * @param {HTMLElement} modal Create new todo modal
 * @param {HTMLElement} modalBg Calendar background
 */
function closeModal(modal, modalBg) {
  modal.classList.remove("modal-visible");
  modalBg.classList.remove("modal-visible");
}

/**
 * Removes a todo object from the todo array and saves the array to local storage
 * @param {Array<Object} todo dateId, title, description
 */
function deleteTodo(todo) {
  const index = todoList.indexOf(todo);
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  updateTodaysTodoList();
  populateCalendar();
}
