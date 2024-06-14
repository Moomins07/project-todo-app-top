import { Todo, SubTodo, Project } from "./Todo"
import { _renderTodosToDOM, _displayTodo, _removeTodo, _renderProjectNamesToDOM } from "./ui";
import formatDate from "./utils";


const todos = []
let currentTodo = null
let currentProject = null

function getCurrentTodo() {
    return currentTodo
}

function setCurrentTodo(todo) {
    currentTodo = todo
}

function getCurrentProject() {
    return currentProject
}

function setCurrentProject(project) {
    currentProject = project
}

function addProject(todo) {
    todos.push(todo)
}

function addTodo(todo) {
    const currentProject = getCurrentProject()
    currentProject.projectTodos.push(todo)
}

function _findIndex(id) {
    // Find main todo by iterating through each project and its projectTodos
    for (let i = 0; i < todos.length; i++) {
        const projectIndex = todos[i].projectTodos.findIndex((projectTodo) => projectTodo.id === id);
        if (projectIndex !== -1) {
            return { isMainTodo: true, index: i, projectIndex };
        }
    }

    // Find sub-todo by iterating through each project's projectTodos and their todos
    for (let i = 0; i < todos.length; i++) {
        for (let j = 0; j < todos[i].projectTodos.length; j++) {
            const subTodoIndex = todos[i].projectTodos[j].todos.findIndex((subTodo) => subTodo.id === id);
            if (subTodoIndex !== -1) {
                return { isMainTodo: false, parentIndex: i, projectIndex: j, subIndex: subTodoIndex };
            }
        }
    }

    return { isMainTodo: false, index: -1 }; // If none above, no todo so return -1
}



function _grabTodoId(e) {
    const cardElement = e.target.closest('.card');
    const modalElement = e.target.closest('li');
    const id = cardElement ? cardElement.getAttribute('data-id') : (modalElement ? modalElement.getAttribute('data-id') : null);
    return id;
}

function removeTodo(id) {
    const { isMainTodo, index, projectIndex, parentIndex, subIndex } = _findIndex(id);

    if (isMainTodo && index !== -1 && !id.includes('SUBTODO')) {
        todos[index].projectTodos.splice(projectIndex, 1);
    } else if (!isMainTodo && subIndex !== -1) {
        todos[parentIndex].projectTodos[projectIndex].todos.splice(subIndex, 1);

        if (todos[parentIndex].projectTodos[projectIndex].todos[subIndex]) {
            console.log('found the subtodo');
        } else {
            console.log('subtodo removed');
        }
    }
}


function getTodos() {
    return todos;
}

function getSubTodos(todo) {
    return todo.todos
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
    console.log(todo)

    todo.isUrgent = modalProjectUrgentCheckbox.checked;
    todo.project = modalProjectTitle.value;
    todo.date = formatDate(modalProjectDate.value);
    todo.description = modalProjectDescription.value;

    return todo;
}



function _checkModalTodoAsComplete(e = null, todo = null) {
    if (e) {
        const todoIndex = e.target.getAttribute('data-index'); // Get the index of the clicked todo item.
        const todos = getCurrentTodo().todos; // retrieves array of todos.
        todo = todos[todoIndex];
    }

    if (todo) {
        // Toggle the done status in your data model.
        todo.done = !todo.done;
    }

    return todo;
}


function _newProject(e) {
    const projectName = document.getElementById('project')
    const projectText = document.getElementById('project').value
    const projectDate = document.getElementById('project-date').value




    e.preventDefault()

    if (projectText === '' || projectDate === '') {
        alert('Please fill in both fields!')
    } else {
        const project = new Project(projectText, projectDate)
        addProject(project)
        setCurrentProject(project)
        _renderProjectNamesToDOM(e)
        projectName.value = ''
    }
    // console.log(`Current Project:`, getCurrentProject())


    // console.log(getCurrentProject())

    projectName.innerHTML = ''
}


function _newTodo(e) {
    const projectText = document.getElementById('project').value
    const projectDate = document.getElementById('project-date').value

    e.preventDefault();
    const todo = new Todo(projectDate)
    addTodo(todo)
    _renderTodosToDOM()
    // console.log(getCurrentProject())

}

function _newSubTodo(todo) {
    const subTodoName = document.getElementById('checklistItemInpit').value

    const newSubTodo = new SubTodo(subTodoName)

    todo.todos.push(newSubTodo)
}


function _defaultProjects() {


    const project1 = new Project('Code more JavaScript', '12/06/2024')
    setCurrentProject(project1)
    const d = new Date()
    const date = d.getDate()
    const todo1 = new Todo(date);
    todo1.isUrgent = true
    todo1.todos.push(new SubTodo('Get this done finally'));
    project1.projectTodos.push(todo1);



    addProject(project1)





}





export {
    addProject,
    removeTodo,
    getTodos,
    _newTodo,
    _defaultProjects,
    _findIndex,
    updateTodo,
    _grabTodoId,
    getCurrentTodo,
    setCurrentTodo,
    _getUpdatedTodoFromInputs,
    _checkModalTodoAsComplete,
    _newSubTodo,
    getSubTodos,
    _newProject,
    setCurrentProject,
    getCurrentProject
}