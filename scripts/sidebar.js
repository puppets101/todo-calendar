window.addEventListener('load', sidebar);

function sidebar() {
  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  const date = new Date();
  
  updateYear(date); 
  updateMonth(date);
  updateWeekday(date);
  updateTime(date);
}

// Year
function updateYear(date) {
  const year = document.getElementById('year-clock');
  year.innerText = date.getFullYear();
}

// Date and Month
function updateMonth(date) {
  const month = document.getElementById('month-clock');
  month.innerText = getMonthString(date);
}

function getMonthString(date) {
  const dayOfMonth = date.getDate();
  const monthIndex = date.getMonth();

  let prefix = dayOfMonth + ' ';
  prefix = formatDateValue(dayOfMonth + ' ');

  switch(monthIndex) {
    case 0: return prefix + 'January';
    case 1: return prefix + 'February';
    case 2: return prefix + 'March';
    case 3: return prefix + 'April';
    case 4: return prefix + 'May';
    case 5: return prefix + 'June';
    case 6: return prefix + 'July';
    case 7: return prefix + 'August';
    case 8: return prefix + 'September';
    case 9: return prefix + 'October';
    case 10: return prefix + 'November';
    case 11: return prefix + 'December';
  }
}

// Weekday
function updateWeekday(date) {
  const weekday = document.getElementById('weekday-clock')
  weekday.innerText = getWeekdayString(date);
}

function getWeekdayString(date) {
  const weekdayIndex = date.getDay();
  switch (weekdayIndex) {
    case 0: return 'Sunday';
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thursday';
    case 5: return 'Friday';
    case 6: return 'Saturday';
  }
}

// Time
function updateTime(date) {
  const time = document.getElementById('time-clock');
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = formatDateValue(hours);
  minutes = formatDateValue(minutes);
  time.innerText = hours + ':' + minutes; 
}

function formatDateValue(value) {
  if (value < 10) {
    return '0' + value;
  }
  return value;
}