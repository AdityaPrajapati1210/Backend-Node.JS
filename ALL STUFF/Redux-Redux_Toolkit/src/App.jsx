import { useState } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import AddTodo from '../components/addTodo'
import Todo from '../components/Todo'
function App() {

  return (
    <Provider store={store}>
      <AddTodo/>
      <Todo/>
    </Provider>
  )
}

export default App
