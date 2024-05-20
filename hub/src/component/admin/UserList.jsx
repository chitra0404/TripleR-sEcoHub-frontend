import React,{useEffect,useState} from 'react';


import axios from 'axios';
import { Base_Url } from '../../config/api';
import { useNavigate } from 'react-router-dom';











function UserList() {
  
    const [user, setUser] = useState([]);
    const [update,setUpdate]=useState(-1);
    const navigate=useNavigate();
    

    useEffect(() => {
       
       
         axios.get(`${Base_Url}/api/getuser`)

            .then(res => {
                
                 setUser([user,...res.data.message]);
                console.log("Use data:", res.data.message);
                
            })
    }, []);
    
    
    const updateUser = (id) => {
      const current= user.filter( (users) => user.userId=== id)
      setUser[{...current}]
      console.log(current);
      navigate('/update')
  }
   const deleteUser=(id) =>{
     axios.delete(`${Base_Url}/api/user/${id}`)
     
     const removeUser=user.filter((users)=>users._id!=id);
     console.log("hi",removeUser);
     setUser(removeUser);

   }
  

  return (
    <div className=' vh-100 vw-100 justify-content-center mt-5 pt-2'>
    <h2 className="bg-warning">ConsumerDetails</h2>
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
  
</div>
 
    <table className='table table-hover'>
        <thead className='table-dark'>
            <tr>
           
                <th >USERId</th>
                <th>Name</th>
                <th>Email</th>
               <th>Address</th>
                




                <th></th>
            </tr>
        </thead>
        <tbody>
            {
    user.map((item, index) => (
                 update===item._id?<EditLead item={item} lead={lead} set={setLead} handleEdit={handleEdit}  />:
                <tr  className="table" key={index}> 
                
                    <td >{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    
                   
                 <td><button type="submit" className='btn btn-success'  onClick={ () => deleteUser(item._id)}>Delete</button></td>

                    <td></td>

                </tr>
            ))}
           
        </tbody>
    </table>

  
    
    </div>
  )
}

export default UserList;