import { createStore } from 'redux'

// Creating a random button that will increase count on click
const Button = document.createElement('button')
Button.innerText = 'Click me'

// Reducer chooses what to do with our action type
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1
    default:
      return state
  }
}

// Store keeps the value
const store = createStore(reducer)

// Dispatch the action to store on click
// Store forwards the action to the reducer to decide what to do with it
// Reducer returns new value to the store
Button.addEventListener('click', () => {
  store.dispatch({ type: 'ADD' })
  // Button.innerText = store.getState(); // This can be replaced by store.subscribe bellow, which gives cleaner code as we don't polute the event listener
})
store.subscribe(() => {
  Button.innerText = store.getState()
})

// Exporting the Button
export { Button as LessonOne }
