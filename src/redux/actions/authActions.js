import { AUTH} from './_constants';
import axios from 'axios';
import Swal from 'sweetalert2'
import {store,destroy} from "components/model/app.model";
import setAuthToken from '../../utils/setAuthToken';
import {HEADERS} from "./_constants";
// import {getPaket} from "./product/paket.action";
import {getCart} from "./product/cart.action";
import Cookies from 'js-cookie'

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
                        // console.log(res);
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


    export const createMember = (data) => {
        return (dispatch) => {
            dispatch(setLoading(true))
            const url = HEADERS.URL + `auth/register`;
            axios.post(url, data)
                .then(function (response) {
                    const data = (response.data)
                    if (data.status === 'success') {
                        Swal.fire({
                            title: 'Success',
                            type: 'success',
                            text: data.msg,
                        });
                        window.location.reload();
                    } else {
                        Swal.fire({
                            title: 'failed',
                            type: 'error',
                            text: data.msg,
                        });
                    }
                    dispatch(setLoading(false));
                    dispatch(setRegistered(true));
                })
                .catch(function (error) {
                    dispatch(setLoading(false));
                    Swal.fire({
                        title: 'failed',
                        type: 'error',
                        text: error.response.data.msg,
                    });
                    if (error.response) {
                    }
                })
        }
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
                dispatch(setIsError(false));

                // save token to localStorage
                const token = res.data.result.token;
                store('sess', {
                    id: res.data.result.id,
                    full_name: res.data.result.full_name,
                    mobile_no: res.data.result.mobile_no,
                    membership: res.data.result.membership,
                    referral_code: res.data.result.referral_code,
                    status: res.data.result.status,
                    picture: res.data.result.picture,
                    have_pin: res.data.result.have_pin,
                    have_ktp: res.data.result.have_ktp,
                });

                Cookies.set('sangqu_datum', btoa(token), {
                    expires: 1
                });
                Cookies.set('sangqu_exp', btoa(res.data.result.id), {
                    expires: 1
                });

            
                // Set token to Auth Header 
                setAuthToken(token);
                // decode token to set user data
                dispatch(setCurrentUser(res.data.result));
                dispatch(setLoggedin(true));
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

export function setLoading(load){
    return {type : AUTH.LOADING,load}
}

export function setRegistered(load){
    return {type : AUTH.REGISTERED,load}
}

export function setIsError(load) {
    return {
        type: AUTH.IS_ERROR_NO,
        load
    }
}

export const setCurrentOtp = decoded =>{
    return{
        type: AUTH.SET_CURRENT_OTP,
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
    destroy('sess');
    Cookies.remove('sangqu_datum');
    Cookies.remove('sangqu_exp');
    dispatch(setLoggedin(false));
    localStorage.clear()

    // remove auth header for future request
    setAuthToken(false);
    // Set current user to {} and isAuthenticated to false
    dispatch(setCurrentUser({}));

}

