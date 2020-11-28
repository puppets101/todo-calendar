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

function populateCalendar() {
  clearGrid();
  // clearSwedishHolidays();

  const currentMonth = startDate.getMonth();
  const daysArray = getDaysArray(currentMonth);

  const firstDay = daysArray[0].date.getDay();

  appendDayBoxes(firstDay, daysArray);
  fetchSwedishHolidays();
}

function handlePreviousClick() {
  const calendarGrid = document.getElementById("calendar-grid");
  runPrevMonthAnimation(calendarGrid, 500);
  startDate.setMonth(startDate.getMonth() - 1);

  // Declared in header.js
  renderMonthsInHeader();
  populateCalendar();
}

function handleNextClick() {
  const calendarGrid = document.getElementById("calendar-grid");
  runNextMonthAnimation(calendarGrid, 500);

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

function openDayPopup(day, dayPopup) {
  const popUpTodoList = document.getElementById("popup-todo-list");
  const modalBg = document.getElementById("modal-bg");
  const exitButton = document.getElementById("exit-day-popup");

  const dayPopupDate = document.getElementById("popup-date");
  popUpTodoList.innerHTML = "No todos on this day yet!";
  dayPopupDate.innerText = getMonthString(day.date);

  renderTodosInPopup(day, popUpTodoList, dayPopup);
  openModal(dayPopup, modalBg);

  exitButton.addEventListener("click", function () {
    closeModal(dayPopup, modalBg);
  });
  modalBg.addEventListener("click", function () {
    closeModal(dayPopup, modalBg);
  });
}

// Think of a way to re-write
function renderTodosInPopup(day, popUpTodoList, dayPopup) {
  for (const todo of todoList) {
    if (day.dateId === todo.dateId) {
      popUpTodoList.innerHTML = "";
      const todoTitle = document.createElement("p");
      const todoDescription = document.createElement("p");
      const divider = document.createElement("hr");
      const deleteTodoButton = document.createElement("i");
      deleteTodoButton.classList.add("fas", "fa-trash-alt");

      todoTitle.innerText = todo.title;
      todoTitle.classList.add("pb-1");
      divider.classList.add("pb-4");
      todoDescription.innerText = todo.description;
      popUpTodoList.appendChild(todoTitle).appendChild(deleteTodoButton);
      popUpTodoList.appendChild(todoDescription);
      popUpTodoList.appendChild(divider);
      deleteTodoButton.addEventListener("click", function () {
        deleteTodo(todo);
        openDayPopup(day, dayPopup);
      });
    }
  }
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
  dayBox.id = day.dateId;
  todoPara.classList.add("daybox-todo-number");

  datePara.innerText = day.date.getDate();
  if (numberOfTodos != 0) {
    todoPara.innerText = numberOfTodos;
  }

  calendarGrid.appendChild(dayBox);
  dayBox.appendChild(datePara);
  dayBox.appendChild(todoPara);
}

function addBlank() {
  const calendarGrid = document.getElementById("calendar-grid");
  const blankBox = document.createElement("div");
  blankBox.classList.add("blankbox");
  calendarGrid.appendChild(blankBox);
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

async function fetchSwedishHolidays() {
  const dataPath =
    "https://sholiday.faboul.se/dagar/v2.1/" +
    startDate.getFullYear() +
    "/" +
    (startDate.getMonth() + 1);
  const result = await fetch(dataPath);
  const response = await result.json();

  for (let i = 0; i < response.dagar.length; i++) {
    const holiday = response.dagar[i].helgdag;
    if (holiday) {
      const date = response.dagar[i].datum;
      const dayBox = document.getElementById(date);
      dayBox.append(holiday);
    }
  }
}

function clearSwedishHolidays() {
  while (swedishHolidays.length > 0) {
    swedishHolidays.pop();
  }
}
