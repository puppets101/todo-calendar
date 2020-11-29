/**
 * Runs on load and calls sidebar functions
 */
function renderClockInSidebar() {
  renderYear(date);
  renderMonth(date);
  renderWeekday(date);
  renderTime(date);
}

/**
 * Render current year in sidebar
 * @param {Date} date
 */
function renderYear(date) {
  const year = document.getElementById("year-clock");
  year.innerText = date.getFullYear();
}

/**
 * Render current month in sidebar
 * @param {Date} date
 */
function renderMonth(date) {
  const month = document.getElementById("month-clock");
  month.innerText = formatMonthString(date);
}

/**
 * formats the dateobject to return day + month in a string
 * @param {Date} date
 */
function formatMonthString(date) {
  const dayOfMonth = date.getDate();
  const monthIndex = date.getMonth();

  let prefix = dayOfMonth + " ";
  prefix = formatDateString(dayOfMonth + " ");

  switch (monthIndex) {
    case 0:
      return prefix + "January";
    case 1:
      return prefix + "February";
    case 2:
      return prefix + "March";
    case 3:
      return prefix + "April";
    case 4:
      return prefix + "May";
    case 5:
      return prefix + "June";
    case 6:
      return prefix + "July";
    case 7:
      return prefix + "August";
    case 8:
      return prefix + "September";
    case 9:
      return prefix + "October";
    case 10:
      return prefix + "November";
    case 11:
      return prefix + "December";
  }
}

/**
 * Renders current weekday in sidebar
 * @param {Date} date
 */
function renderWeekday(date) {
  const weekday = document.getElementById("weekday-clock");
  weekday.innerText = formatWeekDay(date);
}

/**
 * Returns current day of the week index as a string
 * @param {Date} date
 */
function formatWeekDay(date) {
  const weekdayIndex = date.getDay();
  switch (weekdayIndex) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

/**
 * Render current time in sidebar
 * @param {Date} date
 */
function renderTime(date) {
  const time = document.getElementById("time-clock");
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = formatDateString(hours);
  minutes = formatDateString(minutes);
  time.innerText = hours + ":" + minutes;
}

/**
 * Helper function returning a formatted date string
 * @param {Date} value
 */
function formatDateString(value) {
  if (value < 10) {
    return "0" + value;
  }
  return value;
}

/**
 * Render todos for the day in a list in sidebar
 */
function updateTodaysTodoList() {
  const copyDate = new Date(date);
  const todaysTodoList = document.getElementById("sidebar-todays-todos");
  todaysTodoList.innerHTML = "";

  for (const todo of todoList) {
    if (todo.dateId === formatDate(copyDate)) {
      const liItem = document.createElement("li");
      const deleteButton = document.createElement("i");
      deleteButton.classList.add("fas", "fa-trash-alt");

      liItem.innerText = todo.title;
      liItem.classList.add("todos-list");
      todaysTodoList.appendChild(liItem).appendChild(deleteButton);

      deleteButton.addEventListener("click", function () {
        deleteTodo(todo);
      });
    }
  }
}
