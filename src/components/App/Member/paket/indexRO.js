import React, { Component } from 'react';
import {connect} from "react-redux";
// import Layout from 'components/Layout';
import Skeleton from 'react-loading-skeleton';
import {toCurrency} from "helper";
import {getPaket} from "redux/actions/product/paket.action";
import {getCart, postCart} from "redux/actions/product/cart.action";
import * as Swal from "sweetalert2";
import DetailProduct from "../../modals/product/detail_product"
import {ModalToggle, ModalType} from "../../../../redux/actions/modal.action";
import { FetchAvailablePin } from '../../../../redux/actions/pin/pin.action';

class IndexRO extends Component{
    constructor(props){
        super(props);
        this.handleCart    = this.handleCart.bind(this);
        this.handleDetail    = this.handleDetail.bind(this);
        this.handleGetList    = this.handleGetList.bind(this);
        this.handleBack    = this.handleBack.bind(this);
        this.state={
            detail:{},
            idx:0,
            toggleView:false,
        }
    }


    componentWillMount(){
        this.props.dispatch(FetchAvailablePin("ro"));
        // this.props.dispatch(getPaket(`page=1&tipe=ro`));
        // this.props.dispatch(getCart());
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
            this.props.dispatch(postCart(data,'b'));
        }else{
            if(localStorage.productType!=='b'){
                Swal.fire({
                    title: 'Perhatian !!!',
                    html: `Terdapat barang Aktivasi didalam keranjang.. <br/>anda yakin akan menghapus barang Aktivasi dan melanjutkan transaksi ???`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: `Ya, hapus & lanjutkan`,
                    cancelButtonText: 'Batal',
                }).then((result) => {
                    if (result.value) {
                        this.props.dispatch(postCart(data,'b'));
                    }

                })
            }else{
                this.props.dispatch(postCart(data,'b'));
            }
        }


    }
    handleDetail(e,id){
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("detailProduct"));
        this.setState({
            detail:{id:id,tipe:'ro'}
        })
    }

    handleGetList(e,id){
        // e.preventDefault()
        // alert(e.target.id);
        if(e.target.id==='toListForm'){
            this.setState({toggleView:true});
            // this.props.dispatch(FetchDetailPin(id));
            // const bool = !this.props.isOpen;
            // this.props.dispatch(ModalToggle(bool));
            // this.props.dispatch(ModalType("FormListStokist"));
            
        this.props.dispatch(getPaket(`page=1&tipe=ro&category=${id}`));
        this.props.dispatch(getCart());
        }
    }
    handleBack(e){
        this.setState({toggleView:false});
    }
    render(){
        const {
            data
        } = this.props.resPaket;
        return(
            <div className="card-body">
                <div className="row" style={{display:this.state.toggleView?'none':''}}>
                        <div className="col-md-12">
                            <p>Silahkan pilih kategori terlebih dahulu dibawah ini, setelah kategori terpilih maka anda dapat memilih paket yang hendak akan anda order sesuai dengan kriteria yang anda inginkan.</p>
                            <div className="row m-1 justify-content-center">
                                {
                                    (
                                        typeof this.props.getPin === 'object' ?
                                            this.props.getPin.map((v,i)=>{
                                                return(
                                                    <div key={i} className="col-sm-5 col-md-4 col-lg-4 col-12 btn btn-outline-dark cursor-pointer w-40 m-2 p-4 text-center text-uppercase shadow-sm rounded" label={v.title} id="toListForm" onClick={(e)=>this.handleGetList(e,String(v.title).toLowerCase())}>
                                                        <img className="img-fluid" src={v.badge} alt="sangqu" style={{height:'100px'}}/>
                                                        <br/>
                                                        <a href={() => false} className="font-24">{`${v.title}`}</a>
                                                        <br/>
                                                        <br/>
                                                    </div>
                                                )
                                            })
                                            : "No data."
                                    )
                                }
                            </div>
                        </div>
                    </div>
                <div className="row" style={{display:!this.state.toggleView?'none':''}}>
                    <button className="btn btn-secondary my-2" onClick={(e)=>this.handleBack(e)}><i className="fa fa-chevron-left"/> KEMBALI KE KATEGORI</button>
                    {
                        !this.props.isLoading?typeof data==='object'?data.length>0?data.map((v,i)=>{
                            return (
                                <div className="col-md-12">
                                    <div className="row p-2 bg-white border rounded">
                                        <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" src={v.foto} alt="sangqu" style={{width:"100%",height:"150px",objectFit:'contain'}}/></div>
                                        <div className="col-md-6 mt-1">
                                            <h5 className={"txtGreen bold"}>{v.title}</h5>
                                            <div className="d-flex flex-row align-items-center">
                                                <h4 className="mr-1 txtRed bold">Rp {toCurrency(v.harga)} .-</h4>
                                            </div>
                                            <p className="text-justify">{v.deskripsi.length>180?v.deskripsi.substr(0,180)+' ...':v.deskripsi}</p>
                                        </div>
                                        <div className=" col-md-3 border-left mt-1">
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
        auth: state.auth,
        resPaket:state.paketReducer.data,
        isLoading: state.paketReducer.isLoading,
        isLoadingPost:state.cartReducer.isLoadingPost,
        isOpen:state.modalReducer,
        getPin:state.pinReducer.data_available,
        isLoadingPa:state.pinReducer.isLoading,
    }
}
export default connect(mapStateToProps)(IndexRO);