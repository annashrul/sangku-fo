

import {PENARIKAN} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingReport: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isError: false,
    persenDl: 0,
    status: "",
    msg: "",
    data: [],
    data_report: [],
    data_report_excel: [],
    edit:[],
    detail:[]
}

export const penarikanReducer = (state = initialState, action) => {
    switch (action.type) {
        case PENARIKAN.SUCCESS:
            // 
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case PENARIKAN.SUCCESS_REPORT:
            // 
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data_report: action.data.result,
            });
        case PENARIKAN.SUCCESS_PERSEN:
            return Object.assign({}, state, {
                persenDl: action.data
            });
        case PENARIKAN.SUCCESS_REPORT_EXCEL:
            // 
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data_report_excel: action.data.result,
            });
        case PENARIKAN.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case PENARIKAN.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case PENARIKAN.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case PENARIKAN.LOADING_REPORT:
            return Object.assign({}, state, {
                isLoadingReport: action.load
            });
        case PENARIKAN.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case PENARIKAN.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case PENARIKAN.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}