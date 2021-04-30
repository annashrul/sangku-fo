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
                    <h5 className="card-title">Riwayat Penarikan
                    <Link to={'/report/wallet/penarikan'} style={{float:'right',fontSize:'.9em'}}>Lihat Semua</Link>
                    </h5>
                    <div className="row" style={{overflowX:'auto', height:'300px', zoom:'80%'}}>
                        {
                            typeof this.props.list.data === 'object' ? this.props.list.data.length>0?
                                this.props.list.data.map((v,i)=>{
                                    // acc_name: "netindo"
                                    // acc_no: "1234567890"
                                    // amount: "247500"
                                    // bank_name: "BANK BCA"
                                    // charge: "27500"
                                    // created_at: "2021-04-29T17:00:00.000Z"
                                    // full_name: "DEV  AKUN"
                                    // id: "411f6603-3480-4444-ba4d-ea438667f689"
                                    // id_bank: "0f8531d7-a016-46d7-a628-a82ba6697872"
                                    // id_member: "555d0e4a-474e-41f8-8857-f68b5f092ab9"
                                    // kd_trx: "INV/WD/210430/002"
                                    // status: 0
                                    // totalrecords: "1"
                                    // updated_at: "2021-04-29T17:00:00.000Z"
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
                                                        <h6 className="text-dark m-0 p-0">{toRp(v.amount)}</h6>
                                                    </div>
                                                    <div className="text-center">
                                                        <h6 className="text-dark">{v.bank_name}</h6>
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
                                                        <small className="text-muted">Nama</small>
                                                        <h6 className="text-dark m-0 p-0">{v.full_name}</h6>
                                                    </div>
                                                    <div>
                                                        <small className="text-muted">No Akun</small>
                                                        <h6 className="text-dark m-0 p-0">{v.acc_no}</h6>
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