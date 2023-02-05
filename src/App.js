import { useEffect } from 'react';
import './App.css';
 import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddUpdate from './pages/AddUpdate';
 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import View from './pages/View';
 
import Register from './components/Register';
import { auth } from './firebase.js';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from "./redux/reducers/userSlice.js";

const App=()=>{

  const user = useSelector(selectUser);
  
   const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //Logged in

        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));
      }
      else {
        // Logged out
        dispatch(logout());
      }
    });

    return unsubscribe;

  }, [dispatch])


  return (
    <div className='main'>
      {!user ? (
        <> 
        <h1 style={{display:"flex" , alignContent:"center", justifyContent:"center" }}>Welcome to the Student Management App</h1>
        <Register/>
        </>
      ) : (
       <Router>
        
           <div className='App'>
            <Navbar />
            <ToastContainer position='top-center'/>
            <Routes>
                <Route exact path='/' element={<Home user={user} />} />
            <Route exact path='/add' element={<AddUpdate/>} />
            <Route exact path='/update/:id' element={<AddUpdate/>} />
            <Route exact path='/view/:id' element={<View user={user}/>} />
            </Routes>
           </div>
       </Router>
      )
      }
    </div>
  );
}

export default App;