import React,{Component} from 'react';
import {ModalBody, ModalHeader} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import WrapperModal from "../../_wrapper.modal";
import {ModalToggle} from "redux/actions/modal.action";
import { statusQ, toRp } from '../../../../../helper';
import moment from 'moment'
import Preloader from 'Preloader'
class PembelianCekResi extends Component{
    constructor(props){
        super(props);
        this.state = {
            list_pin:[]
        }
        this.toggle = this.toggle.bind(this);
        this.getListPin = this.getListPin.bind(this);
    }
    toggle(e){
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        localStorage.removeItem("code");
        localStorage.removeItem("barcode");
        localStorage.removeItem("name");
    };
    getListPin(e,data){
        e.preventDefault();
        this.setState({list_pin:data});
    }

    render(){
        console.log("this.props.pembelianCekResi",this.props.pembelianCekResi)
        const data = this.props.pembelianCekResi===undefined?{}:this.props.pembelianCekResi;
        const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        return (
            <div>
                <WrapperModal isOpen={this.props.isOpen && this.props.type === "pembelianCekResi"} size="lg">
                    <ModalHeader toggle={this.toggle}>Status Pengiriman</ModalHeader>
                    {Object.keys(this.props.pembelianCekResi).length!==0?
                    <ModalBody>
                        <div className="img-thumbnail mb-3">
                            <div className="row">
                                <div className="col-md-10 offset-md-1">
                                    <div style={{overflowX: "auto"}}>
                                        <table className="table table-borderless" width="100%">
                                            <thead className="bg-transparent">
                                                <tr>
                                                    <th className="text-black" style={columnStyle} width="15%"></th>
                                                    <th className="text-black" style={columnStyle} width="25%"></th>
                                                    <th className="text-black" style={columnStyle} width="10%"></th>
                                                    <th className="text-black" style={columnStyle} width="15%"></th>
                                                    <th className="text-black" style={columnStyle} width="25%"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{borderTopStyle:'hidden',padding:'unset'}}>Status</td>
                                                    <td style={{borderTopStyle:'hidden',padding:'unset'}}>: {data.ongkir.delivery_status.status}</td>
                                                    <td style={{borderTopStyle:'hidden',padding:'unset'}}/>
                                                    <td style={{borderTopStyle:'hidden',padding:'unset'}}>Tanggal</td>
                                                    <td style={{borderTopStyle:'hidden',padding:'unset'}}>: {data.ongkir.delivery_status.pod_date}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{borderTopStyle:'hidden',padding:'unset'}}>Penerima</td>
                                                    <td style={{borderTopStyle:'hidden',padding:'unset'}}>: {data.ongkir.delivery_status.pod_receiver}</td>
                                                    <td style={{borderTopStyle:'hidden',padding:'unset'}}/>
                                                    <td style={{borderTopStyle:'hidden',padding:'unset'}}/>
                                                    <td style={{borderTopStyle:'hidden',padding:'unset'}}/>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div style={{overflowX: "auto"}}>
                                    <table className="table table-hover table-bordered">
                                        <thead className="bg-primary">
                                        <tr>
                                            <th className="text-black" style={columnStyle}>No.</th>
                                            <th className="text-black" style={columnStyle}>Manifest Description</th>
                                            <th className="text-black" style={columnStyle}>Manifest Date</th>
                                            <th className="text-black" style={columnStyle}>Manifest Time</th>
                                            <th className="text-black" style={columnStyle}>City Name</th>
                                        </tr>
                                        
                                        </thead>
                                        <tbody>
                                        {
                                            (
                                                typeof data.ongkir.manifest === 'object' ? data.ongkir.manifest.length > 0 ?
                                                    data.ongkir.manifest.map((v,i)=>{
                                                        return (
                                                            <tr key={i}>
                                                                <td style={{textAlign:'center'}}>{i+1}</td>
                                                                <td style={{textAlign:'center'}}>{v.manifest_description}</td>
                                                                <td style={{textAlign:'center'}}>{v.manifest_date}</td>
                                                                <td style={{textAlign:'center'}}>{v.manifest_time}</td>
                                                                <td style={{textAlign:'center'}}>{v.city_name}</td>
                                                            </tr>
                                                        )
                                                    }) : <tr><td colSpan="17">Data Not Available</td></tr> : <tr><td colSpan="17">Data Not Available</td></tr>)
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    :<Preloader/>}
                </WrapperModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        // stockReportCekResiTransaction:state.stockReportReducer.dataCekResiTransaksi,
        // isLoading: state.stockReportReducer.isLoading,
    }
}
// const mapDispatch
export default connect(mapStateToProps)(PembelianCekResi);