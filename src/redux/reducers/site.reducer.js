import {
    SITE
} from "../actions/_constants";

const initialState = {
    isLoading: false,
    isLoadingConfig: false,
    isLoadingPut: false,
    isLoadingWalletConfig: false,
    data: [],
    isLoadingSitePaket: false,
    isLoadingSiteNotif: false,
    data_paket: [],
    data_notif: [],
    data_config: [],
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
        case SITE.SUCCESS_CONFIG:
            return Object.assign({}, state,{
                data_config: action.data.result
            });
        case SITE.TRIGGER_ECAPS:
            return Object.assign({}, state, {
                triggerEcaps: action.data
            });
        case SITE.TRIGGER_MOBILE_ECAPS:
            return Object.assign({}, state, {
                triggerMobileEcaps: action.data
            });
        case SITE.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case SITE.LOADING_CONFIG:
            return Object.assign({}, state, {
                isLoadingConfig: action.load
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
        case SITE.SUCCESS_SITE_PAKET:
            return Object.assign({}, state,{
                msg: action.data.msg,
                status: action.data.status,
                data_paket: action.data.result
            });
        case SITE.SUCCESS_SITE_NOTIF:
            return Object.assign({}, state,{
                msg: action.data.msg,
                status: action.data.status,
                data_notif: action.data.result
            });
        case SITE.LOADING_SITE_PAKET:
            return Object.assign({}, state, {
                isLoadingSitePaket: action.load
            });
        case SITE.LOADING_SITE_NOTIF:
            return Object.assign({}, state, {
                isLoadingSiteNotif: action.load
            });
        case SITE.SUCCESS_LIST:
            return Object.assign({}, state,{
                datum: action.data.result
            });
        default:
            return state
    }
};