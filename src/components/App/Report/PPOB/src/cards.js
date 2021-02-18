import React,{Component} from 'react'
import {toCurrency} from "helper";
import moment from "moment";
import {Link} from "react-router-dom"

class Cards extends Component {
    render(){
        // let dataID = [];
        return(
            <div>
                {
                    this.props.data.map((v,i)=>{
                        let status='';
                        if(v.status===0){
                            status=<span style={{color:'#ff9800',fontWeight:'800'}}>Dalam antrian</span>;
                        }else if(v.status===1){
                            status=<span style={{color:'black',fontWeight:'800'}}>Transaksi berhasil</span>;
                        }else if(v.status===2){
                            status=<span style={{color:'#f44336',fontWeight:'800'}}>Transaksi gagal/dibatalkan</span>;
                        }
                        return(
                            <div key={i} className="card" style={{borderRadius:"10px",marginBottom:"10px",cursor:'pointer'}} onClick={(e)=>this.props.handleOnClick(e,v.kd_trx)}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <span className={"black"} style={{fontWeight:"normal"}}>{moment(v.created_at).format('DD MMM YYYY HH:mm')}</span>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-9" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                            <p style={{color:"rgb(66, 181, 73)",fontWeight:"900"}}>
                                                <span className={"black"} style={{fontWeight:"bolder"}}>{v.kategori}</span><br/>
                                                ( {v.kd_trx} )
                                            </p>
                                        </div>
                                        <div className="col-md-3" style={{verticalAlign:"left"}}>
                                            <p className={"black"}>
                                                Total Pembayaran <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}>Rp {toCurrency(v.harga)} .-</span><br/>
                                                Lihat Detail Transaksi
                                            </p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-4" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                            <div className="media">
                                                <div style={{height:'70px',width:'70px',marginRight:'20px'}}>
                                                    <img src={v.tipe===0?v.logo:v.icon} className="mr-3 media-thumb" style={{width: '100%', height: '100%', objectFit: 'contain'}} alt="Provider"/>
                                                </div>
                                                <div className="media-body">
                                                    <h5 style={{color:"rgb(66, 181, 73)"}} className="mt-0 font-17 bold">{v.produk}</h5>
                                                    <span style={{color:"black",fontWeight:"bold"}}>No. {v.target}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 style={{color:"rgb(66, 181, 73)"}} className="mt-0 font-17 bold">Status</h5>
                                                    <span style={{color:"rgb(250, 89, 29)",fontWeight:"bold"}}>{status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="media">
                                                <div className="media-body">
                                                    <Link to='/ppob' style={{marginTop:'20px',float:"right",borderRadius:"10px",backgroundColor:"rgb(66, 181, 73)"}} className={"btn btn-primary"}>
                                                        Beli Lagi
                                                    </Link>
                                                </div>
                                            </div>
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