import React, { useEffect, useState } from 'react'
import { Base_Url } from '../../config/api';
import axios from 'axios'

function Pickup() {
    const [pick,setPick]=useState(true);
    const [details,setDetails]=useState({
      "user":"",
      "category":"",
        "city":"",
        "state":"",
        "address":"",
        "othernumber":"",
        "items":"",
 "recycler":""
    })
    const [recyclers, setRecyclers] = useState([]);

    useEffect(()=>{
      const fetchrecyler=async()=>{
      try{
        const res=await axios.get(`${Base_Url}/api/getrecycler`)
        console.log(res.data.message)
        setRecyclers(res.data.message)
      }catch(err){
        console.log(err)
      }
    }
    fetchrecyler();
    },[])

    useEffect(() => {
       const token = localStorage.getItem('loggedIn');
      if (token) {
        const { userId } = JSON.parse(atob(token.split('.')[1])); 
        setDetails({ ...details, user: userId });
      }
    }, []);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setDetails({ ...details, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('loggedIn')
        
            const config = { headers : {"x-auth-token" : token}} 
        const response = await axios.post(`${Base_Url}/api/pickup`, details,config);
        console.log(response.data);
      } catch (error) {
        console.error('Error scheduling pickup:', error);
      }
    };
    
  return (
    <section className="vh-100 vw-100 pt-5 mt-5" >
    <div className="d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 justify-content-center align-items-center   ">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4">
                <h2 className="text-uppercase text-center mb-4">
              Pickup Schedule
                </h2>

                <form onSubmit={handleSubmit}>
                <div class="form-check">
  <input class="form-check-input" type="radio" name="category"  value={details.category}onChange={handleChange} checked/>
  <label class="form-check-label" for="category">
    sell
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="category"  value={details.category}onChange={handleChange}/>
  <label class="form-check-label" for="exampleRadios2">
    donate
  </label>
</div>
                  <div className="form-outline mb-2">
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="Enter city"
                      value={details.city}
                     onChange={handleChange}
                    />
              </div>

              <div className="form-outline mb-2">
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      placeholder="Enter state"
                      value={details.state}
                     onChange={handleChange}
                    />
              </div>
                   
             
                  <div className="form-group">
    
    <textarea className="form-control" name="address" value={details.address}
                     onChange={handleChange}rows="3"></textarea>
  </div>
                   
                 

                 
                  <div className="form-outline mb-2">
                    <input
                      type="number"
                      name="othernumber"
                      className="form-control"
                      placeholder="Enter alternativenumber"
                      value={details.othernumber}
                     onChange={handleChange}
                    />
              </div>
                    
              <div className="form-outline mb-2">
                    <input
                      type="text"
                      name="items"
                      className="form-control"
                      placeholder="Enter type of scrap"
                      value={details.items}
                     onChange={handleChange}
                    />
              </div>
                    
              <select name="recycler" value={details.recycler} onChange={handleChange}>
        <option value="">Select Recycler</option>
        {recyclers.map(recycler => (
          <option key={recycler._id} value={recycler._id}>{recycler.name}</option>
        ))}
      </select>     
                    
                  

            

                

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-dark btn-lg btn-block"
                    >
                     submit
                    </button>
                  </div>

                
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>   

  )
}

export default Pickup