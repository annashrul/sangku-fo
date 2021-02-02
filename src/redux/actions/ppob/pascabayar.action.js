import {
    PASCABAYAR,
    HEADERS
} from "../_constants"
import axios from "axios"
import * as Swal from "sweetalert2";

export function setLoading(load) {
    return {
        type: PASCABAYAR.LOADING,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: PASCABAYAR.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: PASCABAYAR.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: PASCABAYAR.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: PASCABAYAR.SUCCESS,
        data
    }
}
export function setDetail(data = []) {
    return {
        type: PASCABAYAR.DETAIL,
        data
    }
}

export const postPascabayar = (data,param) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));
        const url = HEADERS.URL + `transaction/pascabayar/${param}`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    dispatch(setData(data));
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