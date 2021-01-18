import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import {ModalToggle} from "redux/actions/modal.action";
import WrapperModal from "../_wrapper.modal";
import {getDetailPaket} from "redux/actions/product/paket.action";
import {noImage, toCurrency} from "helper";
import {NOTIF_ALERT} from "redux/actions/_constants";

class DetailProduct extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state= {
            dataBarang: []
        }

    }

    componentWillMount(){
        this.props.dispatch(getDetailPaket(this.props.detail.id));
    }

    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps",nextProps);
        // if(typeof nextProps.data.data==='object'){
            if(nextProps.data.detail.length>0){
                let data=[];
                console.log("abus");
                nextProps.data.detail.map((v,i)=>{
                    data.push(v);
                    return null
                });
                this.setState({dataBarang:data});
            }
        // }
    }

    toggle(e){
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
    };

    render(){
        const columnStyle ={verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};

        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "detailProduct"} size="lg">
                <ModalHeader toggle={this.toggle}>Detail Produk</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="single-product-item mb-30">
                                <div className="product-card">
                                    <h3 className="product font-16 mb-15">{this.props.data.title}</h3>
                                    <a className="product-thumb" href="#!">
                                        <img src={this.props.data.foto} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} alt="Product"/>
                                    </a>
                                    <div className="product-price">
                                        <h4 className="text-green" style={{color:"green"}}>Rp {toCurrency(this.props.data.harga)} .-</h4>
                                    </div>
                                    <div className="product-sell-info">
                                        <div className="row">
                                            <div className="col-6 text-center border-right">
                                                <span className="font-17 text-dark mb-0 font-weight-bold"><img style={{width:"30px"}} src={this.props.data.badge} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} alt="Product"/></span>
                                                <span className="d-block font-14">{this.props.data.kategori}</span>
                                            </div>
                                            <div className="col-6 text-center">
                                                <span className="font-17 text-dark mb-0 font-weight-bold">{this.props.data.point_volume}</span>
                                                <span className="d-block font-14">PV</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <p>{this.props.data.deskripsi}</p>
                        </div>
                        <div className="col-md-12">
                            <div style={{overflowX: "auto"}}>
                                <table className="table table-hover">
                                    <thead className="bg-light">
                                    <tr>
                                        <th className="text-black" style={columnStyle}>No</th>
                                        <th className="text-black" style={columnStyle}>Nama</th>
                                        <th className="text-black" style={columnStyle}>Harga</th>
                                        <th className="text-black" style={columnStyle}>Satuan</th>
                                        <th className="text-black" style={columnStyle}>Qty</th>
                                        <th className="text-black" style={columnStyle}>Berat</th>
                                        <th className="text-black" style={columnStyle}>Stock</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.dataBarang.length > 0 ?
                                            this.state.dataBarang.map((v, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td style={columnStyle}>
                                                            <span className="circle">{i+1}</span>
                                                        </td>
                                                        <td style={columnStyle}>{v.barang}</td>
                                                        <td style={columnStyle}>Rp {toCurrency(v.harga)} .-</td>
                                                        <td style={columnStyle}>{v.satuan}</td>
                                                        <td style={columnStyle}>{toCurrency(v.qty)}</td>
                                                        <td style={columnStyle}>{toCurrency(v.berat)}</td>
                                                        <td style={columnStyle}>{toCurrency(v.stock_barang)}</td>
                                                    </tr>
                                                );
                                            })
                                        : <tr>
                                            <td colSpan={7} style={columnStyle}><img src={NOTIF_ALERT.NO_DATA} alt="sangqu"/></td>
                                        </tr>

                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </ModalBody>

            </WrapperModal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        data:state.paketReducer.detail,
    }
}
export default connect(mapStateToProps)(DetailProduct);