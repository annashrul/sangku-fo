import React, { Component } from 'react';
import {connect} from "react-redux";
import {Card, CardBody} from "reactstrap";
import Layout from 'components/Layout';
import {toCurrency} from "../../../../helper";
import {getRedeem} from "../../../../redux/actions/product/redeem.action";
import Skeleton from 'react-loading-skeleton';
import {NOTIF_ALERT} from "../../../../redux/actions/_constants";
import {ModalToggle, ModalType} from "../../../../redux/actions/modal.action";
import DetailRedeem from "../../modals/product/detail_redeem";
import 'react-intl-tel-input/dist/main.css';

class IndexRedeem extends Component{
    constructor(props){
        super(props);
        this.state={
            detail:{},
            descLength:200,
            id:""
        }
        this.handleDetail = this.handleDetail.bind(this);
        this.handleChangeLength = this.handleChangeLength.bind(this);
    }

    componentWillMount(){
        this.props.dispatch(getRedeem("page=1"));
    }

    handleDetail(i){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("detailRedeem"));
        this.setState({
            detail:{id:this.props.data.data[i].id}
        })
    }
    handleChangeLength(i){
        // this.props.data.data[i].deskripsi.length
        this.setState({
            id:this.props.data.data[i].id
        });

    }
    render(){
        const {
            data,
            saldo
        } = this.props.data;
        const {descLength,id} = this.state;
        return(
            <Layout page="Redeem">
                <Card>
                    <CardBody>
                        <div className="row">
                            <div className="col-12">

                                {/*<p style={{border:'2px dashed green',padding:"10px",color:"green"}}>POIN ANDA SAAT INI {toCurrency(parseInt(saldo))} POIN</p>*/}
                                <div className="media align-items-center">
                                    <div className="d-inline-block mr-3">
                                        <i className="fa fa-dot-circle-o font-30 text-info"/>
                                    </div>
                                    <div className="media-body">
                                        <div className="mb-0 font-14 font-weight-bold">Poin Anda</div>
                                        <h3 className="mb-2 font-24 txtRed bold">{toCurrency(parseInt(saldo))}</h3>
                                    </div>

                                </div>
                                <div className="row m-b-10">
                                    <div className="col-md-12">
                                        <main>
                                            {
                                                !this.props.isLoading?typeof data==='object'?data.length>0?data.map((v,i)=>{
                                                    let btn='',btnTxt='',isDisable=false;
                                                    if(parseInt(v.stock,10)<1){
                                                        btn='danger';
                                                        btnTxt='STOCK HABIS';
                                                        isDisable=true;
                                                    }
                                                    else if(parseInt(saldo)<parseInt(v.harga)){
                                                        btn='danger';
                                                        btnTxt='POIN TIDAK CUKUP';
                                                        isDisable=true;
                                                    }
                                                    else{
                                                        btn='primary';
                                                        btnTxt='REDEEM';
                                                        isDisable=false;
                                                    }
                                                    let desc='';
                                                    let det;
                                                    if(v.deskripsi.length>descLength){
                                                        desc=`${v.deskripsi.substr(0,descLength)} ..`;
                                                        det= <small style={{cursor:"pointer",color:'green'}} onClick={event => this.handleChangeLength(i)}>selengkapnya</small>;
                                                    }
                                                    else{
                                                        desc=v.deskripsi;

                                                    }
                                                    if(id===v.id){
                                                        desc=v.deskripsi;det='';
                                                    }
                                                    return(
                                                        <article key={i}>
                                                            <div className="box-margin">
                                                                <div className="coupon" style={{
                                                                    borderRadius:"15px",
                                                                    margin:"0 auto",
                                                                    breakInside: 'avoid-column'
                                                                }}>
                                                                    <div className="ribbon-wrapper card">
                                                                        <div className="ribbon ribbon-bookmark ribbon-success">{v.title}</div>
                                                                        <img src={v.gambar} alt="Avatar" style={{width:'100%'}}/>
                                                                        <br/>
                                                                        <h5 className={"text-center"} style={{border:'2px dashed rgb(250, 89, 29)',padding:"10px"}}><b className="txtRed bold">{toCurrency(v.harga)} POIN</b></h5>
                                                                        <p>stock barang {v.stock}</p>
                                                                        <p>{desc} {det}</p>
                                                                        <button onClick={event => this.handleDetail(i)} disabled={isDisable} className={`btn btn-${btn} btn-block`}>{btnTxt}</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </article>
                                                    );
                                                }):<img src={NOTIF_ALERT.NO_DATA} alt=""/>:<img className={"text-center"} src={NOTIF_ALERT.NO_DATA} alt=""/>:
                                                    (()=>{
                                                        let container =[];
                                                        for(let x=0; x<8; x++){
                                                            container.push(
                                                                <article key={x}>
                                                                    <div className="box-margin">
                                                                        <div className="coupon" style={{
                                                                            borderRadius:"15px",
                                                                            margin:"0 auto",
                                                                        }}>
                                                                            <Skeleton width={'100%'} height={(x*10)+200}/>
                                                                            <Skeleton/>
                                                                            <Skeleton/>
                                                                            <Skeleton/>
                                                                        </div>
                                                                    </div>
                                                                </article>
                                                            )
                                                        }
                                                        return container;
                                                    })()
                                            }
                                        </main>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                {
                    this.props.isOpen?<DetailRedeem detail={this.state.detail}/>:null
                }
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        data:state.redeemReducer.data,
        isLoading:state.redeemReducer.isLoading,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(IndexRedeem);