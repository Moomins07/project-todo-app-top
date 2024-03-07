import { _newTodo } from "./state"


function setEventListeners() {
    document.getElementById('add-todo').addEventListener('click', _newTodo)
}

export default setEventListeners