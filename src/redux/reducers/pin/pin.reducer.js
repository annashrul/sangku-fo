import {PIN} from "../../actions/_constants";


const initialState = {
    isLoading:true,
    isLoadingAvail:true,
    status:"",msg:"",data:[],data_detail:'',data_available:[]
};

export const pinReducer = (state=initialState,action) => {
    switch (action.type) {
        case PIN.SUCCESS:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result
            });
        case PIN.SUCCESS_AVAILABLE:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_available:action.data.result
            });
        case PIN.SUCCESS_DETAIL:
            return Object.assign({}, state,{
                data_detail:action.data.result
            });
        case PIN.FAILED:
            return Object.assign({}, state, {
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result
            });
        case PIN.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case PIN.LOADING_AVAILABLE:
            return Object.assign({}, state, {
                isLoadingAvail: action.load
            });
        default:
            return state
    }
};