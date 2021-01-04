import axios from "axios"
import Swal from "sweetalert2";
import {ONGKIR, HEADERS} from "../_constants";
import {ToastQ} from "helper";



export function setData(data = []) {
    return {
        type: ONGKIR.SUCCESS,
        data
    }
}

export function setLoading(load) {
    return {
        type: ONGKIR.LOADING,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: ONGKIR.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: ONGKIR.IS_ERROR,
        load
    }
}


export const postOngkir = (data) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        const url = HEADERS.URL + `transaction/kurir/cek/ongkir`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    dispatch(setData(data));
                }
                else {
                    ToastQ.fire({icon:'danger',title:`gagal dimasukan kedalam keranjang`});
                }
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
