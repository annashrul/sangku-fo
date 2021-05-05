import React, {Component} from 'react'
import Skeleton from 'react-loading-skeleton';
// import Chart from "react-apexcharts";
import { toRp } from '../../../../helper';

class Charts extends Component {
    render(){
        
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        const {charge,daily,diamond,status} = this.props.ringkasan_bonus;

        const tot_diamond = (parseFloat(diamond.diamond)+parseFloat(diamond.red_diamond)+parseFloat(diamond.blue_diamond)+parseFloat(diamond.maroon_diamond))-((parseFloat(charge.bank))+((parseFloat(diamond.diamond)+parseFloat(diamond.red_diamond)+parseFloat(diamond.blue_diamond)+parseFloat(diamond.maroon_diamond)*parseFloat(charge.penarikan))/100));
        const tot_bonus = (parseFloat(daily.ro.total)+parseFloat(daily.sponsor.total)+parseFloat(daily.pasangan.total))-(parseFloat(charge.bank)+((parseFloat(daily.ro.total)+parseFloat(daily.sponsor.total)+parseFloat(daily.pasangan.total))*charge.penarikan)/100);
        return(
            <>
            <div className="row">
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Rekapitulasi Harian</h5>
                            {this.props.list.length>0?
                            <>
                            <h6 className="text-success m-0">Pertumbuhan</h6>
                            <div className="row">
                                <div className="col-6 col-sm-6 col-md-6">
                                    Kiri
                                </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    :  {this.props.list[0].pertumbuhan_kiri}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6 col-sm-6 col-md-6">
                                    Kanan
                                </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    :  {this.props.list[0].pertumbuhan_kanan}
                                </div>
                            </div>
                            <h6 className="text-success m-0">Tabungan</h6>
                            <div className="row">
                                <div className="col-6 col-sm-6 col-md-6">
                                    Kiri
                                </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    :  {this.props.list[0].tabungan_kiri}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6 col-sm-6 col-md-6">
                                    Kanan
                                </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    :  {this.props.list[0].tabungan_kanan}
                                </div>
                            </div>
                            <h6 className="text-success m-0">Balance</h6>
                            <div className="row">
                                <div className="col-6 col-sm-6 col-md-6">
                                    Kiri
                                </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    :  {this.props.list[0].balance_kiri}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6 col-sm-6 col-md-6">
                                    Kanan
                                </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    :  {this.props.list[0].balance_kanan}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 col-sm-6 col-md-6">
                                    <h6 className="text-success m-0">Terpasang (T)</h6>
                                </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    :  {this.props.list[0].hak_bonus}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 col-sm-6 col-md-6">
                                    <h6 className="text-success m-0">Bonus (T x 25.000)</h6>
                                </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    :  {this.props.list[0].nominal_bonus}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 col-sm-6 col-md-6">
                                    <h6 className="text-success m-0">Sisa Plafon</h6>
                                </div>
                                <div className="col-6 col-sm-6 col-md-6">
                                    :  {toRp(this.props.list[0].sisa_plafon)}
                                </div>
                            </div>
                            </>
                            :<Skeleton count={8} style={{width:'100%'}}/>}
                        </div>
                    </div>
                </div>

                {/* SECTION PERGERAKAN BONUS */}
                <div className="col-md-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Pergerakan Bonus</h5>
                                <table className="table table-hover table-striped" style={{tableLayout:'fixed',zoom:'85%'}}>
                                <thead>
                                    <tr>
                                        <td width="50%" className="text-light text-center" style={{backgroundColor:'#c0c0c0'}}>BONUS</td>
                                        <td width="50%" className="text-light text-center" style={{backgroundColor:'#732044'}}>NILAI</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-0 p-2">BONUS RO</td>
                                        <td className="border-0 p-2 text-right text-dark">Rp. {toRp(parseFloat(daily.ro.total))}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 p-2">BONUS SPONSOR</td>
                                        <td className="border-0 p-2 text-right text-dark">Rp. {toRp(parseFloat(daily.sponsor.total))}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 p-2">BONUS PASANGAN</td>
                                        <td className="border-0 p-2 text-right text-dark">Rp. {toRp(parseFloat(daily.pasangan.total))}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 p-2 text-info">TOTAL BONUS</td>
                                        <td className="border-0 p-2 text-right text-info">Rp. {toRp(parseFloat(daily.ro.total)+parseFloat(daily.sponsor.total)+parseFloat(daily.pasangan.total))}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 p-2 text-danger">ADMIN {charge.penarikan}%</td>
                                        <td className="border-0 p-2 text-right text-danger">Rp. {toRp(((parseFloat(daily.ro.total)+parseFloat(daily.sponsor.total)+parseFloat(daily.pasangan.total))*charge.penarikan)/100)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 p-2 text-danger">CHARGE BANK</td>
                                        <td className="border-0 p-2 text-right text-danger">Rp. {toRp(charge.bank)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{backgroundColor:'#c0c0c0'}} className="border-0 p-2 text-dark">TOTAL TRANSFER</td>
                                        <td style={{backgroundColor:'#732044'}} className="border-0 p-2 text-right text-light">Rp. {toRp(tot_bonus<=0?0:tot_bonus)}</td>
                                    </tr>
                                    <tr className="table-secondary d-none">
                                        <td style={{backgroundColor:'#732044'}} className="border-0 p-2">STATUS</td>
                                        <td style={{backgroundColor:'#c0c0c0'}} className="border-0 p-2 text-right text-dark">
                                            <a href={() => {return null}} className='badge badge-info text-white' style={{whiteSpace:'normal'}}>{status}</a>
                                        </td>
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
                                <table className="table table-hover table-striped" style={{tableLayout:'fixed',zoom:'85%'}}>
                                <thead>
                                    <tr>
                                        <td width="33%" className="text-light text-center" style={{backgroundColor:'#ab3367'}}>KUALIFIKASI</td>
                                        <td width="33%" className="text-light text-center" style={{backgroundColor:'#732044'}}>NILAI</td>
                                        <td width="33%" className="text-dark text-center" style={{backgroundColor:'#ffb75d'}}>BONUS</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-0 p-2">DIAMOND</td>
                                        <td className="border-0 p-2 text-right">2%</td>
                                        <td className="border-0 p-2 text-right text-dark">Rp. {toRp(parseFloat(diamond.diamond))}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 p-2">RED DIAMOND</td>
                                        <td className="border-0 p-2 text-right">2%</td>
                                        <td className="border-0 p-2 text-right text-dark">Rp. {toRp(parseFloat(diamond.red_diamond))}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 p-2">BLUE DIAMOND</td>
                                        <td className="border-0 p-2 text-right">1%</td>
                                        <td className="border-0 p-2 text-right text-dark">Rp. {toRp(parseFloat(diamond.blue_diamond))}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 p-2">MAROON DIAMOND</td>
                                        <td className="border-0 p-2 text-right">1%</td>
                                        <td className="border-0 p-2 text-right text-dark">Rp. {toRp(parseFloat(diamond.maroon_diamond))}</td>
                                    </tr>
                                    <tr>
                                        <td style={{backgroundColor:'#c0c0c0'}} className="border-0 p-2 text-dark font-weight-bold" colSpan="2">TOTAL BONUS</td>
                                        <td className="border-0 p-2 text-right text-dark">Rp. {toRp(parseFloat(diamond.diamond)+parseFloat(diamond.red_diamond)+parseFloat(diamond.blue_diamond)+parseFloat(diamond.maroon_diamond))}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 p-2 text-danger">ADMIN</td>
                                        <td className="border-0 p-2 text-right text-danger">{charge.penarikan}%</td>
                                        <td className="border-0 p-2 text-right text-danger">Rp. {toRp((parseFloat(diamond.diamond)+parseFloat(diamond.red_diamond)+parseFloat(diamond.blue_diamond)+parseFloat(diamond.maroon_diamond)*parseFloat(charge.penarikan))/100)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border-0 p-2 text-danger" colSpan="2">CHARGE BANK</td>
                                        <td className="border-0 p-2 text-right text-danger">Rp. {toRp(parseFloat(charge.bank))}</td>
                                    </tr>
                                    <tr>
                                        <td style={{backgroundColor:'#c0c0c0'}} className="border-0 p-2 text-dark" colSpan="2">TOTAL TRANSFER</td>
                                        <td style={{backgroundColor:'#ffb75d'}} className="border-0 p-2 text-right text-dark">Rp. {toRp(tot_diamond<=0?0:tot_diamond)}</td>
                                    </tr>
                                    <tr className="table-secondary d-none">
                                        <td style={{backgroundColor:'#732044'}} className="border-0 p-2" colSpan="2">STATUS</td>
                                        <td style={{backgroundColor:'#c0c0c0'}} className="border-0 p-2 text-right text-dark">
                                            <a href={() => {return null}} className='badge badge-info text-white' style={{whiteSpace:'normal'}}>{status}</a>
                                        </td>
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