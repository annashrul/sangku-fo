

import {MEMBER} from "../../actions/_constants";

const initialState = {
    isLoadingPost: false,
}

export const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEMBER.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        default:
            return state
    }
}