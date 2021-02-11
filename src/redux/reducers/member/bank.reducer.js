

import {BANK} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingData: false,
    isLoadingDetail: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    data_bank: [],
    edit:[],
    detail:[]
}

export const bankReducer = (state = initialState, action) => {
    switch (action.type) {
        case BANK.SUCCESS:
            // console.log()
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case BANK.SUCCESS_DATA:
            // console.log()
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data_bank: action.data.result,
            });

        case BANK.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case BANK.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case BANK.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case BANK.LOADING_DATA:
            return Object.assign({}, state, {
                isLoadingData: action.load
            });
        case BANK.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case BANK.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case BANK.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}