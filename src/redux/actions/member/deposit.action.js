import axios from "axios"
import Swal from "sweetalert2";
import {DEPOSIT, HEADERS, NOTIF_ALERT} from "../_constants";


export function setLoading(load) {
    return {
        type: DEPOSIT.LOADING,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: DEPOSIT.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: DEPOSIT.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: DEPOSIT.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: DEPOSIT.SUCCESS,
        data
    }
}

export function setDataDetail(data = []) {
    return {
        type: DEPOSIT.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: DEPOSIT.FAILED,
        data
    }
}

export function setLoadingReport(load) {
    return {
        type: DEPOSIT.LOADING_REPORT,
        load
    }
}
export function setReport(data = []) {
    return {
        type: DEPOSIT.SUCCESS_REPORT,
        data
    }
}
export function setPersen(data = []) {
    return {
        type: DEPOSIT.SUCCESS_PERSEN,
        data
    }
}
export function setReportExcel(data=[]){
    return {type:DEPOSIT.SUCCESS_REPORT_EXCEL,data}
}
export const postDeposit = (data) => {
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
        const url = HEADERS.URL + `transaction/deposit`;
        axios.post(url,data)
            .then(function (response) {
                Swal.close()
                const data = (response.data);
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Sukses.',
                        html: `Permintaan Deposit Diterima, Silahkan lakukan pengunggahan bukti transfer.`,
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: `Unggah Bukti`,
                    }).then((result) => {
                        if (result.value) {
                            window.location.href = "/invoice/" + btoa(data.result.kd_trx);
                        }

                    })
                    // window.location.href = "/invoice/" + btoa(data.result.kd_trx);

                    dispatch(setIsError(true));
                } else {
                    Swal.fire({
                        title: 'Perhatian.',
                        html: `Anda masih memiliki transaksi yang belum selesai.`,
                        icon: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: `Lihat Transaksi`,
                    }).then((result) => {
                        if (result.value) {
                            window.location.href = "/invoice/" + btoa(data.result.kd_trx);
                        }

                    })
                    dispatch(setIsError(false));
                }
                dispatch(setLoadingPost(false));
            })
            .catch(function (error) {
                Swal.close()
                dispatch(setLoadingPost(false));
                dispatch(setIsError(false));
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

export const cancelDeposit = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));
        const url = HEADERS.URL + `transaction/deposit/${localStorage.kdTrxInvoice}`;
        Swal.fire({
            title: 'Tunggu sebentar',
            html: 'sistem sedang memproses transaksi anda',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })
        axios.post(url,data)
            .then(function (response) {

                setTimeout(
                    function () {
                        Swal.close();
                        const data = (response.data);
                        if (data.status === 'success') {
                            localStorage.removeItem("kdTrxInvoice");
                            Swal.fire({
                                title: 'Berhasil !!!',
                                html:`Transaksi Anda Berhasil Dibatalkan`,
                                icon: 'success',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: `Invoice`,
                                cancelButtonText: 'Oke',
                            }).then((result) => {
                                window.location.href="/deposit";
                            })
                            dispatch(setIsError(true));
                        } else {
                            Swal.fire({
                                title: 'failed',
                                icon: 'error',
                                text: NOTIF_ALERT.FAILED,
                            });
                            dispatch(setIsError(false));
                        }
                        dispatch(setLoadingPost(false));
                    }
                    ,800
                );



            })
            .catch(function (error) {
                dispatch(setLoadingPost(false));
                dispatch(setIsError(false));
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
        let url=`transaction/deposit?page=${page==='NaN'||isNaN(page)?1:page}`;
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
        let url=`transaction/deposit?page=${isNaN(page)||page==='NaN'?1:page}&perpage=${isNaN(perpage)||perpage==='NaN'?99999:perpage}`;
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