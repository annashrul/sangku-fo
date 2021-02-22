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
        this.handleSubmit = this.handleSubmit.bind(this);
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
                if(this.state.pin_regist===""||this.state.pin_regist===undefined){
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
                    code:0,
                    step:1,
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
            // if(String(val.title).toLowerCase)
            
            let paket = this.state.list_paket.find((element) => { return String(element.title).split(" ")[1].toLowerCase() === String(val.title).toLowerCase();})
            this.setState({
                pin_regist: val,
                error: err,
                paket: paket
            })
        } else {
            this.setState({
                pin_regist: {}
            })
            ToastQ.fire({icon:'info',title:`Jumlah PIN yang anda miliki masih kurang!`});
        }
    };
    render(){
        console.log("this.state.list_paket",this.state.list_paket);
        console.log("this.state.paket",this.state.paket);
        return (
            <div>
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "FormReaktivasi"} size={'lg'}>
                <ModalHeader toggle={this.toggle}>Reaktivasi Membership</ModalHeader>
                <ModalBody>
                    <div className="form-group mb-0">
                        {this.state.step===1?
                        <>
                            <div className="d-flex justify-content-between align-items-center">
                                <label>Pilihan Membership</label>
                                {this.props.availPin !== undefined?<label>PIN YANG ANDA MILIKI : {this.props.availPin.total_pin} PIN</label>:''}
                            </div>
                            <Tabs>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TabList>
                                            <div className="row m-1 justify-content-center">
                                                <Tab className="col-12 col-md-5 btn btn-outline-dark w-40 m-2 p-4 text-center cursor-pointer text-uppercase shadow-sm rounded d-none"></Tab>
                                                {
                                                    (
                                                        this.props.availPin!==undefined ? typeof this.props.availPin.data === 'object' ?
                                                            this.props.availPin.data.map((v,i)=>{
                                                                return(
                                                                    <Tab key={i} className="col-12 col-md-5 btn btn-outline-dark w-40 m-2 p-4 text-center cursor-pointer text-uppercase shadow-sm rounded" label="Core Courses" onClick={(e) =>this.handleMembership(e,v)}>
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
                            </Tabs>
                            <div className="invalid-feedback" style={this.state.error.pin_regist!==""?{display:'block'}:{display:'none'}}>
                                {this.state.error.pin_regist}
                            </div>
                        </>
                        :this.state.step===2?
                        <>
                            <div className="row">
                            <div className="col-md-6 offset-md-3">
                                {this.state.paket==={}&&this.state.paket===undefined?'':
                                <div className="single-ticket-pricing-table text-center">
                                    <h6 className="ticket-plan">{this.state.pin_regist.title!==undefined?this.state.pin_regist.title:''}</h6>
                                    {/* Ticket Icon */}
                                    <div className="ticket-icon"  style={{width:'100px',height:'100px'}}>
                                        <img className="img-fluid" src={this.state.pin_regist.badge!==undefined?this.state.pin_regist.badge:''} alt="sangqu"/>
                                    </div>
                                    <h5 className="ticket-price font-24">Keuntungan Yang Akan Didapatkan Dalam {this.state.paket.title}</h5>
                                    {/* Ticket Pricing Table Details */}
                                    <div className="ticket-pricing-table-details">
                                        <ul dangerouslySetInnerHTML={{__html: this.state.paket.deskripsi}} className="text-left"/>
                                    {/* <p><i className="zmdi zmdi-check" /> Eu nostrud qui eiusmod excepteur aute.</p>
                                    <p><i className="zmdi zmdi-check" /> Ex adipisicing occaecat ut.</p>
                                    <p><i className="zmdi zmdi-check" /> Reprehenderit occaecat Lorem.</p>
                                    <p><i className="zmdi zmdi-check" /> Aliquip voluptate sunt magna.</p>
                                    <p><i className="zmdi zmdi-check" /> Occaecat enim qui laborum.</p> */}
                                    </div>
                                </div>}
                            </div>
                            </div>
                            <div class="alert alert-danger bg-white text-danger text-center" role="alert">
                                Saat anda melakukan Reaktivasi, maka akan mempengaruhi 'Advantage' yang akan anda peroleh kedepannya, pikirkan baik-baik jika akan melakukan reaktivasi dibawah membership anda saat ini.
                            </div>
                        </>
                        :''
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex align-items-end justify-content-between w-100">
                        <div className="form-group mb-0 mt-0">
                            {/* <label>PIN</label>
                            <input type="password" maxLength="6" className={`form-control ${this.state.error.pin!==""?'is-invalid':''}`} name="pin" value={this.state.pin} onChange={(e)=>this.handleChange(e)}/> */}
                            {this.state.step!==1?<button type="submit" className="btn btn-primary mr-2" onClick={(e)=>this.handleStep(e,'prev')} >Kembali</button>:''}
                        </div>
                        <div className="form-group mb-0 mt-0">
                            <button type="button" className="btn btn-warning mr-2" onClick={this.toggle}><i className="ti-close" /> Batal</button>
                            <button type="submit" className="btn btn-primary mr-2" onClick={(e)=>this.handleStep(e,'next')} > {!this.props.isLoadingPost?(this.state.step!==2?'Selanjutnya':'Reaktivasi'):'Loading ......'}</button>
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
