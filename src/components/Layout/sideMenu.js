import React, { Component } from 'react';
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom"
import { logoutUser } from "redux/actions/authActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

class SideMenu extends Component {
    constructor(props){
        super(props);
        this.state ={
            isNetwork: false,
            isWallet: false,
            isReport: false,
            isPpob: false,
            isStokist: false,
            isOrder: false,

            // isReportWallet: false,

            // NETWORK
            // md_network:true,
            // new_member:'',
        }
        this.changeMenu = this.changeMenu.bind(this);
    }

    changeMenu(e,param,sub_param){
        e.preventDefault();
        // if(param === 'isNetwork'){
        //     this.setState({
        //         isNetwork : !this.state.isNetwork,
        //         isWallet : false,
        //     });
        // }
        // if(param === 'isWallet'){
        //     this.setState({
        //         isNetwork : false,
        //         isWallet : !this.state.isWallet,
        //     });
        // }


        // this.forceUpdate();

        let module = {
            isNetwork : false,
            isWallet : false,
            isReport : false,
            isPpob : false,
            isStokist : false,
            isOrder: false
        }
        let sub_module = {
            // isReportWallet:false,
        }
        module[param] = (this.state[param])&&(sub_param!==undefined)?true:!this.state[param];
        sub_module[sub_param] = !this.state[sub_param];
        let join = Object.assign(module,sub_module);
        this.setState(join);
        this.forceUpdate();
    }
    getProps(param){
        if (param.auth.user) {
            
            if(param.auth.user.akses!==undefined&&param.auth.user.akses!==null){
                // let akses = String(param.auth.user.akses).split('');

                // network
                // let new_member               = akses[0]!==null&&akses[0]!==undefined?akses[0]:"0";   //cek varaibale akses apabila tidak bernilai null
                // start pengecekan apabila fitur bernilai 0
                // if(new_member==='1'){
                //     this.setState({md_network:true});
                // }
                // end pengecekan apabila fitur bernilai 0
                // start set ke state nilai yang sudah dicek
                // this.setState({
                    // NETWORK
                    // new_member:new_member,
                // })
                // end set ke state nilai yang sudah dicek
            }
        }
    }
    // componentDidUpdate(prevState){
    //     if(this.props.auth.user.akses!==prevState.auth.user.akses){
    //         this.getProps(prevState);
    //     }
    // }
    componentDidMount(){
        this.getProps(this.props);
        const path = this.props.location.pathname;
        if(path==='/downline/add' || path==='/binary' || path==='/sponsor' || path==='/rekapitulasi'){
            this.setState({
                isNetwork:true,
            })
        }else if(path==='/deposit'||path==='/penarikan'||path==='/transfer'){
            this.setState({
                isWallet:true,
            })
        }else if(path==='/stokist/pin-aktivasi'||path==='/stokist/pin-ro'){
            this.setState({
                isStokist:true,
            })
        }else if(
            path==='/transaksi/riwayat'
            || path==='/transaksi/ppob'
            || path==='/report/wallet/deposit'
            || path==='/report/wallet/penarikan'){
            this.setState({
                isReport:true,
            })
        } else if (path === '/product' || path === '/cart' || path === '/checkout' || path === '/invoice' || path === '/redeem'||path==='/report/pembelian') {
                this.setState({
                    isOrder: true,
                })
        }else if(
            path==='/ppob/pulsa-all-operator'
            || path==='/ppob/paket-data'
            || path==='/ppob/pulsa-sms-telpon'
            || path==='/ppob/pulsa-transfer'
            || path==='/ppob/e-toll'
            || path==='/ppob/voucher-wifiid'
            || path==='/ppob/e-money'
            || path==='/ppob/pembayaran-pln'
            || path==='/ppob/pembayaran-tv'
            || path==='/ppob/pembayaran-pdam'
            || path==='/ppob/pembayaran-telpon-kabel'
            || path==='/ppob/pembayaran-telpon-pascabayar'
            || path==='/ppob/pembayaran-bpjs'
            || path==='/ppob/pembayaran-asuransi'
            || path==='/ppob/pembayaran-multifinance'
            || path==='/ppob/pembayaran-kereta-api'
            || path==='/ppob/pembayaran-zakat'
            ){
            this.setState({
                isPpob:true,
            })
        }

    }

