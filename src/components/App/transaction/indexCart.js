import React, { Component } from 'react';
import {connect} from "react-redux";
import {Card, CardBody} from "reactstrap";
import Layout from 'components/Layout';
import {noImage, toRp} from "helper";
import {deleteCart, getCart, postCart} from "redux/actions/product/cart.action";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import {NOTIF_ALERT} from "redux/actions/_constants";
import {toCurrency} from "../../../helper";

class IndexCart extends Component{
    constructor(props){
        super(props);
        this.HandleChangeInputValue    = this.HandleChangeInputValue.bind(this);
        this.handleDelete    = this.handleDelete.bind(this);
        this.state={
            res_cart:[],
        }
    }
    UNSAFE_componentWillMount(){
        this.props.dispatch(getCart());
    }
    UNSAFE_componentWillReceiveProps(nextProps){

        let data=[];
        if(nextProps.resCart!==undefined){
            if(nextProps.resCart.length>0){
                console.log("LENGTH CART",nextProps.resCart.length);
                for(let i=0;i<nextProps.resCart.length;i++){
                    data.push({
                        berat: nextProps.resCart[i].berat,
                        created_at: nextProps.resCart[i].created_at,
                        foto: nextProps.resCart[i].foto,
                        full_name: nextProps.resCart[i].full_name,
                        harga: nextProps.resCart[i].harga,
                        id: nextProps.resCart[i].id,
                        id_member: nextProps.resCart[i].id_member,
                        id_paket: nextProps.resCart[i].id_paket,
                        kategori: nextProps.resCart[i].kategori,
                        point_volume: nextProps.resCart[i].point_volume,
                        qty: nextProps.resCart[i].qty,
                        title: nextProps.resCart[i].title,
                        type: nextProps.resCart[i].type,
                        updated_at: nextProps.resCart[i].updated_at,
                    });
                }
            }
        }
        this.setState({res_cart:data});
    }

