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
                } else {
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: NOTIF_ALERT.FAILED,
                    });
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


