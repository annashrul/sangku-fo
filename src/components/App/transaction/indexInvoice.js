import React, { Component } from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {toRp} from "../../../helper";
import {getInvoice} from "../../../redux/actions/product/checkout.action";
import moment from 'moment';
import FormUploadBuktiTransfer from '../modals/member/form_upload_bukti_transfer';
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
class IndexInvoice extends Component{
    constructor(props){
        super(props);
        this.handleModal = this.handleModal.bind(this);
    }

    componentWillMount(){
        this.props.dispatch(getInvoice());
    }

    handleModal(e){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormUploadBuktiTransfer"));
    }
    render(){
        // acc_name: "PT Sangku"
        // acc_no: "321232112"
        // bank_name: "BCA"
        // grand_total: "178000"
        // kd_trx: "INV/SL/201222/012"
        // kd_unique: 778
        // limit_tf: "2020-12-23T08:57:38.000Z"
        return(
            <Layout page="Invoice">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6 pb-4">
                                <div className="media align-items-center">
                                    <div className="card-body-login mb-30">
                                        <img src={"http://ptnetindo.com/dev/assets/img/logo2.png"} alt=""/>
                                    </div>
                                </div>

                                <div className="mb-1 font-15">Office 154, 330 North Brand Boulevard</div>
                                <div className="mb-1 font-15">Glendale, CA 91203, USA</div>
                                <div className="font-15">+0 (123) 456 7891, +9 (876) 543 2198</div>

                            </div>

                            <div className="col-sm-6 text-right pb-4">

                                <h6 className="font-15 mb-3">INVOICE #{this.props.resCheckout.kd_trx}</h6>
                                <div className="mb-1 font-15">Date: <strong className="font-weight-semibold">{moment().format('LL')}</strong></div>
                                <div className="font-15">Due date: <strong className="font-weight-semibold">{moment(this.props.resCheckout.limit_tf).format('LL')}</strong></div>

                            </div>
                        </div>

                        <hr className="mb-4"/>

                        <div className="row d-flex justify-content-between">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-12 text-center" style={{marginBottom:"10px"}}>
                                        <span className="font-17 text-dark mb-0 font-weight-bold">Silahkan Transfer Tepat Sebesar :</span>
                                    </div>

                                    <div className="col-12 text-center" style={{marginBottom:"10px"}}>
                                        <button className="btn btn-success btn-lg btn-block">Rp {toRp(parseInt(this.props.resCheckout.grand_total,10)+parseInt(this.props.resCheckout.kd_unique,10))} .-</button>
                                    </div>
                                    <div className="col-12 text-center" style={{marginBottom:"10px"}}>
                                        <span className="font-17 text-dark mb-0 font-weight-bold">Pembayaran Dapat Dilakukan Ke Rekening Berikut : </span>
                                    </div>
                                    <div className="col-12 container" style={{marginBottom:"10px"}}>
                                        <div className="row justify-content-center">
                                            <div className="col-12 text-center">
                                                <div className="card" style={{backgroundColor:'#EEEEEE'}}>
                                                    <div className="card-body">
                                                        <div className="single-smart-card d-flex justify-content-between">
                                                            <div className="text-left">
                                                                <h5>{this.props.resCheckout.bank_name}</h5>
                                                                <p>{this.props.resCheckout.acc_name} <br/> {this.props.resCheckout.acc_no}</p>
                                                            </div>
                                                            <div className="icon">
                                                                <i className={`fa fa-check font-40 text-primary`}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <p className="text-center">
                                    <strong>VERIFIKASI PENERIMAAN TRANSFER ANDA AKAN DIPROSES SELAMA 5-10 MENIT</strong>
                                </p>
                                <hr/>
                                <p className="text-center">
                                    Anda dapat melakukan transfer menggunakan ATM, Mobile Banking atau SMS Banking dengan memasukan kode bank <b style={{color:"#5d78ff",fontWeight:"bold"}}>{this.props.resCheckout.tf_code}</b> di depan No.Rekening atas nama <b style={{color:"#5d78ff",fontWeight:"bold"}}>{this.props.resCheckout.acc_name}</b>
                                </p>
                                <hr/>
                                <p className="text-center">
                                    Mohon transfer tepat hingga 3 digit terakhir ( <b style={{color:"#5d78ff",fontWeight:"bold"}}> {this.props.resCheckout.kd_unique} </b> ) agar tidak menghambat proses verifikasi
                                </p>
                                <hr/>
                                <p className="text-center">
                                    Pastikan anda transfer sebelum tanggal <b style={{color:"#5d78ff",fontWeight:"bold"}}>{moment(this.props.resCheckout.limit_tf).format('LL')}</b> atau transaksi anda otomatis dibatalkan oleh sistem. jika sudah melakukan transfer segera kirim/upload bukti transfer dengan mengklik tombol upload dibawah atau juga anda bisa melakukannya di halaman detail riwayat transaksi
                                </p>
                                <button disabled={this.props.resCheckout.payment_slip!=='-'} onClick={this.handleModal} type="button" className="btn btn-primary btn-block ml-2 mb-2"><i className="fa fa-upload"/><br/> Upload Bukti Transfer</button>
                            </div>
                        </div>

                    </div>
                </div>
                {
                    this.props.isOpen===true?<FormUploadBuktiTransfer/>:null
                }
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        isOpen:state.modalReducer,
        resCheckout:state.checkoutReducer.data
    }
}
export default connect(mapStateToProps)(IndexInvoice);