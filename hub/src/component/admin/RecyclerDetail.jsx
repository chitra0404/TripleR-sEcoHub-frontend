import React,{useEffect,useState} from 'react';
import '../../Styles/admin.css'

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
     setRecycler(removeRecycler);

   }
  

  return (
    <div className=' vh-100 vw-100 justify-content-center mt-5 pt-5'>
        <div
    className="text-white text-center d-flex align-items-center justify-content-center"
    style={{
      backgroundImage: 'url(https://t4.ftcdn.net/jpg/07/66/01/19/360_F_766011975_FGP3dxr1zJ79UxOTnDaqZT0MH4Elhinl.jpg)',
      backgroundSize: 'cover',
      width: '100%',
      minHeight: '300px',
    }}
  >
            <h2 className="display-4 font-weight-bolder text-light"style={{ fontWeight: '600' }}>RecyclerList</h2>

    
    </div>
    <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
  
</div>
 
    <table className='table table-bordered border border-3 shadow-sm'>
        <thead className='table'>
            <tr>
           
                <th >recyclerId</th>
                <th>Name</th>
                <th>email</th>
               <th>Address</th>
                




                <th></th>
            </tr>
        </thead>
        <tbody>
            {
    recycler.map((item, index) => (
                 update===item._id?<EditLead item={item} lead={lead} set={setLead} handleEdit={handleEdit}  />:
                <tr   key={index}> 
                
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