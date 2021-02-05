

import {PASCABAYAR} from "../../actions/_constants";

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

export const pascabayarReducer = (state = initialState, action) => {
    switch (action.type) {
        case PASCABAYAR.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case PASCABAYAR.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case PASCABAYAR.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case PASCABAYAR.LOADING_SUCCESS:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case PASCABAYAR.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case PASCABAYAR.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case PASCABAYAR.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}