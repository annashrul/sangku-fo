import {
    PENJUALAN,
    HEADERS
} from "../_constants"
import axios from "axios"

export function setLoadingReport(load) {
    return {
        type: PENJUALAN.LOADING_REPORT,
        load
    }
}
export function setLoadingReportDetail(load) {
    return {
        type: PENJUALAN.LOADING_REPORT_DETAIL,
        load
    }
}
export function setLoadingReportExcel(load) {
    return {
        type: PENJUALAN.LOADING_REPORT_EXCEL,
        load
    }
}
export function setReport(data = []) {
    return {
        type: PENJUALAN.SUCCESS_REPORT,
        data
    }
}
export function setReportDetail(data = []) {
    return {
        type: PENJUALAN.SUCCESS_REPORT_DETAIL,
        data
    }
}
export function setReportExcel(data = []) {
    return {
        type: PENJUALAN.SUCCESS_REPORT_EXCEL,
        data
    }
}
export const getReportPenjualan = (page=1,where='')=>{
    return (dispatch) => {
        dispatch(setLoadingReport(true));
        let url=`transaction/penjualan/report?page=${page==='NaN'||page===null||page===''||page===undefined?1:page}`;
        if(where!==''){
            url+=where
        }
        
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setReport(data));
                dispatch(setLoadingReport(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingReport(false));
            })

    }
}
export const getReportPenjualanDetail = (id='')=>{
    return (dispatch) => {
        dispatch(setLoadingReportDetail(true));
        let url=`transaction/penjualan/report/${id}`;
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setReportDetail(data));
                dispatch(setLoadingReportDetail(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingReportDetail(false));
            })

    }
}

export const getReportPenjualanExcel = (page=1,where='',perpage=99999)=>{
    return (dispatch) => {
        dispatch(setLoadingReportExcel(true));
        let url=`transaction/penjualan/report?page=${page==='NaN'||page===null||page===''||page===undefined?1:page}&perpage=${perpage}`;
        if(where!==''){
            url+=where
        }
        
        axios.get(HEADERS.URL+url)
            .then(function(response){
                const data = response.data;
                
                dispatch(setReportExcel(data));
                dispatch(setLoadingReportExcel(false));
            }).catch(function(error){
            
        })
    }
}