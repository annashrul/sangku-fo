import {
    BERITA,
    HEADERS
} from "../_constants"
import axios from "axios"

export function setLoadingBerita(load) {
    return {
        type: BERITA.LOADING_BERITA,
        load
    }
}
export function setLoadingBeritaKategori(load) {
    return {
        type: BERITA.LOADING_BERITA_KATEGORI,
        load
    }
}
export function setLoadingBeritaDetail(load) {
    return {
        type: BERITA.LOADING_BERITA_DETAIL,
        load
    }
}
export function setBerita(data = []) {
    return {
        type: BERITA.SUCCESS_BERITA,
        data
    }
}
export function setBeritaKategori(data = []) {
    return {
        type: BERITA.SUCCESS_BERITA_KATEGORI,
        data
    }
}
export function setBeritaDetail(data = []) {
    return {
        type: BERITA.SUCCESS_BERITA_DETAIL,
        data
    }
}
export const getBerita = (page=1,where='')=>{
    return (dispatch) => {
        dispatch(setLoadingBerita(true));
        let url=`content/berita?page=${page==='NaN'||page===null||page===''||page===undefined?1:page}`;
        if(where!==''){
            url+=where
        }
        
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setBerita(data));
                dispatch(setLoadingBerita(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingBerita(false));
            })

    }
}
export const getBeritaKategori = (page=1,where='')=>{
    return (dispatch) => {
        dispatch(setLoadingBeritaKategori(true));
        let url=`category/berita?page=${page==='NaN'||page===null||page===''||page===undefined?1:page}`;
        if(where!==''){
            url+=where
        }
        
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setBeritaKategori(data));
                dispatch(setLoadingBeritaKategori(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingBeritaKategori(false));
            })

    }
}
export const getBeritaDetail = (id='')=>{
    return (dispatch) => {
        dispatch(setLoadingBeritaDetail(true));
        let url=`content/${id}`;
        axios.get(HEADERS.URL+url)
            .then(function (response) {
                const data = response.data;
                dispatch(setBeritaDetail(data));
                dispatch(setLoadingBeritaDetail(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingBeritaDetail(false));
            })

    }
}