function calendar() {
  const date = new Date();
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);

  const currentMonth = startDate.getMonth();
  const daysArray = getDaysArray(startDate, currentMonth);

  calendarEventListeners();
  appendDayBoxes(daysArray);

  updateMonthInView(); // Denna ska ligga högst i hierakring. När next/prev-knappar klickas ska denna köras fast med satta parametrar
}

function calendarEventListeners() {
  /*
  nextButton = updateMonthInView(nextMonth)

  prevButton : updateMonthInView(prevMonth)
  */
}

function updateMonthInView(monthIndex, yearIndex) {
  /*
  Kör alla funktioner som bygger en ny månad i kalendern, baserat på parametrarna 
  */
}

function getDaysArray(startDate, currentMonth) {
  const daysArray = [];

  while (startDate.getMonth() === currentMonth) {
    daysArray.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
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

function appendDayBoxes(daysArray) {
  const firstDay = daysArray[0].getDay(); // Index för första dagen i månaden
  let dayIndex = 1; // Första cellen i griden motsvarar måndag, vilket är index 1 i daysArray

  for (let i = 0; i < 13; i++) {
    // Varför funkar inte i <= 7?
    if (dayIndex != firstDay && dayIndex < 7) {
      addBlank();
      dayIndex++;
      i++;
    } else {
      for (const day of daysArray) {
        addDay(day);
      }
      break;
    }
  }
}
