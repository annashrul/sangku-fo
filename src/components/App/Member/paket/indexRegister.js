import React, { Component } from 'react';
import {connect} from "react-redux";
import Skeleton from 'react-loading-skeleton';
import {noImage, toCurrency} from "helper";
import {getPaket} from "redux/actions/product/paket.action";
import {getCart, postCart} from "redux/actions/product/cart.action";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import DetailProduct from "../../modals/product/detail_product"
import * as Swal from "sweetalert2";


class IndexRegister extends Component{
    constructor(props){
        super(props);
        this.handleCart    = this.handleCart.bind(this);
        this.handleDetail    = this.handleDetail.bind(this);
        this.state={
            detail:{},
            idx:0,
        }
    }

    componentWillMount(){
        this.props.dispatch(getPaket(`page=1&tipe=aktivasi`));
        this.props.dispatch(getCart());
    }

    handleCart(e,i){
        e.preventDefault();
        this.setState({
            idx:i,
        });
        let data={
            "id_paket":this.props.resPaket.data[i].id,
            "qty":1,
            "type":"plus",
        };
        if(localStorage.productType===undefined){
            this.props.dispatch(postCart(data,'a'));
        }else{
            if(localStorage.productType!=='a'){
                Swal.fire({
                    title: 'Perhatian !!!',
                    html: `Terdapat barang RO didalam keranjang.. <br/>anda yakin akan menghapus barang RO dan melanjutkan transaksi ???`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: `Ya, hapus & lanjutkan`,
                    cancelButtonText: 'Batal',
                }).then((result) => {
                    if (result.value) {
                        this.props.dispatch(postCart(data,'a'));

                    }
                })
            }else{
                this.props.dispatch(postCart(data,'a'));
            }
        }


    }
    handleDetail(e,id){
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("detailProduct"));
        this.setState({
            detail:{id:id,tipe:'register'}
        })
    }

    render(){
        console.log(localStorage.productType);

        const {
            data
        } = this.props.resPaket;
        return(
            <div className="card-body">
                <div className="row">
                    {
                        !this.props.isLoading?typeof data==='object'?data.length>0?data.map((v,i)=>{
                            return (
                                    <div className="col-md-12">
                                        <div className="row p-2 bg-white border rounded">
                                            <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" src={v.foto} style={{width:"100%",height:"150px",objectFit:'contain'}}/></div>
                                            <div className="col-md-6 mt-1">
                                                <h5 className={"txtGreen bold"}>{v.title}</h5>
                                                <div className="d-flex flex-row align-items-center">
                                                    <h4 className="mr-1 txtRed bold">Rp {toCurrency(v.harga)} .-</h4>
                                                </div>
                                                <p className="text-justify">{v.deskripsi.length>180?v.deskripsi.substr(0,180)+' ...':v.deskripsi}</p>
                                            </div>
                                            <div className=" col-md-3 border-left mt-1">
                                                <div className="d-flex flex-row align-items-center">
                                                    <h4 className="mr-1"><img style={{width:"30px"}} src={v.badge} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} alt="Product"/></h4><span style={{marginTop:"-5px"}} className="strike-text text-left">{v.kategori}</span>
                                                </div>
                                                <div className="d-flex flex-row align-items-center">
                                                    <p className="mr-1">Point Volume ( {v.point_volume} ) </p>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <button className="btn btn-outline-primary btn-sm" type="button" onClick={(event)=>this.handleDetail(event,v.id)}>Detail</button>
                                                    <button className="btn btn-primary btn-sm mt-2" type="button"  onClick={(event)=>this.handleCart(event,i)}>
                                                        {
                                                            this.state.idx===i?this.props.isLoadingPost?(
                                                                <div className="spinner-border text-white" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                            ):'Keranjang':'Keranjang'
                                                        }
                                                    </button></div>
                                            </div>

                                        </div>
                                    </div>
                            );
                        }) : "" : "":  (()=>{
                            let container =[];
                            for(let x=0; x<8; x++){
                                container.push(
                                    <div className="col-md-12">
                                        <div className="row p-2 bg-white border rounded">
                                            <div className="col-md-3 mt-1"><Skeleton width={'100%'} height={200}/></div>
                                            <div className="col-md-6 mt-1">
                                                <p className="text-justify">
                                                    <Skeleton width={700} height={15}/>
                                                    <br/>
                                                    <Skeleton width={300} height={15}/>
                                                    <br/>
                                                    <Skeleton width={200} height={15}/>
                                                    <br/>
                                                    <Skeleton width={300} height={15}/>
                                                    <br/>
                                                    <Skeleton width={700} height={15}/>
                                                    <br/>
                                                    <Skeleton width={200} height={15}/>
                                                    <br/>
                                                    <Skeleton width={700} height={15}/>
                                                    <br/>
                                                    <Skeleton width={300} height={15}/>
                                                    <br/>
                                                    <Skeleton width={200} height={15}/>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return container;
                        })()
                    }
                </div>
                {
                    this.props.isOpen===true?<DetailProduct
                        detail={this.state.detail}
                    />:null
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        isOpen:state.modalReducer,
        auth: state.auth,
        resPaket:state.paketReducer.data,
        isLoading: state.paketReducer.isLoading,
        isLoadingPost:state.cartReducer.isLoadingPost
    }
}
export default connect(mapStateToProps)(IndexRegister);