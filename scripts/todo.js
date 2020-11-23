const todoState = [
  {
    title: 'Shop food',
    date: new Date()
  },
  {
    title: 'Cook food',
    date: new Date()
  },
  {
    title: 'Eat food',
    date: new Date()
  },
];

function todo() {
  addTodoEventListeners();
}

function addTodoEventListeners() {
  const addTodoButton = document.getElementById('add-todo-button');
  addTodoButton.addEventListener('click', function() {
    const todoObject = {
      title: 'Wash Clothes',
      date: new Date()
    }
    todoState.push(todoObject);
    showTodos();
  });
}