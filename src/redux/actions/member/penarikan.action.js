import axios from "axios"
import Swal from "sweetalert2";
import {PENARIKAN, HEADERS, NOTIF_ALERT} from "../_constants";


export function setLoading(load) {
    return {
        type: PENARIKAN.LOADING,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: PENARIKAN.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: PENARIKAN.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: PENARIKAN.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: PENARIKAN.SUCCESS,
        data
    }
}

export function setDataDetail(data = []) {
    return {
        type: PENARIKAN.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: PENARIKAN.FAILED,
        data
    }
}
export function setLoadingReport(load) {
    return {
        type: PENARIKAN.LOADING_REPORT,
        load
    }
}
export function setReport(data = []) {
    return {
        type: PENARIKAN.SUCCESS_REPORT,
        data
    }
}
export function setPersen(data = []) {
    return {
        type: PENARIKAN.SUCCESS_PERSEN,
        data
    }
}
export function setReportExcel(data=[]){
    return {
        type: PENARIKAN.SUCCESS_REPORT_EXCEL,
        data
    }
}
export const postPenarikan = (data) => {
    return (dispatch) => {
        Swal.fire({
            allowOutsideClick:false,
            title: 'Silahkan tunggu.',
            html: 'Sedang melakukan penarikan..',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));
        const url = HEADERS.URL + `transaction/withdrawal`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                Swal.close()
                if (data.status === 'success') {
                    // Swal.fire({
                    //     title: 'Berhasil !!!',
                    //     html:`Terimakasih telah melakukan transaksi`,
                    //     icon: 'success',
                    //     showCancelButton: true,
                    //     confirmButtonColor: '#3085d6',
                    //     cancelButtonColor: '#d33',
                    //     confirmButtonText: `Riwayat Penarikan`,
                    //     cancelButtonText: 'Oke',
                    // }).then((result) => {

                    // })
                    dispatch(setIsError(true));
                    dispatch(setData(data));
                } else {
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: NOTIF_ALERT.FAILED,
                    });
                    dispatch(setIsError(false));
                    dispatch(setDataFailed(data));
                }
                dispatch(setLoadingPost(false));
            })
            .catch(function (error) {
                Swal.close()
                dispatch(setLoadingPost(false));
                dispatch(setIsError(false));
                dispatch(setDataFailed(error.response.data));
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


export const FetchReport = (page = 1,where='') => {
    return (dispatch) => {
        dispatch(setLoadingReport(true));
        let url=`transaction/withdrawal?page=${page==='NaN'||isNaN(page)?1:page}`;
        if(where!==''){
            url+=`&${where}`
        }
        
        axios.get(HEADERS.URL+`${url}`)
            .then(function(response){
                const data = response.data;
                dispatch(setReport(data));
                dispatch(setLoadingReport(false));
            }).catch(function(error){
                dispatch(setLoadingReport(false));
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
                        text: error.response===undefined?'Something error!':error.response.data.msg,
                    });

                    if (error.response) {

                    }
                }
        })

    }
}
export const FetchReportExcel = (page=1,where='',perpage='') => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url=`transaction/withdrawal?page=${isNaN(page)||page==='NaN'?1:page}&perpage=${isNaN(perpage)||perpage==='NaN'?99999:perpage}`;
        if(where!==''){
            url+=`&${where}`
        }
        
        axios.get(HEADERS.URL+`${url}`, {
            onDownloadProgress: progressEvent => {
                const total = parseFloat(progressEvent.total);
                const current = parseFloat(progressEvent.loaded);
                let percentCompleted = Math.floor(current / total * 100)
                dispatch(setPersen(percentCompleted));
            }
        })
            .then(function(response){
                const data = response.data;
                dispatch(setReportExcel(data));
                dispatch(setLoading(false));
                dispatch(setPersen(0));
            }).catch(function(error){
                dispatch(setLoading(false));
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
                        text: error.response===undefined?'Something error!':error.response.data.msg,
                    });

                    if (error.response) {

                    }
                }
        })

    }
}