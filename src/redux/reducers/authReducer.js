import { AUTH} from '../actions/_constants';

const initialState = {
    isAuthenticated: false,
    user: {},
    isErrorNo:false,
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
                user: action.payload
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
        default:
            return state;
    }
}