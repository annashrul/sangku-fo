import axios from "axios"
import Swal from "sweetalert2";
import {CHECKOUT, HEADERS} from "../_constants";
import {ToastQ} from "../../../helper";

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


export const postCheckout = (data) => {
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
        axios.post(url,data)
            .then(function (response) {
                setTimeout(
                    function () {
                        Swal.close();
                        const data = (response.data);
                        if (data.status === 'success') {
                            dispatch(setIsError(true));
                            localStorage.setItem("totCart","0");
                            Swal.fire({
                                title: 'Berhasil !!!',
                                html:`Terimakasih telah melakukan transaksi`,
                                icon: 'success',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: `Riwayat Transaksi`,
                                cancelButtonText: 'Kembali',
                            }).then((result) => {
                                if (result.value) {
                                   window.location.href="/product";
                                }
                                else{
                                    window.location.href="/product";
                                }
                            })
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
