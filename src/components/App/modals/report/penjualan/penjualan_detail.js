import React,{Component} from 'react';
import {ModalBody, ModalHeader} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import WrapperModal from "../../_wrapper.modal";
import {ModalToggle} from "redux/actions/modal.action";
import { statusQ, toRp } from '../../../../../helper';
import moment from 'moment'
class PenjualanDetail extends Component{
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
        console.log("this.props.penjualanDetail",this.props.penjualanDetail)
        const data = this.props.penjualanDetail===undefined?{}:this.props.penjualanDetail;
        const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        return (
            <div>
                <WrapperModal isOpen={this.props.isOpen && this.props.type === "penjualanDetail"} size="lg" style={{maxWidth: '1600px', width: '100%'}}>
                    <ModalHeader toggle={this.toggle}>Detail Penjualan #{data.kd_trx}</ModalHeader>
                    <ModalBody>
                        <div className="img-thumbnail mb-3">
                            <div className="row">
                                <div className="col-md-8 offset-md-2">
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
                                                    <td style={{borderTopStyle:'hidden'}}>Kode Trx</td>
                                                    <td style={{borderTopStyle:'hidden'}}>: {data.kd_trx}</td>
                                                    <td style={{borderTopStyle:'hidden'}}/>
                                                    <td style={{borderTopStyle:'hidden'}}>Sub Total</td>
                                                    <td style={{borderTopStyle:'hidden'}}>: {toRp(data.subtotal)}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{borderTopStyle:'hidden'}}>Nama</td>
                                                    <td style={{borderTopStyle:'hidden'}}>: {data.full_name}</td>
                                                    <td style={{borderTopStyle:'hidden'}}/>
                                                    <td style={{borderTopStyle:'hidden'}}>Ongkir</td>
                                                    <td style={{borderTopStyle:'hidden'}}>: {toRp(data.ongkir)}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{borderTopStyle:'hidden'}}>Metode Pembayaran</td>
                                                    <td style={{borderTopStyle:'hidden'}}>: {data.metode_pembayaran}</td>
                                                    <td style={{borderTopStyle:'hidden'}}/>
                                                    <td style={{borderTopStyle:'hidden'}}>Grand Total</td>
                                                    <td style={{borderTopStyle:'hidden'}}>: {toRp(data.grand_total)}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{borderTopStyle:'hidden'}}>Penerima</td>
                                                    <td style={{borderTopStyle:'hidden'}}>: {data.penerima}</td>
                                                    <td style={{borderTopStyle:'hidden'}}/>
                                                    <td style={{borderTopStyle:'hidden'}}>Resi</td>
                                                    <td style={{borderTopStyle:'hidden'}}>: {data.resi}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{borderTopStyle:'hidden'}}>No HP</td>
                                                    <td style={{borderTopStyle:'hidden'}}>: {data.no_hp}</td>
                                                    <td style={{borderTopStyle:'hidden'}}/>
                                                    <td style={{borderTopStyle:'hidden'}}>Status</td>
                                                    <td style={{borderTopStyle:'hidden'}}>: {data.status===0?statusQ('info','Dikirim'):(data.status===1?statusQ('success','Diterima'):"")}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <div style={{overflowX: "auto"}}>
                                    <table className="table table-hover table-bordered">
                                        <thead className="bg-primary">
                                        <tr>
                                            <th className="text-black" style={columnStyle}>No.</th>
                                            <th className="text-black" style={columnStyle}>Paket</th>
                                            <th className="text-black" style={columnStyle}>Point Volume</th>
                                            <th className="text-black" style={columnStyle}>QTY</th>
                                            <th className="text-black" style={columnStyle}>Harga</th>
                                            <th className="text-black" style={columnStyle}>PPN</th>
                                            <th className="text-black" style={columnStyle}>#</th>
                                        </tr>
                                        
                                        </thead>
                                        <tbody>
                                        {
                                            (
                                                typeof data.detail === 'object' ? data.detail.length > 0 ?
                                                    data.detail.map((v,i)=>{
                                                        return (
                                                            <tr key={i}>
                                                                <td style={{textAlign:'center'}}>{i+1}</td>
                                                                <td style={{textAlign:'center'}}>{v.paket}</td>
                                                                <td style={{textAlign:'center'}}>{v.point_volume}</td>
                                                                <td style={{textAlign:'center'}}>{v.qty}</td>
                                                                <td style={{textAlign:'center'}}>{v.price}</td>
                                                                <td style={{textAlign:'center'}}>{v.ppn}</td>
                                                                <td style={{textAlign:'center'}}><button className="btn btn-primary" type="button" onClick={(e)=>this.getListPin(e,v.list_pin)}>LIHAT PIN</button></td>
                                                            </tr>
                                                        )
                                                    }) : <tr><td colSpan="17">Data Not Available</td></tr> : <tr><td colSpan="17">Data Not Available</td></tr>)
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h5>Daftar PIN</h5>
                                {
                                    (
                                            this.state.list_pin.map((v,i)=>{
                                                return (
                                                    <div key={i} className="card rounded mb-2" style={{borderLeft: '8px solid #fb434a'}}>
                                                        <div className="card-body p-3">
                                                            <div className="media">
                                                                <div className="media-body text-center mr-2" style={{maxWidth: 100, minWidth: 100}}>
                                                                    <h6 className="mb-1 text-muted">Exp. Date</h6><p className="mb-0">{moment(v.exp_date).format('YYYY-MM-DD')}</p>
                                                                </div>
                                                                <div className="media-body text-left" style={{marginLeft: 20}}>
                                                                    <p className="mb-2 text-mute">Kode</p>
                                                                    <h6 className="mb-1 text-black">{v.kode}</h6>
                                                                </div>
                                                                <div className="media-body text-center ml-1" style={{maxWidth: 200, minWidth: 200}}>
                                                                    <h6 className="mb-1 text-dark">Status</h6>
                                                                    <p className="mb-0 text-danger">{v.status===0?statusQ('info','Aktif'):(v.status===1?statusQ('success','Tidak Aktif'):(v.status===3?statusQ('success','Kadaluarsa'):""))}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                    ))
                                }
                            </div>
                        </div>
                    </ModalBody>


                </WrapperModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        // stockReportDetailTransaction:state.stockReportReducer.dataDetailTransaksi,
        // isLoading: state.stockReportReducer.isLoading,
    }
}
// const mapDispatch
export default connect(mapStateToProps)(PenjualanDetail);