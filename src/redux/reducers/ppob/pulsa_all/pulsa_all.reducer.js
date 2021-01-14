import {PULSA_ALL} from "../../../actions/_constants";


const initialState = {
    isLoading:true,
    status:"",msg:"",data:[],data_detail:'',data_available:[]
};

export const pulsa_allReducer = (state=initialState,action) => {
    switch (action.type) {
        case PULSA_ALL.SUCCESS:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result
            });
        case PULSA_ALL.SUCCESS_AVAILABLE:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_available:action.data.result
            });
        case PULSA_ALL.SUCCESS_DETAIL:
            return Object.assign({}, state,{
                data_detail:action.data.result
            });
        case PULSA_ALL.FAILED:
            return Object.assign({}, state, {
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result
            });
        case PULSA_ALL.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        default:
            return state
    }
};