    componentWillReceiveProps = (nextProps) => {
        this.getProps(nextProps);
        if (this.props.activePath !== nextProps.activePath) {
            this.setState({
                activePath: nextProps.activePath
            })
        }
    }
    handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Apakah anda yakin akan logout aplikasi?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((result) => {
            if (result.value) {
                this.props.logoutUser();
            }
        })
    };
    render() {
        const path = this.props.location.pathname;
        // const {
            //modul only
            // md_network,
            //single only
            // new_member
        // } = this.state;
        return (
            <nav>
                <ul className="sidebar-menu" data-widget="tree">
                    {/* DASHBOARD MODUL START */}
                    <li  className={path==='/dashboard'?"active":''}><Link to="/dashboard"> <i className="fa fa-dashboard" /><span> Dashboard</span></Link></li>
                    {/* DASHBOARD MODUL END */}
                    {/* NETWORK MODUL START */}
                    <li className={"treeview" +(this.state.isNetwork===true
                        || path==='/downline/add'
                        ||path==='/alamat'
                        ||path==='/bank'
                        ||path==='/rekapitulasi'
                        ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isNetwork')}><i className="fa fa-sitemap" /><span>Jaringan</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isNetwork===true?"block":"none"}}>
                            <li className={path==='/binary'?"active":''}><Link to="/binary" style={{width:'fit-content'}}> Genealogy Binary</Link></li>
                            {/* <li className={path==='/downline/add'?"active":''}><Link to="/downline/add" style={{width:'fit-content'}}> Tambah downline</Link></li> */}
                            {/* <li className={path==='/alamat'?"active":''}><Link to="/alamat" style={{width:'fit-content'}}>Alamat</Link></li>
                            <li className={path==='/bank'?"active":''}><Link to="/bank" style={{width:'fit-content'}}>Bank</Link></li> */}
                            <li className={path==='/sponsor'?"active":''}><Link to="/sponsor" style={{width:'fit-content'}}> Genealogy Sponsor</Link></li>
                            <li className={path==='/rekapitulasi'?"active":''}><Link to="/rekapitulasi" style={{width:'fit-content'}}> Rekapitulasi</Link></li>
                        </ul>
                    </li>
                    {/* NETWORK MODUL END */}
                    {/* ORDER MODUL START */}
                    <li className={"treeview" +(this.state.isOrder===true
                        || path === '/product' || path === '/cart' || path === '/checkout' || path === '/invoice' || path === '/redeem' ||path==='/report/pembelian'
                        ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isOrder')}><i className="fa fa-shopping-basket" /> <span>Order</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isOrder===true?"block":"none"}}>
                            <li  className={path==='/product'||path==='/cart'||path==='/checkout'||path==='/invoice'?"active":''}><Link to="/product">  Order Paket</Link></li>
                            <li  className={path==='/redeem'?"active":''}><Link to="/redeem">  Redeem Poin RO</Link></li>
                            <li className={path==='/report/pembelian'?"active":''}><Link to="/report/pembelian" style={{width:'fit-content'}}>Riwayat Pembelian</Link></li>
                        </ul>
                    </li>
                    {/* ORDER MODUL END */}
                    {/* STKIST MODUL START */}
                    {/* <li  className={path==='/stokist'?"active":''}><Link to="/stokist"> <i className="fa fa-dashboard" /><span> Stokist</span></Link></li> */}
                    <li className={"treeview" +(this.state.isStokist===true || path==='/stokist/pin-aktivasi'||path==='/stokist/pin-ro'||path==='/transfer' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isStokist')}><i className="fa fa-tasks" /> <span>Stokist</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isStokist===true?"block":"none"}}>
                            <li className={path==='/stokist/pin-aktivasi'?"active":''}><Link to="/stokist/pin-aktivasi" style={{width:'fit-content'}}> PIN Aktivasi</Link></li>
                            <li className={path==='/stokist/pin-ro'?"active":''}><Link to="/stokist/pin-ro" style={{width:'fit-content'}}>PIN RO</Link></li>
                        </ul>
                    </li>
                    {/* STKIST MODUL END */}
                    {/* PPOB MODUL START */}
                    <li  className={path.split("/")[1]==='ppob' ?"active":''}><Link to="/ppob"> <i className="zmdi zmdi-card-sim" /><span> PPOB</span></Link></li>

                    {/*<li className={"treeview" +(this.state.isPpob===true*/}
                        {/*|| path==='/ppob/pulsa-all-operator'*/}
                        {/*|| path==='/ppob/paket-data'*/}
                        {/*|| path==='/ppob/pulsa-sms-telpon'*/}
                        {/*|| path==='/ppob/pulsa-transfer'*/}
                        {/*|| path==='/ppob/e-toll'*/}
                        {/*|| path==='/ppob/voucher-wifiid'*/}
                        {/*|| path==='/ppob/e-money'*/}
                        {/*|| path==='/ppob/pembayaran-pln'*/}
                        {/*|| path==='/ppob/pembayaran-tv'*/}
                        {/*|| path==='/ppob/pembayaran-pdam'*/}
                        {/*|| path==='/ppob/pembayaran-telpon-kabel'*/}
                        {/*|| path==='/ppob/pembayaran-telpon-pascabayar'*/}
                        {/*|| path==='/ppob/pembayaran-bpjs'*/}
                        {/*|| path==='/ppob/pembayaran-asuransi'*/}
                        {/*|| path==='/ppob/pembayaran-multifinance'*/}
                        {/*|| path==='/ppob/pembayaran-kereta-api'*/}
                        {/*|| path==='/ppob/pembayaran-zakat'*/}
                        {/*?" active menu-open" : "")}>*/}
                        {/*<a href="!#" onClick={(e) => this.changeMenu(e,'isPpob')}><i className="zmdi zmdi-receipt" /> <span>PPOB</span> <i className="fa fa-angle-right" /></a>*/}
                        {/*<ul className={"treeview-menu"} style={{display:this.state.isPpob===true?"block":"none"}}>*/}
                            {/*<li className={path==='/ppob/pulsa-all-operator'?"active":''}><Link to="/ppob/pulsa-all-operator" style={{width:'fit-content'}}> Pulsa All Operator</Link></li>*/}
                            {/*<li className={path==='/ppob/paket-data'?"active":''}><Link to="/ppob/paket-data" style={{width:'fit-content'}}> Paket Data</Link></li>*/}
                            {/*<li className={path==='/ppob/pulsa-sms-telpon'?"active":''}><Link to="/ppob/pulsa-sms-telpon" style={{width:'fit-content'}}> Pulsa Sms Telpon</Link></li>*/}
                            {/*<li className={path==='/ppob/pulsa-transfer'?"active":''}><Link to="/ppob/pulsa-transfer" style={{width:'fit-content'}}> Pulsa Transfer</Link></li>*/}
                            {/*<li className={path==='/ppob/e-toll'?"active":''}><Link to="/ppob/e-toll" style={{width:'fit-content'}}> E-Toll</Link></li>*/}
                            {/*<li className={path==='/ppob/voucher-wifiid'?"active":''}><Link to="/ppob/voucher-wifiid" style={{width:'fit-content'}}> Voucher WIFI.ID</Link></li>*/}
                            {/*<li className={path==='/ppob/e-money'?"active":''}><Link to="/ppob/e-money" style={{width:'fit-content'}}> E-Money</Link></li>*/}
                            {/*<li className={path==='/ppob/pembayaran-pln'?"active":''}><Link to="/ppob/pembayaran-pln" style={{width:'fit-content'}}> Pembayaran PLN</Link></li>*/}
                            {/*<li className={path==='/ppob/pembayaran-tv'?"active":''}><Link to="/ppob/pembayaran-tv" style={{width:'fit-content'}}> Pembayaran TV</Link></li>*/}
                            {/*<li className={path==='/ppob/pembayaran-pdam'?"active":''}><Link to="/ppob/pembayaran-pdam" style={{width:'fit-content'}}> Pembayaran PDAM</Link></li>*/}
                            {/*<li className={path==='/ppob/pembayaran-telpon-kabel'?"active":''}><Link to="/ppob/pembayaran-telpon-kabel" style={{width:'fit-content'}}> Pembayaran Telpon Kabel</Link></li>*/}
                            {/*<li className={path==='/ppob/pembayaran-telpon-pascabayar'?"active":''}><Link to="/ppob/pembayaran-telpon-pascabayar" style={{width:'fit-content'}}> Pembayaran Telpon Pascabayar</Link></li>*/}
                            {/*<li className={path==='/ppob/pembayaran-bpjs'?"active":''}><Link to="/ppob/pembayaran-bpjs" style={{width:'fit-content'}}> Pembayaran BPJS</Link></li>*/}
                            {/*<li className={path==='/ppob/pembayaran-asuransi'?"active":''}><Link to="/ppob/pembayaran-asuransi" style={{width:'fit-content'}}> Pembayaran Asuransi</Link></li>*/}
                            {/*<li className={path==='/ppob/pembayaran-multifinance'?"active":''}><Link to="/ppob/pembayaran-multifinance" style={{width:'fit-content'}}> Pembayaran Multifinance</Link></li>*/}
                            {/*<li className={path==='/ppob/pembayaran-kereta-api'?"active":''}><Link to="/ppob/pembayaran-kereta-api" style={{width:'fit-content'}}> Pembayaran Kereta API</Link></li>*/}
                            {/*<li className={path==='/ppob/pembayaran-zakat'?"active":''}><Link to="/ppob/pembayaran-zakat" style={{width:'fit-content'}}> Zakat</Link></li>*/}
                        {/*</ul>*/}
                    {/*</li>*/}
                    {/* PPOB MODUL END */}
                    {/* WALLET MODUL START */}
                    <li className={"treeview" +(this.state.isWallet===true || path==='/deposit'||path==='/penarikan'||path==='/transfer' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isWallet')}><i className="fa fa-google-wallet" /> <span>Wallet</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isWallet===true?"block":"none"}}>
                            <li className={path==='/deposit'?"active":''}><Link to="/deposit" style={{width:'fit-content'}}> Deposit</Link></li>
                            <li className={path==='/penarikan'?"active":''}><Link to="/penarikan" style={{width:'fit-content'}}>Penarikan</Link></li>
                            <li className={path==='/transfer'?"active":''}><Link to="/transfer" style={{width:'fit-content'}}> Transfer</Link></li>
                        </ul>
                    </li>
                    {/* WALLET MODUL END */}

                    {/* REPORT MODUL START */}
                    <li className={"treeview" +(this.state.isReport===true || path==='/transaksi/riwayat' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isReport')}><i className="fa fa-file-text" /> <span>Laporan</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isReport===true?"block":"none"}}>

                            {/* <li className={path==='/report/pin'?"active":''}><Link to="/report/pin" style={{width:'fit-content'}}> PIN</Link></li> */}
                            <li className={path==='/transaksi/ppob'?"active":''}><Link to="/transaksi/ppob" style={{width:'fit-content'}}> PPOB</Link></li>
                            <li className={path==='/transaksi/riwayat'?"active":''}><Link to="/transaksi/riwayat" style={{width:'fit-content'}}> Riwayat Transaksi</Link></li>
                            <li className={path==='/report/wallet/deposit'?"active":''}><Link to="/report/wallet/deposit" style={{width:'fit-content'}}> Deposit</Link></li>
                            <li className={path==='/report/wallet/penarikan'?"active":''}><Link to="/report/wallet/penarikan" style={{width:'fit-content'}}> Penarikan</Link></li>

                        </ul>
                    </li>
                    {/* REPORT MODUL END */}

                    {/* KONTEN MODUL START */}
                    <li  className={path==='/konten/berita'?"active":''}><Link to="/konten/berita"> <i className="fa fa-newspaper-o" /><span> Berita</span></Link></li>
                    <li  className={path==='/konten/testimoni'?"active":''}><Link to="/konten/testimoni"> <i className="zmdi zmdi-favorite" /><span> Testimoni</span></Link></li>
                    {/* KONTEN MODUL END */}
                    {/* LOGOUT MODUL START */}
                    <li><a href={() => false} style={{cursor:'pointer',color:'#a6b6d0'}} onClick={(event)=>this.handleLogout(event)}> <i className="fa fa-chain-broken" /><span> Logout</span></a></li>
                    {/* LOGOUT MODUL END */}
                </ul>
            </nav>
        )
    }
}
SideMenu.propTypes = {
    logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
    return{
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps,{logoutUser})(SideMenu))