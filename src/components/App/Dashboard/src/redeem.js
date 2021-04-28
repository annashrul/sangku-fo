import React, {Component} from 'react'
// import Chart from "react-apexcharts";
import { toRp } from '../../../../helper';

class Charts extends Component {
    render(){
        
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        return(
            <>
            <div className="row">
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Rekapitulasi Harian</h5>
                            <h6 className="text-success m-0">Pertumbuhan</h6>
                            <div className="row">
                                <div className="col-md-6">
                                    Kiri
                                </div>
                                <div className="col-md-6">
                                    :  {this.props.list[0].pertumbuhan_kiri}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    Kanan
                                </div>
                                <div className="col-md-6">
                                    :  {this.props.list[0].pertumbuhan_kanan}
                                </div>
                            </div>
                            <h6 className="text-success m-0">Tabungan</h6>
                            <div className="row">
                                <div className="col-md-6">
                                    Kiri
                                </div>
                                <div className="col-md-6">
                                    :  {this.props.list[0].tabungan_kiri}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    Kanan
                                </div>
                                <div className="col-md-6">
                                    :  {this.props.list[0].tabungan_kanan}
                                </div>
                            </div>
                            <h6 className="text-success m-0">Balance</h6>
                            <div className="row">
                                <div className="col-md-6">
                                    Kiri
                                </div>
                                <div className="col-md-6">
                                    :  {this.props.list[0].balance_kiri}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6">
                                    Kanan
                                </div>
                                <div className="col-md-6">
                                    :  {this.props.list[0].balance_kanan}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="text-success m-0">Terpasang (T)</h6>
                                </div>
                                <div className="col-md-6">
                                    :  {this.props.list[0].hak_bonus}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="text-success m-0">Bonus (T x 20.000)</h6>
                                </div>
                                <div className="col-md-6">
                                    :  {this.props.list[0].nominal_bonus}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="text-success m-0">Sisa Plafon</h6>
                                </div>
                                <div className="col-md-6">
                                    :  {toRp(this.props.list[0].sisa_plafon)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION PERGERAKAN BONUS */}
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Pergerakan Bonus</h5>
                                <table className="table table-hover" style={{tableLayout:'fixed',zoom:'85%'}}>
                                <thead className="bg-info">
                                    <tr>
                                        <td width="50%" className="text-light text-center">BONUS</td>
                                        <td width="50%" className="text-light text-center">NILAI</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>PAKET REPEAT ORDER</td>
                                        <td>BASIC</td>
                                    </tr>
                                    <tr>
                                        <td>BONUS RO</td>
                                        <td>Rp. 845.000</td>
                                    </tr>
                                    <tr>
                                        <td>TOTAL BONUS</td>
                                        <td>Rp. 845.000</td>
                                    </tr>
                                    <tr>
                                        <td>ADMIN 10%</td>
                                        <td>Rp. 84.500</td>
                                    </tr>
                                    <tr>
                                        <td>CHARGE BANK</td>
                                        <td>Rp. 6.500</td>
                                    </tr>
                                    <tr>
                                        <td>TOTAL TRANSFER</td>
                                        <td>Rp. 754.000</td>
                                    </tr>
                                    <tr>
                                        <td>STATUS</td>
                                        <td>DIPROSES/DITRANSFER/DITOLAK</td>
                                    </tr>
                                </tbody>
                            </table>
                        
                        </div>
                    </div>
                </div>

                {/* SECTION DIAMOND SHARING */}
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Diamond Sharing</h5>
                                <table className="table table-hover" style={{tableLayout:'fixed',zoom:'85%'}}>
                                <thead className="bg-primary">
                                    <tr>
                                        <td width="33%" className="text-light text-center">KUALIFIKASI</td>
                                        <td width="33%" className="text-light text-center">NILAI</td>
                                        <td width="33%" className="text-light text-center">BONUS</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>DIAMOND</td>
                                        <td>2%</td>
                                        <td>3.435.000</td>
                                    </tr>
                                    <tr>
                                        <td>RED DIAMOND</td>
                                        <td>2%</td>
                                        <td>Rp. 7.650.800</td>
                                    </tr>
                                    <tr>
                                        <td>BLUE DIAMOND</td>
                                        <td>2%</td>
                                        <td>Rp. 0</td>
                                    </tr>
                                    <tr>
                                        <td>MAROON DIAMOND</td>
                                        <td>1%</td>
                                        <td>Rp. 0</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">TOTAL BONUS</td>
                                        <td>Rp. 11.085.800</td>
                                    </tr>
                                    <tr>
                                        <td>ADMIN</td>
                                        <td>10%</td>
                                        <td>Rp. 1.108.580</td>
                                    </tr>
                                    <tr>
                                        <td>CHARGE BANK</td>
                                        <td>6.500</td>
                                        <td>Rp. 6.500</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">TOTAL TRANSFER</td>
                                        <td>Rp. 9.970.720</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">STATUS</td>
                                        <td>DIPROSES/DITRANSFER/DITOLAK</td>
                                    </tr>
                                </tbody>
                            </table>
                        
                        </div>
                    </div>
                </div>

            </div>



             <div className="card h-100 d-none">
                <div className="card-body">
                    <h5 className="card-title">Rekapitulasi 5 Hari Kebelakang</h5>
                    <div className="product-table-area">
                    <div style={{overflowX: "auto", zoom:'80%'}}>
                                <table className="table table-hover table-bordered">
                                    <thead className="bg-light">
                                    <tr>
                                        <th className="text-black bg-secondary" style={columnStyle} rowSpan="3">NO</th>
                                        <th className="text-black bg-secondary" style={columnStyle} rowSpan="3">TANGGAL</th>
                                        <th className="text-light bg-danger" style={columnStyle} rowSpan="1" colSpan="2">PERTUMBUHAN</th>
                                        <th className="text-black bg-warning" style={columnStyle} rowSpan="1" colSpan="2">TABUNGAN</th>
                                        <th className="text-light bg-primary" style={columnStyle} rowSpan="1" colSpan="2">BALANCE</th>
                                        <th className="text-light bg-info" style={columnStyle} rowSpan="3">TERPASANG (T)</th>
                                        <th className="text-light bg-info" style={columnStyle} rowSpan="3">BONUS<br/>(T x {this.props.list!==undefined&&this.props.list.length>0?toRp(this.props.list[0].pairing_bonus):0})</th>
                                    </tr>
                                    <tr>
                                        {/* <th className="text-black" style={columnStyle} rowSpan="2">No</th> */}
                                        <th className="text-light bg-danger" style={columnStyle} rowSpan="2">KIRI</th>
                                        <th className="text-light bg-danger" style={columnStyle} rowSpan="2">KANAN</th>
                                        <th className="text-black bg-warning" style={columnStyle} rowSpan="2">KIRI</th>
                                        <th className="text-black bg-warning" style={columnStyle} rowSpan="2">KANAN</th>
                                        <th className="text-light bg-primary" style={columnStyle} rowSpan="2">KIRI</th>
                                        <th className="text-light bg-primary" style={columnStyle} rowSpan="2">KANAN</th>
                                        {/* <th className="text-light bg-info" style={columnStyle} rowSpan="2">NOMINAL</th>
                                        <th className="text-light bg-info" style={columnStyle} rowSpan="2">PAIRING</th> */}
                                        {/* <th className="text-light bg-info" style={columnStyle} rowSpan="2">HAK</th> */}
                                    </tr>
                                    </thead>
                                        <tbody>
                                        {
                                            (
                                                typeof this.props.list === 'object' ? this.props.list.length>0?
                                                    this.props.list.sort((a, b) => new Date(b.id) - new Date(a.id)).map((v,i)=>{
                                                        return(
                                                            <tr key={i}>
                                                                <td style={columnStyle}> {i+1}</td>
                                                                <td style={columnStyle}>{v.id}</td>
                                                                <td className="bg-danger-soft" style={columnStyle}>{v.pertumbuhan_kiri}</td>
                                                                <td className="bg-danger-soft" style={columnStyle}>{v.pertumbuhan_kanan}</td>
                                                                <td className="bg-warning-soft" style={columnStyle}>{v.tabungan_kiri}</td>
                                                                <td className="bg-warning-soft" style={columnStyle}>{v.tabungan_kanan}</td>
                                                                <td className="bg-primary-soft" style={columnStyle}>{v.balance_kiri}</td>
                                                                <td className="bg-primary-soft" style={columnStyle}>{v.balance_kanan}</td>
                                                                <td className="bg-info-soft" style={columnStyle}>{toRp(v.hak_bonus)}</td>
                                                                <td className="bg-info-soft" style={columnStyle}>{toRp(v.nominal_bonus)}</td>
                                                                {/* <td className="bg-info-soft" style={columnStyle}>{toRp(v.pairing_bonus)}</td> */}
                                                                {/* <td style={columnStyle}>{toRp(v.sisa_plafon)}</td> */}
                                                                {/* <td style={columnStyle}>{v.bagde}</td> */}
                                                            </tr>
                                                        )
                                                    })
                                                    : <tr><td colSpan="11">NO DATA</td></tr> : <tr><td colSpan="11">NO DATA</td></tr>
                                            )
                                        }
                                        </tbody>
                                </table>

                            </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

export default Charts;