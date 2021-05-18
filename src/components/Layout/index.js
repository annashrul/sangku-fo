
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Header from './header'
import SideMenu from './sideMenu'
import { connect } from 'react-redux'
import FreeScrollbar from 'react-free-scrollbar';
import { logoutUser } from "redux/actions/authActions";
import PropTypes from "prop-types";
import { noImage } from "helper";
import moment from "moment"
import 'moment/locale/id';
import Clock from 'components/common/clock'
import { setMobileEcaps } from 'redux/actions/site.action'

class Layout extends Component {
    constructor(props) {
        super(props);
        this.mouseEnterHandle = this.mouseEnterHandle.bind(this);
        this.mouseOutHandle = this.mouseOutHandle.bind(this);
        this.state = {
            sideHover: 'deactive'
        }
    }

    componentWillMount() {
        document.getElementsByTagName('body')[0].style.zoom = '90%';
    }
    handleLogout = () => {
        this.props.logoutUser();
    };
    getFaviconEl() {
        return document.getElementById("favicon");
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.user) {
            document.title = `SangQu - ${this.props.page}`;
        }
    }

    mouseEnterHandle() {
        this.setState({
            sideHover: 'active'
        })
    }
    mouseOutHandle() {
        this.setState({
            sideHover: 'deactive'
        })
    }
    outSideClickSideBar(e) {
        e.preventDefault();
        if (e.target.id === 'sbTrClick') {
            this.props.setMobileEcaps(false);
        }
    }

    render() {
        return (
            <div className={this.props.triggerEcaps ? "ecaps-page-wrapper sidemenu-hover-" + this.state.sideHover + " menu-collasped-active" : "ecaps-page-wrapper " + (this.props.triggerMobileEcaps ? "mobile-menu-active" : "")}>
                {/* Side Menu */}
                <div className={"w-100 " + (this.props.triggerMobileEcaps ? "h-100" : "")} style={{ position: 'fixed', zIndex: '100', backgroundColor: '#343a40cc' }} id="sbTrClick" onClick={(e) => this.outSideClickSideBar(e)}>
                    <div className="ecaps-sidemenu-area" onMouseEnter={this.mouseEnterHandle} onMouseLeave={this.mouseOutHandle}>
                        {/* Desktop Logo */}
                        <div className="ecaps-logo">
                            <Link to="/" style={{ backgroundColor: '#242939' }}><img className="desktop-logo" src={this.props.auth.user.logo === undefined ? noImage() : this.props.auth.user.logo} onError={(e) => { e.target.onerror = null; e.target.src = `${noImage()}` }} alt="Desktop Logo" style={{ maxHeight: '50px' }} /> <img className="small-logo" src={this.props.auth.user.fav_icon === undefined ? noImage() : this.props.auth.user.fav_icon} onError={(e) => { e.target.onerror = null; e.target.src = `${noImage()}` }} alt="Mobile Logo" /></Link>
                        </div>
                        {/* Side Nav */}
                        <div className="slimScrollDiv" style={{ position: "relative", width: "auto", height: "100%" }}>
                            <div className="ecaps-sidenav" id="ecapsSideNav" style={{ overflowY: "unset", width: "auto", height: "100%" }}>
                                <FreeScrollbar>
                                    {/* Side Menu Area */}
                                    <div className="side-menu-area" style={{ paddingRight: '8px', marginTop: 'unset' }}>
                                        {/* Sidebar Menu */}
                                        <SideMenu />
                                    </div>
                                </FreeScrollbar>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}

                <div className="ecaps-page-content">
                    {/* Top Header Area */}
                    <Header />
                    {/* Main Content Area */}
                    <div className="main-content">
                        <div className="container-fluid">
                            {/* content */}
                            {/* DESKTOP VERSION START */}
                            <div className="row align-items-center d-none d-md-flex box-margin">
                                <div className="col-6">
                                    <div className="dashboard-header-title">
                                        <h5 className="mb-0 font-weight-bold">{this.props.page === 'Invoice' ? '' : this.props.page}</h5>
                                        <ol className="breadcrumb bg-transparent pl-0">
                                            {
                                                this.props.page === 'Dashboard' || this.props.page === 'Invoice' ? "" :
                                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                            }
                                            {
                                                this.props.page === 'Dashboard' || this.props.page === 'Invoice' ? "" : this.props.subpage !== undefined ?
                                                    (
                                                        this.props.link !== undefined ? (
                                                            <li><Link to={this.props.link}>{this.props.subpage}</Link></li>
                                                        ) : (
                                                            <li>{this.props.subpage}</li>
                                                        )

                                                    ) : ""
                                            }
                                            {
                                                this.props.page === 'Dashboard' || this.props.page === 'Invoice' ? "" : (
                                                    <li className="active">{this.props.page}</li>
                                                )
                                            }
                                        </ol>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="dashboard-infor-mation d-flex flex-wrap align-items-center">
                                        <div className="dashboard-clock">
                                            <div id="dashboardDate">{moment().format("dddd, Do MMM YYYY")}</div>
                                            <Clock />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* DESKTOP VERSION END */}

                            {/* MOBILE VERSION START */}
                            <div className="row d-flex d-md-none">
                                <div className="col-6 d-flex align-items-center">
                                    <div className="dashboard-header-title">
                                        <h5 className="font-weight-bold">{this.props.page === 'Invoice' ? '' : this.props.page}</h5>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="dashboard-infor-mation d-flex flex-wrap align-items-center">
                                        <div className="dashboard-clock">
                                            <div id="dashboardDate">{moment().format("dddd, Do MMM YYYY")}</div>
                                            <Clock />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 box-margin">
                                    <ol className="breadcrumb bg-transparent pl-0 mt-0 pt-0">
                                        {
                                            this.props.page === 'Dashboard' || this.props.page === 'Invoice' ? "" :
                                                <li><Link to="/dashboard">Dashboard</Link></li>
                                        }
                                        {
                                            this.props.page === 'Dashboard' || this.props.page === 'Invoice' ? "" : this.props.subpage !== undefined ?
                                                (
                                                    this.props.link !== undefined ? (
                                                        <li><Link to={this.props.link}>{this.props.subpage}</Link></li>
                                                    ) : (
                                                        <li>{this.props.subpage}</li>
                                                    )

                                                ) : ""
                                        }
                                        {
                                            this.props.page === 'Dashboard' || this.props.page === 'Invoice' ? "" : (
                                                <li className="active">{this.props.page}</li>
                                            )
                                        }
                                    </ol>
                                </div>
                            </div>
                            {/* MOBILE VERSION END */}
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
    setMobileEcaps: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, siteReducer }) => {
    return {
        auth: auth,
        triggerEcaps: siteReducer.triggerEcaps,
        triggerMobileEcaps: siteReducer.triggerMobileEcaps
    }
}
export default connect(mapStateToProps, { logoutUser, setMobileEcaps })(Layout);