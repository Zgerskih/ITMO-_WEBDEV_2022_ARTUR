import TodoVO from './src/model/vos/TodoVO.js';

const domInputTodoTitle = document.getElementById('inputTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domBtnCreateTodo.addEventListener('keyup', onBtnCreateTodoClick);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log('> Initial value -> listOfTodos', listOfTodos);

rendertodo(listOfTodos, domListOfTodos);

function onBtnCreateTodoClick(e) {
  // console.log("> domBtnCreateTodo -> handle(click)", e);
  const todoTitleValueFromDomInput = domInputTodoTitle.value;
  // console.log(">domBtnCreateTodo -> todoInputTodoTitleValue:", todoTitleValueFromDomInput);
  if (validateTodoInputTitleValue(todoTitleValueFromDomInput)) {
    listOfTodos.push(TodoVO.createFromTitle(todoTitleValueFromDomInput));
    localStorage.setItem('listOfTodos', JSON.stringify(listOfTodos));
    rendertodo(listOfTodos, domListOfTodos);
  }
}

function onInputTodoTitleKeyup(event) {
  console.log('> onInputTodoTitleKeyup:', event);
  const inputValue = event.currentTarget.value;
  console.log('>onInputTodoTitleKeyup:', inputValue);
}

function validateTodoInputTitleValue(value) {
  const isInputValueString = typeof value === 'string';
  const isInputValueNotNumber = isNaN(parseInt(value));
  const result = isInputValueString && isInputValueNotNumber && value.length > 0;
  console.log('> validateTodoInputTitelValue -> result', {
    result,
    isInputValueString,
    isInputValueNotNumber,
  });
  return result;
}
function createToDoVO(title) {
  const todoId = Date.now().toString();
  return new TodoVO(todoId, title);
}
function rendertodo(list, container) {
  let output = '';
  for (let index in listOfTodos) {
    output += `<li>${listOfTodos[index].title}</li>`;
  }
  container.innerHTML = output;
  domInputTodoTitle.value = 'Todo text';

  console.log('> dominputTodoTitle', domInputTodoTitle, domBtnCreateTodo, domListOfTodos);
}

function localStorageListOf(key) {
  const value = localStorage.getItem(key);
  console.log('> localStorageListOf: value =', value);

  if (value == null) return [];

  const parsedValue = JSON.parse(value);
  const isValueArray = Array.isArray(value);
  return isValueArray ? JSON.parse(value) : [];
}
/**
 const greeting = "${name} |  ${surname} | ${company}"
 function welcome(name, surname = "", company = "") {
console.log(`> welcome ${name} |  ${surname} | ${company}`);
return greeting;
}
 console.log(welcome("Artur"));
 */
