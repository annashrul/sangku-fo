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
import Saldo from './src/saldo'
import Team from './src/teams'
import News from './src/news'
import Member from './src/member'
import Redeem from './src/redeem'
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

            pertumbuhan_downline: {
                    series: [{
                        name: 'Kiri',
                        data: [31, 40, 28, 51, 42, 109, 100]
                        }, {
                        name: 'Kanan',
                        data: [11, 32, 45, 32, 34, 52, 41]
                        }],
                    options: {
                        chart: {
                            height: 350,
                            type: 'area'
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'smooth'
                        },
                        xaxis: {
                            type: 'datetime',
                            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                        },
                        tooltip: {
                            x: {
                            format: 'dd/MM/yy HH:mm'
                            },
                        },
                    },

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
        //         pertumbuhan_downline: data.pertumbuhan_downline,
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
        // this.props.dispatch(FetchStock());
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
             
                <div className="row" style={{marginBottom:'20px'}}>
                    <div className="col-md-4">
                        <Saldo/>
                    </div>
                    <div className="col-md-4">
                        <Team/>
                    </div>
                    <div className="col-md-4">
                        <Overview
                            user={this.props.auth.user}
                        />
                    </div>

                </div>
                <div className="row" style={{marginBottom:'20px'}}>
                    <div className="col-md-8 pr-0">
                        <Charts title="Pertumbuhan Downline" data={this.state.pertumbuhan_downline} type="area" />
                    </div>
                     <div className="col-md-4 pr-0">
                         <Member/>
                    </div>
                </div>
                <div className="row">
                     <div className="col-md-4 pr-0">
                         <News/>
                    </div>
                     <div className="col-md-8 pr-0">
                        <Redeem />
                    </div>

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