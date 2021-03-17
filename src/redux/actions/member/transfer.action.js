import axios from "axios"
import Swal from "sweetalert2";
import { ToastQ } from "../../../helper";
import {TRANSFER, HEADERS, NOTIF_ALERT} from "../_constants";


export function setLoading(load) {
    return {
        type: TRANSFER.LOADING,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: TRANSFER.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: TRANSFER.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: TRANSFER.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: TRANSFER.SUCCESS,
        data
    }
}

export function setDataDetail(data = []) {
    return {
        type: TRANSFER.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: TRANSFER.FAILED,
        data
    }
}


export const postTransfer = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));
        const url = HEADERS.URL + `transaction/transfer`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    // Swal.fire({
                    //     title: 'Berhasil !!!',
                    //     html:`Terimakasih telah melakukan transaksi`,
                    //     icon: 'success',
                    //     showCancelButton: true,
                    //     confirmButtonColor: '#3085d6',
                    //     cancelButtonColor: '#d33',
                    //     confirmButtonText: `Riwayat Transaksi`,
                    //     cancelButtonText: 'Oke',
                    // }).then((result) => {

                    // })
                    ToastQ.fire({icon:'success',title:`Transfer sukses.`});
                    dispatch(setIsError(true));
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

