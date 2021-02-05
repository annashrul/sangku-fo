import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Select from 'react-select';
import moment from "moment";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {rangeDate} from "helper";
import {statusQ} from "helper";
import {getReportPPOB} from "../../../../redux/actions/ppob/reportPPOB.action";
import Skeleton from 'react-loading-skeleton';
import {toCurrency} from "../../../../helper";

class IndexReportPPOB extends Component{
    constructor(props){
        super(props);
        this.state={
            where_data:"",
            any:"",
            location:"",
            location_data:[],
            dateFrom:moment(new Date()).format("yyyy-MM-DD"),
            dateTo:moment(new Date()).format("yyyy-MM-DD"),
            sort:"",
            sort_data:[],
            filter:"",
            filter_data:[],
            status:"",
            status_data:[],
            data:[]
        };
        this.handleChange = this.handleChange.bind(this);

    }
    componentWillMount(){
        this.props.dispatch(getReportPPOB('page=1'));
    }

    componentWillReceiveProps(nextProps){
        let data=[];
        if(typeof nextProps.data.data==='object'){
            if(nextProps.data.data.length>0){
                nextProps.data.data.map((v,i)=>{
                    data.push({
                        isDetail:false,
                        full_name: v.full_name,
                        harga: v.harga,
                        icon: v.icon,
                        id:v.id,
                        kategori:v.kategori,
                        kd_trx:v.kd_trx,
                        logo:v.logo,
                        operators:v.operators,
                        produk:v.produk,
                        status:v.status,
                        target:v.target,
                        tipe:v.tipe,
                    })
                })
            }
            else{
                data=[];
            }
        }
        this.setState({data:data});
    }

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }
    handlePage(num){
        this.props.dispatch(getReportPPOB(`page=${num}`));
    }
    handleEvent = (event, picker) => {
        const from = moment(picker.startDate._d).format('YYYY-MM-DD');
        const to = moment(picker.endDate._d).format('YYYY-MM-DD');
        this.setState({
            dateFrom:from,
            dateTo:to
        });

    };

    render(){
        const columnStyle = {verticalAlign: "middle",whiteSpace:"nowrap"};
        const {
            per_page,
            last_page,
            current_page,
        } = this.props.data;
        let totalHarga=0;
        return (
            <Layout page="Laporan PPOB">
                <div className="col-12 box-margin">
                    <div className="card" style={{marginBottom:"10px"}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-10" style={{zoom:"85%"}}>
                                    <div className="row">
                                        <div className="col-6 col-xs-6 col-md-3">
                                            <div className="form-group">
                                                <label htmlFor=""> Periode </label>
                                                <DateRangePicker
                                                    autoUpdateInput={true} showDropdowns={true} style={{display:'unset'}} ranges={rangeDate} alwaysShowCalendars={true} onApply={this.handleEvent}>
                                                    <input type="text" readOnly={true} className="form-control" value={`${this.state.dateFrom} to ${this.state.dateTo}`}/>
                                                </DateRangePicker>

                                            </div>
                                        </div>
                                        <div className="col-6 col-xs-6 col-md-2">
                                            <div className="form-group">
                                                <label className="control-label font-12">
                                                    Status
                                                </label>
                                                <Select
                                                    options={this.state.status_data}
                                                    // placeholder="Pilih Tipe Kas"
                                                    onChange={this.HandleChangeStatus}
                                                    value={
                                                        this.state.status_data.find(op => {
                                                            return op.value === this.state.status
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6 col-xs-6 col-md-2">
                                            <div className="form-group">
                                                <label className="control-label font-12">
                                                    Filter
                                                </label>
                                                <Select
                                                    options={this.state.filter_data}
                                                    // placeholder="Pilih Tipe Kas"
                                                    onChange={this.HandleChangeFilter}
                                                    value={
                                                        this.state.filter_data.find(op => {
                                                            return op.value === this.state.filter
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6 col-xs-6 col-md-2">
                                            <div className="form-group">
                                                <label className="control-label font-12">
                                                    Sort
                                                </label>
                                                <Select
                                                    options={this.state.sort_data}
                                                    // placeholder="Pilih Tipe Kas"
                                                    onChange={this.HandleChangeSort}
                                                    value={
                                                        this.state.sort_data.find(op => {
                                                            return op.value === this.state.sort
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6 col-xs-6 col-md-3">
                                            <div className="form-group">
                                                <label>Cari</label>
                                                <input className="form-control" type="text" name="any" value={this.state.any} onChange={(e) => this.handleChange(e)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-xs-6 col-md-2" style={{zoom:"85%",textAlign:"right"}}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={this.handleSearch}>
                                                    <i className="fa fa-search"/>
                                                </button>
                                                {/*<button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={(e => this.toggleModal(e,(last_page*per_page),per_page))}>*/}
                                                    {/*<i className="fa fa-print"></i> Export*/}
                                                {/*</button>*/}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>


                        </div>
                    </div>
                    <div className="card" style={{marginBottom:"10px"}}>
                        <div className="card-body">
                            <div style={{overflowX: "auto",zoom:"85%"}}>
                                <table className="table table-hover table-bordered">
                                    <thead className="bg-info">
                                    <tr>
                                        <th>NO</th>
                                        <th>OPERATOR</th>
                                        <th>NO.INVOICE</th>
                                        <th>NAMA</th>
                                        <th>TARGET</th>
                                        <th>PRODUK</th>
                                        <th>KATEGORI</th>
                                        <th>HARGA</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        !this.props.isLoading?this.state.data.length>0?this.state.data.map((v,i)=>{
                                            totalHarga = totalHarga+parseInt(v.harga);
                                            return(
                                                <tr key={i}>
                                                    <td style={columnStyle}>{i+1 + (10 * (parseInt(current_page,10)-1))}</td>
                                                    <td style={columnStyle}>
                                                        <img src={v.logo} alt="" style={{textAlign:"center",height:"30px"}}/>

                                                    </td>
                                                    <td style={columnStyle} className="txtGreen">{v.kd_trx}</td>
                                                    <td style={columnStyle}>{v.full_name}</td>
                                                    <td style={columnStyle}>{v.target}</td>
                                                    <td style={columnStyle}>{v.produk}</td>
                                                    <td style={columnStyle}>
                                                        <img src={v.icon} alt="" style={{float:"left",height:"30px"}}/>{v.kategori}
                                                    </td>
                                                    <td style={columnStyle} className="txtRed text-right">Rp {toCurrency(v.harga)} .-</td>
                                                </tr>
                                            );
                                        }):"":(()=>{
                                            let container =[];
                                            for(let i=0; i<10; i++){
                                                container.push(
                                                    <tr key={i}>
                                                        <td><Skeleton/></td>
                                                        <td><Skeleton/></td>
                                                        <td><Skeleton/></td>
                                                        <td><Skeleton/></td>
                                                        <td><Skeleton/></td>
                                                        <td><Skeleton/></td>
                                                        <td><Skeleton/></td>
                                                        <td><Skeleton/></td>
                                                    </tr>
                                                )
                                            }
                                            return container;
                                        })()

                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr style={{backgroundColor:"#EEEEEE"}}>
                                        <th colSpan={7}>TOTAL PERHALAMAN</th>
                                        <th className="txtRed text-right" colSpan={1}>Rp {toCurrency(totalHarga)} .-</th>
                                    </tr>
                                    </tfoot>
                                </table>

                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div style={{"marginTop":"20px","float":"right"}}>
                                <Paginationq
                                    current_page={current_page}
                                    per_page={per_page}
                                    total={parseInt((per_page*last_page),10)}
                                    callback={this.handlePage.bind(this)}
                                />
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
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isLoading:state.reportPPOBReducer.isLoading,
        data:state.reportPPOBReducer.data,
    }
}
export default connect(mapStateToProps)(IndexReportPPOB);