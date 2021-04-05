

import {DEPOSIT} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    edit:[],
    detail:[],
    isLoadingReport: true,
    persenDl: 0,
    data_report: [],
    data_report_excel: [],
}

export const depositReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEPOSIT.SUCCESS:
            // 
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case DEPOSIT.SUCCESS_REPORT:
            // 
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data_report: action.data.result,
            });
        case DEPOSIT.SUCCESS_PERSEN:
            return Object.assign({}, state, {
                persenDl: action.data
            });
        case DEPOSIT.SUCCESS_REPORT_EXCEL:
            // 
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data_report_excel: action.data.result,
            });
        case DEPOSIT.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case DEPOSIT.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case DEPOSIT.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case DEPOSIT.LOADING_REPORT:
            return Object.assign({}, state, {
                isLoadingReport: action.load
            });
        case DEPOSIT.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case DEPOSIT.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case DEPOSIT.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}