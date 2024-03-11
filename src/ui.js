import { getTodos, updateTodo, _grabTodoId, _findIndex, _defaultProjects, removeTodo } from "./state";
import { TODO_CONTAINER, MODAL } from "./constants";


function _displayTodo(todo) {
    const div = document.createElement('div')
    const todoList = document.createElement('div')
    const ul = document.createElement('ul')
    div.classList.add('project-card', 'card', 'group')
    div.setAttribute('data-id', todo.id)
    div.innerHTML = `
    <i class="fa-lg fa-regular fa-circle-xmark delete"></i>
    <h2 class="text-2xl truncate break-words">${todo.project}</h2>
    <h3 class="text-sm">${todo.date}</h3>
    <p class="truncate-words">${todo.description ? todo.description : 'Click to add todos!'}</p>`

    todoList.classList.add('todo-list')
    div.appendChild(todoList)
    todoList.appendChild(ul)



    TODO_CONTAINER.appendChild(div)


}

function findTodo(e) {
    const todoId = _grabTodoId(e); // Extract the todo ID directly from the event
    const todos = getTodos(); // Get the current todos array
    const todo = todos.find(todo => todo.id === todoId); // Use .find() to get the todo object

    return todo
}


function _showAndPopulateModal(e) {
    MODAL.classList.remove('hidden');

    const todo = findTodo(e)
    if (todo) {
        _populateModal(todo);
    } else {
        console.error('Todo not found.');
    }
}

function _populateModal(todo) {
    const modalProjectTitle = document.getElementById('todoTitle')
    const modalProjectDate = document.getElementById('todoDate')
    const modalProjectDescription = document.getElementById('todoDescription')
    const modalTodoList = document.getElementById('checklistItems')

    modalProjectTitle.value = todo.project

    if (modalProjectDate) {
        const dateText = todo.date // e.g., "03-07-2024"
        const [day, month, year] = dateText.split('-');
        const formattedDate = `${year}-${month}-${day}`; // Convert to "2024-07-03"

        modalProjectDate.value = formattedDate;
    } else throw new Error('No date element found')

    if (modalProjectDescription) {
        modalProjectDescription.value = todo.description
    } else throw new Error('No date element found')

    if (modalTodoList) {
        modalTodoList.innerHTML = ''
        // const liArray = [...liElements]
        console.log(todo.todos)
        todo.todos.forEach((item) => {
            const li = document.createElement('li'); // Create a new <li> element
            li.textContent = item; // Assuming each todo item has a 'text' property
            li.classList.add('mb-4'); // Add class for styling
            modalTodoList.appendChild(li); // Append the new <li> to the modal list
        });
    }
}


function _closeModal() {
    MODAL.classList.add('hidden')
}

function _closeModalEscKey(e) {
    if (e.key === 'Escape') {
        _closeModal();
    }
}

function _closeModalClickOutside(e) {
    if (!e.target.closest('.modal')) {
        _closeModal();
    }
}

function _handleModalClick(e) {
    if (e.target.classList.contains('modalAddItem')) {
        e.stopPropagation()
        _addItemToModaList(e)
    } else if (e.target.classList.contains('modalUpdate')) {
        e.stopPropagation()
        e.preventDefault()
        _updateTodo(e)
    }
}

function _addItemToModaList(e) {

    const modalList = document.getElementById('checklistItems')
    const checkListInput = document.getElementById('checklistItemInput')

    if (checkListInput.value == '') {
        alert('Please input a value first!')
    } else {
        const listItem = document.createElement('li')
        listItem.textContent = checkListInput.value
        listItem.style.color = 'green'
        modalList.appendChild(listItem)
    }
}

function _renderTodosToDOM() {
    TODO_CONTAINER.innerHTML = ''; // Clear the container here, before the loop
    getTodos().forEach((todo) => {
        _displayTodo(todo)
    })

}



function _handleClick(e) {
    if (e.target.classList.contains('delete')) {
        _removeTodo(e)
    } else if (e.target.closest('.project-card')) {
        e.stopPropagation()
        _showAndPopulateModal(e);

        _grabTodoId(e)

    }
}

function _removeTodo(e) {
    if (confirm('Are you sure you want to delete this project?')) {
        const id = _grabTodoId(e)
        removeTodo(id)
        e.stopPropagation()
        _renderTodosToDOM()
    }
}

function _updateTodo(e) {
    const id = _grabTodoId(e)
    console.log(id)
    // const id = todoCard.getAttribute('data-id')
    // updateTodo(id)
}

export { _renderTodosToDOM, _handleClick, _closeModal, _closeModalClickOutside, _closeModalEscKey, _handleModalClick }

