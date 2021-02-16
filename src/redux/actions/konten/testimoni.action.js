import {
    TESTIMONI,
    HEADERS,
    NOTIF_ALERT
} from "../_constants"
import axios from "axios"
import { ModalToggle } from "../modal.action"
import Swal from "sweetalert2"

export function setLoadingTestimoni(load) {
    return {
        type: TESTIMONI.LOADING_TESTIMONI,
        load
    }
}
export function setLoadingTestimoniKategori(load) {
    return {
        type: TESTIMONI.LOADING_TESTIMONI_KATEGORI,
        load
    }
}
export function setLoadingTestimoniDetail(load) {
    return {
        type: TESTIMONI.LOADING_TESTIMONI_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: TESTIMONI.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: TESTIMONI.IS_ERROR,
        load
    }
}
export function setTestimoni(data = []) {
    return {
        type: TESTIMONI.SUCCESS_TESTIMONI,
        data
    }
}
export function setTestimoniKategori(data = []) {
    return {
        type: TESTIMONI.SUCCESS_TESTIMONI_KATEGORI,
        data
    }
}
export function setTestimoniDetail(data = []) {
    return {
        type: TESTIMONI.SUCCESS_TESTIMONI_DETAIL,
        data
    }
}
export const getTestimoni = (page=1,where='')=>{
    return (dispatch) => {
        dispatch(setLoadingTestimoni(true));
        let url=`content/testimoni?page=${page==='NaN'||page===null||page===''||page===undefined?1:page}`;
        if(where!==''){
            url+=where
        }
        
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setTestimoni(data));
                dispatch(setLoadingTestimoni(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingTestimoni(false));
            })

    }
}
export const getTestimoniKategori = (page=1,where='')=>{
    return (dispatch) => {
        dispatch(setLoadingTestimoniKategori(true));
        let url=`category/testimoni?page=${page==='NaN'||page===null||page===''||page===undefined?1:page}`;
        if(where!==''){
            url+=where
        }
        
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setTestimoniKategori(data));
                dispatch(setLoadingTestimoniKategori(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingTestimoniKategori(false));
            })

    }
}
export const getTestimoniDetail = (id='')=>{
    return (dispatch) => {
        dispatch(setLoadingTestimoniDetail(true));
        let url=`content/get/${id}`;
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setTestimoniDetail(data));
                dispatch(setLoadingTestimoniDetail(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingTestimoniDetail(false));
            })

    }
}
export const postTestimoni = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `content`;
        console.log("DATA TESTI",data);
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: NOTIF_ALERT.SUCCESS,
                    });
                    dispatch(ModalToggle(false));
                    dispatch(getTestimoni(1));
                } else {
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: NOTIF_ALERT.FAILED,
                    });
                    dispatch(ModalToggle(true));
                }
                dispatch(setLoadingPost(false));
            })
            .catch(function (error) {
                dispatch(setLoadingPost(false));
                dispatch(ModalToggle(true));
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