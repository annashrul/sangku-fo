import axios from "axios"
import Swal from "sweetalert2";
import {REDEEM, HEADERS} from "../_constants";
import {ModalToggle, ModalType} from "../modal.action";
export function setLoading(load) {
    return {
        type: REDEEM.LOADING,
        load
    }
}
export function setLoadingReport(load) {
    return {
        type: REDEEM.LOADING_REPORT,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: REDEEM.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: REDEEM.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: REDEEM.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: REDEEM.SUCCESS,
        data
    }
}

export function setDataReport(data = []) {
    return {
        type: REDEEM.SUCCESS_REPORT,
        data
    }
}

export function setDataDetail(data = []) {
    return {
        type: REDEEM.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: REDEEM.FAILED,
        data
    }
}

export const getRedeem = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'redeem/barang';
        if(where){
            url+=`?${where}`;
        }

        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                console.log(data);
                dispatch(setData(data));
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                dispatch(setLoading(false));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
            })

    }
};


export const postRedeem = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));

        const url = HEADERS.URL + `transaction/redeem`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                console.log(data.status);
                if(data.status ==='success'){
                    dispatch(getRedeem('page=1'));
                    Swal.fire({
                        title: 'Berhasil',
                        text: "redeem berhasil dilakukan",
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Oke'
                    }).then((result) => {
                        if (result.value) {
                            dispatch(ModalType("detailRedeem"));
                            dispatch(ModalToggle(false));
                        }else{
                            dispatch(ModalType("detailRedeem"));
                            dispatch(ModalToggle(false));

                        }
                    })
                    dispatch(setIsError(false));
                }else{
                    dispatch(setIsError(true));
                    Swal.fire(
                        'Terjadi Kesalahan!.',
                        data.msg,
                        'error'
                    );
                }
                // ToastQ.fire({icon:'success',title:`redeem berhasil`});
                dispatch(setLoadingPost(false));
            })
            .catch(function (error) {
                console.log("ERROR",error);
                dispatch(setLoadingPost(false));
                dispatch(setIsError(true));
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
export const postReward = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));

        const url = HEADERS.URL + `transaction/claim/reward`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                console.log(data.status);
                if(data.status ==='success'){
                    Swal.fire({
                        title: 'Berhasil',
                        text: "Klaim Reward Berhasil Diproses",
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Oke'
                    }).then((result) => {
                        if (result.value) {
                            dispatch(ModalType("dashboardReward"));
                            dispatch(ModalToggle(false));
                        }else{
                            dispatch(ModalType("dashboardReward"));
                            dispatch(ModalToggle(false));

                        }
                    })
                    dispatch(setIsError(false));
                }else{
                    dispatch(setIsError(true));
                    Swal.fire(
                        'Terjadi Kesalahan!.',
                        data.msg,
                        'error'
                    );
                }
                // ToastQ.fire({icon:'success',title:`redeem berhasil`});
                dispatch(setLoadingPost(false));
            })
            .catch(function (error) {
                console.log("ERROR",error);
                dispatch(setLoadingPost(false));
                dispatch(setIsError(true));
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

export const postRedeemDone = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));

        const url = HEADERS.URL + `transaction/redeem/done/${btoa(data)}`;
        axios.put(url)
            .then(function (response) {
                const data = (response.data);
                console.log(data.status);
                if(data.status ==='success'){
                    Swal.fire({
                        title: 'Informasi',
                        text: "Redeem Diselesaikan",
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Oke'
                    }).then((result) => {
                        if (result.value) {
                            dispatch(getRedeemReport(1,'',''))
                        }else{
                            dispatch(getRedeemReport(1,'',''))

                        }
                        // window.location.reload()

                    })
                    dispatch(setIsError(false));
                }else{
                    dispatch(setIsError(true));
                    Swal.fire(
                        'Terjadi Kesalahan!.',
                        data.msg,
                        'error'
                    );
                }
                // ToastQ.fire({icon:'success',title:`redeem berhasil`});
                dispatch(setLoadingPost(false));
            })
            .catch(function (error) {
                console.log("ERROR",error);
                dispatch(setLoadingPost(false));
                dispatch(setIsError(true));
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

export const getRedeemReport = (page=1,where,perpage=10) => {
    return (dispatch) => {
        dispatch(setLoadingReport(true));
        let url = `transaction/redeem/report?page=${page}`;
        if(where){
            url+=`${where}`;
        }

        axios.get(HEADERS.URL + `${url}&perpage=${perpage}`)
            .then(function (response) {
                const data = response.data;
                console.log(data);
                dispatch(setDataReport(data));
                dispatch(setLoadingReport(false));
            })
            .catch(function (error) {
                dispatch(setLoadingReport(false));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
            })

    }
};