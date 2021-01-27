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

class FormReaktivasi extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePin = this.handlePin.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            foto:"",
            pin:'',
            pin_regist:'',
            isModal:'',
            code:0,
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
        });
    };
    handlePin(){
         if(this.state.pin_regist===""||this.state.pin_regist===undefined){
            let txtErr = 'Anda belum memilih membership!'
            ToastQ.fire({icon:'error',title:txtErr});
            let err = Object.assign({}, this.state.error, {'pin_regist': txtErr});
            this.setState({error: err});
        } else {
            this.setState({
                isModal:true
            });
            this.props.dispatch(ModalType("modalPin"));
        }
    }
    handleSave(num){
        // if(this.state.pin_regist===""||this.state.pin_regist===undefined){
        //     let txtErr = 'Anda belum memilih membership!'
        //     ToastQ.fire({icon:'error',title:txtErr});
        //     let err = Object.assign({}, this.state.error, {'pin_regist': txtErr});
        //     this.setState({error: err});
        // }
        // else if(this.state.pin===""||this.state.pin===undefined){
        //     let txtErr = 'Silahkan isi PIN anda!'
        //     ToastQ.fire({icon:'error',title:txtErr});
        //     let err = Object.assign({}, this.state.error, {'pin': txtErr});
        //     this.setState({error: err});
        // }
        // else{
            this.setState({
                code:num
            });
            let parse = {}
            parse['pin_member'] = num
            parse['pin_reaktivasi'] = this.state.pin_regist.id
            if(num.length===6){
                this.props.dispatch(pinReaktivasi(parse));
                this.setState({
                    code:0
                });
            }
        // }
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.pin_regist===""||this.state.pin_regist===undefined){
            let txtErr = 'Anda belum memilih membership!'
            ToastQ.fire({icon:'error',title:txtErr});
            let err = Object.assign({}, this.state.error, {'pin_regist': txtErr});
            this.setState({error: err});
        }
        else if(this.state.pin===""||this.state.pin===undefined){
            let txtErr = 'Silahkan isi PIN anda!'
            ToastQ.fire({icon:'error',title:txtErr});
            let err = Object.assign({}, this.state.error, {'pin': txtErr});
            this.setState({error: err});
        }
        else{
            let parse = {}
            parse['pin_member'] = this.state.pin
            parse['pin_reaktivasi'] = this.props.directPin!==''&&this.props.directPin!==undefined?this.state.pin_regist:this.state.pin_regist.id
            this.props.dispatch(pinReaktivasi(parse));
        }
    }
    handleMembership(e,val) {
        e.preventDefault();
        if(this.props.availPin.total_pin>=val.jumlah){
            let err = this.state.error;
            err = Object.assign({}, err, {pin_regist:""});
            this.setState({
                pin_regist: val,
                error: err
            })
        } else {
            this.setState({
                pin_regist: {}
            })
            ToastQ.fire({icon:'info',title:`Jumlah PIN yang anda miliki masih kurang!`});
        }
    };
    render(){
        return (
            <div>
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "FormReaktivasi"} size="md">
                <ModalHeader toggle={this.toggle}>Reaktivasi Membership</ModalHeader>
                <ModalBody>
                    <div className="form-group mb-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <label>Membership</label>
                            {this.props.availPin !== undefined?<label>PIN YANG ANDA MILIKI : {this.props.availPin.total_pin} PIN</label>:''}
                        </div>
                        <Tabs>
                            {
                            this.props.directPin!==''&&this.props.directPin!==undefined?
                            <div className="card">
                            <div className="card-body">
                            <div className="row user-important-data-info">
                                <div className="col-md-12">
                                <ul className="sales-reports d-flex align-items-center justify-content-between">
                                <li><span>KODE</span> <span className="counter text-uppercase">{this.state.pin_regist}</span></li>
                                <li><span>NAMA PAKET</span> <span className="counter">{this.props.directPin.paket_title}</span></li>
                                <li><span>HARGA</span> <span className="counter">{toRp(this.props.directPin.harga)}</span></li>
                                </ul>
                                </div>
                            </div>
                            </div>
                            </div>
                            :
                            <div className="row">
                                <div className="col-md-12">
                                    <TabList>
                                        <div className="row m-1 justify-content-center">
                                            <Tab className="col-auto btn btn-outline-dark w-40 m-2 p-4 text-center cursor-pointer text-uppercase shadow-sm rounded d-none"></Tab>
                                            {
                                                (
                                                    this.props.availPin!==undefined ? typeof this.props.availPin.data === 'object' ?
                                                        this.props.availPin.data.map((v,i)=>{
                                                            return(
                                                                <Tab key={i} className="col-auto btn btn-outline-dark w-40 m-2 p-4 text-center cursor-pointer text-uppercase shadow-sm rounded" label="Core Courses" onClick={(e) =>this.handleMembership(e,v)}>
                                                                    <img className="img-fluid" src={v.badge} alt="sangqu" style={{height:'100px'}}/>
                                                                    <br/>
                                                                    <a href={() => false} className="font-24">{`${v.title}`}</a>
                                                                    <br/>
                                                                    <a href={() => false} className="font-11">Dibutuhkan sebanyak {`${v.jumlah}`} PIN</a>
                                                                </Tab>
                                                            )
                                                        })
                                                        : "No data."
                                                        : "No data."
                                                )
                                            }
                                        </div>
                                    </TabList>
                                </div>
                            </div>
                            }
                        </Tabs>
                        <div className="invalid-feedback" style={this.state.error.pin_regist!==""?{display:'block'}:{display:'none'}}>
                            {this.state.error.pin_regist}
                        </div>
                        <hr/>
                        <div class="alert alert-danger bg-white text-danger text-center" role="alert">
                            Saat anda melakukan Reaktivasi, maka akan mempengaruhi 'Advantage' yang akan anda peroleh kedepannya, pikirkan baik-baik jika akan melakukan reaktivasi dibawah membership anda saat ini.
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex align-items-end justify-content-between w-100">
                        <div className="form-group mb-0 mt-0">
                            {/* <label>PIN</label>
                            <input type="password" maxLength="6" className={`form-control ${this.state.error.pin!==""?'is-invalid':''}`} name="pin" value={this.state.pin} onChange={(e)=>this.handleChange(e)}/> */}
                        </div>
                        <div className="form-group mb-0 mt-0">
                            <button type="button" className="btn btn-warning mr-2" onClick={this.toggle}><i className="ti-close" /> Batal</button>
                            <button type="submit" className="btn btn-primary mr-2" onClick={this.handlePin} ><i className="ti-save" /> {!this.props.isLoadingPost?'Aktivasi':'Loading ......'}</button>
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
