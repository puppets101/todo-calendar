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
