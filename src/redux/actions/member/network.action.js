import {NETWORK, HEADERS} from "../_constants";
import axios from 'axios'

export function setLoading(load){
    return {type : NETWORK.LOADING,load}
}

export function setNetwork(data=[]){
    return {type:NETWORK.SUCCESS,data}
}

export const FetchNetwork = (data,first)=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = '';
        if(first){
            url=`member/network/${data}?isfirst=true`
        } else {
            url=`member/network/${data}`
        }
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                
                dispatch(setNetwork(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}