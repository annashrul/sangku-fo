import {NETWORK, HEADERS} from "../_constants";
import axios from 'axios'

export function setLoading(load=true){
    return {type : NETWORK.LOADING,load}
}

export function setNetwork(data=[]){
    return {type:NETWORK.SUCCESS,data}
}

export const FetchNetwork = (uid,first,param)=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `member/${param}/`;
        if(first){
            url+=`${uid}?isfirst=true`
        } else {
            url+=`${uid}`
        }
        axios.get(HEADERS.URL+url)
        .then(function(response){
            const data = response.data;
            
            dispatch(setNetwork(data));
            dispatch(setLoading(false));
        }).catch(function(error){
            dispatch(setLoading(false));
        })
    }
}

export const FetchNetworkWebview = (uid, first, param,token) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `member/${param}/`;
        if (first) {
            url += `${uid}?isfirst=true`
        } else {
            url += `${uid}`
        }
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

                dispatch(setNetwork(data));
                dispatch(setLoading(false));
            }).catch(function (error) {
                dispatch(setLoading(false));
            })
    }
}