    HandleChangeInputValue(e,i, qty, param){
        e.preventDefault();
        let column = 'qty';
        let id = param;
        console.log("asasa",id);
        let value = qty;
        if(id==='qtyMin'){
            if(value>1){
                value = parseInt(qty,10)-1
            }
        } else if(id==='qtyPlus'){
            value = parseInt(qty,10)+1
        }
        let res_cart = [...this.state.res_cart];
        res_cart[i] = {...res_cart[i], [column]: value};
        this.setState({ res_cart });
        if(value>0){
            let data={
                "id_paket":res_cart[i].id_paket,
                "qty":1,
                "type":param==='qtyMin'?'min':'plus'
            };
            this.props.dispatch(postCart(data,''));
        }


    }
    handleDelete(e,id){
        e.preventDefault();
        Swal.fire({
            title: 'Perhatian !!!',
            text: "Apakah anda yakin akan menghapus data ini ??",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(deleteCart(id));
            }
        })
    }

    render(){
        // console.log(this.state.res_cart.length);
        // if(this.state.res_cart.length===0){
        //     localStorage.removeItem("productType");
        // }
        let totalCart=0;
        return(
            <Layout page="Keranjang">
                <Card>
                    <CardBody>
                        <div className="row">
                            {
                                localStorage.totCart>"0"?<div className="col-12">
                                    {/* DESKTOP VERSION */}
                                    <div className="table-responsive cart-area d-none d-md-block">
                                        <table className="table table-borderless table-centered mb-0">
                                            <thead className="thead-dark">
                                            <tr>
                                                <th>Barang</th>
                                                <th className="text-center">Harga</th>
                                                <th className="text-center">Jumlah</th>
                                                <th className="text-center">Total</th>
                                                <th className="text-center">Aksi</th>
                                            </tr>
                                            </thead>
                                            <tbody className="text-center">
                                            {
                                                this.state.res_cart.map((v,i)=>{
                                                    let isError='';
                                                    // if(v.qty<1){
                                                    //     v.qty=1;
                                                    //     isError='qty tidak boleh kurang dari 1';
                                                    // }

                                                    totalCart = totalCart+(parseInt(v.harga,10)*parseInt(v.qty,10));
                                                    return (
                                                        <tr key={i}>
                                                            <td className="text-left">
                                                                <img src={v.foto} alt="contact-img" title="contact-img" className="round mr-3 product-thumb" />
                                                                <p className="m-0 d-inline-block align-middle font-16">
                                                                    <span className="txtGreen bold">{v.title}</span>
                                                                    <br/>
                                                                    <small className="mr-2">Kategori : {v.kategori} </small>
                                                                    <small>Berat : {toCurrency(parseInt(v.berat,10)*parseInt(v.qty,10))}</small>
                                                                </p>
                                                            </td>
                                                            <td className={"text-right txtRed bold"}>
                                                                Rp {toCurrency(v.harga)} .-
                                                            </td>
                                                            <td className="text-center">
                                                                <div className="input-group justify-content-center">
                                                                    <div className="input-group-prepend">
                                                                        <button type="button" className="btn btn-outline-dark" id="qtyMin" onClick={(e) => this.HandleChangeInputValue(e, i, v.qty, 'qtyMin')}><i className="fa fa-minus"></i></button>
                                                                    </div>
                                                                    {/* <input type="number" name={"qty"} min="1" value={v.qty} className="form-control" placeholder="Qty" style={{width:" 90px"}} onChange={(e) => this.HandleChangeInputValue(e, i)} readOnly/> */}
                                                                    <span className="border p-2 text-dark" ref={(node) => { if (node) { node.style.setProperty("border-color", "#343a40", "important"); }}}>{v.qty}</span>
                                                                    <div className="input-group-append">
                                                                        <button type="button" className="btn btn-outline-dark" id="qtyPlus" onClick={(e) => this.HandleChangeInputValue(e, i, v.qty, 'qtyPlus')}><i className="fa fa-plus"></i></button>
                                                                    </div>
                                                                </div>
                                                                <small style={{color:'res'}}>{isError}</small>
                                                            </td>
                                                            <td className={"text-right txtRed bold"}>
                                                                Rp {toCurrency(parseInt(v.harga,10)*parseInt(v.qty,10))} .-
                                                            </td>
                                                            <td>
                                                                <button className="action-icon" onClick={(event)=>this.handleDelete(event,v.id)}> <i className="zmdi zmdi-delete"/></button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colSpan={3}>TOTAL BELANJA</td>
                                                <td className={"text-right txtRed bold"}>Rp {toCurrency(totalCart)} .-</td>
                                                <td/>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    {/* DESKTOP VERSION */}

                                    {/* MOBILE VERSION */}
                                    <div className="d-md-none d-block">
                                        {
                                            this.state.res_cart.map((v,i)=>{
                                                let isError='';
                                                return (
                                                    <div className="card shadow-none mb-2">
                                                        <div className="card-body pb-2 p-0 bg-transparent border-bottom">
                                                            <div className="row">
                                                                <div className="col-4">
                                                                    <img src={v.foto} alt="sangqu" title="sangqu" className="round mr-3 product-thumb w-100" />
                                                                </div>
                                                                <div className="col-8">
                                                                    <h5>{v.title}</h5>
                                                                    <h6 className="text-muted">{v.kategori}</h6>
                                                                    <h6 className="text-success">Rp {toCurrency(v.harga)} .-</h6>
                                                                    <div className="d-flex justify-content-between align-items-end">
                                                                        <div>
                                                                            <div className="input-group justify-content-center">
                                                                                <div className="input-group-prepend">
                                                                                    <button type="button" className="btn btn-outline-dark btn-sm" id="qtyMin" onClick={(e) => this.HandleChangeInputValue(e, i, v.qty, 'qtyMin')}><i className="fa fa-minus"></i></button>
                                                                                </div>
                                                                                {/* <input type="number" name={"qty"} min="1" value={v.qty} className="form-control" placeholder="Qty" style={{width:" 90px"}} onChange={(e) => this.HandleChangeInputValue(e, i)} readOnly/> */}
                                                                                <span className="border p-2 text-dark" ref={(node) => { if (node) { node.style.setProperty("border-color", "#343a40", "important"); }}}>{v.qty}</span>
                                                                                <div className="input-group-append">
                                                                                    <button type="button" className="btn btn-outline-dark btn-sm rounded-right" id="qtyPlus" onClick={(e) => this.HandleChangeInputValue(e, i, v.qty, 'qtyPlus')}><i className="fa fa-plus"></i></button>
                                                                                </div>
                                                                                    <button type="button" className="btn btn-danger btn-sm ml-2" id="qtyPlus" onClick={(event)=>this.handleDelete(event,v.id)}><i className="fa fa-trash"></i></button>
                                                                            </div>
                                                                            <small style={{color:'res'}}>{isError}</small>
                                                                        </div>
                                                                        <small className="text-success">Berat : {toCurrency(parseInt(v.berat,10)*parseInt(v.qty,10))}</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                        <div className="d-flex justify-content-between align-items-center">
                                        <h5>Total Belanja</h5>
                                        <h5 className="text-success">Rp {toCurrency(totalCart)} .-</h5>
                                        </div>
                                    </div>
                                    {/* MOBILE VERSION */}
                                    <div className="row mt-4">
                                        <div className="col-sm-6">
                                            <Link to={"/product"} className="btn border d-none d-sm-inline-block btn-link">
                                                <i className="fa fa-arrow-circle-o-left"/> Belanja Lagi
                                            </Link>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="text-sm-right">
                                                <Link to={'/checkout'} className="btn btn-primary">
                                                    Bayar <i className="fa fa-arrow-circle-o-right mr-1"/>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>:<div className={"col-md-12 text-center"}>
                                    <img src={NOTIF_ALERT.NO_DATA} style={{verticalAlign:"middle"}} alt=""/>
                                </div>
                            }


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
        isLoadingPost:state.cartReducer.isLoadingPost
    }
}
export default connect(mapStateToProps)(IndexCart);