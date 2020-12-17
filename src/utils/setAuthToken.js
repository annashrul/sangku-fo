import axios from 'axios';
import {HEADERS} from "../redux/actions/_constants";

const setAuthToken = token =>{
    if(token){
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
        // axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjNmM4ZmQwYi1hNDYzLTRhMzYtOGEyNS01Y2FjY2FlNmVlYTEiLCJpYXQiOjE2MDIyMjI1NjcsImV4cCI6MTYwNDgxNDU2N30.icI8UcB1Jt1_iNDHnZRX7etyasanVJeSVkZhmlQWdNI';
        axios.defaults.headers.common['username'] = `${HEADERS.USERNAME}`;
        axios.defaults.headers.common['password'] = `${HEADERS.PASSWORD}`;
        axios.defaults.headers.common['myconnection'] = `backoffice`;
        axios.defaults.headers.common['Content-Type'] = `application/x-www-form-urlencoded`;
    }else{
        // delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;