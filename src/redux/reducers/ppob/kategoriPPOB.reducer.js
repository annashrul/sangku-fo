

import {KATEGORI_PPOB,SUB_KATEGORI_PPOB} from "../../actions/_constants";

const initialState = {
    isLoading: true, status: "", msg: "", data: [],
    isLoadingSub: true, statusSub: "", msgSub: "", dataSub: [],
}

export const kategoriPPOBReducer = (state = initialState, action) => {
    switch (action.type) {

        case KATEGORI_PPOB.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case KATEGORI_PPOB.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case SUB_KATEGORI_PPOB.SUCCESS:
            return Object.assign({}, state, {
                statusSub: action.data.status,
                msgSub: action.data.msg,
                dataSub: action.data.result,
            });
        case SUB_KATEGORI_PPOB.LOADING:
            return Object.assign({}, state, {
                isLoadingSub: action.load
            });
        default:
            return state
    }
}