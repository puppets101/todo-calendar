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
    daysArray.push(new Date(copyDate));
    copyDate.setDate(copyDate.getDate() + 1);
  }
  console.log(startDate);
  return daysArray;
}

/**
 *
 * @param {Date} day - Date object
 */
function addDay(day) {
  const calendarGrid = document.getElementById("calendar-grid");
  const dayBox = document.createElement("div");
  dayBox.classList.add("daybox");
  dayBox.innerHTML = day.getDate();
  calendarGrid.appendChild(dayBox);
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

  const firstDay = daysArray[0].getDay();

  appendDayBoxes(firstDay, daysArray);
  console.log(firstDay);
}

function appendDayBoxes(firstDay, daysArray) {
  let dayIndex = 1; // Första cellen i griden motsvarar måndag, vilket är index 1 i daysArray

  for (let i = 0; i < 7; i++) {
    if (dayIndex != firstDay && dayIndex < 7) {
      addBlank();
      dayIndex++;
    }
  }

  for (const day of daysArray) {
    addDay(day);
  }
}

function clearGrid() {
  const calendarGrid = document.getElementById("calendar-grid");
  calendarGrid.innerHTML = "";
}
