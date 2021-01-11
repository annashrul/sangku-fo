import React, { Component } from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {toRp} from "helper";
import {getInvoice} from "redux/actions/product/checkout.action";
import moment from 'moment';
import FormUploadBuktiTransfer from '../modals/member/form_upload_bukti_transfer';
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import {cancelDeposit} from "redux/actions/member/deposit.action";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

class IndexInvoice extends Component{
    constructor(props){
        super(props);
        this.handleModal = this.handleModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillMount(){
        var kdtrx = this.props.match.params.kdtrx
        this.props.dispatch(getInvoice(kdtrx));
    }

    handleModal(e){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormUploadBuktiTransfer"));
    }
    handleCancel(e){
        e.preventDefault();
        Swal.fire({
            title: 'Perhatian !!!',
            html:`Anda yakin akan membatalkan transaksi ini ???`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Oke`,
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(cancelDeposit(
                    {status:2}
                ));
            }

        })
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
                        <div className="row d-flex justify-content-between">
                            <div className="col-md-6 offset-md-3">
                                <div className="row">
                                    <div className="col-12 text-center" style={{marginBottom:"10px"}}>
                                        <span className="font-17 text-dark mb-0 font-weight-bold">Silahkan Transfer Sebesar :</span>
                                    </div>

                                    <div className="col-12 text-center" style={{marginBottom:"10px"}}>
                                        <label className="btn btn-success btn-lg btn-block" style={{fontSize:'2em'}} onClick={(e) => {e.preventDefault();navigator.clipboard.writeText(parseInt(this.props.resCheckout.grand_total,10)+parseInt(this.props.resCheckout.kd_unique,10));Toast.fire({icon: 'success',title: `Data has been copied.`})}}>Rp {toRp(parseInt(this.props.resCheckout.grand_total,10)+parseInt(this.props.resCheckout.kd_unique,10))} .- <i className="fa fa-copy" style={{fontSize:'15px'}}/></label>
                                    </div>
                                    <div className="col-12 text-center" style={{marginBottom:"10px"}}>
                                        <span className="font-17 text-dark mb-0 font-weight-bold">Pembayaran Dapat Dilakukan Ke Rekening Berikut : </span>
                                    </div>
                                    <div className="col-12 container" style={{marginBottom:"10px"}}>
                                        <div className="row justify-content-center">
                                            <div className={"radio list-payment"} >
                                            <img src={this.props.resCheckout.logo} alt={this.props.resCheckout.bank_name}  />
                                            <div className="text-wrapper">
                                            <h5 className="text-title">{this.props.resCheckout.acc_name}</h5>
                                            <div className="text-sm" onClick={(e) => {e.preventDefault();navigator.clipboard.writeText(this.props.resCheckout.acc_no);Toast.fire({icon: 'success',title: `Data has been copied.`})}}>{this.props.resCheckout.acc_no} <i className="fa fa-copy" style={{fontSize:'15px'}}/></div>
                                            </div>
                                        </div>

                                        </div>
                                    </div>
                                </div>
                                <p className="text-center">
                                    <strong>Mohon Transfer sesuai nominal yang tertera, verifikasi memakan waktu 5-10 menit setelah transfer berhasil.</strong>
                                </p>
                                <hr/>
                                <p className="text-center">
                                    Anda dapat melakukan transfer menggunakan ATM, Mobile Banking atau SMS Banking dengan memasukan kode bank <b style={{color:"#5d78ff",fontWeight:"bold"}}>{this.props.resCheckout.tf_code}</b> di depan No.Rekening atas nama <b style={{color:"#5d78ff",fontWeight:"bold"}}>{this.props.resCheckout.acc_name}</b>
                                </p>
                                <hr/>
                                <p className="text-center">
                                    Pastikan anda transfer sebelum tanggal <b style={{color:"#5d78ff",fontWeight:"bold"}}>{moment(this.props.resCheckout.limit_tf).format('LL')}</b> atau transaksi anda otomatis dibatalkan oleh sistem. jika sudah melakukan transfer segera kirim/upload bukti transfer dengan mengklik tombol upload dibawah atau juga anda bisa melakukannya di halaman detail riwayat transaksi
                                </p>
                                <div className="row" style={{marginBottom:'60px'}}>
                                    <div className="col-md-6" style={this.props.resCheckout.payment_slip!=='-'?{display:'none'}:{display:'block'}}> 
                                        <button  onClick={this.handleModal} type="button" className="btn btn-primary btn-block ml-2 mb-2"><i className="fa fa-upload"/><br/> Upload Bukti Transfer</button>
                                    </div>
                                    <div className="col-md-6">
                                        <button onClick={this.handleCancel} type="button" className="btn btn-danger btn-block ml-2 mb-2"><i className="fa fa-close"/><br/> Batalkan Transaksi</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                {
                    this.props.isOpen===true?<FormUploadBuktiTransfer
                        kd_trx={this.props.match.params.kdtrx}
                    />:null
                }
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        isOpen:state.modalReducer,
        resCheckout:state.checkoutReducer.data,
    }
}
export default connect(mapStateToProps)(IndexInvoice);
