import axios from "axios"
import Swal from "sweetalert2";
import {PRODUCT, HEADERS} from "../_constants";


export function setLoading(load) {
    return {
        type: PRODUCT.LOADING,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: PRODUCT.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: PRODUCT.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: PRODUCT.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: PRODUCT.SUCCESS,
        data
    }
}


export function setDataDetail(data = []) {
    return {
        type: PRODUCT.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: PRODUCT.FAILED,
        data
    }
}

export const getProduct = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'barang';
        if(where){
            url+=`?${where}`;
        }

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



