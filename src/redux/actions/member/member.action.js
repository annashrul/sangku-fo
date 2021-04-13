import axios from "axios"
import Swal from "sweetalert2";
import { update } from "../../../components/model/app.model";
import { setLoggedin } from "../authActions";
import {MEMBER, HEADERS, NOTIF_ALERT} from "../_constants";


export function setLoadingPost(load) {
    return {
        type: MEMBER.LOADING_POST,
        load
    }
}
export function setLoadingAvail(load) {
    return {
        type: MEMBER.LOADING_AVAIL,
        load
    }
}
export function setMemberAvail(data=[]) {
    return {
        type: MEMBER.SUCCESS_AVAIL,
        data
    }
}
export function setLoadingDetailMember(load) {
    return {
        type: MEMBER.LOADING_DETAIL_MEMBER,
        load
    }
}
export function setMemberDetail(data=[]) {
    return {
        type: MEMBER.SUCCESS_DETAIL_MEMBER,
        data
    }
}

export const putMember = (data,id) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `member/${id}`;
        axios.put(url,data)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    dispatch(UpdateIndexDb(id))
                    // Swal.fire({
                    //     title: 'Success',
                    //     icon: 'success',
                    //     text: "Data berhasil diperbarui, untuk melihat perubahan, mungkin anda perlu melakukan login ulang.",
                    // });
                    Swal.fire({
                        allowOutsideClick: false,
                        title: 'Success',
                        icon: 'success',
                        text: "Data berhasil diperbarui, untuk melihat perubahan, mungkin anda perlu melakukan login ulang.",
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                            '<i class="fa fa-thumbs-up"></i> Okay!',
                        confirmButtonAriaLabel: 'Okay!',
                        // cancelButtonText:
                        //     '<i class="fa fa-thumbs-down"></i>',
                        // cancelButtonAriaLabel: 'Thumbs down'
                    }).then((result) => {
                        // 
                        if(result.value){
                            window.location.reload()
                        }
                    })
                    // window.location.href = '/'
                } else {
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: NOTIF_ALERT.FAILED,
                    });
                }
                dispatch(setLoadingPost(false));
            })
            .catch(function (error) {
                dispatch(setLoadingPost(false));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
                else{
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: error.response.data.msg,
                    });

                    if (error.response) {

                    }
                }

            })
    }
}
export const FetchAvailableMember = (id,upline='')=>{
    return (dispatch) => {
        dispatch(setLoadingAvail(true));
        let qString = ''
        if(upline!==''&&upline!==undefined&&upline!==null){
            qString = `?id_upline=${upline}`;
        }
        let url = `member/data/${id}${qString}`;
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                dispatch(setMemberAvail(data));
                dispatch(setLoadingAvail(false));
            }).catch(function(error){
                dispatch(setLoadingAvail(false));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
                else{
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: error.response.data.msg,
                    });

                    if (error.response) {

                    }
                }
        })
    }
}
export const FetchDetailMember = (id)=>{
    return (dispatch) => {
        dispatch(setLoadingDetailMember(true));
        let url = `member/get/${id}`;
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                dispatch(setMemberDetail(data));
                dispatch(setLoadingDetailMember(false));
            }).catch(function(error){
                dispatch(setLoadingDetailMember(false));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
                else{
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: error.response.data.msg,
                    });

                    if (error.response) {

                    }
                }
        })
    }
}
export const UpdateIndexDb = (id)=>{
    return (dispatch) => {
        let url = `member/get/${id}`;
        axios.get(HEADERS.URL+url)
            .then(function(res){
                if(res.data.status==='success'){
                    update('sess', {
                        id: res.data.result.id,
                        full_name: res.data.result.full_name,
                        mobile_no: res.data.result.mobile_no,
                        membership: res.data.result.membership,
                        referral_code: res.data.result.referral_code,
                        status: res.data.result.status,
                        picture: res.data.result.picture,
                        // have_pin: res.data.result.have_pin,
                        have_pin: true,
                    });

                // 
                    // Set token to Auth Header 
                    // setAuthToken(token);
                    // decode token to set user data
                    // setCurrentUser(res.data.result);
                    // Cookies.set('sangqu_datum', btoa(token), {
                    //     expires: 1
                    // });
                    // Cookies.set('sangqu_exp', btoa(res.data.result.id), {
                    //     expires: 1
                    // });
                    dispatch(setLoggedin(true));
                }
            }).catch(function(error){
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
                else{
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: error.response.data.msg,
                    });

                    if (error.response) {

                    }
                }
        })
    }
}
