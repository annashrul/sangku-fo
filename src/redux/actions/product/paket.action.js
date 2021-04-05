import axios from "axios"
import Swal from "sweetalert2";
import {PAKET, HEADERS} from "../_constants";

export function setLoading(load) {
    return {
        type: PAKET.LOADING,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: PAKET.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: PAKET.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: PAKET.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: PAKET.SUCCESS,
        data
    }
}

export function setDataDetail(data = []) {
    return {
        type: PAKET.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: PAKET.FAILED,
        data
    }
}

export const getPaket = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'package';
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

export const getDetailPaket = (id) => {
    return (dispatch) => {
        dispatch(setLoadingDetail(true));
        let url = `package/${id}`;
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setDataDetail(data));
                dispatch(setLoadingDetail(false));
            })
            .catch(function (error) {
                dispatch(setLoadingDetail(false));
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

