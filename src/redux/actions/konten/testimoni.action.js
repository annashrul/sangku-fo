import {
    TESTIMONI,
    HEADERS
} from "../_constants"
import axios from "axios"

export function setLoadingTestimoni(load) {
    return {
        type: TESTIMONI.LOADING_TESTIMONI,
        load
    }
}
export function setLoadingTestimoniKategori(load) {
    return {
        type: TESTIMONI.LOADING_TESTIMONI_KATEGORI,
        load
    }
}
export function setLoadingTestimoniDetail(load) {
    return {
        type: TESTIMONI.LOADING_TESTIMONI_DETAIL,
        load
    }
}
export function setTestimoni(data = []) {
    return {
        type: TESTIMONI.SUCCESS_TESTIMONI,
        data
    }
}
export function setTestimoniKategori(data = []) {
    return {
        type: TESTIMONI.SUCCESS_TESTIMONI_KATEGORI,
        data
    }
}
export function setTestimoniDetail(data = []) {
    return {
        type: TESTIMONI.SUCCESS_TESTIMONI_DETAIL,
        data
    }
}
export const getTestimoni = (page=1,where='')=>{
    return (dispatch) => {
        dispatch(setLoadingTestimoni(true));
        let url=`content/testimoni?page=${page==='NaN'||page===null||page===''||page===undefined?1:page}`;
        if(where!==''){
            url+=where
        }
        
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setTestimoni(data));
                dispatch(setLoadingTestimoni(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingTestimoni(false));
            })

    }
}
export const getTestimoniKategori = (page=1,where='')=>{
    return (dispatch) => {
        dispatch(setLoadingTestimoniKategori(true));
        let url=`category/testimoni?page=${page==='NaN'||page===null||page===''||page===undefined?1:page}`;
        if(where!==''){
            url+=where
        }
        
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setTestimoniKategori(data));
                dispatch(setLoadingTestimoniKategori(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingTestimoniKategori(false));
            })

    }
}
export const getTestimoniDetail = (id='')=>{
    return (dispatch) => {
        dispatch(setLoadingTestimoniDetail(true));
        let url=`content/${id}`;
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setTestimoniDetail(data));
                dispatch(setLoadingTestimoniDetail(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingTestimoniDetail(false));
            })

    }
}