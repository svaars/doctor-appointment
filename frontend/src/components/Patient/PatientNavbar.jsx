import React, { useContext, useState } from 'react'
import ProfileImage from "../Common/ProfileImage"

import {MenuOutlined, CloseOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom'

import "../Style/PatientNavbar.scss"
import { Button } from 'antd'
import { AuthContext } from '../../context/AuthContext'

export default function PatientNavbar({username}) {
    const [menuOpened, setMenuOpened] = useState(false);

    const {logout} = useContext(AuthContext);
  return (
    <nav id='patient-nav'>
        <div className="left">
            <ProfileImage />
            <div className="stack">
                <span id='greeting'>Goodmorning,</span>
                <span id='username'>{username}</span>
            </div>
        </div>
        <div className="right">
            <MenuOutlined onClick={()=>setMenuOpened(prev=>!prev)}/>
            
        </div>
        {menuOpened && (
            <div id="menu">
                <div id="top-control">
                    <CloseOutlined onClick={()=>setMenuOpened(false)}/>
                </div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="#"></Link>
                    </li>
                    <li>
                        <Link to="#">Link 3</Link>
                    </li>
                    <li>
                        
                        <Button onClick={()=>{logout()}}>Logout</Button>
                    </li>
                </ul>
                
            </div>
        )}
        {menuOpened && (
            <div id="backdrop" onClick={()=>setMenuOpened(false)}>

            </div>
        )}
    </nav>
  )
}
