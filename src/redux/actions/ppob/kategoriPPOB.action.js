import {
    KATEGORI_PPOB,SUB_KATEGORI_PPOB,
    HEADERS
} from "../_constants"
import axios from "axios"

export function setLoading(load) {
    return {
        type: KATEGORI_PPOB.LOADING,
        load
    }
}

export function setData(data = []) {
    return {
        type: KATEGORI_PPOB.SUCCESS,
        data
    }
}
export function setLoadingSub(load) {
    return {
        type: SUB_KATEGORI_PPOB.LOADING,
        load
    }
}

export function setDataSub(data = []) {
    return {
        type: SUB_KATEGORI_PPOB.SUCCESS,
        data
    }
}

export const getKategoriPPOB = ()=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url=`transaction/produk/kategori`;
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setData(data));
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoading(false));
            })

    }
}
export const getSubKategoriPPOB = (code)=>{
    return (dispatch) => {
        dispatch(setLoadingSub(true));
        let url=`transaction/produk/operator?kategori=${code}`;
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setDataSub(data));
                dispatch(setLoadingSub(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingSub(false));
            })

    }
}

