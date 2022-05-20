import Fetch from './fetch-wrapper.js';

const baseURL = 'https://api.learnjavascript.online/demo';
const API = new Fetch(baseURL);
const form = document.querySelector('#todo-form');
const todoList = document.querySelector('#todos-list');
const btn = document.querySelector('#button-add');

const renderTodoList = (todos) => {
 todoList.innerHTML = '';
 todos.forEach((todo) => {
  todoList.insertAdjacentHTML(
   'beforeend',
   `<li><div class="card">
         [${todo.category}] ${todo.title}</div></li>`
  );
 });
};

const renderTodo = () => {
 // fetch all the current todos
 API.get('/todos').then((data) => renderTodoList(data.todos));
};
const updateTodo = (event) => {
 event.preventDefault();
 const title = document.querySelector('#todo-title');
 const category = document.querySelector('#todo-category');
 const body = { title: title.value, category: category.value };
 // post new todo and update list
 btn.setAttribute('disabled', 'disabled');
 API.put('/todos', body)
  .then(() => renderTodo())
  .finally(() => btn.removeAttribute('disabled'));
};

form.addEventListener('submit', updateTodo);

renderTodo();
