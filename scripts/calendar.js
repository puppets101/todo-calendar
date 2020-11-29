const date = new Date();
const startDate = new Date(date.getFullYear(), date.getMonth(), 1);

/**
 * Runs on load - intiates all calendar functions
 */
function calendar() {
  calendarEventListeners();
  renderMonthsInHeader();
  populateCalendar();
}

/**
 * sets event listeners for the calendar
 */
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

/**
 * Runs on load + every time we look at a new month
 */
function populateCalendar() {
  clearGrid();

  const currentMonth = startDate.getMonth();
  const daysArray = getDaysArray(currentMonth);

  const firstDay = daysArray[0].date.getDay();

  appendDayBoxes(firstDay, daysArray);
  renderSwedishHolidays();
}

/**
 * Helper function for animations and rendering previous month
 */
function handlePreviousClick() {
  startDate.setMonth(startDate.getMonth() - 1);

  // Declared in header.js
  renderMonthsInHeader();
  populateCalendar();
}

/**
 * Helper function for animations and rendering next month
 */
function handleNextClick() {
  startDate.setMonth(startDate.getMonth() + 1);

  // Declared in header.js
  renderMonthsInHeader();
  populateCalendar();
}

/**
 * populates an array with all days in active month
 * @param {Number} currentMonth Index representing the active month
 * @returns {Array<Object>} days in active month
 */
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

/**
 * Helper function to format date to a string
 * @returns {String} YYYY-MM-DD
 */
function formatDate(copyDate) {
  const year = copyDate.getFullYear();
  let month = copyDate.getMonth() + 1;
  let day = copyDate.getDate();

  // don't use ternary to assign something
  day < 10 ? (day = "0" + day) : day;
  month < 10 ? (month = "0" + month) : month;

  const formattedDate = String(year) + "-" + String(month) + "-" + String(day);

  return formattedDate;
}

/**
 * Opens a modal displaying all todos on a specific date
 * @param {Object} day represents one day in active month
 * @param {HTMLElement} dayPopup modal container
 */
function openDayPopup(day, dayPopup) {
  const popUpTodoList = document.getElementById("popup-todo-list");
  popUpTodoList.innerHTML = "";
  renderTodosInPopup(day, popUpTodoList, dayPopup);
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

/**
 *
 * @param {Object} day represents one day in active month
 * @param {HTMLElement} popUpTodoList list of todos on one day
 * @param {HTMLElement} dayPopup modal container
 */
function renderTodosInPopup(day, popUpTodoList, dayPopup) {
  for (const todo of todoList) {
    if (day.dateId === todo.dateId) {
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

/**
 * Appending one cell for each day in active month to calendar grid
 * @param {Object} day represents one day in active month
 * @param {Number} numberOfTodos represents number of todos on one day
 * @param {Array<Object>} daysArray days in active month
 */
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

/**
 * Appending one blank cell for each cell before the month starts
 */
function addBlank() {
  const calendarGrid = document.getElementById("calendar-grid");
  const blankBox = document.createElement("div");
  blankBox.classList.add("blankbox");
  calendarGrid.appendChild(blankBox);
}

/**
 * Checks on which weekday the month starts, append blank cell or day cell
 * @param {Number} firstDay number representing the weekday the month starts on
 * @param {Array<Object>} daysArray days in active month
 */
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
    addDay(day, numberOfTodos, daysArray);
    numberOfTodos = 0;
  }
}

/**
 * Empties the grid
 */
function clearGrid() {
  const calendarGrid = document.getElementById("calendar-grid");
  calendarGrid.innerHTML = "";
}

/**
 * Fetches swedish holidays from Svenska Dagar 2.1 (API)
 */
async function fetchSwedishHolidays() {
  const dataPath =
    "https://sholiday.faboul.se/dagar/v2.1/" +
    startDate.getFullYear() +
    "/" +
    (startDate.getMonth() + 1);
  const response = await fetch(dataPath);
  const result = await response.json();
  return result;
}

/**
 * Renders swedish holidays to day cells
 */
async function renderSwedishHolidays() {
  const result = await fetchSwedishHolidays();

  for (let i = 0; i < result.dagar.length; i++) {
    const holiday = result.dagar[i].helgdag;
    if (holiday) {
      const date = result.dagar[i].datum;
      const dayBox = document.getElementById(date);
      dayBox.append(holiday);
    }
  }
}
