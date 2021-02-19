

import {VOUCHER} from "../../actions/_constants";

const initialState = {
    isLoadingVoucher: false,
    status: "",
    msg: "",
    data: [],
}

export const voucherReducer = (state = initialState, action) => {
    switch (action.type) {
        case VOUCHER.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case VOUCHER.LOADING_VOUCHER:
            return Object.assign({}, state, {
                isLoadingVoucher: action.load
            });
        default:
            return state
    }
}