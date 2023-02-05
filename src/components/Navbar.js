import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import "./navbar.css";

import { auth } from "../firebase";

const Navbar = () => {


    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/') {
            setActiveTab("Home");
        }
        else if (location.pathname === '/add') {
            setActiveTab("AddStudent");
        }
    }, [location])

    return (
        <>
           
            <div className='header'>
                <Link to='/'>
                    <p className='logo'>LOGO</p>
                </Link>
                <div className='header-right'>
                    <Link to='/add'>
                        <p className={`${activeTab === "AddStudent" ? 'active' : ""}`} onClick={() => setActiveTab('AddStudent')}>Add Student</p>
                    </Link>
                    <Link to='/'>
                        <p className={`${activeTab === "Home" ? 'active' : ""}`} onClick={() => setActiveTab('Home')}>Manage Student</p>
                    </Link>

                    <Link to='/'>
                        <p className={`${activeTab === "Home" ? 'active' : ""}`} onClick={() => auth.signOut()} >Logout</p>
                    </Link>
                     


                </div>
            </div>
             
        </>
    )
}

export default Navbar;