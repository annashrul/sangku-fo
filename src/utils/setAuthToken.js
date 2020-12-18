import axios from 'axios';
import {HEADERS} from "../redux/actions/_constants";

const setAuthToken = token =>{

    if(token){
        // axios.AxiosRequestConfig.method.
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
        // axios.defaults.headers.common['identities'] = `${HEADERS.USERNAME}`;
        // axios.defaults.headers.common['sercet-id'] = `${HEADERS.PASSWORD}`;
        // axios.defaults.headers.common['connectifity-agent'] = `backoffice`;
        // axios.defaults.headers.common['Content-Type'] = `application/x-www-form-urlencoded`;
    }else{
        // delete auth header

        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;