import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
// import {FetchPenjualan,FetchPenjualanExcel, FetchPenjualanData,rePrintFaktur} from "redux/actions/inventory/penjualan.action";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import PenjualanDetail from "components/App/modals/report/penjualan/penjualan_detail";
import PenjualanReportExcel from "components/App/modals/report/penjualan/penjualan_form_excel";
// import Select from 'react-select';
import moment from "moment";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {rangeDate} from "helper";
import Preloader from "Preloader";
import {statusQ, toRp} from "helper";
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { getReportPenjualan, getReportPenjualanDetail, getReportPenjualanExcel } from '../../../../redux/actions/transaction/penjualan.action';
class PenjualanReport extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.HandleChangeLokasi = this.HandleChangeLokasi.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.HandleChangeSort = this.HandleChangeSort.bind(this);
        this.HandleChangeFilter = this.HandleChangeFilter.bind(this);
        this.HandleChangeStatus = this.HandleChangeStatus.bind(this);
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
        }
    }
    componentWillMount(){
        let page=localStorage.page_penjualan_report;
        this.handleParameter(page!==undefined&&page!==null?page:1);
    }
    componentDidMount(){
        if (localStorage.location_penjualan_report !== undefined && localStorage.location_penjualan_report !== '') {
            this.setState({location: localStorage.location_penjualan_report})
        }
        if (localStorage.any_penjualan_report !== undefined && localStorage.any_penjualan_report !== '') {
            this.setState({any: localStorage.any_penjualan_report})
        }
        if (localStorage.date_from_penjualan_report !== undefined && localStorage.date_from_penjualan_report !== null) {
            this.setState({startDate: localStorage.date_from_penjualan_report})
        }
        if (localStorage.date_to_penjualan_report !== undefined && localStorage.date_to_penjualan_report !== null) {
            this.setState({endDate: localStorage.date_to_penjualan_report})
        }
        if (localStorage.sort_penjualan_report !== undefined && localStorage.sort_penjualan_report !== null) {
            this.setState({sort: localStorage.sort_penjualan_report})
        }
        if (localStorage.filter_penjualan_report !== undefined && localStorage.filter_penjualan_report !== null) {
            this.setState({filter: localStorage.filter_penjualan_report})
        }
        if (localStorage.status_penjualan_report !== undefined && localStorage.status_penjualan_report !== null) {
            this.setState({status: localStorage.status_penjualan_report})
        }
    }
    handlePageChange(pageNumber){
        localStorage.setItem("page_penjualan_report",pageNumber);
        this.props.dispatch(getReportPenjualan(pageNumber))
    }
    toggle(e,code,barcode,name){
        e.preventDefault();
        localStorage.setItem("code",code);
        localStorage.setItem("barcode",barcode);
        localStorage.setItem("name",name);
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("penjualanDetail"));
        this.props.dispatch(getReportPenjualanDetail(code))
    };
    handleEvent = (event, picker) => {
        const awal = moment(picker.startDate._d).format('YYYY-MM-DD');
        const akhir = moment(picker.endDate._d).format('YYYY-MM-DD');
        localStorage.setItem("date_from_penjualan_report",`${awal}`);
        localStorage.setItem("date_to_penjualan_report",`${akhir}`);
        this.setState({
            startDate:awal,
            endDate:akhir
        });
    };
    handleSearch(e){
        e.preventDefault();
        localStorage.setItem("any_penjualan_report",this.state.any);
        this.handleParameter(1);
    }
    handleParameter(pageNumber){
        let dateFrom=localStorage.date_from_penjualan_report;
        let dateTo=localStorage.date_to_penjualan_report;
        // let lokasi = localStorage.location_penjualan_report;
        let any = localStorage.any_penjualan_report;
        // let sort=localStorage.sort_penjualan_report;
        // let filter=localStorage.filter_penjualan_report;
        // let status=localStorage.status_penjualan_report;
        let where='';
        if(dateFrom!==undefined&&dateFrom!==null){
            where+=`&datefrom=${dateFrom}&dateto=${dateTo}`;
        }
        // if(lokasi!==undefined&&lokasi!==null&&lokasi!==''){
        //     where+=`&lokasi=${lokasi}`;
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
        this.props.dispatch(getReportPenjualan(pageNumber,where))
        // this.props.dispatch(FetchPenjualanExcel(pageNumber,where))
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
        this.setState({
            sort_data: data_sort,
            filter_data: data_filter,
            status_data: data_status,
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
        
        localStorage.setItem('status_penjualan_report',this.state.status===''||this.state.status===undefined?status[0].kode:localStorage.status_penjualan_report)
        localStorage.setItem('sort_penjualan_report',this.state.sort===''||this.state.sort===undefined?sort[0].kode:localStorage.sort_penjualan_report)
        localStorage.setItem('filter_penjualan_report',this.state.filter===''||this.state.filter===undefined?filter[0].kode:localStorage.filter_penjualan_report)
    }
    HandleChangeLokasi(lk) {
        this.setState({
            location: lk.value
        })
        localStorage.setItem('location_penjualan_report', lk.value);
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    HandleChangeSort(sr) {
        this.setState({
            sort: sr.value,
        });
        localStorage.setItem('sort_penjualan_report', sr.value);
    }
    HandleChangeFilter(fl) {
        this.setState({
            filter: fl.value,
        });
        localStorage.setItem('filter_penjualan_report', fl.value);
    }
    HandleChangeStatus(st) {
        this.setState({
            status: st.value,
        });
        localStorage.setItem('status_penjualan_report', st.value);
    }

    toggleModal(e,total,perpage) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        // let range = total*perpage;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formPenjualanExcel"));
        this.props.dispatch(getReportPenjualanExcel(1,this.state.where_data,total));
    }
    handleRePrint(e,id){
        e.preventDefault();
        // this.props.dispatch(rePrintFaktur(id));
    }


    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        const {
            per_page,
            last_page,
            current_page,
            // from,
            // to,
            data,
            // total
        } = this.props.penjualanReport;
        return (
            <Layout page="Penjualan" subpage="Laporan">
                <div className="col-12 box-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-10" style={{zoom:"85%"}}>
                                    <div className="row">
                                        <div className="col-6 col-xs-6 col-md-2">
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
                                        {/* <div className="col-6 col-xs-6 col-md-2">
                                            <div className="form-group">
                                                <label className="control-label font-12">
                                                    Status
                                                </label>
                                                <Select
                                                    options={this.state.status_data}
                                                    // placeholder="Pilih Tipe Kas"
                                                    onChange={this.HandleChangeStatus}
                                                    value={
                                                        this.state.status_data.find(op => {
                                                            return op.value === this.state.status
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div> */}
                                        {/* <div className="col-6 col-xs-6 col-md-2">
                                            <div className="form-group">
                                                <label className="control-label font-12">
                                                    Filter
                                                </label>
                                                <Select
                                                    options={this.state.filter_data}
                                                    // placeholder="Pilih Tipe Kas"
                                                    onChange={this.HandleChangeFilter}
                                                    value={
                                                        this.state.filter_data.find(op => {
                                                            return op.value === this.state.filter
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div> */}
                                        {/* <div className="col-6 col-xs-6 col-md-2">
                                            <div className="form-group">
                                                <label className="control-label font-12">
                                                    Sort
                                                </label>
                                                <Select
                                                    options={this.state.sort_data}
                                                    // placeholder="Pilih Tipe Kas"
                                                    onChange={this.HandleChangeSort}
                                                    value={
                                                        this.state.sort_data.find(op => {
                                                            return op.value === this.state.sort
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div> */}
                                        <div className="col-6 col-xs-6 col-md-2">
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
                                                <button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={(e => this.toggleModal(e,(last_page*per_page),per_page))}>
                                                    <i className="fa fa-print"></i> Export
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div style={{overflowX: "auto"}}>
                                <table className="table table-hover table-bordered">
                                    <thead className="bg-light">
                                    <tr>
                                        <th className="text-black" style={columnStyle} rowSpan="2">No</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">#</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Kode TRX</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Nama lengkap</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Subtotal</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Ongkir</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Grand Total</th>
                                        {/* <th className="text-black" style={columnStyle} rowSpan="2">Layanan Pengiriman</th> */}
                                        <th className="text-black" style={columnStyle} rowSpan="2">Status</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Metode Pembayaran</th>
                                        {/* <th className="text-black" style={columnStyle} rowSpan="2">title</th> */}
                                        <th className="text-black" style={columnStyle} rowSpan="2">Penerima</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">No. Telpon</th>
                                        <th className="text-black" style={columnStyle} rowSpan="2">Resi</th>
                                        {/* <th className="text-black" style={columnStyle} rowSpan="2">valid_resi</th> */}
                                        {/* <th className="text-black" style={columnStyle} rowSpan="2">create_resi</th> */}
                                        <th className="text-black" style={columnStyle} rowSpan="2">Tanggal Diterima</th>
                                    </tr>
                                    </thead>
                                    {
                                        !this.props.isLoadingReport?(
                                            <tbody>
                                            {
                                                (
                                                    typeof data === 'object' ? data.length>0?
                                                        data.map((v,i)=>{
                                                            return(
                                                                <tr key={i}>
                                                                    <td style={columnStyle}> {i+1 + (10 * (parseInt(current_page,10)-1))}</td>

                                                                    <td style={columnStyle}>
                                                                        <div className="btn-group">
                                                                            <UncontrolledButtonDropdown>
                                                                                <DropdownToggle caret>
                                                                                    Aksi
                                                                                </DropdownToggle>
                                                                                <DropdownMenu>
                                                                                    <DropdownItem onClick={(e)=>this.toggle(e,btoa(v.kd_trx),'','')}>Detail</DropdownItem>
                                                                                    {v.resi!=='-'?<DropdownItem onClick={(e)=>this.toggle(e,v.no_faktur_mutasi,'','')}>Cek Resi</DropdownItem>:''}
                                                                                </DropdownMenu>
                                                                                </UncontrolledButtonDropdown>
                                                                        </div>
                                                                    </td>
                                                                    <td style={columnStyle}>{v.kd_trx}</td>
                                                                    <td style={columnStyle}>{v.full_name}</td>
                                                                    <td style={columnStyle}>{toRp(v.subtotal)}</td>
                                                                    <td style={columnStyle}>{toRp(v.ongkir)}</td>
                                                                    <td style={columnStyle}>{toRp(v.grand_total)}</td>
                                                                    {/* <td style={columnStyle}>{v.layanan_pengiriman}</td> */}
                                                                    <td style={columnStyle}>{
                                                                        v.status===0?statusQ('info','Dikirim'):(v.status===1?statusQ('success','Diterima'):"")
                                                                        // v.status===0?statusQ('danger','proses'):(v.status===1?statusQ('warning','packing')?(v.status===2?statusQ('info','dikirim'):statusQ('info','diterima')):""):""
                                                                    }</td>
                                                                    <td style={columnStyle}>{v.metode_pembayaran}</td>
                                                                    {/* <td style={columnStyle}>{v.title}</td> */}
                                                                    <td style={columnStyle}>{v.penerima}</td>
                                                                    <td style={columnStyle}>{v.no_hp}</td>
                                                                    <td style={columnStyle}>{v.resi}</td>
                                                                    {/* <td style={columnStyle}>{v.valid_resi}</td> */}
                                                                    {/* <td style={columnStyle}>{v.create_resi}</td> */}
                                                                    <td style={columnStyle}>{moment(v.tgl_terima).format("DD-MM-YYYY")}</td>
                                                                    {/* <td style={columnStyle}>{moment(v.tgl_mutasi).format("DD-MM-YYYY")}</td>
                                                                    <td style={columnStyle}>{v.lokasi_asal}</td>
                                                                    <td style={columnStyle}>{v.lokasi_tujuan}</td>
                                                                    <td style={columnStyle}>{v.no_faktur_beli}</td>
                                                                    <td style={columnStyle}>{
                                                                        v.status==='0'?statusQ('info','Dikirim'):(v.status==='1'?statusQ('success','Diterima'):"")
                                                                        // v.status===0?statusQ('danger','proses'):(v.status===1?statusQ('warning','packing')?(v.status===2?statusQ('info','dikirim'):statusQ('info','diterima')):""):""
                                                                    }</td>
                                                                    <td style={columnStyle}>{v.keterangan}</td> */}

                                                                </tr>
                                                            )
                                                        })
                                                        : "No data." : "No data."
                                                )
                                            }
                                            </tbody>
                                        ):<Preloader/>
                                    }
                                </table>

                            </div>
                            <div style={{"marginTop":"20px","float":"right"}}>
                                <Paginationq
                                    current_page={current_page}
                                    per_page={per_page}
                                    total={parseInt((per_page*last_page),10)}
                                    callback={this.handlePageChange.bind(this)}
                                />
                            </div>
                            <PenjualanDetail penjualanDetail={this.props.penjualanDetail}/>
                            <PenjualanReportExcel startDate={this.state.startDate} endDate={this.state.endDate} />
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
        penjualanReport:state.penjualanReducer.data_report,
        isLoadingReport:state.penjualanReducer.isLoadingReport,
        penjualanDetail:state.penjualanReducer.data_report_detail,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(PenjualanReport);