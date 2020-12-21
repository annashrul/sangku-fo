

import {CART} from "../../actions/_constants";

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

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case CART.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case CART.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case CART.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case CART.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case CART.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case CART.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case CART.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}