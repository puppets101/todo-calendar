window.addEventListener("load", start);

/**
 * Runs on load and starts the program
 */
function start() {
  getTodosFromLs();
  addTodoEventListeners();
  sidebar();
  updateTodaysTodoList();
  calendar();
}

/**
 * Helper function to format date to a string
 * @param {Date} copyDate Date to format
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
