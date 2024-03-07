import { getTodos } from "./state";
import TODO_CONTAINER from "./constants";

function _displayTodo(todo) {

    const div = document.createElement('div')
    div.className = "card bg-darkBlue1 p-4 rounded-lg flex flex-col justify-around gap-3 hover:-translate-y-1.5 border-l-8 border-lightRed transition ease-in-out relative"
    div.innerHTML = `
    <i class="fa-regular fa-circle-xmark absolute top-2 right-2"></i>
    <h2 class="text-2xl truncate">${todo.project}
      <span>
      <h3 class="text-sm">${todo.date}</h3>
      </span>
   </h2>
  <p class="truncate-words">${todo.description ? todo.description : 'Update description!'}</p>`;

    TODO_CONTAINER.appendChild(div)
}

function _renderTodosToDOM() {
    TODO_CONTAINER.innerHTML = ''; // Clear the container here, before the loop
    getTodos().forEach((todo) => {
        _displayTodo(todo)
    })

}

export default _renderTodosToDOM

