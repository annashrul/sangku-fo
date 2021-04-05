import React,{Component} from 'react';
import Layout from "components/Layout";
import connect from "react-redux/es/connect/connect";
import Spinner from "Spinner";
import DateRangePicker from "react-bootstrap-daterangepicker";
import {rangeDate} from "helper";
import Select from "react-select";
import moment from "moment";
import {ModalToggle,ModalType} from "redux/actions/modal.action";
import Paginationq from "helper";
import {toRp} from "helper";
import { FetchReport, FetchReportExcel } from '../../../../redux/actions/member/penarikan.action';
import FormPenarikanExcel from '../../modals/report/wallet/form_penarikan_excel';
import Skeleton from 'react-loading-skeleton';

class PenarikanReport extends Component{
    constructor(props){
        super(props);
        this.handleSearch       = this.handleSearch.bind(this);
        this.handleEvent        = this.handleEvent.bind(this);
        this.handleChange       = this.handleChange.bind(this);
        this.HandleChangeStatus = this.HandleChangeStatus.bind(this);
        this.HandleChangeSearchby = this.HandleChangeSearchby.bind(this);
        this.state={
            where_data:"",
            detail          :{},
            startDate       :moment(new Date()).format("yyyy-MM-DD"),
            endDate         :moment(new Date()).format("yyyy-MM-DD"),
            any_penarikan_report:'',
            searchby:"",
            searchby_data:[],
        }
    }
    componentWillMount(){
        let page=localStorage.getItem("pageNumber_penarikan_report");
        this.checkingParameter(page!==undefined&&page!==null?page:1);
    }
    componentDidMount(){
        if (localStorage.any_penarikan_report !== undefined && localStorage.any_penarikan_report !== '') {
            this.setState({
                any: localStorage.any_penarikan_report
            })
        }
        if (localStorage.date_from_penarikan_report !== undefined && localStorage.date_from_penarikan_report !== null) {
            this.setState({
                startDate: localStorage.date_from_penarikan_report
            })
        }
        if (localStorage.date_to_penarikan_report !== undefined && localStorage.date_to_penarikan_report !== null) {
            this.setState({
                endDate: localStorage.date_to_penarikan_report
            })
        }
        if (localStorage.searchby_penarikan_report !== undefined && localStorage.searchby_penarikan_report !== null) {
            this.setState({searchby: localStorage.searchby_penarikan_report})
        }
    }
    componentWillReceiveProps(nextProps){
        let searchby = [
            {kode:"kd_trx",value: "Kode TRX"},
            {kode:"bank_name",value: "Bank"},
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
    
        localStorage.setItem('searchby_penarikan_report',this.state.searchby===''||this.state.searchby===undefined?searchby[0].kode:localStorage.searchby_penarikan_report)
    }
    checkingParameter(pageNumber){
        let where='';
        let dateFrom=localStorage.getItem("date_from_penarikan_report");
        let dateTo=localStorage.getItem("date_to_penarikan_report");
        let any=localStorage.getItem("any_penarikan_report");
        let searchby=localStorage.searchby_penarikan_report;
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
        this.props.dispatch(FetchReport(pageNumber===null?1:pageNumber,where));
        // this.props.dispatch(FetchReportExcel(where));
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }
    HandleChangeStatus(st) {
        this.setState({
            status: st.value,
        });
        localStorage.setItem('status_penarikan_report', st.value);
    }
    HandleChangeSearchby(sb) {
        this.setState({
            searchby: sb.value,
        });
        localStorage.setItem('searchby_penarikan_report', sb.value);
    }

    handleEvent = (event, picker) => {
        const awal = moment(picker.startDate._d).format('YYYY-MM-DD');
        const akhir = moment(picker.endDate._d).format('YYYY-MM-DD');
        localStorage.setItem("date_from_penarikan_report",`${awal}`);
        localStorage.setItem("date_to_penarikan_report",`${akhir}`);
        this.setState({
            startDate:awal,
            endDate:akhir
        });
        
        
    };
    handlePageChange(pageNumber){
        localStorage.setItem("pageNumber_penarikan_report",pageNumber);
        this.checkingParameter(pageNumber);
    }
    handleSearch(e){
        e.preventDefault();
        localStorage.setItem("any_penarikan_report",this.state.any_penarikan_report);
        this.checkingParameter(1);
    }
    toggleModal(e,total,perpage) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        // let range = total*perpage;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formPenarikanExcel"));
        this.props.dispatch(FetchReportExcel(1,this.state.where_data,total));
    }
    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        const {
            // total,
            last_page,
            per_page,
            current_page,
            // from,
            // to,
            data
        } = this.props.dataReport;
        
