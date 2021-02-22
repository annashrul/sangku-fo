import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import PembelianCekResi from "components/App/modals/report/pembelian/pembelian_cek_resi";
import moment from "moment";
import Spinner from "Spinner";
import { getRewardReport } from '../../../../redux/actions/product/reward.action';
class RewardReport extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.HandleChangeLokasi = this.HandleChangeLokasi.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.HandleChangeSort = this.HandleChangeSort.bind(this);
        this.HandleChangeFilter = this.HandleChangeFilter.bind(this);
        this.HandleChangeSearchby = this.HandleChangeSearchby.bind(this);
        this.handleRePrint = this.handleRePrint.bind(this);
        this.toggleResi = this.toggleResi.bind(this);
        this.state={
            where_data:"",
            any:"",
            location:"",
            location_data:[],
            startDate:moment(new Date()).format("yyyy-MM-DD"),
            endDate:moment(new Date()).format("yyyy-MM-DD"),
            sort:"",
            sort_data:[],
            filter:"",
            filter_data:[],
            status:"",
            status_data:[],
            searchby:"kd_trx",
            searchby_data:[],
            detail:{},
        }
    }
    componentWillMount(){
        let page=localStorage.page_reward_report;
        this.handleParameter(page!==undefined&&page!==null?page:1);
    }
    componentDidMount(){
        if (localStorage.location_reward_report !== undefined && localStorage.location_reward_report !== '') {
            this.setState({location: localStorage.location_reward_report})
        }
        if (localStorage.any_reward_report !== undefined && localStorage.any_reward_report !== '') {
            this.setState({any: localStorage.any_reward_report})
        }
        if (localStorage.date_from_reward_report !== undefined && localStorage.date_from_reward_report !== null) {
            this.setState({startDate: localStorage.date_from_reward_report})
        }
        if (localStorage.date_to_reward_report !== undefined && localStorage.date_to_reward_report !== null) {
            this.setState({endDate: localStorage.date_to_reward_report})
        }
        if (localStorage.sort_reward_report !== undefined && localStorage.sort_reward_report !== null) {
            this.setState({sort: localStorage.sort_reward_report})
        }
        if (localStorage.filter_reward_report !== undefined && localStorage.filter_reward_report !== null) {
            this.setState({filter: localStorage.filter_reward_report})
        }
        if (localStorage.status_reward_report !== undefined && localStorage.status_reward_report !== null) {
            this.setState({status: localStorage.status_reward_report})
        }
        if (localStorage.searchby_reward_report !== undefined && localStorage.searchby_reward_report !== null) {
            this.setState({searchby: localStorage.searchby_reward_report})
        }
    }
    handlePageChange(pageNumber){
        localStorage.setItem("page_reward_report",pageNumber);
        // this.props.dispatch(FetchReward(pageNumber))
    }
    toggle(e,code,barcode,name){
        e.preventDefault();
        localStorage.setItem("code",code);
        localStorage.setItem("barcode",barcode);
        localStorage.setItem("name",name);
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("detailReward"));
        // this.props.dispatch(FetchRewardData(1,code))
    };
    handleEvent = (event, picker) => {
        const awal = moment(picker.startDate._d).format('YYYY-MM-DD');
        const akhir = moment(picker.endDate._d).format('YYYY-MM-DD');
        localStorage.setItem("date_from_reward_report",`${awal}`);
        localStorage.setItem("date_to_reward_report",`${akhir}`);
        this.setState({
            startDate:awal,
            endDate:akhir
        });
    };
    handleSearch(e){
        e.preventDefault();
        localStorage.setItem("any_reward_report",this.state.any);
        this.handleParameter(1);
    }
    handleParameter(pageNumber){
        // let dateFrom=localStorage.date_from_reward_report;
        // let dateTo=localStorage.date_to_reward_report;
        // let lokasi = localStorage.location_reward_report;
        let any = localStorage.any_reward_report;
        // let sort=localStorage.sort_reward_report;
        // let filter=localStorage.filter_reward_report;
        // let status=localStorage.status_reward_report;
        // let searchby=localStorage.searchby_reward_report;
        let where='';
        // if(dateFrom!==undefined&&dateFrom!==null){
        //     where+=`&datefrom=${dateFrom}&dateto=${dateTo}`;
        // }
        // if(lokasi!==undefined&&lokasi!==null&&lokasi!==''){
        //     where+=`&lokasi=${lokasi}`;
        // }
        
        // if(searchby!==undefined&&searchby!==null&&searchby!==''){
        //     where+=`&searchby=${searchby}`;
        // }
        // if(status!==undefined&&status!==null&&status!==''){
        //     where+=`&status=${status}`;
        // }
        // if(filter!==undefined&&filter!==null&&filter!==''){
        //     if(sort!==undefined&&sort!==null&&sort!==''){
        //         where+=`&sort=${filter}|${sort}`;
        //     }
        // }
        if(any!==undefined&&any!==null&&any!==''){
            where+=`&q=${any}`
        }
        this.setState({
            where_data:where
        })
        this.props.dispatch(getRewardReport(pageNumber,where))
        // this.props.dispatch(FetchRewardExcel(pageNumber,where))
    }
    componentWillReceiveProps = (nextProps) => {
        let sort = [
            {kode:"desc",value: "DESCENDING"},
            {kode:"asc",value: "ASCENDING"},
        ];
        let data_sort=[];
        sort.map((i) => {
            data_sort.push({
                value: i.kode,
                label: i.value
            });
            return null;
        });
        let filter = [
            {kode:"no_faktur_mutasi",value: "Kode Mutasi"},
            {kode:"tgl_mutasi",value: "Tanggal"},
            {kode:"status",value: "Status"},
        ];
        let data_filter=[];
        filter.map((i) => {
            data_filter.push({
                value: i.kode,
                label: i.value
            });
            return null;
        });
        let status = [
            {kode:"",value: "Semua"},
            {kode:"0",value: "Dikirim"},
            {kode:"1",value: "Diterima"},
        ];
        let data_status=[];
        status.map((i) => {
            data_status.push({
                value: i.kode,
                label: i.value
            });
            return null;
        });
        let searchby = [
            {kode:"kd_trx",value: "Kode TRX"},
            {kode:"penerima",value: "Penerima"},
            {kode:"resi",value: "Resi"},
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
            sort_data: data_sort,
            filter_data: data_filter,
            status_data: data_status,
            searchby_data: data_searchby,
        });
        if (nextProps.auth.user) {
            let lk = [{
                value: '',
                label: 'Semua Lokasi'
            }];
            let loc = nextProps.auth.user.lokasi;
            if(loc!==undefined){
                loc.map((i) => {
                    lk.push({
                        value: i.kode,
                        label: i.nama
                    });
                    return null;
                })
                this.setState({
                    location_data: lk,
                })
            }
        }
        
        localStorage.setItem('status_reward_report',this.state.status===''||this.state.status===undefined?status[0].kode:localStorage.status_reward_report)
        localStorage.setItem('sort_reward_report',this.state.sort===''||this.state.sort===undefined?sort[0].kode:localStorage.sort_reward_report)
        localStorage.setItem('filter_reward_report',this.state.filter===''||this.state.filter===undefined?filter[0].kode:localStorage.filter_reward_report)
    }
    HandleChangeLokasi(lk) {
        this.setState({
            location: lk.value
        })
        localStorage.setItem('location_reward_report', lk.value);
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    HandleChangeSort(sr) {
        this.setState({
            sort: sr.value,
        });
        localStorage.setItem('sort_reward_report', sr.value);
    }
    HandleChangeFilter(fl) {
        this.setState({
            filter: fl.value,
        });
        localStorage.setItem('filter_reward_report', fl.value);
    }
    HandleChangeSearchby(sb) {
        this.setState({
            searchby: sb.value,
        });
        localStorage.setItem('searchby_reward_report', sb.value);
    }

    toggleModal(e,total,perpage) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        // let range = total*perpage;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formRewardExcel"));
        // this.props.dispatch(FetchRewardExcel(1,this.state.where_data,total));
    }
    handleRePrint(e,id){
        e.preventDefault();
        // this.props.dispatch(rePrintFaktur(id));
    }
    toggleResi(e,resi){
        e.preventDefault();
        // JP3738533084
        if(resi!=='-'){
            this.setState({
                detail:{resi:resi,kurir:'jnt',kd_trx:''}
            });
            const bool = !this.props.isOpen;
            this.props.dispatch(ModalToggle(bool));
            this.props.dispatch(ModalType("pembelianCekResi"));
        }
    };


    render(){
        // const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        const {
            per_page,
            last_page,
            current_page,
            // from,
            // to,
            data,
            // total
        } = this.props.rewardReport;
        return (
            <Layout page="Laporan Reward">
                <div className="card box-margin">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    {/* <div className="col-12 col-xs-4 col-md-3">
                                        <div className="form-group">
                                            <label htmlFor=""> Periode </label>
                                            <DateRangePicker
                                                style={{display:'unset'}}
                                                ranges={rangeDate}
                                                alwaysShowCalendars={true}
                                                onEvent={this.handleEvent}
                                            >
                                                <input type="text" className="form-control" value={`${this.state.startDate} to ${this.state.endDate}`} style={{padding: '10px',fontWeight:'bolder'}}/>
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
                                                // placeholder="Pilih Tipe Kas"
                                                onChange={this.HandleChangeSearchby}
                                                value={
                                                    this.state.searchby_data.find(op => {
                                                        return op.value === this.state.searchby
                                                    })
                                                }
                                            />
                                        </div>
                                    </div> */}
                                    <div className="col-12 col-xs-4 col-md-3">
                                        <div className="form-group">
                                            <label>Cari</label>
                                            <div className="input-group">
                                                <input className="form-control" type="text" style={{padding: '9px',fontWeight:'bolder'}} name="any" value={this.state.any} onChange={(e) => this.handleChange(e)}/>
                                                <div className="input-group-append">
                                                <button className="btn btn-primary" onClick={this.handleSearch}>
                                                    <i className="fa fa-search"/>
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                                {
                                    !this.props.isLoading?(
                                        <>
                                        {
                                            (
                                                typeof data === 'object' ? data.length>0?
                                                    data.map((v,i)=>{
                                                        let status='';
                                                        if(v.status===0){
                                                            status=<span style={{color:'#ff9800',fontWeight:'800'}}>Pending</span>;
                                                        }else if(v.status===1){
                                                            status=<span style={{color:'black',fontWeight:'800'}}>Diterima</span>;
                                                        }else if(v.status===2){
                                                            status=<span style={{color:'#f44336',fontWeight:'800'}}>Ditolak</span>;
                                                        }
                                                        return(
                                                            <div key={i} className="card" style={{borderRadius:"10px",marginBottom:"10px"}} >
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <span className="text-success" style={{fontWeight:"normal"}}>{v.kd_trx}</span>
                                                                        </div>
                                                                        <div className="col-md-6 text-right">
                                                                            <span className={"black"} style={{fontWeight:"normal"}}>{moment(v.created_at).format('DD MMM YYYY HH:mm')}</span>
                                                                        </div>
                                                                    </div>
                                                                    <hr/>
                                                                    <div className="row">
                                                                        <div className="col-md-5" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                                            <div className="media d-flex align-items-center">
                                                                                <div style={{height:'auto',marginRight:'20px'}}>
                                                                                    <img src={v.gambar} className="mr-3 media-thumb" style={{height: '100%', objectFit: 'contain'}} alt="Provider"/>
                                                                                </div>
                                                                                <div className="media-body">
                                                                                    <h5 style={{color:"rgb(66, 181, 73)"}} className="mt-0 font-17 bold">Reward</h5>
                                                                                    <span style={{color:"rgb(250, 89, 29)",fontWeight:"bold"}}>{v.reward}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-7">
                                                                            <small className="text-muted">Detail Penerima</small>
                                                                            <div className="media">
                                                                                <div className="media-body">
                                                                                    <h5 className="mt-0 font-17 bold text-info">{v.penerima} - <span className="text-dark">{v.no_hp}</span></h5>
                                                                                    <span style={{color:"#000000",fontWeight:"bold"}}>{v.main_address}</span>
                                                                                </div>
                                                                            </div>
                                                                            <hr/>
                                                                            <div className="media">
                                                                                <div className="media-body d-flex justify-content-between align-items-center">
                                                                                    <div>Status : {status}</div>
                                                                                    {/* <h5 className="mt-0 font-17 bold text-warning">Resi : {v.resi}</h5> */}
                                                                                    <div onClick={(e)=>this.toggleResi(e,v.resi)} className="col-auto" style={v.resi==='-'?{cursor:"not-allowed",color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}:
                                                                                    {cursor:"pointer",color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}>
                                                                                        <i className={"fa fa-random"} style={{color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}/> Lacak Resi
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    : "No data." : "No data."
                                            )
                                        }
                                        </>
                                    ):<div className="text-center w-100"><Spinner/></div>
                                }

                        </div>
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
                {this.state.detail.resi!==undefined?<PembelianCekResi detailResi={this.state.detail}/>:null}
            </Layout>
            );
    }
}

const mapStateToProps = (state) => {
    
    return {
        auth:state.auth,
        rewardReport:state.rewardReducer.data_report,
        isLoading: state.rewardReducer.isLoadingReport,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(RewardReport);