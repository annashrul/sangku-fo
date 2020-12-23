

import {KECAMATAN} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    status: "",
    msg: "",
    data: [],
}

export const kecamatanReducer = (state = initialState, action) => {
    switch (action.type) {
        case KECAMATAN.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case KECAMATAN.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        default:
            return state
    }
}