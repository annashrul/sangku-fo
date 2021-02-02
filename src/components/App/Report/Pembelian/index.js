import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
// import {FetchPembelian,FetchPembelianExcel, FetchPembelianData,rePrintFaktur} from "redux/actions/inventory/pembelian.action";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import PembelianDetail from "components/App/modals/report/pembelian/pembelian_detail";
import PembelianCekResi from "components/App/modals/report/pembelian/pembelian_cek_resi";
import PembelianReportExcel from "components/App/modals/report/pembelian/pembelian_form_excel";
// import Select from 'react-select';
import moment from "moment";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {rangeDate} from "helper";
import Preloader from "Preloader";
import {statusQ, toRp} from "helper";
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { getReportPembelian, getReportPembelianDetail, getReportPembelianExcel } from '../../../../redux/actions/transaction/pembelian.action';
import { cekResi, trxDone } from '../../../../redux/actions/product/kurir.action';
import Swal from 'sweetalert2';
import {noImage, toCurrency} from "../../../../helper";
import Skeleton from 'react-loading-skeleton';
import {postCart} from "../../../../redux/actions/product/cart.action";

class PembelianReport extends Component{
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
        this.handleToggleDetail = this.handleToggleDetail.bind(this);
        this.state={
            detail:{},
            detailReport:{},
            detaiDataReport:{},
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
            lengthDetail:1,
            idDetail:'',
            isShowDetail:false,
            dataDetail:[],
            idx:''
        }
    }
    componentWillMount(){
        localStorage.removeItem("modalResi");
        localStorage.removeItem("modalDetail");
        localStorage.removeItem("modalExportReport");
        let page=localStorage.page_pembelian_report;
        this.handleParameter(page!==undefined&&page!==null?page:1);
    }
    componentDidMount(){
        localStorage.removeItem("modalResi");
        localStorage.removeItem("modalDetail");
        localStorage.removeItem("modalExportReport");


        if (localStorage.location_pembelian_report !== undefined && localStorage.location_pembelian_report !== '') {
            this.setState({location: localStorage.location_pembelian_report})
        }
        if (localStorage.any_pembelian_report !== undefined && localStorage.any_pembelian_report !== '') {
            this.setState({any: localStorage.any_pembelian_report})
        }
        if (localStorage.date_from_pembelian_report !== undefined && localStorage.date_from_pembelian_report !== null) {
            this.setState({startDate: localStorage.date_from_pembelian_report})
        }
        if (localStorage.date_to_pembelian_report !== undefined && localStorage.date_to_pembelian_report !== null) {
            this.setState({endDate: localStorage.date_to_pembelian_report})
        }
        if (localStorage.sort_pembelian_report !== undefined && localStorage.sort_pembelian_report !== null) {
            this.setState({sort: localStorage.sort_pembelian_report})
        }
        if (localStorage.filter_pembelian_report !== undefined && localStorage.filter_pembelian_report !== null) {
            this.setState({filter: localStorage.filter_pembelian_report})
        }
        if (localStorage.status_pembelian_report !== undefined && localStorage.status_pembelian_report !== null) {
            this.setState({status: localStorage.status_pembelian_report})
        }
    }
    handlePageChange(pageNumber){
        localStorage.setItem("page_pembelian_report",pageNumber);
        this.props.dispatch(getReportPembelian(pageNumber))
    }
    toggle(e,code,barcode,name){
        e.preventDefault();
        this.setState({
            detaiDataReport:{code:code}
        });
        localStorage.setItem("modalDetail","true");
        localStorage.setItem("code",code);
        localStorage.setItem("barcode",barcode);
        localStorage.setItem("name",name);
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("pembelianDetail"));
        // this.props.dispatch(getReportPembelianDetail(code))
    };
    toggleResi(e,data){
        e.preventDefault();
        localStorage.setItem("modalResi","true");
        // let param = {};
        // param['resi'] = 'JP3738533084';
        // param['kurir'] = 'jnt';
        console.log("DATA RESI",data);
        this.setState({
            detail:{resi:'JP3738533084',kurir:'jnt',kd_trx:''}
            // detail:{resi:data.resi,kurir:data.kurir,kd_trx:data.kd_trx}
        });
        // console.log(param);
        // param['resi'] = data.resi;
        // param['kurir'] = String(data.layanan_pengiriman).split('|')[0];
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("pembelianCekResi"));

        // this.props.dispatch(cekResi(param))
    };
    handleDone(e,kd_trx){
        e.preventDefault();
        Swal.fire({
            title: 'Anda akan menyelesaikan pesanan ini?',
            text: "Pastikan anda telah menerima pesanan tersebut!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sudah saya terima',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(trxDone(btoa(kd_trx)))
            }
        })
    };
    handleEvent = (event, picker) => {
        const awal = moment(picker.startDate._d).format('YYYY-MM-DD');
        const akhir = moment(picker.endDate._d).format('YYYY-MM-DD');
        localStorage.setItem("date_from_pembelian_report",`${awal}`);
        localStorage.setItem("date_to_pembelian_report",`${akhir}`);
        this.setState({
            startDate:awal,
            endDate:akhir
        });
    };
    handleSearch(e){
        e.preventDefault();
        localStorage.setItem("any_pembelian_report",this.state.any);
        this.handleParameter(1);
    }
    handleParameter(pageNumber){
        let dateFrom=localStorage.date_from_pembelian_report;
        let dateTo=localStorage.date_to_pembelian_report;
        // let lokasi = localStorage.location_pembelian_report;
        let any = localStorage.any_pembelian_report;
        // let sort=localStorage.sort_pembelian_report;
        // let filter=localStorage.filter_pembelian_report;
        // let status=localStorage.status_pembelian_report;
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
        this.props.dispatch(getReportPembelian(pageNumber,where))
        // this.props.dispatch(FetchPembelianExcel(pageNumber,where))
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
        
        localStorage.setItem('status_pembelian_report',this.state.status===''||this.state.status===undefined?status[0].kode:localStorage.status_pembelian_report)
        localStorage.setItem('sort_pembelian_report',this.state.sort===''||this.state.sort===undefined?sort[0].kode:localStorage.sort_pembelian_report)
        localStorage.setItem('filter_pembelian_report',this.state.filter===''||this.state.filter===undefined?filter[0].kode:localStorage.filter_pembelian_report)
    }
    HandleChangeLokasi(lk) {
        this.setState({
            location: lk.value
        })
        localStorage.setItem('location_pembelian_report', lk.value);
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }
    HandleChangeSort(sr) {
        this.setState({
            sort: sr.value,
        });
        localStorage.setItem('sort_pembelian_report', sr.value);
    }
    HandleChangeFilter(fl) {
        this.setState({
            filter: fl.value,
        });
        localStorage.setItem('filter_pembelian_report', fl.value);
    }
    HandleChangeStatus(st) {
        this.setState({
            status: st.value,
        });
        localStorage.setItem('status_pembelian_report', st.value);
    }
    toggleModal(e,total,perpage) {
        localStorage.setItem("modalExportReport","true");
        e.preventDefault();
        console.log(total);
        this.setState({
            detailReport:{perpage:total}
        })
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formPembelianExcel"));
        // this.props.dispatch(getReportPembelianExcel(1,this.state.where_data,total));
        // this.props.dispatch(getReportPembelianExcel('page=1'));
    }
    handleRePrint(e,id){
        e.preventDefault();
        // this.props.dispatch(rePrintFaktur(id));
    }
    handleToggleDetail(i,id){
        // localStorage.setItem("modalDetail","true");
        console.log(i);
        // this.state.dataDetail[i]
        this.setState({
            idDetail:id,
            isShowDetail:!this.state.isShowDetail
        })
    }
    handleCart(e,i,id){
        e.preventDefault();
        this.setState({
            idx:i,
        });
        let data={
            "id_paket":id,
            "qty":1
        };
        if(localStorage.productType===undefined){
            this.props.dispatch(postCart(data,'a'));
        }else{
            if(localStorage.productType!=='a'){
                Swal.fire({
                    title: 'Perhatian !!!',
                    html: `Terdapat barang RO didalam keranjang.. <br/>anda yakin akan menghapus barang RO dan melanjutkan transaksi ???`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: `Ya, hapus & lanjutkan`,
                    cancelButtonText: 'Batal',
                }).then((result) => {
                    if (result.value) {
                        this.props.dispatch(postCart(data,'a'));

                    }
                })
            }else{
                this.props.dispatch(postCart(data,'a'));
            }
        }


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
        } = this.props.pembelianReport;
        let dataID=[];
        return (
            <Layout page="Pembelian" subpage="Laporan" >
                <div className="card" style={{borderRadius:"10px"}}>
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

                                    <div className="col-6 col-xs-6 col-md-2">
                                        <div className="form-group">
                                            <label>Cari</label>
                                            <input className="form-control" type="text" style={{padding: '9px',fontWeight:'bolder'}} name="any" value={this.state.any} onChange={(e) => this.handleChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="col-6 col-xs-6 col-md-2" style={{zoom:"85%",textAlign:"right"}}>*/}
                                {/*<div className="row">*/}
                                    {/*<div className="col-md-12">*/}
                                        {/*<div className="form-group">*/}
                                            {/*<button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={this.handleSearch}>*/}
                                                {/*<i className="fa fa-search"/>*/}
                                            {/*</button>*/}
                                            {/*<button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={(e => this.toggleModal(e,(last_page*per_page),per_page))}>*/}
                                                {/*<i className="fa fa-print"/> Export*/}
                                            {/*</button>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}

                            {/*</div>*/}

                        </div>
                    </div>
                </div>
                <br/>
                {
                    !this.props.isLoadingReport? typeof data==='object'?data.length>0?data.map((v,i)=>{
                        let status='';
                        if(v.status===0){
                            status=<span className={"btn btn-secondary btn-sm bold text-white"}>Menunggu Pembayaran</span>;
                        }else if(v.status===1){
                            status=<span className={"btn btn-warning btn-sm bold text-white"}>Dikemas</span>;

                        }else if(v.status===2){
                            status=<span className={"btn btn-info btn-sm bold"}>Dikirim</span>;

                        }else if(v.status===3){
                            status=<span className={"btn btn-success btn-sm bold"}>Selesai</span>;

                        }else if(v.status===4){
                            status=<span className={"btn btn-danger btn-sm bold"}>Dibatalkan</span>;
                        }
                        return(
                            <div key={i} className="card" style={{borderRadius:"10px",marginBottom:"10px"}}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button className={"btn btn-secondary btn-sm"} style={{borderRadius:"10%"}}>
                                                {v.type===0?'AKTIVASI':'RO'}
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <span className={"black"} style={{fontWeight:"normal",float:"right",textAlign:"right"}}>{v.resi}</span>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-2" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                            <p style={{color:"rgb(66, 181, 73)",fontWeight:"bold"}}>( {v.kd_trx} )<br/>
                                                <span className={"black"} style={{fontWeight:"normal"}}>{moment(v.created_at).format('LL')}</span><br/>
                                            </p>
                                        </div>
                                        <div className="col-md-3" style={{verticalAlign:"left",borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                            <p className={"black"}>Status<br/>
                                                {status}
                                            </p>
                                        </div>
                                        <div className="col-md-2" style={{verticalAlign:"left",borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                            <p className={"black"}>Total Belanja<br/>
                                                <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}>Rp {toCurrency(v.grand_total)} .-</span>
                                            </p>
                                        </div>
                                        <div className="col-md-5" style={{verticalAlign:"left"}}>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <p className={"black"}>Ongkir<br/>
                                                        <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}>Rp {v.ongkir==='0'?0:toCurrency(v.ongkir)} .-</span>
                                                    </p>
                                                </div>
                                                <div className="col-md-2" style={{display:'flex',justifyContent:'center'}} >
                                                    <img src={v.kurir} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} style={{height:"50px",objectFit:'contain'}}/>
                                                </div>
                                                <div className="col-md-4">
                                                    <p className={"black"}>Layanan<br/>
                                                        <span className={"bold"}>{v.layanan_pengiriman.split("|")[1]}</span>
                                                    </p>
                                                </div>
                                                <div className="col-md-3">
                                                    <p className={"black"}>Metode<br/>
                                                        <span className={"bold"}>{v.metode_pembayaran}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    {
                                        (() => {
                                            const rows = [];
                                            let no=0;
                                            for (let val = 0; val < v.detail.length; val++) {
                                                console.log(v.detail[val]);
                                                // no=key++;
                                                let cardDisplay='none';
                                                let cardTransition='opacity 1s ease-out';
                                                let cardOpacity=0;
                                                if(val===0){
                                                    cardDisplay='block';
                                                    cardOpacity=1;
                                                }else if(this.state.idDetail===v.id&&this.state.isShowDetail){
                                                    cardDisplay='block';
                                                    cardOpacity=1;
                                                }
                                                dataID.push(val);
                                                rows.push(
                                                    <div className="row" key={val} style={{marginBottom:"10px",transition:cardTransition,opacity:cardOpacity}}>
                                                        <div className="col-md-12" style={{display:cardDisplay}}>
                                                            <div className="row">
                                                                <div className="col-md-6" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                                    <div className="media">
                                                                        <img src={v.detail[val].foto} className="mr-3 media-thumb" alt="..."/>
                                                                        <div className="media-body">
                                                                            <h5 style={{color:"rgb(66, 181, 73)"}} className="mt-0 font-17 bold">{v.detail[val].paket}</h5>
                                                                            <span style={{color:"rgb(250, 89, 29)",fontWeight:"bold"}}>Rp {toCurrency(v.detail[val].price)} .- <small style={{marginLeft:"10px"}} className={"black"}>{v.detail[val].qty} Item </small></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <p style={{float:"left"}} className={"black"}>Total Harga<br/>
                                                                        <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}>Rp {toCurrency(parseInt(v.detail[val].price)*parseInt(v.detail[val].qty))} .-</span>
                                                                    </p>
                                                                </div>
                                                                <div className="col-md-3" style={{position:"relative",verticalAlign:"left"}}>
                                                                    <button onClick={(event)=>this.handleCart(event,`PAKET-${i}-${val}`,v.detail[val].id_paket)} style={{right:"12px",bottom:"0px",position:"absolute",float:"right",borderRadius:"10px",backgroundColor:"rgb(66, 181, 73)",border:"1px solid rgb(66, 181, 73)"}} className={"btn btn-primary"}>
                                                                        {
                                                                            this.state.idx===`PAKET-${i}-${val}`?this.props.isLoadingPost?(
                                                                                <div className="spinner-border text-white" role="status">
                                                                                    <span className="sr-only">Loading...</span>
                                                                                </div>
                                                                            ):'Beli Lagi':'Beli Lagi'
                                                                        }
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return rows;
                                        })()

                                    }
                                    <hr/>
                                    <div className="row">
                                        <div onClick={(e)=>this.toggle(e,btoa(v.kd_trx),'','')} className="col-md-2" style={{cursor:"pointer",color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}>
                                            <i className={"fa fa-eye"} style={{color:'rgba(49, 53, 59, 0.68)'}}/> Lihat Detail Pesanan
                                        </div>
                                        <div onClick={(e)=>this.toggleResi(e,v)} className="col-md-2" style={{cursor:"pointer",color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}>
                                            <i className={"fa fa-random"} style={{color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}/> Lacak Resi
                                        </div>
                                        <div className="col-md-8" onClick={event => this.handleToggleDetail(dataID,v.id)} style={{display:v.detail.length>1?"block":"none",cursor:"pointer",color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}>
                                            <span style={{float:"right"}}>
                                                {this.state.idDetail===v.id&&this.state.isShowDetail?'Tutup':'Buka'} {v.detail.length-1} Produk Lainnya <i className={`fa ${this.state.idDetail===v.id&&this.state.isShowDetail?'fa-angle-up':'fa-angle-down'}`} style={{color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}/>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    }):"No Data.":"No Data.":(() => {
                        const rows = [];
                        for (let i = 0; i < 2; i++) {
                            rows.push(
                                <div key={i} className="card" style={{borderRadius:"10px",marginBottom:"10px"}}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-3" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                <p style={{color:"rgb(66, 181, 73)",fontWeight:"bold"}}><Skeleton width={'50%'}/><br/>
                                                    <span className={"black"} style={{fontWeight:"normal"}}><Skeleton/></span><br/>

                                                </p>
                                            </div>
                                            <div className="col-md-2" style={{verticalAlign:"left",borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                    <span className={"bold"}><Skeleton/></span>
                                                </p>
                                            </div>
                                            <div className="col-md-2" style={{verticalAlign:"left",borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                    <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                </p>
                                            </div>
                                            <div className="col-md-5" style={{verticalAlign:"left"}}>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                            <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                            <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                            <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                            <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-6" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                <div className="media">
                                                    <Skeleton height={70} width={70}/>
                                                    <div className="media-body" style={{marginLeft:"10px"}}>
                                                        <span style={{color:"rgb(250, 89, 29)"}}><Skeleton width={'100%'}/></span><br/>
                                                        <span style={{color:"rgb(250, 89, 29)"}}><Skeleton width={'50%'}/></span><br/>
                                                        <span style={{color:"rgb(250, 89, 29)"}}><Skeleton width={'30%'}/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                    <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return rows;
                    })()
                }

                <div style={{"marginTop":"20px","float":"right"}}>
                    <Paginationq
                        current_page={current_page}
                        per_page={per_page}
                        total={parseInt((per_page*last_page),10)}
                        callback={this.handlePageChange.bind(this)}
                    />
                </div>
                {
                    localStorage.modalDetail==="true"? <PembelianDetail detail={this.state.detaiDataReport}/>:null
                }
                {
                    localStorage.modalResi==='true'?<PembelianCekResi detailResi={this.state.detail}/>:null
                }
                {
                    localStorage.modalExportReport==='true'?<PembelianReportExcel startDate={this.state.startDate} endDate={this.state.endDate} />:null
                }

            </Layout>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        pembelianReport:state.pembelianReducer.data_report,
        isLoadingReport:state.pembelianReducer.isLoadingReport,
        // pembelianDetail:state.pembelianReducer.data_report_detail,
        // pembelianCekResi:state.kurirReducer.data_resi,
        // isLoadingResi:state.kurirReducer.isLoading,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isLoadingPost:state.cartReducer.isLoadingPost

    }
}
export default connect(mapStateToProps)(PembelianReport);