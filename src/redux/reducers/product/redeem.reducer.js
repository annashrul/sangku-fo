

import {REDEEM} from "../../actions/_constants";

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

export const redeemReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDEEM.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case REDEEM.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case REDEEM.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case REDEEM.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case REDEEM.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case REDEEM.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case REDEEM.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}