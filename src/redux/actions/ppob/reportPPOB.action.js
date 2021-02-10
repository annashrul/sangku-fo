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
export function setDetail(data = []) {
    return {
        type: REPORT_PPOB.DETAIL,
        data
    }
}
export function setLoadingDetail(load) {
    return {
        type: REPORT_PPOB.LOAD_DETAIL,
        load
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

export const getReportDetail = (kd_trx) => {
    return (dispatch) => {
        dispatch(setLoadingDetail(true));
        let url = `transaction/ppob/report/${kd_trx}`;
        axios.get(HEADERS.URL + url)
            .then(function (response) {
                const data = response.data;
                dispatch(setDetail(data));
                dispatch(setLoadingDetail(false));
            })
            .catch(function (error) {
                dispatch(setLoadingDetail(false));
            })
    }
}
