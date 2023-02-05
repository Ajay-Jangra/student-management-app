import React ,{useEffect, useState} from 'react'
import firebaseDB from '../firebase'
import { Link } from 'react-router-dom';
import "./home.css";
import { toast } from 'react-toastify';
const Home = ({user}) => {
    const [data,setData] = useState({});

    useEffect(()=>{
     firebaseDB.child('student').on('value',(snapshop)=>{
           if(snapshop.val() != null){
            setData({...snapshop.val()});
           }
           else{
            setData({});
           }
     })
     return( 
        setData({})
     )
    },[]);
     

    // delete row 

    const  onDelete=(id)=>{
        if(window.confirm("Are you sure to delete the student data.")){
            firebaseDB.child(`student/${id}`).remove((err)=>{
                if(err){
                    toast.error(err);
                }
                else{
                    toast.success("Succesfully delete the user");
                }
            })
        }
    }
    // refreshData
    function refreshPage() {
        
        window.location.reload(false);
    }
    // console.log(user);
  return (
    <div style={{marginTop:"50px"}}>
    
          <div className='userProfile'>
              <h2>Manage Student</h2>
              <p>{user.email}</p>
          </div>
          <div>
              <button style={{color:"darkgray"}} className='btn btn-dark' onClick={refreshPage}>Refresh Data</button>
          </div>
        <table className='table-stayled'>
            <thead>
                <tr>
                      <th style={{ textAlign: "center" }}>No.</th>
                      <th style={{ textAlign: "center" }}>Name</th>
                      <th style={{ textAlign: "center" }}>Class</th>
                      <th style={{ textAlign: "center" }}>RollNo.</th>
                      <th style={{ textAlign: "center" }}>View/Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(data).map((id,index)=>{
                   return(
                    <tr key={id}>
                        <th>{index + 1}</th>
                           <td>{data[id].fname + " " + data[id].mname + " " + data[id].lname}</td>
                           <td>{data[id].class_ + "-" + data[id].division}</td>  
                           <td>{data[id].roll_number}</td>
                           <td>
                               <Link to={`/view/${id}`} >
                                   <button className='btn btn-view'>View</button>
                               </Link>
                            <Link to={`/update/${id}`} >
                                <button className='btn btn-edit'>Edit</button>
                            </Link>
                            <button className='btn btn-delete' onClick={()=> onDelete(id)}>Delete</button>
                           </td>
                    </tr>
                   )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Home