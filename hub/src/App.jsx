import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserRegisteration from './AuthPages/user/UserRegisteration'
import { Route, Routes } from 'react-router-dom'
import UserAccountActivation from './AuthPages/user/UserAccountActivation'
import UserLogin from './AuthPages/user/UserLogin'
import Register from './AuthPages/Recycler/Register'
import AccountActivation from './AuthPages/Recycler/AccountActivation'
import Login from './AuthPages/Recycler/Login'
import LoginPage from './AuthPages/MainLayout'
import AdLogin from './AuthPages/admin/AdLogin'
import ForgetPassword from './AuthPages/user/ForgetPassword'
import PasswordUpdate from './AuthPages/user/PasswordUpdate'
import AdminDashboard from './AuthPages/admin/AdminDashboard'
import RecyclerDashboard from './AuthPages/Recycler/RecyclerDashboard'
import NotFound from './AuthPages/NotFound'
import PickupList from './component/recycler/PickupList'
import ConsumerLayout from './component/User/ConsumerLayout'
import PriceList from './component/User/PriceList'
import UserDashboard from './AuthPages/user/UserDashboard'
import Pickup from './component/User/Pickup'
import WeTake from './component/User/WeTake'
import SearchRecyclers from './component/User/SearchRecycler'
import RecyclerMap from './component/User/RecyclerMap'
import RecyclerLayout from './component/recycler/RecyclerLayout'
import RecyclerList from './component/User/RecyclerList'
import { useUserType } from './context/UserTypeContext'








function App() {
 
  const {isdark,setisdark } = useUserType();
  const body = document.body;

  const modetoggle=()=>{
    if(body.classList.contains("light")){
      body.classList.remove("light");
      setisdark(!isdark)
    }
    else{
      body.classList.add("light");
      setisdark(!isdark)
    }
  }
  return (
    <>

  <Routes>
 
  
 <Route path="/"  element={<LoginPage/>}/>
<Route path="/register"  element={<UserRegisteration/>}/>
<Route path="/account/:id" element={<UserAccountActivation/>}/>
<Route path="/adminlogin"  element={<AdLogin/>}/>
    <Route path="/login" element={<UserLogin/>}/>

    <Route path="/acc/:id" element={<AccountActivation/>}/>
    <Route path="/forgot" element={<ForgetPassword/>}></Route>
        <Route path="/reset/:id" element={<PasswordUpdate/>}></Route>
        <Route path="/adashboard" element={<AdminDashboard/>}/>
     
       
        
        <Route path="/recycler" element={<RecyclerLayout />}>
        <Route path="dashboard" element={<RecyclerDashboard/>}/>
          <Route path="pickuplist" element={<PickupList/>}/>
          <Route path="re-register" element={<Register/>}/>

</Route>
        
        <Route path="/user" element={<ConsumerLayout />}>
          <Route path="getprice" element={<PriceList />} />
          <Route path="pickup" element={<Pickup/>} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="we-take" element={<WeTake/>}/>
          <Route path="search" element={<SearchRecyclers/>}/>
          <Route path="Location" element={<RecyclerMap/>}/>
          <Route path="pincode" element={<RecyclerList/>}/>



</Route>

        



        <Route component={NotFound} />
        <Route path="*" element={<NotFound />} />
  </Routes>
  <div className='pt-5 justify-content-end align-items-end'>
{
          !isdark ? (<button
            className=" nav nav-top"
            onClick={()=>{modetoggle()}}
          >
            dark
          </button>) : (<button
              className=" nav nav-top"
              onClick={()=>{modetoggle()}}
            >
         light
            </button>)
        }   
</div>

    </>
  )
}

export default App
