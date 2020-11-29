/**
 * @param {Array<Object>} todo dateId, title, description
 */
let todoList = [
  /*
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
  */
];

function todo() {
  addTodoEventListeners();
  console.log(todoList);
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
    closeModal(todoModal, modalBg);
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

  // CREATE TODO ON ENTER
  // add if for checking if modal is open
  // todoTitleInput.addEventListener("keyup", function (event) {
  //   if (event.key === "Enter") {
  //     updateTodoList();
  //     closeModal(todoModal, modalBg);
  //   }
  // });
}

function getTodosFromLs() {
  todoList = JSON.parse(localStorage.getItem("todoList")) || [];
}

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

function openModal(modal, modalBg) {
  modal.classList.add("modal-visible");
  modalBg.classList.add("modal-visible", "modal-opacity");
  setTimeout(function () {
    modal.classList.add("modal-opacity", "modal-size");
  }, 100);
}

function closeModal(modal, modalBg) {
  modal.classList.remove("modal-opacity", "modal-size");
  modalBg.classList.remove("modal-opacity");
  setTimeout(function () {
    modal.classList.remove("modal-visible");
    modalBg.classList.remove("modal-visible");
  }, 200);
  clearTimeout();
}

function deleteTodo(todo) {
  const index = todoList.indexOf(todo);
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  updateTodaysTodoList();
  populateCalendar();
}
