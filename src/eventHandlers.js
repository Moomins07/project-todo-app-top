import { _newTodo } from "./state"
import { _handleClick } from "./ui"
import { _defaultProjects } from "./state"
import { _renderTodosToDOM } from "./ui"
import { _closeModal } from "./ui"
import { MODAL } from "./constants"
import { _closeModalClickOutside } from "./ui"
import { _closeModalEscKey } from "./ui"


function setEventListeners() {
    document.getElementById('add-todo').addEventListener('click', _newTodo)
    document.getElementById('project-cards').addEventListener('click', _handleClick)
    // Event handlers to close Modal
    document.getElementById('closeModalButton').addEventListener('click', _closeModal)
    document.addEventListener('keydown', _closeModalEscKey);
    MODAL.addEventListener('click', _closeModalClickOutside);
    _defaultProjects()
    _renderTodosToDOM()
}

export default setEventListeners