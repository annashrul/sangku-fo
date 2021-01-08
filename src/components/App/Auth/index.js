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


class Auth extends Component{

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
                                            Member Area
                                            </span>
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
                                                    <button className="login100-form-btn" onClick={this.handleLoginBtn}>
                                                        <span style={{marginRight:"7px",fontSize:'1.3em'}}>Masuk</span> <i className="fa fa-long-arrow-right" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div style={{display:this.state.isOtp?"block":"none"}}>
                                                {this.state.debug_otp}<br/>
                                                <OTPInput
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


export default connect(mapStateToProps)(Auth);