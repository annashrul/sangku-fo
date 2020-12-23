import {PIN, HEADERS} from "../_constants";
import axios from 'axios'

export function setLoading(load){
    return {type : PIN.LOADING,load}
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
export const FetchPin = (page=1,q='',perpage='')=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = '';
        if(q===''){
            url=`pin?page=${page}`;
        }else{
            url=`pin?page=${page}&q=${q}`;
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
        dispatch(setLoading(true));
        let url = 'transaction/pin_available';
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                
                dispatch(setAvailablePin(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}