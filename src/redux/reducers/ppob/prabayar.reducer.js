

import {PRABAYAR} from "../../actions/_constants";

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

export const prabayarReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRABAYAR.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case PRABAYAR.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case PRABAYAR.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case PRABAYAR.LOADING_SUCCESS:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case PRABAYAR.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case PRABAYAR.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case PRABAYAR.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}