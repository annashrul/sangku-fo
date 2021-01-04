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

            // NETWORK
            // md_network:true,
            // new_member:'',
        }
        this.changeMenu = this.changeMenu.bind(this);
    }

    changeMenu(e,param){
        e.preventDefault();
        if(param === 'isNetwork'){
            this.setState({
                isNetwork : !this.state.isNetwork,
                isWallet : false,
            });
        }
        if(param === 'isWallet'){
            this.setState({
                isNetwork : false,
                isWallet : !this.state.isWallet,
            });
        }


        this.forceUpdate();

        // let module = {
        //     isNetwork:false,
        // }
        // let sub_module = {
        //     // isReportAdjustment:false,
        // }
        // module[param] = (this.state[param])&&(sub_param!==undefined)?true:!this.state[param];
        // sub_module[sub_param] = !this.state[sub_param];
        // let join = Object.assign(module,sub_module);
        // this.setState(join);
        // this.forceUpdate();
    }
    getProps(param){
        if (param.auth.user) {
            
            if(param.auth.user.akses!==undefined&&param.auth.user.akses!==null){
                let akses = String(param.auth.user.akses).split('');

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
        if(path==='/member/add' ||path==='/alamat'||path==='/bank'|| path==='/binary' || path==='/sponsor'){
            this.setState({
                isNetwork:true,
            })
        }else if(path==='/deposit'||path==='/penarikan'||path==='/transfer'){
            this.setState({
                isWallet:true,
                isNetwork:false,
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
        const {
            //modul only
            // md_network,
            //single only
            // new_member
        } = this.state;
        return (
            <nav>
                <ul className="sidebar-menu" data-widget="tree">
                    {/* DASHBOARD MODUL START */}
                    <li  className={path==='/dashboard'?"active":''}><Link to="/dashboard"> <i className="fa fa-dashboard" /><span> Dashboard</span></Link></li>
                    {/* DASHBOARD MODUL END */}
                    {/* DASHBOARD MODUL START */}
                    <li  className={path==='/product'||path==='/cart'||path==='/checkout'||path==='/invoice'?"active":''}><Link to="/product"> <i className="fa fa-dashboard" /><span> Transaction</span></Link></li>
                    <li  className={path==='/riwayat_trx'?"active":''}><Link to="/riwayat_trx"> <i className="fa fa-dashboard" /><span> Riwayat Transaksi</span></Link></li>
                    {/* DASHBOARD MODUL END */}
                    {/* NETWORK MODUL START */}
                    <li className={"treeview" +(this.state.isNetwork===true || path==='/member/add'||path==='/alamat'||path==='/bank' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isNetwork')}><i className="zmdi zmdi-receipt" /> <span>Network</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isNetwork===true?"block":"none"}}>
                            <li className={path==='/binary'?"active":''}><a href="/binary" style={{width:'fit-content'}}> Binary Tree</a></li>
                            <li className={path==='/member/add'?"active":''}><Link to="/member/add" style={{width:'fit-content'}}> Add Member</Link></li>
                            {/* <li className={path==='/alamat'?"active":''}><Link to="/alamat" style={{width:'fit-content'}}>Alamat</Link></li>
                            <li className={path==='/bank'?"active":''}><Link to="/bank" style={{width:'fit-content'}}>Bank</Link></li> */}
                            <li className={path==='/sponsor'?"active":''}><Link to="/sponsor" style={{width:'fit-content'}}> Sponsor Tree</Link></li>
                        </ul>
                    </li>
                    {/* NETWORK MODUL END */}
                    {/* WALLET MODUL START */}
                    <li className={"treeview" +(this.state.isWallet===true || path==='/deposit'||path==='/penarikan'||path==='/transfer' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isWallet')}><i className="zmdi zmdi-receipt" /> <span>Wallet</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isWallet===true?"block":"none"}}>
                            <li className={path==='/deposit'?"active":''}><Link to="/deposit" style={{width:'fit-content'}}> Deposit</Link></li>
                            <li className={path==='/penarikan'?"active":''}><Link to="/penarikan" style={{width:'fit-content'}}>Penarikan</Link></li>
                            <li className={path==='/transfer'?"active":''}><Link to="/transfer" style={{width:'fit-content'}}> Transfer</Link></li>
                        </ul>
                    </li>
                    {/* WALLET MODUL END */}
                    {/* LOGOUT MODUL START */}
                    <li><a href={null} style={{cursor:'pointer',color:'#a6b6d0'}} onClick={(event)=>this.handleLogout(event)}> <i className="fa fa-chain-broken" /><span> Logout</span></a></li>
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