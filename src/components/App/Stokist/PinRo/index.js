import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import moment from "moment";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {FetchAvailablePin, FetchPin} from '../../../../redux/actions/pin/pin.action'
// import {toRp} from 'helper'
import Skeleton from 'react-loading-skeleton';
import FormReaktivasi from '../../modals/member/form_reaktivasi';
import FormPinTransfer from '../../modals/member/form_pin_transfer';
import Select from 'react-select';
import FormAktivasiPinRo from '../../modals/member/form_aktivasi_pin_ro';
class PinRo extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.HandleChangeLokasi = this.HandleChangeLokasi.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.HandleChangeSort = this.HandleChangeSort.bind(this);
        this.HandleChangeFilter = this.HandleChangeFilter.bind(this);
        this.HandleChangeStatus = this.HandleChangeStatus.bind(this);
        this.handleReaktivasi = this.handleReaktivasi.bind(this);
        this.handleTransfer = this.handleTransfer.bind(this);
        this.handleAktivasiPinRo = this.handleAktivasiPinRo.bind(this);
        this.state={
            where_data:"",
            pin_data:{},
            pin_reaktivasi:'',
            any:"",
            location:"",
            location_data:[],
            startDate:moment(new Date()).format("yyyy-MM-DD"),
            endDate:moment(new Date()).format("yyyy-MM-DD"),
            sort:"",
            sort_data:[],
            filter:"",
            filter_data:[],
            status:1,
            status_data:[],
        }
    }
    componentWillMount(){
        let page=localStorage.page_pin_ro;
        if(this.props.auth.user.id!==undefined){
            this.handleParameter(page!==undefined&&page!==null?page:1);
        }
    }
    componentDidUpdate(prevState){
        if(prevState.auth.user.id!==this.props.auth.user.id){
            let page=localStorage.page_pin_ro;
            this.handleParameter(page!==undefined&&page!==null?page:1);
        }
    }
    componentDidMount(){
        this.props.dispatch(FetchAvailablePin(1));
        if (localStorage.location_pin_ro !== undefined && localStorage.location_pin_ro !== '') {
            this.setState({location: localStorage.location_pin_ro})
        }
        if (localStorage.any_pin_ro !== undefined && localStorage.any_pin_ro !== '') {
            this.setState({any: localStorage.any_pin_ro})
        }
        if (localStorage.date_from_pin_ro !== undefined && localStorage.date_from_pin_ro !== null) {
            this.setState({startDate: localStorage.date_from_pin_ro})
        }
        if (localStorage.date_to_pin_ro !== undefined && localStorage.date_to_pin_ro !== null) {
            this.setState({endDate: localStorage.date_to_pin_ro})
        }
        if (localStorage.sort_pin_ro !== undefined && localStorage.sort_pin_ro !== null) {
            this.setState({sort: localStorage.sort_pin_ro})
        }
        if (localStorage.filter_pin_ro !== undefined && localStorage.filter_pin_ro !== null) {
            this.setState({filter: localStorage.filter_pin_ro})
        }
        if (localStorage.status_pin_ro !== undefined && localStorage.status_pin_ro !== null) {
            this.setState({status: localStorage.status_pin_ro})
        }
    }
    handlePageChange(pageNumber){
        localStorage.setItem("page_pin_ro",pageNumber);
        this.props.dispatch(FetchPin(pageNumber,this.props.auth.user.id,this.state.where_data,'','ro'))
    }
    toggle(e,code,barcode,name){
        e.preventDefault();
        localStorage.setItem("code",code);
        localStorage.setItem("barcode",barcode);
        localStorage.setItem("name",name);
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("pinDetail"));
        // this.props.dispatch(getPinDetail(code))
    };
    handleReaktivasi(e,data){
        e.preventDefault()
        this.setState({pin_reaktivasi:data})
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormReaktivasi"));
    }
    handleEvent = (event, picker) => {
        const awal = moment(picker.startDate._d).format('YYYY-MM-DD');
        const akhir = moment(picker.endDate._d).format('YYYY-MM-DD');
        localStorage.setItem("date_from_pin_ro",`${awal}`);
        localStorage.setItem("date_to_pin_ro",`${akhir}`);
        this.setState({
            startDate:awal,
            endDate:akhir
        });
    };
    handleSearch(e){
        e.preventDefault();
        localStorage.setItem("any_pin_ro",this.state.any);
        this.handleParameter(1);
    }
    handleParameter(pageNumber){
        // let dateFrom=localStorage.date_from_pin_ro;
        // let dateTo=localStorage.date_to_pin_ro;
        // let kategori = localStorage.kategori_pin_ro;
        // let lokasi = localStorage.location_pin_ro;
        let any = localStorage.any_pin_ro;
        // let sort=localStorage.sort_pin_ro;
        // let filter=localStorage.filter_pin_ro;
        let status=localStorage.status_pin_ro;
        let where='';
        // if(dateFrom!==undefined&&dateFrom!==null){
        //     where+=`&datefrom=${dateFrom}&dateto=${dateTo}`;
        // }
        // if(lokasi!==undefined&&lokasi!==null&&lokasi!==''){
        //     where+=`&lokasi=${lokasi}`;
        // }
        
        if(status!==undefined&&status!==null&&status!==''){
            where+=`&status=${status}`;
        }
        // if(filter!==undefined&&filter!==null&&filter!==''){
        //     if(sort!==undefined&&sort!==null&&sort!==''){
        //         where+=`&sort=${filter}|${sort}`;
        //     }
        // }
        // if(kategori!==undefined&&kategori!==null&&kategori!==''){
        //     where+=`&q=${kategori}`
        // }
        if(any!==undefined&&any!==null&&any!==''){
            where+=`&search=${any}`
        }
        this.setState({
            where_data:where
        })
        this.props.dispatch(FetchPin(pageNumber,this.props.auth.user.id,where,'','ro'))
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
            // {kode:"",value: "Semua"},
            {kode:"0",value: "TELAH DIAKTIVASI"},
            {kode:"1",value: "TERSEDIA"},
            {kode:"3",value: "TERPAKAI"},
            {kode:"4",value: "DI TRANSFER"},
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
        
        localStorage.setItem('status_pin_ro',this.state.status===''&&this.state.status===undefined?status[1].kode:localStorage.status_pin_ro===undefined?this.state.status:localStorage.status_pin_ro)
        localStorage.setItem('sort_pin_ro',this.state.sort===''&&this.state.sort===undefined?sort[0].kode:localStorage.sort_pin_ro)
        localStorage.setItem('filter_pin_ro',this.state.filter===''&&this.state.filter===undefined?filter[0].kode:localStorage.filter_pin_ro)
    }
    HandleChangeLokasi(data) {
        this.setState({
            kategori: data
        })
        localStorage.setItem('kategori_pin_ro', data);
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    HandleChangeSort(sr) {
        this.setState({
            sort: sr.value,
        });
        localStorage.setItem('sort_pin_ro', sr.value);
    }
    HandleChangeFilter(fl) {
        this.setState({
            filter: fl.value,
        });
        localStorage.setItem('filter_pin_ro', fl.value);
    }
    HandleChangeStatus(st) {
        this.setState({
            status: st.value,
        });
        localStorage.setItem('status_pin_ro', st.value);
    }
    handleModal(e){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormReaktivasi"));
    }
    handleTransfer(e,v){
        this.setState({pin_data:v})
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormPinTransfer"));
    }
    handleAktivasiPinRo(e,v){
        this.setState({pin_data:v})
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormAktivasiRo"));
    }
    render(){
        const {
            per_page,
            last_page,
            current_page,
            data
        } = this.props.pinPin;
        return (
            <Layout page="PIN RO" subpage="Stokist">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-content justify-content-between">
                                    <div className="row">
                                        <div className="col-md-6">
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
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Cari</label>
                                                <div class="input-group">
                                                    <input className="form-control" type="text" style={{padding: '9px',fontWeight:'bolder'}} name="any" value={this.state.any} onChange={(e) => this.handleChange(e)}/>
                                                    <div class="input-group-append">
                                                        <button className="btn btn-primary" onClick={this.handleSearch}>
                                                            <i className="fa fa-search"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-3">
                                        {/* <div className="form-group">
                                            <button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={(e)=>this.handleModal(e)}>
                                                <i className="fa fa-check"/>&nbsp;Reaktivasi
                                            </button>
                                        </div> */}
                                        <h5>PIN Yang Anda Miliki : {this.props.getPin.total_pin} PIN</h5>
                                    </div>
                                </div>
                                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                                    <Masonry>
                                        {
                                            !this.props.isLoading?(
                                                (
                                                    typeof data === 'object' ? data.length>0?
                                                        data.map((v,i)=>{
                                                            return(
                                                                <div className="card widget-new-content p-3 mr-2 mb-2 bg-white">
                                                                    <div className="widget---stats d-flex align-items-center justify-content-between mb-15">
                                                                        <div className="widget---content-text">
                                                                        <h6 className="text-uppercase">{v.kode}</h6>
                                                                            <div className="d-flex align-items-center justify-content-start">
                                                                                <i className={`fa fa-circle text-success font-11 mr-2`}/>&nbsp;<p className="mb-0">{v.status}</p>
                                                                            </div>
                                                                        </div>
                                                                        {/* <h6 className="mb-0 text-success">&nbsp;</h6> */}
                                                                        {/* <h6 className="mb-0 text-success">PV : {v.point_volume}</h6> */}
                                                                    </div>
                                                                    <div className="progress h-5">
                                                                        <div className="progress-bar w-100 bg-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                                                    </div>
                                                                    <div className="d-flex align-items-center justify-content-between">
                                                                        <div>
                                                                            {/* {v.status===0?statusQ('info','Tidak Terdsedia'):(v.status===1?statusQ('success','Tersedia'):(v.status===3?statusQ('success','Selesai'):""))} */}
                                                                            &nbsp;<button className="btn btn-info btn-sm btn-status" style={{fontSize: 8}} onClick={(e)=>this.handleAktivasiPinRo(e,v)}>Aktivasi</button>
                                                                            &nbsp;<button className="btn btn-primary btn-sm btn-status" style={{fontSize: 8}} onClick={(e)=>this.handleTransfer(e,v)}>Transfer</button>
                                                                        </div>
                                                                        <p className="mt-3 font-11">PIN RO</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        : "No data." : "No data."
                                                )
                                            ):(() => {
                                                    const rows = [];
                                                    for (let i = 0; i < 9; i++) {
                                                        rows.push(
                                                            <div className="card widget-new-content p-3 mr-2 mb-2 bg-white">
                                                                <div className="widget---stats d-flex align-items-center justify-content-between mb-15">
                                                                    <div className="widget---content-text">
                                                                    <h6><Skeleton width="90px"/></h6>
                                                                    <p className="mb-0"><Skeleton width="90px"/></p>
                                                                    </div>
                                                                    <h6 className="mb-0 text-success"><Skeleton width="80px"/></h6>
                                                                </div>
                                                                <div className="progress h-5">
                                                                    <div className="progress-bar w-100 bg-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                                                </div>
                                                                <div className="d-flex align-items-center justify-content-between pt-2">
                                                                    <div>
                                                                        {/* <Skeleton width="50px" height="25px"/>
                                                                        &nbsp;<Skeleton width="50px" height="25px"/> */}
                                                                        &nbsp;<Skeleton width="50px" height="25px"/>
                                                                    </div>
                                                                    <Skeleton width="80px"/>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    return rows;
                                                })()
                                        }
                                    </Masonry>
                                </ResponsiveMasonry>
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
                </div>
                <FormReaktivasi availPin={this.props.getPin} directPin={undefined}/>
                <FormPinTransfer data={this.state.pin_data}/>
                <FormAktivasiPinRo data={this.state.pin_data}/>
            </Layout>
            );
    }
}

const mapStateToProps = (state) => {
    console.log("state.pinReducer",state.pinReducer)
    return {
        auth:state.auth,
        pinPin:state.pinReducer.data,
        getPin:state.pinReducer.data_available,
        isLoading:state.pinReducer.isLoading,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(PinRo);