        return (
            <Layout page="Laporan Penarikan" subpage="Laporan">
                <div className="card box-margin">
                    <div className="card-body">
                        <div className="row" style={{zoom:"100%"}}>
                            <div className="col-md-10">
                                <div className="row">
                                    <div className="col-12 col-xs-4 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor=""> Periode </label>
                                                <DateRangePicker
                                                    ranges={rangeDate}
                                                    alwaysShowCalendars={true}
                                                    onEvent={this.handleEvent}
                                                    showDropdowns={true}
                                                    autoUpdateInput={true}
                                                >
                                                    <input type="text" className="form-control" name="date_penarikan_report" value={`${this.state.startDate} to ${this.state.endDate}`} style={{padding: '10px',fontWeight:'bolder'}}/>
                                                </DateRangePicker>
                                        </div>
                                    </div>
                                    <div className="col-12 col-xs-4 col-md-3">
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
                                    <div className="col-12 col-xs-4 col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="">Cari</label>
                                            <div className="input-group">
                                                <input type="text" name="any_penarikan_report" className="form-control" value={this.state.any_penarikan_report}  onChange={(e)=>this.handleChange(e)}/>
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" onClick={this.handleSearch}>
                                                        <i className="fa fa-search"/>
                                                    </button>
                                                </div>
                                                <button className="btn btn-primary ml-2" onClick={(e => this.toggleModal(e,(last_page*per_page),per_page))}>
                                                    <i className="fa fa-print"></i> Export
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="d-none d-md-block">
                            <div style={{overflowX: "auto",zoom:"80%"}}>
                                <table className="table table-hover table-bordered">
                                    <thead className="bg-info">
                                    <tr>
                                        <th className="text-light" style={columnStyle}>No</th>
                                        <th className="text-light" style={columnStyle}>No Faktur</th>
                                        <th className="text-light" style={columnStyle}>Tanggal</th>
                                        {/* <th className="text-light" style={columnStyle}>Nama Pemilik Bank</th> */}
                                        <th className="text-light" style={columnStyle}>Bank</th>
                                        {/* <th className="text-light" style={columnStyle}>No. Akun</th> */}
                                        <th className="text-light" style={columnStyle}>Amount</th>
                                        <th className="text-light" style={columnStyle}>Fee</th>
                                        {/* <th className="text-light" style={columnStyle}>Nama</th> */}
                                        <th className="text-light" style={columnStyle}>Status</th>
                                    </tr>
                                    </thead>
                                    {
                                        !this.props.isLoadingReport ? (
                                            <tbody>
                                            {
                                                (
                                                    typeof data === 'object' ? data.length>0?
                                                        data.map((v,i)=>{
                                                            return(
                                                                <tr key={i}>
                                                                    <td style={columnStyle}> {i+1 + (10 * (parseInt(current_page,10)-1))}</td>
                                                                    <td style={columnStyle}>{v.kd_trx}</td>
                                                                    <td style={columnStyle}>{moment(v.created_at).format("YYYY-MM-DD")}</td>
                                                                    {/* <td style={columnStyle}>{v.acc_name}</td> */}
                                                                    <td style={columnStyle}>{v.bank_name}</td>
                                                                    {/* <td style={columnStyle}>{v.acc_no}</td> */}
                                                                    <td style={columnStyle}>{toRp(v.amount)}</td>
                                                                    <td style={columnStyle}>{toRp(v.charge===null?0:v.charge)}</td>
                                                                    {/* <td style={columnStyle}>{v.full_name}</td> */}
                                                                    <td style={columnStyle}>{
                                                                        v.status===0?
                                                                        <span className="btn-info p-2 text-white rounded">Pending</span>:
                                                                        v.status===1?
                                                                        <span className="btn-success p-2 text-white rounded">Selesai</span>:
                                                                        v.status===2?
                                                                        <span className="btn-danger p-2 text-white rounded">Batal</span>:''
                                                                    }</td>
                                                                </tr>
                                                            )
                                                        })
                                                        : "No data.":"No data."
                                                )
                                            }
                                            </tbody>
                                        ) : <tbody><tr><td colSpan="7"><Spinner/></td></tr></tbody>
                                    }
                                </table>

                            </div>
                        </div>
                        <div className="d-block d-md-none">
                        {
                            !this.props.isLoadingReport ? 
                                    (
                                        typeof data === 'object' ? data.length>0?
                                            data.map((v,i)=>{
                                                return(
                                                    <div className="card bg-white shadow-sm border-bottom mb-2 mt-4 ml-3">
                                                    <span className="btn btn-primary btn-circle mt-n3 mb-n3 ml-n3">{i+1 + (10 * (parseInt(current_page,10)-1))}</span>
                                                        <div className="card-body p-2 mt-3">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <h6 className="mb-1 text-black">{this.props.isLoadingReport?<Skeleton width='200px'/>:v.kd_trx}</h6>
                                                                <div className="d-flex align-items-end">{
                                                                    v.status===0?
                                                                    <span className="btn-info p-2 text-white rounded">Pending</span>:
                                                                    v.status===1?
                                                                    <span className="btn-success p-2 text-white rounded">Selesai</span>:
                                                                    v.status===2?
                                                                    <span className="btn-danger p-2 text-white rounded">Batal</span>:''
                                                                }</div>
                                                            </div>
                                                            <hr className="mb-1 mt-2"/>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="text-left w-100 d-flex align-items-center">
                                                                    <p className="mb-0 text-mute">{this.props.isLoadingReport?<Skeleton width='350px'/>:'Penarikan ke '+v.bank_name}</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center mt-2 border border-secondary rounded p-2">
                                                                <h6 className="text-success m-0">Amount : {this.props.isLoadingReport?<Skeleton width='100px'/>:'Rp.'+toRp(v.amount===null?0:v.amount)}</h6>
                                                                <small className="text-danger">{this.props.isLoadingReport?<Skeleton width='100px'/>:'Fee : Rp.'+toRp(v.charge===null?0:v.charge)}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : "No data.":"No data."
                            ) : <div className="w-100 text-center"><Spinner/></div>
                        }
                        </div>
                        <div style={{"marginTop":"20px","float":"right"}}>
                            <Paginationq
                                current_page={parseInt(current_page,10)}
                                per_page={parseInt(per_page,10)}
                                total={parseInt(last_page*per_page,10)}
                                callback={this.handlePageChange.bind(this)}
                            />
                        </div>
                        {/* <DetailPenarikanReport penarikanReportDetail={this.props.penarikanReportDetail}/>
                        <FormReturPenarikan dataRetur={this.props.dataRetur}/>
                        <PenarikanReportExcel startDate={this.state.startDate} endDate={this.state.endDate} location={this.state.location} /> */}
                        <FormPenarikanExcel startDate={this.state.startDate} endDate={this.state.endDate} />
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        dataReport:state.penarikanReducer.data_report,
        isLoadingReport: state.penarikanReducer.isLoadingReport,
        dataReportExcel:state.penarikanReducer.data_report_excel,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(PenarikanReport)