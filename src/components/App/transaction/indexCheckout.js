import React, { Component } from 'react';
import {connect} from "react-redux";
import {Card, CardBody} from "reactstrap";
import Layout from 'components/Layout';
import {noImage, toRp} from "../../../helper";
import {getCart} from "../../../redux/actions/product/cart.action";
import Swal from "sweetalert2";
import {postCheckout} from "../../../redux/actions/product/checkout.action";
import {detailAlamat, getAlamat} from "../../../redux/actions/member/alamat.action";
import {getKurir} from "../../../redux/actions/product/kurir.action";
import Select from 'react-select'
import {postOngkir} from "../../../redux/actions/product/ongkir.action";
import Skeleton from 'react-loading-skeleton';
import {getBank} from "../../../redux/actions/member/bank.action";

class IndexCheckout extends Component{
    constructor(props){
        super(props);
        this.state={
            kurir:"",
            layanan:"",
            alamat:"",
            metode_pembayaran:'saldo',
            bank:0,
            idBank:'',
            berat:0,
            totBelanja:0,
            totOngkir:0,
            dataCart:[],
            valAlamat:{},
            dataAlamat:[],
            dataKurir:[],
            dataLayanan:[],
            dataBank:[],
            isAlamat:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAlamat = this.handleChangeAlamat.bind(this);
        this.handleChangeKurir = this.handleChangeKurir.bind(this);
        this.handleChangeLayanan = this.handleChangeLayanan.bind(this);
        this.handleChangeBank = this.handleChangeBank.bind(this);
    }
    componentWillMount(){
        if(parseInt(localStorage.totCart,10)<1){
            window.location.href='/product';
        }
        else{
            this.props.dispatch(getAlamat());
            this.props.dispatch(detailAlamat('89e7268f-48cd-437d-99ee-9b8fca4704ef','ismain=true'));
            this.props.dispatch(getCart());
            this.props.dispatch(getKurir());
        }
    }

    componentWillReceiveProps(nextProps){
        let kurir=[];
        let cart=[];
        let layanan=[];
        let bank=[];
        if(nextProps.resKurir.length>0){
            nextProps.resKurir.map((v,i)=>{
                kurir.push({
                    value: v.kurir,
                    label: v.title
                });
            });
            this.setState({dataKurir:kurir});
        }
        if(nextProps.resCart.length>0){
            let totBerat=0;
            nextProps.resCart.map((v,i)=>{
                totBerat=totBerat+(v.berat*v.qty);
                cart.push({
                    "id"        : v.id,
                    "id_member" : v.id_member,
                    "full_name" : v.full_name,
                    "title"     : v.title,
                    "foto"      : v.foto,
                    "kategori"  : v.kategori,
                    "point_volume": v.point_volume,
                    "harga"     : v.harga,
                    "berat"     : v.berat,
                    "type"      : v.type,
                    "qty"       : v.qty,
                    "created_at": v.created_at,
                    "updated_at": v.updated_at,
                    "id_paket"  : v.id_paket
                });
            });
            this.setState({dataCart:cart,berat:totBerat});
        }
        if(typeof nextProps.resAlamat.data === 'object'){
            let alamat=[];
            nextProps.resAlamat.data.map((v,i)=>{
                alamat.push({
                    value: `${v.id}|${v.title}|${v.penerima}|${v.main_address}|${v.kd_prov}|${v.kd_kota}|${v.kd_kec}|${v.no_hp}|${v.ismain}`,
                    label: v.title
                });
            });
            this.setState({dataAlamat:alamat});
        }
        if(!this.state.isAlamat){
            if(nextProps.resDetailAlamat.length===undefined){
                let valAlamat={};
                valAlamat['id']             = nextProps.resDetailAlamat.id;
                valAlamat['title']          = nextProps.resDetailAlamat.title;
                valAlamat['penerima']       = nextProps.resDetailAlamat.penerima
                valAlamat['main_address']   = nextProps.resDetailAlamat.main_address;
                valAlamat['kd_prov']        = nextProps.resDetailAlamat.kd_prov;
                valAlamat['kd_kota']        = nextProps.resDetailAlamat.kd_kota;
                valAlamat['kd_kec']         = nextProps.resDetailAlamat.kd_kec;
                valAlamat['no_hp']          = nextProps.resDetailAlamat.no_hp;
                valAlamat['ismain']         = nextProps.resDetailAlamat.ismain;
                this.setState({valAlamat:valAlamat});
            }
        }
        if(nextProps.resOngkir.length ===undefined){
            if(nextProps.resOngkir.ongkir.length>0){
                nextProps.resOngkir.ongkir.map((v,i)=>{
                    layanan.push({
                        value: `${v.cost}|${v.service}`,
                        label: `${toRp(v.cost)} | ${v.description} | ${v.estimasi}`
                    })
                });
                this.setState({dataLayanan:layanan});
            }
        }
        if(typeof nextProps.resBank.data === 'object'){
            nextProps.resBank.data.map((v,i)=>{
                bank.push({
                    "id": v.id,
                    "bank_name": v.bank_name,
                    "acc_name": v.acc_name,
                    "acc_no": v.acc_no,
                    "tf_code": v.tf_code,
                    "isSelected":false,
                });
            });

            this.setState({dataBank:bank,idBank:nextProps.resBank.data[0].id});
        }
    }
    handleChecked(event){
        let column=event.target.name;
        if(column==='saldo'){
            this.setState({metode_pembayaran:'saldo'});
        }
        if(column==='transfer'){
            this.props.dispatch(getBank());
            this.setState({metode_pembayaran:'transfer'});
        }
    }
    handleChange(event){
        let col = event.target.name;
        let val = event.target.value;

        this.setState({[col]: val});

    }
    handleChangeAlamat(val){
        let alamat      = val.value.split("|");
        let valAlamat   = {};
        valAlamat['id']         = alamat[0];
        valAlamat['title']      = alamat[1];
        valAlamat['penerima']   = alamat[2];
        valAlamat['main_address']=alamat[3];
        valAlamat['kd_prov']    = alamat[4];
        valAlamat['kd_kota']    = alamat[5];
        valAlamat['kd_kec']     = alamat[6];
        valAlamat['no_hp']      = alamat[7];
        valAlamat['ismain']     = alamat[8];
        this.setState({
            alamat      : alamat[0],
            valAlamat   : valAlamat,
            isAlamat    : true,
        })
    }
    handleChangeKurir(val){
        this.props.dispatch(postOngkir({
            "ke"    :this.state.valAlamat.kd_kec,
            "berat" :this.state.berat,
            "kurir" :val.value
        }));

        this.setState({
            totOngkir   : 0,
            kurir       : val.value,
            layanan:''
        })
    }
    handleChangeLayanan(val){
        this.setState({
            layanan     : val.value.split("|")[1],
            totOngkir   : parseInt(val.value.split("|")[0],10)
        })
    }
    handleChangeBank(e,i,id){
        e.preventDefault();
        this.setState({bank:i,idBank:id});
    }
    handleSubmit(e){
        e.preventDefault();
        let data={
            "ongkir"                : this.state.totOngkir,
            "layanan_pengiriman"    : `${this.state.kurir}|${this.state.layanan}`,
            "type"                  : 0,
            "alamat"                : this.state.valAlamat.id,
            "metode_pembayaran"     : this.state.metode_pembayaran,
            "id_bank_destination"   : this.state.metode_pembayaran==='saldo'?'-':this.state.idBank
        };
        console.log(data);
        Swal.fire({
            title   : 'Perhatian !!!',
            html    :`Apakah anda yakin akan melanjutkan proses transaksi ??`,
            icon    : 'warning',
            showCancelButton: true,
            confirmButtonColor  : '#3085d6',
            cancelButtonColor   : '#d33',
            confirmButtonText   : `Oke, bayar`,
            cancelButtonText    : 'Batal',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(postCheckout(data));
            }
        })


    }

