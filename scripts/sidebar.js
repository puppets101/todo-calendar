function sidebar() {
  updateClock();
  setInterval(updateClock, 1000);
  loadTodos();
}

function updateClock() {
  updateYear(date);
  updateMonth(date);
  updateWeekday(date);
  updateTime(date);
}

// Year
function updateYear(date) {
  const year = document.getElementById("year-clock");
  year.innerText = date.getFullYear();
}

// Date and Month
function updateMonth(date) {
  const month = document.getElementById("month-clock");
  month.innerText = getMonthString(date);
}

function getMonthString(date) {
  const dayOfMonth = date.getDate();
  const monthIndex = date.getMonth();

  let prefix = dayOfMonth + " ";
  prefix = formatDateValue(dayOfMonth + " ");

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

// Weekday
function updateWeekday(date) {
  const weekday = document.getElementById("weekday-clock");
  weekday.innerText = getWeekdayString(date);
}

function getWeekdayString(date) {
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

// Time
function updateTime(date) {
  const time = document.getElementById("time-clock");
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = formatDateValue(hours);
  minutes = formatDateValue(minutes);
  time.innerText = hours + ":" + minutes;
}

function formatDateValue(value) {
  if (value < 10) {
    return "0" + value;
  }
  return value;
}

function loadTodos() {
  updateTodaysTodoList();
}

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
