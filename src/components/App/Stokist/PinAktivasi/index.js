import React,{Component} from 'react'
import Layout from 'components/Layout'
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import moment from "moment";
import {
    FetchAvailablePin,
    FetchPin,
    pinReaktivasi,
    setKategori
} from '../../../../redux/actions/pin/pin.action'
import FormPinTransfer from '../../modals/member/form_pin_transfer';
import { FetchSitePaket } from '../../../../redux/actions/site.action';
import { FetchDetailPin } from '../../../../redux/actions/pin/pin.action';
import ModalPin from '../../modals/modal_pin'
import { Tabs } from 'react-tabs';
import Swal from 'sweetalert2';
import FormListStokist from '../../modals/member/form_list_stokist';
import Skeleton from 'react-loading-skeleton';
import MyNProgress from '../../../../myNProgress';
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
        this.handleReaktivasi = this.handleReaktivasi.bind(this);
        this.handleTransfer = this.handleTransfer.bind(this);
        this.handleGetList = this.handleGetList.bind(this);
        this.handleSave = this.handleSave.bind(this);
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
            code:'',
            isModal:false,
        }
    }

    componentDidMount(){
        this.props.dispatch(FetchAvailablePin());
        this.props.dispatch(FetchSitePaket())

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
        this.props.dispatch(FetchPin(pageNumber,this.props.auth.user.id,this.state.where_data))
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
        if(parseInt(data.jumlah)===0){
            Swal.fire({
                title: 'PERHATIAN',
                text: "Anda tidak memiliki PIN ini. Silahkan lakukan pembelian paket.",
                icon: 'warning',
            })

        }else{
            Swal.fire({
                title: 'Informasi?',
                text: "Anda akan melakukan Reaktivasi PIN "+data.title,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Process!'
            }).then((result) => {
                if (result.value) {
                    // this.props.dispatch(FetchDelete(id));
                    this.setState({
                        isModal:true,
                        pin_reaktivasi:data
                    });
                    const bool = !this.props.isOpen;
                    this.props.dispatch(ModalToggle(bool));
                    this.props.dispatch(ModalType("modalPin"));
                }
            })
        }
    }

    handleSave(num){
    
        this.setState({
            code:num
        });
        let parse = {}
        parse['pin_member'] = num
        parse['id_membership'] = this.state.pin_reaktivasi.id
        if(num.length===6){
            this.props.dispatch(pinReaktivasi(parse));
            this.setState({
                code:0,
                step:1,
            });
        }
    }
    handleGetList(e,id){
        // e.preventDefault()
        // alert(e.target.id);
        if(e.target.id==='toListForm_'){
            this.setState({idStokist:id});
            this.props.dispatch(FetchDetailPin(id));
            const bool = !this.props.isOpen;
            this.props.dispatch(ModalToggle(bool));
            this.props.dispatch(ModalType("FormListStokist"));
        }
    }
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
        let any = localStorage.any_pin;
        let status=localStorage.status_pin;
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
        this.props.dispatch(FetchPin(pageNumber,this.props.auth.user.id,where))
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
        
        localStorage.setItem('status_pin',this.state.status===''||this.state.status===undefined?status[1].kode:localStorage.status_pin===undefined?this.state.status:localStorage.status_pin)
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
    handleModal(e){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormReaktivasi"));
    }
    handleTransfer(e,v){
        if(parseInt(v.jumlah)===0){
            Swal.fire({
                title: 'PERHATIAN',
                text: "Anda tidak memiliki PIN ini. Silahkan lakukan pembelian paket.",
                icon: 'warning',
            })

        }else{
            this.props.dispatch(setKategori(v))
            // this.props.dispatch(setMemberAvail({'result':{},'msg':'','status':''}))
            const bool = !this.props.isOpen;
            this.props.dispatch(ModalToggle(bool));
            this.props.dispatch(ModalType("FormPinTransfer"));
        }
    }
    render(){
        return (
            <Layout page="PIN Aktivasi" subpage="Stokist">
                <MyNProgress isAnimating={this.props.isLoadingPin}/>
                <Tabs>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row m-1 justify-content-center">
                                {
                                    (
                                        typeof this.props.getPin === 'object' ?
                                            this.props.getPin.length>0 ?
                                                this.props.getPin.map((v,i)=>{
                                                    return(
                                                        <div key={i} className="col-sm-5 col-md-4 col-lg-4 col-12 btn btn-outline-dark w-40 m-2 p-4 text-center text-uppercase shadow-sm rounded" label={v.title} id="toListForm" onClick={(e)=>this.handleGetList(e,String(v.title).toLowerCase())}>
                                                            {this.props.isLoading?<Skeleton style={{width:'100px', height:'100px'}} circle={true}/>:
                                                                <img className="img-fluid" src={v.badge} alt="sangqu" style={{height:'100px'}}/>
                                                            }
                                                            <br/>
                                                            {this.props.isLoading?<Skeleton style={{width:'30%', height:'30px'}} />:
                                                                <a href={() => false} className="font-24">{`${v.title}`}</a>
                                                            }
                                                            <br/>
                                                            {this.props.isLoading?<Skeleton style={{width:'45%', height:'20px'}} />:
                                                            <a href={() => false} className="font-11">Sebanyak {`${v.jumlah}`} PIN Tersedia</a>
                                                            }
                                                            <br/>
                                                            <br/>
                                                            <div className="w-100 text-center">
                                                                {this.props.isLoading?<Skeleton style={{width:'30%', height:'30px', marginRight:'10px'}} />:
                                                                    <button className="btn btn-warning rounded-lg mr-3" onClick={(e)=>this.handleTransfer(e,v)}>TRANSFER</button>
                                                                }
                                                                {this.props.isLoading?<Skeleton style={{width:'30%', height:'30px'}} />:
                                                                    <button className="btn btn-primary rounded-lg" onClick={(e)=>this.handleReaktivasi(e,v)}>REAKTIVASI</button>
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                (() => {
                                                    const rows = [];
                                                    for (let i = 0; i < 2; i++) {
                                                    rows.push(
                                                        <div key={i} className="col-sm-5 col-md-4 col-lg-4 col-12 btn btn-outline-dark w-40 m-2 p-4 text-center text-uppercase shadow-sm rounded">
                                                            <Skeleton style={{width:'100px', height:'100px'}} circle={true}/>
                                                            <br/>
                                                            <Skeleton style={{width:'30%', height:'30px'}} />
                                                            <br/>
                                                            <Skeleton style={{width:'45%', height:'20px'}} />
                                                            <br/>
                                                            <br/>
                                                            <div className="w-100 text-center">
                                                                <Skeleton style={{width:'30%', height:'30px', marginRight:'10px'}} />
                                                                <Skeleton style={{width:'30%', height:'30px'}} />
                                                            </div>
                                                        </div>
                                                    );
                                                    }
                                                    return rows;
                                                })()
                                            : "No data."
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Tabs>
                {/* <FormReaktivasi availPin={this.props.getPin} datum={this.state.pin_reaktivasi} listPaket={this.props.listPaket}/> */}
                <FormPinTransfer jenis={0}/>
                <FormListStokist idStokist={this.state.idStokist}/>
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
        memberAvail:state.memberReducer.data_avail,
        getPin:state.pinReducer.data_available,
        isLoading:state.pinReducer.isLoading,
        isLoadingPin:state.pinReducer.isLoadingAvail,
        listPaket:state.siteReducer.data_paket,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(Pin);