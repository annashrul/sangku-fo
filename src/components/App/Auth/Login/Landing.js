import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import './landing_style.css'
import {loginUser} from 'redux/actions/authActions';
import {HEADERS} from 'redux/actions/_constants'
import bgVid from "../../../../assets/bg_particle_loop.mp4"
import tshirt from "../../../../assets/tshirt.png"
import bags from "../../../../assets/bags.png"
import jacket from "../../../../assets/jacket.png"
import jas from "../../../../assets/jas.png"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import ParticlesBg from "particles-bg";
import './css/bg_vid.css';
import { Link } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ReactWOW from 'react-wow'

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            type: '',
            activeTab : 0,
            selectedIndex : 0,
            errors:{
            },
         };
         this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidMount (){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
        this.initFetch(false);
    }

    initFetch(check){
        fetch(HEADERS.URL + `auth/config`)
        .then(res => res.json())
        .then(
            (data) => {
                localStorage.setItem("configType",data.result.type)
                document.title = `${data.result.title}`;
                this.setState({
                    type: data.result.type,
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }


    componentWillReceiveProps = (nextProps)=>{
        this.getProps(nextProps)
    }
    componentWillMount(){
        this.getProps(this.props);
    }
    getProps(param){
        if(param.auth.isAuthenticated){
            param.history.push('/');
        }else{
            if(param.errors){
                this.setState({errors: param.errors})
            }
        }
    }
    //Use arrow functions to avoid binding
    handleSelect = (index) => {
        this.setState({selectedIndex: index}, () => {
        });
    };
    render() {
        require("./landing_style.css"); // here
        return (
            <div className="limiter">
                {/* Wrapper */}
                <div id="wrapper" className="wrapper">
                    {/* Header */}
                    <header className="br_header header-default header-transparent black-logo--version haeder-fixed-width haeder-fixed-150 headroom--sticky header-mega-menu clearfix">
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-12">
                            <div className="header__wrapper mr--0">
                                {/* Header Left */}
                                <div className="header-left">
                                    <div className="logo">
                                    <a href="index.html">
                                        <img src="logo.png" alt="Brook Images" />
                                    </a>
                                    </div>
                                </div>
                                {/* Mainmenu Wrap */}
                                <div className="mainmenu-wrapper d-none d-lg-block">
                                    <nav className="page_nav">
                                    <ul className="mainmenu">
                                        <li className="lavel-1 with--drop slide--megamenu"><a href={null}><span>Items 1</span></a>
                                        </li>
                                        <li className="lavel-1 with--drop slide--megamenu"><a href={null}><span>Items 2</span></a>
                                        </li>
                                        <li className="lavel-1 with--drop slide--megamenu"><a href={null}><span>Items 3</span></a>
                                        </li>
                                        <li className="lavel-1 with--drop slide--megamenu"><a href={null}><span>Items 4</span></a>
                                        </li>
                                        <li className="lavel-1 with--drop slide--megamenu"><a href={null}><span>Items 5</span></a>
                                        </li>
                                    </ul>
                                    </nav>
                                </div>
                                <div className="header-right">
                                    {/* Start Popup Search Wrap */}
                                    <div className="popup-search-wrap">
                                        <Link className="btn-search-click" to={{ pathname: '/login/process', query: { config: this.state.type } }} >Sign In &nbsp; <i className="fa fa-user-circle font-24" /></Link>
                                    </div>
                                    {/* End Popup Search Wrap */}
                                    </div>

                            </div>
                        </div>
                        </div>
                    </div>
                    </header>
                    {/*// Header */}
                    {/* Start Popup Menu */}
                    <div className="popup-mobile-manu popup-mobile-visiable">
                    <div className="inner">
                        <div className="mobileheader">
                        <div className="logo">
                            <a href="index.html">
                            <img src="logo.png" alt="Multipurpose" />
                            </a>
                        </div>
                        {/* <a className="mobile-close"/> */}
                        </div>
                        <div className="menu-content">
                        <ul className="menulist object-custom-menu">
                            <li className="has-mega-menu"><a href={null}><span>Items 1</span></a>
                            </li>
                            <li className="has-mega-menu"><a href={null}><span>Items 2</span></a>
                            </li>
                            <li className="has-mega-menu"><a href={null}><span>Items 3</span></a>
                            </li>
                            <li className="has-mega-menu"><a href={null}><span>Items 4</span></a>
                            </li>
                            <li className="has-mega-menu"><a href={null}><span>Items 5</span></a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                    {/* End Popup Menu */}
                    {/* Start Brook Search Popup */}
                    <div className="brook-search-popup">
                    <div className="inner">
                        <div className="search-header">
                        <div className="logo">
                            <a href="index.html">
                            <img src="logo.png" alt="logo images" />
                            </a>
                        </div>
                        {/* <a className="search-close" /> */}
                        </div>
                        <div className="search-content">
                        <form action={null}>
                            <label>
                            <input type="search" placeholder="Enter search keyword…" />
                            </label>
                            <button className="search-submit"><i className="fa fa-search" /></button>
                        </form>
                        </div>
                    </div>
                    </div>
                    {/* End Brook Search Popup */}
                    <div className="slider-revoluation">
                        <div className="forcefullwidth_wrapper_tp_banner" id="rev_slider_13_1_forcefullwidth" style={{position: 'relative', width: '100%', height: 'auto', marginTop: 0, marginBottom: 0}}>
                        <video autoPlay muted loop id="myVideo">
                            <source src={String(bgVid)} type="video/mp4" />
                            Your browser does not support HTML5 video.
                        </video>
                        <div className="overlay">
                        <div className="contaniner">
                            <div className="row" style={{margin: 0}}>
                            <div className="col-lg-5 col-md-4 col-sm-4 col-xs-6">
                            </div>
                            <div className="col-lg-7 col-md-8 col-sm-6 col-xs-6" style={{marginTop: 300}}>
                                <div className="text-jargon"><h2>Sangku <br />Sahabat bisnis anda</h2></div>
                                <div className="text-jargon2"><h1>#MajuBersama</h1></div>
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* <ParticlesBg bg={true} type="cobweb"/> */}

                        <div className="tp-fullwidth-forcer" style={{width: '100%', height: 500}} />
                        </div>
                        {/* END REVOLUTION SLIDER */}
                    </div>

                    {/* Page Conttent */}
                    <main className="page-content">
                    {/* Start Service Area */}
                    <div className="brook-service-area bg_color--13">
                        <div className="row align-items-center">
                            <div className="col-lg-12 col-xl-7 col-12">
                            <div className="row startupservice-wrapper">
                                {/* Strat Single Speach */}
                                <div className="col-lg-6">
                                <div className="single-motive-speach text-white">
                                    <div className="icon">
                                    <i className="icon-basic-globe" />
                                    </div>
                                    <div className="content">
                                    <h4>Digital marketing</h4>
                                    <p>We conduct the marketing of products &amp; services using latest digital
                                        technologies.</p>
                                    </div>
                                </div>
                                </div>
                                {/* End Single Speach */}
                                {/* Strat Single Speach */}
                                <div className="col-lg-6">
                                <div className="single-motive-speach text-white mt_md--40 mt_sm--40">
                                    <div className="icon">
                                    <i className="ion-monitor" />
                                    </div>
                                    <div className="content">
                                    <h4>UI/UX designs</h4>
                                    <p>We conduct the marketing of products &amp; services using latest digital
                                        technologies.</p>
                                    </div>
                                </div>
                                </div>
                                {/* End Single Speach */}
                                {/* Strat Single Speach */}
                                <div className="col-lg-6">
                                <div className="single-motive-speach text-white mt--40">
                                    <div className="icon">
                                    <i className="ion-ios-baseball-outline" />
                                    </div>
                                    <div className="content">
                                    <h4>SEO marketing</h4>
                                    <p>We conduct the marketing of products &amp; services using latest digital
                                        technologies.</p>
                                    </div>
                                </div>
                                </div>
                                {/* End Single Speach */}
                                {/* Strat Single Speach */}
                                <div className="col-lg-6">
                                <div className="single-motive-speach text-white mt--40">
                                    <div className="icon">
                                    <i className="ion-pinpoint" />
                                    </div>
                                    <div className="content">
                                    <h4>Resource use</h4>
                                    <p>We conduct the marketing of products &amp; services using latest digital
                                        technologies.</p>
                                    </div>
                                </div>
                                </div>
                                {/* End Single Speach */}
                            </div>
                            </div>
                            <div className="col-lg-12 col-xl-5 col-12">
                            <div className="clint-succeed bg_image--24 ptb--220 ptb-md--80 ptb-lg--80 ptb_lp--130 ptb-sm--60" data-overlay={9}>
                                <div className="row align-items-center plr_md--40 plr_sm--40">
                                <div className="col-lg-4">
                                    {/* Start Single Popup */}
                                    <div className="video-btn">
                                    <a className="play__btn" href="https://www.youtube.com/watch?v=9No-FiEInLA">
                                        <div className="video-icon second-icon yellow-color-2" />
                                    </a>
                                    </div>
                                    {/* End Single Popup */}
                                </div>
                                <div className="col-lg-8">
                                    <div className="content pr--30 pr_sm--0">
                                    <h3 className="heading heading-h3 font-32 text-white line-height-1-88">We help our
                                        clients succeed by delivering products that improve life, work and play.</h3>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>

                    {/* End Service Area */}
                    {/* Start Brand Stratagy Area */}
                    <div className="brook-stratagy-area bg_color--7">
                        <div className="row">
                        <div className="col-lg-6">
                            <div className="bk-stratagy-content max-width--600 float-right pt--120 pb--120 pr--160 pr_lg--30 pl_lg--30 pr_md--50 pl_md--50 pr_sm--30 pl_sm--30">
                            <div className="content">
                                <h3 className="heading heading-h3 line-height-1-42 yellow-color-2 wow move-up text-white">Aute qui sit ad excepteur.</h3>
                                <div className="bkseparator--30" />
                                <p className="bk_pra font-16 line-height-1-87 pr--30 wow move-up text-white">Reprehenderit dolore ullamco excepteur ipsum in incididunt aute velit occaecat cupidatat ut voluptate quis. Veniam ea qui cillum cupidatat duis laborum magna consectetur consectetur eiusmod anim. Ea id commodo commodo irure in voluptate anim laborum ea eu elit commodo tempor adipisicing.</p>
                                <div className="bkseparator--40" />
                                {/* Start Single List */}
                                <div className="bk-list--2 wow move-up">
                                <div className="list-header with-ckeck check-yellow-color-2">
                                    <div className="marker" />
                                    <div className="title-wrap">
                                    <h6 className="heading heading-h5 text-white">Mollit incididunt nulla do incididunt tempor ullamco.</h6>
                                    </div>
                                </div>
                                <div className="list-header with-ckeck check-yellow-color-2">
                                    <div className="marker" />
                                    <div className="title-wrap">
                                    <h6 className="heading heading-h5 text-white">Aliquip irure quis amet est non.</h6>
                                    </div>
                                </div>
                                <div className="list-header with-ckeck check-yellow-color-2">
                                    <div className="marker" />
                                    <div className="title-wrap">
                                    <h6 className="heading heading-h5 text-white">Sint commodo consectetur in ut tempor dolore ea aliqua quis est.</h6>
                                    </div>
                                </div>
                                <div className="list-header with-ckeck check-yellow-color-2">
                                    <div className="marker" />
                                    <div className="title-wrap">
                                    <h6 className="heading heading-h5 text-white">Cillum eu officia anim labore mollit voluptate consequat consequat mollit mollit.</h6>
                                    </div>
                                </div>
                                <div className="list-header with-ckeck check-yellow-color-2">
                                    <div className="marker" />
                                    <div className="title-wrap">
                                    <h6 className="heading heading-h5 text-white">Laborum quis anim irure id ullamco quis dolore anim reprehenderit ullamco Lorem aute commodo.</h6>
                                    </div>
                                </div>
                                </div>
                                {/* End Single List */}
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="bk-stratagy-thumb bg_image--25 ptb--180 h-100">
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* End Brand Stratagy Area */}
                    {/* Start Portfolio Caption */}
                    <div className="bk-portfolio-with-caption-area pt--150 pt_md--80 pt_sm--60 pb--80 pb_md--50 pb_sm--30 bg_color--1 poss_relative bk-masonary-wrapper">
                        <div className="container">
                        <Tabs>
                            <div className="row">
                            <div className="col-lg-12">
                                <div className="brook-section-title text-center mb--60">
                                <h3 className="heading heading-h3">Mollit qui occaecat sit dolor.</h3>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-lg-12 text-center">
                                <TabList>
                                    <Tab label="Core Courses" onClick={() =>this.handleSelect(0)}>Eiusmod enim</Tab>
                                    <Tab label="Core Courses" onClick={() =>this.handleSelect(1)}>Voluptate consectetur</Tab>
                                </TabList>
                            </div>
                            </div>
                            <TabPanel>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                                            <Masonry>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='rotateInUpLeft'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                            </Masonry>
                                        </ResponsiveMasonry>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                                            <Masonry>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                                <ReactWOW animation='fadeIn'><img className="p-2" src={`https://via.placeholder.com/${Math.floor(Math.random()*600+400)+`x`+Math.floor(Math.random()*500+300)}?text=Visit+Blogging.com+Now`} alt="img"/></ReactWOW>
                                            </Masonry>
                                        </ResponsiveMasonry>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        </div>
                    </div>
                    {/* Start Call To Action */}
                    <div className="brook-call-to-action bg_color--13 ptb--70 bg-as-text2">
                        <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-sm-12 col-12">
                            <div className="call-content text-center text-md-left text-center">
                                <h4 className="heading heading-h4 text-white">Sign up for new updates from us.</h4>
                            </div>
                            </div>
                            <div className="col-lg-6 col-sm-12 col-12">
                            <div className="text-center text-md-right text-center mt_sm--30 mt_md--40 contact-form contact-form--4 yellow-color-2">
                                <form action={null}>
                                <div className="input-box">
                                    <input type="email" placeholder="Your e-mail" />
                                    <button>Subscribe</button>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* End Call To Action */}
                    </main>
                    {/*// Page Conttent */}
                </div>
                {/* Footer */}
                <footer className="page-footer bg_color--3 pl--150 pr--150 pl_lg--30 pr_lg--30 pl_md--30 pr_md--30 pl_sm--5 pr_sm--5">
                    {/* Start Footer Top Area */}
                    <div className="bk-footer-inner pt--150 pb--30 pt_sm--100">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                            <div className="footer-widget text-var--2">
                            <div className="logo">
                                <a href="index.html">
                                <img src="img/favicon.png" alt="brook white" />
                                </a>
                            </div>
                            <div className="footer-inner">
                                <p>Ad culpa duis aliqua cillum culpa incididunt irure do commodo. Esse minim irure aliqua consectetur culpa duis in ea dolor pariatur exercitation velit. Duis proident adipisicing eu laborum.</p>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-6 col-12 mt_mobile--40">
                            <div className="footer-widget text-var--2 menu--about">
                            <h2 className="widgettitle">About us</h2>
                            <div className="footer-menu">
                                <ul className="ft-menu-list bk-hover">
                                <li><a href="about-us-01.html">About Us</a></li>
                                <li><a href="team.html">Team</a></li>
                                <li><a href="career.html">Career</a></li>
                                <li><a href="services-classic.html">Services</a></li>
                                <li><a href="contact.html">Contact</a></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt_md--40 mt_sm--40">
                            <div className="footer-widget text-var--2 menu--contact">
                            <h2 className="widgettitle">Contact</h2>
                            <div className="footer-address">
                                <div className="bk-hover">
                                <p>2005 Stokes Isle Apt. 896, <br /> Venaville 10010, USA</p>
                                <p><a href={null}>info@yourdomain.com</a></p>
                                <p><a href={null}>(+68) 120034509</a></p>
                                </div>
                                <div className="social-share social--transparent text-white">
                                <a href={null}><i className="fab fa-facebook" /></a>
                                <a href={null}><i className="fab fa-twitter" /></a>
                                <a href={null}><i className="fab fa-instagram" /></a>
                                <a href={null}><i className="fab fa-dribbble" /></a>
                                <a href={null}><i className="fab fa-pinterest" /></a>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12 mt_md--40 mt_sm--40">
                            <div className="footer-widget text-var--2 menu--instagram">
                            <h2 className="widgettitle">Instagram</h2>
                            <div className="ft-instagram-list">
                                <div className="instagram-grid-wrap">
                                {/* Start Single Instagram */}
                                <div className="item-grid grid-style--1">
                                    <div className="thumb">
                                    <a href={null}>
                                        <img src="img/instagram/instagram-1/instagram-7.jpg" alt="instagram images" />
                                    </a>
                                    <div className="item-info">
                                        <div className="inner">
                                        <a href={null}><i className="fas fa-heart" />1k</a>
                                        <a href={null}><i className="fas fa-comment-dots" />9</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                {/* Start Single Instagram */}
                                {/* Start Single Instagram */}
                                <div className="item-grid grid-style--1">
                                    <div className="thumb">
                                    <a href={null}>
                                        <img src="img/instagram/instagram-1/instagram-8.jpg" alt="instagram images" />
                                    </a>
                                    <div className="item-info">
                                        <div className="inner">
                                        <a href={null}><i className="fas fa-heart" />1k</a>
                                        <a href={null}><i className="fas fa-comment-dots" />9</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                {/* Start Single Instagram */}
                                {/* Start Single Instagram */}
                                <div className="item-grid grid-style--1">
                                    <div className="thumb">
                                    <a href={null}>
                                        <img src="img/instagram/instagram-1/instagram-9.jpg" alt="instagram images" />
                                    </a>
                                    <div className="item-info">
                                        <div className="inner">
                                        <a href={null}><i className="fas fa-heart" />1k</a>
                                        <a href={null}><i className="fas fa-comment-dots" />9</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                {/* Start Single Instagram */}
                                {/* Start Single Instagram */}
                                <div className="item-grid grid-style--1">
                                    <div className="thumb">
                                    <a href={null}>
                                        <img src="img/instagram/instagram-1/instagram-10.jpg" alt="instagram images" />
                                    </a>
                                    <div className="item-info">
                                        <div className="inner">
                                        <a href={null}><i className="fas fa-heart" />1k</a>
                                        <a href={null}><i className="fas fa-comment-dots" />9</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                {/* Start Single Instagram */}
                                {/* Start Single Instagram */}
                                <div className="item-grid grid-style--1">
                                    <div className="thumb">
                                    <a href={null}>
                                        <img src="img/instagram/instagram-1/instagram-11.jpg" alt="instagram images" />
                                    </a>
                                    <div className="item-info">
                                        <div className="inner">
                                        <a href={null}><i className="fas fa-heart" />1k</a>
                                        <a href={null}><i className="fas fa-comment-dots" />9</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                {/* Start Single Instagram */}
                                {/* Start Single Instagram */}
                                <div className="item-grid grid-style--1">
                                    <div className="thumb">
                                    <a href={null}>
                                        <img src="img/instagram/instagram-1/instagram-12.jpg" alt="instagram images" />
                                    </a>
                                    <div className="item-info">
                                        <div className="inner">
                                        <a href={null}><i className="fas fa-heart" />1k</a>
                                        <a href={null}><i className="fas fa-comment-dots" />9</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                {/* Start Single Instagram */}
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* Start Footer Top Area */}
                    {/* Start Copyright Area */}
                    <div className="copyright ptb--50 text-var-2">
                    <div className="container">
                        <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="copyright-left text-md-left text-center">
                            <ul className="bk-copyright-menu d-flex bk-hover justify-content-center justify-content-md-start flex-wrap flex-sm-nowrap">
                                <li><a href={null}>Our blog</a></li>
                                <li><a href={null}>Latest projects</a></li>
                                <li><a href={null}>Contact us</a></li>
                            </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="copyright-right text-md-right text-center">
                            <p>© 2019 Brook. <a href="https://hasthemes.com/">All Rights Reserved.</a></p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* End Copyright Area */}
                </footer>
                {/*// Footer */}
                {/*// Wrapper */}
            </div>
        );
    }
}

Landing.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object,
    errors: PropTypes.object
}

const mapStateToProps = ({auth, errors}) =>{
    return{
        auth : auth,
        errors: errors.errors
    }
}

export default connect(mapStateToProps,{loginUser})(Landing);