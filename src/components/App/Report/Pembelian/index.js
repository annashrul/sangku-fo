import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import PembelianDetail from "components/App/modals/report/pembelian/pembelian_detail";
import PembelianCekResi from "components/App/modals/report/pembelian/pembelian_cek_resi";
import PembelianReportExcel from "components/App/modals/report/pembelian/pembelian_form_excel";
import moment from "moment";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {rangeDate} from "helper";
import { getReportPembelian} from '../../../../redux/actions/transaction/pembelian.action';
import { trxDone } from 'redux/actions/product/kurir.action';
import Swal from 'sweetalert2';
import Skeleton from './src/skeleton';
import Cards from './src/cards';
import {postCart} from "redux/actions/product/cart.action";
import { NOTIF_ALERT } from 'redux/actions/_constants';

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
        this.handleToggleDetail = this.handleToggleDetail.bind(this);
        this.handleCart = this.handleCart.bind(this);
        this.toggleResi=this.toggleResi.bind(this)
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

    componentWillUnmount(){
        localStorage.removeItem("modalResi");
        localStorage.removeItem("modalDetail");
        localStorage.removeItem("modalExportReport");
        localStorage.removeItem("code");
        localStorage.removeItem("barcode");
        localStorage.removeItem("name");
        localStorage.removeItem("any_pembelian_report");
        localStorage.removeItem("location_pembelian_report");
        localStorage.removeItem("sort_pembelian_report");
        localStorage.removeItem("filter_pembelian_report");
        localStorage.removeItem("status_pembelian_report");
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

    toggleResi(e,resi){
        e.preventDefault();
        // JP3738533084
        if(resi!=='-'){
            localStorage.setItem("modalResi","true");
            this.setState({
                detail:{resi:resi,kurir:'jnt',kd_trx:''}
            });
            const bool = !this.props.isOpen;
            this.props.dispatch(ModalToggle(bool));
            this.props.dispatch(ModalType("pembelianCekResi"));
        }
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
        let any = localStorage.any_pembelian_report;
        let where='';
        if(dateFrom!==undefined&&dateFrom!==null){
            where+=`&datefrom=${dateFrom}&dateto=${dateTo}`;
        }
        if(any!==undefined&&any!==null&&any!==''){
            where+=`&q=${any}`
        }
        this.setState({
            where_data:where
        })
        this.props.dispatch(getReportPembelian(pageNumber,where))
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
    }
    
    handleToggleDetail(i,id){
        this.setState({
            idDetail:id,
            isShowDetail:!this.state.isShowDetail
        })
    }

    handleCart(e,i,id,type){
        e.preventDefault();
        this.setState({
            idx:i,
        });
        let data={
            "id_paket":id,
            "qty":1,
            "type":"plus",
        };
        this.props.dispatch(postCart(data,type));

    }

    render(){

        const {
            per_page,
            last_page,
            current_page,
            data,
        } = this.props.pembelianReport;
        return (
            <Layout page="Pembelian" subpage="Laporan" >
                <div className="card" style={{borderRadius:"10px"}}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-10" style={{zoom:"85%"}}>
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
                                            <label>Cari</label>
                                            <div className="input-group">
                                                {/* <input type="text" name="any_deposit_report" class="form-control" value=""> */}
                                                <input className="form-control" type="text" style={{padding: '9px',fontWeight:'bolder'}} name="any" value={this.state.any} onChange={(e) => this.handleChange(e)}/>
                                                <div className="input-group-prepend">
                                                    <button className="btn btn-primary" onCLick={(e)=>this.handleSearch(e)}><i className="fa fa-search"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                {
                    !this.props.isLoadingReport? typeof data==='object'?data.length>0?
                    <Cards 
                        data={data}
                        handleCart={this.handleCart}
                        idx={this.state.idx}
                        isLoadingPost={this.props.isLoadingPost}
                        toggle={this.toggle}
                        toggleResi={this.toggleResi}
                        handleToggleDetail={this.handleToggleDetail}
                        idDetail={this.state.idDetail}
                        isShowDetail={this.state.isShowDetail}
                    />: 
                    <div style={{textAlign:'center'}}><img src={NOTIF_ALERT.NO_DATA} alt="sangqu"/></div>: 
                    <div style={{textAlign:'center'}}><img src={NOTIF_ALERT.NO_DATA} alt="sangqu"/></div>:
                    <Skeleton/>
                }

                <div className="card" style={{marginTop:"10px"}}>
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