import { Todo, SubTodo } from "./Todo"
import { _renderTodosToDOM, _displayTodo, _removeTodo } from "./ui";
import formatDate from "./utils";

const todos = []
let currentTodo = null

function getCurrentTodo() {
    return currentTodo
}

function setCurrentTodo(todo) {
    currentTodo = todo
}

function addProject(todo) {
    todos.push(todo)
}

function _findIndex(id) {
    const index = todos.findIndex((todo) => todo.id === id);
    return index
}

function _grabTodoId(e) {
    const id = e.target.closest('.card').getAttribute('data-id')
    return id
}

function removeTodo(id) {
    const index = _findIndex(id)
    if (index !== -1) {
        todos.splice(index, 1);
    }
}

function getTodos() {
    return todos;
}




function updateTodo(liArr) {
    const todo = getCurrentTodo()
    todo.todos = [...liArr]

}

function _getUpdatedTodoFromInputs() {
    const modalProjectTitle = document.getElementById('todoTitle');
    const modalProjectDate = document.getElementById('todoDate');
    const modalProjectDescription = document.getElementById('todoDescription');
    const modalProjectUrgentCheckbox = document.getElementById('checkboxUrgent');

    const todo = getCurrentTodo();

    todo.isUrgent = modalProjectUrgentCheckbox.checked;
    todo.project = modalProjectTitle.value;
    todo.date = formatDate(modalProjectDate.value);
    todo.description = modalProjectDescription.value;

    return todo;
}



function _checkModalTodoAsComplete(e) {
    const todoIndex = e.target.getAttribute('data-index'); // Get the index of the clicked todo item.
    const todos = getCurrentTodo().todos; // retrieves array of todos.
    const todo = todos[todoIndex];


    if (todo) {
        // Toggle the done status in your data model.
        todo.done = !todo.done;
        console.log(todo)
    }

    return todo
}


function _newTodo(e) {
    const projectText = document.getElementById('project').value
    const projectDate = document.getElementById('project-date').value

    // if (projectText === '' || projectDate === '') {
    //     alert('Please fill in both fields!')
    // } else {
    e.preventDefault();
    const todo = new Todo(projectText, projectDate)
    addProject(todo)
    _renderTodosToDOM()
    // console.log(todos[2].todos)
    // }
}


function _defaultProjects() {
    const project1 = new Todo('Code more JavaScript', '07/03/2024')
    project1.isUrgent = true
    const project2 = new Todo('Code even more JavaScript', '07/03/2024')
    project1.todos.push('beer')
    project2.todos.push('shopping')
    addProject(project1)
    addProject(project2)
}





export { addProject, removeTodo, getTodos, _newTodo, _defaultProjects, _findIndex, updateTodo, _grabTodoId, getCurrentTodo, setCurrentTodo, _getUpdatedTodoFromInputs, _checkModalTodoAsComplete }