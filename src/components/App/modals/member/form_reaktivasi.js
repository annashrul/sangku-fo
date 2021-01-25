import React,{Component} from 'react';
import {Card, CardBody, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {ModalToggle} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
// import File64 from "components/common/File64";
import {ToastQ, toRp} from "helper";
import WrapperModal from "../_wrapper.modal";
import { FetchDetailPin } from 'redux/actions/pin/pin.action';
import Spinner from 'Spinner'
import { Tab, TabPanel, Tabs, TabList } from 'react-tabs';
import { Link } from 'react-router-dom';
import { pinReaktivasi } from '../../../../redux/actions/pin/pin.action';

class FormReaktivasi extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            foto:"",
            pin:'',
            pin_regist:'',
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
            parse['pin_reaktivasi'] = this.props.directPin!==''&&this.props.directPin!==undefined?this.state.pin_regist:JSON.parse(this.state.pin_regist).kode
            this.props.dispatch(pinReaktivasi(parse));
        }
    }
    handleMembership(e,val) {
        e.preventDefault();
        console.log(e.target)
        console.log(val)
        this.setState({pin_regist:''})
        this.props.dispatch(FetchDetailPin(String(val).toLowerCase()));
        // this.setState({
        //     membership: val
        // })
    };
    render(){
        console.log(this.props.pinList==='');
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "FormReaktivasi"} size="md">
                <ModalHeader toggle={this.toggle}>Reaktivasi Membership</ModalHeader>
                <ModalBody>
                    <div className="form-group mb-0">
                        <label>Membership</label>
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
                                <div className="col-md-4">
                                    <TabList>
                                        {
                                            (
                                                typeof this.props.availPin === 'object' ?
                                                    this.props.availPin.map((v,i)=>{
                                                        return(
                                                            <Tab key={i} className="w-100 p-2 text-center cursor-pointer img-thumbnail mb-1" label="Core Courses" onClick={(e) =>this.handleMembership(e,v.title)}>{`${v.title} - ${v.jumlah}`}</Tab>
                                                        )
                                                    })
                                                    : "No data."
                                            )
                                        }
                                    </TabList>
                                </div>
                                <div className="col-md-8">
                                    {
                                        (
                                            typeof this.props.availPin === 'object' ?
                                            this.props.availPin.map((v,i)=>{
                                                return(
                                                    <TabPanel key={i}>
                                                        {
                                                        !this.props.isLoading&&this.props.pinList!==undefined?
                                                            <Card className="bg-primary text-white" style={{display:this.props.pinList===''?'none':''}}>
                                                                <CardBody>
                                                                <div className="form-group">
                                                                    {
                                                                        this.props.pinList.length<=0?
                                                                        <div className="text-center">
                                                                            <p className="text-light">Saat ini anda belum memiliki daftar PIN ini, silahkan order PIN terlebih dahulu.</p>
                                                                            <Link to="/product" className="btn btn-warning" target="_blank"><h6 className="text-light mt-2" >Order PIN</h6></Link>
                                                                        </div>
                                                                        :
                                                                        <div>
                                                                            <label>Daftar PIN {v.title}</label>
                                                                            <select className="form-control" name="pin_regist" defaultValue={this.state.pin_regist} value={this.state.pin_regist} onChange={this.handleChange}>
                                                                                <option value="">==== Pilih PIN  ====</option>
                                                                                {
                                                                                    (
                                                                                        typeof this.props.pinList.data === 'object' ?
                                                                                            this.props.pinList.data.map((w,j)=>{
                                                                                                return(
                                                                                                    <option key={j} value={JSON.stringify(w)}>{w.kode} | {w.paket}</option>
                                                                                                )
                                                                                            })
                                                                                            : "No data."
                                                                                    )
                                                                                }
                                                                            </select>
                                                                            <div className="invalid-feedback" style={this.state.error.pin_regist!==""?{display:'block'}:{display:'none'}}>
                                                                                {this.state.error.pin_regist}
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </CardBody></Card>
                                                            :<Spinner/>
                                                        }
                                                    </TabPanel>
                                                )
                                            })
                                            : "No data."
                                        )
                                    }
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
                            <label>PIN</label>
                            <input type="password" maxLength="6" className={`form-control ${this.state.error.pin!==""?'is-invalid':''}`} name="pin" value={this.state.pin} onChange={(e)=>this.handleChange(e)}/>
                        </div>
                        <div className="form-group mb-0 mt-0">
                            <button type="button" className="btn btn-warning mr-2" onClick={this.toggle}><i className="ti-close" /> Batal</button>
                            <button type="submit" className="btn btn-primary mr-2" onClick={this.handleSubmit} ><i className="ti-save" /> {!this.props.isLoadingPost?'Aktivasi':'Loading ......'}</button>
                        </div>
                    </div>
                </ModalFooter>
            </WrapperModal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isError:state.checkoutReducer.isError,
        isLoadingPost:state.checkoutReducer.isLoadingPost,
        pinList:state.pinReducer.data_detail,
        isLoading:state.pinReducer.isLoading,
    }
}
export default connect(mapStateToProps)(FormReaktivasi);
