import React, { Component } from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {noImage, toRp} from "helper";
import {getCart} from "redux/actions/product/cart.action";
import Swal from "sweetalert2";
import {postCheckout} from "redux/actions/product/checkout.action";
import {detailAlamat, getAlamat} from "redux/actions/member/alamat.action";
import {getKurir} from "redux/actions/product/kurir.action";
import Select from 'react-select'
import {postOngkir} from "redux/actions/product/ongkir.action";
import {getBank} from "redux/actions/member/bank.action";
import {toCurrency} from "../../../helper";
import StickyBox from "react-sticky-box/dist/esnext/index";
import ModalPin from "../modals/modal_pin";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { voucherValidate } from '../../../redux/actions/product/voucher.action';
import moment from 'moment'

class IndexCheckout extends Component{
    constructor(props){
        super(props);
        this.state={
            kurir:"",
            layanan:"",
            alamat:"",
            metode_pembayaran:'saldo',
            bank:0,
            idBank:'-',
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
            dataVoucher:{},
            isVoucher:false,
            voucher:'',
            isLoadingLayanan:false,
            code:0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAlamat = this.handleChangeAlamat.bind(this);
        this.handleChangeKurir = this.handleChangeKurir.bind(this);
        this.handleChangeLayanan = this.handleChangeLayanan.bind(this);
        this.handleChangeBank = this.handleChangeBank.bind(this);
        this.handleSave = this.handleSave.bind(this);
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
            this.props.dispatch(getBank());
        }

    }


    componentDidUpdate(prevProps,prevState){

        if(this.state.valAlamat.title!==prevState.valAlamat.title){
            this.setState({
                totOngkir:0,
                dataLayanan:[],
                kurir:''
            })
            console.log(this.state.valAlamat.title);
            console.log(prevState.valAlamat.title);
        }
    }

