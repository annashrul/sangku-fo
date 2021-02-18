import React,{Component} from 'react';
import {ModalBody, ModalHeader} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import WrapperModal from "../../_wrapper.modal";
import {ModalToggle} from "redux/actions/modal.action";
import {toCurrency} from '../../../../../helper';
import moment from 'moment'
import {Link} from "react-router-dom"

class PembelianDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
        this.toggle = this.toggle.bind(this);
    }

    // componentWillMount(){
    //     this.props.dispatch(getReportPembelianDetail(this.props.detail.code))
    // }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps.data!=='-'){
    //         console.log('OK');
    //     }
    // }

    toggle(e){
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
     
    };
  

    render(){
        const data = this.props.detail;
        console.log(data.tagihan);
        // const data = this.props.pembelianDetail===undefined?{}:this.props.pembelianDetail;
        let status='';
        if(data.status===0){
            status=<span style={{color:'#ff9800',fontWeight:'800'}}>Dalam antrian</span>;
        }else if(data.status===1){
            status=<span style={{color:'black',fontWeight:'800'}}>Transaksi berhasil</span>;
        }else if(data.status===2){
            status=<span style={{color:'#f44336',fontWeight:'800'}}>Transaksi gagal/dibatalkan</span>;
        }
        return (
            <div>
                <WrapperModal isOpen={this.props.isOpen && this.props.type === "riwayatppobDetail"} size="lg">
                    <ModalHeader toggle={this.toggle}>Detail Transaksi #{data.kd_trx}</ModalHeader>
                    <ModalBody>
                        {
                            !this.props.isLoading?(
                                <div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p>Invoice <br/> <span className="bold txtGreen">{data.kd_trx}</span></p>
                                            <p>Status <br/> <span className="bold txtGreen">{status}</span></p>
                                        </div>
                                        <div className="col-md-5">
                                             <p>Tanggal Pembelian <br/> <span className="bold txtGreen">{moment(data.created_at).format('DD MMM YYYY HH:mm')}</span></p>
                                            <p>Kategori <br/> <span className="bold txtGreen">{data.kategori}</span></p>
                                        </div>
                                        <div className="col-md-3">
                                            <p>
                                              <div className="media">
                                                <div className="media-body">
                                                    <Link to='/ppob' style={{marginTop:'20px',float:"right",borderRadius:"10px",backgroundColor:"rgb(66, 181, 73)"}} className={"btn btn-primary"}>
                                                        Beli Lagi
                                                    </Link>
                                                </div>
                                            </div>
                                            </p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row" style={{marginBottom:"10px"}}>
                                        <div className="col-md-12">
                                            <h6 style={{fonrWeight:900,fontSize:'1.1em'}}>Detail Pembelian</h6>
                                        </div>
                                        <div className="col-md-6" >
                                             <p>Layanan <br/> <span className="bold txtGreen">{data.produk}</span></p>
                                             <p>Nomor <br/> <span className="bold txtGreen">{data.target}</span></p>
                                        </div>
                                        <div className="col-md-6">
                                             <p>Serial Number <br/> <span className="bold txtGreen">{data.token===null||data.token===''||data.token==='-'?'-':data.token}</span></p>
                                             <p>Total Bayar <br/> <span className="bold txtGreen">Rp {toCurrency(data.harga)} .-</span></p>
                                        </div>
                                    </div>
                                    {
                                        data.tagihan!==undefined?
                                            Object.keys(data.tagihan).length > 0 ? (
                                                <div>
                                                    <hr/>
                                                    <div className="row" style={{marginBottom:"10px"}}>
                                                        <div className="col-md-12">
                                                            <h6 style={{fonrWeight:900,fontSize:'1.1em'}}>Detail Tagihan</h6>
                                                        </div>
                                                        <div className="col-md-4" >
                                                            <p>Nomor Pelanggan <br/> <span className="bold txtGreen">{data.tagihan.no_pelanggan}</span></p>
                                                            <p>Nama Pelanggan <br/> <span className="bold txtGreen">{data.tagihan.nama_palanggan}</span></p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <p>Jumlah tagihan <br/> <span className="bold txtGreen">Rp {toCurrency(data.tagihan.tagihan)} .-</span></p>
                                                            <p>Admin <br/> <span className="bold txtGreen">Rp {toCurrency(data.tagihan.admin)} .-</span></p>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <p>Periode <br/> <span className="bold txtGreen">{data.tagihan.periode}</span></p>

                                                        </div>
                                                    </div>

                                                </div>
                                            ):''
                                        : ''
                                    }
                       
                                </div>
                            ):"LOADING ....."
}
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
        isLoading:state.reportPPOBReducer.isLoadingDetail,
        detail:state.reportPPOBReducer.detail,
        // stockReportDetailTransaction:state.stockReportReducer.dataDetailTransaksi,
        // isLoading: state.stockReportReducer.isLoading,
    }
}
// const mapDispatch
export default connect(mapStateToProps)(PembelianDetail);