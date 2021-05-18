import React, { Component } from 'react';
import { ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ModalToggle } from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
// import {ToastQ} from "helper";
import Paginationq from "helper";
import WrapperModal from "../_wrapper.modal";
import Spinner from 'Spinner'
// import Default from 'assets/default.png'
import Skeleton from 'react-loading-skeleton';
import { toRp } from 'helper';
import Select from 'react-select';
import { FetchDetailPin } from '../../../../redux/actions/pin/pin.action';
import moment from 'moment'

class FormListStokist extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.HandleChangeStatus = this.HandleChangeStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.state = {
            where_data: "",
            pin_data: {},
            pin_reaktivasi: '',
            any: "",
            location: "",
            location_data: [],
            startDate: moment(new Date()).format("yyyy-MM-DD"),
            endDate: moment(new Date()).format("yyyy-MM-DD"),
            sort: "",
            sort_data: [],
            filter: "",
            filter_data: [],
            status: 1,
            status_data: [],

        };
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
            { kode: "0", value: "TELAH DIAKTIVASI" },
            { kode: "1", value: "TERSEDIA" },
            { kode: "3", value: "TERPAKAI" },
            { kode: "4", value: "DI TRANSFER" },
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

        localStorage.setItem('status_pin', this.state.status === '' || this.state.status === undefined ? status[1].kode : localStorage.status_pin === undefined ? this.state.status : localStorage.status_pin)
        localStorage.setItem('sort_pin', this.state.sort === '' || this.state.sort === undefined ? sort[0].kode : localStorage.sort_pin)
        localStorage.setItem('filter_pin', this.state.filter === '' || this.state.filter === undefined ? filter[0].kode : localStorage.filter_pin)
    }
    componentWillMount() {
        let page = localStorage.page_pin;
        if (this.props.auth.user.id !== undefined) {
            this.handleParameter(page !== undefined && page !== null ? page : 1);
        }
    }
    componentDidUpdate(prevState) {
        if (prevState.auth.user.id !== this.props.auth.user.id) {
            let page = localStorage.page_pin;
            this.handleParameter(page !== undefined && page !== null ? page : 1);
        }
    }
    componentDidMount() {
        // this.props.dispatch(FetchAvailablePin(1));
        if (localStorage.location_pin !== undefined && localStorage.location_pin !== '') {
            this.setState({ location: localStorage.location_pin })
        }
        if (localStorage.any_pin !== undefined && localStorage.any_pin !== '') {
            this.setState({ any: localStorage.any_pin })
        }
        if (localStorage.date_from_pin !== undefined && localStorage.date_from_pin !== null) {
            this.setState({ startDate: localStorage.date_from_pin })
        }
        if (localStorage.date_to_pin !== undefined && localStorage.date_to_pin !== null) {
            this.setState({ endDate: localStorage.date_to_pin })
        }
        if (localStorage.sort_pin !== undefined && localStorage.sort_pin !== null) {
            this.setState({ sort: localStorage.sort_pin })
        }
        if (localStorage.filter_pin !== undefined && localStorage.filter_pin !== null) {
            this.setState({ filter: localStorage.filter_pin })
        }
        if (localStorage.status_pin !== undefined && localStorage.status_pin !== null) {
            this.setState({ status: localStorage.status_pin })
        }
    }

    handleSearch(e) {
        e.preventDefault();
        localStorage.setItem("any_pin", this.state.any);
        this.handleParameter(1);
    }
    handleParameter(pageNumber) {
        // let dateFrom=localStorage.date_from_pin;
        // let dateTo=localStorage.date_to_pin;
        // let kategori = localStorage.kategori_pin;
        // let lokasi = localStorage.location_pin;
        let any = localStorage.any_pin;
        // let sort=localStorage.sort_pin;
        // let filter=localStorage.filter_pin;
        let status = localStorage.status_pin;
        let where = '';
        // if(dateFrom!==undefined&&dateFrom!==null){
        //     where+=`&datefrom=${dateFrom}&dateto=${dateTo}`;
        // }
        // if(lokasi!==undefined&&lokasi!==null&&lokasi!==''){
        //     where+=`&lokasi=${lokasi}`;
        // }

        if (status !== undefined && status !== null && status !== '') {
            where += `&status=${status}`;
        }
        // if(filter!==undefined&&filter!==null&&filter!==''){
        //     if(sort!==undefined&&sort!==null&&sort!==''){
        //         where+=`&sort=${filter}|${sort}`;
        //     }
        // }
        // if(kategori!==undefined&&kategori!==null&&kategori!==''){
        //     where+=`&q=${kategori}`
        // }
        if (any !== undefined && any !== null && any !== '') {
            where += `&q=${any}`
        }
        this.setState({
            where_data: where
        })
        this.props.dispatch(FetchDetailPin(this.props.idStokist, where, pageNumber, 10))
        // this.props.dispatch(FetchPembelianExcel(pageNumber,where))
    }

    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
    };

    HandleChangeStatus(st) {
        this.setState({
            status: st.value,
        });
        localStorage.setItem('status_pin', st.value);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handlePageChange(pageNumber) {
        localStorage.setItem("page_pin", pageNumber);
        // this.props.dispatch(FetchDetailPin(pageNumber,this.props.auth.user.id,this.state.where_data))
        this.handleParameter(pageNumber)
    }

    render() {
        const {
            per_page,
            last_page,
            current_page,
            data
        } = this.props.resData;

        return (
            <div>
                <WrapperModal className="custom-map-modal" isOpen={this.props.isOpen && this.props.type === "FormListStokist"} size="lg">
                    <ModalHeader toggle={this.toggle}>Daftar Stokist</ModalHeader>
                    <ModalBody>
                        <div className="text-center">{this.props.isLoading ? <Spinner /> : ''}</div>
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-sm-6 col-md-4 col-lg-3">
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
                                    <div className="col-sm-6 col-md-4 col-lg-3">
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

                            {
                                !this.props.isLoading ? (
                                    (
                                        typeof data === 'object' ? data.length > 0 ?
                                            data.map((v, i) => {
                                                return (
                                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={i}>
                                                        <div className="card widget-new-content p-3 box-margin bg-white">
                                                            <div className="widget---stats d-flex align-items-center justify-content-between mb-15">
                                                                <div className="widget---content-text">
                                                                    <h6 className="text-uppercase">{v.kode}</h6>
                                                                    <div className="d-flex align-items-center justify-content-start">
                                                                        <i className={`fa fa-circle text-success font-11 mr-2`} />&nbsp;<p className="mb-0">{toRp(v.paket)}</p>
                                                                    </div>
                                                                </div>
                                                                <h6 className="mb-0 text-success">&nbsp;</h6>
                                                                {/* <h6 className="mb-0 text-success">PV : {v.point_volume}</h6> */}
                                                            </div>
                                                            <div className="progress h-5">
                                                                <div className="progress-bar w-100 bg-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                                            </div>
                                                            <div className="d-flex align-items-center justify-content-end">
                                                                <p className="mt-3 font-11">{v.category}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : "No data." : "No data."
                                    )
                                ) : (() => {
                                    const rows = [];
                                    for (let i = 0; i < 9; i++) {
                                        rows.push(
                                            <div className="col-xs-12 col-md-4 col-lg-3" key={i}>
                                                <div className="card widget-new-content p-3 mr-2 mb-2 bg-white">
                                                    <div className="widget---stats d-flex align-items-center justify-content-between mb-15">
                                                        <div className="widget---content-text">
                                                            <h6><Skeleton width="90px" /></h6>
                                                            <p className="mb-0"><Skeleton width="90px" /></p>
                                                        </div>
                                                        <h6 className="mb-0 text-success">&nbsp;</h6>
                                                    </div>
                                                    <div className="progress h-5">
                                                        <div className="progress-bar w-100 bg-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between pt-2">
                                                        <div>
                                                            {/* <Skeleton width="50px" height="25px"/>
                                                        &nbsp;<Skeleton width="50px" height="25px"/> */}
                                                        &nbsp;<Skeleton width="50px" height="25px" />
                                                        </div>
                                                        <Skeleton width="80px" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return rows;
                                })()
                            }
                        </div>
                        <div style={{ "marginTop": "20px", "float": "right" }}>
                            <Paginationq
                                current_page={current_page}
                                per_page={per_page}
                                total={parseInt((per_page * last_page), 10)}
                                callback={this.handlePageChange.bind(this)}
                            />
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex align-items-end justify-content-end w-100">
                            <div className="form-group mb-0 mt-0">
                                <button type="button" className="btn btn-info mr-2" onClick={this.toggle}><i className="ti-close" /> Tutup</button>
                            </div>
                        </div>
                    </ModalFooter>
                </WrapperModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isLoading: state.pinReducer.isLoading,
        resData: state.pinReducer.data_detail,
    }
}
export default connect(mapStateToProps)(FormListStokist);