    componentWillReceiveProps(nextProps){
        let kurir=[];
        let cart=[];
        let layanan=[];
        let bank=[];
        let saldo=0;
        let isLoadingLayanan=nextProps.isLoadingOngkir;
        if(nextProps.resKurir.length>0){
            kurir=nextProps.resKurir;
            this.setState({dataKurir:kurir});
        }
        if(nextProps.resCart.length>0){
            let totBerat=0;
            saldo = nextProps.resCart[0].saldo;
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
                return null
            });
            this.setState({dataCart:cart,berat:totBerat});
        }
        if(typeof nextProps.resAlamat.data === 'object'){
            // let valAlamat={};
            let addr= nextProps.resAlamat.data[0];
            this.handleChangeAlamat({
                value:`${addr.id}|${addr.title}|${addr.penerima}|${addr.main_address}|${addr.kd_prov}|${addr.kd_kota}|${addr.kd_kec}|${addr.no_hp}|${addr.ismain}`,
                label:addr.title}
            );
            let alamat=[];
            nextProps.resAlamat.data.map((v,i)=>{
                alamat.push({
                    value: `${v.id}|${v.title}|${v.penerima}|${v.main_address}|${v.kd_prov}|${v.kd_kota}|${v.kd_kec}|${v.no_hp}|${v.ismain}`,
                    label: v.title
                });
                return null
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
                layanan = nextProps.resOngkir.ongkir;
                this.handleChangeLayanan({
                    value: `${layanan[0].cost}|${layanan[0].service}`,
                    label: `${toRp(layanan[0].cost)} | ${layanan[0].description} | ${layanan[0].estimasi}`
                });
                this.setState({
                    dataLayanan:layanan,
                });


            }
            else{
                layanan=[];
                isLoadingLayanan=false;
                this.setState({dataLayanan:layanan,isLoadingLayanan:isLoadingLayanan});


            }

        }
        if(typeof nextProps.resBank.data === 'object'){
            bank.push({
                "id":"-",
                "bank_name": "SANQU PAY",
                "acc_name": `sisa saldo and Rp ${toCurrency(saldo)}`,
                "acc_no": "-",
                "tf_code": "-",
                "logo": "https://img.icons8.com/ios/452/wallet--v1.png",
                "isSelected":false,
            })
            nextProps.resBank.data.map((v,i)=>{
                bank.push({
                    "id": v.id,
                    "bank_name": v.bank_name,
                    "acc_name": v.acc_name,
                    "acc_no": v.acc_no,
                    "tf_code": v.tf_code,
                    "logo": v.logo,
                    "isSelected":false,
                });
                return null
            });


            this.setState({dataBank:bank});
        }
        console.log("nextProps.resVoucher.status !== undefined",nextProps.resVoucher.status !== undefined);
        if(nextProps.resVoucher.status !== undefined){
            console.log("nextProps.resVoucher",nextProps.resVoucher);
            let data = {}
            if(nextProps.resVoucher.status===0){
                data['msg'] = 'Voucher sudah terpakai.'
                data['status'] = 'danger'
                data['disc'] = 0
            } else if(nextProps.resVoucher.status===1){
                let dateNow = moment(new Date()).add(1,'d').format('YYYY-MM-DD HH:mm:ss')
                let periodeEndValid = moment(dateNow).isSameOrBefore(moment(nextProps.resVoucher.periode_end).format('YYYY-MM-DD HH:mm:ss'));
                let periodeStartValid = moment(dateNow).isSameOrAfter(moment(nextProps.resVoucher.periode_start).format('YYYY-MM-DD HH:mm:ss'));
                console.log("dNow",dateNow);
                console.log("pEnd",periodeEndValid);
                console.log("pStart",periodeStartValid);
                if(periodeStartValid&&periodeEndValid){
                    data['msg'] = 'Voucher digunakan.'
                    data['status'] = 'success'
                    data['disc'] = nextProps.resVoucher.disc
                }
                else if(!periodeStartValid){
                    data['msg'] = 'Voucher belum dapat dipakai.'
                    data['status'] = 'danger'
                    data['disc'] = 0
                }
                else if(!periodeEndValid){
                    data['msg'] = 'Voucher sudah kadaluarsa.'
                    data['status'] = 'danger'
                    data['disc'] = 0
                }
                // if(moment().diff(moment(nextProps.resVoucher.periode_end))){
                //     console.log('tstdiff',moment(moment(new Date()).format('YYYY-MM-DD')).diff(moment(nextProps.resVoucher.periode_end).format('YYYY-MM-DD')));
                //     console.log('issameorafter',moment(moment(new Date()).format('YYYY-MM-DD')).isSameOrBefore(moment(nextProps.resVoucher.periode_end).format('YYYY-MM-DD')));
                //     console.log('moment now',moment(new Date()).format());
                //     console.log('moment pend',moment(nextProps.resVoucher.periode_end).format());
                // } else {
                //     console.log('tstdifffalse',moment(nextProps.resVoucher.periode_end));
                // }
            }
            console.log('msg data',data);
            this.setState({dataVoucher:data})
        }
    }
    handleChecked(event){
        let column=event.target.name;
        if(column==='saldo'){
            this.setState({metode_pembayaran:'saldo'});
        }
        if(column==='transfer'){
            // this.props.dispatch(getBank());
            this.setState({metode_pembayaran:'transfer'});
        }
    }
    handleChange(event){
        let col = event.target.name;
        let val = event.target.value;
        if(col==='voucher'){
            this.setState({[col]: String(val).toUpperCase()});
        } else {
            this.setState({[col]: val});
        }
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
            alamat      : alamat[1],
            valAlamat   : valAlamat,
            isAlamat    : true,
        })
    }
    handleChangeKurir(val){
        this.setState({
            totOngkir   : 0,
            kurir       : val.kurir,
            layanan:'',
        });
        this.props.dispatch(postOngkir({
            "ke"    :this.state.valAlamat.kd_kec,
            "berat" :this.state.berat,
            "kurir" :val.kurir
        }));
    }
    handleChangeLayanan(val){
        this.setState({
            layanan     : val.value.split("|")[1],
            totOngkir   : parseInt(val.value.split("|")[0],10)
        })
    }
    handleChangeBank(e,i,id){
        this.setState({
            bank:i,
            idBank:id,
            metode_pembayaran:id==='-'?'saldo':'transfer'
        });
    }
    handleSubmit(e){
        e.preventDefault();
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
                const bool = !this.props.isOpen;
                this.props.dispatch(ModalToggle(bool));
                this.props.dispatch(ModalType("modalPin"));
                // this.props.dispatch(postCheckout(data));
            }
        })
    }
    handleSave(num){
        this.setState({
            code:num
        });
        let data={
            "ongkir"                : this.state.totOngkir,
            "layanan_pengiriman"    : `${this.state.kurir}|${this.state.layanan}`,
            // "type"                  : localStorage.productType==='a'?0:1,
            "alamat"                : this.state.valAlamat.id,
            "metode_pembayaran"     : this.state.metode_pembayaran,
            "id_bank_destination"   : this.state.idBank,
            "voucher"               : this.state.isVoucher?this.state.voucher:'-',
            pin_member:num
        };
        if(num.length===6){
            if(!this.state.isVoucher){
                delete data.voucher
            }
            this.props.dispatch(postCheckout(data));

        }
    }
    toggleVoucher = () => {
        this.setState({
            isVoucher: !this.state.isVoucher,
            voucher: '',
            dataVoucher: {},
        });
    }
    checkVoucher(e){
        e.preventDefault();
        if(this.state.voucher!==''){
            this.props.dispatch(voucherValidate(this.state.voucher));
        } else {
            
        }
    }
    render(){
        let {totOngkir,totBelanja,valAlamat,idBank} = this.state;
        return(
            <Layout page="Checkout">
                <div className="row">
                    <div className="col-md-8 box-margin" >
                        <div className="card box-margin">
                            <div className="card-body">
                                {
                                    !this.props.isLoadingAlamat?(
                                        valAlamat.penerima!==undefined?
                                        <>
                                        <div className="row">
                                            <div className="col-6 col-md-8">
                                                <div className="single-contact-area d-flex">
                                                    <div>
                                                        <h4 className="mb-1 font-18">{valAlamat.penerima}</h4>
                                                        <p className="text-dark font-weight-bold font-12 text-primary">
                                                            <button className={"btn btn-success btn-sm"}>{valAlamat.title}</button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 col-md-4">
                                                <Select
                                                    options={this.state.dataAlamat} placeholder="Alamat Lain"
                                                    onChange={this.handleChangeAlamat}
                                                    value={this.state.dataAlamat.find(op => {return op.value === this.state.alamat})}
                                                    />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="contact-address">
                                                    <p className="mb-2 font-weight-bold">
                                                        {valAlamat.main_address}
                                                    </p>
                                                    <p className="mb-0 font-weight-bold">{valAlamat.no_hp}</p>
                                                </div>
                                            </div>
                                        </div>
                                        </>
                                        :
                                        <div className="alert alert-danger bg-white text-danger text-center" role="alert">
                                            Alamat anda masih kosong atau belum tersedia, tambahkan alamat pada halaman <Link to={`/profile`}>Profile <i className="zmdi zmdi-open-in-new"/></Link> anda terlebih dahulu jika hendak akan melanjutkan proses Checkout!
                                        </div>

                                    ):(
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p>
                                                    <Skeleton count={4}/>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="row d-flex">
                            <div className="col-md-5 box-margin" >
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="txtGreen bold">PILIH KURIR {this.props.isLoadingKurir?'loading ..':''}</h4>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div class="outer">
                                                    <div class="inner" style={{display:'flex',flexWrap:'wrap'}}>
                                                        {
                                                            !this.props.isLoadingKurir?this.state.dataKurir.length>0?this.state.dataKurir.map((v,i)=>{
                                                                return(
                                                                    <div key={i} onClick={event=>this.handleChangeKurir(v)} style={{cursor:"pointer",backgroundColor:v.kurir===this.state.kurir?"#00838d":"",flex:"auto",marginRight:'5px',paddingBottom:"5px"}} class="cards card1">
                                                                        <p style={{padding:'0',color:v.kurir===this.state.kurir?"white":""}}>
                                                                            <img src={v.gambar} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} className={"img-circle"} alt="" style={{float:"left",marginRight:"5px",height:"30px",width:'30px',objectFit:'contain'}}/>
                                                                            {v.title}
                                                                        </p>
                                                                        <div className="go-corner" href="#">
                                                                            <div className="go-arrow">
                                                                                <i className={`fa ${v.kurir===this.state.kurir?'fa-check':'fa-arrow-right'}`}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }):"No Data.":(
                                                                <div className="row w-100 pl-3">
                                                                    {
                                                                        (() => {
                                                                            const rows = [];
                                                                            for (let i = 0; i < 9; i++) {
                                                                                rows.push(
                                                                                    <div className="col-md-4 p-0 pr-1">
                                                                                        <Skeleton height={60} style={{width:'100%'}}/>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            return rows;
                                                                        })()
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7 box-margin">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h4 className="txtGreen bold">PILIH LAYANAN </h4>
                                        <div>
                                            {
                                                !this.props.isLoadingOngkir?this.state.dataLayanan.length>0?this.state.dataLayanan.map((v,i)=>{
                                                    return(
                                                        <div onClick={event => this.handleChangeLayanan({
                                                            value: `${v.cost}|${v.service}`,
                                                            label: `${toRp(v.cost)} | ${v.description} | ${v.estimasi}`
                                                        })} key={i} className="media align-items-center" style={{cursor:'pointer',backgroundColor:this.state.layanan===v.service?'#00838d':'',border:'1px solid #00838d',borderRadius:"10px",padding:"10px",marginBottom:"10px"}}>
                                                            <div className="media-body">
                                                                <h3 className={`mb-0 font-12 ${this.state.layanan===v.service?'text-white bold':'text-black'}`} style={{color:this.state.layanan===v.service?'white':'black'}}>
                                                                    <span style={{float:"left"}}>{v.service} | {toRp(v.cost)} | {v.description} | {v.estimasi}</span>
                                                                    {
                                                                        this.state.layanan===v.service?(<span style={{float:"right"}}><i className="text-white fa fa-check"/></span>):null
                                                                    }

                                                                </h3>
                                                            </div>
                                                        </div>
                                                    );
                                                }):<p>Layanan tidak tersedia</p>:<div>
                                                    <div className="spinner-border text-primary ml-10" role="status" aria-hidden="true"/>
                                                    <strong className={"text-black text-center"} style={{position:"absolute",marginLeft:"10px",marginTop:"5px",verticalAlign:"middle"}}>Tunggu sebentar    ...</strong>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Metode Pembayaran</label>
                                        </div>
                                    </div>
                                    {

                                        !this.props.isLoadingBank?this.state.dataBank.length>0?this.state.dataBank.map((v,i)=>{
                                            return(
                                                <div key={i} className="col-md-12" style={{cursor:'pointer',marginBottom:"10px"}} onClick={(event)=>this.handleChangeBank(event,i,v.id)}>
                                                    <div className="card" style={{backgroundColor:v.id===idBank?'#00838d':'',padding:"1px",border:"2px solid #00838d",borderRadius:"10px"}}>
                                                        <div className="card-body" style={{padding:"0!important"}}>
                                                            <div className="media align-items-center">
                                                                <div className="d-inline-block mr-3">
                                                                    <img onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} src={v.logo} alt="" style={{height:"40px"}}/>
                                                                </div>
                                                                <div className="media-body">
                                                                    <h3 className={`mb-2 font-14 ${v.id===idBank?'text-white bold':''}`}>{v.bank_name} {v.acc_no!=='-'?`( ${v.acc_no} )`:''}</h3>
                                                                    <div className={`mb-0 font-14 font-weight-bold ${v.id===idBank?'text-white':''}`}>{v.acc_name}</div>
                                                                </div>
                                                                <div className="pirty-chart"><i className={`fa ${v.id===idBank?'text-white fa-check':'fa-angle-double-right'}`}/></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }):"":""
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                    <StickyBox offsetTop={100} >
                        <div className="card">
                            <div className="card-body">
                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="card-title mb-0">Ringkasan Belanja</span>
                                    <span className="badge badge-primary font-14 badge-pill">{this.props.resCart.length}</span>
                                </h4>
                                <ul className="list-group mb-3">
                                    {
                                        !this.props.isLoading?this.state.dataCart.map((v,i)=>{
                                            totBelanja = totBelanja+(parseInt(v.qty,10)*parseInt(v.harga,10));
                                            return (
                                                <tr key={i} style={{border:"1px solid #EEEEEE"}}>
                                                    <td className="text-left">
                                                        <img src={v.foto} alt="contact-img" title="contact-img" className="round mr-3 product-thumb" />
                                                        <p className="m-0 d-inline-block align-middle font-16">
                                                            <span className="txtGreen bold">{v.title}</span>
                                                            <br/>
                                                            <small className="mr-2">{v.qty} X {toRp(v.harga)} </small>
                                                            <small className="text-right txtRed bold">{toRp(parseInt(v.qty,10)*parseInt(v.harga,10))}</small>
                                                        </p>
                                                    </td>
                                                </tr>
                                            );
                                        }):<Skeleton height={70}/>
                                    }

                                </ul>
                                {
                                    !this.props.isLoading?(
                                        <ul className="list-group mb-3">

                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                <span className="font-weight-bold text-dark text-left">TOTAL BELANJA</span>
                                                <span className="font-weight-bold txtRed text-right">Rp {toRp(totBelanja)} .-</span>
                                            </li>

                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                <span className="font-weight-bold text-dark text-left">TOTAL ONGKOS KIRIM</span>
                                                <span className="font-weight-bold txtRed text-right">Rp {toRp(totOngkir)} .-</span>
                                            </li>
                                            {this.state.dataVoucher.status!==undefined&&this.state.dataVoucher.status==='success'?
                                            <>
                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                <span className="font-weight-bold text-dark text-left">DISKON VOUCHER</span>
                                                <span className="font-weight-bold txtRed text-right">Rp {toRp(Math.round((totBelanja+totOngkir)*(this.state.dataVoucher.disc/100)))} .-</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                <span className="font-weight-bold text-dark text-left">YANG HARUS DIBAYAR</span>
                                                <span className="font-weight-bold txtRed text-right">Rp {toRp(totBelanja+totOngkir-(Math.round((totBelanja+totOngkir)*(this.state.dataVoucher.disc/100))))} .-</span>
                                            </li>
                                            </>
                                            :
                                            <>
                                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                                <span className="font-weight-bold text-dark text-left">YANG HARUS DIBAYAR</span>
                                                <span className="font-weight-bold txtRed text-right">Rp {toRp(totBelanja+totOngkir)} .-</span>
                                            </li>
                                            </>
                                            }

                                        </ul>
                                    ):(
                                        <ul className="list-group mb-3">
                                            <Skeleton height={30}/>
                                            <Skeleton height={30}/>
                                            <Skeleton height={30}/>
                                        </ul>
                                    )
                                }

                                <div className="form-group">
                                <div className="checkbox checkbox-primary d-inline">
                                    <input type="checkbox" name="checkbox-p-1" id="checkbox-p-1" defaultChecked={this.state.isVoucher} onChange={this.toggleVoucher} />
                                    <label htmlFor="checkbox-p-1" className="cr">Punya Voucher?</label>
                                </div>
                                </div>
                                {this.state.isVoucher?
                                <div className="form-group">
                                {/* //     <input type="text" className="form-control" name="voucher" value={this.state.voucher} onChange={this.handleChange} />
                                // </div> */}
                                <div className="input-group">
                                    <input type="text" className="form-control" name="voucher" value={this.state.voucher} onChange={this.handleChange} />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button" onClick={(e)=>this.checkVoucher(e)} disabled={this.props.isLoadingVoucher}>
                                            {this.props.isLoadingVoucher?
                                                <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                <span className="sr-only">Loading...</span>
                                                </>
                                                :
                                                'Pakai'}
                                        </button>
                                    </div>
                                </div>
                                    {this.state.dataVoucher.status!==undefined?
                                    <>
                                    <small className={`text-${this.state.dataVoucher.status}`}>{this.state.dataVoucher.msg}</small>
                                    {/* <br/>
                                    <small className={`text-${this.state.dataVoucher.status}`}>Diskon didapatkan : Rp {toRp(Math.round((totBelanja+totOngkir)*(this.state.dataVoucher.disc/100)))}</small> */}
                                    </>
                                    :''}
                                </div>

                                :''}

                                <button className="btn btn-primary bgGreen" style={{borderRadius:"10px",width:"100%",padding:"10px",fontSize:"20px"}} disabled={
                                    this.props.resCart.length<1||this.state.kurir===''||this.state.layanan===''||(this.state.isVoucher===false?false:!(this.state.isVoucher&&this.state.dataVoucher.status==='success'))
                                } onClick={e=>this.handleSubmit(e)}>
                                    Bayar
                                </button>



                            </div>
                        </div>
                    </StickyBox>
                </div>
                </div>
                <ModalPin isLoading={this.props.isLoadingPost} code={this.state.code} save={this.handleSave} typePage={''}/>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        resCart:state.cartReducer.data,
        isLoading: state.cartReducer.isLoading,
        isLoadingKurir: state.kurirReducer.isLoading,
        isLoadingPost:state.checkoutReducer.isLoadingPost,
        isLoadingOngkir:state.ongkirReducer.isLoading,
        isLoadingBank:state.bankReducer.isLoading,
        isLoadingVoucher:state.voucherReducer.isLoadingVoucher,
        resVoucher:state.voucherReducer.data,
        isError: state.checkoutReducer.isError,
        resAlamat:state.alamatReducer.data,
        isLoadingAlamat:state.alamatReducer.isLoading,
        resDetailAlamat:state.alamatReducer.detail,
        resKurir:state.kurirReducer.data,
        resOngkir:state.ongkirReducer.data,
        resBank:state.bankReducer.data,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(IndexCheckout);