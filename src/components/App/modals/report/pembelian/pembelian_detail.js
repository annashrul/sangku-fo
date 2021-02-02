import React,{Component} from 'react';
import {ModalBody, ModalHeader} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import WrapperModal from "../../_wrapper.modal";
import {ModalToggle} from "redux/actions/modal.action";
import {noImage, statusQ, toCurrency, toRp} from '../../../../../helper';
import moment from 'moment'
import {getReportPembelianDetail} from "../../../../../redux/actions/transaction/pembelian.action";

class PembelianDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            list_pin:[],
            isShowPin:false,
            idPaket:'',
            data:{},
        }
        this.toggle = this.toggle.bind(this);
        this.getListPin = this.getListPin.bind(this);
    }

    componentWillMount(){
        this.props.dispatch(getReportPembelianDetail(this.props.detail.code))
    }

    componentWillReceiveProps(nextProps){
        let data={};let detail=[];let listPin=[];
        if(nextProps.pembelianDetail!==undefined){
            let list=nextProps.pembelianDetail;
            list.detail.map((v,i)=>{
                v.list_pin.map((val,key)=>{
                    listPin.push({
                        created_at: val.created_at,
                        exp_date: val.exp_date,
                        id: val.id,
                        id_paket: val.id_paket,
                        kode: val.kode,
                        status: val.status,
                        type: val.type,
                        updated_at: val.updated_at,
                    })
                });

                detail.push({
                    isShow:false,
                    created_at: v.created_at,
                    foto: v.foto,
                    id: v.id,
                    id_member: v.id_member,
                    id_paket: v.id_paket,
                    kd_trx: v.kd_trx,
                    list_pin:listPin,
                    paket: v.paket,
                    point_volume: v.point_volume,
                    ppn: v.ppn,
                    price:v.price,
                    qty: v.qty,
                    updated_at: v.updated_at,
                });
            });
            Object.assign(data,{
                alamat: list.alamat,
                create_resi: list.create_resi,
                created_at: list.created_at,
                detail:detail,
                device_id: list.device_id,
                full_name: list.full_name,
                grand_total: list.grand_total,
                id: list.id,
                id_member: list.id_member,
                kd_trx: list.kd_trx,
                layanan_pengiriman: list.layanan_pengiriman,
                main_address: list.main_address,
                metode_pembayaran: list.metode_pembayaran,
                no_hp: list.no_hp,
                ongkir: list.ongkir,
                penerima: list.penerima,
                resi: list.resi,
                status: list.status,
                subtotal: list.subtotal,
                tgl_terima: list.tgl_terima,
                title: list.title,
                type: list.type,
                updated_at: list.updated_at,
                valid_resi: list.valid_resi,
            })


        }
        this.setState({
            data:data
        })
    }

    toggle(e){
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        localStorage.removeItem("modalDetail");
        localStorage.removeItem("code");
        localStorage.removeItem("barcode");
        localStorage.removeItem("name");
    };
    getListPin(e,data,id){
        e.preventDefault();
        console.log(data);
        this.state.data.detail[id].isShow=!this.state.data.detail[id].isShow;
        // Object.assign(data,{isShow:false});
        // console.log(data);
        this.setState({list_pin:data});
    }

    render(){
        let totalItem=0;
        // const data = this.props.pembelianDetail===undefined?{}:this.props.pembelianDetail;
        const {data}=this.state;

        console.log(this.state.data);
        let status='';
        if(data.status===0){
            status=<span className={"btn btn-secondary btn-sm bold text-white"}>Pesanan Menunggu Pembayaran</span>;
        }else if(data.status===1){
            status=<span className={"btn btn-warning btn-sm bold text-white"}>Pesanan Dikemas</span>;

        }else if(data.status===2){
            status=<span className={"btn btn-info btn-sm bold"}>Pesanan Dikirim</span>;

        }else if(data.status===3){
            status=<span className={"btn btn-success btn-sm bold"}>Pesanan Selesai</span>;

        }else if(data.status===4){
            status=<span className={"btn btn-danger btn-sm bold"}>Pesanan Dibatalkan</span>;
        }
        return (
            <div>
                <WrapperModal isOpen={this.props.isOpen && this.props.type === "pembelianDetail"} size="lg">
                    <ModalHeader toggle={this.toggle}>Detail Pembelian #{data.kd_trx}</ModalHeader>
                    <ModalBody>
                        {
                            !this.props.isLoadingReportDetail?(
                                <div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p>Nomor Invoice <br/> <span className="bold txtGreen">{data.kd_trx}</span></p>
                                            <p>Status <br/> <span className="bold txtGreen">{status}</span></p>
                                            <p>Tanggal Pembelian <br/> <span className="bold txtGreen">{moment(data.created_at).format('LL')}</span></p>
                                        </div>
                                        <div className="col-md-3">
                                            <p>Nama <br/> <span className="bold txtGreen">{data.full_name}</span></p>
                                            <p>Penerima <br/> <span className="bold txtGreen">{data.penerima}</span></p>
                                            <p>No Telepon <br/> <span className="bold txtGreen">{data.no_hp}</span></p>
                                        </div>
                                        <div className="col-md-5">
                                            <p>
                                                {data.layanan_pengiriman!==undefined?data.layanan_pengiriman.split('|')[0]:''} - {data.layanan_pengiriman!==undefined?data.layanan_pengiriman.split('|')[1]:''}
                                                <br/>
                                                No.resi : {data.resi}
                                                <br/>
                                                {data.main_address}
                                            </p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p>Daftar Produk</p>
                                            {
                                                typeof data.detail==='object'?data.detail.length>0?data.detail.map((v,i)=>{
                                                    return(
                                                        <div className="row" key={i} style={{marginBottom:"10px"}}>
                                                            <div className="col-md-6" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                                <div className="media">
                                                                    <img src={v.foto} className="mr-3 media-thumb" alt="..."/>
                                                                    <div className="media-body">
                                                                        <h5 style={{color:"rgb(66, 181, 73)"}} className="mt-0 font-17 bold">{v.paket}</h5>
                                                                        <span className="txtRed bold">Rp {toCurrency(v.price)} .- <small style={{marginLeft:"10px"}} className={"black"}>{v.qty} Item </small></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <p style={{float:"left"}} className={"black"}>Total Harga <br/>
                                                                    <span className="txtRed bold">Rp {toCurrency(parseInt(v.price)*parseInt(v.qty))} .-</span>
                                                                </p>
                                                            </div>
                                                            <div className="col-md-3" style={{position:"relative",verticalAlign:"left"}}>
                                                                <button onClick={(e)=>this.getListPin(e,v.list_pin,i)} style={{right:"12px",bottom:"50%",position:"absolute",float:"right",borderRadius:"10px",backgroundColor:"rgb(66, 181, 73)",border:"1px solid rgb(66, 181, 73)"}} className={"btn btn-primary"}>
                                                                    {v.isShow?'Tutup':'Lihat'} PIN
                                                                </button>
                                                            </div>
                                                            <div className="col-md-12" style={{marginTop:"10px",display:v.isShow?"block":'none',height:'200px',overflow:'auto'}}>
                                                                <table className="table table-hover">
                                                                    <thead>
                                                                    <tr>
                                                                        <th>NO</th>
                                                                        <th>KODE</th>
                                                                        <th>EXPIRED</th>
                                                                        <th>STATUS</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {
                                                                        this.state.list_pin.map((val,key)=>{
                                                                            let stsPin='';
                                                                            if(val.status===0){
                                                                                stsPin='Tersedia';
                                                                            }
                                                                            if(val.status===1){
                                                                                stsPin=<button className="text-white btn btn-success btn-sm">Aktif</button>;
                                                                            }
                                                                            if(val.status===2){
                                                                                stsPin=<button className="text-white btn btn-info btn-sm">Terpakai</button>;
                                                                            }
                                                                            if(val.status===3){
                                                                                stsPin=<button className="text-white btn btn-warning btn-sm">Pending Transaksi</button>;
                                                                            }
                                                                            return(
                                                                                <tr key={key}>
                                                                                    <td>{key+1}</td>
                                                                                    <td>{val.kode}</td>
                                                                                    <td>{moment(val.exp_date).format('LL')}</td>
                                                                                    <td>{stsPin}</td>
                                                                                </tr>
                                                                            );
                                                                        })
                                                                    }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    );
                                                }):"No Data.":"No Data."
                                            }

                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p>Pembayaran</p>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <p>Total Harga ({typeof data.detail==='object'?data.detail.length>0?data.detail.length:0:0} item)</p>
                                                    <p>Total Ongkos Kirim</p>
                                                    <p>Total Bayar</p>
                                                    <p>Metode Pembayaran</p>
                                                </div>
                                                <div className="col-md-8" style={{textAlign:"right"}}>
                                                    <p><span className="bold txtRed">Rp {toCurrency(data.subtotal)} .-</span></p>
                                                    <p><span className="bold txtRed">Rp {toCurrency(data.ongkir)} .-</span></p>
                                                    <p><span className="bold txtRed">Rp {toCurrency(data.grand_total)} .-</span></p>
                                                    <p><span className="bold txtGreen">{data.metode_pembayaran}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
        isLoadingReportDetail:state.pembelianReducer.isLoadingReportDetail,
        pembelianDetail:state.pembelianReducer.data_report_detail,
        // stockReportDetailTransaction:state.stockReportReducer.dataDetailTransaksi,
        // isLoading: state.stockReportReducer.isLoading,
    }
}
// const mapDispatch
export default connect(mapStateToProps)(PembelianDetail);