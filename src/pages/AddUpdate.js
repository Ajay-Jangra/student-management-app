import React, { useState ,useEffect} from 'react' ;
import{ toast} from "react-toastify";
import "./addupdate.css";
import firebaseDB from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const initialState = {
    fname: '',
    mname: '',
    lname: '',
    class_: '',
    division: '',
    roll_number: '',
    address1: '',
    address2: '',
    landmark: '',
    city: '',
    pincode: '',
}
const AddUpdate = () => {
    const navigate = useNavigate();
    const [state,setState] = useState(initialState);

    const { fname, mname, lname, class_, division, roll_number, address1, address2, landmark, city, pincode } = state;



    //  for view 
    const {id} = useParams();
    const [data, setData] = useState(initialState);
 

useEffect(() => {
        firebaseDB.child('student').on('value', (snapshop) => {
            if (snapshop.val() != null) {
                setData({ ...snapshop.val() });
            }
            else {
                setData({});
            }
        })
        return (
            setData({})
        )
    }, []);


useEffect(()=>{
    if(id){
        // if we have id then we can view and edit the prev data
       setState({...data[id]});
    }
    else{
        setState({...initialState});
    }
},[id,data])

const handleInputChange =(e)=>{
   
     const {name,value} = e.target;
     setState({...state ,[name]:value});
}


    // upto  here view functionality work
const handleSubmit =(e)=>{
    e.preventDefault();
    if(id){
        firebaseDB.child(`student/${id}`).set(state,(err)=>{
            if(err){
                toast.error(err)
            }
            else{
                toast.success("Student Updated Succesfully");
            }
        })
    }
    else if (!fname || !lname || !class_  || !division  || !roll_number  || !address1  || !address2  || !landmark  || !city  || !pincode){
        toast.error("ALL Field are requiered");
    }
    else if(roll_number<10 ||roll_number>99){
        toast.error("Roll Number should be two digits ");
    }
    else if (class_ <1 || class_ > 12) {
        toast.error("Class is between 1 to 12 ");
    }
    else if (division < 'A' || division > 'E') {
        toast.error("Division is between A to E ");
    }
    else if (pincode < 100000 || pincode > 999999) {
        toast.error("Pincode should have 6 digits.");
    }
    else{
        firebaseDB.child('student').push(state,(err)=>{
            if(err){
               
                toast.error(err);
            }
            else{
              toast.success("Succesfully added");

            }
        })

        setTimeout(()=> navigate('/') ,500);
    }


}

// load previous data 
    // refreshData
    function refreshPage() {
        window.location.reload(false);
    }

  return (
    <div style={{marginTop:"20px"}}>
          <div>
              <button style={{ color: "darkgray" }} className='btn btn-dark' onClick={refreshPage}>Load previous Data</button>
          </div>
        <form onSubmit={handleSubmit} className="dataDetailForm">
             <div className='basicInfo'>
              <input type="text" placeholder="Fname..."
                  id='name'
                  value={fname}
                  name='fname' 
                    onChange={handleInputChange}
                  />
              <input type="text" placeholder="mname..."
                id='mname'
                value={mname}
                name = 'mname'
                  onChange={handleInputChange}
                />
              <input type="text" placeholder="lname..."
                  id='lname'
                  value={lname}
                  name='lname' 
                  onChange={handleInputChange}
                  />
              <input type="number" placeholder="class..."
                  id='class_'
                  value={class_}
                  name='class_' 
                  onChange={handleInputChange}
                  />
              <input type="text" placeholder="division..."
                  id='division'
                  value={division}
                  name='division' 
                  onChange={handleInputChange}
                  />
              <input type="number" placeholder="roll_number..."
                  id='roll_number'
                  value={roll_number}
                  name='roll_number' 
                  onChange={handleInputChange}
                  />
              </div>
              <div className='addressInfo'>
              <input style={{width:"45%"}} type="text" placeholder="address1..."
                  id='address1'
                  value={address1}
                  name='address1' 
                  onChange={handleInputChange}
                  />
                  <input style={{ width: "45%" }} type="text" placeholder="address2..."
                  id='address2'
                  value={address2}
                  name='address2' 
                  onChange={handleInputChange}
                  />
                  </div>
              <div className='locationDetails'>
              <input type="text" placeholder="landmark..."
                  id='landmark'
                  value={landmark}
                  name='landmark' 
                  onChange={handleInputChange}
                  />
              <input type="text" placeholder="city..."
                  id='city'
                  value={city}
                  name='city' 
                  onChange={handleInputChange}
                  />
              <input type="number" placeholder="pincode..."
                  id='pincode'
                  value={pincode}
                  name='pincode' 
                   onChange={handleInputChange}
                  />
              </div>
              <div className='submitDiv'>
                  <input type='submit' value={ id ? "Update" : "Save"}/>
              </div>
        </form>
    </div>
  )
}

export default AddUpdate ;