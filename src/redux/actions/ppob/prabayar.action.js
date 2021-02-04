import {
    PRABAYAR,
    HEADERS
} from "../_constants"
import axios from "axios"
import * as Swal from "sweetalert2";

export function setLoading(load) {
    return {
        type: PRABAYAR.LOADING,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: PRABAYAR.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: PRABAYAR.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: PRABAYAR.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: PRABAYAR.SUCCESS,
        data
    }
}
export function setDetail(data = []) {
    return {
        type: PRABAYAR.DETAIL,
        data
    }
}

export const postPrabayar = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));
        const url = HEADERS.URL + `transaction/prabayar/checkout`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    dispatch(setIsError(true));
                } else {
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: "terjadi kesalahan",
                    });
                    dispatch(setIsError(false));
                }
                dispatch(setLoadingPost(false));
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
