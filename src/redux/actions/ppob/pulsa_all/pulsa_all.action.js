import {PULSA_ALL, HEADERS} from "../../_constants";
import axios from 'axios'

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
export const FetchPulsaAll = (value,provider)=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = '';
        if(provider!==''){
            url=`transaction/produk/list?${provider}=${value}`;
        }
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