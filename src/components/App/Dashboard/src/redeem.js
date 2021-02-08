import React, {Component} from 'react'
import Chart from "react-apexcharts";
import { toRp } from '../../../../helper';

class Charts extends Component {
    render(){
        
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        return(
             <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Rekapitulasi 5 Hari Kebelakang</h5>
                    <div className="product-table-area">
                    <div style={{overflowX: "auto", zoom:'80%'}}>
                                <table className="table table-hover table-bordered">
                                    <thead className="bg-light">
                                    <tr>
                                        <th className="text-black bg-secondary" style={columnStyle} rowSpan="0">NO</th>
                                        <th className="text-black bg-secondary" style={columnStyle} rowSpan="0">TANGGAL</th>
                                        <th className="text-light bg-danger" style={columnStyle} rowSpan="1" colSpan="2">PERTUMBUHAN</th>
                                        <th className="text-black bg-warning" style={columnStyle} rowSpan="1" colSpan="2">TABUNGAN</th>
                                        <th className="text-light bg-primary" style={columnStyle} rowSpan="1" colSpan="2">BALANCE</th>
                                        <th className="text-light bg-info" style={columnStyle} rowSpan="0">TERPASANG (T)</th>
                                        <th className="text-light bg-info" style={columnStyle} rowSpan="0">BONUS<br/>(T x {this.props.list!==undefined&&this.props.list.length>0?toRp(this.props.list[0].pairing_bonus):0})</th>
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

        )
    }
}

export default Charts;