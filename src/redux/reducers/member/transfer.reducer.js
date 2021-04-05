

import {TRANSFER} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    edit:[],
    detail:[]
}

export const transferReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRANSFER.SUCCESS:
            // 
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case TRANSFER.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case TRANSFER.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case TRANSFER.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case TRANSFER.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case TRANSFER.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case TRANSFER.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}