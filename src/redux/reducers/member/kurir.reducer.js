

import {KURIR} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    status: "",
    msg: "",
    data: [],
}

export const kurirReducer = (state = initialState, action) => {
    switch (action.type) {
        case KURIR.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case KURIR.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        default:
            return state
    }
}