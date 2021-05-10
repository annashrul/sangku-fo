import {PIN, HEADERS, RESET_PROPS} from "../_constants";
import axios from 'axios'
import Swal from "sweetalert2";
import {ModalToggle} from "redux/actions/modal.action";

export function setLoading(load){
    return {type : PIN.LOADING,load}
}
export function setLoadingAvail(load){
    return {type : PIN.LOADING_AVAILABLE,load}
}

export function setKategori(data = []) {
    return {
        type: PIN.SET_KATEGORI,
        data
    }
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
export function setPinMutasi(data=[]){
    return {type:PIN.SUCCESS_MUTASI,data}
}
export function setPinFailed(data=[]){
    return {type:PIN.FAILED,data}
}
export const FetchPin = (page=1,id='',where='',perpage=9,type='')=>{
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

export const FetchDetailPinWebView = (id,token) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `pin/get/${id}`;

        axios.get(HEADERS.URL + url, {
            headers: {
                Authorization: token,
                username: HEADERS.USERNAME,
                password: HEADERS.PASSWORD,
                myconnection: `apps`,
                'Content-Type': `application/x-www-form-urlencoded`
            }
        })
            .then(function (response) {
                const data = response.data;

                dispatch(setPinDetail(data));
                dispatch(setLoading(false));
            }).catch(function (error) {

            })
    }
}
export const FetchAvailablePinWebView = (token) => {
    return (dispatch) => {
        dispatch(setLoadingAvail(true));
        let url = 'transaction/pin_available';
        axios.get(HEADERS.URL + url, {
            headers: {
                Authorization: token,
                username: HEADERS.USERNAME,
                password: HEADERS.PASSWORD,
                myconnection: `apps`,
                'Content-Type': `application/x-www-form-urlencoded`
            }
        })
            .then(function (response) {
                const data = response.data;

                dispatch(setAvailablePin(data));
                dispatch(setLoadingAvail(false));
            }).catch(function (error) {

            })
    }
}

export const FetchDetailPin = (id,where='',page=1,perpage=10)=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        // let url=`pin/get/${id}`;
        let url = '';
        if(where===''){
            url=`pin/get/${id}?page=${page}`;
        }else{
            url=`pin/get/${id}?page=${page}&${where}`;
        }
        if(perpage!==''){
            url+=`&perpage=${perpage}`
        }
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                
                dispatch(setPinDetail(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}
export const FetchMutasiPin = (id,where='',page=1,perpage=10)=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        // let url=`pin/get/${id}`;
        let url = '';
        if(where===''){
            url=`pin/mutasi?page=${page}&id_member=${id}`;
        }else{
            url=`pin/mutasi?page=${page}&id_member=${id}${where}`;
        }
        if(perpage!==''){
            url+=`&perpage=${perpage}`
        }
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                
                dispatch(setPinMutasi(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}
export const FetchAvailablePin = (type='aktivasi')=>{
    return (dispatch) => {
        dispatch(setAvailablePin(RESET_PROPS));
        dispatch(setLoadingAvail(true));
        let url = 'transaction/pin_available?type='+type;
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
                const data = response.data;
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Informasi.',
                        type: 'success',
                        text: 'Reaktivasi Berhasil!',
                    })
                } else {
                    Swal.fire({
                        title: 'Informasi.',
                        type: 'danger',
                        text: 'Reaktivasi gagal. Silahkan ulangi beberapa saat lagi.',
                    })
                }
                dispatch(ModalToggle(false));
                dispatch(FetchAvailablePin('aktivasi'))
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                // dispatch(setLoading(false));
                dispatch(ModalToggle(false));
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

export const pinTransfer = (data, type) => {
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
                const data = response.data;
                if(data.status==='success'){
                    Swal.fire({
                        title: 'Informasi.',
                        type: 'info',
                        text: 'Transfer sukses!',
                    })
                }else{
                    Swal.fire({
                        title: 'Informasi.',
                        type: 'danger',
                        text: 'Transfer gagal. Silahkan ulangi beberapa saat lagi.',
                    })
                }
                dispatch(ModalToggle(false));
                dispatch(FetchAvailablePin(type===0?'aktivasi':'ro'))
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                dispatch(setLoading(false));
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

export const pinRoAktivasi = (data) => {
    return (dispatch) => {
        Swal.fire({
            allowOutsideClick:false,
            title: 'Silahkan tunggu.',
            html: 'Sedang mengaktivasi..',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })
        const url = HEADERS.URL + `pin/aktivasi/ro`;
        axios.post(url, data)
            .then(function (response) {
                Swal.close()
                const data = response.data;
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Informasi.',
                        type: 'success',
                        text: 'Aktivasi sukses!',
                    })
                } else {
                    Swal.fire({
                        title: 'Informasi.',
                        type: 'danger',
                        text: 'Aktivasi gagal. Silahkan ulangi beberapa saat lagi.',
                    })
                }
                dispatch(ModalToggle(false));
                dispatch(FetchAvailablePin('ro'))
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                // dispatch(setLoading(false));
                dispatch(ModalToggle(false));
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
