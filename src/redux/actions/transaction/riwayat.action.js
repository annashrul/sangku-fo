import {
    RIWAYAT_TRANSAKSI,
    HEADERS
} from "../_constants"
import axios from "axios"

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
export const getRiwayat = (page = 1, search = null, datefrom, dateto) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(HEADERS.URL + `transaction/history?page=${page}${search!==null?'&q='+search:""}&datefrom=${datefrom}&dateto=${dateto}`)
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