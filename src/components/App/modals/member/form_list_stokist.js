import React,{Component} from 'react';
import {ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {ModalToggle} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
// import {ToastQ} from "helper";
import WrapperModal from "../_wrapper.modal";
import Spinner from 'Spinner'
// import Default from 'assets/default.png'
import Skeleton from 'react-loading-skeleton';
import {toRp} from 'helper';

class FormListStokist extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
        };
    }

    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
    };
    render(){
        return (
            <div>
            <WrapperModal className="custom-map-modal" isOpen={this.props.isOpen && this.props.type === "FormListStokist"} size="lg">
                <ModalHeader toggle={this.toggle}>Daftar Stokist</ModalHeader>
                <ModalBody>
                    <div className="text-center">{this.props.isLoading?<Spinner/>:''}</div>
                    <div className="row">
                    {
                        !this.props.isLoading?(
                            (
                                typeof this.props.resData.data === 'object' ? this.props.resData.data.length>0?
                                    this.props.resData.data.map((v,i)=>{
                                        return(
                                            <div className="col-md-3" key={i}>
                                                <div className="card widget-new-content p-3 box-margin bg-white">
                                                    <div className="widget---stats d-flex align-items-center justify-content-between mb-15">
                                                        <div className="widget---content-text">
                                                        <h6 className="text-uppercase">{v.kode}</h6>
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                <i className={`fa fa-circle text-success font-11 mr-2`}/>&nbsp;<p className="mb-0">{toRp(v.paket)}</p>
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
                        ):(() => {
                                const rows = [];
                                for (let i = 0; i < 9; i++) {
                                    rows.push(
                                        <div className="col-md-3" key={i}>
                                            <div className="card widget-new-content p-3 mr-2 mb-2 bg-white">
                                                <div className="widget---stats d-flex align-items-center justify-content-between mb-15">
                                                    <div className="widget---content-text">
                                                    <h6><Skeleton width="90px"/></h6>
                                                    <p className="mb-0"><Skeleton width="90px"/></p>
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
                                                        &nbsp;<Skeleton width="50px" height="25px"/>
                                                    </div>
                                                    <Skeleton width="80px"/>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return rows;
                            })()
                    }
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
        auth:state.auth,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isLoading:state.pinReducer.isLoading,
        resData:state.pinReducer.data_detail,
    }
}
export default connect(mapStateToProps)(FormListStokist);
