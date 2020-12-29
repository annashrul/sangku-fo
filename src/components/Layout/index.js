
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Header from './header'
import SideMenu from './sideMenu'
import {connect} from 'react-redux'
import FreeScrollbar from 'react-free-scrollbar';
import { logoutUser } from "redux/actions/authActions";
import PropTypes from "prop-types";
import {noImage} from "../../helper";
class Layout extends Component {
    constructor(props){
        super(props);
        this.mouseEnterHandle = this.mouseEnterHandle.bind(this);
        this.mouseOutHandle = this.mouseOutHandle.bind(this);
        this.state = {
            sideHover:'deactive'
        }
    }

    componentWillMount() {
    }
    handleLogout = () => {
        this.props.logoutUser();
    };
    getFaviconEl() {
        return document.getElementById("favicon");
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.user) {
            // const favicon = this.getFaviconEl(); // Accessing favicon element
            // favicon.href = nextProps.auth.user.fav_icon;
            
            if(nextProps.auth.user.site_title!==undefined){
            document.title = `Sangku - ${this.props.page}`;
            // document.title = `${nextProps.auth.user.site_title} - ${this.props.page}`;
            }else
            document.title = `Sangku - ${this.props.page}`;
            // document.title = `${localStorage.getItem("site_title")} - ${this.props.page}`;

        }
    }

    mouseEnterHandle(){
        this.setState({
            sideHover:'active'
        })
    }
    mouseOutHandle(){
        this.setState({
            sideHover:'deactive'
        })
    }

    render() {
        return (
            <div className={this.props.triggerEcaps?"ecaps-page-wrapper sidemenu-hover-" + this.state.sideHover + " menu-collasped-active":"ecaps-page-wrapper " + (this.props.triggerMobileEcaps?"mobile-menu-active":"")}>
            {/* Side Menu */}
                <div className="ecaps-sidemenu-area" onMouseEnter={this.mouseEnterHandle} onMouseLeave={this.mouseOutHandle}>
                    {/* Desktop Logo */}
                    <div className="ecaps-logo">
                        <Link to="/" style={{backgroundColor:'#242939'}}><img className="desktop-logo" src={this.props.auth.user.logo===undefined?noImage():this.props.auth.user.logo} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}}  alt="Desktop Logo" style={{maxHeight:'50px'}} /> <img className="small-logo" src={this.props.auth.user.fav_icon===undefined?noImage():this.props.auth.user.fav_icon} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} alt="Mobile Logo" /></Link>
                    </div>
                    {/* Side Nav */}
                    <div className="slimScrollDiv" style={{position: "relative", width: "auto", height: "100%"}}>
                            <div className="ecaps-sidenav" id="ecapsSideNav" style={{overflowY: "unset",width: "auto", height: "100%"}}>
                        <FreeScrollbar>
                                {/* Side Menu Area */}
                                <div className="side-menu-area" style={{paddingRight:'8px', marginTop:'unset'}}>
                                    {/* Sidebar Menu */}
                                    <SideMenu/>
                                </div>
                        </FreeScrollbar>
                            </div>
                    </div>
                </div>

                {/* Page Content */}

                <div className="ecaps-page-content">
                    {/* Top Header Area */}
                    <Header/>
                    {/* Main Content Area */}
                    <div className="main-content">
                        <div className="container-fluid">
                            {/* content */}
                            {/* {
                                this.props.page==='Dashboard'?"":(
                                    <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="dashboard-header-title mb-3">
                                        <h5 className="mb-0 font-weight-bold">{this.props.headers}</h5>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                    <div className="dashboard-infor-mation d-flex flex-wrap align-items-center mb-3">
                                        <div className="dashboard-clock">
                                            <div id="dashboardDate">{moment().format("dddd, Do MMM YYYY")}</div>
                                            <Clock/>
                                        </div>
                                    </div>
                                </div>
                                </div>  
                                )
                            } */}
                            {
                                this.props.children
                            }

                        </div>
                    </div>
                    {/* Page Footer*/}
                    {/* <Footer/>        */}
                </div>
            </div>
            
        );
    }
}
Layout.propTypes = {
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({auth,siteReducer}) =>{
     return{
       auth: auth,
       triggerEcaps: siteReducer.triggerEcaps,
       triggerMobileEcaps: siteReducer.triggerMobileEcaps
     }
}
export default connect(mapStateToProps,{logoutUser})(Layout);