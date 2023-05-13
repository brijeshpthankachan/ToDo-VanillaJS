const todoItemList = {}
const inputElement = document.getElementById('input-div')
const bodyElement = document.getElementById('addTaskContainer')
const addButton = document.getElementById('task-button')
const todoContainerElement = document.getElementById('toDoContainer')
const timeNode = document.getElementById("time-node")
let inputRemoved = false

const getTime = () => new Date().toLocaleString()
const setTime = (timeNode) => { setInterval(() => { timeNode.innerText = getTime() }, 1000) }

const toggleInput = () => {
    inputRemoved = !inputRemoved
    if (inputRemoved) {
        removeInputElement()
    } else {
        addInputElement()
        addTaskListener()
    }
}

const addInputElement = () => {
    bodyElement.appendChild(inputElement)
}

const removeInputElement = () => {
    bodyElement.removeChild(inputElement)
}

const addTaskListener = () => {
    addButton.addEventListener('click', addTodoItem)
}

const addTodoItem = () => {
    const todoInput = document.getElementById('todo-item')
    const todoItemValue = todoInput.value.trim()
    if (todoItemValue) {
        todoInput.value = ''
        const todoItem = createTodoItem(todoItemValue)
        todoItemList[todoItem.key] = todoItem
        renderTodoItem(todoItem)
    }
}

const createTodoItem = (value) => {
    const key = Date.now()
    return { key, value: value, isDone: false }
}

const renderTodoItem = (todoItem) => {
    const todoDiv = createTodoDiv()
    const todoText = createTodoText(todoItem.value)
    const checkBox = createCheckBox(todoItem)
    todoDiv.appendChild(checkBox)
    todoDiv.appendChild(todoText)
    todoContainerElement.appendChild(todoDiv)
}

const createTodoDiv = () => {
    const todoDiv = document.createElement('div')
    todoDiv.classList.add(
        'flex',
        'justify-between',
        'bg-lime-100',
        'mt-2',
        'font-bold',
        'px-10',
        'rounded-sm',
        'p-2'
    )
    return todoDiv
}

const createTodoText = (value) => {
    const todoText = document.createElement('p')
    todoText.textContent = value
    return todoText
}

const createCheckBox = (todoItem) => {
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.classList.add('form-checkbox')
    checkBox.addEventListener('click', () => {
        toggleTodoItemStatus(todoItem, checkBox)
    })
    return checkBox
}

const toggleTodoItemStatus = (todoItem, checkBox) => {
    todoItemList[todoItem.key].isDone = !todoItemList[todoItem.key].isDone
    const isDone = todoItemList[todoItem.key].isDone
    checkBox.checked = isDone
    const todoText = checkBox.nextSibling
    todoText.classList.toggle('text-green-600', isDone)
    todoText.classList.toggle('text-red-600', !isDone)
}

toggleInput()
setTime(timeNode)
