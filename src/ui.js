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
    <h2 class="text-2xl truncate">${todo.project}
      <span>
      <h3 class="text-sm">${todo.date}</h3>
      </span>
   </h2>
  <p class="truncate-words">${todo.description ? todo.description : 'Update description!'}</p>`

    todoList.className = "todo-list transition-all duration-500 ease-in-out max-h-0 group-hover:max-h-96 overflow-hidden"
    div.appendChild(todoList)
    todoList.appendChild(ul)

    TODO_CONTAINER.appendChild(div)
}

function _showModal() {
    MODAL.classList.remove('hidden');
}

function _closeModal(e) {
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
        _showModal();

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

export { _renderTodosToDOM, _handleClick, _closeModal, _closeModalClickOutside, _closeModalEscKey }

