import formatDate from "./utils"

function Todo(date = null) {
    this.project = typeof project === 'string' ? project : project.value; // Ensure it is a string
    this.date = formatDate(date)
    this.id = Math.random().toString(16).slice(2)
    this.dateOfCreation = formatDate(Date.now())
    this.isUrgent = null
    this.description = null
    this.todos = []
}

function SubTodo(name) {
    this.name = name
    this.done = false
    this.id = Math.random().toString(16).slice(2) + '-SUBTODO'
}

function Project(name, date) {
    this.name = name
    this.date = date
    this.id = Math.random().toString(16).slice(2)
    this.projectTodos = []
}


export { Todo, SubTodo, Project }