    render(){
        let {totOngkir,totBelanja,valAlamat} = this.state;
        return(
            <Layout page="Checkout">
                <Card>
                    <CardBody>
                        <div className="row">
                            <div className="col-md-8  box-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="check-out-area">
                                            <div className="col-md-12 col-xl-12 box-margin">
                                                <div className="row">
                                                    <div className="col-9 col-xs-9 col-md-9">
                                                        <div className="single-contact-area d-flex">
                                                            <div>
                                                                <h4 className="mb-1 font-18">{valAlamat.penerima}</h4>
                                                                <p className="mb-10 text-dark font-weight-bold font-12 text-primary">
                                                                    <span className={"badge badge-success"}>{valAlamat.title}</span>
                                                                </p>
                                                                <div className="contact-address mt-15">
                                                                    <p className="mb-2 font-weight-bold font-11">
                                                                        {valAlamat.main_address}
                                                                    </p>
                                                                    <p className="mb-0 font-weight-bold font-11">{valAlamat.no_hp}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-3 col-xs-3 col-md-3 text-right">
                                                        <Select
                                                            options={this.state.dataAlamat} placeholder="Alamat Lain"
                                                            onChange={this.handleChangeAlamat}
                                                            value={this.state.dataAlamat.find(op => {return op.value === this.state.alamat})}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card" style={{marginTop:"10px",marginBottom:"10px"}}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Kurir</label>
                                                    <Select
                                                        options={this.state.dataKurir} placeholder="Pilih Kurir"
                                                        onChange={this.handleChangeKurir}
                                                        value={this.state.dataKurir.find(op => {return op.value === this.state.kurir})}
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Layanan</label>
                                                    {
                                                        !this.props.isLoadingOngkir?(
                                                            <Select
                                                                options={this.state.dataLayanan} placeholder="Pilih Layanan"
                                                                onChange={this.handleChangeLayanan}
                                                                value={this.state.dataLayanan.find(op => {return op.value === this.state.layanan})}
                                                            />
                                                        ):(
                                                            <Skeleton height={37}/>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="card" style={{marginBottom:"10px"}}>
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Metode Pembyaran</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <input name="saldo" type="checkbox" checked={this.state.metode_pembayaran==='saldo'} onChange={this.handleChecked}/>
                                                    <label className="cr">Saldo</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <input name="transfer" type="checkbox" checked={this.state.metode_pembayaran==='transfer'} onChange={this.handleChecked}/>
                                                    <label className="cr">Transfer</label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="card" style={this.state.metode_pembayaran==='transfer'?{display:'block',opacity:'1',animation:' fadeIn 2s'}:{animation:' fadeIn 1s',display:'none',transition:' opacity 1s easeOut',opacity:'0'}}>
                                    <div className="card-body">
                                        <div className="row">
                                            {
                                                !this.props.isLoadingBank?this.state.dataBank.length>0?this.state.dataBank.map((v,i)=>{
                                                    return (

                                                        <div key={i} className="col-md-6" onClick={(event)=>this.handleChangeBank(event,i,v.id)}>
                                                            <div className="card" style={this.state.bank===i?{backgroundColor:'#EEEEEE'}:{backgroundColor:'transparent'}}>
                                                                <div className="card-body">
                                                                    <div className="single-smart-card d-flex justify-content-between">
                                                                        <div className="text">
                                                                            <h5>{v.bank_name}</h5>
                                                                            <p>{v.acc_name} <br/> {v.acc_no}</p>
                                                                        </div>
                                                                        <div className="icon">
                                                                            <i className={`fa ${this.state.bank===i?'fa-check':'fa-angle-double-right'} font-40 text-primary`}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }):"":(
                                                    <div className="col-md-6">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="single-smart-card d-flex justify-content-between">
                                                                    <div className="text">
                                                                        <h5><Skeleton/> </h5>
                                                                        <p><Skeleton/> <br/> <Skeleton/></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4 box-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="card-title mb-0">Ringkasan Belanja</span>
                                            <span className="badge badge-primary font-14 badge-pill">{this.props.resCart.length}</span>
                                        </h4>
                                        <ul className="list-group mb-3">
                                            {
                                                this.state.dataCart.map((v,i)=>{
                                                    totBelanja = totBelanja+(parseInt(v.qty,10)*parseInt(v.harga,10));
                                                    return (
                                                        <li key={i} className="list-group-item d-flex justify-content-between lh-condensed">
                                                            <div>
                                                                <div className="checkout-thumb mb-10">
                                                                    <img src={noImage()} alt="Product"/>
                                                                </div>
                                                                <h6 className="mb-0 font-14">{v.title}</h6>
                                                            </div>
                                                            <span className="font-weight-bold text-success text-right">{v.qty} X {toRp(v.harga)}
                                                                <hr/> {toRp(parseInt(v.qty,10)*parseInt(v.harga,10))}
                                                            </span>
                                                        </li>
                                                    );
                                                })
                                            }


                                        </ul>

                                        <ul className="list-group mb-3">
                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                <span className="font-weight-bold text-dark text-left">TOTAL BELANJA</span>
                                                <span className="font-weight-bold text-success text-right">{toRp(totBelanja)}</span>
                                            </li>

                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                <span className="font-weight-bold text-dark text-left">TOTAL ONGKOS KIRIM</span>
                                                <span className="font-weight-bold text-success text-right">{toRp(totOngkir)}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                <span className="font-weight-bold text-dark text-left">YANG HARUS DIBAYAR</span>
                                                <span className="font-weight-bold text-success text-right">{toRp(totBelanja+totOngkir)}</span>
                                            </li>

                                        </ul>

                                        <button className={"btn btn-primary btn-block"} onClick={this.handleSubmit} disabled={
                                            this.props.resCart.length<1||this.state.kurir===''||this.state.layanan===''
                                        }>Bayar</button>


                                    </div>
                                </div>
                            </div>


                        </div>
                    </CardBody>
                </Card>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        resCart:state.cartReducer.data,
        isLoading: state.cartReducer.isLoading,
        isLoadingPost:state.checkoutReducer.isLoadingPost,
        isLoadingOngkir:state.ongkirReducer.isLoading,
        isLoadingBank:state.bankReducer.isLoading,
        isError: state.checkoutReducer.isError,
        resAlamat:state.alamatReducer.data,
        resDetailAlamat:state.alamatReducer.detail,
        resKurir:state.kurirReducer.data,
        resOngkir:state.ongkirReducer.data,
        resBank:state.bankReducer.data,
    }
}
export default connect(mapStateToProps)(IndexCheckout);