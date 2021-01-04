import React, { Component } from 'react';
import {connect} from "react-redux";
import {Card, CardBody} from "reactstrap";
import Layout from 'components/Layout';
import {noImage, toRp} from "helper";
import {deleteCart, getCart, postCart} from "redux/actions/product/cart.action";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import {NOTIF_ALERT} from "redux/actions/_constants";

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

    HandleChangeInputValue(e,i){
        e.preventDefault();
        let column = e.target.name;
        let value = e.target.value;
        let res_cart = [...this.state.res_cart];
        res_cart[i] = {...res_cart[i], [column]: value};
        this.setState({ res_cart });
        if(value>0){
            let data={
                "id_paket":res_cart[i].id_paket,
                "qty":res_cart[i].qty
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

        return(
            <Layout page="Keranjang">
                <Card>
                    <CardBody>
                        <div className="row">
                            {
                                localStorage.totCart>"0"?<div className="col-12">
                                    <div className="table-responsive cart-area">
                                        <table className="table table-borderless table-centered mb-0">
                                            <thead className="thead-light">
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
                                                    return (
                                                        <tr key={i}>
                                                            <td className="text-left">
                                                                <img src={noImage()} alt="contact-img" title="contact-img" className="round mr-3 product-thumb" />
                                                                <p className="m-0 d-inline-block align-middle font-16">
                                                                    {v.title}
                                                                    <br/>
                                                                    <small className="mr-2"><b>Kategori:</b> {v.kategori} </small>
                                                                    <small><b>Berat:</b> {toRp(parseInt(v.berat,10)*parseInt(v.qty,10))}
                                                                    </small>
                                                                </p>
                                                            </td>
                                                            <td>
                                                                {toRp(v.harga)}
                                                            </td>
                                                            <td>
                                                                <input type="number" name={"qty"} min="1" value={v.qty} className="form-control" placeholder="Qty" style={{width:" 90px"}} onChange={(e) => this.HandleChangeInputValue(e, i)}/>
                                                                <small style={{color:'res'}}>{isError}</small>
                                                            </td>
                                                            <td>
                                                                {
                                                                    toRp(parseInt(v.harga,10)*parseInt(v.qty,10))
                                                                }
                                                            </td>
                                                            <td>
                                                                <button className="action-icon" onClick={(event)=>this.handleDelete(event,v.id)}> <i className="zmdi zmdi-delete"/></button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
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