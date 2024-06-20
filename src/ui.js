import {
    getTodos,
    updateTodo,
    _grabTodoId,
    _findIndex,
    _defaultProjects,
    removeTodo,
    getCurrentTodo,
    setCurrentTodo,
    _getUpdatedTodoFromInputs,
    _checkModalTodoAsComplete,
    _newSubTodo,
    getSubTodos,
    getCurrentProject,
    setCurrentProject,
    todos,

} from "./state";
import { SubTodo } from "./Todo";
import { TODO_CONTAINER, MODAL } from "./constants";
import formatDate from "./utils";
import {
    addSubTodoToLocalStorage,
    removeSubTodoFromLocalStorage
} from "./localStorage";

let mouseDownOutside = false;


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


function _renderProjectNamesToDOM() {
    const addCardButton = document.getElementById('add-todo-card')
    const renderedButton = document.querySelector('.project-button')


    const projects = getTodos()
    const projectNamesDiv = document.getElementById('project-names')

    if (getCurrentProject) {
        addCardButton.classList.remove('hidden')
    } else
        addCardButton.classList.add('hidden')


    projectNamesDiv.innerHTML = ''

    projects.forEach((project, index) => {
        const div = document.createElement('div')
        const h6 = document.createElement('h6')
        const button = document.createElement('button')
        const hr = document.createElement('hr')
        const deleteButtonInnerHTML = `<i class="fa-lg fa-regular fa-circle-xmark delete-project sm:absolute left-44"></i>`

        h6.classList.add('project-date', 'pl-2')
        h6.innerHTML = formatDate(project.date)
        div.classList.add('mb-5', 'relative')
        button.classList.add('project-button', 'text-xl')

        button.setAttribute('data-id', project.id)
        button.setAttribute('data-index', index)
        button.innerHTML = `${project.name}`
        button.addEventListener('click', handleAddProjectButtonClick);

        // Add active class to newly added project
        if (index === projects.length - 1) {
            button.classList.add('active-button')
        }



        projectNamesDiv.append(div)
        div.innerHTML = deleteButtonInnerHTML
        div.append(h6)
        div.append(button)
        div.insertAdjacentElement('afterend', hr);

    })

    _renderTodosToDOM()
}


function handleAddProjectButtonClick(event) {
    // Remove 'active-button' class from all buttons
    const buttons = document.querySelectorAll('#project-names button');
    buttons.forEach(button => button.classList.remove('active-button'));

    // Add 'active-button' class to the clicked button
    event.target.classList.add('active-button');
}



function _checkTodoUrgency(todo) {
    const currentProject = getCurrentProject();
    let projectTodos = todo ? [todo] : currentProject.projectTodos

    /* I realised here that I still needed a parameter to account for single selected todos, not just looping through all todos and checking urgency when they're rendered. I know that if a todo is passed in, it will be a single todo, so I figured that I could check for a todo, and if there is one, just make it a single array so that forEach will still work on it. Essentially, forEach now works on both single todos and arrays of todos to perform the same checks!*/


    projectTodos.forEach((todo) => {

        const card = document.querySelector(`.project-card[data-id="${todo.id}"]`);
        const checkbox = document.getElementById('checkboxUrgent');

        if (card) {
            if (todo.isUrgent) {
                card.classList.add('border-l-8');

                if (todo) checkbox.checked = true;
            } else {
                card.classList.remove('border-l-8');
                if (todo) checkbox.checked = false;
            }
        } else {
            console.log(`Card not found for todo with id: ${todo.id}`);
        }
    })


}





function _findTodo(e) {
    const todoId = _grabTodoId(e); // Extract the todo ID directly from the event
    const projectTodo = getCurrentProject().projectTodos; // Get the current todos array
    const todo = projectTodo.find(todo => todo.id === todoId); // Use .find() to get the todo object

    return todo
}




function _showAndPopulateModal(e) {
    MODAL.classList.remove('hidden');

    const todo = _findTodo(e)

    if (todo) {
        _checkTodoUrgency(todo)
        _populateModal(todo);
        _populateModalTodoList(todo)
    } else {
        console.error('Todo not found.');
    }
}

function _populateModalTodoList(todo) {
    const modalTodoList = document.getElementById('checklistItems')

    if (modalTodoList) {
        modalTodoList.innerHTML = ''
        // const liArray = [...liElements]
        todo.todos.forEach((item, index) => {
            const li = document.createElement('li'); // Create a new <li> element
            const liItem = li.textContent = item.name; // Assuming each todo item has a 'text' property



            li.setAttribute('data-index', index)
            li.setAttribute('data-id', item.id)


            li.innerHTML = `${liItem} <button id="removeListItemFromModal" class="text-gray-400 hover:text-gray-600"><span class="fa fa-times"></span></button>`
            li.classList.add('mb-4', 'list-item', 'flex', 'justify-between');



            if (item.done) {
                li.classList.add('line-through', 'opacity-50');
            }

            modalTodoList.appendChild(li); // Append the new <li> to the modal list
        });
    }
}

function _populateModal(todo) {
    const modalProjectTitle = document.getElementById('todoTitle')
    const modalProjectDate = document.getElementById('todoDate')
    const modalProjectDescription = document.getElementById('todoDescription')


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


}


function _closeModal() {
    MODAL.classList.add('hidden')
}

function _closeModalEscKey(e) {
    if (e.key === 'Escape') {
        _closeModal();
    }
}

function _handleMouseDown(e) {
    if (!e.target.closest('.modal')) {
        mouseDownOutside = true;
    } else {
        mouseDownOutside = false;
    }
}

function _handleMouseUp(e) {
    if (mouseDownOutside && !e.target.closest('.modal')) {
        _closeModal();
    }
}


