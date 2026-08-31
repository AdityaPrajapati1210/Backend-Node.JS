import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import { UserContextProvider } from './Context/UserContext.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='profile' element={<Profile/>}></Route>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  
  <UserContextProvider>
    <RouterProvider router={router}/>
  </UserContextProvider>  
)
