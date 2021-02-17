import axios from "axios"
import Swal from "sweetalert2";
import {VOUCHER, HEADERS} from "../_constants";
import {ToastQ} from "helper";

export function setData(data = []) {
    return {
        type: VOUCHER.SUCCESS,
        data
    }
}
export function setLoadingVoucher(load) {
    return {
        type: VOUCHER.LOADING_VOUCHER,
        load
    }
}


export const voucherValidate = (data) => {
    return (dispatch) => {
        dispatch(setLoadingVoucher(true));
        const url = HEADERS.URL + `voucher/check/${data}`;
        axios.get(url)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    ToastQ.fire({icon:'danger',title:`Kode Voucher Ditemukan.`});
                    dispatch(setData(data));
                }
                else {
                    ToastQ.fire({icon:'danger',title:`Voucher tidak tersedia`});
                }
                dispatch(setLoadingVoucher(false));
            })
            .catch(function (error) {
                dispatch(setLoadingVoucher(false));
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
                        text: error.response===undefined?'Error':error.response.data.msg,
                    });

                    if (error.response) {

                    }
                }

            })
    }
}
