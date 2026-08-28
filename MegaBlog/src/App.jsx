import { useEffect, useState } from 'react'
import './App.css'
import conf from '../conf';
import { useDispatch } from 'react-redux';
import { login,logout } from './store/authSlice';
import authService from './Appwrite/Auth'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom';
import Login from './components/Login';

function App() {
  const [loading ,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((UserData)=>{
      if(UserData){
        dispatch(login({UserData:UserData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[]);

  if(!loading){
    return(
      <>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header/>
          <main>
            <Outlet/>
            hello
          </main>
          
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
          <Footer/>

        </div>

      </div>
      </>
    )
  }
}

export default App
