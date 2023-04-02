import { useContext, useEffect } from 'react'
import {AuthContext} from "../context/AuthContext"
import axios from 'axios'
import { server_uri } from '../utils/constants/config';

const WithAxios = ({ children }) => {
    const { token,setToken } = useContext(AuthContext);

    useEffect(() => {
        axios.interceptors.request.use(config=>{
            if(token){
                config.headers['Authorization'] = 'Bearer '+token;
            }
            config.headers['Content-Type'] = 'application/json';
            return config;
        },
        err=>{
            Promise.reject(err)
        })

        axios.interceptors.response.use((response) => { // block to handle success case
            return response
         }, function (error) { // block to handle error case
            const originalRequest = error.config;
         
            if (error.response.status === 401 && originalRequest.url ===
         server_uri+"/users/refresh-token") { // Added this condition to avoid infinite loop 
                // Redirect to any unauthorised route to avoid infinite loop...
                return Promise.reject(error);
            }
         
            if (error.response.status === 401 && !originalRequest._retry) { // Code inside this block will refresh the auth token
         
                originalRequest._retry = true;
                // const refreshToken = 'xxxxxxxxxx'; // Write the  logic  or call here the function which is having the login to refresh the token.
                return axios.post(server_uri+'/users/refresh-token',
                    {}, {withCredentials:true})
                    .then(res => {
                        if (res.status === 201) {
                            setToken(res.data.token)
                            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token');
                            return axios(originalRequest);
                        }
                    })
            }
            return Promise.reject(error);
        });
    },[token,setToken]);

    return children;
}

export default WithAxios
