import axios from "axios"
import Swal from "sweetalert2";
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

export const putMember = (data,id) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `member/${id}`;
        axios.put(url,data)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: "Data berhasil diperbarui, untuk melihat perubahan, silahkan relogin.",
                    });
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
export const FetchAvailableMember = (id)=>{
    return (dispatch) => {
        dispatch(setLoadingAvail(true));
        let url = `member/data/${id}`;
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                dispatch(setMemberAvail(data));
                dispatch(setLoadingAvail(false));
            }).catch(function(error){
            
        })
    }
}
