

import {CHECKOUT} from "../../actions/_constants";

const initialState = {
    isLoadingPost: false,
    isError: false,
}

export const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
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