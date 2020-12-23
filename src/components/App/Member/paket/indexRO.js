import React, { Component } from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import Skeleton from 'react-loading-skeleton';
import {noImage, toRp} from "../../../../helper";
import {getPaket} from "../../../../redux/actions/product/paket.action";
import {getCart, postCart} from "../../../../redux/actions/product/cart.action";

class IndexRO extends Component{
    constructor(props){
        super(props);
        this.handleCart    = this.handleCart.bind(this);
    }

    componentWillMount(){
        this.props.dispatch(getPaket(`page=1`));
        this.props.dispatch(getCart());
    }

    handleCart(e,i){
        e.preventDefault();
        console.log(this.props.resPaket.data[i].id);
        let data={
            "id_paket":this.props.resPaket.data[i].id,
            "qty":1
        };
        this.props.dispatch(postCart(data,'a'));
    }

    render(){
        const {
            data
        } = this.props.resPaket;
        return(
            <div className="card-body">
                <div className="row">
                    {
                        !this.props.isLoading?typeof data==='object'?data.length>0?data.map((v,i)=>{
                            return (
                                <div className="col-sm-6 col-lg-6 col-xl-3" key={i}>
                                    <div className="single-product-item mb-30">
                                        <div className="product-card">
                                            <h3 className="product font-16 mb-15">{v.title}</h3>
                                            <a className="product-thumb" href="#!">
                                                <img src={v.foto} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} alt="Product"/>
                                            </a>
                                            <h4 className="product-price">{toRp(v.harga)}</h4>
                                            <div className="badge badge-success badge-pill mb-20">{v.kategori}</div>
                                            <div className="product-sell-info">
                                                <div className="row">
                                                    <div className="col-6 text-center border-right">
                                                        <span className="font-17 text-dark mb-0 font-weight-bold">{v.stock}</span>
                                                        <span className="d-block font-14">Stock</span>
                                                    </div>
                                                    <div className="col-6 text-center">
                                                        <span className="font-17 text-dark mb-0 font-weight-bold">{v.jumlah_pin}</span>
                                                        <span className="d-block font-14">Jumlah PIN</span>
                                                    </div>

                                                </div>
                                            </div>
                                            {v.deskripsi}


                                            <div className="product-buttons">
                                                <a className="btn btn-primary mt-30" href="#" onClick={(event)=>this.handleCart(event,i)}>+ keranjang</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : "" :"":  (()=>{
                            let container =[];
                            for(let x=0; x<8; x++){
                                container.push(
                                    <div className="col-sm-6 col-lg-6 col-xl-3" key={x}>
                                        <div className="single-product-item mb-30">
                                            <div className="product-card">
                                                <h3 className="product font-16 mb-15"><Skeleton/></h3>
                                                <a className="product-thumb" href=""><img src={noImage()} alt="Product"/></a>
                                                <h4 className="product-price"><Skeleton/></h4>
                                                <div className="product-sell-info">
                                                    <div className="row">
                                                        <div className="col-6 text-center border-right">
                                                            <span className="font-17 text-dark mb-0 font-weight-bold"><Skeleton/></span>
                                                            <span className="d-block font-14"><Skeleton/></span>
                                                        </div>
                                                        <div className="col-6 text-center">
                                                            <span className="font-17 text-dark mb-0 font-weight-bold"><Skeleton/></span>
                                                            <span className="d-block font-14"><Skeleton/></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="product-buttons">
                                                    <a className="mt-30" href=""><Skeleton/></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return container;
                        })()
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        resPaket:state.paketReducer.data,
        isLoading: state.paketReducer.isLoading,
        isLoadingPost:state.cartReducer.isLoadingPost
    }
}
export default connect(mapStateToProps)(IndexRO);