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
        isDay:7,
        tanggal_tempo:"",
        server_price:"",
        acc_name:"",
        acc_number:"",
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
//     UNSAFE_componentWillMount(){
//     fetch(HEADERS.URL + `site/logo`)
//         .then(res => res.json())
//         .then(
//             (data) => {
//                 if (parseInt(data.result.day,10)===0||parseInt(data.result.day,10) < 0){
//                     Swal.fire({
//                         title: 'Warning!',
//                         html: `<h6>Aplikasi telah kedaluarsa.</h6><br/>
//                             <p>Silahkan lakukan pembayaran<br> melalui rekening berikut ini,</p>
//                             <b>Jumlah:</b><br/>
//                             ${data.result.server_price}<br/>
//                             <b>No. rekening:</b><br/>
//                             ${data.result.acc_number}<br/>
//                             <b>Atas nama:</b><br/>
//                             ${data.result.acc_name}`,
//                         icon: 'warning',
//                         confirmButtonColor: '#ff9800',
//                         confirmButtonText: 'Oke',
//                     }).then((result) => {

//                     })
//                     this.props.logoutUser();
//                 }
//                 localStorage.setItem("site_title", data.result.title);

//                 this.setState({
//                     isShowNotif: parseInt(data.result.day,10) <= 7 ? true : false,
//                     isDay: data.result.day,
//                     tanggal_tempo: moment(data.result.tgl_tempo).format("yyyy-MM-DD"),
//                     server_price: data.result.server_price,
//                     acc_name: data.result.acc_name,
//                     acc_number: data.result.acc_number
//                 })
//             },
//             (error) => {
//                 this.setState({
//                     isLoaded: true,
//                     error
//                 });
//             }
//         )

