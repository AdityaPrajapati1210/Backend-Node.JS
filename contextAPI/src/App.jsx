import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import UserContextProvider from './Context/UserContextProvider'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'

function App() {

  return (
   <UserContextProvider>
    <h1>Mughe kuch nhi samaj me aa raha h!!!!!!</h1>
    <Login/>
    <Profile/>
   </UserContextProvider>
  )
}

export default App
