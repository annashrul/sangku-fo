import axios from "axios"
import Swal from "sweetalert2";
import {CHECKOUT, HEADERS, NOTIF_ALERT} from "../_constants";
import {ToastQ} from "helper";
import {ModalToggle} from "../modal.action";

export function setLoading(load) {
    return {
        type: CHECKOUT.LOADING,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: CHECKOUT.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: CHECKOUT.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: CHECKOUT.SUCCESS,
        data
    }
}


export const getInvoice = (trx) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `transaction/get_payment/${trx}`;
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
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
                }else{
                    Swal.fire({
                        title: 'Perhatian!',
                        html: `Transaksi telah selesai!`,
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: `Oke`,
                    }).then((result) => {
                        window.location.href = "/dashboard";
                    })
                }
            })

    }
};



export const postCheckout = (res) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));
        const url = HEADERS.URL + `transaction/checkout`;
        Swal.fire({
            title: 'Tunggu sebentar',
            html: 'sistem sedang memproses transaksi anda',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })
        axios.post(url,res)
            .then(function (response) {
                setTimeout(
                    function () {
                        Swal.close();
                        const data = (response.data);
                        if (data.status === 'success') {
                            dispatch(setIsError(true));
                            localStorage.setItem("totCart","0");
                            if(res.metode_pembayaran==='transfer'){
                                Swal.fire({
                                    title: 'Berhasil !!!',
                                    html:`Terimakasih telah melakukan transaksi`,
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: `Oke`,
                                }).then((result) => {
                                    window.location.href="/invoice/"+btoa(data.result.kd_trx);
                                })
                            }
                            else{
                                Swal.fire({
                                    title: 'Berhasil !!!',
                                    html:`Terimakasih telah melakukan transaksi`,
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: `Oke`,
                                }).then((result) => {
                                    window.location.href="/report/pembelian";
                                })
                            }

                        }
                        else {
                            ToastQ.fire({icon:'danger',title:`gagal dimasukan kedalam keranjang`});
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


export const postBuktiTransfer = (res,kdtrx) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));
        const url = HEADERS.URL + `transaction/deposit/${kdtrx}`;
        Swal.fire({
            title: 'Tunggu sebentar',
            html: 'sistem sedang memproses transaksi anda',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })
        axios.put(url,res)
            .then(function (response) {
                setTimeout(
                    function () {
                        Swal.close();
                        const data = (response.data);
                        if (data.status === 'success') {
                            Swal.fire({
                                title: 'Sukses',
                                icon: 'success',
                                text: 'Berhasil mengunggah bukti transfer.',
                            });
                            dispatch(getInvoice(kdtrx))
                            dispatch(setIsError(true));
                            dispatch(ModalToggle(false));
                        } else {
                            Swal.fire({
                                title: 'failed',
                                icon: 'error',
                                text: NOTIF_ALERT.FAILED,
                            });
                            dispatch(setIsError(false));
                            dispatch(ModalToggle(true));
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
