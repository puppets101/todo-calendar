const date = new Date();
const startDate = new Date(date.getFullYear(), date.getMonth(), 1);

function calendar() {
  calendarEventListeners();
  renderMonthsInHeader();
  populateCalendar();
}

function calendarEventListeners() {
  const prevMonthBtn = document.getElementById("previous-month");
  const nextMonthBtn = document.getElementById("next-month");

  prevMonthBtn.addEventListener("click", () => {
    handlePreviousClick();
  });
  nextMonthBtn.addEventListener("click", () => {
    handleNextClick();
  });
}

function handlePreviousClick() {
  startDate.setMonth(startDate.getMonth() - 1);

  // Declared in header.js
  renderMonthsInHeader();
  populateCalendar();
}

function handleNextClick() {
  startDate.setMonth(startDate.getMonth() + 1);

  // Declared in header.js
  renderMonthsInHeader();
  populateCalendar();
}

function getDaysArray(currentMonth) {
  const daysArray = [];
  const copyDate = new Date(startDate);

  while (copyDate.getMonth() === currentMonth) {
    daysArray.push({
      date: new Date(copyDate),
      dateId: formatDate(copyDate),
    });
    copyDate.setDate(copyDate.getDate() + 1);
  }
  return daysArray;
}

function formatDate(copyDate) {
  const dateToFormat = new Date(copyDate);

  const year = copyDate.getFullYear();
  let month = copyDate.getMonth() + 1;
  let day = copyDate.getDate();

  day < 10 ? (day = "0" + day) : day;
  month < 10 ? (month = "0" + month) : month;

  const formattedDate = String(year) + "-" + String(month) + "-" + String(day);

  return formattedDate;
}

function addDay(day, numberOfTodos, daysArray) {
  const calendarGrid = document.getElementById("calendar-grid");
  const dayPopup = document.getElementById("day-popup");
  const dayBox = document.createElement("div");
  const datePara = document.createElement("p");
  const todoPara = document.createElement("p");

  dayBox.addEventListener("click", function () {
    openDayPopup(day, dayPopup, daysArray);
  });

  dayBox.classList.add("daybox");
  todoPara.classList.add("daybox-todo-number");

  datePara.innerText = day.date.getDate();
  if (numberOfTodos != 0) {
    todoPara.innerText = numberOfTodos;
  }

  calendarGrid.appendChild(dayBox);
  dayBox.appendChild(datePara);
  dayBox.appendChild(todoPara);
}

function openDayPopup(day, dayPopup, daysArray) {
  const popUpTodoList = document.getElementById("popup-todo-list");
  popUpTodoList.innerHTML = "";
  renderTodosInPopup(day, popUpTodoList);
  const modalBg = document.getElementById("modal-bg");

  openModal(dayPopup, modalBg);
  const dayPopupDate = document.getElementById("popup-date");
  dayPopupDate.innerText = getMonthString(day.date);

  const exitButton = document.getElementById("exit-day-popup");
  exitButton.addEventListener("click", () => {
    closeModal(dayPopup, modalBg);
  });
  modalBg.addEventListener("click", function () {
    closeModal(dayPopup, modalBg);
  });
}

function renderTodosInPopup(day, popUpTodoList) {
  for (const todo of todoList) {
    if (day.dateId === todo.dateId) {
      const todoTitle = document.createElement("p");
      const todoDescription = document.createElement("p");
      const divider = document.createElement("hr");

      todoTitle.innerText = todo.title;
      todoTitle.classList.add("pb-1");
      divider.classList.add("pb-4");
      todoDescription.innerText = todo.description;
      popUpTodoList.appendChild(todoTitle);
      popUpTodoList.appendChild(todoDescription);
      popUpTodoList.appendChild(divider);
    }
  }
}

function addBlank() {
  const calendarGrid = document.getElementById("calendar-grid");
  const blankBox = document.createElement("div");
  blankBox.classList.add("blankbox");
  calendarGrid.appendChild(blankBox);
}

function populateCalendar() {
  clearGrid();
  const currentMonth = startDate.getMonth();
  const daysArray = getDaysArray(currentMonth);

  const firstDay = daysArray[0].date.getDay();

  appendDayBoxes(firstDay, daysArray);
}

function appendDayBoxes(firstDay, daysArray) {
  let dayIndex = 1; // Första cellen i griden motsvarar måndag, vilket är index 1 i daysArray
  let numberOfTodos = 0;

  for (let i = 0; i < 7; i++) {
    if (dayIndex != firstDay && dayIndex < 7) {
      addBlank();
      dayIndex++;
    }
  }

  for (const day of daysArray) {
    for (const todo of todoList) {
      if (day.dateId === todo.dateId) {
        numberOfTodos++;
      }
    }
    addDay(day, numberOfTodos, daysArray); // Loopa genom daysArray och todoList och jämför med dateId
    numberOfTodos = 0;
  }
}

function clearGrid() {
  const calendarGrid = document.getElementById("calendar-grid");
  calendarGrid.innerHTML = "";
}
