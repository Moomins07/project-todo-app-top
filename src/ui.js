import { getTodos } from "./state";
import { TODO_CONTAINER } from "./constants";
import { MODAL } from "./constants";
import { _defaultProjects } from "./state";
import { removeTodo } from "./state";

function _displayTodo(todo) {
    const div = document.createElement('div')
    const todoList = document.createElement('div')
    const ul = document.createElement('ul')
    div.classList.add('project-card', 'card', 'group')
    div.setAttribute('data-id', todo.id)
    div.innerHTML = `
    <i class="fa-lg fa-regular fa-circle-xmark delete"></i>
    <h2 class="text-2xl truncate">${todo.project}</h2>
    <h3 class="text-sm">${todo.date}</h3>
    <p class="truncate-words">${todo.description ? todo.description : 'Update description!'}</p>`

    todoList.classList.add('todo-list')
    div.appendChild(todoList)
    todoList.appendChild(ul)
    ul.appendChild(document.createElement('li')).innerHTML = 'test'
    ul.appendChild(document.createElement('li')).innerHTML = 'test'


    TODO_CONTAINER.appendChild(div)
}


function _showModal(e) {
    MODAL.classList.remove('hidden');
    _populateModal(e)
}

function _populateModal(e) {
    const todoCard = e.target.closest('.project-card')
    if (!todoCard) throw new Error('Todo card not found');
    const modalProjectTitle = document.getElementById('todoTitle')
    const modalProjectDate = document.getElementById('todoDate')
    const modalProjectDescription = document.getElementById('todoDescription')

    const h2Element = todoCard.querySelector('h2')
    const dateElement = todoCard.querySelector('h3')
    const descriptionElement = todoCard.querySelector('p')

    if (h2Element) {
        modalProjectTitle.value = h2Element.textContent
    } else throw new Error('No h2 element found')

    if (dateElement) {
        const dateText = dateElement.textContent; // e.g., "03-07-2024"
        const [day, month, year] = dateText.split('-');
        const formattedDate = `${year}-${month}-${day}`; // Convert to "2024-07-03"

        modalProjectDate.value = formattedDate;
    } else throw new Error('No date element found')

    if (descriptionElement) {
        modalProjectDescription.value = descriptionElement.textContent
    } else throw new Error('No date element found')
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
        console.log('update modal button')
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
        _showModal(e);
    }
}

function _removeTodo(e) {
    if (confirm('Are you sure you want to delete this project?')) {
        const id = e.target.closest('.card').getAttribute('data-id')
        removeTodo(id)
        e.stopPropagation()
        _renderTodosToDOM()
    }
}

export { _renderTodosToDOM, _handleClick, _closeModal, _closeModalClickOutside, _closeModalEscKey, _handleModalClick }

