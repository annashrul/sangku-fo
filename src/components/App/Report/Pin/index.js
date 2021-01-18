import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import moment from "moment";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {FetchPin} from '../../../../redux/actions/pin/pin.action'
import {toRp, statusQ} from 'helper'
import Skeleton from 'react-loading-skeleton';
class Pin extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.HandleChangeLokasi = this.HandleChangeLokasi.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.HandleChangeSort = this.HandleChangeSort.bind(this);
        this.HandleChangeFilter = this.HandleChangeFilter.bind(this);
        this.HandleChangeStatus = this.HandleChangeStatus.bind(this);
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
        let page=localStorage.page_pin;
        this.handleParameter(page!==undefined&&page!==null?page:1);
    }
    componentDidMount(){
        if (localStorage.location_pin !== undefined && localStorage.location_pin !== '') {
            this.setState({location: localStorage.location_pin})
        }
        if (localStorage.any_pin !== undefined && localStorage.any_pin !== '') {
            this.setState({any: localStorage.any_pin})
        }
        if (localStorage.date_from_pin !== undefined && localStorage.date_from_pin !== null) {
            this.setState({startDate: localStorage.date_from_pin})
        }
        if (localStorage.date_to_pin !== undefined && localStorage.date_to_pin !== null) {
            this.setState({endDate: localStorage.date_to_pin})
        }
        if (localStorage.sort_pin !== undefined && localStorage.sort_pin !== null) {
            this.setState({sort: localStorage.sort_pin})
        }
        if (localStorage.filter_pin !== undefined && localStorage.filter_pin !== null) {
            this.setState({filter: localStorage.filter_pin})
        }
        if (localStorage.status_pin !== undefined && localStorage.status_pin !== null) {
            this.setState({status: localStorage.status_pin})
        }
    }
    handlePageChange(pageNumber){
        localStorage.setItem("page_pin",pageNumber);
        this.props.dispatch(FetchPin(pageNumber))
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
    handleEvent = (event, picker) => {
        const awal = moment(picker.startDate._d).format('YYYY-MM-DD');
        const akhir = moment(picker.endDate._d).format('YYYY-MM-DD');
        localStorage.setItem("date_from_pin",`${awal}`);
        localStorage.setItem("date_to_pin",`${akhir}`);
        this.setState({
            startDate:awal,
            endDate:akhir
        });
    };
    handleSearch(e){
        e.preventDefault();
        localStorage.setItem("any_pin",this.state.any);
        this.handleParameter(1);
    }
    handleParameter(pageNumber){
        // let dateFrom=localStorage.date_from_pin;
        // let dateTo=localStorage.date_to_pin;
        let kategori = localStorage.kategori_pin;
        // let lokasi = localStorage.location_pin;
        let any = localStorage.any_pin;
        // let sort=localStorage.sort_pin;
        // let filter=localStorage.filter_pin;
        // let status=localStorage.status_pin;
        let where='';
        // if(dateFrom!==undefined&&dateFrom!==null){
        //     where+=`&datefrom=${dateFrom}&dateto=${dateTo}`;
        // }
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
        if(kategori!==undefined&&kategori!==null&&kategori!==''){
            where+=`&q=${kategori}`
        }
        if(any!==undefined&&any!==null&&any!==''){
            where+=`&q=${any}`
        }
        this.setState({
            where_data:where
        })
        this.props.dispatch(FetchPin(pageNumber,where))
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
        
        localStorage.setItem('status_pin',this.state.status===''||this.state.status===undefined?status[0].kode:localStorage.status_pin)
        localStorage.setItem('sort_pin',this.state.sort===''||this.state.sort===undefined?sort[0].kode:localStorage.sort_pin)
        localStorage.setItem('filter_pin',this.state.filter===''||this.state.filter===undefined?filter[0].kode:localStorage.filter_pin)
    }
    HandleChangeLokasi(data) {
        this.setState({
            kategori: data
        })
        localStorage.setItem('kategori_pin', data);
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    HandleChangeSort(sr) {
        this.setState({
            sort: sr.value,
        });
        localStorage.setItem('sort_pin', sr.value);
    }
    HandleChangeFilter(fl) {
        this.setState({
            filter: fl.value,
        });
        localStorage.setItem('filter_pin', fl.value);
    }
    HandleChangeStatus(st) {
        this.setState({
            status: st.value,
        });
        localStorage.setItem('status_pin', st.value);
    }
    render(){
        const {
            per_page,
            last_page,
            current_page,
            data
        } = this.props.pinPin;
        return (
            <Layout page="Pin">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12" style={{zoom:"100%"}}>
                                        <div className="row">
                                            <div className="col-6 col-xs-6 col-md-4">
                                                <div className="form-group">
                                                    <label>Cari</label>
                                                    <input className="form-control" type="text" style={{padding: '9px',fontWeight:'bolder'}} name="any" value={this.state.any} onChange={(e) => this.handleChange(e)}/>
                                                </div>
                                            </div>
                                            <div className="col-6 col-xs-6 col-md-2">
                                                <div className="form-group">
                                                    <button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={this.handleSearch}>
                                                        <i className="fa fa-search"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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
                                                                        <h6>{v.paket_title}</h6>
                                                                        <p className="mb-0">{v.kode}</p>
                                                                        </div>
                                                                        <h6 className="mb-0 text-success">{toRp(v.harga)}</h6>
                                                                    </div>
                                                                    <div className="progress h-5">
                                                                        <div className="progress-bar w-100 bg-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                                                    </div>
                                                                    <div className="d-flex align-items-center justify-content-between">
                                                                        {v.status===0?statusQ('info','Dikirim'):(v.status===1?statusQ('success','Diterima'):(v.status===3?statusQ('success','Selesai'):""))}
                                                                        <p className="mt-2 font-11">Pemilik : <span>{v.pemilik}</span></p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        : "No data." : "No data."
                                                )
                                            ):(() => {
                                                    const rows = [];
                                                    for (let i = 0; i < 10; i++) {
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
                                                                <div className="d-flex align-items-center justify-content-between">
                                                                    <Skeleton width="70px" height="20px"/>
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
            </Layout>
            );
    }
}

const mapStateToProps = (state) => {
    console.log("state.pinReducer",state.pinReducer)
    return {
        auth:state.auth,
        pinPin:state.pinReducer.data,
        isLoading:state.pinReducer.isLoading,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(Pin);