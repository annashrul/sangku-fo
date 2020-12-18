import { AUTH} from './_constants';
import axios from 'axios';
import Swal from 'sweetalert2'
import {store,destroy} from "components/model/app.model";
import setAuthToken from '../../utils/setAuthToken';
import {HEADERS} from "./_constants";
import {getPaket} from "./product/paket.action";
import {getCart} from "./product/cart.action";

// user register

export const sendOtp = (userData) =>
    async dispatch =>{
        Swal.fire({
            title: 'Please Wait.',
            html: 'Checking your account.',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })
        dispatch(setIsError(false));
        axios.post(HEADERS.URL+'auth/otp', userData)
            .then(res=>{
                setTimeout(
                    function () {
                        Swal.close()
                        // save token to localStorage
                        console.log(res);
                        dispatch(setCurrentOtp(res.data.result));
                        dispatch(setIsError(true));
                    },800)

            }).catch(err =>{
            Swal.close();
            if (err.message === 'Network Error') {
                dispatch(setIsError(false));
                Swal.fire(
                    'Server tidak tersambung!.',
                    'Periksa koneksi internet anda.',
                    'error'
                )
            }else{
                dispatch(setIsError(false));
                Swal.fire(
                    err.response.data.msg,
                    '',
                    'error'
                );
                dispatch({type: AUTH.GET_ERRORS, payload: err.response.data.msg})

            }
            // window.location.reload();
        });
    }




// Login user -- get token
export const loginUser = (userData) =>
    async dispatch =>{
        destroy('sess');
        Swal.fire({
            title: 'Please Wait.',
            html: 'Checking your account.',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })

        axios.post(HEADERS.URL+'auth', userData)
        .then(res=>{
            setTimeout(
            function () {
                Swal.close() 
                // save token to localStorage
                const token = res.data.result.token;
                store('sess', {
                    id: res.data.result.id,
                    token: res.data.result.token,
                    full_name: res.data.result.full_name,
                    mobile_no: res.data.result.mobile_no,
                    membership: res.data.result.membership,
                    referral_code: res.data.result.referral_code,
                    status: res.data.result.status,
                    picture: res.data.result.picture,
                    otp: res.data.result.otp,
                });
            
                // Set token to Auth Header 
                setAuthToken(token);
                // decode token to set user data
                dispatch(setCurrentUser(res.data.result));
                dispatch(setLoggedin(true));
                localStorage.setItem('sangku', btoa(token));
                dispatch(getCart());
                // if(res.data.result.otp===''&&res.data.result.otp===undefined){
                //     dispatch(setLoggedin(true));
                //     localStorage.setItem('sangku', btoa(token));
                // }
            },800)

        }).catch(err =>{
            Swal.close() 
            if (err.message === 'Network Error') {
                 Swal.fire(
                     'Server tidak tersambung!.',
                     'Periksa koneksi internet anda.',
                     'error'
                 )
            }else{
                Swal.fire(
                    err.response.data.msg,
                    '',
                    'error'
                )
                dispatch({type: AUTH.GET_ERRORS, payload: err.response.data.msg})

            }
            window.location.reload();
            
        });
    }

export function setIsError(load) {
    return {
        type: AUTH.IS_ERROR_NO,
        load
    }
}

export const setCurrentOtp = decoded =>{
    return{
        type: AUTH.SET_CURRENT_USER,
        payload: decoded
    }
}
// set user data
export const setCurrentUser = decoded =>{
    return{
        type: AUTH.SET_CURRENT_USER,
        payload: decoded
    }
}

//set loggedin
export const setLoggedin = decoded => {
    return {
        type: AUTH.SET_LOGGED_USER,
        payload: decoded
    }
}
// set logout user
export const logoutUser = () => dispatch =>{
    // remove jwtToken from localStorage
    // localStorage.removeItem('jwtToken');
    destroy('sess')
    dispatch(setLoggedin(false));
    localStorage.clear()

    // remove auth header for future request
    setAuthToken(false);
    // Set current user to {} and isAuthenticated to false
    dispatch(setCurrentUser({}));

}

