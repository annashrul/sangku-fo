import {RIWAYAT_TRANSAKSI} from "../../actions/_constants";


const initialState = {
    isLoading:true,
    status:"",msg:"",
    data:[],
    raw_data:[],
    data_detail:'',
    data_available:[]
};

export const riwayatReducer = (state=initialState,action) => {
    switch (action.type) {
        case RIWAYAT_TRANSAKSI.SUCCESS:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result.data,
                raw_data: action.data.result,
            });
        case RIWAYAT_TRANSAKSI.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        default:
            return state
    }
};