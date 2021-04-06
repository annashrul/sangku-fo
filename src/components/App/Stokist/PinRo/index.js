import React,{Component} from 'react'
import Layout from 'components/Layout'
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import moment from "moment";
import {
    setKategori,
    FetchAvailablePin,
    FetchPin,
    pinRoAktivasi
} from '../../../../redux/actions/pin/pin.action'
import FormPinTransfer from '../../modals/member/form_pin_transfer';
import FormAktivasiPinRo from '../../modals/member/form_aktivasi_pin_ro';
import Swal from 'sweetalert2';
import { FetchDetailPin } from '../../../../redux/actions/pin/pin.action';
import ModalPin from '../../modals/modal_pin'
import FormListStokist from '../../modals/member/form_list_stokist';

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
        this.handleSave = this.handleSave.bind(this);
        this.handleGetList = this.handleGetList.bind(this);
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
            isModal:false,
            code:false,
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
        this.props.dispatch(FetchAvailablePin('ro'));
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
    
        let any = localStorage.any_pin_ro;
        let status=localStorage.status_pin_ro;
        let where='';
       
        if(status!==undefined&&status!==null&&status!==''){
            where+=`&status=${status}`;
        }
      
        if(any!==undefined&&any!==null&&any!==''){
            where+=`&search=${any}`
        }
        this.setState({
            where_data:where
        })
        this.props.dispatch(FetchPin(pageNumber,this.props.auth.user.id,where,'','ro'))
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

    handleGetList(e,id){
        // e.preventDefault()
        // alert('test');
        if(e.target.id==='toListForm'){
            this.props.dispatch(FetchDetailPin(id));
            const bool = !this.props.isOpen;
            this.props.dispatch(ModalToggle(bool));
            this.props.dispatch(ModalType("FormListStokist"));
        }
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
    handleSave(num){
        this.setState({
            code:num
        });
        let parse = {}
        parse['pin_member'] = num
        parse['id_membership'] = this.state.pin_data.id
        if(num.length===6){
            this.props.dispatch(pinRoAktivasi(parse));
            this.setState({
                code:0
            });
        }
    // }
    }
    handleTransfer(e,v){
        if (parseInt(v.jumlah) === 0) {
            Swal.fire({
                title: 'PERHATIAN',
                text: "Anda tidak memiliki PIN ini. Silahkan lakukan pembelian paket.",
                icon: 'warning',
            })

        } else {
            this.props.dispatch(setKategori(v))
            const bool = !this.props.isOpen;
            this.props.dispatch(ModalToggle(bool));
            this.props.dispatch(ModalType("FormPinTransfer"));
        }
    }
    handleAktivasiPinRo(e,v){
        Swal.fire({
            title: 'Informasi?',
            text: "Anda akan melakukan Reaktivasi PIN RO "+v.title,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Process!'
        }).then((result) => {
            if (result.value) {
                this.setState({
                    isModal:true,
                    pin_data:v
                });
                const bool = !this.props.isOpen;
                this.props.dispatch(ModalToggle(bool));
                this.props.dispatch(ModalType("modalPin"));
            }
        })
    }
    render(){
        return (
            <Layout page="PIN RO" subpage="Stokist">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body" style={{textAlign:'center'}}>
                                
                                {
                        (
                            typeof this.props.getPin === 'object' ?
                                this.props.getPin.map((v,i)=>{
                                    return(
                                        <div key={i} className="col-md-5 col-12 btn btn-outline-dark w-40 m-2 p-4 text-center text-uppercase shadow-sm rounded" label="Core Courses" id="toListForm" onClick={(e)=>this.handleGetList(e,String(v.title).toLowerCase())}>
                                            <img className="img-fluid" src={v.badge} alt="sangqu" style={{height:'100px'}}/>
                                            <br/>
                                            <a href={() => false} className="font-24">{`${v.title}`}</a>
                                            <br/>
                                            
                                            <a href={() => false} className="font-11">Sebanyak {`${v.jumlah}`} PIN Tersedia</a>
                                            <br/>
                                            <br/>
                                            <a href={() => false} className="btn btn-warning mr-3" onClick={event=>this.handleTransfer(event,v)}>Transfer</a>
                                            <a href={() => false} className="btn btn-primary" onClick={event=>this.handleAktivasiPinRo(event,v)}>Aktivasi</a>
                                        </div>
                                    )
                                })
                                : "No data."
                        )
                                }
                              
                            </div>
                        </div>
                    </div>
                </div>
                <FormPinTransfer data={this.state.pin_data} jenis={1}/>
                <FormListStokist/>
                <FormAktivasiPinRo data={this.state.pin_data}/>
                {
                    this.state.isModal?<ModalPin isLoading={this.props.isLoadingPost} code={this.state.code} save={this.handleSave} typePage={'FormReaktivasi'}/>:null
                }
            </Layout>
            );
    }
}

const mapStateToProps = (state) => {
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