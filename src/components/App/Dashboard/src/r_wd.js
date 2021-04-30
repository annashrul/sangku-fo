import moment from 'moment';
import React, {Component} from 'react'
// import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';
import { toRp } from '../../../../helper';

class Rwd extends Component {
    render(){
        return(
             <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">Riwayat Transfer
                    <Link to={'/report/wallet/penarikan'} style={{float:'right',fontSize:'.9em'}}>Lihat Semua</Link>
                    </h5>
                    <div className="row" style={{overflowX:'auto', height:'300px', zoom:'80%'}}>
                        {
                            typeof this.props.list.data === 'object' ? this.props.list.data.length>0?
                                this.props.list.data.map((v,i)=>{
                                return(
                                    <div className="col-12">
                                        <div className="card mb-3 zoom-hover">
                                            <div className="card-body">
                                                <div className="single-widget-timeline mb-2 border-bottom">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h6 className="text-dark mr-1">{v.kd_trx}</h6>
                                                        <h6 className="text-dark ml-1">{moment(v.created_at).format('YYYY-MM-DD HH:mm')}</h6>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <small className="text-muted">Total</small>
                                                        <h5 className="text-dark m-0 p-0">{toRp(v.amount)}</h5>
                                                    </div>
                                                    <div className="text-center">{
                                                                        v.status===0?
                                                                        <span className="btn-info p-1 text-white rounded">Pending</span>:
                                                                        v.status===1?
                                                                        <span className="btn-success p-1 text-white rounded">Selesai</span>:
                                                                        v.status===2?
                                                                        <span className="btn-danger p-1 text-white rounded">Batal</span>:''
                                                                    }
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <small className="text-muted">Potongan</small>
                                                        <h6 className="text-dark m-0 p-0">{toRp(v.charge)}</h6>
                                                    </div>
                                                    <div>
                                                        <small className="text-muted">Admin Bank</small>
                                                        <h6 className="text-dark m-0 p-0">{toRp(v.bank_charge)}</h6>
                                                    </div>
                                                    <div className="text-center">
                                                        <small className="text-muted">{v.bank_name}</small>
                                                        <h6 className="text-dark m-0 p-0">({v.acc_name})</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : <div className="col-12 text-center mt-2">
                                    Belum ada riwayat.
                                </div>
                             : <div className="col-12 text-center mt-2">
                                    Belum ada riwayat.
                                </div>
                            
                        }
                    </div>
                </div>
                </div>

        )
    }
}

export default Rwd;