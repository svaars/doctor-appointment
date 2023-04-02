import { notification } from 'antd'
import axios from 'axios'
const {server_uri} = require("../utils/constants/config")

const getSession = (date)=>{
    return axios.get(server_uri +  "/sessions",{date}).catch(err=>{
        notification.open({message: 'Error!',
        description:
          'Could not get session! '
        })
    })
}

const createSession = (session)=>{
    return axios.post(server_uri+"/sessions", session).then(res=>{
        if(res.status==200){
            notification.open({message: 'New session created!',
            description:
            'Successfully created new session!'
            })
        }
        return res.data.session;
    }).catch((err)=>{
        console.log(err)
    })
}

export {getSession, createSession}