import { Todo, SubTodo, Project } from "./Todo"
import { _renderTodosToDOM, _displayTodo, _removeTodo, _renderProjectNamesToDOM } from "./ui";
import formatDate from "./utils";
import {
    localStorageSetItem,
    localStorageKeyExists,
    addProjectToLocalStorage,
    addTodoToLocalStorage,
    addSubTodoToLocalStorage,
    removeSubTodoFromLocalStorage,
    removeTodoFromLocalStorage,
    localStorageSetTodoProperties,
    saveTodos,
    checkAndReturnLocalStorageTodos
} from "./localStorage";


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
    addProjectToLocalStorage(todo)
}

function addTodo(todo) {
    const currentProject = getCurrentProject()
    if (currentProject) {
        currentProject.projectTodos.push(todo)
        addTodoToLocalStorage(todo)

    } else console.log('no current project')
}

function _findIndex(id) {
    const todos = checkAndReturnLocalStorageTodos('todos')
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
    let id = null;

    switch (true) {
        case e.target.closest('.card') !== null:
            id = e.target.closest('.card').getAttribute('data-id');
            break;
        case e.target.closest('li') !== null:
            id = e.target.closest('li').getAttribute('data-id');
            break;
        default:
            id = null;
            break;
    }

    return id;
}

function removeTodo(id) {
    const todos = checkAndReturnLocalStorageTodos('todos')
    const currentTodo = getCurrentTodo()
    const currentProject = getCurrentProject()
    const { isMainTodo, index, projectIndex, parentIndex, subIndex } = _findIndex(id);

    if (isMainTodo && index !== -1 && !id.includes('SUBTODO')) {
        // const todoArray = todos[index].projectTodos
        const todo = todos[index].projectTodos[projectIndex]
        // todoArray.splice(projectIndex, 1)
        removeTodoFromLocalStorage(currentProject, todo)
    } else if (!isMainTodo && subIndex !== -1) {
        // const subTodoArray = todos[parentIndex].projectTodos[projectIndex].todos;
        const subTodo = todos[parentIndex].projectTodos[projectIndex].todos[subIndex]

        // subTodoArray.splice(subIndex, 1);
        removeSubTodoFromLocalStorage(currentTodo, subTodo)


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

    const urgentProperty = todo.isUrgent = modalProjectUrgentCheckbox.checked;
    const projectNameProperty = todo.project = modalProjectTitle.value;
    const dateProperty = todo.date = formatDate(modalProjectDate.value);
    const descriptionProperty = todo.description = modalProjectDescription.value;

    localStorageSetTodoProperties(todo, urgentProperty, projectNameProperty, dateProperty, descriptionProperty)

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
    const projectDate = document.getElementById('project-date').value

    e.preventDefault();
    const todo = new Todo(projectDate)
    addTodo(todo)
    _renderTodosToDOM()
    // console.log(getCurrentProject())

}

function _newSubTodo(todo) {
    const subTodoName = document.getElementById('checklistItemInput').value

    const newSubTodo = new SubTodo(subTodoName)


    todo.todos.push(newSubTodo)
}



function _initializeAppState() {
    let todos = checkAndReturnLocalStorageTodos('todos');

    const currentProject = getCurrentProject()

    if (currentProject) {
        setCurrentProject(currentProject);
    } else if (todos.length > 0) {
        setCurrentProject(todos[0]); // Set the first project as current if no current project is found
    }
}




export {
    addProject,
    removeTodo,
    getTodos,
    _newTodo,
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
    getCurrentProject,
    todos,
    _initializeAppState
}