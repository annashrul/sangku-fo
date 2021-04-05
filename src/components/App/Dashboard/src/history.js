import moment from 'moment';
import React, {Component} from 'react'
// import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';
import { toRp } from '../../../../helper';

class History extends Component {
    render(){
        
        return(
             <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">
                        Riwayat Transaksi Terbaru
                            <Link to={'/report/riwayat'} style={{float:'right',fontSize:'.9em'}}>Lihat Semua</Link>
                    </h5>
                    <div className="row" style={{overflowX:'auto', height:'300px'}}>
                        {
                            typeof this.props.list === 'object' ? 
                                this.props.list.length>0?
                                    this.props.list.map((v,i)=>{
                                        return(
                                            <div className="col-12" key={i}>
                                                <div className="card rounded mb-2" style={{borderLeft:'8px solid #333'}}>
                                                    <div className="card-body p-3">
                                                        <div className="media">
                                                            <div className="media-body text-center mr-2" style={{maxWidth:'70px',minWidth:'70px'}}>
                                                                <h5 className="mb-1">{moment(v.created_at).format('HH:MM')}</h5>
                                                                <p className="mb-0 text-muted">
                                                                {moment(v.created_at).format('YYYY-DD-MM')}
                                                                </p>
                                                            </div>
                                                            <div className="media-body text-left" style={{marginLeft:'20px'}}>
                                                                <p className="mb-2 text-mute">{v.note}</p>
                                                                <h6 className="mb-1 text-black">{v.kd_trx}</h6>
                                                            </div>
                                                            <div className="media-body text-left ml-1" style={{maxWidth:'100px',minWidth:'100px'}}>
                                                                <h6 className="mb-1 text-success">+ {toRp(v.trx_in)}</h6>
                                                                <p className="mb-0 text-danger">- {toRp(v.trx_out)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :<div className="col-12 text-center mt-2">
                                        Belum ada transaksi.
                                    </div> 
                                :<div className="col-12 text-center mt-2">
                                    Belum ada transaksi.
                                </div>
                        }
                    </div>
                </div>
                </div>

        )
    }
}

export default History;