//   }

    UNSAFE_componentWillReceiveProps(nextProps){
      if(nextProps.resCart.data.length !== this.state.totCart){
          this.setState({totCart:nextProps.resCart.data.length});
      }
      // console.log(nextProps.resCart.data);
  }



  handleNotif(e){
      e.preventDefault();
      Swal.fire({
          title: 'Informasi Pembayaran.',
          html:`<div class="card"><div class="card-header"><h6 class="text-left">Silahkan lakukan pembayaran ke akun dibawah ini</h6></div><div class="card-body"><table class="table table-bordered table-hover"><thead><tr><th>Harga Server</th><th>No. Rekening</th><th>Atas Nama</th></tr></thead><tbody><tr><td>${toRp(parseInt(this.state.server_price,10))}</td><td>${this.state.acc_number}</td><td>${this.state.acc_name}</td></tr></tbody></table></div></div>`,
          icon: 'info',
          confirmButtonColor: '#ff9800',
          confirmButtonText: 'Oke',
      }).then((result) => {

      })
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

      const {isShowNotif,isDay} = this.state;
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
              <ul className="left-side-navbar d-flex align-items-center">
                  
                {
                    isShowNotif?(
                        <li className={`full-screen-mode ml-1 animate__animated animate__bounceInRight`} style={{marginTop:"14px",cursor:"pointer"}} onClick={this.handleNotif}>
                            <div className="alert alert-warning" style={{backgroundColor:"#ffeb3b",border:'none'}} role="alert">
                                <p style={{marginBottom:'0'}}><i className="fa fa-warning"/> Aplikasi kedaluarsa {isDay} hari lagi. </p>
                            </div>
                        </li>
                    ):""
                }
              </ul>
          </div>

          <div className="right-side-navbar d-flex align-items-center justify-content-end">
              {/* <!-- Mobile AREAAAAAA --> */}
              <div className="right-side-trigger d-xl-none d-lg-none d-md-none" style={{width:'100%',height:'unset',marginRight:'unset',display:'contents'}} >
                <li className="nav-item dropdown" style={{listStyleType:'none'}}>
                    {/* <i className="fa fa-bell" aria-hidden="true" style={{fontSize:"30px"}}/>
                    <label className="badge badge-success" id={"lblCartCount"} style={{marginLeft:"1px",verticalAlign:"top",padding:"1 5px",fontSize:"10px"}}>{localStorage.totCart}</label> */}
                    <UncontrolledButtonDropdown>
                                <DropdownToggle className="nohover">
                                    {/* <img src={this.props.auth.user.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}}  alt=""/>
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
                                    </div> */}
                                    <i className="fa fa-bell text-warning" aria-hidden="true" style={{fontSize:"20px"}}/>
                                    {/* <label className="badge badge-dark" id={"lblCartCount"} style={{marginLeft:"1px",verticalAlign:"top",padding:"1 5px",fontSize:"10px"}}>{localStorage.totCart}</label> */}
                                    <span className="active-status"></span>
                                </DropdownToggle>
                            <DropdownMenu right>
                            <div className="top-notifications-area">
                                {/* Heading */}
                                <div className="notifications-heading">
                                    <div className="heading-title">
                                    <h6>Notifications</h6>
                                    </div>
                                    <span>1 New</span>
                                </div>
                                <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: 260}}>
                                    <div className="notifications-box" id="notificationsBox" style={{overflow: 'auto', width: 'auto', height: 260}}>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-face-smile bg-success" /><span>We've got something for you!</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="zmdi zmdi-notifications-active bg-danger" /><span>Domain names expiring on Tuesday</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-check" /><span>Your commissions has been sent</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-heart bg-success" /><span>You sold an item!</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-bolt bg-warning" /><span>Security alert for your linked Google account</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-face-smile bg-success" /><span>We've got something for you!</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="zmdi zmdi-notifications-active bg-danger" /><span>Domain names expiring on Tuesday</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-check" /><span>Your commissions has been sent</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-heart bg-success" /><span>You sold an item!</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-bolt bg-warning" /><span>Security alert for your linked Google account</span></a>
                                    </div><div className="slimScrollBar" style={{background: 'rgb(140, 140, 140)', width: 2, position: 'absolute', top: 0, opacity: '0.4', display: 'none', borderRadius: 7, zIndex: 99, right: 0, height: '97.4063px'}} /><div className="slimScrollRail" style={{width: 2, height: '100%', position: 'absolute', top: 0, display: 'none', borderRadius: 7, background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: 90, right: 0}} /></div>
                                </div>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>

                </li>
                {
                    parseInt(localStorage.totCart,10)>0?(
                        <li className="nav-item dropdown" style={{listStyleType:'none', whiteSpace:'nowrap'}}>
                            <Link to={"/cart"}>
                                <i className="fa fa-shopping-cart" aria-hidden="true" style={{fontSize:"30px"}}/>
                                <label className="badge badge-success" id={"lblCartCount"} style={{marginLeft:"1px",verticalAlign:"top",padding:"1 5px",fontSize:"10px"}}>{localStorage.totCart}</label>
                            </Link>
                        </li>
                    ):(
                        <li className="nav-item dropdown" style={{listStyleType:'none', whiteSpace:'nowrap'}} onClick={this.infoCart.bind(this)}>
                            <i className="fa fa-shopping-cart" aria-hidden="true" style={{fontSize:"30px"}}/>
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
                                    <i className="fa fa-user profile-icon bg-primary" aria-hidden="true"/> Profile
                                    </DropdownItem>
                                    <DropdownItem  onClick={(e)=>{e.preventDefault();this.props.history.push({pathname: '/alamat'});}}>
                                    <i className="fa fa-map-marker profile-icon bg-info" aria-hidden="true"/> Alamat
                                    </DropdownItem>
                                    <DropdownItem  onClick={(e)=>{e.preventDefault();this.props.history.push({pathname: '/bank'});}}>
                                    <i className="fa fa-bank profile-icon bg-info" aria-hidden="true"/> Data Bank
                                    </DropdownItem>
                                    <DropdownItem  onClick={this.handleLogout}>
                                    <i className="fa fa-chain-broken profile-icon bg-warning" aria-hidden="true"/> Sign-out
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
                    {/* <i className="fa fa-bell" aria-hidden="true" style={{fontSize:"30px"}}/>
                    <label className="badge badge-success" id={"lblCartCount"} style={{marginLeft:"1px",verticalAlign:"top",padding:"1 5px",fontSize:"10px"}}>{localStorage.totCart}</label> */}
                    <UncontrolledButtonDropdown>
                                <DropdownToggle className="nohover">
                                    {/* <img src={this.props.auth.user.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}}  alt=""/>
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
                                    </div> */}
                                    <i className="fa fa-bell text-warning" aria-hidden="true" style={{fontSize:"20px"}}/>
                                    {/* <label className="badge badge-dark" id={"lblCartCount"} style={{marginLeft:"1px",verticalAlign:"top",padding:"1 5px",fontSize:"10px"}}>{localStorage.totCart}</label> */}
                                    <span className="active-status"></span>
                                </DropdownToggle>
                            <DropdownMenu right>
                            <div className="top-notifications-area">
                                {/* Heading */}
                                <div className="notifications-heading">
                                    <div className="heading-title">
                                    <h6>Notifications</h6>
                                    </div>
                                    <span>1 New</span>
                                </div>
                                <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: 260}}>
                                    <div className="notifications-box" id="notificationsBox" style={{overflow: 'auto', width: 'auto', height: 260}}>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-face-smile bg-success" /><span>We've got something for you!</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="zmdi zmdi-notifications-active bg-danger" /><span>Domain names expiring on Tuesday</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-check" /><span>Your commissions has been sent</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-heart bg-success" /><span>You sold an item!</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-bolt bg-warning" /><span>Security alert for your linked Google account</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-face-smile bg-success" /><span>We've got something for you!</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="zmdi zmdi-notifications-active bg-danger" /><span>Domain names expiring on Tuesday</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-check" /><span>Your commissions has been sent</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-heart bg-success" /><span>You sold an item!</span></a>
                                    <a href={()=> false} className="dropdown-item"><i className="ti-bolt bg-warning" /><span>Security alert for your linked Google account</span></a>
                                    </div><div className="slimScrollBar" style={{background: 'rgb(140, 140, 140)', width: 2, position: 'absolute', top: 0, opacity: '0.4', display: 'none', borderRadius: 7, zIndex: 99, right: 0, height: '97.4063px'}} /><div className="slimScrollRail" style={{width: 2, height: '100%', position: 'absolute', top: 0, display: 'none', borderRadius: 7, background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: 90, right: 0}} /></div>
                                </div>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>

                </li>
                {
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
                }

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
                                    <DropdownItem  onClick={(e)=>{e.preventDefault();this.props.history.push({pathname: '/alamat'});}}>
                                    <i className="fa fa-map-marker profile-icon bg-info" aria-hidden="true"/> Alamat
                                    </DropdownItem>
                                    <DropdownItem  onClick={(e)=>{e.preventDefault();this.props.history.push({pathname: '/bank'});}}>
                                    <i className="fa fa-bank profile-icon bg-info" aria-hidden="true"/> Data Bank
                                    </DropdownItem>
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
export default withRouter(connect(mapStateToProps,{logoutUser,setEcaps,setMobileEcaps})(Header));