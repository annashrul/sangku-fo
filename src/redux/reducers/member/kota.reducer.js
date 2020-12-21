

import {KOTA} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    status: "",
    msg: "",
    data: [],
}

export const kotaReducer = (state = initialState, action) => {
    switch (action.type) {
        case KOTA.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case KOTA.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        default:
            return state
    }
}