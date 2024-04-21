import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { verifyUser,verifyAdmin } from './Script/Verification';
import Login from './Components/User/Login/Login'
import Register from './Components/User/Register/Register'
import Home from './Components/User/Home/Home'
import Profile from './Components/User/Profile/Profile' 
import AdminHome from './Components/Admin/Home/AdminHome'
import AdminLogin from './Components/Admin/Login/AdminLogin'
import {Provider} from 'react-redux'
import store from './redux';

function App() {
  const [user,setUser]=useState(null)
  const [admin,setAdmin]=useState(null)
  const [loading,setLoading]=useState(true)


  function Routing(){
    useEffect(()=>{
      const fetchData=async ()=>{
        try {
          const response=await verifyUser()
          setUser(response)
        } catch (error) {
          console.log(error);
        }finally{
          setLoading(false)
        }
      }
      fetchData()

    },[]) 
    if(loading){
      return null
    }
  

  const path=window.location.pathname;
  if(path==='/login'){
    return !user? <Login/>: <Navigate to='/' />
  }
  if(path==='/register'){
    return !user?<Register/>:<Navigate to= '/'/> 
  }
  if (path === '/') {
    return user ? <Home /> : <Navigate to='/login' />;
  }
  if (path === '/profile') {
    return user ? <Profile /> : <Navigate to='/login' />;
  }
  }

  function AdminRouting(){
    useEffect(()=>{
      const fetchData=async ()=>{
        try {
          const response= await verifyAdmin()
          console.log('called');
          setAdmin(response)
        } catch (error) {
          console.log(error);
        }finally{
          setLoading(false)

        }
      }
      fetchData()
    },[])
    if(loading){
      return null
    }

    const path =window.location.pathname
    if(path==='/admin'){
      return admin? <AdminHome/>:<Navigate to = '/admin/login'/>
    }
    if (path === '/admin/login') {
      return !admin ? <AdminLogin /> : <Navigate to='/admin' />;
    }
  }

  function Logout(){
    useEffect(()=>{
      localStorage.removeItem('payload')
      setUser(false)
    },[])
    return window.location.href='/login'
  }

  return (
   <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/login' element={<Routing/>} />
          <Route path='/register' element={<Routing/>}/>
          <Route path='/' element={<Routing/>}  />
          <Route path='profile' element={<Routing/>}/>
          <Route path='/logout' element={<Logout />} />
          <Route path="/admin/login" element={<AdminRouting />} />
          <Route path='/admin' element={<AdminRouting />} />
        </Routes>
      </Router>
   </Provider>
  );
}

export default App;
