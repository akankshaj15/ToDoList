//using DOM
const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')
//The Local Storage is a sort of browser database,
// that can save our data as strings (key/value pair objects).
//can see it in application in inspect
//array of tasks
const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        }) 

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLS()
        }) 

        todosUL.appendChild(todoEl)

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    todosEl = document.querySelectorAll('li')
    // this creates an empty array (which will store all the todos entered by the user)
    const todos = []

    todosEl.forEach(todoEl => {
        //pushing  in todos array
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })
    //
    localStorage.setItem('todos', JSON.stringify(todos))
    //JSON.stringify(todos):-this part will turn the data we put in the storage into strings. Let's not forget that everything is a string in localStorage BUT in our JavaScript code, under the hood, our data is actually in JSON format

}