import axios from "axios"
import Swal from "sweetalert2";
import {BANK, HEADERS} from "../_constants";


export function setLoading(load) {
    return {
        type: BANK.LOADING,
        load
    }
}

export function setLoadingData(load) {
    return {
        type: BANK.LOADING_DATA,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: BANK.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: BANK.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: BANK.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: BANK.SUCCESS,
        data
    }
}

export function setDataBank(data = []) {
    return {
        type: BANK.SUCCESS_DATA,
        data
    }
}

export function setDataDetail(data = []) {
    return {
        type: BANK.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: BANK.FAILED,
        data
    }
}

export const getBank = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'bank';
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
export const getBankData = () => {
    return (dispatch) => {
        dispatch(setLoadingData(true));
        let url = 'bank/data';
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setDataBank(data));
                dispatch(setLoadingData(false));
            })
            .catch(function (error) {
                dispatch(setLoadingData(false));
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
