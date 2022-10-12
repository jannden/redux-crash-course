import { createStore, combineReducers } from 'redux'

// Get the elements for easy manipulation
const Page = document.createElement('div')
const Input = Page.appendChild(document.createElement('input'))
const Button = Page.appendChild(document.createElement('button'))
Button.innerText = 'Submit'
const Span = Page.appendChild(document.createElement('span'))
const Container = Page.appendChild(document.createElement('div'))

// Now here will be two reducers
const toDos = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload.value]
    case 'REMOVE':
      return state.filter((item, index) => index !== action.payload.index)
    default:
      return state
  }
}

const clicks = (state = 0, action) => {
  switch (action.type) {
    case 'NEW_TASK_ADDED':
      return state + 1
    default:
      return state
  }
}

// Now we will combine the reducers
const reducer = combineReducers({ toDos, clicks })

// Action creators
const addingAction = (value) => {
  return {
    type: 'ADD',
    payload: { value }
  }
}

const removingAction = (index) => {
  return {
    type: 'REMOVE',
    payload: { index }
  }
}

const clickAction = () => {
  return {
    type: 'NEW_TASK_ADDED'
  }
}

// Store to keep the state
const store = createStore(reducer)

// Function to rerender the list of To-Dos
const render = () => {
  Container.innerHTML = '' // Clean the list first
  store.getState().toDos.forEach((item, index) => {
    // Then go through each item in state
    const newEl = document.createElement('p')
    newEl.innerText = item
    newEl.addEventListener('click', () => {
      // By clicking on a To-Do, we won't to remove it from the list
      store.dispatch(removingAction(index))
    })
    Container.appendChild(newEl)
  })
  Span.innerHTML = `Tasks added: ${store.getState().clicks}`
}

// By submitting a new To-Do, we want to add it to the list
Button.addEventListener('click', () => {
  if (!!Input.value) {
    store.dispatch(addingAction(Input.value))
    store.dispatch(clickAction())
  }
})

// We re-render the list of To-Dos on each state change
store.subscribe(() => render())

export { Page as LessonThree }
