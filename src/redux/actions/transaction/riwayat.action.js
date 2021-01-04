import {
    RIWAYAT_TRANSAKSI,
    HEADERS
} from "../_constants"
import axios from "axios"
import {destroy} from "components/model/app.model";
import * as Swal from "sweetalert2";

export function setLoading(load) {
    return {
        type: RIWAYAT_TRANSAKSI.LOADING,
        load
    }
}
export function setRiwayat(data = []) {
    return {
        type: RIWAYAT_TRANSAKSI.SUCCESS,
        data
    }
}
export const getRiwayat = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(HEADERS.URL + `transaction/history`)
            .then(function (response) {
                const data = response.data;
                dispatch(setRiwayat(data));
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoading(false));
            })

    }
}