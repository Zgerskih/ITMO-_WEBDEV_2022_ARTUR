import TodoVO from './src/model/vos/TodoVO.js';

const domInputTodoTitle = document.getElementById('inputTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domBtnCreateTodo.addEventListener('keyup', onInputTodoTitleKeyup);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log('> Initial value -> listOfTodos', listOfTodos);

rendertodo(listOfTodos, domListOfTodos);
disableButtonWhenTextInvalid(domBtnCreateTodo, domInputTodoTitle.value);

function onBtnCreateTodoClick(e) {
  console.log("> domBtnCreateTodo -> handle(click)", e);
  const todoTitleValueFromDomInput = domInputTodoTitle.value;
  // console.log(">domBtnCreateTodo -> todoInputTodoTitleValue:", todoTitleValueFromDomInput);
  if (isStringNotNumberAndNotEmpty(todoTitleValueFromDomInput)) {
    listOfTodos.push(TodoVO.createFromTitle(todoTitleValueFromDomInput));
    localStorage.setItem('listOfTodos', JSON.stringify(listOfTodos));
    rendertodo(listOfTodos, domListOfTodos);
  }
}

function onInputTodoTitleKeyup(event) {
  console.log('> onInputTodoTitleKeyup:', event);
  const inputValue = event.currentTarget.value;
  console.log('>onInputTodoTitleKeyup:', inputValue);
  disableButtonWhenTextInvalid(domBtnCreateTodo, inputValue);
}

function isStringNotNumberAndNotEmpty(value) {
  const isvalueString = typeof value === 'string';
  const isValueNotNumber = isNaN(parseInt(value));
  const result = isvalueString && isValueNotNumber && value.length > 0;
  console.log('> validateTodoInputTitelValue -> result', {
    result,
    isInputValueString: isvalueString,
    isInputValueNotNumber: isValueNotNumber,
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

function disableButtonWhenTextInvalid(button, text, validateFunction, { textWhenDisabled, textWhenEnabled }) {
  if (!validateFunction) throw new Error('Validate method must be defined');

  if (validateFunction(text)) {
    button.disabled = false;
    if (textWhenEnabled) button.textContent = textWhenEnabled;
  } else {
    button.disabled = true;
    if (textWhenDisabled) button.textContent = textWhenDisabled;
  }
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
