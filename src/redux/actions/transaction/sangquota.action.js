import {
    SANGQUOTA_TRANSAKSI,
    HEADERS
} from "../_constants"
import axios from "axios"

export function setLoading(load) {
    return {
        type: SANGQUOTA_TRANSAKSI.LOADING,
        load
    }
}
export function setSangquota(data = []) {
    return {
        type: SANGQUOTA_TRANSAKSI.SUCCESS,
        data
    }
}
export const getSangquota = (page = 1, search = null, datefrom, dateto) => {
    return (dispatch) => {
        let date  = `&datefrom=${datefrom}&dateto=${dateto}`;
        dispatch(setLoading(true));
        axios.get(HEADERS.URL + `transaction/history/plafon?page=${page}${search!==null?'&q='+search:""}${datefrom===null&&dateto===null?'':date}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setSangquota(data));
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoading(false));
            })

    }
}