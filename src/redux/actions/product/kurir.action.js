import axios from "axios"
import Swal from "sweetalert2";
import {KURIR, HEADERS} from "../_constants";


export function setLoading(load) {
    return {
        type: KURIR.LOADING,
        load
    }
}


export function setData(data = []) {
    return {
        type: KURIR.SUCCESS,
        data
    }
}


export function setDataResi(data = []) {
    return {
        type: KURIR.SUCCESS_RESI,
        data
    }
}


export const getKurir = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/kurir';
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
                }
            })

    }
};

export const cekResi = (data) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        const url = HEADERS.URL + `transaction/kurir/cek/resi`;
        console.log(url);
        axios.post(url, data)
            .then(function (response) {
                const data = (response.data);
                console.log("ACTION RESI",data);
                if (data.status === 'success') {
                    dispatch(setDataResi(data));
                } else {
                    Swal.fire({
                        title: 'failed',
                        type: 'error',
                        text: data.msg,
                    });
                }
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                dispatch(setLoading(false));
                Swal.fire({
                    title: 'failed',
                    type: 'error',
                    text: error.response.data.msg,
                });
                if (error.response) {
                }
            })
    }
}

export const trxDone = (kd_trx) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        const url = HEADERS.URL + `transaction/done/${kd_trx}`;
        axios.put(url)
            .then(function (response) {
                const data = (response.data)
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        type: 'success',
                        text: data.msg,
                    });
                    window.location.reload();
                } else {
                    Swal.fire({
                        title: 'failed',
                        type: 'error',
                        text: data.msg,
                    });
                }
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                dispatch(setLoading(false));
                Swal.fire({
                    title: 'failed',
                    type: 'error',
                    text: error.response.data.msg,
                });
                if (error.response) {
                }
            })
    }
}