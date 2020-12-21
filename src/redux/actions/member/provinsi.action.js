import axios from "axios"
import Swal from "sweetalert2";
import {PROVINSI, HEADERS} from "../_constants";


export function setLoading(load) {
    return {
        type: PROVINSI.LOADING,
        load
    }
}


export function setData(data = []) {
    return {
        type: PROVINSI.SUCCESS,
        data
    }
}


export const getProvinsi = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/kurir/provinsi';
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
