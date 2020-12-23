

import {ONGKIR} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
}

export const ongkirReducer = (state = initialState, action) => {
    switch (action.type) {
        case ONGKIR.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case ONGKIR.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case ONGKIR.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case ONGKIR.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}