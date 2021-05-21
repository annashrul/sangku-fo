import {NETWORK, HEADERS} from "../_constants";
import axios from 'axios'

export function setLoading(load=true){
    return {type : NETWORK.LOADING,load}
}

export function setNetwork(data=[]){
    return {type:NETWORK.SUCCESS,data}
}
export function setUpline(data = []) {
    return {
        type: NETWORK.UPLINE,
        data
    }
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

            console.log("qwrqrqrqwrqwrq", response);
            dispatch(setNetwork(data));
            dispatch(setLoading(false));
        }).catch(function(error){
            console.log("asdadadadasdas",error.response.data);
            if (error.response.data!==undefined) dispatch(setNetwork(error.response.data));
            dispatch(setLoading(false));
        })
    }
}

export const FetchNetworkWebview = (uid, first, param,token,upline=false) => {
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
                    Authorization: atob(token),
                    username: HEADERS.USERNAME,
                    password: HEADERS.PASSWORD,
                    myconnection: `apps`,
                    'Content-Type': `application/x-www-form-urlencoded`
                }
            })
            .then(function (response) {
                const data = response.data;
                if (upline) dispatch(setUpline(data));
                else dispatch(setNetwork(data));
                dispatch(setLoading(false));
            }).catch(function (error) {
                dispatch(setLoading(false));
            })
    }
}
