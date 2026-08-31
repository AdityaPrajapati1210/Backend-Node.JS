import { useState } from 'react'
import './App.css'
import { Footer, Header, About, Home,Contact,User } from './components';
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <>
      <Header/>,
      <Outlet/>,
      <Footer/>
    </>
  )
}

export default App
