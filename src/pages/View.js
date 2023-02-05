import React ,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import firebaseDB from '../firebase';
import "./view.css"
const View = ({user}) => {
    console.log({user});
    const [student , setStudent] = useState({});
    const {id} = useParams();
 
    useEffect(() => {
        firebaseDB.child(`student/${id}`).get().then((snapshop)=>{
            if(snapshop.exists()){
                setStudent({...snapshop.val()})
            }
            else{
                setStudent({});
            }
        })
    }, [id]);
    
  return (
    <div style={{marginTop:"20px"}}>
        <div className='card'>
            <div className='card-header'>
                <p>Student Details</p>
            </div>
            <div className='container'>
                <strong>ID: </strong>
                <span>{id}</span>
                <br/>
                <br/>
                  <strong>Name: </strong>
                  <span>{student.fname + " " + student.mname + " " + student.lname}</span>
                  <br />
                  <br />
                  <strong>Class: </strong>
                  <span>{student.class_ + "-" + student.division}</span>
                  <br />
                  <br />
                  <strong>RollNo: </strong>
                  <span>{student.roll_number}</span>
                  <br />
                  <br />
                  <strong>Address: </strong>
                  <span>{student.address1 + " " + student.address2}</span>
                  <br />
                  <br />
                  <strong>LandMark: </strong>
                  <span>{student.landmark}</span>
                  <br />
                  <br />
                  <strong>City/Pin: </strong>
                  <span>{student.city + "  /  " + student.pincode} </span>
                  <br />
                  <br />
                  <strong>Email/Contact: </strong>
                  <span> { user.email + "   /   " + student.contact} </span>
                  <br />
                  <br />
                  
                  <Link to="/">
                    <button className='btn btn-edit'>GO Back</button>
                  </Link>
            </div>
        </div>
    </div>
  )
}

export default View;