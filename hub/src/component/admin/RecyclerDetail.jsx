import React,{useEffect,useState} from 'react';


import axios from 'axios';
import { Base_Url } from '../../config/api';
import { useNavigate } from 'react-router-dom';











function RecyclerDetail() {
  
    const [recycler, setRecycler] = useState([]);
    const [update,setUpdate]=useState(-1);
    const navigate=useNavigate();
    

    useEffect(() => {
       
       
         axios.get(`${Base_Url}/api/getrecycler`)

            .then(res => {
                
                 setRecycler([recycler,...res.data.message]);
                console.log("Use data:", res.data.message);
                
            })
    }, []);
    
    
    const updaterecycler = (id) => {
      const current= recycler.filter( (recycle) => recycle.recyclerId=== id)
      setRecycler[{...current}]
      console.log(current);
      navigate('/update')
  }
   const deleterecycler=(id) =>{
     axios.delete(`${Base_Url}/api/recycler/${id}`)
     
     const removeRecycler=recycler.filter((recycle)=>recycle._id!=id);
     console.log("hi",removeRecycler);
     setUser(removeRecycler);

   }
  

  return (
    <div className=' vh-100 vw-100 justify-content-center mt-5 pt-2'>
    <h2 className="bg-warning">RecyclerDetails</h2>
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
  
</div>
 
    <table className='table table-hover'>
        <thead className='table-dark'>
            <tr>
           
                <th >recyclerId</th>
                <th>Name</th>
                <th>email</th>
               <th></th>
                




                <th></th>
            </tr>
        </thead>
        <tbody>
            {
    recycler.map((item, index) => (
                 update===item._id?<EditLead item={item} lead={lead} set={setLead} handleEdit={handleEdit}  />:
                <tr  className="table" key={index}> 
                
                    <td >{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    
                   
                 <td><button type="submit" className='btn btn-success'  onClick={ () => deleterecycler(item._id)}>Delete</button></td>

                    <td></td>

                </tr>
            ))}
           
        </tbody>
    </table>

  
    
    </div>
  )
}

export default RecyclerDetail;