

import {CHECKOUT} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
}

export const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECKOUT.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case CHECKOUT.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case CHECKOUT.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case CHECKOUT.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}