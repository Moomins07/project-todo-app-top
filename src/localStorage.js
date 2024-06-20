// Handy function from mozilla docs that checks if localStorage is available
import { Todo } from "./Todo";
import {
    getCurrentProject,
    getCurrentTodo,
    todos
} from "./state";




function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

/* EXAMPLE:
 if (storageAvailable("localStorage")) {
'Yippee! We can use localStorage awesomeness'
} else {
'Too bad, no localStorage for us'
} */


function localStorageSetItem(name, item) {
    try {
        if (storageAvailable('localStorage')) {
            const itemJSON = JSON.stringify(item)
            localStorage.setItem(name, itemJSON)
        }

    } catch (e) {
        console.log(e)
    }
}

function localStorageSetItemsOnDOMLoaded() {
    localStorageSetItem('todos', todos)
}

function localStorageKeyExists(key) {
    return localStorage.getItem(key) !== null;
}

function checkAndReturnLocalStorageTodos(itemName) {
    let todos = localStorage.getItem(itemName);

    // Check if the todos array exists
    if (todos) {
        // Parse the JSON string into a JavaScript array
        todos = JSON.parse(todos);
    } else {
        // If no todos array exists, initialize it as an empty array
        todos = [];
    }

    return todos
}

function addProjectToLocalStorage(newProject) {
    // Retrieve the existing todos array from localStorage

    let todos = checkAndReturnLocalStorageTodos('todos')

    // Add the new project to the array
    todos.push(newProject);

    // Convert the array back into a JSON string
    const updatedTodos = JSON.stringify(todos);

    // Save the updated JSON string back to localStorage
    localStorage.setItem('todos', updatedTodos);
}

function addTodoToLocalStorage(newTodo) {

    const currentProject = getCurrentProject()

    let todos = checkAndReturnLocalStorageTodos('todos')
    console.log(currentProject.name)

    const project = todos.find(({ id }) => id === currentProject.id);


    if (project) {
        console.log('Project found:', project);
        // Add the newTodo to the project's todos array
        if (!project.projectTodos) {
            project.projectTodos = [];
        }
        project.projectTodos.push(newTodo);

        // Save the updated todos array back to localStorage
        saveTodos(todos)

    } else {
        console.log('Project not found');
    }

}

function addSubTodoToLocalStorage(currentTodo, newSubTodo) {

    const currentProject = getCurrentProject();
    let todos = checkAndReturnLocalStorageTodos('todos');

    console.log('Current project:', currentProject);
    console.log('Todos from localStorage:', JSON.stringify(todos, null, 2));

    const project = todos.find(({ name }) => name === currentProject.name);

    if (!project) {
        console.error('Project not found:', currentProject.name);
        return;
    }

    console.log('Found project:', project);

    const todo = project.projectTodos.find(({ id }) => id === currentTodo.id);

    if (!todo) {
        console.error('Todo not found:', currentTodo.id);
        return;
    }

    console.log('Found todo:', todo);

    const subTodoArray = todo.todos || [];
    subTodoArray.push(newSubTodo);

    // console.log('After adding new sub-todo:', JSON.stringify(todos, null, 2));

    saveTodos(todos)
}

function removeSubTodoFromLocalStorage(currentTodo, subTodoToRemove) {

    const currentProject = getCurrentProject();
    let todos = checkAndReturnLocalStorageTodos('todos');

    const project = todos.find(({ name }) => name === currentProject.name);

    if (!project) {
        console.error('Project not found:', currentProject.name);
        return;
    }

    const todo = project.projectTodos.find(({ id }) => id === currentTodo.id);

    if (!todo) {
        console.error('Todo not found:', currentTodo.id);
        return;
    }

    const subTodoArray = todo.todos || [];
    const subTodoIndex = subTodoArray.findIndex(subTodo => subTodo.id === subTodoToRemove.id);

    if (subTodoIndex === -1) {
        console.error('Sub-todo not found:', subTodoToRemove.id);
        return;
    }

    // Remove the sub-todo from the array
    subTodoArray.splice(subTodoIndex, 1);

    // Update the todos array in local storage
    saveTodos(todos)
}


function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}



export {
    localStorageSetItem,
    storageAvailable,
    localStorageSetItemsOnDOMLoaded,
    localStorageKeyExists,
    addProjectToLocalStorage,
    addTodoToLocalStorage,
    addSubTodoToLocalStorage,
    removeSubTodoFromLocalStorage
}