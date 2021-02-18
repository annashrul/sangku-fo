import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Select from 'react-select';
import moment from "moment";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {rangeDate} from "helper";
import {getReportPPOB, getReportDetail} from "redux/actions/ppob/reportPPOB.action";
import Cards from './src/cards'
import Skeleton from './src/skeleton'
import { NOTIF_ALERT } from 'redux/actions/_constants';
import Detail from "components/App/modals/report/ppob/detail";

class IndexReportPPOB extends Component{
    constructor(props){
        super(props);
        this.state={
            where_data:"",
            any:"",
            location:"",
            location_data:[],
            startDate       :moment(new Date()).format("yyyy-MM-DD"),
            endDate         :moment(new Date()).format("yyyy-MM-DD"),
            dateFrom:moment(new Date()).format("yyyy-MM-DD"),
            dateTo:moment(new Date()).format("yyyy-MM-DD"),
            sort:"",
            sort_data:[],
            filter:"",
            filter_data:[],
            searchby:"",
            searchby_data:[],
            data:[],
            detail_trx:'-'
        };
        this.toggleDetail = this.toggleDetail.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.HandleChangeSearchby = this.HandleChangeSearchby.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }
    checkingParameter(pageNumber){
        let where='';
        let dateFrom=localStorage.getItem("date_from_ppob_report");
        let dateTo=localStorage.getItem("date_to_ppob_report");
        let any=localStorage.getItem("any_ppob_report");
        let searchby=localStorage.searchby_ppob_report;
        if(dateFrom!==null&&dateTo!==null){
            if(where!==''){where+='&'}where+=`datefrom=${dateFrom}&dateto=${dateTo}`
        }else{
            if(where!==''){where+='&'}where+=`datefrom=${this.state.startDate}&dateto=${this.state.endDate}`
        }
        if(searchby!==undefined&&searchby!==null&&searchby!==''){
            if(where!==''){where+='&'}where+=`searchby=${searchby}`;
        }
        if(any!==undefined&&any!==null&&any!==''){
            if(where!==''){where+='&'}where+=`q=${any}`
        }
        this.setState({
            where_data:where
        })
        this.props.dispatch(getReportPPOB(pageNumber===null?1:pageNumber,where));
        // this.props.dispatch(FetchReportExcel(where));
    }
    // componentWillMount(){
    //     this.props.dispatch(getReportPPOB('page=1'));
    // }
    componentWillMount(){
        let page=localStorage.getItem("pageNumber_ppob_report");
        this.checkingParameter(page!==undefined&&page!==null?page:1);
    }
    componentDidMount(){
        if (localStorage.any_ppob_report !== undefined && localStorage.any_ppob_report !== '') {
            this.setState({
                any: localStorage.any_ppob_report
            })
        }
        if (localStorage.date_from_ppob_report !== undefined && localStorage.date_from_ppob_report !== null) {
            this.setState({
                startDate: localStorage.date_from_ppob_report
            })
        }
        if (localStorage.date_to_ppob_report !== undefined && localStorage.date_to_ppob_report !== null) {
            this.setState({
                endDate: localStorage.date_to_ppob_report
            })
        }
        if (localStorage.searchby_ppob_report !== undefined && localStorage.searchby_ppob_report !== null) {
            this.setState({searchby: localStorage.searchby_ppob_report})
        }
    }

    componentWillReceiveProps(nextProps){
        let data=[];
        if(typeof nextProps.data.data==='object'){
            if(nextProps.data.data.length>0){
                nextProps.data.data.map((v,i)=>{
                    data.push({
                        isDetail:false,
                        full_name: v.full_name,
                        harga: v.harga,
                        icon: v.icon,
                        id:v.id,
                        kategori:v.kategori,
                        kd_trx:v.kd_trx,
                        logo:v.logo,
                        operators:v.operators,
                        produk:v.produk,
                        status:v.status,
                        target:v.target,
                        tipe:v.tipe,
                        created_at:v.created_at,
                    })
                    return null;
                })
            }
            else{
                data=[];
            }
        }
    
        this.setState({data:data});
        let searchby = [
            {kode:"kd_trx",value: "Kode TRX"},
            {kode:"operators",value: "Operator"},
            {kode:"target",value: "Target"},
        ];
        let data_searchby=[];
        searchby.map((i) => {
            data_searchby.push({
                value: i.kode,
                label: i.value
            });
            return null;
        });
        this.setState({
            searchby_data: data_searchby,
        });
    
        localStorage.setItem('searchby_ppob_report',this.state.searchby===''||this.state.searchby===undefined?searchby[0].kode:localStorage.searchby_ppob_report)
    }
    HandleChangeSearchby(sb) {
        this.setState({
            searchby: sb.value,
        });
        localStorage.setItem('searchby_ppob_report', sb.value);
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }
    // handlePage(num){
    //     this.props.dispatch(getReportPPOB(`page=${num}`));
    // }
    handleEvent = (event, picker) => {
        const from = moment(picker.startDate._d).format('YYYY-MM-DD');
        const to = moment(picker.endDate._d).format('YYYY-MM-DD');
        this.setState({
            dateFrom:from,
            dateTo:to
        });

    };

