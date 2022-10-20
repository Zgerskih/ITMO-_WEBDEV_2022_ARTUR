import TodoVO from './src/model/vos/TodoVO.js';

const domInpTodoTitle = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domInpTodoTitle.addEventListener('keyup', onInpTodoTitleKeyup);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log('> Initial value -> listOfTodos', listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos);
disableButtonWhenTextInvalid(
  domBtnCreateTodo,
  domInpTodoTitle.value,
  isStringNotNumberAndNotEmpty,
  {
    textWhenEnabled: 'Create',
    textWhenDisabled: 'Enter text',
  }
);

function onBtnCreateTodoClick() {
  // console.log('> domBtnCreateTodo -> handle(click)', event);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  // console.log('> domBtnCreateTodo -> todoInputTitleValue:', todoTitleValueFromDomInput);
  if (isStringNotNumberAndNotEmpty(todoTitleValueFromDomInput)) {
    listOfTodos.push(TodoVO.createFromTitle(todoTitleValueFromDomInput));
    localStorage.setItem(LOCAL_LIST_OF_TODOS, JSON.stringify(listOfTodos));
    renderTodoListInContainer(listOfTodos, domListOfTodos);
  }
}

function onInpTodoTitleKeyup(event) {
  // console.log('> onInpTodoTitleKeyup:', event);
  const inputValue = event.currentTarget.value;
  // console.log('> onInpTodoTitleKeyup:', inputValue);
  disableButtonWhenTextInvalid(
    domBtnCreateTodo,
    inputValue,
    isStringNotNumberAndNotEmpty,
    {
      textWhenEnabled: 'Create',
      textWhenDisabled: 'Enter text',
    }
  );
}

function isStringNotNumberAndNotEmpty(value) {
  const isValueString = typeof value === 'string';
  const isValueNotNumber = isNaN(parseInt(value));

  const result = isValueString && isValueNotNumber && value.length > 0;

  console.log('> isStringNotNumberAndNotEmpty -> result', {
    result,
    isInputValueString: isValueString,
    isInputValeNotNumber: isValueNotNumber,
  });
  return result;
}

function localStorageListOf(key) {
  const value = localStorage.getItem(key);
  console.log('> localStorageListOf: value =', value);
  if (value === null) return [];
  const parsedValue = JSON.parse(value);
  const isParsedValueArray = Array.isArray(parsedValue);
  return isParsedValueArray ? parsedValue : [];
}

function disableButtonWhenTextInvalid(
  button,
  text,
  validateTextFunction,
  { textWhenDisabled, textWhenEnabled } = {}
) {
  if (!validateTextFunction) throw new Error('Validate method must be defined');

  if (validateTextFunction(text)) {
    button.disabled = false;
    if (textWhenEnabled) button.textContent = textWhenEnabled;
  } else {
    button.disabled = true;
    if (textWhenDisabled) button.textContent = textWhenDisabled;
  }
}

function renderTodoListInContainer(list, container) {
  let output = '';
  let item;
  for (let index in list) {
    item = list[index];
    output += `<li>${item.title}</li>`;
  }
  container.innerHTML = output;
}
