window.onload = addEventListener("load", start);

function start() {
  mainEventListeners();
  renderMonthsInHeader();
}

function mainEventListeners() {}

function renderMonthsInHeader() {
  const previousMonthText = document.getElementById("previous-month");
  const currentMonthBox = document.getElementById("current-month");
  const nextMonthText = document.getElementById("next-month");

  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  switch (currentMonth) {
    case 0:
      previousMonthText.innerText = "December";
      currentMonthBox.innerText = "January" + " " + currentYear;
      nextMonthText.innerText = "February";
      break;
    case 1:
      previousMonthText.innerText = "January";
      currentMonthBox.innerText = "February" + " " + currentYear;
      nextMonthText.innerText = "March";
      break;
    case 2:
      previousMonthText.innerText = "February";
      currentMonthBox.innerText = "March" + " " + currentYear;
      nextMonthText.innerText = "April";
      break;
    case 3:
      previousMonthText.innerText = "March";
      currentMonthBox.innerText = "April" + " " + currentYear;
      nextMonthText.innerText = "May";
      break;
    case 4:
      previousMonthText.innerText = "April";
      currentMonthBox.innerText = "May" + " " + currentYear;
      nextMonthText.innerText = "June";
      break;
    case 5:
      previousMonthText.innerText = "May";
      currentMonthBox.innerText = "June" + " " + currentYear;
      nextMonthText.innerText = "July";
      break;
    case 6:
      previousMonthText.innerText = "June";
      currentMonthBox.innerText = "July" + " " + currentYear;
      nextMonthText.innerText = "August";
      break;
    case 7:
      previousMonthText.innerText = "July";
      currentMonthBox.innerText = "August" + " " + currentYear;
      nextMonthText.innerText = "September";
      break;
    case 8:
      previousMonthText.innerText = "August";
      currentMonthBox.innerText = "September" + " " + currentYear;
      nextMonthText.innerText = "October";
      break;
    case 9:
      previousMonthText.innerText = "September";
      currentMonthBox.innerText = "October" + " " + currentYear;
      nextMonthText.innerText = "November";
      break;
    case 10:
      previousMonthText.innerText = "October";
      currentMonthBox.innerText = "November" + " " + currentYear;
      nextMonthText.innerText = "December";
      break;
    case 11:
      previousMonthText.innerText = "November";
      currentMonthBox.innerText = "December" + " " + currentYear;
      nextMonthText.innerText = "January";
      break;
  }
}
