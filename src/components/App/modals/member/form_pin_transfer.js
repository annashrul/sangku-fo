import React,{Component} from 'react';
import {ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
// import File64 from "components/common/File64";
import {ToastQ, toRp} from "helper";
import WrapperModal from "../_wrapper.modal";
import { Tab, Tabs, TabList } from 'react-tabs';
import { pinReaktivasi } from '../../../../redux/actions/pin/pin.action';
import ModalPin from '../../modals/modal_pin'
import { FetchAvailableMember } from '../../../../redux/actions/member/member.action';

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
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.setState({
            pin:'',
            pin_data:'',
            member_data:'',
            uuid:'',
        });
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
                this.props.dispatch(pinReaktivasi(parse));
                this.setState({
                    code:0
                });
            }
        // }
    }
    handleSearch(){
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
            // pemilik,
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
                <label>Detail PIN</label>
                <div className="widget---stats d-flex align-items-center justify-content-between mb-15 img-thumbnail p-3">
                    <div className="widget---content-text">
                    <h6 className="text-uppercase">{kode}</h6>
                        <div className="d-flex align-items-center justify-content-start">
                            <i className={`fa fa-circle ${status===0?'text-danger':'text-success'} font-11 mr-2`}/>&nbsp;<p className="mb-0">{status===0?'Tidak Tersedia':'Tersedia'}</p>
                        </div>
                    </div>
                    {/* <h6 className="mb-0 text-success">PV : {point_volume}</h6> */}
                    <h6 className="mb-0 text-success"></h6>
                </div>
                <label>Penerima</label>
                <div className="form-group">
                    <div class="input-group">
                        <input className={`form-control ${this.state.error.uuid!==""?'is-invalid':''}`} type="text" style={{padding: '9px',fontWeight:'bolder'}} name="uuid" value={this.state.uuid} onChange={(e) => this.handleChange(e)}/>
                        <div class="input-group-append">
                            <button className="btn btn-primary" onClick={this.handleSearch}>
                                <i className="fa fa-search"/>
                            </button>
                        </div>
                    </div>
                </div>
                {this.state.member_data.picture!==undefined&&this.state.member_data!=={}?
                <ul className="total-earnings-list img-thumbnail mb-2">
                    <li className="btn btn-outline-light cursor-pointer">
                        <div className="author-info d-flex align-items-center">
                        <div className="author-img mr-3" style={{width:'50px'}}>
                            <img src={this.state.member_data.picture} alt="sangqu" />
                        </div>
                        <div className="author-text text-left">
                            <h6 className="mb-0">{this.state.member_data.full_name}</h6>
                        </div>
                        </div>
                        <div className="author-img" style={{width:'50px'}}>
                            <img src={this.state.member_data.badge} alt />
                        </div>
                    </li>
                </ul>:''}


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
                            <button type="button" className="btn btn-warning mr-2" onClick={this.toggle}><i className="ti-close" /> Batal</button>
                            <button type="submit" className="btn btn-primary mr-2" onClick={this.handlePin} ><i className="ti-save" /> {!this.props.isLoadingPost?'Transfer':'Loading ......'}</button>
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
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa",state.memberReducer)
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
