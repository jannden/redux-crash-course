import { LessonOne } from './1-redux-barebone'
import { LessonTwo } from './2-redux-action-creators'
import { LessonThree } from './3-redux-combined-reducers'

const pages = {
  'Lesson 1': LessonOne,
  'Lesson 2': LessonTwo,
  'Lesson 3': LessonThree
}

const App = document.getElementById('app')
const Navigation = App.appendChild(document.createElement('div'))
const PageContent = App.appendChild(document.createElement('div'))

for (const lessonName in pages) {
  const Button = document.createElement('button')
  Button.innerText = lessonName
  Button.addEventListener('click', () => render(lessonName))
  Navigation.appendChild(Button)
}

const render = (lessonName) => {
  PageContent.innerText = ''
  try {
    PageContent.appendChild(pages[lessonName])
  } catch {
    console.error(`Couldn't load "${lessonName}"`)
  }
}
