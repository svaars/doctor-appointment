import React, { useContext, useEffect, useState } from 'react'
import { server_uri } from '../utils/constants/config';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Spin } from 'antd';
import PatientNavbar from '../components/Patient/PatientNavbar';

import "./Style/PatientDashboard.scss"
import { Outlet } from 'react-router-dom';

export default function PatientDashboard() {
    const [loading, setLoading] = useState(true);
    
    const [retryLogin, setRetryLogin] = useState(true);
    const [notLoggedIn, setNotLoggedIn] = useState(true);
    const [user, setUser] = useState(null);
    const {token} = useContext(AuthContext);
    
    const getUser = () => {
        axios
          .get(server_uri + "/users/me", {
            withCredentials: true,
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
           
            if(res.data.userType == "patient"){
              setNotLoggedIn(false);
              setUser(res.data);
            }
          })
          .catch((err) => {
            // if(err)
            if (err.response.status === 401) {
              setNotLoggedIn(true);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      };
      
      useEffect(() => {
        // verifyUser();
        
        
            getUser();
            setRetryLogin(false);
        
        
      }, [retryLogin]);
    
      if (loading) {
        return <Spin />;
      }
    
      if (notLoggedIn) {
        return <>Unauthorized</>;
      }
  return (
    <div id='patient-app'>
        <PatientNavbar username={user.firstname}/>
        <Outlet />
    </div>
  )
}