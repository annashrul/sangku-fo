import React,{Component} from 'react';
import {ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
// import File64 from "components/common/File64";
import {ToastQ} from "helper";
import WrapperModal from "../_wrapper.modal";
import { Tab, Tabs, TabList } from 'react-tabs';
import { pinReaktivasi } from '../../../../redux/actions/pin/pin.action';
import ModalPin from '../../modals/modal_pin'

class FormReaktivasi extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePin = this.handlePin.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleStep = this.handleStep.bind(this);
        this.state = {
            foto:"",
            pin:'',
            pin_regist:'',
            isModal:'',
            list_paket:[],
            paket:{},
            code:0,
            step:1,
            error:{
                pin:'',
                pin_regist:'',
            }
        };
    }

    componentDidUpdate(prevState){
        if(prevState.directPin!==this.props.directPin){
            this.setState({pin_regist:this.props.directPin.kode})
        }
        if(prevState.listPaket!==this.props.listPaket){
            this.setState({list_paket:this.props.listPaket})
        }
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.directPin!==''&&nextProps.directPin!==undefined){
    //         this.setState({pin_regist:nextProps.directPin.kode})
    //     }
    // }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        let err = Object.assign({}, this.state.error, {[event.target.name]: ""});
        this.setState({error: err});
    };
    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.setState({
            pin:'',
            pin_regist:'',
            step:1,
        });
    };
    handleStep(e, param){
        e.preventDefault();
        if(param==='next'){
            if(this.state.step===2){
                this.handlePin()
            } else {
                if(parseInt(this.props.availPin.total_pin,10)<=0){
                    let txtErr = 'PIN yang anda miliki kosong!'
                    ToastQ.fire({icon:'error',title:txtErr});
                }
                else if(this.state.pin_regist===""||this.state.pin_regist===undefined){
                    let txtErr = 'Anda belum memilih membership!'
                    ToastQ.fire({icon:'error',title:txtErr});
                    let err = Object.assign({}, this.state.error, {'pin_regist': txtErr});
                    this.setState({error: err});
                } else {
                    this.setState({
                        step:this.state.step+1,
                    })
                }
            }
        } else if(param==='prev'){
            this.setState({
                step:this.state.step-1,
                pin_regist:''
            })
        }
    }
    handlePin(){
     
            this.setState({
                isModal:true
            });
            this.props.dispatch(ModalType("modalPin"));
    }
    handleSave(num){
      
            this.setState({
                code:num
            });
            let parse = {}
            parse['pin_member'] = num
            parse['id_membership'] = this.props.datum.id
            if(num.length===6){
                this.props.dispatch(pinReaktivasi(parse));
                this.setState({
                    code:0,
                    step:1,
                });
            }
    }
  
    handleMembership(e,val) {
        e.preventDefault();
        if(this.props.availPin.total_pin>=val.jumlah){
            let err = this.state.error;
            err = Object.assign({}, err, {pin_regist:""});
            // if(String(val.title).toLowerCase)
            
            let paket = this.state.list_paket.find((element) => { return String(element.title).split(" ")[1].toLowerCase() === String(val.title).toLowerCase();})
            this.setState({
                pin_regist: val,
                error: err,
                paket: paket
            })
        } else {
            let err = this.state.error;
            err = Object.assign({}, err, {pin_regist:"Jumlah PIN yang anda miliki masih kurang!"});
            this.setState({
                pin_regist: {},
                error: err,
            })
            ToastQ.fire({icon:'info',title:`Jumlah PIN yang anda miliki masih kurang!`});
        }
    };
    render(){
        
        return (
            <div>
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "FormReaktivasi"} size={'lg'}>
                <ModalHeader toggle={this.toggle}>Reaktivasi Membership</ModalHeader>
                <ModalBody>
                    <div className="form-group mb-0">
                    <div class="alert alert-info bg-white text-center text-dark" role="alert">
                        Anda akan melakukan aktivasi PIN {this.state.pin_regist.title}.
                    </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex align-items-end justify-content-between w-100">
                        <div className="form-group mb-0 mt-0">
                            <button type="button" className="btn btn-warning mr-2" onClick={this.toggle}><i className="ti-close" /> Batal</button>
                            <button type="submit" className="btn btn-primary mr-2" onClick={(e)=>this.handlePin(e,'next')} > Reaktivasi
                            </button>
                        </div>
                    </div>
                </ModalFooter>
            </WrapperModal>
            {
                this.state.isModal?<ModalPin isLoading={this.props.isLoadingPost} code={this.state.code} save={this.handleSave} typePage={'FormReaktivasi'}/>:null
            }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isError:state.checkoutReducer.isError,
        isLoadingPost:state.checkoutReducer.isLoadingPost,
        isLoading:state.pinReducer.isLoading,
    }
}
export default connect(mapStateToProps)(FormReaktivasi);
