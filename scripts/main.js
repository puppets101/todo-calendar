window.addEventListener("load", start);

/**
 * Runs on load and starts the program
 */
function start() {
  getTodosFromLs();
  addTodoEventListeners();
  renderClockInSidebar();
  setInterval(renderClockInSidebar, 1000);
  updateTodaysTodoList();
  calendar();
}
