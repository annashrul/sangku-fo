import React,{Component} from 'react';
import {ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
// import File64 from "components/common/File64";
import {ToastQ} from "helper";
import WrapperModal from "../_wrapper.modal";
// import { Tab, Tabs, TabList } from 'react-tabs';
import { pinTransfer } from '../../../../redux/actions/pin/pin.action';
import ModalPin from '../../modals/modal_pin'
import { FetchAvailableMember } from '../../../../redux/actions/member/member.action';
import Spinner from 'Spinner'
import noUser from 'assets/no-user.png';
import Default from 'assets/default.png'

class FormPinTransfer extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handlePin = this.handlePin.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            foto:"",
            uuid:'',
            pin:'',
            pin_data:'',
            member_data:{},
            isModal:'',
            code:0,
            error:{
                uuid:'',
                pin:'',
                pin_data:'',
            }
        };
    }

    componentDidUpdate(prevState){
        if(prevState.data!==this.props.data){
            this.setState({pin_data:this.props.data})
        }
        if(prevState.memberAvail!==this.props.memberAvail){
            this.setState({member_data:this.props.memberAvail})
        }
    }
    toggle = (e) => {
        e.preventDefault();
        if(this.state.uuid!==''&&this.state.uuid!==undefined){
            this.setState({member_data:{},uuid:''})
            console.log("toggle",true);
        } else {
            console.log("toggle",false);
            const bool = !this.props.isOpen;
            this.props.dispatch(ModalToggle(bool));
            this.setState({
                pin:'',
                // pin_data:'',
                member_data:'',
                uuid:'',
            });
        }
    };
    handlePin(){
         if(this.state.member_data.referral_code===''||this.state.member_data.referral_code===undefined){
            let txtErr = 'Anda belum memilih penerima!'
            ToastQ.fire({icon:'error',title:txtErr});
            let err = Object.assign({}, this.state.error, {'member_data': txtErr});
            this.setState({error: err});
        } else {
            this.setState({
                isModal:true
            });
            this.props.dispatch(ModalType("modalPin"));
        }
    }
    handleSave(num){
            this.setState({
                code:num
            });
            let parse = {}
            parse['pin_member'] = num
            parse['pin_transfer'] = this.state.pin_data.kode
            parse['uid'] = this.state.member_data.referral_code
            if(num.length===6){
                this.props.dispatch(pinTransfer(parse));
                this.setState({
                    code:0
                });
            }
        // }
    }
    handleSearch(e){
        e.preventDefault();
        if(this.state.uuid!==undefined&&this.state.uuid!==''){
            this.props.dispatch(FetchAvailableMember(this.state.uuid));
        } else {
            let txtErr = 'Penerima masih kosong!'
            ToastQ.fire({icon:'error',title:txtErr});
            let err = Object.assign({}, this.state.error, {'uuid': txtErr});
            this.setState({error: err});
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        let err = Object.assign({}, this.state.error, {[event.target.name]: ""});
        this.setState({error: err});
    };
    render(){
        const {
            // created_at,
            // exp_date,
            // point_volume,
            // id,
            // id_kategori,
            // id_member,
            // id_paket,
            kode,
            full_name,
            status,
            // totalrecords,
            // type,
            // updated_at,
        } = this.state.pin_data
        return (
            <div>
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "FormPinTransfer"} size="md">
                <ModalHeader toggle={this.toggle}>Transfer PIN</ModalHeader>
                <ModalBody>
                    <div className="text-center">{this.props.isLoadingAvail?<Spinner/>:''}</div>
                {this.state.member_data.picture!==undefined&&this.state.member_data!=={}?
                <>
                <label>Perincian</label>
                <div className="img-thumbnail p-3">
                    {/* <div className="profile-thumb-contact text-center mb-4">
                        <div className="ribbon_wrapper profile--tumb">
                            <img src={this.state.member_data.picture} alt="sangqu" />
                            <div className="ribbon ribbon-vertical-l" style={{lineHeight: 'unset', width: 70, transform: 'rotate(-45deg)', left: '-40px', top: '-15px'}}>
                                <img src={this.state.member_data.badge} alt="user" className="thumb-xs mb-2 rounded-circle" /></div>
                        </div>
                    </div> */}
                    <div style={{position:'relative', left:'40%'}}>
                        <div className="ribbon_wrapper images_wrapper" style={{height:'-webkit-fill-available', width:'fit-content'}}>
                            <div className="ribbon ribbon-vertical-l" style={{lineHeight:'unset',width:'70px',transform:'rotate(-45deg)',left:'-40px',top:'-15px'}}>
                                <img src={this.state.member_data.badge} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} alt="user" class="thumb-xs mb-2 rounded-circle"/>
                            </div>
                            <img className="thumb-xl mb-2 rounded-circle h-100" style={{borderColor: '#ccc'}} src={this.state.member_data.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} width={70} height={70} alt={this.state.member_data.full_name} title={this.state.member_data.full_name} />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col">
                        <h6 className="font-14 mb-0">
                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Penerima</small>
                        </h6>
                        </div>
                        <div className="col-auto">
                        <span className="font-14">{this.state.member_data.full_name}</span>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="row align-items-center">
                        <div className="col">
                        <h6 className="font-14 mb-0">
                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Pemilik saat ini</small>
                        </h6>
                        </div>
                        <div className="col-auto">
                        <span className="font-14">{full_name}</span>
                        </div>
                    </div>
                    <hr className="my-3" />
                    
                    <div className="row align-items-center">
                        <div className="col">
                        <h6 className="font-14 mb-0">
                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">PIN</small>
                        </h6>
                        </div>
                        <div className="col-auto">
                        <span className="font-14">{kode}</span>
                        </div>
                    </div>
                    <hr className="my-3" />
                    
                    <div className="row align-items-center">
                        <div className="col">
                        <h6 className="font-14 mb-0">
                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Status</small>
                        </h6>
                        </div>
                        <div className="col-auto">
                        <span className="font-14">{status}</span>
                        </div>
                    </div>
                </div>
                </>
                :
                <>
                <label>Detail PIN</label>
                <div className="widget---stats d-flex align-items-center justify-content-between mb-15 img-thumbnail p-3">
                    <div className="widget---content-text">
                    <h6 className="text-uppercase">{kode}</h6>
                        <div className="d-flex align-items-center justify-content-start">
                            <p className="mb-0"><span className="text-muted">Pemilik : </span>{full_name}</p>
                        </div>
                    </div>
                    <h6 className="mb-0 text-success"><i className={`fa fa-circle ${status===0?'text-danger':'text-success'} font-11 mr-2`}/>&nbsp;{status===0?'Tidak Tersedia':'Tersedia'}</h6>
                    {/* <h6 className="mb-0 text-success"></h6> */}
                </div>
                <label>Penerima</label>
                <div className="form-group">
                    <div class="input-group">
                        <input className={`form-control ${this.state.error.uuid!==""?'is-invalid':''}`} type="text" style={{padding: '9px',fontWeight:'bolder'}} name="uuid" value={this.state.uuid} onChange={(e) => this.handleChange(e)}/>
                        {/* <div class="input-group-append">
                            <button className="btn btn-primary" onClick={this.handleSearch}>
                                <i className="fa fa-search"/>
                            </button>
                        </div> */}
                    </div>
                </div>
                </>}


                {/* <div className="progress h-5 mb-2">
                    <div className="progress-bar w-100 bg-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <div class="alert alert-danger bg-white text-danger text-center" role="alert">
                    Eu magna laborum reprehenderit quis culpa.
                </div> */}
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex align-items-end justify-content-between w-100">
                        <div className="form-group mb-0 mt-0">
                        {this.state.member_data.picture!==undefined&&this.state.member_data!=={}?
                            <>
                                <button type="button" className="btn btn-info mr-2" onClick={this.toggle}><i className="ti-close" /> Kembali</button>
                                <button type="submit" className="btn btn-primary mr-2" onClick={this.handlePin} ><i className="ti-save" /> {!this.props.isLoadingPost?'Transfer':'Loading ......'}</button>
                            </>
                            :
                            <>
                                <button type="button" className="btn btn-warning mr-2" onClick={this.toggle}><i className="ti-close" /> Batal</button>
                                <button type="button" className="btn btn-info mr-2" onClick={this.handleSearch}><i className="ti-close" /> Periksa</button>
                            </>
                        }
                        </div>
                    </div>
                </ModalFooter>
            </WrapperModal>
            {
                this.state.isModal?<ModalPin isLoading={this.props.isLoadingPost} code={this.state.code} save={this.handleSave} typePage={'FormPinTransfer'}/>:null
            }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isError:state.checkoutReducer.isError,
        isLoadingPost:state.checkoutReducer.isLoadingPost,
        isLoading:state.pinReducer.isLoading,
        isLoadingAvail:state.memberReducer.isLoadingAvail,
        memberAvail:state.memberReducer.data_avail,
    }
}
export default connect(mapStateToProps)(FormPinTransfer);
