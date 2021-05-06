import React, { Component } from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import Paginationq,{rangeDate} from "helper";
import {NOTIF_ALERT} from "redux/actions/_constants";
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import moment from 'moment';
import CardMobile from './src/card-mobile';
import { FetchMutasiPin } from '../../../../redux/actions/pin/pin.action';
import Skeleton from 'react-loading-skeleton';

class IndexPinMutasi extends Component{
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
    componentDidUpdate(prevState){
        if(prevState.auth.user.id!==this.props.auth.user.id){
            // let page=localStorage.page_pin;
            this.handleParameter(1)
        }
    }
    componentWillMount(){
        if(this.props.auth.user.id!==undefined){
            this.handleParameter(1)
        }
    }
    componentWillReceiveProps(nextProps){
       
    }

    componentWillUnmount(){
        localStorage.removeItem("pagePinMutasi")
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        let err = Object.assign({}, this.state.error, {
            [event.target.name]: ""
        });
        if (event.target.name==='cari'){
            localStorage.setItem("qsPinMutasi", event.target.value);
        }
        this.setState({
            error: err
        });
    }


    handlePage(pageNumber) {
        localStorage.setItem("pagePinMutasi", pageNumber);
        this.handleParameter(pageNumber)

    }

    handleSearch(e) {
        e.preventDefault();
        this.handleParameter(1)
    }

    handleParameter(pageNumber){
        let any = localStorage.qsPinMutasi;
        let from=localStorage.date_from_pin_mutasi;
        let to=localStorage.date_to_pin_mutasi;
        let where='';
        
        if(from!==undefined&&from!==null&&from!==''){
            where+=`&datefrom=${from}`;
        }
        if(to!==undefined&&to!==null&&to!==''){
            where+=`&dateto=${to}`;
        }
        if(any!==undefined&&any!==null&&any!==''){
            where+=`&q=${any}`
        }
        this.setState({
            where_data:where
        })
        if(this.props.auth.user.id!==undefined){
            this.props.dispatch(FetchMutasiPin(this.props.auth.user.id, where, pageNumber));
        }

    }
    handleEvent = (event, picker) => {
        event.preventDefault();
        const from = moment(picker.startDate._d).format('YYYY-MM-DD');
        const to = moment(picker.endDate._d).format('YYYY-MM-DD');
        localStorage.setItem("date_from_pin_mutasi",`${from}`);
        localStorage.setItem("date_to_pin_mutasi",`${to}`);
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
        } = this.props.data;
        
        return(
            <Layout page="Riwayat PIN">
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
                                <input type="text" className="form-control" value={this.state.any} onChange={this.handleChange} onKeyPress={event=>{if(event.key==='Enter'){this.handleSearch(event);}}}  name="cari" placeholder="Cari" />
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

                       
                <div className="row d-none d-md-flex">
                    <table className="table table-hover table-striped m-3">
                        <thead className="bg-primary">
                            <tr>
                                <td className="text-center text-light">NO</td>
                                <td className="text-center text-light">Jenis PIN</td>
                                <td className="text-center text-light">Jenis Trx</td>
                                <td className="text-center text-light">Paket</td>
                                <td className="text-center text-light">Jumlah</td>
                                <td className="text-center text-light">Catatan</td>
                                <td className="text-center text-light">Tanggal</td>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        this.props.isLoading?
                            (() => {
                            const list=[]
                                for (let x = 0; x < 10; x++) {
                                        list.push(<tr key={x}><td colSpan="7"><Skeleton style={{width:'100%'}}/></td></tr>)
                                }
                                return list
                            })()
                        :
                            this.props.data.data.length>0?
                                this.props.data.data.map((item,key)=>{
                                    return <tr key={key}>
                                                <td className="text-center text-dark">{key+1 + (10 * (parseInt(current_page,10)-1))}</td>
                                                <td className="text-center text-dark">{item.jenis_pin}</td>
                                                <td className="text-center text-dark">{item.jenis_transaksi}</td>
                                                <td className="text-center text-dark">{item.paket}</td>
                                                <td className="text-center text-dark">{item.jumlah}</td>
                                                <td className="text-left text-dark">{item.note}</td>
                                                <td className="text-center text-dark">{moment(item.created_at).format('YYYY-MM-DD')}</td>
                                            </tr>
                                    // <Cards
                                    //     created_at={item.created_at}
                                    //     note={item.note}
                                    //     jenis_pin={item.jenis_pin}
                                    //     jenis_transaksi={item.jenis_transaksi}
                                    //     paket={item.paket}
                                    //     jumlah={item.jumlah}
                                    //     isLoading={false}
                                    // />
                            }):<div className={"col-md-12 text-center"}>
                                    <img src={NOTIF_ALERT.NO_DATA} style={{verticalAlign:"middle"}} alt=""/>
                                </div>
                    }
                    
                        </tbody>
                    </table>
                </div>
                <div className="box-margin d-block d-md-none">
                    {
                        this.props.isLoading?
                            (() => {
                            const list=[]
                                for (let x = 0; x < 10; x++) {
                                        list.push(<CardMobile key={x} isLoading={true}/>)
                                }
                                return list
                            })()
                        :
                            this.props.data.data.length>0?
                                this.props.data.data.map((item,key)=>{
                                    return <CardMobile
                                        key={key}
                                        created_at={item.created_at}
                                        note={item.note}
                                        jenis_pin={item.jenis_pin}
                                        jenis_transaksi={item.jenis_transaksi}
                                        paket={item.paket}
                                        jumlah={item.jumlah}
                                        isLoading={false}
                                    />
                            }):<div className={"col-md-12 text-center"}>
                                    <img src={NOTIF_ALERT.NO_DATA} style={{verticalAlign:"middle"}} alt=""/>
                                </div>
                    }
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
        data:state.pinReducer.data_mutasi,
        isLoading: state.pinReducer.isLoading,
    }
}
export default connect(mapStateToProps)(IndexPinMutasi);