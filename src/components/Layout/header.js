import React, { Component } from 'react'
import {connect} from 'react-redux'
import { logoutUser } from "redux/actions/authActions";
import PropTypes from "prop-types";
import {setEcaps} from 'redux/actions/site.action'
import {setMobileEcaps} from 'redux/actions/site.action'
import { Link, withRouter } from 'react-router-dom';
import isMobile from 'react-device-detect';
// import moment from "moment";
import Swal from "sweetalert2";
import {toRp} from "helper";
// import {HEADERS} from "redux/actions/_constants"
import {
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap';
import {noImage} from "helper";
import socketIOClient from "socket.io-client";
import {HEADERS} from 'redux/actions/_constants'
import Cookies from 'js-cookie'
import { NOTIF_ALERT } from '../../redux/actions/_constants';
import { putNotif } from '../../redux/actions/site.action';
import { deleteCart } from '../../redux/actions/product/cart.action';
const socket = socketIOClient(HEADERS.URL, {
    withCredentials: true,
    secure: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleEcaps=this.handleEcaps.bind(this)
        this.handleMobileEcaps=this.handleMobileEcaps.bind(this)
        this.handleToggleMobileNav=this.handleToggleMobileNav.bind(this)
        this.handleNotif=this.handleNotif.bind(this)
        this.state = {
            totCart:0,
            toggleMobileNav:false,
            isShowNotif:false,
            list_notif:[],
            list_cart:[],
            pending_trx:[],
            pending_tagihan:[],
        }
        socket.on('refresh_notif',(data)=>{
            const my_id = atob(Cookies.get('sangqu_exp'));
            const update_id=data.id;
            
            if(my_id===update_id){
            

                this.refreshData(update_id);
            }
        })
        socket.on("set_notif", (data) => {
            this.setState({
                list_notif:data.list_notif,
                list_cart:data.list_cart,
                pending_trx:data.pending_trx,
                pending_tagihan:data.pending_tagihan,
            })
        })
    }
    refreshData(id){
        setInterval(function () {
            // socket.emit('getMessages')
            socket.emit('get_notif', {id_member:id})
        }, 2000); /* Request data from the socket every 10 seconds */
        socket.on("set_notif", (data) => {
            // 
            this.setState({
                list_notif:data.list_notif,
                list_cart:data.list_cart,
                pending_trx:data.pending_trx,
                pending_tagihan:data.pending_tagihan,
            })
        })
    }
    rmCart(e,data){
        e.preventDefault();
        // if(parseInt(data.status,10)===0){
            this.props.deleteCart(data.id)
            const my_id = atob(Cookies.get('sangqu_exp'));
            this.refreshData(my_id);
        // }
    }
    handleNotif(e,data){
        e.preventDefault();
        if(parseInt(data.status,10)===0){
            this.props.putNotif({'id':data.id})
        }
    }
    handleLogout = () => {
        this.props.logoutUser();
    };

    handleEcaps=()=>{
        const bool = !this.props.triggerEcaps;
        this.props.setEcaps(bool);
    }
    handleMobileEcaps=()=>{
        const bool = !this.props.triggerMobileEcaps;
        this.props.setMobileEcaps(bool);
    }
    handleToggleMobileNav=()=>{
        this.setState({
            toggleMobileNav:!this.state.toggleMobileNav
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.resCart.data.length !== this.state.totCart){
            this.setState({totCart:nextProps.resCart.data.length});
        }
    }
    
    componentWillUnmount() {
        this.unlisten();
    }

    componentWillMount(){
        this.refreshData(atob(Cookies.get('sangqu_exp')));
        this.unlisten = this.props.history.listen((location, action) => {
            this.props.setMobileEcaps(false);
        });
    }

    infoCart(e){
        e.preventDefault();
        Swal.fire({
            title:"Perhatian !!",
            text:"maaf kernjang anda masih kosong",
            icon:"warning"
        })
    }
    render() {
        return (
        // <!-- Top Header Area -->
        <header className="top-header-area d-flex align-items-center justify-content-between" style={{backgroundColor:(!isMobile?'':'#242939')}} >
            <div className="left-side-content-area d-flex align-items-center">
                {/* Mobile Logo */}
                    <div className="mobile-logo mr-3 mr-sm-4">
                        <Link to={'./'} ><img src="/favicon.png" onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}}  alt="Mobile Logo"/></Link>
                    </div>
                {/* <!-- Triggers --> */}
                <div className="ecaps-triggers mr-1 mr-sm-3">
                    <div className="menu-collasped" id="menuCollasped" onClick={(e)=>{e.preventDefault();this.handleEcaps();}}>
                        <i className="zmdi zmdi-menu"/>
                    </div>
                    <div className="mobile-menu-open" id="mobileMenuOpen" onClick={(e)=>{e.preventDefault();this.handleMobileEcaps();}}>
                        <i className="zmdi zmdi-menu"/>
                    </div>
                </div>

                {/* <!-- Left Side Nav --> */}
                
            </div>

            <div className="right-side-navbar d-flex align-items-center justify-content-end">
                {/* <!-- Mobile AREAAAAAA --> */}
                <div className="right-side-trigger d-xl-none d-lg-none d-md-none" style={{width:'100%',height:'unset',marginRight:'unset',display:'contents'}} >
                    <li className="nav-item dropdown" style={{listStyleType:'none'}}>
                    
                        <UncontrolledButtonDropdown>
                                    <DropdownToggle className="nohover">
                                        <i className="fa fa-bell text-warning" aria-hidden="true" style={{fontSize:"20px"}}/>
                                        {
                                            this.state.list_notif.length>0?
                                                <span className="active-status"></span>:''
                                        }
                                    </DropdownToggle>
                                <DropdownMenu right>
                                <div className="top-notifications-area">
                                    {/* Heading */}
                                    <div className="notifications-heading bg-warning">
                                        <div className="heading-title">
                                        <h6>Notifikasi</h6>
                                        </div>
                                        <span>{this.state.list_notif.length}</span>
                                    </div>
                                    <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: 260}}>
                                        <div className="notifications-box" id="notificationsBox" style={{overflow: 'auto', width: 'auto', height: 260}}>
                                        {typeof this.state.pending_tagihan === 'object' ? this.state.pending_tagihan.length > 0 ?
                                            <>
                                            <small className="text-muted m-3">Tagihan Tertunda</small>
                                            {
                                                typeof this.state.pending_tagihan === 'object' ? this.state.pending_tagihan.length > 0 ?
                                                    this.state.pending_tagihan.map((v, i) => {
                                                        return (
                                                            <Link to={`/invoice/${btoa(v.kd_trx)}`} className="dropdown-item"><i className="zmdi zmdi-card-sim bg-danger text-light" /><span>{v.kategori}<br/><small className="text-muted">{v.note} | {v.produk} | {toRp(v.harga)}</small></span></Link>
                                                        );
                                                    }
                                                )
                                                : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" /> : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" />
                                            }
                                            </>
                                            :'':''
                                        }
                                        {typeof this.state.pending_trx === 'object' ? this.state.pending_trx.length > 0 ?
                                            <>
                                            <div className="text-muted m-0 p-0 bg-white" style={{position: 'sticky', bottom: '17px'}}><small className="ml-3">Transaksi Tertunda</small></div>
                                            {
                                                typeof this.state.pending_trx === 'object' ? this.state.pending_trx.length > 0 ?
                                                    this.state.pending_trx.map((v, i) => {
                                                        return (
                                                            <Link to={`/invoice/${btoa(v.kd_trx)}`} className="dropdown-item"><i className="fa fa-shopping-basket bg-info text-light" /><span>{toRp(v.amount)}<br/><small className="text-muted">{v.kd_trx}</small></span></Link>
                                                        );
                                                    }
                                                )
                                                : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" /> : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" />
                                            }
                                            </>
                                            :'':''
                                        }
                                        <div className="text-muted m-0 p-0 bg-white" style={{position: 'sticky', bottom: '-1px'}}><small className="ml-3">Semua Pemberitahuan</small></div>
                                        {
                                            typeof this.state.list_notif === 'object' ? this.state.list_notif.length > 0 ?
                                                this.state.list_notif.map((v, i) => {
                                                    return (
                                                        <a href={()=> false} className="dropdown-item cursor-pointer" onClick={(e)=>this.handleNotif(e,v)}><i className="zmdi zmdi-notifications-active bg-success text-light" /><span>{v.title}<br/><small className="text-muted">{v.msg}</small></span></a>
                                                    );
                                                }
                                            )
                                            : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" /> : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" />
                                        }
                                        </div><div className="slimScrollBar" style={{background: 'rgb(140, 140, 140)', width: 2, position: 'absolute', top: 0, opacity: '0.4', display: 'none', borderRadius: 7, zIndex: 99, right: 0, height: '97.4063px'}} /><div className="slimScrollRail" style={{width: 2, height: '100%', position: 'absolute', top: 0, display: 'none', borderRadius: 7, background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: 90, right: 0}} /></div>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>

                    </li>
                    {
                        parseInt(localStorage.totCart,10)>0?(
                            <li className="nav-item dropdown" style={{listStyleType:'none', whiteSpace:'nowrap'}}>
                                <Link to={"/cart"}>
                                    <i className="fa fa-shopping-cart text-secondary" aria-hidden="true" style={{fontSize:"30px"}}/>
                                    <label className="badge badge-success" id={"lblCartCount"} style={{marginLeft:"1px",verticalAlign:"top",padding:"1 5px",fontSize:"10px"}}>{localStorage.totCart}</label>
                                </Link>
                            </li>
                        ):(
                            <li className="nav-item dropdown" style={{listStyleType:'none', whiteSpace:'nowrap'}} onClick={this.infoCart.bind(this)}>
                                <i className="fa fa-shopping-cart text-secondary" aria-hidden="true" style={{fontSize:"30px"}}/>
                                <label className="badge badge-success" id={"lblCartCount"} style={{marginLeft:"1px",verticalAlign:"top",padding:"1 5px",fontSize:"10px"}}>{localStorage.totCart}</label>
                            </li>
                        )
                    }
                    <li className="nav-item dropdown" style={{listStyleType:'none'}}>
                        <UncontrolledButtonDropdown >
                                <DropdownToggle className="nohover">
                                    <img src={this.props.auth.user.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}}  alt=""/>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <div className="user-profile-area">
                                        <div className="user-profile-heading">
                                            <div className="profile-img">
                                                <img className="chat-img mr-2" src={this.props.auth.user.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}}  alt=""/>
                                            </div>
                                            <div className="profile-text">
                                                <h6>{this.props.auth.user.full_name}</h6>
                                                <span>{this.props.auth.user.referral_code}</span>
                                            </div>
                                        </div>
                                        <DropdownItem  onClick={(e)=>{e.preventDefault();this.props.history.push({pathname: '/profile'});}}>
                                        <i className="fa fa-user profile-icon bg-primary text-white" aria-hidden="true"/> Profile
                                        </DropdownItem>
                                        {/* <DropdownItem  onClick={(e)=>{e.preventDefault();this.props.history.push({pathname: '/alamat'});}}>
                                        <i className="fa fa-map-marker profile-icon bg-info" aria-hidden="true"/> Alamat
                                        </DropdownItem>
                                        <DropdownItem  onClick={(e)=>{e.preventDefault();this.props.history.push({pathname: '/bank'});}}>
                                        <i className="fa fa-bank profile-icon bg-info" aria-hidden="true"/> Data Bank
                                        </DropdownItem> */}
                                        <DropdownItem  onClick={this.handleLogout}>
                                        <i className="fa fa-chain-broken profile-icon bg-warning text-white" aria-hidden="true"/> Sign-out
                                        </DropdownItem>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                    </li>
                </div>
                {/* <!-- END Mobile AREAAAAAA --> */}

                {/* <!-- Top Bar Nav --> */}
                <ul className={"right-side-content d-flex align-items-center " + (this.state.toggleMobileNav === true? "active":"")}>
                    <li className="nav-item dropdown">
                        <UncontrolledButtonDropdown>
                                    <DropdownToggle className="nohover">
                                        <i className="fa fa-bell text-warning" aria-hidden="true" style={{fontSize:"20px"}}/>
                                        {
                                            this.state.list_notif.length>0?
                                                <span className="active-status"></span>:''
                                        }
                                    </DropdownToggle>
                                <DropdownMenu right>
                                <div className="top-notifications-area">
                                    {/* Heading */}
                                    <div className="notifications-heading bg-warning">
                                        <div className="heading-title">
                                        <h6>Notifikasi</h6>
                                        </div>
                                        <span>{this.state.list_notif.length}</span>
                                    </div>
                                    <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: 260}}>
                                        <div className="notifications-box" id="notificationsBox" style={{overflow: 'auto', width: 'auto', height: 260}}>
                                        {typeof this.state.pending_tagihan === 'object' ? this.state.pending_tagihan.length > 0 ?
                                            <>
                                            <small className="text-muted m-3">Tagihan Tertunda</small>
                                            {
                                                typeof this.state.pending_tagihan === 'object' ? this.state.pending_tagihan.length > 0 ?
                                                    this.state.pending_tagihan.map((v, i) => {
                                                        return (
                                                            <Link to={`/invoice/${btoa(v.kd_trx)}`} className="dropdown-item"><i className="zmdi zmdi-card-sim bg-danger" /><span>{v.kategori}<br/><small className="text-muted">{v.note} | {v.produk} | {toRp(v.harga)}</small></span></Link>
                                                        );
                                                    }
                                                )
                                                : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" /> : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" />
                                            }
                                            </>
                                            :'':''
                                        }
                                        {typeof this.state.pending_trx === 'object' ? this.state.pending_trx.length > 0 ?
                                            <>
                                            <div className="text-muted m-0 p-0 bg-white" style={{position: 'sticky', bottom: '17px'}}><small className="ml-3">Transaksi Tertunda</small></div>
                                            {
                                                typeof this.state.pending_trx === 'object' ? this.state.pending_trx.length > 0 ?
                                                    this.state.pending_trx.map((v, i) => {
                                                        return (
                                                            <Link to={`/invoice/${btoa(v.kd_trx)}`} className="dropdown-item"><i className="fa fa-shopping-basket bg-info" /><span>{toRp(v.amount)}<br/><small className="text-muted">{v.kd_trx}</small></span></Link>
                                                        );
                                                    }
                                                )
                                                : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" /> : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" />
                                            }
                                            </>
                                            :'':''
                                        }
                                        <div className="text-muted m-0 p-0 bg-white" style={{position: 'sticky', bottom: '-1px'}}><small className="ml-3">Semua Pemberitahuan</small></div>
                                        {
                                            typeof this.state.list_notif === 'object' ? this.state.list_notif.length > 0 ?
                                                this.state.list_notif.map((v, i) => {
                                                    return (
                                                        <a href={()=> false} className="dropdown-item cursor-pointer" onClick={(e)=>this.handleNotif(e,v)}><i className="zmdi zmdi-notifications-active bg-success" /><span>{v.title}<br/><small className="text-muted">{v.msg}</small></span></a>
                                                    );
                                                }
                                            )
                                            : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" /> : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" />
                                        }
                                        </div><div className="slimScrollBar" style={{background: 'rgb(140, 140, 140)', width: 2, position: 'absolute', top: 0, opacity: '0.4', display: 'none', borderRadius: 7, zIndex: 99, right: 0, height: '97.4063px'}} /><div className="slimScrollRail" style={{width: 2, height: '100%', position: 'absolute', top: 0, display: 'none', borderRadius: 7, background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: 90, right: 0}} /></div>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>

                    </li>
                    <li className="nav-item dropdown">
                        <UncontrolledButtonDropdown>
                                    <DropdownToggle className="nohover m-0">
                                        <i className="fa fa-shopping-cart text-secondary" aria-hidden="true" style={{fontSize:"26px"}}/>
                                        {/* <span className="active-status"></span> */}
                                        <label className="badge badge-success" id={"lblCartCount"} style={{marginLeft:"1px",verticalAlign:"top",padding:"1 5px",fontSize:"10px"}}>{this.state.list_cart.length}</label>
                                    </DropdownToggle>
                                <DropdownMenu right>
                                <div className="top-notifications-area">
                                    {/* Heading */}
                                    <div className="notifications-heading bg-secondary">
                                        <div className="heading-title">
                                        <h6>Keranjang</h6>
                                        </div>
                                        <span>{this.state.list_cart.length}</span>
                                    </div>
                                    <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: 260}}>
                                        <div className="notifications-box" id="notificationsBox" style={{overflow: 'auto', width: 'auto', height: 260}}>
                                        {
                                            typeof this.state.list_cart === 'object' ? this.state.list_cart.length > 0 ?
                                                this.state.list_cart.map((v, i) => {
                                                    return (
                                                        <a href={()=> false} className="dropdown-item">
                                                            {/* <i className="zmdi zmdi-notifications-active bg-success" /> */}
                                                            <img className="img-fluid mr-2" src={HEADERS.URL+'images/'+v.foto} style={{height:'40px'}} alt={v.title}/>
                                                            <div className="d-flex justify-content-between align-items-center w-100">
                                                                <span>{v.title}<br/><small className="text-muted">{toRp(v.harga)}</small></span>
                                                                <div className="d-flex">
                                                                    <span><small>QTY</small> : {v.qty}x</span>
                                                                    <button type="button" className="btn btn-outline-danger btn-sm ml-3 mr-0 border-none" style={{color:'#dc3545'}} onClick={(e)=>this.rmCart(e,v)}><i className="fa fa-trash"></i></button>
                                                                </div>

                                                            </div>
                                                        </a>
                                                    );
                                                }
                                            )
                                            : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" /> : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" />
                                        }
                                        </div>
                                        <div className="slimScrollBar" style={{background: 'rgb(140, 140, 140)', width: 2, position: 'absolute', top: 0, opacity: '0.4', display: 'none', borderRadius: 7, zIndex: 99, right: 0, height: '97.4063px'}} /><div className="slimScrollRail" style={{width: 2, height: '100%', position: 'absolute', top: 0, display: 'none', borderRadius: 7, background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: 90, right: 0}} />
                                    </div>
                                    <div className="notifications-heading bg-transparent pb-2" style={{display:'inline-table'}}>
                                        <Link to={`/cart`} className="mt-1 mb-1">Lihat keranjang <i className="fa fa-cart"/></Link>
                                        <br/>
                                        <h6 style={{whiteSpace:'no-wrap'}}>Total : {this.state.list_cart.length > 0 ? toRp(this.state.list_cart.reduce((a, b) => ({harga: (parseInt(a.harga,10)*parseInt(a.qty,10)) + (parseInt(b.harga,10)*parseInt(b.qty,10))})).harga) :0}</h6>
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <Link
                                                to={'/product'}
                                                className="btn btn-secondary m-0 pb-2"
                                                style={{
                                                    backgroundColor:'#5d87ff',
                                                    border:'1px solid #5d87ff',
                                                    fontSize:'14px',
                                                    borderRadius: '0.15rem',
                                                    fontWeight: '600',
                                                    letterSpacing: '0.5px',
                                                    color:'#fff',
                                                    display:'inline-block',
                                                    textAlign:'center',
                                                    verticalAlign:'middle',
                                                    userSelect:'none',
                                                    padding:'0.375rem 0.75rem'
                                                }}
                                                >
                                                        Belanja Lagi
                                            </Link>
                                            <Link
                                                to={'/checkout'}
                                                className="btn btn-primary m-0 pb-2"
                                                style={{
                                                    backgroundColor:'rgb(66, 181, 73)',
                                                    border:'1px solid rgb(66, 181, 73)',
                                                    fontSize:'14px',
                                                    borderRadius: '0.15rem',
                                                    fontWeight: '600',
                                                    letterSpacing: '0.5px',
                                                    color:'#fff',
                                                    display:'inline-block',
                                                    textAlign:'center',
                                                    verticalAlign:'middle',
                                                    userSelect:'none',
                                                    padding:'0.375rem 0.75rem'
                                                }}
                                                >
                                                        Bayar
                                            </Link>
                                        </div>
                                    </div>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>

                    </li>
                    {/* {
                        parseInt(localStorage.totCart,10)>0?(
                            <li className="nav-item dropdown">
                                <Link to={"/cart"}>
                                    <i className="fa fa-shopping-cart" aria-hidden="true" style={{fontSize:"30px"}}/>
                                    <label className="badge badge-success" id={"lblCartCount"} style={{marginLeft:"1px",verticalAlign:"top",padding:"1 5px",fontSize:"10px"}}>{localStorage.totCart}</label>
                                </Link>
                            </li>
                        ):(
                            <li className="nav-item dropdown" onClick={this.infoCart.bind(this)}>
                                <i className="fa fa-shopping-cart" aria-hidden="true" style={{fontSize:"30px"}}/>
                                <label className="badge badge-success" id={"lblCartCount"} style={{marginLeft:"1px",verticalAlign:"top",padding:"1 5px",fontSize:"10px"}}>{localStorage.totCart}</label>
                            </li>
                        )
                    } */}

                    <li className="nav-item dropdown">
                            <UncontrolledButtonDropdown>
                                    <DropdownToggle className="nohover">
                                        <img src={this.props.auth.user.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}}  alt=""/>
                                        <div className="user-name">
                                            <div className={"d-flex justify-content-between align-items-center"}>
                                                <div className="fs1">
                                                    <p>{this.props.auth.user.full_name}</p>
                                                    <span>{this.props.auth.user.referral_code}</span>
                                                </div>
                                                <div className="fs1"  style={{paddingLeft:'10px'}}>
                                                    <p><i className="fa fa-angle-down lnr"/></p>

                                                </div>
                                            </div>
                                        </div>
                                    </DropdownToggle>
                                <DropdownMenu right>
                                    <div className="user-profile-area">
                                        <div className="user-profile-heading">
                                            <div className="profile-img">
                                                <img className="chat-img mr-2" src={this.props.auth.user.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}}  alt=""/>
                                            </div>
                                            <div className="profile-text">
                                                <h6>{this.props.auth.user.full_name}</h6>
                                                <span>{this.props.auth.user.referral_code}</span>
                                            </div>
                                        </div>
                                        <DropdownItem  onClick={(e)=>{e.preventDefault();this.props.history.push({pathname: '/profile'});}}>
                                        <i className="fa fa-user profile-icon bg-primary" aria-hidden="true"/> Profile
                                        </DropdownItem>
                                        {/* <DropdownItem  onClick={(e)=>{e.preventDefault();this.props.history.push({pathname: '/alamat'});}}>
                                        <i className="fa fa-map-marker profile-icon bg-info" aria-hidden="true"/> Alamat
                                        </DropdownItem>
                                        <DropdownItem  onClick={(e)=>{e.preventDefault();this.props.history.push({pathname: '/bank'});}}>
                                        <i className="fa fa-bank profile-icon bg-info" aria-hidden="true"/> Data Bank
                                        </DropdownItem> */}
                                        <DropdownItem  onClick={this.handleLogout}>
                                        <i className="fa fa-chain-broken profile-icon bg-warning" aria-hidden="true"/> Sign-out
                                        </DropdownItem>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                    </li>
                    </ul>
            </div>
        </header>
        );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  putNotif: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired,
  setEcaps: PropTypes.func.isRequired,
  setMobileEcaps: PropTypes.func.isRequired,
  auth: PropTypes.object,
  cartReducer: PropTypes.object,
  triggerEcaps: PropTypes.bool,
  triggerMobileEcaps: PropTypes.bool,
};

const mapStateToProps = ({auth,siteReducer,cartReducer}) =>{
     return{
        resCart:cartReducer,
        auth: auth,
        triggerEcaps: siteReducer.triggerEcaps,
        triggerMobileEcaps: siteReducer.triggerMobileEcaps
     }
}
export default withRouter(connect(mapStateToProps,{logoutUser,setEcaps,setMobileEcaps,putNotif,deleteCart})(Header));