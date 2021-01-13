import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import moment from "moment";
import {rangeDate} from "helper";
import Preloader from "Preloader";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { getBerita, getBeritaDetail, getBeritaKategori } from '../../../../redux/actions/konten/berita.action';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
class Berita extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.HandleChangeLokasi = this.HandleChangeLokasi.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.HandleChangeSort = this.HandleChangeSort.bind(this);
        this.HandleChangeFilter = this.HandleChangeFilter.bind(this);
        this.HandleChangeStatus = this.HandleChangeStatus.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
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
        let page=localStorage.page_berita;
        this.handleParameter(page!==undefined&&page!==null?page:1);
    }
    componentDidMount(){
        if (localStorage.location_berita !== undefined && localStorage.location_berita !== '') {
            this.setState({location: localStorage.location_berita})
        }
        if (localStorage.any_berita !== undefined && localStorage.any_berita !== '') {
            this.setState({any: localStorage.any_berita})
        }
        if (localStorage.date_from_berita !== undefined && localStorage.date_from_berita !== null) {
            this.setState({startDate: localStorage.date_from_berita})
        }
        if (localStorage.date_to_berita !== undefined && localStorage.date_to_berita !== null) {
            this.setState({endDate: localStorage.date_to_berita})
        }
        if (localStorage.sort_berita !== undefined && localStorage.sort_berita !== null) {
            this.setState({sort: localStorage.sort_berita})
        }
        if (localStorage.filter_berita !== undefined && localStorage.filter_berita !== null) {
            this.setState({filter: localStorage.filter_berita})
        }
        if (localStorage.status_berita !== undefined && localStorage.status_berita !== null) {
            this.setState({status: localStorage.status_berita})
        }
    }
    handlePageChange(pageNumber){
        localStorage.setItem("page_berita",pageNumber);
        this.props.dispatch(getBerita(pageNumber))
    }
    toggle(e,code,barcode,name){
        e.preventDefault();
        localStorage.setItem("code",code);
        localStorage.setItem("barcode",barcode);
        localStorage.setItem("name",name);
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("beritaDetail"));
        this.props.dispatch(getBeritaDetail(code))
    };
    handleEvent = (event, picker) => {
        const awal = moment(picker.startDate._d).format('YYYY-MM-DD');
        const akhir = moment(picker.endDate._d).format('YYYY-MM-DD');
        localStorage.setItem("date_from_berita",`${awal}`);
        localStorage.setItem("date_to_berita",`${akhir}`);
        this.setState({
            startDate:awal,
            endDate:akhir
        });
    };
    handleSearch(e){
        e.preventDefault();
        localStorage.setItem("any_berita",this.state.any);
        this.handleParameter(1);
    }
    handleLoadMore(){
        // this.setState({
        //     isScroll:true
        // });

        let perpage = parseInt(this.props.beritaKategori.per_page,10);
        let lengthBrg = parseInt(this.props.beritaKategori.total,10);
        if(perpage===lengthBrg || perpage<lengthBrg){
            let where = '';
            if(perpage!==undefined&&perpage!==null&&perpage!==''){
                where+=`&perpage=${perpage+10}`
            }
            this.props.dispatch(getBeritaKategori(1, where));
            // this.setState({scrollPage:this.state.scrollPage+5});
        }
        else{
            Swal.fire({allowOutsideClick: false,
                title: 'Perhatian',
                icon: 'warning',
                text: 'Tidak ada data.',
            });
        }
    }
    handleParameter(pageNumber){
        // let dateFrom=localStorage.date_from_berita;
        // let dateTo=localStorage.date_to_berita;
        let kategori = localStorage.kategori_berita;
        // let lokasi = localStorage.location_berita;
        let any = localStorage.any_berita;
        // let sort=localStorage.sort_berita;
        // let filter=localStorage.filter_berita;
        // let status=localStorage.status_berita;
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
        this.props.dispatch(getBerita(pageNumber,where))
        this.props.dispatch(getBeritaKategori(1))
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
        
        localStorage.setItem('status_berita',this.state.status===''||this.state.status===undefined?status[0].kode:localStorage.status_berita)
        localStorage.setItem('sort_berita',this.state.sort===''||this.state.sort===undefined?sort[0].kode:localStorage.sort_berita)
        localStorage.setItem('filter_berita',this.state.filter===''||this.state.filter===undefined?filter[0].kode:localStorage.filter_berita)
    }
    HandleChangeLokasi(data) {
        this.setState({
            kategori: data
        })
        localStorage.setItem('kategori_berita', data);
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    HandleChangeSort(sr) {
        this.setState({
            sort: sr.value,
        });
        localStorage.setItem('sort_berita', sr.value);
    }
    HandleChangeFilter(fl) {
        this.setState({
            filter: fl.value,
        });
        localStorage.setItem('filter_berita', fl.value);
    }
    HandleChangeStatus(st) {
        this.setState({
            status: st.value,
        });
        localStorage.setItem('status_berita', st.value);
    }
    render(){
        const {
            per_page,
            last_page,
            current_page,
            data
        } = this.props.beritaBerita;
        return (
            <Layout page="Berita">
                <div className="row">
                    <div className="col-md-8">
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
                                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 1, 900: 2}}>
                                    <Masonry>
                                        {
                                            !this.props.isLoadingBerita?(
                                                (
                                                    typeof data === 'object' ? data.length>0?
                                                        data.map((v,i)=>{
                                                            return(
                                                                // <div className="card m-2">
                                                                //     <div className="card-body">
                                                                //         <img src={`https://picsum.photos/${Math.floor(Math.random() * 500) + 400}/${Math.floor(Math.random() * 400) + 300}`} alt="img"/>
                                                                //     </div>
                                                                // </div>
                                                                <div className="card m-2">
                                                                    <img className="img-fluid" src={v.picture} alt />
                                                                    <div className="card-body">
                                                                        <Link to={`/konten/berita/${v.id}`}><h5 className="font-20 mb-0">{v.title}</h5></Link>
                                                                        <div className="d-flex align-items-center justify-content-between">
                                                                            <p className="font-11"><i className="fa fa-user"/>&nbsp;{v.writer}</p>
                                                                            <p className="font-11"><i className="fa fa-calendar"/>&nbsp;{moment(v.created_at).format('YYYY-MM-DD HH:mm')}</p>
                                                                        </div>
                                                                        <div dangerouslySetInnerHTML={{__html: String(v.caption).substr(0,50)}} />
                                                                        <div className="row">
                                                                        <div className="col-6">
                                                                            {/* <a href="#" className="btn btn-primary text-uppercase btn-block">friend</a> */}
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <Link to={`/konten/berita/${v.id}`} className="btn text-uppercase border btn-block btn-outline-secondary">Baca</Link>
                                                                        </div>
                                                                        </div>
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
                                                        <div className="card m-2">
                                                            <Skeleton className="img-fluid" style={{height:'200px'}}/>
                                                            <div className="card-body">
                                                                <Skeleton width={100} height={20}/>
                                                                <div className="d-flex align-items-center justify-content-between">
                                                                    <p className="font-11"><i className="fa fa-user"/>&nbsp;<Skeleton width={70}/></p>
                                                                    <p className="font-11"><i className="fa fa-calendar"/>&nbsp;<Skeleton width={70}/></p>
                                                                </div>
                                                                <Skeleton style={{width:'100%'}}/>
                                                                <div className="row">
                                                                <div className="col-6">
                                                                    {/* <a href="#" className="btn btn-primary text-uppercase btn-block">friend</a> */}
                                                                </div>
                                                                <div className="col-6">
                                                                    <Skeleton width={100} height={20} />
                                                                </div>
                                                                </div>
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
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header bg-primary"><h5 className="text-light">Kategori</h5></div>
                            <div className="card-body p-1" style={{height:'300px', overflowX:'auto'}}>
                            {
                                !this.props.isLoadingKategori?(
                                    (
                                        typeof this.props.beritaKategori.data === 'object' ? this.props.beritaKategori.data.length>0?
                                            this.props.beritaKategori.data.map((v,i)=>{
                                                return(
                                                    <div className="card rounded mb-2" style={{borderLeft: '8px solid rgb(251, 67, 74)'}}>
                                                        <div className="card-body p-1">
                                                            <div className="media">
                                                                <div className="media-body text-center mr-2" style={{maxWidth: 100, minWidth: 100}}>
                                                                    <button type="button" onClick={(e)=>(this.handleParameter(e))} className="btn btn-link"><h6 className="mt-1" style={{whiteSpace:'nowrap'}}>{v.title}</h6></button>
                                                                </div>
                                                            </div>
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
                                                <Skeleton style={{width:'100%', height:'50px'}} />
                                        );
                                    }
                                    return rows;
                                })()
                            }
                            <div className="form-group mb-0">
                                <button className={"btn btn-primary"} style={{width:"100%"}} onClick={this.handleLoadMore}>{this.props.isLoadingKategori?'tunggu sebentar ...':'Tampilkan lebih banyak'}</button>
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
    console.log("state.beritaReducer",state.beritaReducer)
    return {
        auth:state.auth,
        beritaBerita:state.beritaReducer.data_berita,
        beritaKategori:state.beritaReducer.data_berita_kategori,
        isLoadingBerita:state.beritaReducer.isLoadingBerita,
        isLoadingKategori:state.beritaReducer.isLoadingBeritaKategori,
        beritaDetail:state.beritaReducer.data_berita_detail,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(Berita);