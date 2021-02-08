

import {REPORT_PPOB} from "../../actions/_constants";

const initialState = {
    isLoading: true, status: "", msg: "", data: [],
}

export const reportPPOBReducer = (state = initialState, action) => {
    switch (action.type) {
        case REPORT_PPOB.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case REPORT_PPOB.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });

        default:
            return state
    }
}