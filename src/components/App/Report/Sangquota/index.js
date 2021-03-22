import React, { Component } from 'react';
import {connect} from "react-redux";
// import {Card, CardBody, CardHeader} from "reactstrap";
import Layout from 'components/Layout';
import Cards from './src/card'
import Paginationq,{toRp,rangeDate} from "helper";
import {getSangquota} from "redux/actions/transaction/sangquota.action";
// import Swal from "sweetalert2";
// import { Link } from 'react-router-dom';
import {NOTIF_ALERT} from "redux/actions/_constants";
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import moment from 'moment';
import CardMobile from './src/card-mobile';

class IndexSangquota extends Component{
    constructor(props){
        super(props);
        this.handleChange    = this.handleChange.bind(this);
        this.state={
            cari:"",
            dateTo: moment(new Date()).format("yyyy-MM-DD"),
            dateFrom: moment(new Date()).subtract(1, 'months').format("yyyy-MM-DD"),

        }
        this.handlePage = this.handlePage.bind(this)
    }
    componentWillMount(){
        const page = localStorage.getItem("pageSangquotaTrx");
        const qs = localStorage.getItem("qsSangquota");

        this.props.dispatch(getSangquota(page === undefined || page === null ? 1 : page, qs === undefined || qs === null ? null : qs, this.state.dateFrom, this.state.dateTo));

    }
    componentWillReceiveProps(nextProps){
       
    }

    componentWillUnmount(){
        localStorage.removeItem("pageSangquotaTrx")
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        let err = Object.assign({}, this.state.error, {
            [event.target.name]: ""
        });
        if (event.target.name==='cari'){
            localStorage.setItem("qsSangquota", event.target.value);
        }
        this.setState({
            error: err
        });
    }


    handlePage(pageNumber) {
        localStorage.setItem("pageSangquotaTrx", pageNumber);
        const qs = localStorage.getItem("qsSangquota");

        this.props.dispatch(getSangquota(pageNumber, qs === undefined || qs === null ? null : qs, this.state.dateFrom, this.state.dateTo));

    }

    handleSearch(e) {
        e.preventDefault();
        this.props.dispatch(getSangquota(1,btoa(this.state.cari),this.state.dateFrom,this.state.dateTo));
    }

    handleEvent = (event, picker) => {
        event.preventDefault();
        const from = moment(picker.startDate._d).format('YYYY-MM-DD');
        const to = moment(picker.endDate._d).format('YYYY-MM-DD');
        this.setState({
            dateFrom: from,
            dateTo: to
        });
    };



    render(){
        const {
            total,
            per_page,
            current_page
        } = this.props.raw_data;
        console.log(this.props.data);
        return(
            <Layout page="Riwayat SangQuota">
               <div className="row">
                   <div className="col-12 col-xs-6 col-md-3">
                        <div className="form-group">
                            <label>Periode </label>
                            <DateRangePicker
                                autoUpdateInput={true} showDropdowns={true} style={{display:'unset'}} ranges={rangeDate} alwaysShowCalendars={true} onApply={this.handleEvent}>
                                <input type="text" readOnly={true} className="form-control" value={`${this.state.dateFrom} to ${this.state.dateTo}`}/>
                            </DateRangePicker>
                        </div>
                    </div>

                    <div className="col-12 col-xs-12 col-md-3">
                        <div className="form-group">
                            <label>Cari</label>
                            <div className="input-group">
                                <input type="text" className="form-control" value={this.state.any} onChange={this.handleChange} onKeyPress={event=>{if(event.key==='Enter'){this.handleSearch(event);}}}  name="cari" placeholder="Cari dengan kd trx/keterangan" />
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-primary" onClick={(e)=>this.handleSearch(e)}>
                                        <i className="fa fa-search" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-2 col-xs-2 col-md-4">
                        <div className="form-group">
                        </div>
                    </div> */}
                </div>

                       
                <div className="row d-none d-md-flex" style={{padding:'20px'}}>
                    {
                        this.props.isLoading?
                            (() => {
                            const list=[]
                                for (let x = 0; x < 10; x++) {
                                        list.push(<Cards isLoading={true}/>)
                                }
                                return list
                            })()
                        :
                            this.props.data.length>0?
                                this.props.data.map((item,key)=>{
                                    return <Cards
                                        created_at={item.created_at}
                                        note={item.note}
                                        kd_trx={item.kd_trx}
                                        amount_in = {toRp(parseInt(item.plafon_in),true)}
                                        amount_out={toRp(parseInt(item.plafon_out),true)}
                                        isLoading={false}
                                    />
                            }):<div className={"col-md-12 text-center"}>
                                    <img src={NOTIF_ALERT.NO_DATA} style={{verticalAlign:"middle"}} alt=""/>
                                </div>
                    }
                </div>
                <div className="box-margin d-block d-md-none">
                    {
                        this.props.isLoading?
                            (() => {
                            const list=[]
                                for (let x = 0; x < 10; x++) {
                                        list.push(<CardMobile isLoading={true}/>)
                                }
                                return list
                            })()
                        :
                            this.props.data.length>0?
                                this.props.data.map((item,key)=>{
                                    return <CardMobile
                                        created_at={item.created_at}
                                        note={item.note}
                                        kd_trx={item.kd_trx}
                                        amount_in = {toRp(parseInt(item.plafon_in),true)}
                                        amount_out={toRp(parseInt(item.plafon_out),true)}
                                        isLoading={false}
                                    />
                            }):<div className={"col-md-12 text-center"}>
                                    <img src={NOTIF_ALERT.NO_DATA} style={{verticalAlign:"middle"}} alt=""/>
                                </div>
                    }
                </div>
                <div style={{padding:'20px',"marginTop":"20px","marginBottom":"20px","float":"left"}}>
                    <h5>Ringkasan</h5>
                    <div class="table-responsive">
                        <table class="table">
                            <tr>
                            <th>Saldo Awal</th>
                            <td>:</td>
                            <td>{toRp(this.props.summary.saldo_awal,true)}</td>
                            </tr>
                            <tr>
                            <th>Plafon Masuk</th>
                            <td>:</td>
                            <td>{toRp(this.props.summary.plafon_in,true)}</td>
                            </tr>
                            <tr>
                            <th>Plafon Keluar</th>
                            <td>:</td>
                            <td>{toRp(this.props.summary.plafon_out,true)}</td>
                            </tr>
                            <tr>
                            <th>Saldo saat ini</th>
                            <td>:</td>
                            <td> {
                                toRp((parseInt(this.props.summary.saldo_awal, 10) + parseInt(this.props.summary.plafon_in, 10)) - parseInt(this.props.summary.plafon_out,10), true)
                            } </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div style={{padding:'20px',"marginTop":"20px","marginBottom":"20px","float":"right"}}>
                    <Paginationq
                        current_page={current_page}
                        per_page={per_page}
                        total={total}
                        callback={this.handlePage}
                    />
                </div>
            
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        data:state.sangquotaReducer.data,
        raw_data: state.sangquotaReducer.raw_data,
        summary: state.sangquotaReducer.summary,
        isLoading: state.sangquotaReducer.isLoading,
    }
}
export default connect(mapStateToProps)(IndexSangquota);