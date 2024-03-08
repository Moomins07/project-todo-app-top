import Todo from "./Todo";
import { _renderTodosToDOM } from "./ui";
import { _displayTodo } from "./ui";
import { _removeTodo } from "./ui";

const todos = []

function addTodo(todo) {
    todos.push(todo)
}

function removeTodo(id) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
    }
}

function getTodos() {
    return todos;
}

function updateTodos() {
    // will work this out later
}


function _newTodo(e) {
    const projectText = document.getElementById('project').value
    const projectDate = document.getElementById('project-date').value

    // if (projectText === '' || projectDate === '') {
    //     alert('Please fill in both fields!')
    // } else {
    e.preventDefault();
    const todo = new Todo(projectText, projectDate)
    addTodo(todo)
    _renderTodosToDOM()
    console.log(todos)
    // }
}

function _defaultProjects() {
    const project1 = new Todo('Code more JavaScript', '07/03/2024')
    const project2 = new Todo('Code even more JavaScript', '07/03/2024')
    addTodo(project1)
    addTodo(project2)
}





export { addTodo, removeTodo, getTodos, _newTodo, _defaultProjects }