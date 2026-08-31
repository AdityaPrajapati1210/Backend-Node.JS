import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from '../src/components/Navbar'
import Login from './components/Login'
import Profile from './components/Profile'
import Home from './components/Home'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Outlet/>
      <h1 className='bg-gray-400 text-3xl'>Now First time I can go to make something...God's blessing with me..</h1>
    </>
  )
}

export default App
