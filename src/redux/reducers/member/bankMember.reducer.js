

import {BANK_MEMBER} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    edit:[],
    detail:[]
}

export const bankMemberReducer = (state = initialState, action) => {
    switch (action.type) {
        case BANK_MEMBER.SUCCESS:
            // 
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case BANK_MEMBER.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case BANK_MEMBER.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case BANK_MEMBER.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case BANK_MEMBER.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case BANK_MEMBER.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case BANK_MEMBER.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}