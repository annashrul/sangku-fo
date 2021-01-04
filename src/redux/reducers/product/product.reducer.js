

import {PRODUCT} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    edit:[],
    detail:[]
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case PRODUCT.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case PRODUCT.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case PRODUCT.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });

        case PRODUCT.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case PRODUCT.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}