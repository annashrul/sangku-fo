

import {MEMBER} from "../../actions/_constants";

const initialState = {
    isLoadingPost: false,
    isLoadingAvail: false,
    isLoadingDetailMember: false,
    data_avail:{},
    data_detail_member:{},
    status:'',
    msg:''
}

export const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEMBER.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case MEMBER.LOADING_AVAIL:
            return Object.assign({}, state, {
                isLoadingAvail: action.load
            });
        case MEMBER.SUCCESS_AVAIL:
            console.log("action.data.result",action.data.result)
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data_avail: action.data.result,
            });
        case MEMBER.LOADING_DETAIL_MEMBER:
            return Object.assign({}, state, {
                isLoadingDetailMember: action.load
            });
        case MEMBER.SUCCESS_DETAIL_MEMBER:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data_detail_member: action.data.result,
            });
        default:
            return state
    }
}