    toggleDetail(e,kd_trx) {
        e.preventDefault();
        this.props.dispatch(getReportDetail(btoa(kd_trx)))

        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("riwayatppobDetail"));
    }
    handlePageChange(pageNumber){
        localStorage.setItem("pageNumber_ppob_report",pageNumber);
        this.checkingParameter(pageNumber);
    }
    handleSearch(e){
        e.preventDefault();
        localStorage.setItem("any_ppob_report",this.state.any_ppob_report);
        this.checkingParameter(1);
    }

    render(){
        const {
            per_page,
            last_page,
            current_page,
        } = this.props.data;
        return (
            <Layout page="Riwayat Top Up & Tagihan">
                <div className="col-12 box-margin">
                    <div className="card" style={{marginBottom:"10px"}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-10" style={{zoom:"100%"}}>
                                    <div className="row">
                                        <div className="col-6 col-xs-6 col-md-3">
                                            <div className="form-group">
                                                <label htmlFor=""> Periode </label>
                                                <DateRangePicker
                                                    autoUpdateInput={true} showDropdowns={true} style={{display:'unset'}} ranges={rangeDate} alwaysShowCalendars={true} onApply={this.handleEvent}>
                                                    <input type="text" readOnly={true} className="form-control" value={`${this.state.dateFrom} to ${this.state.dateTo}`}/>
                                                </DateRangePicker>

                                            </div>
                                        </div>
                                        <div className="col-6 col-xs-6 col-md-3">
                                            <div className="form-group">
                                                <label className="control-label font-12">
                                                    Cari Berdasarkan
                                                </label>
                                                <Select
                                                    options={this.state.searchby_data}
                                                    // placeholder="Pilih Status"
                                                    onChange={this.HandleChangeSearchby}
                                                    value={
                                                        this.state.searchby_data.find(op => {
                                                        return op.value === this.state.searchby
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6 col-xs-6 col-md-3">
                                            <div className="form-group">
                                                <label>Cari</label>
                                                <input className="form-control" type="text" name="any_ppob_report" value={this.state.any_ppob_report} onChange={(e) => this.handleChange(e)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-xs-6 col-md-2" style={{zoom:"85%",textAlign:"right"}}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={this.handleSearch}>
                                                    <i className="fa fa-search"/>
                                                </button>
                                                {/*<button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={(e => this.toggleModal(e,(last_page*per_page),per_page))}>*/}
                                                    {/*<i className="fa fa-print"></i> Export*/}
                                                {/*</button>*/}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                        {

                            !this.props.isLoading?this.state.data.length>0?
                            <Cards 
                                data={this.state.data}
                                handleOnClick={this.toggleDetail}
                            />:
                            <div style={{textAlign:'center'}}><img src={NOTIF_ALERT.NO_DATA} alt="sangqu"/></div>:<Skeleton/>

                        }
                    <div className="card">
                        <div className="card-body">
                            <div style={{"marginTop":"20px","float":"right"}}>
                                <Paginationq
                                    current_page={current_page}
                                    per_page={per_page}
                                    total={parseInt((per_page*last_page),10)}
                                    callback={this.handlePageChange.bind(this)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Detail/>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        auth:state.auth,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isLoading:state.reportPPOBReducer.isLoading,
        data:state.reportPPOBReducer.data,
    }
}
export default connect(mapStateToProps)(IndexReportPPOB);