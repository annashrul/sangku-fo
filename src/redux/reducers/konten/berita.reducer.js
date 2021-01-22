import {BERITA} from "../../actions/_constants";


const initialState = {
    isLoadingBerita:true,
    isLoadingBeritaKategori:true,
    isLoadingBeritaDetail:true,
    status:"",msg:"",
    data_berita:[],
    data_berita_kategori:[],
    data_berita_detail:{},
};

export const beritaReducer = (state=initialState,action) => {
    switch (action.type) {
        case BERITA.SUCCESS_BERITA:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_berita:action.data.result,
            });
        case BERITA.SUCCESS_BERITA_KATEGORI:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_berita_kategori:action.data.result,
            });
        case BERITA.SUCCESS_BERITA_DETAIL:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_berita_detail:action.data.result,
            });
        case BERITA.LOADING_BERITA:
            return Object.assign({}, state, {
                isLoadingBerita: action.load
            });
        case BERITA.LOADING_BERITA_KATEGORI:
            return Object.assign({}, state, {
                isLoadingBeritaKategori: action.load
            });
        case BERITA.LOADING_BERITA_DETAIL:
            return Object.assign({}, state, {
                isLoadingBeritaDetail: action.load
            });
        default:
            return state
    }
};