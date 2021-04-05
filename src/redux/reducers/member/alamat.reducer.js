

import {ALAMAT} from "../../actions/_constants";

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

export const alamatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALAMAT.SUCCESS:
            // 
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case ALAMAT.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case ALAMAT.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case ALAMAT.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case ALAMAT.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case ALAMAT.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case ALAMAT.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}