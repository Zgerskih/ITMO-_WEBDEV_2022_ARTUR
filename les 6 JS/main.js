import TodoVO from './src/model/vos/TodoVO.js';
import {disableButtonWhenTextInvalid} from "./src/model/utils/domUtils.js";
import {isStringNotNumberAndNotEmpty} from "./src/model/utils/StringUtils.js";
import {localStorageListOf, localStorageSaveListOfWithKey} from "./src/model/utils/databaseUtils.js";
import TodoView from "./src/wiew/TodoView.js";

const domInpTodoTitle = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domInpTodoTitle.addEventListener('keyup', onInpTodoTitleKeyup);
domListOfTodos.addEventListener('change', onTodoListChange);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log('> Initial value -> listOfTodos', listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos);
disableButtonWhenTextInvalid( domBtnCreateTodo, domInpTodoTitle.value, isStringNotNumberAndNotEmpty, );

function onTodoListChange(event) {
  console.log('> onTodoListChange -> event:', event);
  const target = event.target;
  const index = target.id;
  if (index && typeof index === 'string'){
    const indexInt = parseInt(index.trim())
    const todoVO = listOfTodos[index];
    console.log('> onTodoListChange -> todoVO:', todoVO);
    console.log('> onTodoListChange -> index:', index);
    todoVO.isCompleted = !!target.checked;
    saveListOfTodo();
      }
  }
function onBtnCreateTodoClick() {
  // console.log('> domBtnCreateTodo -> handle(click)', event);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  // console.log('> domBtnCreateTodo -> todoInputTitleValue:', todoTitleValueFromDomInput);
  if (isStringNotNumberAndNotEmpty(todoTitleValueFromDomInput)) {
    listOfTodos.push(TodoVO.createFromTitle(todoTitleValueFromDomInput));
    saveListOfTodo();
    renderTodoListInContainer(listOfTodos, domListOfTodos);
    domInpTodoTitle.value = '';
  }
}
function onInpTodoTitleKeyup(event) {
  // console.log('> onInpTodoTitleKeyup:', event);
  const inputValue = event.currentTarget.value;
  // console.log('> onInpTodoTitleKeyup:', inputValue);
  disableButtonWhenTextInvalid( domBtnCreateTodo, inputValue, isStringNotNumberAndNotEmpty, );
}
function renderTodoListInContainer(listOfTodoVO, container) {
  let output = '';
  let todoVO;
  for (let index in listOfTodoVO) {
    todoVO = listOfTodoVO[index];
    output += TodoView.createSimpleViewFromVO(index, todoVO);
  }
  container.innerHTML = output;

}

function saveListOfTodo(){
  localStorageSaveListOfWithKey(LOCAL_LIST_OF_TODOS, listOfTodos);
}