import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout';
import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker.css';
import {ModalToggle, ModalType} from "redux/actions/modal.action";
// import Charts from './src/charts'
import FormReaktivasi from '../modals/member/form_reaktivasi';
import { FetchAvailablePin } from 'redux/actions/pin/pin.action';
import Overview from './src/overview'
import Saldo from './src/saldo'
import Team from './src/teams'
import News from './src/news'
import Redeem from './src/redeem'
import socketIOClient from "socket.io-client";
import {HEADERS} from 'redux/actions/_constants'
import Cookies from 'js-cookie'
import Preloader from 'Preloader'
import { FetchRekapitulasi } from '../../../redux/actions/member/rekapitulasi.action';
import {get, destroy} from "components/model/app.model";
import { getBerita } from '../../../redux/actions/konten/berita.action';
import {getRiwayat} from "../../../redux/actions/transaction/riwayat.action";
import History from './src/history';
const table = 'rekapitulasi';
const socket = socketIOClient(HEADERS.URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate:localStorage.getItem("startDateDashboard")===null?moment(new Date()).format("yyyy-MM-DD"):localStorage.getItem("startDateDashboard"),
            endDate:localStorage.getItem("endDateDashboard")===null?moment(new Date()).format("yyyy-MM-DD"):localStorage.getItem("endDateDashboard"),
            list: [],
            bonus: 0,
            bonus_sponsor: 0,
            jenjang_karir: "Member",
            jenjang_karir_badge:'',
            membership: "",
            nama: "",
            pertumbuhan_downline: {
                options: {
                    chart: {
                        height: 350,
                        type: "area"
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "smooth"
                    },
                    tooltip: {
                        x: {
                            format: "dd/MM/yy"
                        }
                    },
                    xaxis: {
                        type: "date",
                        categories: ["2021-02-01T17:00:00.000Z"]
                    }
                },
                series: [
                    {
                        name: "Kiri",
                        data: [0]
                    },
                    {
                        name: "Kanan",
                        data: [0]
                    }
                ]
            },
            picture: "",
            pie_series: ["0", "0"],
            plafon: "0",
            point_ro: "0",
            pv_kanan: "0",
            pv_kiri: "0",
            reward: {
                title: "Motor CB1000RR",
                caption: "Selamat anda telah mencapai karir ZIRCON. Anda berhak mendapatkan hadiah motor.",
                gambar: "https://i0.wp.com/www.otomercon.com/wp-content/uploads/2014/07/yamaha-r15-motor-red.png?ssl=1"
            },
            reward_kanan: "0",
            reward_kiri: "0",
            saldo: "0",
            sponsor: "0",
            uid: "0",
            withdrawal: "0",
            load_socket:true,
            membership_badge:""
        };

        socket.on('refresh_dashboard',(data)=>{
            this.refreshData(atob(Cookies.get('sangqu_exp')));
        })
       
        socket.on("set_dashboard", (data) => {
            console.log("object data dashboard",data);
           this.setState({
               load_socket:false,
               bonus:data.bonus,
               bonus_sponsor:data.bonus_sponsor,
               jenjang_karir:data.jenjang_karir,
               membership:data.membership,
               nama:data.nama,
               pertumbuhan_downline:data.pertumbuhan_downline,
               picture:data.picture,
               pie_series:data.pie_series,
               plafon:data.plafon,
               point_ro:data.point_ro,
               pv_kanan:data.pv_kanan,
               pv_kiri:data.pv_kiri,
               reward:data.reward,
               reward_kanan:data.reward_kanan,
               reward_kiri:data.reward_kiri,
               saldo:data.saldo,
               sponsor:data.sponsor,
               uid:data.uid,
               withdrawal:data.withdrawal,
               membership_badge: data.membership_badge,
               jenjang_karir_badge: data.jenjang_karir_badge
           })
        });

        this.handleModal=this.handleModal.bind(this)
    }

    componentDidMount(){
        this.props.dispatch(FetchAvailablePin(1));
        this.props.dispatch(getBerita(1,'&perpage=5'))
        this.props.dispatch(getRiwayat(1, null, null, null));
        this.getData()
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.user) {
            if(nextProps.auth.user.id !== undefined){
                const cek = Cookies.get('sangqu_exp');
                if(cek===undefined || cek===''){
                    Cookies.set('sangqu_exp', btoa(nextProps.auth.user.id), {
                        expires: 1
                    });
                }
            }
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

    refreshData(id){
        socket.emit('get_dashboard', {id_member:id})
        socket.emit('get_notif', {id_member:id})
    }

    componentWillMount(){
        this.refreshData(atob(Cookies.get('sangqu_exp')));
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

    componentWillUnmount(){
        localStorage.removeItem('startDateProduct');
        localStorage.removeItem('endDateDashboard');
        destroy(table)
    }
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

    handleModal(e){
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormReaktivasi"));
    }


    render() {
        if(this.state.load_socket) return <Preloader/>
        else return (
            <Layout page="Dashboard">
             
                <div className="row d-flex box-margin">
                    <div className="col-md-4">
                        <Saldo
                            saldo={this.state.saldo}
                            saldo_bonus={this.state.bonus}
                            bonus_sponsor={this.state.bonus_sponsor}
                            withdrawal={this.state.withdrawal}
                            load={this.state.load_socket}
                        />
                    </div>
                    <div className="col-md-4">
                        <Team
                            pie_series={this.state.pie_series}
                            plafon={this.state.plafon}
                            point_ro={this.state.point_ro}
                            pv_kanan={this.state.pv_kanan}
                            pv_kiri={this.state.pv_kiri}
                            sponsor={this.state.sponsor}
                        />
                    </div>
                    <div className="col-md-4">
                        <Overview
                            user={this.state.nama}
                            uid={this.state.uid}
                            membership={this.state.membership}
                            picture={this.state.picture}
                            jenjang_karir={this.state.jenjang_karir}
                            jenjang_karir_badge={this.state.jenjang_karir_badge}
                            reward={this.state.reward}
                            membership_badge={this.state.membership_badge}
                            reward_kiri={this.state.reward_kiri}
                            reward_kanan={this.state.reward_kanan}
                            handleModal={this.handleModal}
                        />
                    </div>

                </div>
                <div className="row box-margin">
                    {/* <Charts title="Pertumbuhan Downline" data={this.state.pertumbuhan_downline} type="area" /> */}
                    <div className="col-md-12">
                        <Redeem list={this.state.list}/>
                    </div>
                </div>
                <div className="row d-flex box-margin">
                     <div className="col-md-6">
                         <News list={this.props.beritaBerita}/>
                    </div>
                     <div className="col-md-6">
                        <History list={this.props.dataRiwayat}/>
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
        rekapData:state.rekapitulasiReducer.data,
        isLoadingRekapitulasi:state.rekapitulasiReducer.isLoading,
        beritaBerita:state.beritaReducer.data_berita,
        dataRiwayat:state.riwayatReducer.data,
        isLoadingBerita:state.beritaReducer.isLoadingBerita,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
     }
}
export default connect(mapStateToProps)(Index);