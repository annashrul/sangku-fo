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
import { FetchAvailableMember, setMemberAvail } from '../../../../redux/actions/member/member.action';
import Spinner from 'Spinner'
// import noUser from 'assets/no-user.png';
import Default from 'assets/default.png'
import { RESET_PROPS } from '../../../../redux/actions/_constants';

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
            qty:'',
            pin:'',
            pin_data:'',
            member_data:{},
            isModal:'',
            code:0,
            error:{
                uuid:'',
                qty:'',
                pin:'',
                pin_data:'',
            }
        };
    }
    static getDerivedStateFromProps(props, state){
        if (state.beforePinData !== props.data_kategori) {
            
            return {
                pin_data: props.data_kategori,
                beforePinData:props.data_kategori
            }
        }
        if(state.beforeMemberAvail!==props.memberAvail){
            return {
                member_data:props.memberAvail,
                beforeMemberAvail: props.memberAvail
            }
        }
        
    }

    toggle = (e) => {
        e.preventDefault();
        if(this.state.uuid!==''&&this.state.uuid!==undefined){
            this.setState({member_data:{},uuid:'',qty:''})
            
        } else {
            
            const bool = !this.props.isOpen;
            this.props.dispatch(ModalToggle(bool));
            this.setState({
                pin:'',
                qty:'',
                // pin_data:'',
                member_data:'',
                uuid:'',
            });
        }
        this.props.dispatch(setMemberAvail(RESET_PROPS));
    };
    handlePin(){
         if(this.state.member_data.referral_code===''||this.state.member_data.referral_code===undefined){
            let txtErr = 'Anda belum memilih penerima!'
            ToastQ.fire({icon:'error',title:txtErr});
            let err = Object.assign({}, this.state.error, {'member_data': txtErr});
            this.setState({error: err});
        }
        else if(this.state.qty===''||this.state.qty===undefined){
            let txtErr = 'QTY tidak boleh kosong!'
            ToastQ.fire({icon:'error',title:txtErr});
            let err = Object.assign({}, this.state.error, {'qty': txtErr});
            this.setState({error: err});
        } 
        else {
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
            parse['id_membership'] = this.state.pin_data.id
            parse['uid'] = this.state.member_data.referral_code
            parse['qty'] = this.state.qty
            if(num.length===6){
                this.props.dispatch(pinTransfer(parse, this.props.jenis));
                this.setState({
                    foto:"",
                    uuid:'',
                    qty:'',
                    pin:'',
                    pin_data:'',
                    member_data:{},
                });
                this.props.dispatch(ModalToggle(false));
            }
        // }
    }
    handleSearch(e){
        e.preventDefault();
        if(this.state.uuid==='') {
            let txtErr = 'Penerima masih kosong!'
            ToastQ.fire({icon:'error',title:txtErr});
            let err = Object.assign({}, this.state.error, {'uuid': txtErr});
            this.setState({error: err});
        } else if(this.state.qty===''){
            let txtErr = 'QTY masih kosong!'
            ToastQ.fire({icon:'error',title:txtErr});
            let err = Object.assign({}, this.state.error, {'qty': txtErr});
            this.setState({error: err});
        } else {
            this.props.dispatch(FetchAvailableMember(this.state.uuid));
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        let err = Object.assign({}, this.state.error, {[event.target.name]: ""});
        this.setState({error: err});
    };
    render(){
        // console.log("this.state.member_data.picture",this.state.member_data.picture);
        // console.log("this.state.member_data",this.state.member_data);
        console.log("aaaaaaaaaaaaaaaaaaaaaa", this.props.memberAvail);
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
                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Jenis PIN</small>
                        </h6>
                        </div>
                        <div className="col-auto">
                        <span className="font-14">{parseInt(this.props.jenis)===1?'RO':'Aktivasi'} - ({this.state.pin_data.title})</span>
                        </div>
                    </div>
                    <hr className="my-3" />
                    <div className="row align-items-center">
                        <div className="col">
                        <h6 className="font-14 mb-0">
                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Jumlah yang di transfer</small>
                        </h6>
                        </div>
                        <div className="col-auto">
                        <span className="font-14">{parseInt(this.state.qty)} PIN</span>
                        </div>
                    </div>
                </div>
                </>
                :
                <>
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
                    <div className='text-muted'>Masukan ID member penerima.</div>
                </div>
                <label>QTY</label>
                <div className="form-group">
                    <div class="input-group">
                        <input className={`form-control ${this.state.error.qty!==""?'is-invalid':''}`} type="number" style={{padding: '9px',fontWeight:'bolder'}} name="qty" value={this.state.qty} onChange={(e) => this.handleChange(e)}/>
                        {/* <div class="input-group-append">
                            <button className="btn btn-primary" onClick={this.handleSearch}>
                                <i className="fa fa-search"/>
                            </button>
                        </div> */}
                    </div>
                    <div className='text-muted'>Masukan Jumlah Kuantiti.</div>
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
        data_kategori:state.pinReducer.data_kategori
    }
}
export default connect(mapStateToProps)(FormPinTransfer);
