import React, { Component } from 'react';
import {connect} from "react-redux";
import {Card, CardBody} from "reactstrap";
import Layout from 'components/Layout';
import {noImage, toRp} from "../../../helper";
import {getCart} from "../../../redux/actions/product/cart.action";
import Swal from "sweetalert2";
import {postCheckout} from "../../../redux/actions/product/checkout.action";
class IndexCheckout extends Component{
    constructor(props){
        super(props);
        this.state={
            kurir:"",
            layanan:"",
            alamat:"",
            totBelanja:0,
            totOngkir:0,
            dataKurir:[
                {name:"COD"},
                {name:"JNE"},
                {name:"JNT"},
                {name:"POS"},
                {name:"SICEPAT"},
                {name:"TIKI"},
                {name:"WAHANA"},
            ],
            dataLayanan:[],
            arrLayanan:[
                {COD:[{kurir:"COD",price:0,estimation:"1 hari"}]},
                {JNE:[{kurir:"JNE",price:10000,estimation:"2 hari"},{kurir:"JNE",price:15000,estimation:"1 hari"}]},
                {JNT:[{kurir:"JNT",price:20000,estimation:"2 hari"}]},
                {POS:[{kurir:"POS",price:30000,estimation:"2 hari"}]},
                {SICEPAT:[{kurir:"SICEPAT",price:40000,estimation:"1 hari"}]},
                {TIKI:[{kurir:"TIKI",price:50000,estimation:"2 hari"}]},
                {WAHANA:[{kurir:"WAHANA",price:60000,estimation:"2 hari"}]},
            ],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    UNSAFE_componentWillMount(){
        if(parseInt(localStorage.totCart,10)<1){
            window.location.href='/product';
        }
        else{
            this.props.dispatch(getCart());
        }
    }

    handleChange(event){
        let col = event.target.name;
        let val = event.target.value;
        this.setState({[col]: val});
        let dataLayanan=[];
        if(col==='layanan'){
            this.setState({
                totOngkir:parseInt(val.split('|')[1],10)
            })
        }
        if(col==='kurir'){
            this.state.layanan=val;
            this.state.arrLayanan.map((v,i)=>{
                if(v[val]!==undefined){
                    v[val].map((x,y)=>{
                        dataLayanan.push({kurir:x.kurir,price:x.price,estimation:x.estimation});
                    });
                }
            });
            this.setState({dataLayanan:dataLayanan,totOngkir:dataLayanan[0].price});
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let data={
            "ongkir":this.state.totOngkir,
            "layanan_pengiriman":this.state.layanan,
            "type":0,
            "alamat":"6026afa6-ea09-46dc-aad7-3fb7d8ae4e2f",
            "metode_pembayaran":"saldo",
            "id_bank_destination":"-"
        };
        Swal.fire({
            title: 'Perhatian !!!',
            html:`Apakah anda yakin akan melanjutkan proses transaksi ??`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Oke, bayar`,
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(postCheckout(data));

            }
        })


    }

    render(){
        let {totOngkir,totBelanja} = this.state;
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
                                                                <h4 className="mb-1 font-18">Annashrul Yusuf</h4>
                                                                <p className="mb-10 text-dark font-weight-bold font-12 text-primary">
                                                                    <span className={"badge badge-success"}>Utama</span>
                                                                </p>
                                                                <div className="contact-address mt-15">
                                                                    <p className="mb-2 font-weight-bold font-11">
                                                                        Bandung Trade Mall Blok C1 No.33, Babakan Surabaya, Kiaracondong, Bandung City, West Java 40272

                                                                        netindo.cs@gmail.com

                                                                        (0222) 0534842
                                                                    </p>
                                                                    <p className="mb-0 font-weight-bold font-11">081223165037</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-3 col-xs-3 col-md-3 text-right">
                                                        <button type="button" className="btn btn-primary btn-sm font-11">alamat lain</button>
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
                                                    <select name="kurir" className={"form-control"} defaultValue={this.state.kurir} onChange={this.handleChange}>
                                                        <option value="">==== Pilih Kurir ====</option>

                                                        {
                                                            this.state.dataKurir.map((v,i)=>{
                                                                return (
                                                                    <option key={i} value={v.name}>{v.name}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Layanan</label>
                                                    <select name="layanan" className={"form-control"} defaultValue={this.state.layanan} onChange={this.handleChange}>
                                                        {
                                                            this.state.dataLayanan.map((v,i)=>{
                                                                return (
                                                                    <option key={i} value={`${v.kurir}|${v.price}`}>Rp {toRp(v.price)} - {v.estimation}</option>
                                                                );
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Bank</label>
                                            <select name="bank" className={"form-control"}>
                                                <option value="">bank</option>
                                            </select>
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
                                                this.props.resCart.map((v,i)=>{
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
        isError: state.checkoutReducer.isError,
    }
}
export default connect(mapStateToProps)(IndexCheckout);