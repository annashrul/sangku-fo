

import {REWARD} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isLoadingReport: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    data_report: [],
    edit:[],
    detail:[]
}

export const rewardReducer = (state = initialState, action) => {
    switch (action.type) {
        case REWARD.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case REWARD.SUCCESS_REPORT:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data_report: action.data.result,
            });

        case REWARD.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case REWARD.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case REWARD.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case REWARD.LOADING_REPORT:
            return Object.assign({}, state, {
                isLoadingReport: action.load
            });
        case REWARD.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case REWARD.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case REWARD.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}