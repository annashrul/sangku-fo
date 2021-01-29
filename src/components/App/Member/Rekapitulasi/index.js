import React,{Component} from 'react'
import Layout from 'components/Layout'
import connect from "react-redux/es/connect/connect";
import moment from "moment";
import {toRp} from "helper";
import { FetchRekapitulasi } from '../../../../redux/actions/member/rekapitulasi.action';
import {get, destroy} from "components/model/app.model";
const table = 'rekapitulasi';
class Rekapitulasi extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            list:[],
            tanggal:moment(new Date()).format("yyyy-MM-DD"),
        }
    }
    componentWillMount(){
        let start = moment(new Date()).subtract(4,'days');
        let end = moment(new Date()).add(1,'days');
        for (var m = moment(start); m.isBefore(end); m.add(1, 'days')) {
            if(moment(m).format("yyyy-MM-DD")!==moment(new Date()).add(1,'days').format("yyyy-MM-DD")){
                let param = 'tgl='+moment(m).format("yyyy-MM-DD")
                this.props.dispatch(FetchRekapitulasi(param));
            }
        }
        this.getData()
    }
    componentDidMount(){
        this.getData()
    }
    // componentDidUpdate(prevState){
    //     if(this.state.list.length<=0){
    //         let param = 'tgl='+this.state.tanggal
    //         this.props.dispatch(FetchRekapitulasi(param));
    //     }
    // }
    getData(){
        const data = get(table);
        // console.log("mmmmmmmmmmmm",data.length)
        data.then(res => {
            let val = [];
            res.map((i) => {
                val.push(i);
                return null;
            })
            this.setState({
                list: val,
            })
            return null;
        });
    }
    componentWillReceiveProps(nextProps){
        this.getData()
    }
    handleChange(event){
        let name = event.target.name;
        let value = event.target.value;
        if(name==='tanggal'){
            let param = 'tgl='+value
            this.props.dispatch(FetchRekapitulasi(param));
            this.getData()
        }
        this.setState({ [name]: value });
    }

    componentWillUnmount(){
        destroy(table)
    }


    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        return (
            <Layout page="Rekapitulasi">
                <div className="col-12 box-margin">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor=""> Tanggal </label>
                                                <input type="date" name={"tanggal"} className="form-control" value={this.state.tanggal} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-5 offset-md-4" style={{textAlign:"right"}}>
                                    <div className="row">
                                        <div className="col-12 d-flex justify-content-between align-items-center">
                                            <div className="text-center">
                                                <img className="img-fluid" alt="sangqu" style={{height:'50px'}} src={this.state.list!==undefined&&this.state.list.length>0?this.state.list[0].badge:"#"}/>
                                                <br/>
                                                <small className="text-muted">{this.state.list!==undefined&&this.state.list.length>0?this.state.list[0].membership:'-'}</small>
                                            </div>
                                            <div>
                                                <h4>Sisa Plafon : {this.state.list!==undefined&&this.state.list.length>0?toRp(this.state.list[0].sisa_plafon):0}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{overflowX: "auto"}}>
                                <table className="table table-hover table-bordered">
                                    <thead className="bg-light">
                                    <tr>
                                        <th className="text-black" style={columnStyle} rowSpan="0">NO</th>
                                        <th className="text-black" style={columnStyle} rowSpan="0">TANGGAL</th>
                                        <th className="text-light bg-danger" style={columnStyle} rowSpan="1" colSpan="2">PERTUMBUHAN</th>
                                        <th className="text-black bg-warning" style={columnStyle} rowSpan="1" colSpan="2">TABUNGAN</th>
                                        <th className="text-light bg-primary" style={columnStyle} rowSpan="1" colSpan="2">BALANCE</th>
                                        <th className="text-light bg-info" style={columnStyle} rowSpan="0">TERPASANG (T)</th>
                                        <th className="text-light bg-info" style={columnStyle} rowSpan="0">BONUS<br/>(T x {this.state.list!==undefined&&this.state.list.length>0?toRp(this.state.list[0].pairing_bonus):0})</th>
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
                                                typeof this.state.list === 'object' ? this.state.list.length>0?
                                                    this.state.list.sort((a, b) => new Date(b.id) - new Date(a.id)).map((v,i)=>{
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
            </Layout>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        rekapData:state.rekapitulasiReducer.data,
        isLoading:state.rekapitulasiReducer.isLoading,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(Rekapitulasi);