import {
    SITE
} from "../actions/_constants";

const initialState = {
    isLoading: false,
    isLoadingPut: false,
    data: [],
    isLoadingWalletConfig: false,
    data: [],
    datum: [],
    data_folder: [],
    data_tables: [],
    msg:"",
    status:"",
    check:false,
    triggerEcaps:false,
    get_link:'-',
    triggerMobileEcaps:false,
};

export const siteReducer = (state = initialState, action) => {
    switch (action.type) {
        case SITE.SUCCESS:
            return Object.assign({}, state,{
                data: action.data.result
            });
        case SITE.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case SITE.LOADING_PUT:
            return Object.assign({}, state, {
                isLoadingPut: action.load
            });
        case SITE.SUCCESS_WALLET_CONFIG:
            return Object.assign({}, state,{
                msg: action.data.msg,
                status: action.data.status,
                data_wallet_config: action.data.result
            });
        case SITE.LOADING_WALLET_CONFIG:
            return Object.assign({}, state, {
                isLoadingWalletConfig: action.load
            });
        case SITE.SUCCESS_LIST:
            return Object.assign({}, state,{
                datum: action.data.result
            });
        default:
            return state
    }
};