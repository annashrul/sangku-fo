import React,{Component} from 'react'
import {statusQ, toRp, noImage, toCurrency} from "helper";
import moment from "moment";

class Cards extends Component {

    constructor(props) {
        super(props)
    }

    render(){
        let dataID = [];
        return(
            <div>
                {
                    this.props.data.map((v,i)=>{
                        let status='';
                        if(v.status===0){
                            status=<span className={"btn btn-secondary btn-sm bold text-white"}>Menunggu Pembayaran</span>;
                        }else if(v.status===1){
                            status=<span className={"btn btn-warning btn-sm bold text-white"}>Dikemas</span>;

                        }else if(v.status===2){
                            status=<span className={"btn btn-info btn-sm bold"}>Dikirim</span>;

                        }else if(v.status===3){
                            status=<span className={"btn btn-success btn-sm bold"}>Selesai</span>;

                        }else if(v.status===4){
                            status=<span className={"btn btn-danger btn-sm bold"}>Dibatalkan</span>;
                        }
                        return(
                            <div key={i} className="card" style={{borderRadius:"10px",marginBottom:"10px"}}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button className={"btn btn-secondary btn-sm"}>
                                                {v.type===0?'AKTIVASI':'REPEAT ORDER'}
                                            </button>
                                        </div>
                                        <div className="col-md-6">
                                            <span className={"black"} style={{fontWeight:"normal",float:"right",textAlign:"right"}}>{v.resi}</span>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-2" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                            <p style={{color:"rgb(66, 181, 73)",fontWeight:"bold"}}>( {v.kd_trx} )<br/>
                                                <span className={"black"} style={{fontWeight:"normal"}}>{moment(v.created_at).format('LL')}</span><br/>
                                            </p>
                                        </div>
                                        <div className="col-md-3" style={{verticalAlign:"left",borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                            <p className={"black"}>Status<br/>
                                                {status}
                                            </p>
                                        </div>
                                        <div className="col-md-2" style={{verticalAlign:"left",borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                            <p className={"black"}>Total Belanja<br/>
                                                <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}>Rp {toCurrency(v.grand_total)} .-</span>
                                            </p>
                                        </div>
                                        <div className="col-md-5" style={{verticalAlign:"left"}}>
                                            <div className="row">
                                                <div className="col-md-2" style={{display:'flex',justifyContent:'center'}} >
                                                    <img src={v.kurir} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} style={{height:"50px",objectFit:'contain'}}/>
                                                </div>
                                                <div className="col-md-4">
                                                    <p className={"black"}>Layanan<br/>
                                                        <span className={"bold"}>{v.layanan_pengiriman.split("|")[1]}</span>
                                                    </p>
                                                </div>
                                                <div className="col-md-3">
                                                    <p className={"black"}>Metode<br/>
                                                        <span className={"bold"}>{v.metode_pembayaran}</span>
                                                    </p>
                                                </div>
                                                <div className="col-md-3">
                                                    <p className={"black"}>Ongkir<br/>
                                                        <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}>Rp {v.ongkir==='0'?0:toCurrency(v.ongkir)} .-</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    {
                                        (() => {
                                            const rows = [];
                                            for (let val = 0; val < v.detail.length; val++) {
                                                let cardDisplay='none';
                                                let cardTransition='opacity 1s ease-out';
                                                let cardOpacity=0;
                                                if(val===0){
                                                    cardDisplay='block';
                                                    cardOpacity=1;
                                                }else if(this.props.idDetail===v.id&&this.props.isShowDetail){
                                                    cardDisplay='block';
                                                    cardOpacity=1;
                                                }
                                                dataID.push(val);
                                                rows.push(
                                                    <div className="row" key={val} style={{marginBottom:"10px",transition:cardTransition,opacity:cardOpacity}}>
                                                        <div className="col-md-12" style={{display:cardDisplay}}>
                                                            <div className="row">
                                                                <div className="col-md-6" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                                    <div className="media">
                                                                        <img src={v.detail[val].foto} className="mr-3 media-thumb" alt="..."/>
                                                                        <div className="media-body">
                                                                            <h5 style={{color:"rgb(66, 181, 73)"}} className="mt-0 font-17 bold">{v.detail[val].paket}</h5>
                                                                            <span style={{color:"rgb(250, 89, 29)",fontWeight:"bold"}}>Rp {toCurrency(v.detail[val].price)} .- <small style={{marginLeft:"10px"}} className={"black"}>{v.detail[val].qty} Item </small></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <p style={{float:"left"}} className={"black"}>Total Harga<br/>
                                                                        <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}>Rp {toCurrency(parseInt(v.detail[val].price)*parseInt(v.detail[val].qty))} .-</span>
                                                                    </p>
                                                                </div>
                                                                <div className="col-md-3" style={{position:"relative",verticalAlign:"left"}}>
                                                                    <button onClick={(event)=>this.props.handleCart(event,`PAKET-${i}-${val}`,v.detail[val].id_paket,v.detail[val].type)} style={{right:"12px",bottom:"0px",position:"absolute",float:"right",borderRadius:"10px",backgroundColor:"rgb(66, 181, 73)",border:"1px solid rgb(66, 181, 73)"}} className={"btn btn-primary"}>
                                                                        {
                                                                            this.props.idx===`PAKET-${i}-${val}`?this.props.isLoadingPost?(
                                                                                <div className="spinner-border text-white" role="status">
                                                                                    <span className="sr-only">Loading...</span>
                                                                                </div>
                                                                            ):'Beli Lagi':'Beli Lagi'
                                                                        }
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return rows;
                                        })()

                                    }
                                    <hr/>
                                    <div className="row">
                                        <div onClick={(e)=>this.props.toggle(e,btoa(v.kd_trx),'','')} className="col-md-2" style={{cursor:"pointer",color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}>
                                            <i className={"fa fa-eye"} style={{color:'rgba(49, 53, 59, 0.68)'}}/> Lihat Detail Pesanan
                                        </div>
                                        <div onClick={(e)=>this.props.toggleResi(e,v.resi)} className="col-md-2" style={v.resi==='-'?{cursor:"not-allowed",color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}:
                                        {cursor:"pointer",color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}>
                                            <i className={"fa fa-random"} style={{color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}/> Lacak Resi
                                        </div>
                                        <div className="col-md-8" onClick={event => this.props.handleToggleDetail(dataID,v.id)} style={{display:v.detail.length>1?"block":"none",cursor:"pointer",color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}>
                                            <span style={{float:"right"}}>
                                                {this.props.idDetail===v.id&&this.props.isShowDetail?'Tutup':'Buka'} {v.detail.length-1} Produk Lainnya <i className={`fa ${this.props.idDetail===v.id&&this.props.isShowDetail?'fa-angle-up':'fa-angle-down'}`} style={{color:'rgba(49, 53, 59, 0.68)',fontWeight:"bold"}}/>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default Cards