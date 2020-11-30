window.addEventListener("load", start);

/**
 * Runs on load and starts the program
 */
function start() {
  getTodosFromLs();
  addTodoEventListeners();
  setInterval(renderClockInSidebar, 1000);
  updateTodaysTodoList();
  calendar();
}
