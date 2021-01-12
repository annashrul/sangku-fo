import {TESTIMONI} from "../../actions/_constants";


const initialState = {
    isLoadingTestimoni:true,
    isLoadingTestimoniKategori:true,
    isLoadingTestimoniDetail:true,
    status:"",msg:"",
    data_testimoni:[],
    data_testimoni_kategori:[],
    data_testimoni_detail:{},
};

export const testimoniReducer = (state=initialState,action) => {
    switch (action.type) {
        case TESTIMONI.SUCCESS_TESTIMONI:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_testimoni:action.data.result,
            });
        case TESTIMONI.SUCCESS_TESTIMONI_KATEGORI:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_testimoni_kategori:action.data.result,
            });
        case TESTIMONI.SUCCESS_TESTIMONI_DETAIL:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_testimoni_detail:action.data.result,
            });
        case TESTIMONI.LOADING_TESTIMONI:
            return Object.assign({}, state, {
                isLoadingTestimoni: action.load
            });
        case TESTIMONI.LOADING_TESTIMONI_KATEGORI:
            return Object.assign({}, state, {
                isLoadingTestimoniKategori: action.load
            });
        case TESTIMONI.LOADING_TESTIMONI_DETAIL:
            return Object.assign({}, state, {
                isLoadingTestimoniDetail: action.load
            });
        default:
            return state
    }
};