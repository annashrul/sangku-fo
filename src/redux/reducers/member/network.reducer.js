

import {NETWORK} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    status: "",
    msg: "",
    data: [],
    upline: [],
}

export const networkReducer = (state = initialState, action) => {
    switch (action.type) {
        case NETWORK.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case NETWORK.UPLINE:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                upline: action.data.result,
            });
        case NETWORK.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        default:
            return state
    }
}