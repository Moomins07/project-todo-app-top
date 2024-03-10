import formatDate from "./utils"

function Todo(project, date) {
    this.project = project
    this.date = formatDate(date)
    this.id = Math.random().toString(16).slice(2)
    this.dateOfCreation = formatDate(Date.now())
    this.todos = []
}


export default Todo