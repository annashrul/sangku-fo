import {
    SITE,
    HEADERS
} from "./_constants"
import axios from "axios"
import {destroy} from "components/model/app.model";
import * as Swal from "sweetalert2";

export const setEcaps = (bool) => dispatch => {
    dispatch(setEcaps_(bool));
}
export const setMobileEcaps = (bool) => dispatch => {
    dispatch(setMobileEcaps_(bool));
}
export function setEcaps_(bool) {
    return {
        type: SITE.TRIGGER_ECAPS,
        data:bool
    }
}
export function setMobileEcaps_(bool) {
    return {
        type: SITE.TRIGGER_MOBILE_ECAPS,
        data:bool
    }
}

export function setLoading(load) {
    return {
        type: SITE.LOADING,
        load
    }
}
export function setLoadingWalletConfig(load) {
    return {
        type: SITE.LOADING_WALLET_CONFIG,
        load
    }
}
export function setSite(data = []) {
    return {
        type: SITE.SUCCESS,
        data
    }
}
export function setWalletConfig(data = []) {
    return {
        type: SITE.SUCCESS_WALLET_CONFIG,
        data
    }
}
export function setList(data = []) {
    return {
        type: SITE.SUCCESS_LIST,
        data
    }
}
export function setFolder(data = []) {
    return {
        type: SITE.SUCCESS_FOLDER,
        data
    }
}
export function setTables(data = []) {
    return {
        type: SITE.SUCCESS_TABLES,
        data
    }
}
export function setCheck(data = []) {
    return {
        type: SITE.SUCCESS_CHECK,
        data
    }
}
export function setLinkTxt(data=[]){
    return {type:SITE.DOWNLOAD_TXT,data}
}
export const FetchSite = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(HEADERS.URL + `site/landing`)
            .then(function (response) {
                const data = response.data;
                dispatch(setSite(data));
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoading(false));
            })

    }
}

export const FetchWalletConfig = () => {
    return (dispatch) => {
        dispatch(setLoadingWalletConfig(true));
        axios.get(HEADERS.URL + `transaction/wallet/config`)
            .then(function (response) {
                const data = response.data;
                dispatch(setWalletConfig(data));
                dispatch(setLoadingWalletConfig(false));
            })
            .catch(function (error) {
                // handle error
                dispatch(setLoadingWalletConfig(false));
            })

    }
}
