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
        if(path==='/member/add'){
            this.setState({
                isNetwork:true
            })
        }
        else{
            this.setState({
                isNetwork:false
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
        } = this.state
        // console.log(this.state.isNetwork);
        return (
            <nav>
                <ul className="sidebar-menu" data-widget="tree">
                    {/* DASHBOARD MODUL START */}
                    <li  className={path==='/'?"active":''}><Link to="/"> <i className="fa fa-dashboard" /><span> Dashboard</span></Link></li>
                    {/* DASHBOARD MODUL END */}
                    {/* DASHBOARD MODUL START */}
                    <li  className={path==='/product'||path==='/cart'||path==='/checkout'?"active":''}><Link to="/product"> <i className="fa fa-dashboard" /><span> Transaction</span></Link></li>
                    {/* DASHBOARD MODUL END */}

                    {/* NETWORK MODUL START */}
                    <li className={"treeview" +(this.state.isNetwork===true || path==='/member/add' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isNetwork')}><i className="zmdi zmdi-receipt" /> <span>Member</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isNetwork===true?"block":"none"}}>
                            <li className={path==='/member/add'?"active":''}><Link to="/member/add" style={{width:'fit-content'}}> Add Member</Link></li>
                        </ul>
                    </li>

                        {/*<li className={ "treeview" +*/}
                            {/*(this.state.isNetwork===true*/}
                                {/*?" active menu-open" : "")*/}
                        {/*} >*/}

                            {/*<a href="!#" onClick={(e) => this.changeMenu(e,'isNetwork')}><i className="zmdi zmdi-receipt" /> <span>Network</span> <i className="fa fa-angle-right" /></a>*/}
                            {/*<ul className={"treeview-menu animate__animated" + (this.state.isNetwork===true ?" animate__bounceInRight " : " animate__fadeOutLeft ") + "animate__faster"} style={{display:this.state.isNetwork===true*/}
                            {/*?"block" : "none"}}>*/}
                                {/*{new_member!=='1'       ?<li className={path==='/member/add'?"active":''}><Link to="/member/add" style={{width:'fit-content'}}> <i className="fa fa-add" />Add New member</Link></li>:''}*/}
                            {/*</ul>*/}
                        {/*</li>*/}

                    {/*}*/}
                    {/* NETWORK MODUL END */}

                    {/* REPORT MODUL START */}
                    {/* {md_report?
                        <li className={ "treeview" +
                            (this.state.isReport===true
                                ?" active menu-open" : "")
                        } >

                            <a href="!#" onClick={(e) => this.changeMenu(e,'isReport')}><i className="zmdi zmdi-receipt" /> <span>Report</span> <i className="fa fa-angle-right" /></a>
                            <ul className={"treeview-menu animate__animated" + (this.state.isReport===true ?" animate__bounceInRight " : " animate__fadeOutLeft ") + "animate__faster"} style={{display:this.state.isReport===true
                            ?"block" : "none"}}> */}
                                {/* SUBLAPORAN PEMBAYARAN MODUL START */}
                                {/* {md_report_inventory?
                                    <li className={"treeview" + (this.state.isReportAdjustment===true || 
                                        path==='/report/adjustmnet'
                                        ?" active menu-open" : "")}>

                                        <a href="!#" onClick={(e) => this.changeMenu(e,'isReport','isReportAdjustment')}><i className="fa fa-money"/>Inventory <i className="fa fa-angle-right"/></a>
                                        <ul className={"treeview-menu animate__animated" + (this.state.isReportAdjustment===true ?" animate__bounceInRight " : " animate__fadeOutLeft ") + "animate__faster"} style={{display:this.state.isReportAdjustment===true
                                        ?"block" : "none"}}>
                                            {r_adjusment==='1'      ?<li className={path==='/report/adjustment'?"active":''}><Link to="/report/adjustment" style={{width:'fit-content'}}> <i className="fa fa-dollar" />Adjustment</Link></li>:''}
                                        </ul>
                                    </li>
                                    :''
                                } */}
                                {/* SUBLAPORAN PEMBAYARAN MODUL END */}
                            {/* </ul>
                        </li>
                        :''
                    } */}
                    {/* REPORT MODUL END */}

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