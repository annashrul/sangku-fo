import React, { Component } from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import { ModalToggle, ModalType } from "redux/actions/modal.action";
import moment from "moment";
import { deleteTesti, getTestimoni, getTestimoniDetail, getTestimoniKategori } from '../../../../redux/actions/konten/testimoni.action';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoTesti from '../../modals/testimoni/video_testi';
import FormAddTestimoni from '../../modals/testimoni/form_add_testimoni';
import Default from '../../../../assets/default.png'
import { Link } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
class MyTestimoni extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleAdd = this.toggleAdd.bind(this);
        this.toggleVideo = this.toggleVideo.bind(this);
        this.toggleFoto = this.toggleFoto.bind(this);
        this.HandleChangeLokasi = this.HandleChangeLokasi.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.HandleChangeSort = this.HandleChangeSort.bind(this);
        this.HandleChangeFilter = this.HandleChangeFilter.bind(this);
        this.HandleChangeStatus = this.HandleChangeStatus.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleDeleteTesti = this.handleDeleteTesti.bind(this);
        this.state = {
            where_data: "",
            video_testi: "",
            foto: "",
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


        if (this.props.location.myId === undefined) {
            window.location.href = '/konten/testimoni'
        }
    }
    componentWillMount() {
        let page = localStorage.page_testimoni;
        this.handleParameter(page !== undefined && page !== null ? page : 1);
    }
    componentDidMount() {
        if (localStorage.location_testimoni !== undefined && localStorage.location_testimoni !== '') {
            this.setState({ location: localStorage.location_testimoni })
        }
        if (localStorage.any_testimoni !== undefined && localStorage.any_testimoni !== '') {
            this.setState({ any: localStorage.any_testimoni })
        }
        if (localStorage.date_from_testimoni !== undefined && localStorage.date_from_testimoni !== null) {
            this.setState({ startDate: localStorage.date_from_testimoni })
        }
        if (localStorage.date_to_testimoni !== undefined && localStorage.date_to_testimoni !== null) {
            this.setState({ endDate: localStorage.date_to_testimoni })
        }
        if (localStorage.sort_testimoni !== undefined && localStorage.sort_testimoni !== null) {
            this.setState({ sort: localStorage.sort_testimoni })
        }
        if (localStorage.filter_testimoni !== undefined && localStorage.filter_testimoni !== null) {
            this.setState({ filter: localStorage.filter_testimoni })
        }
        if (localStorage.status_testimoni !== undefined && localStorage.status_testimoni !== null) {
            this.setState({ status: localStorage.status_testimoni })
        }
    }
    handlePageChange(pageNumber) {
        localStorage.setItem("page_testimoni", pageNumber);
        this.props.dispatch(getTestimoni(pageNumber, this.state.where_data, 9))
    }
    toggle(e, code, barcode, name) {
        e.preventDefault();
        localStorage.setItem("code", code);
        localStorage.setItem("barcode", barcode);
        localStorage.setItem("name", name);
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("testimoniDetail"));
        this.props.dispatch(getTestimoniDetail(code))
    };
    toggleVideo(e, url) {
        e.preventDefault();
        this.setState({ video_testi: url })
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("VideoTesti"));
    };
    toggleFoto(e, url) {
        e.preventDefault();
        this.setState({ foto: url })
    };
    toggleAdd(e) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormAddTestimoni"));
    };
    handleEvent = (event, picker) => {
        const awal = moment(picker.startDate._d).format('YYYY-MM-DD');
        const akhir = moment(picker.endDate._d).format('YYYY-MM-DD');
        localStorage.setItem("date_from_testimoni", `${awal}`);
        localStorage.setItem("date_to_testimoni", `${akhir}`);
        this.setState({
            startDate: awal,
            endDate: akhir
        });
    };
    handleSearch(e) {
        e.preventDefault();
        localStorage.setItem("any_testimoni", this.state.any);
        this.handleParameter(1);
    }
    handleLoadMore() {
        // this.setState({
        //     isScroll:true
        // });

        let perpage = parseInt(this.props.testimoniKategori.per_page, 10);
        let lengthBrg = parseInt(this.props.testimoniKategori.total, 10);
        if (perpage === lengthBrg || perpage < lengthBrg) {
            let where = '';
            if (perpage !== undefined && perpage !== null && perpage !== '') {
                where += `&perpage=${perpage + 10}`
            }
            this.props.dispatch(getTestimoniKategori(1, where));
            // this.setState({scrollPage:this.state.scrollPage+5});
        }
        else {
            Swal.fire({
                allowOutsideClick: false,
                title: 'Perhatian',
                icon: 'warning',
                text: 'Tidak ada data.',
            });
        }
    }
    handleParameter(pageNumber) {
        let dateFrom = localStorage.date_from_testimoni;
        let dateTo = localStorage.date_to_testimoni;
        // let lokasi = localStorage.location_testimoni;
        let any = localStorage.any_testimoni;
        let me = this.props.location.myId;
        // let sort=localStorage.sort_testimoni;
        // let filter=localStorage.filter_testimoni;
        // let status=localStorage.status_testimoni;
        let where = '';
        if (dateFrom !== undefined && dateFrom !== null) {
            where += `&datefrom=${dateFrom}&dateto=${dateTo}`;
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
        if (any !== undefined && any !== null && any !== '') {
            where += `&q=${any}`
        }
        if (me !== undefined && me !== null && me !== '') {
            where += `&id_member=${me}`
        }
        this.setState({
            where_data: where
        })
        this.props.dispatch(getTestimoni(pageNumber, where, 9))
        this.props.dispatch(getTestimoniKategori(1))
        // this.props.dispatch(FetchPembelianExcel(pageNumber,where))
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

        localStorage.setItem('status_testimoni', this.state.status === '' || this.state.status === undefined ? status[0].kode : localStorage.status_testimoni)
        localStorage.setItem('sort_testimoni', this.state.sort === '' || this.state.sort === undefined ? sort[0].kode : localStorage.sort_testimoni)
        localStorage.setItem('filter_testimoni', this.state.filter === '' || this.state.filter === undefined ? filter[0].kode : localStorage.filter_testimoni)
    }
    HandleChangeLokasi(lk) {
        this.setState({
            location: lk.value
        })
        localStorage.setItem('location_testimoni', lk.value);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    HandleChangeSort(sr) {
        this.setState({
            sort: sr.value,
        });
        localStorage.setItem('sort_testimoni', sr.value);
    }
    HandleChangeFilter(fl) {
        this.setState({
            filter: fl.value,
        });
        localStorage.setItem('filter_testimoni', fl.value);
    }
    HandleChangeStatus(st) {
        this.setState({
            status: st.value,
        });
        localStorage.setItem('status_testimoni', st.value);
    }
    handleDeleteTesti(e, id) {
        e.preventDefault();
        Swal.fire({
            title: 'Perhatian !!!',
            text: `Anda yakin akan menghapus data ini ??`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Oke, Hapus`,
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(deleteTesti(id));
            }
        })
    }
    render() {
        const {
            per_page,
            last_page,
            current_page,
            data
        } = this.props.testimoniTestimoni;

        return (
            <Layout page="Testimoni">

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-2">
                                            <Link to={`/konten/testimoni`} className="btn btn-lg btn-outline-link border-none btn-rounded text-primary pl-0 font-18"><i className="fa fa-chevron-left" />&nbsp;Semua Testimoni</Link>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-xs-6 col-md-4">
                                                <div className="form-group">
                                                    <label>Cari</label>
                                                    <div className="input-group">
                                                        <input className="form-control" type="text" style={{ padding: '9px', fontWeight: 'bolder' }} name="any" value={this.state.any} onChange={(e) => this.handleChange(e)} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-primary" onClick={this.handleSearch}>
                                                                <i className="fa fa-search" />
                                                            </button>
                                                        </div>
                                                        <button className="btn btn-primary ml-2" onClick={this.toggleAdd}>
                                                            TAMBAH
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center d-flex" style={{ paddingBottom: '40px' }}>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table className="table table-hover table-striped m-3" style={{ tableLayout: 'fixed' }}>
                                            <thead style={{ backgroundColor: '#732044' }}>
                                                <tr>
                                                    <td width="8%" className="text-center text-light" style={{ whiteSpace: 'nowrap' }}>NO</td>
                                                    <td width="12%" className="text-center text-light" style={{ whiteSpace: 'nowrap' }}>Penulis</td>
                                                    <td width="30%" className="text-center text-light" style={{ whiteSpace: 'nowrap' }}>Isi Testi</td>
                                                    <td width="20%" className="text-center text-light" style={{ whiteSpace: 'nowrap' }}>Pekerjaan</td>
                                                    <td width="20%" className="text-center text-light" style={{ whiteSpace: 'nowrap' }}>Nama Lain</td>
                                                    <td width="10%" className="text-center text-light">AKSI</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    !this.props.isLoadingTestimoni ? (
                                                        (
                                                            typeof data === 'object' ? data.length > 0 ?
                                                                data.map((v, i) => {
                                                                    return (
                                                                        <tr key={i}>
                                                                            <td className="text-center">{i + 1 + (10 * (parseInt(current_page, 10) - 1))}</td>
                                                                            <td className="text-center">{v.writer}</td>
                                                                            <td className="text-center">{v.caption}</td>
                                                                            <td className="text-center">{v.jobs}</td>
                                                                            <td className="text-center">{v.nama_lain}</td>
                                                                            <td className="text-center">
                                                                                <UncontrolledButtonDropdown>
                                                                                    <DropdownToggle className="bg-primary border-none rounded font-22">
                                                                                        <i className="zmdi zmdi-more"></i>
                                                                                    </DropdownToggle>
                                                                                    <DropdownMenu>
                                                                                        {/* <DropdownItem  onClick={(e)=>this.handleModalBank(e,i)}><i className="ti-pencil-alt"></i> Edit</DropdownItem> */}
                                                                                        <DropdownItem onClick={(e) => this.handleDeleteTesti(e, v.id)}><i className="ti-trash"></i> Delete</DropdownItem>
                                                                                    </DropdownMenu>
                                                                                </UncontrolledButtonDropdown>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                : <tr><td colSpan="6" className="text-center">No data.</td></tr> : <tr><td colSpan="6" className="text-center">No data.</td></tr>
                                                        )
                                                    ) : (() => {
                                                        const rows = [];
                                                        for (let i = 0; i < 9; i++) {
                                                            rows.push(
                                                                <tr key={i}>
                                                                    <td><Skeleton /></td>
                                                                    <td><Skeleton /></td>
                                                                    <td><Skeleton /></td>
                                                                    <td><Skeleton /></td>
                                                                    <td><Skeleton /></td>
                                                                    <td><Skeleton /></td>
                                                                </tr>
                                                            );
                                                        }
                                                        return rows;
                                                    })()
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
                    <div className="col-md-4 d-none">
                        <div className="card">
                            <div className="card-header bg-primary"><h5 className="text-light">Kategori</h5></div>
                            <div className="card-body p-1" style={{ height: '300px', overflowX: 'auto' }}>
                                {
                                    !this.props.isLoadingKategori ? (
                                        (
                                            typeof this.props.testimoniKategori.data === 'object' ? this.props.testimoniKategori.data.length > 0 ?
                                                this.props.testimoniKategori.data.map((v, i) => {
                                                    return (
                                                        <div className="card rounded mb-2" style={{ borderLeft: '8px solid rgb(251, 67, 74)' }}>
                                                            <div className="card-body p-1">
                                                                <div className="media">
                                                                    <div className="media-body text-center mr-2" style={{ maxWidth: 100, minWidth: 100 }}>
                                                                        <button type="button" onClick={(e) => (this.handleParameter(e))} className="btn btn-link"><h6 className="mt-1" style={{ whiteSpace: 'nowrap' }}>{v.title}</h6></button>
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
                                                <Skeleton style={{ width: '100%', height: '50px' }} />
                                            );
                                        }
                                        return rows;
                                    })()
                                }
                                <div className="form-group mb-0">
                                    <button className={"btn btn-primary"} style={{ width: "100%" }} onClick={this.handleLoadMore}>{this.props.isLoadingKategori ? 'tunggu sebentar ...' : 'Tampilkan lebih banyak'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="lightboxOverlay" className="lightboxOverlay" style={{ zIndex: 99999, width: '100%', height: '100%', display: this.state.foto === '' ? 'none' : 'block', position: 'fixed' }} />

                <div id="lightbox" className="lightbox" onClick={(e) => this.toggleFoto(e, '')} style={{ display: this.state.foto === '' ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', top: 0, textAlign: 'center', left: 0, zIndex: 9999999, position: 'fixed', minHeight: '100%', minWidth: '100%' }}>
                    <div className="lb-outerContainer" style={{ maxWidth: '75%', height: 'auto' }}>
                        <div className="lb-container">
                            <img className="lb-image" src={this.state.foto} alt="sangqu" onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} style={{ maxWidth: '75%', height: 'auto' }} />
                        </div>
                    </div>
                </div>



                {this.state.video_testi !== '' && this.state.video_testi !== undefined ? <VideoTesti videoTesti={this.state.video_testi} /> : ''}
                <FormAddTestimoni />
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth,
        testimoniTestimoni: state.testimoniReducer.data_testimoni,
        testimoniKategori: state.testimoniReducer.data_testimoni_kategori,
        isLoadingTestimoni: state.testimoniReducer.isLoadingTestimoni,
        isLoadingKategori: state.testimoniReducer.isLoadingTestimoniKategori,
        testimoniDetail: state.testimoniReducer.data_testimoni_detail,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(MyTestimoni);