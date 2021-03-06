import React, { Component } from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import { ModalToggle, ModalType } from "redux/actions/modal.action";
import moment from "moment";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { getBerita, getBeritaDetail, getBeritaKategori } from '../../../../redux/actions/konten/berita.action';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Collapse } from 'reactstrap';
import Spinner from 'Spinner'
import Default from '../../../../assets/default.png'
class Berita extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.HandleChangeLokasi = this.HandleChangeLokasi.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.HandleChangeSort = this.HandleChangeSort.bind(this);
        this.HandleChangeFilter = this.HandleChangeFilter.bind(this);
        this.HandleChangeStatus = this.HandleChangeStatus.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleKategori = this.handleKategori.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.kategoriInnerRef = React.createRef()
        this.kategoriMobileInnerRef = React.createRef()
        this.state = {
            isOpen: false,
            dataEnd: false,
            where_data: "",
            any: "",
            location: "",
            location_data: [],
            startDate: moment(new Date()).format("yyyy-MM-DD"),
            endDate: moment(new Date()).format("yyyy-MM-DD"),
            sort: "",
            sort_data: [],
            filter: "",
            filter_data: [],
            status: "",
            status_data: [],
        }
    }
    componentWillMount() {
        let page = localStorage.page_berita;
        this.handleParameter(page !== undefined && page !== null ? page : 1);
    }
    componentDidMount() {
        if (localStorage.location_berita !== undefined && localStorage.location_berita !== '') {
            this.setState({ location: localStorage.location_berita })
        }
        if (localStorage.any_berita !== undefined && localStorage.any_berita !== '') {
            this.setState({ any: localStorage.any_berita })
        }
        if (localStorage.date_from_berita !== undefined && localStorage.date_from_berita !== null) {
            this.setState({ startDate: localStorage.date_from_berita })
        }
        if (localStorage.date_to_berita !== undefined && localStorage.date_to_berita !== null) {
            this.setState({ endDate: localStorage.date_to_berita })
        }
        if (localStorage.sort_berita !== undefined && localStorage.sort_berita !== null) {
            this.setState({ sort: localStorage.sort_berita })
        }
        if (localStorage.filter_berita !== undefined && localStorage.filter_berita !== null) {
            this.setState({ filter: localStorage.filter_berita })
        }
        if (localStorage.status_berita !== undefined && localStorage.status_berita !== null) {
            this.setState({ status: localStorage.status_berita })
        }
    }
    toggleCollapse(e) {
        e.preventDefault();
        this.setState({ isOpen: !this.state.isOpen })
    }
    handlePageChange(pageNumber) {
        localStorage.setItem("page_berita", pageNumber);
        this.props.dispatch(getBerita(pageNumber))
    }
    toggle(e, code, barcode, name) {
        e.preventDefault();
        localStorage.setItem("code", code);
        localStorage.setItem("barcode", barcode);
        localStorage.setItem("name", name);
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("beritaDetail"));
        this.props.dispatch(getBeritaDetail(code))
    };
    handleEvent = (event, picker) => {
        const awal = moment(picker.startDate._d).format('YYYY-MM-DD');
        const akhir = moment(picker.endDate._d).format('YYYY-MM-DD');
        localStorage.setItem("date_from_berita", `${awal}`);
        localStorage.setItem("date_to_berita", `${akhir}`);
        this.setState({
            startDate: awal,
            endDate: akhir
        });
    };
    handleSearch(e) {
        e.preventDefault();
        localStorage.setItem("any_berita", this.state.any);
        this.handleParameter(1);
    }
    handleLoadMore(e, param) {
        // this.setState({
        e.preventDefault()
        //     isScroll:true
        // });

        // let perpage = parseInt(this.props.beritaKategori.per_page,10);
        // let lengthBrg = parseInt(this.props.beritaKategori.total,10);
        // if(perpage===lengthBrg || perpage<lengthBrg){
        //     let where = '';
        //     if(perpage!==undefined&&perpage!==null&&perpage!==''){
        //         where+=`&perpage=${perpage+10}`
        //     }
        //     this.props.dispatch(getBeritaKategori(1, where));
        //     // this.setState({scrollPage:this.state.scrollPage+5});
        // }
        // else{
        //     Swal.fire({allowOutsideClick: false,
        //         title: 'Perhatian',
        //         icon: 'warning',
        //         text: 'Tidak ada data.',
        //     });
        // }
        let pick = param === 'mobile' ? this.kategoriMobileInnerRef.current : this.kategoriInnerRef.current
        if (!this.state.dataEnd) {
            if (pick) {
                const { scrollTop, scrollHeight, clientHeight } = pick;
                if (parseInt(scrollTop, 10) + parseInt(clientHeight, 10) === parseInt(scrollHeight, 10)) {
                    // TO SOMETHING HERE

                    let perpage = parseInt(this.props.beritaKategori.per_page, 10);
                    let lengthBrg = parseInt(this.props.beritaKategori.total, 10);
                    if (perpage === lengthBrg || perpage < lengthBrg) {
                        let where = '';
                        if (perpage !== undefined && perpage !== null && perpage !== '') {
                            where += `&perpage=${perpage + 10}`
                        }
                        this.props.dispatch(getBeritaKategori(1, where));
                        // this.setState({scrollPage:this.state.scrollPage+5});
                    }
                    else {
                        Swal.fire({
                            allowOutsideClick: false,
                            title: 'Perhatian',
                            icon: 'warning',
                            text: 'Tidak ada data.',
                        });
                        this.setState({ dataEnd: true })
                    }
                }
            }
        }
    }
    handleParameter(pageNumber) {
        // let dateFrom=localStorage.date_from_berita;
        // let dateTo=localStorage.date_to_berita;
        let kategori = localStorage.kategori_berita;
        // let lokasi = localStorage.location_berita;
        let any = localStorage.any_berita;
        // let sort=localStorage.sort_berita;
        // let filter=localStorage.filter_berita;
        // let status=localStorage.status_berita;
        let where = '';
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
        if (kategori !== undefined && kategori !== null && kategori !== '') {
            where += `&kategori=${kategori}`
        }
        if (any !== undefined && any !== null && any !== '') {
            where += `&q=${any}`
        }
        this.setState({
            where_data: where
        })
        this.props.dispatch(getBerita(pageNumber, where))
        this.props.dispatch(getBeritaKategori(1))
        // this.props.dispatch(FetchPembelianExcel(pageNumber,where))
    }
    handleKategori(e, val) {
        localStorage.setItem('kategori_berita', val);
        let where = '';
        if (val !== undefined && val !== null && val !== '') {
            where += `&kategori=${val}`
        }
        this.setState({ isOpen: false })
        this.props.dispatch(getBerita(1, where))
    }
    componentWillReceiveProps = (nextProps) => {
        let sort = [
            { kode: "desc", value: "DESCENDING" },
            { kode: "asc", value: "ASCENDING" },
        ];
        let data_sort = [];
        sort.map((i) => {
            data_sort.push({
                value: i.kode,
                label: i.value
            });
            return null;
        });
        let filter = [
            { kode: "no_faktur_mutasi", value: "Kode Mutasi" },
            { kode: "tgl_mutasi", value: "Tanggal" },
            { kode: "status", value: "Status" },
        ];
        let data_filter = [];
        filter.map((i) => {
            data_filter.push({
                value: i.kode,
                label: i.value
            });
            return null;
        });
        let status = [
            { kode: "", value: "Semua" },
            { kode: "0", value: "Dikirim" },
            { kode: "1", value: "Diterima" },
        ];
        let data_status = [];
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
            if (loc !== undefined) {
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

        localStorage.setItem('status_berita', this.state.status === '' || this.state.status === undefined ? status[0].kode : localStorage.status_berita)
        localStorage.setItem('sort_berita', this.state.sort === '' || this.state.sort === undefined ? sort[0].kode : localStorage.sort_berita)
        localStorage.setItem('filter_berita', this.state.filter === '' || this.state.filter === undefined ? filter[0].kode : localStorage.filter_berita)
    }
    HandleChangeLokasi(data) {
        this.setState({
            kategori: data
        })
        localStorage.setItem('kategori_berita', data);
    }
    handleChange(event) {
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
    render() {
        const {
            per_page,
            last_page,
            current_page,
            data
        } = this.props.beritaBerita;
        return (
            <Layout page="Berita">
                <div className="row box-margin">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-12 col-xs-6 col-md-4 offset-md-8 offset-xs-6">
                                                <div className="form-group">
                                                    <label>Cari</label>
                                                    <div className="input-group">
                                                        <input className="form-control" type="text" style={{ padding: '9px', fontWeight: 'bolder' }} name="any" value={this.state.any} onChange={(e) => this.handleChange(e)} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-primary" onClick={this.handleSearch}>
                                                                <i className="fa fa-search" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        !this.props.isLoadingBerita ? (
                                            (
                                                typeof data === 'object' ? data.length > 0 ?
                                                    data.filter((_, i) => (i === 0)).map((v, i) => {
                                                        return (
                                                            <>
                                                                <div className="col-md-12 d-none d-md-block"> {/* Desktop Version */}
                                                                    <div className="card m-2" style={{ position: 'relative', height: '400px', backgroundImage: `url('${v.picture}'),url('${Default}')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                                                        {/* <img className="img-fluid" src={v.picture} alt="sangqu" onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} /> */}
                                                                        <div className="card-body w-100" style={{ position: 'absolute', bottom: 0, backgroundImage: 'linear-gradient(to bottom, rgba(255,0,0,0), rgb(0 0 0 / 75%))' }}>
                                                                            <Link to={`/konten/berita/${v.id}`}><h5 className="font-30 mb-0 text-light mt-4">{v.title}</h5></Link>
                                                                            <p className="font-14 text-light">Oleh <span className="font-weight-bold">{v.writer}</span> &nbsp;{moment(v.created_at).format('LLL')}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 d-md-none d-block"> {/* Mobile Version */}
                                                                    <div className="card m-2">
                                                                        <img className="img-fluid" src={v.picture} alt="sangqu" onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} />
                                                                        <div className="card-body">
                                                                            <Link to={`/konten/berita/${v.id}`}><h5 className="font-20 mb-0">{v.title}</h5></Link>
                                                                            <div className="d-flex align-items-center justify-content-between mt-2">
                                                                                <p className="font-11"><i className="fa fa-user" />&nbsp;{v.writer}</p>
                                                                                <p className="font-11"><i className="fa fa-calendar" />&nbsp;{moment(v.created_at).format('YYYY-MM-DD HH:mm')}</p>
                                                                            </div>
                                                                            <div dangerouslySetInnerHTML={{ __html: String(v.caption).replace(/(<([^>]+)>)/ig, '').substr(0, 80) + '...' }} />
                                                                            <div className="row mt-3">
                                                                                <div className="col-6">
                                                                                    {/* <a href={() => false} className="btn btn-primary text-uppercase btn-block">friend</a> */}
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <Link to={`/konten/berita/${v.id}`} className="btn text-uppercase border btn-block btn-outline-secondary">Baca</Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                    : "No data." : "No data."
                                            )
                                        ) : (() => {
                                            const rows = [];
                                            for (let i = 0; i < 1; i++) {
                                                rows.push(
                                                    <>
                                                    <div className="col-md-12 d-none d-md-block">
                                                        <div className="card m-2">
                                                            <Skeleton className="img-fluid" style={{ height: '400px' }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 d-md-none d-block">
                                                    <div className="card m-2">
                                                        <Skeleton className="img-fluid" style={{ height: '200px' }} />
                                                        <div className="card-body">
                                                            <Skeleton width={100} height={20} />
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <p className="font-11"><i className="fa fa-user" />&nbsp;<Skeleton width={70} /></p>
                                                                <p className="font-11"><i className="fa fa-calendar" />&nbsp;<Skeleton width={70} /></p>
                                                            </div>
                                                            <Skeleton style={{ width: '100%' }} />
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    {/* <a href={() => false} className="btn btn-primary text-uppercase btn-block">friend</a> */}
                                                                </div>
                                                                <div className="col-6">
                                                                    <Skeleton width={100} height={20} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    </>
                                                );
                                            }
                                            return rows;
                                        })()
                                    }
                                </div>
                                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 1, 900: 2 }}>
                                    <Masonry>
                                        {
                                            !this.props.isLoadingBerita ? (
                                                (
                                                    typeof data === 'object' ? data.length > 0 ?
                                                        data.filter((_, i) => (i !== 0)).map((v, i) => {
                                                            return (
                                                                // <div className="card m-2">
                                                                //     <div className="card-body">
                                                                //         <img src={`https://picsum.photos/${Math.floor(Math.random() * 500) + 400}/${Math.floor(Math.random() * 400) + 300}`} alt="img"/>
                                                                //     </div>
                                                                // </div>
                                                                <div className="card m-2">
                                                                    <img className="img-fluid" src={v.picture} alt="sangqu" onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} />
                                                                    <div className="card-body">
                                                                        <Link to={`/konten/berita/${v.id}`}><h5 className="font-20 mb-0">{v.title}</h5></Link>
                                                                        <div className="d-flex align-items-center justify-content-between mt-2">
                                                                            <p className="font-11"><i className="fa fa-user" />&nbsp;{v.writer}</p>
                                                                            <p className="font-11"><i className="fa fa-calendar" />&nbsp;{moment(v.created_at).format('YYYY-MM-DD HH:mm')}</p>
                                                                        </div>
                                                                        <div dangerouslySetInnerHTML={{ __html: String(v.caption).replace(/(<([^>]+)>)/ig, '').substr(0, 80) + '...' }} />
                                                                        <div className="row mt-3">
                                                                            <div className="col-6">
                                                                                {/* <a href={() => false} className="btn btn-primary text-uppercase btn-block">friend</a> */}
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
                                            ) : (() => {
                                                const rows = [];
                                                for (let i = 0; i < 10; i++) {
                                                    rows.push(
                                                        <div className="card m-2">
                                                            <Skeleton className="img-fluid" style={{ height: '200px' }} />
                                                            <div className="card-body">
                                                                <Skeleton width={100} height={20} />
                                                                <div className="d-flex align-items-center justify-content-between">
                                                                    <p className="font-11"><i className="fa fa-user" />&nbsp;<Skeleton width={70} /></p>
                                                                    <p className="font-11"><i className="fa fa-calendar" />&nbsp;<Skeleton width={70} /></p>
                                                                </div>
                                                                <Skeleton style={{ width: '100%' }} />
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        {/* <a href={() => false} className="btn btn-primary text-uppercase btn-block">friend</a> */}
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
                                <div style={{ "marginTop": "20px", "float": "right" }}>
                                    <Paginationq
                                        current_page={current_page}
                                        per_page={per_page}
                                        total={parseInt((per_page * last_page), 10)}
                                        callback={this.handlePageChange.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        {/* DESKTOP VERSION START */}
                        <div className="card d-none d-md-block" style={{ position: 'sticky', top: '100px' }}>
                            <div className="card-header bg-transparent pb-2 border-none"><h5 className="text-dark">Kategori</h5></div>
                            <div className="card-body pt-0" style={{ minHeight: 'auto', maxHeight: '300px', overflowX: 'auto' }} onScroll={(e) => this.handleLoadMore(e, 'desktop')} ref={this.kategoriInnerRef}>
                                {
                                    !this.props.isLoadingKategori ? (
                                        <div className="outer">
                                            <div className="inner" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {
                                                    typeof this.props.beritaKategori.data === 'object' ? this.props.beritaKategori.data.length > 0 ?
                                                        this.props.beritaKategori.data.map((v, i) => {
                                                            return (
                                                                <div key={i} onClick={(e) => this.handleKategori(e, v.id)} className="cards card1 bg-light mr-1 pb-1 cursor-pointer" style={{ flex: '1 1 auto' }}>
                                                                    <p className="font-20">
                                                                        {v.title}
                                                                    </p>
                                                                    <div className="go-corner bg-danger" href="#">
                                                                        <div className="go-arrow bg-danger">
                                                                            <i className={`fa fa-search text-danger`} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }) : "No Data." : "No Data."
                                                }
                                            </div>
                                        </div>
                                    ) :
                                        <div className="row w-100 m-0">
                                            {
                                                (() => {
                                                    const rows = [];
                                                    for (let i = 0; i < 9; i++) {
                                                        rows.push(
                                                            <div className="col-md-4 p-0 pr-1">
                                                                <Skeleton height={60} style={{ width: '100%' }} />
                                                            </div>
                                                        );
                                                    }
                                                    return rows;
                                                })()
                                            }
                                        </div>
                                }
                                <div className="form-group mb-0 d-none">
                                    <button className={"btn btn-primary"} style={{ width: "100%" }} onClick={this.handleLoadMore}>{this.props.isLoadingKategori ? 'tunggu sebentar ...' : 'Tampilkan lebih banyak'}</button>
                                </div>
                            </div>
                        </div>
                        {/* DESKTOP VERSION END */}
                        <div className="card fixed-bottom d-block d-md-none shadow-lg rounded-lg" style={{ zIndex: '1' }}>
                            <button type="button" className="btn btn-lg btn-block btn-outline-success rounded-lg rounded-top border-none mb-1 bg-transparent text-success" onClick={(e) => this.toggleCollapse(e)}>KATEGORI&nbsp;<i className={`fa fa-angle-${!this.state.isOpen ? 'up' : 'down'}`} /></button>
                            <Collapse isOpen={this.state.isOpen}>
                                <div style={{ overflow: 'auto', minHeight: 'auto', maxHeight: '300px' }} onScroll={(e) => this.handleLoadMore(e, 'mobile')} ref={this.kategoriMobileInnerRef}>
                                    <div className="outer">
                                        <div className="inner" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {
                                                typeof this.props.beritaKategori.data === 'object' ? this.props.beritaKategori.data.length > 0 ?
                                                    this.props.beritaKategori.data.map((v, i) => {
                                                        return (
                                                            <div key={i} onClick={(e) => this.handleKategori(e, v.id)} className="cards card1 bg-light mr-1 pb-1 cursor-pointer" style={{ flex: '1 1 auto' }}>
                                                                <p className="font-20">
                                                                    {v.title}
                                                                </p>
                                                                <div className="go-corner bg-danger" href="#">
                                                                    <div className="go-arrow bg-danger">
                                                                        <i className={`fa fa-search text-danger`} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }) : "No Data." : "No Data."
                                            }
                                        </div>
                                    </div>
                                    {
                                        this.props.isLoadingKategori ? <Spinner /> : ''
                                    }
                                    <div className="form-group mb-0 d-none">
                                        <button className={"btn btn-primary"} style={{ width: "100%" }} onClick={this.handleLoadMore}>{this.props.isLoadingKategori ? 'tunggu sebentar ...' : 'Tampilkan lebih banyak'}</button>
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth,
        beritaBerita: state.beritaReducer.data_berita,
        beritaKategori: state.beritaReducer.data_berita_kategori,
        isLoadingBerita: state.beritaReducer.isLoadingBerita,
        isLoadingKategori: state.beritaReducer.isLoadingBeritaKategori,
        beritaDetail: state.beritaReducer.data_berita_detail,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(Berita);