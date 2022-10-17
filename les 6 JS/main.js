const domInputTodoTitle = document.getElementById("inputTodoTitle");
const domBtnCreateTodo = document.getElementById("btnCreateTodo");
const domListOfTodos = document.getElementById("listOfTodos");

domBtnCreateTodo.addEventListener("click", onBtnCreateTodoClick);

class TodoVO {
    constructor(id, title, date = new Date())
    {
        this.id = id;
        this.title = title;
        this.data = date;
        this.completed = false;
    }
}

const listOfTodos = [];


function onBtnCreateTodoClick(e) {
    console.log("> domBtnCreateTodo -> handle(click)", e);
    const todoTitleValueFromDomInput = domInputTodoTitle.value;
    console.log(">domBtnCreateTodo -> todoInputTodoTitleValue:", todoTitleValueFromDomInput);

    const canCreateTodo = validateTodoInputTitleValue(todoTitleValueFromDomInput);


    if (canCreateTodo) {
        const todoVO = createToDoVO(todoTitleValueFromDomInput);
        listOfTodos.push(todoVO);
        let output = "";
        for (let index in listOfTodos) {
            output += `<li>${listOfTodos[index].title}</li>`;
        }
        domListOfTodos.innerHTML = output
    }
}
function validateTodoInputTitleValue(value){
    const isInputValueString = typeof value === 'string';
    const isInputValueNotNumber = isNaN(parseInt(value))
    const result =
        isInputValueString
        && isInputValueNotNumber
        && value.length > 0;
    console.log('> validateTodoInputTitelValue -> result', {
        result,
        isInputValueString,
        isInputValueNotNumber
    });
    return result;
}
function createToDoVO (title) {
    const todoId = Date.now().toString();
    return new TodoVO(todoId, title);
}

domInputTodoTitle.value = "Todo text";

console.log("> dominputTodoTitle",
    domInputTodoTitle,
    domBtnCreateTodo,
    domListOfTodos
);
/**
 const greeting = "${name} |  ${surname} | ${company}"
 function welcome(name, surname = "", company = "") {
console.log(`> welcome ${name} |  ${surname} | ${company}`);
return greeting;
}
 console.log(welcome("Artur"));
 */