import axios from "axios"
import Swal from "sweetalert2";
import {KOTA, HEADERS} from "../_constants";


export function setLoading(load) {
    return {
        type: KOTA.LOADING,
        load
    }
}


export function setData(data = []) {
    return {
        type: KOTA.SUCCESS,
        data
    }
}


export const getKota = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `transaction/kurir/kota?id=${where}`;
        
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
