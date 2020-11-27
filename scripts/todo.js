/**
 * @param {Array<Object>} todo dateId, title, description
 */
const todoList = [
  {
    dateId: "2020-11-25",
    title: "Wash clothes",
    description:
      "Hej jag heter herman och jag kommer från växjö bla bla bla bla bla bla bla bla ",
  },
  {
    dateId: "2020-11-25",
    title: "clean apartment",
    description: "Remember to vacuum and wipe floors",
  },
  {
    dateId: "2020-11-20",
    title: "Mow the lawn",
    description: "Use the lawnmower",
  },
  {
    dateId: "2021-01-10",
    title: "clean new years mess",
    description: "clean god dammit'",
  },
];

function todo() {
  addTodoEventListeners();
}

function addTodoEventListeners() {
  const openTodoModal = document.getElementById("add-todo-button");
  const todoModal = document.getElementById("new-todo-modal");
  const titleInput = document.getElementById("todo-title");
  const descriptionInput = document.getElementById("todo-description");
  const dateInput = document.getElementById("todo-date");
  const modalBg = document.getElementById("modal-bg");
  const exitModalButton = document.getElementById("exit-modal-button");

  // OPEN MODAL BUTTON
  openTodoModal.addEventListener("click", function () {
    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value = formatDate(new Date());
    openModal(todoModal, modalBg);
  });

  // EXIT MODAL BUTTON
  exitModalButton.addEventListener("click", function () {
    todoModal.classList.remove("modal-visible");
    modalBg.classList.remove("modal-visible");
    titleInput.value = "";
  });

  // EXIT MODAL BACKGROUND
  modalBg.addEventListener("click", function () {
    closeModal(todoModal, modalBg);
  });

  // CREATE TODO ON BUTTON CLICK
  const createTodoButton = document.getElementById("create-todo-button");
  createTodoButton.addEventListener("click", function () {
    const noTitle = "Please add a title";

    if (titleInput.value === "" || titleInput.value === noTitle) {
      titleInput.classList.add("text-red-500");
      titleInput.value = noTitle;
    } else {
      titleInput.classList.remove("text-red-500");
      addNewTodo(titleInput.value, descriptionInput.value, dateInput.value);
      updateTodaysTodoList();
      closeModal(todoModal, modalBg);
    }
  });

  // CREATE TODO ON ENTER
  // add if for checking if modal is open
  // todoTitleInput.addEventListener("keyup", function (event) {
  //   if (event.key === "Enter") {
  //     updateTodoList();
  //     closeModal(todoModal, modalBg);
  //   }
  // });
}

function addNewTodo(titleInput, descriptionInput, dateInput) {
  const todoObject = {
    title: titleInput,
    description: descriptionInput,
    dateId: dateInput,
  };
  todoList.push(todoObject);
  populateCalendar();
}

function openModal(modal, modalBg) {
  modal.classList.add("modal-visible");
  modalBg.classList.add("modal-visible");
}

function closeModal(modal, modalBg) {
  modal.classList.remove("modal-visible");
  modalBg.classList.remove("modal-visible");
}

function deleteTodo(todo) {
  const index = todoList.indexOf(todo);
  todoList.splice(index, 1);
  updateTodaysTodoList();
  populateCalendar();
}
