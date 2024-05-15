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
import UserDashboard from './AuthPages/user/UserDashboard'
import NotFound from './AuthPages/NotFound'
import PickupList from './component/recycler/PickupList'







function App() {
 

  return (
    <>
  

  <Routes>
  
 <Route path="/"  element={<LoginPage/>}/>
<Route path="/register"  element={<UserRegisteration/>}/>
<Route path="/account/:id" element={<UserAccountActivation/>}/>
<Route path="/adminlogin"  element={<AdLogin/>}/>
    <Route path="/login" element={<UserLogin/>}/>
    <Route path="/re-register" element={<Register/>}/>
    <Route path="/acc/:id" element={<AccountActivation/>}/>
    <Route path="/forgot" element={<ForgetPassword/>}></Route>
        <Route path="/reset/:id" element={<PasswordUpdate/>}></Route>
        <Route path="/adashboard" element={<AdminDashboard/>}/>
        <Route path="/recyler" element={<RecyclerDashboard/>}/>
        <Route path="/consumer" element={<UserDashboard/>}/>
       
        <Route path="/pickuplist" element={<PickupList/>}/>
       

        



        <Route component={NotFound} />
        <Route path="*" element={<NotFound />} />
  </Routes>

    </>
  )
}

export default App
