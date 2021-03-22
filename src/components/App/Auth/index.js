import React,{Component} from 'react';
import {connect} from "react-redux";
// import {HEADERS} from 'redux/actions/_constants'
import IntlTelInput from 'react-intl-tel-input';
// import 'react-intl-tel-input/dist/libphonenumber.css';
import 'react-intl-tel-input/dist/main.css';
import Preloader from 'Preloader'
import OTPInput, { ResendOTP } from "otp-input-react";
import {sendOtp} from "redux/actions/authActions";
import bycrypt from 'bcryptjs';
import Swal from 'sweetalert2'
import {loginUser} from 'redux/actions/authActions';
import { Link } from 'react-router-dom';
import { FetchSiteConfig } from '../../../redux/actions/site.action';
import { putMember } from '../../../redux/actions/member/member.action';
import Skeleton from 'react-loading-skeleton';


class Auth extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            load:true,
            phone:"",
            number:"",
            otp:0,
            isOtp:false,
            pin:0,
            pinNew:0,
            pinNewRe:0,
            isPin:false,
            debug_otp:'',
            verifyAccess:false,
            type:'',
            otpType:'wa',
            otpConfig:''
        }
        this.setPhone = this.setPhone.bind(this)
        this.setOtp = this.setOtp.bind(this)
        this.setPin = this.setPin.bind(this)
        this.setPinNew = this.setPinNew.bind(this)
        this.setPinNewRe = this.setPinNewRe.bind(this)
        this.handleLoginBtn = this.handleLoginBtn.bind(this)
        this.handleLoginBtnPin = this.handleLoginBtnPin.bind(this)
        this.handleVerifyOtp = this.handleVerifyOtp.bind(this)
        this.handleVerifyPin = this.handleVerifyPin.bind(this)
        this.verifyOtp = this.verifyOtp.bind(this);
        this.sendOtpLogin=this.sendOtpLogin.bind(this)
        this.handleOtpType=this.handleOtpType.bind(this)
        this.handleSelect=this.handleSelect.bind(this)
        
    }
    componentWillMount(){
        this.props.dispatch(FetchSiteConfig())
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
    setPin(num){
        this.setState({
            pin:num,
            verifyAccess:false
        })

        if(num.length===6){
            this.setState({
                verifyAccess:true,
            })
        }
    }
    setPinNew(num){
        this.setState({
            pinNew:num,
        })
    }
    setPinNewRe(num){
        this.setState({
            pinNewRe:num,
        })
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
        if (nextProps.otp_config !== this.state.otpBefore) {
            this.setState({
                otpConfig:nextProps.otp_config.type_otp,
                type: nextProps.otp_config.type,
                otpBefore: nextProps.otp_config
            });
        }

    }


    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push({pathname: '/dashboard',state: {from: this.props.location.pathname}});
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
            pin: 0,
            isPin: false,
            debug_otp: '',
            verifyAccess: false,
        })
    }

    handleLoginBtn(e){
        e.preventDefault();
        this.sendOtpLogin();
    }
    handleLoginBtnPin(e){
        e.preventDefault();
        this.setState({isPin:true})
    }

    sendOtpLogin(){
        if (this.state.number !== "") {
            this.props.dispatch(sendOtp({
                type: this.state.type,
                type_otp: this.state.otpConfig==='gabungan'?this.state.otpType:'-',
                nomor: this.state.number,
                islogin: true
            }));
        }
    }

    handleOtpType = (e) => {
        // e.preventDefault();
        this.setState({otpType:!this.state.otpType});
    }

    handleSelect(e){
        e.preventDefault();
        let column = e.target.name;
        let value = e.target.value;

        this.setState({[column]:value});
    }

    handleVerifyOtp (event) {
        event.preventDefault();
        if (this.state.verifyAccess) this.verifyOtp(this.state.otp);
    }
    handleVerifyPin (event) {
        event.preventDefault();
        if (this.state.verifyAccess){
            this.props.dispatch(loginUser({
                type: 'uid',
                nohp: this.state.number,
                pin: this.state.pin
            }));
        }
    }
    handlePin (event) {
        event.preventDefault();
        Swal.fire({
            title: 'Informasi!',
            text: "Pastikan PIN yang anda masukan mudah diingat dan sulit ditebak.",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Baik, Ubah PIN Saya',
            cancelButtonText: 'Batal'
        }).then(function(result){
            if (result.value) {
                this.props.dispatch(putMember({pin:this.state.pinNew},this.props.auth.user.id))
            }
        }.bind(this))
    }

    verifyOtp=async (num) => {
        const res = await  bycrypt.compare(`${num}`, this.props.auth.user_otp.sender_id);
        if(res){
            const {type,number} = this.state;
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
                                            <div className="login100-form-title p-b-43">
                                                <img src="/logo.png" alt="sangqu" width="150px"/>
                                                <div style={{marginTop:'12px'}}>Member Area</div>
                                            </div>
                                            {this.state.type==='otp'?
                                            <>
                                            <div style={{display: this.state.isOtp?"none":"block"}}>
                                                <IntlTelInput
                                                    preferredCountries={['id']}
                                                    css={['intl-tel-input', 'form-control']}
                                                    onPhoneNumberChange={(status, value, countryData, number, id) => {
                                                        this.setPhone(value.replace(/^0+/, ''), number.replace(/[^A-Z0-9]/ig, ""))
                                                    }}
                                                    separateDialCode={true}
                                                    format={true}
                                                    formatOnInit={true}
                                                    value={this.state.phone}
                                                    />
                                                <div className="container-login100-form-btn">
                                                    {this.state.otpConfig==='gabungan'?
                                                        <div className="stacked-form-area w-100" >
                                                            <label className="text-muted">Verifikasi melalui : </label>
                                                            <select name="otpType" onChange={(e)=>{this.handleSelect(e)}} ref={(el) => el && el.style.setProperty('border-radius', '10px', "important")}>
                                                                <option value="wa">WA</option>
                                                                <option value="sms">SMS</option>
                                                            </select>
                                                            {/* <div className="new-checkbox mb-2">
                                                                <p>Verifikasi Melalui : {this.state.otpType?'WA':'SMS'}</p>
                                                                <div className="d-flex justify-content-start align-items-center" >
                                                                    <label className="switch">
                                                                        <input type="checkbox" checked={this.state.otpType} onChange={(e)=>this.handleOtpType(e)}/>
                                                                        <span className="slider"></span>
                                                                    </label>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                        :''
                                                    }
                                                    <button className="login100-form-btn" onClick={this.handleLoginBtn}>
                                                        <span style={{marginRight:"7px",fontSize:'1.3em'}}>Masuk</span> <i className="fa fa-long-arrow-right" aria-hidden="true" />
                                                    </button>
                                                </div>

                                                <div style={{display:"flex",alignItems:'center',justifyContent:'center',marginTop:"50px"}}>
                                                    <Link to="/"> <i className="fa fa-long-arrow-left" aria-hidden="true" /> Kembali ke halaman utama</Link>
                                                </div>
                                            </div>
                                            <div style={{display:this.state.isOtp?"block":"none"}}>
                                                {this.state.debug_otp}<br/>
                                                <OTPInput
                                                    maxTime={120}
                                                    value={this.state.otp}
                                                    onChange={this.setOtp}
                                                    autoFocus={true}
                                                    OTPLength={4}
                                                    otpType="number"
                                                    disabled={false}
                                                    style={{AlignItem:"center",justifyContent:"center"}}
                                                />
                                                    <ResendOTP renderButton={renderButton} maxTime='90' renderTime={renderTime} onResendClick={() =>{ this.sendOtpLogin();console.log('ResendOtp');}} />

                                                    <button className="login100-form-btn" style={this.state.verifyAccess?{marginTop:"20px"}:{marginTop:"20px",cursor:'not-allowed',background:'#eee'}} onClick={this.handleVerifyOtp}>
                                                        <span >Verifikasi</span>
                                                    </button>
                                            </div>
                                            </>
                                            :
                                            this.state.type==='uid'?
                                            <>
                                            <div style={{display: this.state.isPin?"none":"block"}}>
                                                <IntlTelInput
                                                    preferredCountries={['id']}
                                                    css={['intl-tel-input', 'form-control']}
                                                    onPhoneNumberChange={(status, value, countryData, number, id) => {
                                                        this.setPhone(value.replace(/^0+/, ''), number.replace(/[^A-Z0-9]/ig, ""))
                                                    }}
                                                    separateDialCode={true}
                                                    format={true}
                                                    formatOnInit={true}
                                                    value={this.state.phone}
                                                    />
                                                <div className="container-login100-form-btn">
                                                    <button className="login100-form-btn" onClick={this.handleLoginBtnPin}>
                                                        <span style={{marginRight:"7px",fontSize:'1.3em'}}>Masuk</span> <i className="fa fa-long-arrow-right" aria-hidden="true" />
                                                    </button>
                                                </div>

                                                <div style={{display:"flex",alignItems:'center',justifyContent:'center',marginTop:"50px"}}>
                                                    <Link to="/"> <i className="fa fa-long-arrow-left" aria-hidden="true" /> Kembali ke halaman utama</Link>
                                                </div>
                                            </div>
                                                {!this.props.auth.isRegisterPin?
                                                <div style={{display:this.state.isPin?"block":"none"}}>
                                                    <label className="text-muted text-left mb-2">Masukan PIN Anda</label>
                                                    <OTPInput
                                                        // maxTime={120}
                                                        value={this.state.pin}
                                                        onChange={this.setPin}
                                                        autoFocus={true}
                                                        OTPLength={6}
                                                        otpType="number"
                                                        disabled={false}
                                                        style={{AlignItem:"center",justifyContent:"center"}}
                                                    />

                                                        <button className="login100-form-btn" style={this.state.verifyAccess?{marginTop:"20px"}:{marginTop:"20px",cursor:'not-allowed',background:'#eee'}} onClick={this.handleVerifyPin}>
                                                            <span >Verifikasi</span>
                                                        </button>
                                                </div>
                                                :
                                                <div className="card text-center w-100 p-4 rounded-lg">
                                                    <p>INFOMASI KEAMANAN</p>
                                                    <small className="text-danger">Demi keamanan pada akun anda, silahkan ganti PIN default anda!</small>
                                                    <br/>
                                                    <div className="mb-3">
                                                        <label className="text-muted text-left">PIN Baru</label>
                                                        <OTPInput
                                                            // maxTime={120}
                                                            value={this.state.pinNew}
                                                            onChange={this.setPinNew}
                                                            autoFocus={true}
                                                            OTPLength={6}
                                                            secure={true}
                                                            otpType="number"
                                                            disabled={false}
                                                            style={{AlignItem:"center",justifyContent:"center"}}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="text-muted text-left">Ulangi PIN Baru</label>
                                                        <OTPInput
                                                            // maxTime={120}
                                                            value={this.state.pinNewRe}
                                                            onChange={this.setPinNewRe}
                                                            autoFocus={false}
                                                            OTPLength={6}
                                                            secure={true}
                                                            otpType="number"
                                                            disabled={false}
                                                            style={{AlignItem:"center",justifyContent:"center"}}
                                                        />
                                                        {this.state.pinNew.length===6&&this.state.pinNewRe.length===6&&this.state.pinNew!==this.state.pinNewRe?
                                                            <small className="text-danger mt-2">PIN tidak sesuai!</small>:''
                                                        }
                                                    </div>
                                                    <div className="d-flex justify-content-end align-items-center">
                                                        <button
                                                            className="btn btn-primary btn-block"
                                                            onClick={(e)=>this.handlePin(e)}
                                                            disabled={this.state.pinNew.length===6&&this.state.pinNewRe.length===6&&this.state.pinNew===this.state.pinNewRe?false:true}
                                                            >SIMPAN</button>
                                                    </div>
                                                </div>
                                                }
                                            </>
                                            :
                                            <Skeleton style={{width:'100%', height:'100px'}}/>
                                            }
                                        </form>
                                        <div className="login100-more" style={{backgroundImage: 'url("auth/bg-01.jpg")'}}>
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
        otp_config: state.siteReducer.data_config
    }
}


export default connect(mapStateToProps)(Auth);