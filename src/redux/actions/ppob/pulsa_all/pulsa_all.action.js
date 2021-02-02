import {PULSA_ALL, HEADERS} from "../../_constants";
import axios from 'axios'
import * as Swal from "sweetalert2";
import {ModalToggle, ModalType} from "../../modal.action";

export function setLoading(load){
    return {type : PULSA_ALL.LOADING,load}
}

export function setPulsaAll(data=[]){
    return {type:PULSA_ALL.SUCCESS,data}
}

export function setAvailablePulsaAll(data=[]){
    return {type:PULSA_ALL.SUCCESS_AVAILABLE,data}
}

export function setPulsaAllDetail(data=[]){
    return {type:PULSA_ALL.SUCCESS_DETAIL,data}
}
export function setPulsaAllFailed(data=[]){
    return {type:PULSA_ALL.FAILED,data}
}
export function setLoadingPost(load) {
    return {
        type: PULSA_ALL.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: PULSA_ALL.IS_ERROR,
        load
    }
}


export const FetchPulsaAll = (where)=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url=`transaction/produk/list?${where}`;
        console.log(url);
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                
                dispatch(setPulsaAll(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}
export const FetchDetailPulsaAll = (id)=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url=`pulsa_all/get/${id}`;
        
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                
                dispatch(setPulsaAllDetail(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}
export const FetchAvailablePulsaAll = ()=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/pulsa_all_available';
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                
                dispatch(setAvailablePulsaAll(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}

export const postCheckoutPPOB = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(true));
        const url = HEADERS.URL + `transaction/prabayar/checkout`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                console.log(data.status);
                if(data.status ==='success'){
                    localStorage.removeItem("dataPPOB");
                    dispatch(setIsError(false));
                }else{
                    dispatch(setIsError(true));
                    Swal.fire(
                        'Terjadi Kesalahan!.',
                        data.msg,
                        'error'
                    );
                }
                dispatch(setLoadingPost(false));
            })
            .catch(function (error) {
                console.log("ERROR",error);
                dispatch(setLoadingPost(false));
                dispatch(setIsError(true));
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
