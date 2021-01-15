import React,{Component} from 'react';
import {connect} from "react-redux";
import {HEADERS} from 'redux/actions/_constants'
import IntlTelInput from 'react-intl-tel-input';
// import 'react-intl-tel-input/dist/libphonenumber.css';
import 'react-intl-tel-input/dist/main.css';
import Preloader from 'Preloader'
import OTPInput, { ResendOTP } from "otp-input-react";
import {sendOtp} from "redux/actions/authActions";
import bycrypt from 'bcryptjs';
import Swal from 'sweetalert2'
import {loginUser, setLoggedin} from 'redux/actions/authActions';

import { Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs';
import { FetchDetailPin } from 'redux/actions/pin/pin.action';
import Spinner from 'Spinner'
import { createMember } from 'redux/actions/authActions';
// import Swal from 'sweetalert2';
import Default from 'assets/default.png'
// import {sendOtp} from "redux/actions/authActions";
import PropTypes from 'prop-types';
// import bycrypt from 'bcryptjs';


class Signup extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            load:true,
            phone:"",
            number:"",
            otp:0,
            isOtp:false,
            debug_otp:'',
            verifyAccess:false,
            type:'otp'
        }
        this.setPhone = this.setPhone.bind(this)
        this.setOtp = this.setOtp.bind(this)
        this.handleLoginBtn = this.handleLoginBtn.bind(this)
        this.handleVerifyOtp = this.handleVerifyOtp.bind(this)
        this.verifyOtp = this.verifyOtp.bind(this);
        this.sendOtpLogin=this.sendOtpLogin.bind(this)
        
    }
    componentWillMount(){
    }
    setPhone(num, number) {
        this.setState({
            phone:num,
            number
        })
    }

    setOtp(num){
        this.setState({
            otp:num,
            verifyAccess:false
        })

        if(num.length===4){
            this.setState({
                verifyAccess:true
            })
            this.verifyOtp(num);
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.isErrorNo === true) {
            setTimeout(function () { //Start the timer
                this.setState({
                    isOtp: true,
                });
                const fcs=document.querySelector("input[data-testid='input']");
                fcs.focus();
            //  this.startTimer()
            }.bind(this), 500)
        }
    //  this.getProps(nextProps)
    //debug otp
        if (this.props.auth.user_otp !== undefined) {
            this.setState({
                debug_otp: this.props.auth.user_otp.otp_anying
            })
        }

        if (nextProps.auth.isAuthenticated) {
            nextProps.history.push('/dashboard');
            //  window.location.href = '/dashboard'
        } else {
            if (nextProps.errors) {
                this.setState({
                    errors: nextProps.errors
                })
            }
        }

    }


    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push({pathname: '/dashobard',state: {from: this.props.location.pathname}});
        }
        this.initFetch(false);
    }

    initFetch(check){
        document.getElementsByTagName('body')[0].style.zoom = '100%';
        document.getElementsByTagName('body')[0].style.background = '#666666';
        var head = document.getElementsByTagName('head')[0];
        var cssnode = document.createElement('link');

        cssnode.type = 'text/css';
        cssnode.rel = 'stylesheet';
        cssnode.href = '/auth/css/main.css';

        head.appendChild(cssnode);
        var cssnode2 = document.createElement('link');

        cssnode2.type = 'text/css';
        cssnode2.rel = 'stylesheet';
        cssnode2.href = '/auth/css/util.css';

        head.appendChild(cssnode2);
        setTimeout(function () {
            this.setState({
                load: false
            })
        }.bind(this), 500)
    }

    componentWillUnmount(){
        document.getElementsByTagName('body')[0].style.zoom='90%';
        document.getElementsByTagName('body')[0].style.background = '#f9fafb';

        document.querySelector("link[href='/auth/css/main.css']").remove()
        document.querySelector("link[href='/auth/css/util.css']").remove()
        this.setState({
            phone: "",
            number: "",
            otp: 0,
            isOtp: false,
            debug_otp: '',
            verifyAccess: false,
        })
    }

    handleLoginBtn(e){
        e.preventDefault();
        this.sendOtpLogin();
    }

    sendOtpLogin(){
        if (this.state.number !== "") {
            this.props.dispatch(sendOtp({
                type: 'otp',
                nomor: this.state.number,
                islogin: true
            }));
        }
    }

    handleVerifyOtp (event) {
        event.preventDefault();
        if (this.state.verifyAccess) this.verifyOtp(this.state.otp);
    }

    verifyOtp=async (num) => {
        const res = await  bycrypt.compare(`${num}`, this.props.auth.user_otp.sender_id);
        if(res){
            const {email,password,type,number} = this.state;
            const user = {
                type: type,
                nohp: number
            };
            this.props.dispatch(loginUser(user));

        }
        else{
            this.setOtp(0)
            Swal.fire(
                'Perhatian !! ',
                'OTP Tidak Sesuai.',
                'error'
            )
        }
    }

    render(){
        // const renderButton = buttonProps => {
        //     return <button className="btn btn-warning" {...buttonProps}>Resend</button>;
        // };
        const renderButton = buttonProps => {
                    return(
                        <div>
                            {
                                    buttonProps.remainingTime !== 0
                                    ? (
                                        <div style={{fontSize:'.9em',marginTop:'10px'}}>
                                            Kirim ulang dalam: {buttonProps.remainingTime} detik
                                        </div>
                                    )
                                    : (
                                        <button className="btn btn-warning btn-sm" style={{marginTop:"10px"}} {...buttonProps}>
                                            Kirim Ulang
                                        </button>
                                    )
                            }
                        </div>
                    )
                    };
        const renderTime = remainingTime => {
            return <span></span>;
        };
        return(
            <div>
                {
                    this.state.load ? ( <Preloader />
                        ) : (
                            <div className="limiter">
                                    <div className="container-login100">
                                        <div className="wrap-login100">
                                        <form className="login100-form validate-form">
                                        <span className="login100-form-title p-b-43">
                                                <img src="/logo.png" width="150px"/><br/>
                                            Signup Area
                                            </span>
                                        {/* <form onSubmit={this.handleSubmit}> */}
                                <div className={`row ${!this.state.confirm?'':'d-none'}`}>
                                    <div className="col-md-12">
                                        <Card>
                                            <CardBody>
                                                <div className="form-group">
                                                    <label>Nama Lengkap</label>
                                                    <input type="text" className="form-control" name="full_name" value={this.state.full_name} onChange={this.handleChange}  />
                                                </div>
                                                <div class="form-group">
                                                    <label>No. Telp.</label>
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                                <IntlTelInput
                                                                    preferredCountries={['id']}
                                                                    containerClassName="intl-tel-input"
                                                                    inputClassName="form-control"
                                                                    onPhoneNumberChange={(status, value, countryData, number, id) => {
                                                                        this.setPhone(value.replace(/^0+/, ''), number.replace(/[^A-Z0-9]/ig, ""))
                                                                    }}
                                                                    separateDialCode={true}
                                                                    format={true}
                                                                    formatOnInit={true}
                                                                    value={this.state.number}
                                                                    disabled={this.state.isOtp}
                                                                    />
                                                        </div>
                                                        <div className="col-md-4">
                                                                <button type="button" class={`btn btn-${this.state.isOtp?'success':'primary'} btn-block`} onClick={(e)=>this.handleOtp(e)} disabled={this.state.isOtp} style={{padding:'7px'}} >{this.state.isOtp?'Terverifikasi':'Verifikasi'}</button>
                                                        </div>
                                                    </div>
                                                    <div className="card mt-1" style={{display:this.state.isSend&&!this.state.isOtp?'':'none'}}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <label>Kode Aktivasi</label>
                                                                    <div class="input-group input-group-md">
                                                                        <input
                                                                            type="tel"
                                                                            pattern="\d*"
                                                                            maxLength="6"
                                                                            className="form-control form-control-md"
                                                                            name="otp_val"
                                                                            value={this.state.otp_val}
                                                                            onInput={this.handleChange}  />
                                                                        <span class="input-group-append">
                                                                            <button type="button" class="btn btn-primary" onClick={async (e)=>(await this.submitOtp(e))}><i className="fa fa-check"></i></button>
                                                                        </span>s
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <label style={{visibility:'collapse'}}>Kode Aktivasi</label>
                                                                    <div class="alert alert-primary font-12" style={{padding:'unset', backgroundColor:'#7266ba',zIndex:1, padding:'3px'}}>
                                                                        Masukan kode Aktivasi pada nomor yang sedang anda daftarkan dan mintalah kode tersebut dengan bijak.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-8 offset-md-2 d-flex align-items-center justify-content-between">
                                                    <div className="form-group">
                                                        <label>Sponsor</label>
                                                        <div className="member-content-area">
                                                            <div className="member-contact-content d-flex align-items-center mb-4">
                                                                <div className="contact-thumb">
                                                                    <img src={this.state.sponsor_picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} alt />
                                                                </div>
                                                                <div className="member-contact-info">
                                                                    <h5>{this.state.sponsor_name}</h5>
                                                                    <span className="badge badge-success badge-pill">{this.state.sponsor}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Upline</label>
                                                        <div className="member-content-area">
                                                            <div className="member-contact-content d-flex align-items-center mb-4">
                                                                <div className="contact-thumb">
                                                                    <img src={this.state.upline_picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} alt />
                                                                </div>
                                                                <div className="member-contact-info">
                                                                    <h5>{this.state.upline_name}</h5>
                                                                    <span className="badge badge-success badge-pill">{this.state.upline}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Position</label>
                                                    {/* <input type="text" className="form-control form-control-lg" name="position" value={String(this.state.position).toUpperCase()} onChange={this.handleChange} readOnly /> */}
                                                    <select className="form-control">
                                                        <option selected>~ Pilih posisi ~</option>
                                                        <option value="right">RIGHT</option>
                                                        <option value="left">LEFT</option>
                                                    </select>
                                                </div>
                                                <div className="form-group" style={{display:this.state.isOtp?'':'none'}}>
                                                    <label>Membership</label>
                                                    <Tabs>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <TabList>
                                                                    {
                                                                        (
                                                                            typeof this.props.availPin === 'object' ?
                                                                                this.props.availPin.map((v,i)=>{
                                                                                    return(
                                                                                        <Tab key={i} className="w-100 p-2 text-center cursor-pointer img-thumbnail mb-1" label="Core Courses" onClick={(e) =>this.handleMembership(e,v.title)}>{`${v.title} - ${v.jumlah}`}</Tab>
                                                                                    )
                                                                                })
                                                                                : "No data."
                                                                        )
                                                                    }
                                                                </TabList>
                                                            </div>
                                                            <div className="col-md-8">
                                                                {
                                                                    (
                                                                        typeof this.props.availPin === 'object' ?
                                                                        this.props.availPin.map((v,i)=>{
                                                                            return(
                                                                                <TabPanel key={i}>
                                                                                    {
                                                                                    !this.props.isLoading&&this.props.pinList!==undefined?
                                                                                        <Card className="bg-primary text-white"><CardBody>
                                                                                            <div className="form-group">
                                                                                                {
                                                                                                    this.props.pinList.length<=0?
                                                                                                    <div className="text-center">
                                                                                                        <p className="text-light">Saat ini anda belum memiliki daftar PIN ini, silahkan order PIN terlebih dahulu.</p>
                                                                                                        {/* <Link to="/product" className="btn btn-warning" target="_blank"><h6 className="text-light mt-2" >Order PIN</h6></Link> */}
                                                                                                    </div>
                                                                                                    :
                                                                                                    <div>
                                                                                                        <label>Daftar PIN {v.title}</label>
                                                                                                        <select className="form-control" name="pin_regist" defaultValue={this.state.pin_regist} value={this.state.pin_regist} onChange={this.handleChange}>
                                                                                                            <option value="">==== Pilih PIN  ====</option>
                                                                                                            {
                                                                                                                (
                                                                                                                    typeof this.props.pinList.data === 'object' ?
                                                                                                                        this.props.pinList.data.map((w,j)=>{
                                                                                                                            return(
                                                                                                                                <option key={j} value={JSON.stringify(w)}>{w.kode} | {w.paket}</option>
                                                                                                                            )
                                                                                                                        })
                                                                                                                        : "No data."
                                                                                                                )
                                                                                                            }
                                                                                                        </select>
                                                                                                    </div>
                                                                                                }
                                                                                            </div>
                                                                                        </CardBody></Card>
                                                                                        :<Spinner/>
                                                                                    }
                                                                                </TabPanel>
                                                                            )
                                                                        })
                                                                        : "No data."
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </Tabs>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                                <div className={`row ${this.state.confirm?'':'d-none'}`}>
                                    <div className="col-md-6 offset-md-3 mb-5">
                                        <Card>
                                            <CardHeader className="bg-primary text-light text-center">PIN Detail</CardHeader>
                                            <CardBody>
                                                <Table striped>
                                                    <thead className="bg-primary">
                                                        <tr>
                                                            <th className="text-center text-light">Nama</th>
                                                            <th className="text-center text-light">Kode</th>
                                                            <th className="text-center text-light">Paket</th>
                                                            <th className="text-center text-light">Volume</th>
                                                            <th className="text-center text-light">Kategori</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            {/* <th className="text-center" scope="row">{full_name}</th>
                                                            <th className="text-center" scope="row">{kode}</th>
                                                            <th className="text-center" scope="row">{paket}</th>
                                                            <th className="text-center" scope="row">{point_volume}</th>
                                                            <th className="text-center" scope="row">{category}</th> */}
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <div className="col-md-6 offset-md-3 mb-5">
                                        <Card>
                                            <CardHeader className="bg-primary text-light text-center">Detail Member Baru</CardHeader>
                                            <CardBody>
                                                <Table>
                                                    <thead className="bg-transparent" style={{visibility:'collapse'}}>
                                                        <tr>
                                                            <th className="text-left text-light w-25"></th>
                                                            <th className="text-left text-light w-75"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th className="text-left" scope="row">Nama Lengkap</th>
                                                            <th className="text-left" scope="row">: {this.state.full_name}</th>
                                                        </tr>
                                                        <tr>
                                                            <th className="text-left" scope="row">No. Telpon</th>
                                                            <th className="text-left" scope="row">: {this.state.mobile_no}</th>
                                                        </tr>
                                                        <tr>
                                                            <th className="text-left" scope="row">Sponsor</th>
                                                            <th className="text-left" scope="row">: {this.state.sponsor}</th>
                                                        </tr>
                                                        <tr>
                                                            <th className="text-left" scope="row">Upline</th>
                                                            <th className="text-left" scope="row">: {this.state.upline}</th>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                                <div className="form-group mt-2" style={{textAlign:"right"}}>
                                    <button type="button" className="btn btn-warning mb-2 mr-2" id={this.state.confirm?'back':'cancel'} onClick={this.toggle}><i className="ti-close" />{this.state.confirm?'Kembali':'Batal'}</button>
                                    <button type="button" className={`btn btn-primary mb-2 mr-2 ${!this.state.confirm?'':'d-none'}`} onClick={this.toggle} disabled={!this.state.isOtp} ><i className="ti-close"/> Selanjutnya</button>
                                    <button type="submit" className={`btn btn-primary mb-2 mr-2 ${this.state.confirm?'':'d-none'}`} ><i className="ti-save" /> Daftarkan</button>
                                </div>
                        {/* </form> */}

                            </form>
                            <div className="login100-more" style={{backgroundImage: 'url("auth/bg-01.jpg")'}}>
                                <a href="https://www.freepik.com/photos/background" style={{position: 'fixed', bottom: 0, fontSize: '10px', fontStyle: 'italic', color: '#333333', textDecoration: 'none'}}>Background photo created by mindandi</a>
                            </div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}


export default connect(mapStateToProps)(Signup);