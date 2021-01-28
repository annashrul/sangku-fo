import {PIN, HEADERS} from "../_constants";
import axios from 'axios'
import Swal from "sweetalert2";
import {ModalToggle} from "redux/actions/modal.action";

export function setLoading(load){
    return {type : PIN.LOADING,load}
}
export function setLoadingAvail(load){
    return {type : PIN.LOADING_AVAILABLE,load}
}

export function setPin(data=[]){
    return {type:PIN.SUCCESS,data}
}

export function setAvailablePin(data=[]){
    return {type:PIN.SUCCESS_AVAILABLE,data}
}

export function setPinDetail(data=[]){
    return {type:PIN.SUCCESS_DETAIL,data}
}
export function setPinFailed(data=[]){
    return {type:PIN.FAILED,data}
}
export const FetchPin = (page=1,id='',where='',perpage='',type='')=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = '';
        if(where===''){
            url=`member/pin/${id}?page=${page}`;
        }else{
            url=`member/pin/${id}?page=${page}&${where}`;
        }
        if(type!==''){
            url+=`&type=${type}`
        }
        if(perpage!==''){
            url+=`&perpage=${perpage}`
        }
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                
                dispatch(setPin(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}
export const FetchDetailPin = (id)=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url=`pin/get/${id}`;
        
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                
                dispatch(setPinDetail(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}
export const FetchAvailablePin = ()=>{
    return (dispatch) => {
        dispatch(setLoadingAvail(true));
        let url = 'transaction/pin_available';
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                
                dispatch(setAvailablePin(data));
                dispatch(setLoadingAvail(false));
            }).catch(function(error){
            
        })
    }
}


export const pinReaktivasi = (data) => {
    return (dispatch) => {
        Swal.fire({
            allowOutsideClick:false,
            title: 'Silahkan tunggu.',
            html: 'Sedang memproses aktivasi..',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })
        const url = HEADERS.URL + `pin/reaktivasi`;
        axios.post(url, data)
            .then(function (response) {
                Swal.close()
                dispatch(ModalToggle(false));
                Swal.fire({
                    allowOutsideClick:false,
                    title: 'Informasi.',
                    type: 'info',
                    text: 'Reaktivasi sukses!',
                    showCancelButton: false,
                    showConfirmButton: true
                }).then((result) => {
                    if(result){
                        window.location.reload();
                    }
                })
            })
            .catch(function (error) {
                // dispatch(setLoading(false));
                Swal.fire({
                    title: 'failed',
                    type: 'error',
                    text: error.response === undefined?'error!':error.response.data.msg,
                });
                if (error.response) {
                }
            })
    }
}

export const pinTransfer = (data) => {
    return (dispatch) => {
        Swal.fire({
            allowOutsideClick:false,
            title: 'Silahkan tunggu.',
            html: 'Sedang melakukan transfer..',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })
        const url = HEADERS.URL + `pin/transfer`;
        axios.post(url, data)
            .then(function (response) {
                Swal.close()
                dispatch(ModalToggle(false));
                Swal.fire({
                    allowOutsideClick:false,
                    title: 'Informasi.',
                    type: 'info',
                    text: 'Transfer sukses!',
                    showCancelButton: false,
                    showConfirmButton: true
                }).then((result) => {
                    if(result){
                        window.location.reload();
                    }
                })
            })
            .catch(function (error) {
                // dispatch(setLoading(false));
                Swal.fire({
                    title: 'failed',
                    type: 'error',
                    text: error.response === undefined?'error!':error.response.data.msg,
                });
                if (error.response) {
                }
            })
    }
}
