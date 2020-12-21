import axios from "axios"
import Swal from "sweetalert2";
import {PAKET, HEADERS, NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


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
                console.log(data);
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


