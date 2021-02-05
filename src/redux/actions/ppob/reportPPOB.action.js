import {
    REPORT_PPOB,
    HEADERS
} from "../_constants"
import axios from "axios"

export function setLoading(load) {
    return {
        type: REPORT_PPOB.LOADING,
        load
    }
}

export function setData(data = []) {
    return {
        type: REPORT_PPOB.SUCCESS,
        data
    }
}


export const getReportPPOB = (where='')=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url=`transaction/ppob/report`;
        if(where!==''){
            url+=`?${where}`
        }
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setData(data));
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                dispatch(setLoading(false));
            })
    }
}

