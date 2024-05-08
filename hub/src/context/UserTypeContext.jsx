import React, {  createContext, useContext, useState  } from 'react'

const UserTypeContext = createContext();
export const useUserType = () => useContext(UserTypeContext);


export const UserTypeProvider=({children})=>{
    const [userType,setUserType]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const handleLogout=()=>{
        localStorage.removeItem("loggedIn");
       
       
       
      }

   return(
    <UserTypeContext.Provider value={{userType,setUserType,loading,setLoading,handleLogout,error,setError}}>
        {children}
    </UserTypeContext.Provider>
   ) 
}


export default UserTypeContext