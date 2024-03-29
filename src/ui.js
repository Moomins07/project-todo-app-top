import { getTodos, updateTodo, _grabTodoId, _findIndex, _defaultProjects, removeTodo, getCurrentTodo, setCurrentTodo } from "./state";
import { TODO_CONTAINER, MODAL } from "./constants";
import formatDate from "./utils";


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
    const todoArr = [...todo.todos]
    todoArr.forEach((todo) => {
        const li = document.createElement('li')
        li.innerHTML = todo
        ul.appendChild(li)
    })



    TODO_CONTAINER.appendChild(div)


}

function _findTodo(e) {
    const todoId = _grabTodoId(e); // Extract the todo ID directly from the event
    const todos = getTodos(); // Get the current todos array
    const todo = todos.find(todo => todo.id === todoId); // Use .find() to get the todo object

    return todo
}


function _showAndPopulateModal(e) {
    MODAL.classList.remove('hidden');

    const todo = _findTodo(e)
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
        todo.todos.forEach((item) => {
            const li = document.createElement('li'); // Create a new <li> element
            const liItem = li.textContent = item; // Assuming each todo item has a 'text' property
            li.innerHTML = `${liItem} <button id="removeListItemFromModal" class="text-gray-400 hover:text-gray-600"><span class="fa fa-times"></span></button>`
            li.classList.add('mb-4', 'list-item', 'flex', 'justify-between');
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
    } else if (e.target.classList.contains('list-item')) {
        console.log('list-item element found')
    } else if (e.target.classList.contains('modalUpdate')) {
        e.stopPropagation()
        e.preventDefault()
        _updateTodoList(e)
        _updateTodoInputs(e)
    }
}

function _addItemToModaList(e) {

    const modalList = document.getElementById('checklistItems')
    const checkListInput = document.getElementById('checklistItemInput')

    if (checkListInput.value == '') {
        alert('Please input a value first!')
    } else {
        const listItem = document.createElement('li')
        const itemText = checkListInput.value;
        listItem.innerHTML = `${itemText} <button id="removeListItemFromModal" class="text-gray-400 hover:text-gray-600"><span class="fa fa-times"></span></button>`
        listItem.classList.add('list-item', 'flex', 'justify-between')
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
        const todo = _findTodo(e)
        setCurrentTodo(todo)
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



function _renderTodoList(todo) {
    // Use the todo's id to find the correct .project-card
    const projectCard = document.querySelector(`.project-card[data-id='${todo.id}']`);
    if (!projectCard) {
        console.error('Project card not found for todo id:', todo.id);
        return;
    }

    // Within the found .project-card, find the <ul> to update
    const ul = projectCard.querySelector('.todo-list > ul');
    if (!ul) {
        console.error('UL not found within project card for todo id:', todo.id);
        return;
    }

    ul.innerHTML = ''; // Clear the existing list items

    // Populate the <ul> with todo items
    todo.todos.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = item.nameOfTodo;
        ul.appendChild(li);
    });

    function _renderTodoInputs(todo) {

        const h2 = projectCard.querySelector('h2')
        const h3 = projectCard.querySelector('h3')
        const description = projectCard.querySelector('p')

        h2.textContent = todo.project
        h3.textContent = todo.date
        description.textContent = todo.description

    }
    _renderTodoInputs(todo)
}


function _updateTodoInputs(e) {
    const modalProjectTitle = document.getElementById('todoTitle')
    const modalProjectDate = document.getElementById('todoDate')
    const modalProjectDescription = document.getElementById('todoDescription')
    const modalProjectUrgentCheckbox = document.getElementById('checkboxUrgent')

    const todo = getCurrentTodo()


    if (modalProjectUrgentCheckbox.checked) {
        todo.isUrgent = true
    } else todo.isUrgent = false

    todo.project = modalProjectTitle.value
    todo.date = formatDate(modalProjectDate.value)
    todo.description = modalProjectDescription.value



    _renderTodoList(todo)


}

function _updateTodoList(e) {
    const modalTodoList = document.getElementById('checklistItems')
    const todo = getCurrentTodo()
    const liArr = []
    const lis = modalTodoList.querySelectorAll('li')


    lis.forEach((li) => {
        liArr.push({ nameOfTodo: li.textContent, done: null })
    })

    console.log(todo)
    updateTodo(liArr)
    _renderTodoList(todo)
}

export { _renderTodosToDOM, _handleClick, _closeModal, _closeModalClickOutside, _closeModalEscKey, _handleModalClick }

