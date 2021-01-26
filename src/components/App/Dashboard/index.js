import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout';
import moment from 'moment';
import {FetchStock} from 'redux/actions/dashboard/dashboard.action'
import 'bootstrap-daterangepicker/daterangepicker.css';
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Cards from './src/Cards'
import Charts from './src/charts'
import FormReaktivasi from '../modals/member/form_reaktivasi';
import { FetchAvailablePin } from 'redux/actions/pin/pin.action';
import Overview from './src/overview'
// const socket = socketIOClient(HEADERS.URL);

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate:localStorage.getItem("startDateDashboard")===null?moment(new Date()).format("yyyy-MM-DD"):localStorage.getItem("startDateDashboard"),
            endDate:localStorage.getItem("endDateDashboard")===null?moment(new Date()).format("yyyy-MM-DD"):localStorage.getItem("endDateDashboard"),

            grossSales:"0",
            wGrossSales:110,
            netSales:"0",
            wNetSales:110,
            trxNum:"0",
            wTrxNum:110,
            avgTrx:"0",
            wAvgTrx:110,

            location_data:[],
            location:"-",

            lokasi_sales: {
                    options: {
                        chart: {
                            id: "basic-bar"
                        },
                        xaxis: {
                            categories: []
                        }
                    },
                    series: [{
                            name: "Bulan Lalu",
                            data: []
                        },
                        {
                            name: "Bulan Sekarang",
                            data: []
                        }
                    ],
                },
            lokasi_tr: {
                    options: {
                        chart: {
                            id: "basic-bar"
                        },
                        xaxis: {
                            categories: []
                        }
                    },
                    series: [{
                            name: "Bulan Lalu",
                            data: []
                        },
                        {
                            name: "Bulan Sekarang",
                            data: []
                        }
                    ],
                },
        };

        // socket.on('refresh_dashboard',(data)=>{
        //     this.refreshData();
        // })
        
        // socket.on("set_dashboard", (data) => {
        //     this.setState({
        //         grossSales:toRp(parseInt(data.header.penjualan,10)),
        //         netSales:toRp(parseInt(data.header.net_sales,10)),
        //         trxNum:data.header.transaksi,
        //         avgTrx:toRp(parseInt(data.header.avg,10)),
        //         lokasi_sales: data.lokasi_sales,
        //         lokasi_tr: data.lokasi_tr,
        //         hourly: data.hourly,
        //         daily: data.daily,
        //         top_item_qty: data.top_item_qty,
        //         top_item_sale: data.top_item_sale,
        //         top_cat_qty: data.top_cat_qty,
        //         top_cat_sale: data.top_cat_sale,
        //         top_sp_qty: data.top_sp_qty,
        //         top_sp_sale: data.top_sp_sale,
        //     });
        // });
        this.HandleChangeLokasi = this.HandleChangeLokasi.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(FetchAvailablePin(1));
    }

    UNSAFE_componentDidMount(){
        this.props.dispatch(FetchStock());
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.user) {
          let lk = [{
              value: "-",
              label: "Semua Lokasi"
          }]
          let loc = nextProps.auth.user.lokasi;
          if(loc!==undefined){
              loc.map((i) => {
                lk.push({
                  value: i.kode,
                  label: i.nama
                });
                return null;
              })
              
              this.setState({
                location_data: lk,
                userid: nextProps.auth.user.id
              })
          }
        }
      }

    // refreshData(start=null,end=null,loc=null){
    //     socket.emit('get_dashboard', {
    //         datefrom: start!==null?start:this.state.startDate,
    //         dateto: end!==null?end:this.state.endDate,
    //         location: loc!==null?loc:this.state.location
    //     })
    // }

    componentWillMount(){
        // this.refreshData();
    }

    componentWillUnmount(){
        localStorage.removeItem('startDateProduct');
        localStorage.removeItem('endDateDashboard');
    }

    onChange = date => this.setState({ date })

    handleEvent = (event, picker) => {
        // end:  2020-07-02T16:59:59.999Z
        const awal = picker.startDate._d.toISOString().substring(0,10);
        const akhir = picker.endDate._d.toISOString().substring(0,10);
        this.setState({
            startDate:awal,
            endDate:akhir
        });
        this.refreshData(awal,akhir,null);
    };

    handleSubmit = (event) => {
        event.preventDefault()
        this.refreshData();
    }

    handleModal(e){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormReaktivasi"));
    }

    HandleChangeLokasi(lk) {
        let err = Object.assign({}, this.state.error, {
            location: ""
        });
        this.setState({
            location: lk.value,
            error: err
        })
        this.refreshData(null, null, lk.value)

    }

    render() {
        return (
            <Layout page="Dashboard">
             
                <div className="row">
                    <div className="col-md-5">
                        <div className="row">
                            <Cards className="col-md-6 col-xl-6 box-margin d-flex" title="Referral Downlines" data={this.state.grossSales} icon="fa fa-area-chart text-primary"/>
                            <Cards className="col-md-6 col-xl-6 box-margin d-flex" title="Commission Withdrawn" data={this.state.netSales} icon="fa fa-area-chart text-primary"/>
                        </div>
                        <div className="row">
                            <Cards className="col-md-6 col-xl-6 box-margin d-flex" title="Payout Pending" data={this.state.trxNum} icon="fa fa-area-chart text-primary"/>
                            <Cards className="col-md-6 col-xl-6 box-margin d-flex" title="Commission Earned" data={this.state.avgTrx} icon="fa fa-area-chart text-primary"/>
                        </div>
                        <div className="row">
                            <Cards className="col-md-6 col-xl-12 box-margin" title="E-Wallet balance" data={this.state.trxNum} icon="fa fa-area-chart text-primary"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Overview
                            user={this.props.auth.user}
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-7 pr-0">
                        <Charts title="Downline Members" data={this.state.lokasi_sales}/>
                    </div>
                   <Charts title="Monthly Sales Amount" data={this.state.lokasi_sales}/>
                </div>
                <div className="row">
                    <Charts title="MONTHLY TRANSACTIONS" data={this.state.lokasi_tr}/>

                </div>
                <FormReaktivasi availPin={this.props.getPin} directPin={undefined}/>
        </Layout>
       
        );
    }
}
// Dashboard.propTypes = {
//     auth: PropTypes.object
// }

const mapStateToProps = (state) =>{
     return{
       auth: state.auth,
       stock: state.dashboardReducer.data,
       getPin:state.pinReducer.data_available,
     }
}
export default connect(mapStateToProps)(Index);