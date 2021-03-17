import { AUTH} from '../actions/_constants';

const initialState = {
    isAuthenticated: false,
    user: [],
    isErrorNo:false,
    isLoading:false,
    isRegistered:false,
    isRegisterPin:false
}

export default function(state= initialState, action){
    switch(action.type){
        case AUTH.SET_CURRENT_USER:
            return{
                ...state,
                user: action.payload
            }
        case AUTH.SET_CURRENT_OTP:
            return{
                ...state,
                user_otp: action.payload
            }
        case AUTH.SET_LOGGED_USER:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        case AUTH.IS_ERROR_NO:
            return Object.assign({}, state, {
                isErrorNo: action.load
            });
        case AUTH.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case AUTH.REGISTERED:
            return Object.assign({}, state, {
                isRegistered: action.load
            });
        case AUTH.IS_REGISTERED:
            return Object.assign({}, state, {
                isRegisterPin: action.load
            });
        default:
            return state;
    }
}