function _handleModalClick(e) {
    if (e.target.classList.contains('modalAddItem')) {
        e.stopPropagation()
        _addItemToModaList(e)
        _renderTodosToDOM()
    } else if (e.target.classList.contains('list-item')) {
        _tickModalTodoAsComplete(e)
        _updateTodoInputs()
        // console.log('list-item element found')
    } else if (e.target.classList.contains('modalUpdate')) {
        e.stopPropagation()
        e.preventDefault()
        _updateTodoInputs(e)
        _checkTodoUrgency()
        _renderTodosToDOM()
    } else if (e.target.closest('#removeListItemFromModal')) {
        e.stopPropagation()
        e.preventDefault()
        _removeTodoListItem(e)



    }
}


function _tickModalTodoAsComplete(e = null, todo = null) {
    // Determine the source of the 'todo' object
    const todoItem = e ? _checkModalTodoAsComplete(e) : todo;

    // Ensure 'todoItem' is defined
    if (!todoItem) {
        console.error('Todo item is not defined.');
        return;
    }

    // Check if the 'done' property exists on the 'todoItem'
    if (todoItem.done) {
        // Handle the event case
        if (e && e.target) {
            e.target.classList.add('line-through', 'opacity-50');

            // console.log(todoItem)
        }
    } else {
        // Handle the event case
        if (e && e.target) {
            e.target.classList.remove('line-through', 'opacity-50');
            // console.log(todoItem)

        }
    }
}


function _addItemToModaList(e) {

    const todo = getCurrentTodo()



    const modalList = document.getElementById('checklistItems')
    const checkListInput = document.getElementById('checklistItemInput')


    if (checkListInput.value == '') {
        alert('Please input a value first!')
    } else {

        const listItem = document.createElement('li')
        const itemText = checkListInput.value;
        const newSubTodo = new SubTodo(itemText)


        todo.todos.push(newSubTodo)
        addSubTodoToLocalStorage(todo, newSubTodo)

        listItem.setAttribute('data-id', newSubTodo.id)

        listItem.innerHTML = `${itemText} <button id="removeListItemFromModal" class="text-gray-400 hover:text-gray-600"><span class="fa fa-times"></span></button>`
        listItem.classList.add('list-item', 'flex', 'justify-between')
        listItem.style.color = 'green'
        modalList.appendChild(listItem)

        checkListInput.value = ''



    }

}




function _renderTodosToDOM() {
    TODO_CONTAINER.innerHTML = ''; // Clear the container here, before the loop

    if (getCurrentProject()) {

        const currentProjectTodos = getCurrentProject().projectTodos

        currentProjectTodos.forEach((todo) => {
            _displayTodo(todo)
            _renderTodoList(todo)
            _checkTodoUrgency(todo)

        })

    }
}

function _projectBtnIndex(e) {
    const btn = e.target.closest('.project-button')
    const index = btn.getAttribute('data-index')

    return index
}

function _handleClick(e) {
    if (e.target.classList.contains('delete')) {
        _removeTodo(e)

    } else if (e.target.classList.contains('delete-project')) {
        e.stopPropagation()
        const container = e.target.closest('.mb-5.relative');
        const projectBtn = container.querySelector('.project-button')
        const currentIndex = projectBtn.getAttribute('data-index')



        if (confirm('Are you sure you want to delete this project?')) {
            todos.splice(currentIndex, 1)
            // setCurrentProject(todos[currentIndex])
            setCurrentProject(null)
            _renderProjectNamesToDOM()
            handleAddProjectButtonClick(e)
            _renderTodosToDOM()
        }

    } else if (e.target.closest('.project-card')) {
        e.stopPropagation()
        _showAndPopulateModal(e);
        const todo = _findTodo(e)
        setCurrentTodo(todo)
    } else if (e.target.closest('.project-button')) {
        const index = _projectBtnIndex(e);
        const addCardButton = document.getElementById('add-todo-card')
        if (index !== null) {
            const todos = getTodos(); // Ensure getTodos() is defined and returns the list of todos
            setCurrentProject(todos[index]);
            _renderTodosToDOM()
        }

        addCardButton.classList.remove('hidden')

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

function _removeTodoListItem(e) {
    const todo = getCurrentTodo()
    if (confirm('Are you sure you want to delete this todo?')) {
        const id = _grabTodoId(e)
        removeTodo(id)
        e.stopPropagation()
        console.log(todo)
        _renderTodoList(todo)
        _populateModalTodoList(todo)
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

    if (todo.todos.length > 0) {
        todo.todos.every(todo => todo.done)
            ? projectCard.classList.add('opacity-30')
            : projectCard.classList.remove('opacity-30');
    }


    // Populate the <ul> with todo items
    todo.todos.forEach((item) => {
        const li = document.createElement('li');
        const todosId = item.id


        if (item && item.done) {
            li.classList.add('line-through', 'opacity-50');
        }

        li.setAttribute('data-id', todosId)
        li.innerHTML = item.name;
        ul.appendChild(li);
    });




    function _renderTodoInputs(todo) {

        const h2 = projectCard.querySelector('h2')
        const h3 = projectCard.querySelector('h3')
        const description = projectCard.querySelector('p')

        h2.textContent = todo.project != '' ? todo.project : 'Add title here!'
        h3.textContent = todo.date


        description.textContent = todo.description != '' ? todo.description : 'Add description here!'

    }
    _renderTodoInputs(todo)
}


function _updateTodoInputs() {
    const todo = _getUpdatedTodoFromInputs();
    _renderTodoList(todo);
}


export {
    _renderTodosToDOM,
    _handleClick,
    _closeModal,
    _closeModalEscKey,
    _handleModalClick,
    _handleMouseDown,
    _handleMouseUp,
    _renderTodoList,
    _renderProjectNamesToDOM
}

