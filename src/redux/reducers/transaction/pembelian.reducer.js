import {PEMBELIAN} from "../../actions/_constants";


const initialState = {
    isLoading:true,
    isLoadingReport:true,
    isLoadingReportDetail:true,
    isLoadingReportExcel:true,
    status:"",msg:"",
    data_report:[],
    data_report_excel:[],
    data_report_detail:{},
};

export const pembelianReducer = (state=initialState,action) => {
    switch (action.type) {
        case PEMBELIAN.SUCCESS_REPORT:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_report:action.data.result,
            });
        case PEMBELIAN.SUCCESS_REPORT_EXCEL:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_report_excel:action.data.result,
            });
        case PEMBELIAN.SUCCESS_REPORT_DETAIL:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_report_detail:action.data.result,
            });
        case PEMBELIAN.LOADING_REPORT:
            return Object.assign({}, state, {
                isLoadingReport: action.load
            });
        case PEMBELIAN.LOADING_REPORT_DETAIL:
            return Object.assign({}, state, {
                isLoadingReportDetail: action.load
            });
        case PEMBELIAN.LOADING_REPORT_EXCEL:
            return Object.assign({}, state, {
                isLoadingReportExcel: action.load
            });
        default:
            return state
    }
};