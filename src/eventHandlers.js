import { _newTodo, _defaultProjects } from "./state"
import { _handleClick, _renderTodosToDOM, _closeModal, _closeModalEscKey, _handleModalClick, _handleMouseDown, _handleMouseUp } from "./ui"


function setEventListeners() {
    document.getElementById('add-todo').addEventListener('click', _newTodo)
    document.getElementById('project-cards').addEventListener('click', _handleClick)
    // Event handlers to close Modal
    document.getElementById('closeModalButton').addEventListener('click', _closeModal)
    document.addEventListener('keydown', _closeModalEscKey);
    document.addEventListener('mousedown', _handleMouseDown);
    document.addEventListener('mouseup', _handleMouseUp);
    document.querySelector('.modal').addEventListener('click', _handleModalClick)
    _defaultProjects()
    _renderTodosToDOM()
}

export default setEventListeners