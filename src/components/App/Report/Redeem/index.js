import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Select from 'react-select';
import moment from "moment";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {rangeDate} from "helper";
import Spinner from "Spinner";
import { getRedeemReport } from '../../../../redux/actions/product/redeem.action';
import { toCurrency } from '../../../../helper';
class RedeemReport extends Component{
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
        }
    }
    componentWillMount(){
        let page=localStorage.page_redeem_report;
        this.handleParameter(page!==undefined&&page!==null?page:1);
    }
    componentDidMount(){
        if (localStorage.location_redeem_report !== undefined && localStorage.location_redeem_report !== '') {
            this.setState({location: localStorage.location_redeem_report})
        }
        if (localStorage.any_redeem_report !== undefined && localStorage.any_redeem_report !== '') {
            this.setState({any: localStorage.any_redeem_report})
        }
        if (localStorage.date_from_redeem_report !== undefined && localStorage.date_from_redeem_report !== null) {
            this.setState({startDate: localStorage.date_from_redeem_report})
        }
        if (localStorage.date_to_redeem_report !== undefined && localStorage.date_to_redeem_report !== null) {
            this.setState({endDate: localStorage.date_to_redeem_report})
        }
        if (localStorage.sort_redeem_report !== undefined && localStorage.sort_redeem_report !== null) {
            this.setState({sort: localStorage.sort_redeem_report})
        }
        if (localStorage.filter_redeem_report !== undefined && localStorage.filter_redeem_report !== null) {
            this.setState({filter: localStorage.filter_redeem_report})
        }
        if (localStorage.status_redeem_report !== undefined && localStorage.status_redeem_report !== null) {
            this.setState({status: localStorage.status_redeem_report})
        }
        if (localStorage.searchby_redeem_report !== undefined && localStorage.searchby_redeem_report !== null) {
            this.setState({searchby: localStorage.searchby_redeem_report})
        }
    }
    handlePageChange(pageNumber){
        localStorage.setItem("page_redeem_report",pageNumber);
        // this.props.dispatch(FetchRedeem(pageNumber))
    }
    toggle(e,code,barcode,name){
        e.preventDefault();
        localStorage.setItem("code",code);
        localStorage.setItem("barcode",barcode);
        localStorage.setItem("name",name);
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("detailRedeem"));
        // this.props.dispatch(FetchRedeemData(1,code))
    };
    handleEvent = (event, picker) => {
        const awal = moment(picker.startDate._d).format('YYYY-MM-DD');
        const akhir = moment(picker.endDate._d).format('YYYY-MM-DD');
        localStorage.setItem("date_from_redeem_report",`${awal}`);
        localStorage.setItem("date_to_redeem_report",`${akhir}`);
        this.setState({
            startDate:awal,
            endDate:akhir
        });
    };
    handleSearch(e){
        e.preventDefault();
        localStorage.setItem("any_redeem_report",this.state.any);
        this.handleParameter(1);
    }
    handleParameter(pageNumber){
        let dateFrom=localStorage.date_from_redeem_report;
        let dateTo=localStorage.date_to_redeem_report;
        // let lokasi = localStorage.location_redeem_report;
        let any = localStorage.any_redeem_report;
        // let sort=localStorage.sort_redeem_report;
        // let filter=localStorage.filter_redeem_report;
        // let status=localStorage.status_redeem_report;
        let searchby=localStorage.searchby_redeem_report;
        let where='';
        if(dateFrom!==undefined&&dateFrom!==null){
            where+=`&datefrom=${dateFrom}&dateto=${dateTo}`;
        }
        // if(lokasi!==undefined&&lokasi!==null&&lokasi!==''){
        //     where+=`&lokasi=${lokasi}`;
        // }
        
        if(searchby!==undefined&&searchby!==null&&searchby!==''){
            where+=`&searchby=${searchby}`;
        }
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
        this.props.dispatch(getRedeemReport(pageNumber,where))
        // this.props.dispatch(FetchRedeemExcel(pageNumber,where))
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
        
        localStorage.setItem('status_redeem_report',this.state.status===''||this.state.status===undefined?status[0].kode:localStorage.status_redeem_report)
        localStorage.setItem('sort_redeem_report',this.state.sort===''||this.state.sort===undefined?sort[0].kode:localStorage.sort_redeem_report)
        localStorage.setItem('filter_redeem_report',this.state.filter===''||this.state.filter===undefined?filter[0].kode:localStorage.filter_redeem_report)
    }
    HandleChangeLokasi(lk) {
        this.setState({
            location: lk.value
        })
        localStorage.setItem('location_redeem_report', lk.value);
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    HandleChangeSort(sr) {
        this.setState({
            sort: sr.value,
        });
        localStorage.setItem('sort_redeem_report', sr.value);
    }
    HandleChangeFilter(fl) {
        this.setState({
            filter: fl.value,
        });
        localStorage.setItem('filter_redeem_report', fl.value);
    }
    HandleChangeSearchby(sb) {
        this.setState({
            searchby: sb.value,
        });
        localStorage.setItem('searchby_redeem_report', sb.value);
    }

    toggleModal(e,total,perpage) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        // let range = total*perpage;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formRedeemExcel"));
        // this.props.dispatch(FetchRedeemExcel(1,this.state.where_data,total));
    }
    handleRePrint(e,id){
        e.preventDefault();
        // this.props.dispatch(rePrintFaktur(id));
    }


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
        } = this.props.redeemReport;
        return (
            <Layout page="Laporan Redeem">
                <div className="col-12 box-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-10" style={{zoom:"100%"}}>
                                    <div className="row">
                                        <div className="col-6 col-xs-6 col-md-3">
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
                                        <div className="col-6 col-xs-6 col-md-3">
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
                                        </div>
                                        <div className="col-6 col-xs-6 col-md-3">
                                            <div className="form-group">
                                                <label>Cari</label>
                                                <input className="form-control" type="text" style={{padding: '9px',fontWeight:'bolder'}} name="any" value={this.state.any} onChange={(e) => this.handleChange(e)}/>
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
                                                {/* <button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={(e => this.toggleModal(e,(last_page*per_page),per_page))}>
                                                    <i className="fa fa-print"></i> Export
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div>
                                {/* <table className="table table-hover table-bordered">
                                    <thead className="bg-primary">
                                    <tr>
                                        <th className="text-black" style={columnStyle} rowSpan="2">No</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Kode TRX</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Subtotal</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Layanan Pengiriman</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Title</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Gambar</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Status</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Alamat</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Penerima</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Resi</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Tanggal</th>
                                    </tr>
                                    </thead> */}
                                    {
                                        !this.props.isLoading?(
                                            <>
                                            {
                                                (
                                                    typeof data === 'object' ? data.length>0?
                                                        data.map((v,i)=>{
                                                            let status='';
                                                            if(v.status===0){
                                                                status=<span style={{color:'#ff9800',fontWeight:'800'}}>Dikemas</span>;
                                                            }else if(v.status===1){
                                                                status=<span style={{color:'black',fontWeight:'800'}}>Dikirim</span>;
                                                            }else if(v.status===2){
                                                                status=<span style={{color:'#f44336',fontWeight:'800'}}>Diterima</span>;
                                                            }
                                                            return(
                                                                <div key={i} className="card" style={{borderRadius:"10px",marginBottom:"10px"}} >
                                                                    <div className="card-body">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <span className={"black"} style={{fontWeight:"normal"}}>{moment(v.created_at).format('DD MMM YYYY HH:mm')}</span>
                                                                            </div>
                                                                            <div className="col-md-6 text-right">
                                                                                <span className={"black"} style={{fontWeight:"normal"}}>Resi : {v.resi}</span>
                                                                            </div>
                                                                        </div>
                                                                        <hr/>
                                                                        <div className="row">
                                                                            <div className="col-md-9" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                                                <p style={{color:"rgb(66, 181, 73)",fontWeight:"900"}}>
                                                                                    <span className={"black"} style={{fontWeight:"bolder"}}>{v.title}</span><br/>
                                                                                    ( {v.kd_trx} )
                                                                                </p>
                                                                            </div>
                                                                            <div className="col-md-3" style={{verticalAlign:"left"}}>
                                                                                <p className={"black"}>
                                                                                    <br/>
                                                                                    Total Pembayaran <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}>Rp {toCurrency(v.subtotal)} .-</span>
                                                                                    {/* Lihat Detail Transaksi */}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <hr/>
                                                                        <div className="row">
                                                                            <div className="col-md-5" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                                                <div className="media">
                                                                                    <div style={{height:'70px',width:'70px',marginRight:'20px'}}>
                                                                                        <img src={v.gambar} className="mr-3 media-thumb" style={{width: '100%', height: '100%', objectFit: 'contain'}} alt="Provider"/>
                                                                                    </div>
                                                                                    <div className="media-body">
                                                                                        <h5 style={{color:"rgb(66, 181, 73)"}} className="mt-0 font-17 bold">Status</h5>
                                                                                        <span style={{color:"rgb(250, 89, 29)",fontWeight:"bold"}}>{status}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-7">
                                                                                <div className="media">
                                                                                    <div className="media-body">
                                                                                        <h5 className="mt-0 font-17 bold text-info">{v.penerima}</h5>
                                                                                        <span style={{color:"#000000",fontWeight:"bold"}}>{v.main_address}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="col-md-4">
                                                                                <div className="media">
                                                                                    <div className="media-body">
                                                                                        <Link to='/ppob' style={{marginTop:'20px',float:"right",borderRadius:"10px",backgroundColor:"rgb(66, 181, 73)"}} className={"btn btn-primary"}>
                                                                                            Beli Lagi
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                // <tr key={i}>
                                                                //     <td style={columnStyle}> {i+1 + (10 * (parseInt(current_page,10)-1))}</td>
                                                                //     {/* <td style={columnStyle}>
                                                                //         <div className="btn-group">
                                                                //             <UncontrolledButtonDropdown>
                                                                //                 <DropdownToggle caret>
                                                                //                     Aksi
                                                                //                 </DropdownToggle>
                                                                //                 <DropdownMenu>
                                                                //                     <DropdownItem onClick={(e)=>this.toggle(e,v.no_faktur_mutasi,'','')}>Detail</DropdownItem>
                                                                //                     {v.status==='0'?<Link to={`../edit/alokasi/${btoa(v.no_faktur_mutasi)}`}><DropdownItem>Edit</DropdownItem></Link>:''}
                                                                //                     <Link to={`../alokasi3ply/${v.no_faktur_mutasi}`} target="_blank"><DropdownItem>3ply</DropdownItem></Link>
                                                                //                     <DropdownItem onClick={(e)=>this.handleRePrint(e,v.no_faktur_mutasi)}>Print Faktur</DropdownItem>
                                                                //                 </DropdownMenu>
                                                                //                 </UncontrolledButtonDropdown>
                                                                //         </div>
                                                                //     </td> */}
                                                                //     <td style={columnStyle}>{v.kd_trx}</td>
                                                                //     <td style={columnStyle}>{v.subtotal}</td>
                                                                //     <td style={columnStyle}>{v.layanan_pengiriman}</td>
                                                                //     <td style={columnStyle}>{v.title}</td>
                                                                //     <td style={columnStyle}>{v.gambar}</td>
                                                                //     <td style={columnStyle}>{
                                                                //         v.status==='0'?statusQ('info','Pending'):(v.status==='1'?statusQ('success','Success'):"Void")
                                                                //         // v.status===0?statusQ('danger','proses'):(v.status===1?statusQ('warning','packing')?(v.status===2?statusQ('info','dikirim'):statusQ('info','diterima')):""):""
                                                                //     }</td>
                                                                //     <td style={columnStyle}>{v.main_address}</td>
                                                                //     <td style={columnStyle}>{v.penerima}</td>
                                                                //     <td style={columnStyle}>{v.resi}</td>
                                                                //     <td style={columnStyle}>{moment(v.created_at).format("DD-MM-YYYY")}</td>

                                                                // </tr>
                                                            )
                                                        })
                                                        : "No data." : "No data."
                                                )
                                            }
                                            </>
                                        ):<div className="text-center w-100"><Spinner/></div>
                                    }
                                {/* </table> */}

                            </div>
                            <div style={{"marginTop":"20px","float":"right"}}>
                                <Paginationq
                                    current_page={current_page}
                                    per_page={per_page}
                                    total={parseInt((per_page*last_page),10)}
                                    callback={this.handlePageChange.bind(this)}
                                />
                            </div>
                            {/* <DetailRedeem redeemDetail={this.props.redeemDetail}/>
                            <RedeemReportExcel startDate={this.state.startDate} endDate={this.state.endDate} /> */}
                        </div>
                    </div>
                </div>
            </Layout>
            );
    }
}

const mapStateToProps = (state) => {
    
    return {
        auth:state.auth,
        redeemReport:state.redeemReducer.data_report,
        isLoading: state.redeemReducer.isLoadingReport,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(RedeemReport);