/**
 * renders previous, current, and next month in header
 */
function renderMonthsInHeader() {
  const previousMonthText = document.getElementById("previous-month-text");
  const currentMonthBox = document.getElementById("current-month");
  const nextMonthText = document.getElementById("next-month-text");

  const currentMonthHeader = startDate.getMonth();
  const currentYearHeader = startDate.getFullYear();

  switch (currentMonthHeader) {
    case 0:
      previousMonthText.innerText = "December";
      currentMonthBox.innerText = "January" + " " + currentYearHeader;
      nextMonthText.innerText = "February";
      break;
    case 1:
      previousMonthText.innerText = "January";
      currentMonthBox.innerText = "February" + " " + currentYearHeader;
      nextMonthText.innerText = "March";
      break;
    case 2:
      previousMonthText.innerText = "February";
      currentMonthBox.innerText = "March" + " " + currentYearHeader;
      nextMonthText.innerText = "April";
      break;
    case 3:
      previousMonthText.innerText = "March";
      currentMonthBox.innerText = "April" + " " + currentYearHeader;
      nextMonthText.innerText = "May";
      break;
    case 4:
      previousMonthText.innerText = "April";
      currentMonthBox.innerText = "May" + " " + currentYearHeader;
      nextMonthText.innerText = "June";
      break;
    case 5:
      previousMonthText.innerText = "May";
      currentMonthBox.innerText = "June" + " " + currentYearHeader;
      nextMonthText.innerText = "July";
      break;
    case 6:
      previousMonthText.innerText = "June";
      currentMonthBox.innerText = "July" + " " + currentYearHeader;
      nextMonthText.innerText = "August";
      break;
    case 7:
      previousMonthText.innerText = "July";
      currentMonthBox.innerText = "August" + " " + currentYearHeader;
      nextMonthText.innerText = "September";
      break;
    case 8:
      previousMonthText.innerText = "August";
      currentMonthBox.innerText = "September" + " " + currentYearHeader;
      nextMonthText.innerText = "October";
      break;
    case 9:
      previousMonthText.innerText = "September";
      currentMonthBox.innerText = "October" + " " + currentYearHeader;
      nextMonthText.innerText = "November";
      break;
    case 10:
      previousMonthText.innerText = "October";
      currentMonthBox.innerText = "November" + " " + currentYearHeader;
      nextMonthText.innerText = "December";
      break;
    case 11:
      previousMonthText.innerText = "November";
      currentMonthBox.innerText = "December" + " " + currentYearHeader;
      nextMonthText.innerText = "January";
      break;
  }
}
