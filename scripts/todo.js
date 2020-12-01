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
  const modalTitle = document.getElementById("modal-title");
  // OPEN CREATE TODO MODAL BUTTON
  openTodoModal.addEventListener("click", function () {
    modalTitle.innerText = "Create New Todo";
    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value = formatDate(new Date());
    openModal(todoModal, modalBg);
  });

  // EXIT CREATE TODO MODAL BUTTON
  exitModalButton.addEventListener("click", function () {
    closeModal();
  });

  // EXIT CREATE TODO MODAL BACKGROUND
  modalBg.addEventListener("click", function () {
    closeModal();
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
      closeModal();
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
 * Pushes a todo object to the todo array and saves the array to local storage
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
 * Add functionality to edit todo in popup box and set to LS
 * @param {Array<Object>} todo dateId, title, description
 */
function editTodo(todo) {
  const todoModal = document.getElementById("edit-todo-modal");
  const titleInput = document.getElementById("edit-todo-title");
  const descriptionInput = document.getElementById("edit-todo-description");
  const dateInput = document.getElementById("edit-todo-date");
  const modalBg = document.getElementById("modal-bg");
  const saveTodoButton = document.getElementById("save-todo-button");
  const exitModalButton = document.getElementById("exit-edit-modal-button");
  titleInput.value = todo.title;
  descriptionInput.value = todo.description;
  dateInput.value = todo.dateId;
  openModal(todoModal, modalBg);

  const todoIndex = todoList.findIndex(
    (todo) => todo.title === titleInput.value
  );

  exitModalButton.addEventListener("click", function () {
    closeModal();
  });

  saveTodoButton.addEventListener("click", function () {
    const noTitle = "Please add a title";

    if (titleInput.value === "" || titleInput.value === noTitle) {
      titleInput.classList.add("text-red-500");
      titleInput.value = noTitle;
      titleInput.onfocus = function () {
        titleInput.classList.remove("text-red-500");
        titleInput.value = "";
      };
    } else {
      todoList[todoIndex].title = titleInput.value;
      todoList[todoIndex].description = descriptionInput.value;
      todoList[todoIndex].dateId = dateInput.value;
      localStorage.setItem("todoList", JSON.stringify(todoList));
      updateTodaysTodoList();
      closeModal();
    }
  });
}

/**
 * Sets the create new todo modal to visible
 * @param {HTMLElement} modal Create new todo modal
 * @param {HTMLElement} modalBg Calendar background
 */
function openModal(modal, modalBg) {
  modal.classList.add("modal-visible");
  modalBg.classList.add("modal-visible", "modal-opacity");
  setTimeout(function () {
    modal.classList.add("modal-opacity", "modal-size");
  }, 100);
}

/**
 * Sets the create new todo modal to hidden
 * @param {HTMLElement} modal Create new todo modal
 * @param {HTMLElement} modalBg Calendar background
 */
function closeModal() {
  const modals = document.querySelectorAll(".modal");
  const modalBgs = document.querySelectorAll(".new-modal-bg");
  for (const modal of modals) {
    modal.classList.remove("modal-opacity", "modal-size");
    setTimeout(function () {
      modal.classList.remove("modal-visible");
    }, 200);
  }
  for (const modalBg of modalBgs) {
    setTimeout(function () {
      modalBg.classList.remove("modal-visible");
      modalBg.classList.remove("modal-opacity");
    }, 200);
  }
}

/**
 * Removes a todo object from the todo array and saves the array to local storage
 * @param {Array<Object>} todo dateId, title, description
 */
function deleteTodo(todo) {
  const index = todoList.indexOf(todo);
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  updateTodaysTodoList();
  populateCalendar();
}

/* function updateTodoValues() {
  const todoIndex = todoList.findIndex(
    (todo) => todo.title === titleInput.value
  );
  todoList[todoIndex].title = titleInput.value;
  todoList[todoIndex].description = descriptionInput.value;
  todoList[todoIndex].dateId = dateInput.value;
}
 */
