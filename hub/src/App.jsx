import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
import UserRegisteration from './AuthPages/user/UserRegisteration'
import { Route, Routes , Navigate} from 'react-router-dom'
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
import UserProfile from './component/User/UserProfile'
import AdminLayout from './component/admin/AdminLayout'
import UserList from './component/admin/UserList'
import RecyclerDetail from './component/admin/RecyclerDetail'
import PaymentList from './component/admin/PaymentList';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import ProfileEdit from './component/recycler/ProfileEdit';









function App() {
 
  const fadeDuration = 1.5; // Duration of fade-in/fade-out animation in seconds

  useEffect(() => {
    // Fade in the component
    gsap.fromTo(
      '#searchposter',
      { opacity: 0 },
      {
        opacity: 1,
        duration: fadeDuration,
        ease: 'Power3.easeInOut', // Optional easing function
      }
    );

    // Add cleanup when the component unmounts
    return () => {
      gsap.fromTo(".card", {y:100 , opacity : 0},{
        scrollTrigger: {
          trigger: ".card",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",// Optional: Adds visual markers for testing/debugging
        },
        opacity: 100,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger : 0.25
      });

      gsap.fromTo(".auth", {x:400 , opacity : 0},{x : 0 , opacity: 100 , duration : 2 , ease : "power3.out" , stagger : 0.25});

      
      gsap.fromTo(".nav" , {x:100 , opacity : 0} , {
        opacity :100,
        x:0,
        duration :1,
        ease : "power3.out",
        stagger : 0.25
      })
      gsap.fromTo(".line" , {x:0, opacity : 0 , width : 0 } , {
        scrollTrigger: {
          trigger: ".line",
          start: "top 80%",
          end: "bottom 100%",
          toggleActions: "play none none reverse",// Optional: Adds visual markers for testing/debugging
        },
        opacity :100,
        x:0,
        duration :1,
        ease : "power3.out",
        width : 1100,
        delay : 1
      })
      // Fade out the component
      gsap.fromTo(
        '#searchposter',
        { opacity: 1 },
        {
          opacity: 0,
          duration: fadeDuration,
          ease: 'Power3.easeInOut', // Optional easing function
        }
      );
    };
    Draggable.create(".spin", { inertia: true, type: "rotation", bounds: "body" });
  }, []);
  return (
    <>
 
 <AuthProvider>
    
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<UserRegisteration />} />
          <Route path="/account/:id" element={<UserAccountActivation />} />
          <Route path="/adminlogin" element={<AdLogin />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/acc/:id" element={<AccountActivation />} />
          <Route path="/forgot" element={<ForgetPassword />} />
          <Route path="/reset/:id" element={<PasswordUpdate />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="userlist"
              element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="re-list"
              element={
                <ProtectedRoute>
                  <RecyclerDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="dash"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="paymentlist"
              element={
                <ProtectedRoute>
                  <PaymentList />
                </ProtectedRoute>
              }
            />
                         <Route path="" element={<Navigate to="/admin/dashboard" />} />

          </Route>
          
          <Route path="/recycler" element={<RecyclerLayout />}>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <RecyclerDashboard />
                </ProtectedRoute>
              }
            />
              <Route path="profile" element={ <ProfileEdit />} />
            <Route path="pickuplist" element={ <ProtectedRoute><PickupList /></ProtectedRoute>} />
            <Route path="re-register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
            <Route path="" element={<Navigate to="/recycler/dashboard" />} />

          </Route>
          
          <Route exact path="/user" element={<ConsumerLayout />}>
            <Route
              path="getprice"
              element={
                <ProtectedRoute>
                  <PriceList />
                </ProtectedRoute>
              }
            />
            <Route
              path="pickup"
              element={
                <ProtectedRoute>
                  <Pickup />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="we-take" element={<WeTake />} />
            <Route path="search" element={<SearchRecyclers />} />
            <Route path="Location" element={<RecyclerMap />} />
            <Route path="pincode" element={<RecyclerList />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
             <Route path="" element={<Navigate to="/user/dashboard" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      
    </AuthProvider>

    </>
  )
}

export default App
