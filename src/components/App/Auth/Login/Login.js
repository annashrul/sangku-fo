import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BgAuth from "assets/logo.png"
import './login.css'
import {loginUser, setLoggedin} from 'redux/actions/authActions';
import Swal from 'sweetalert2'
import {HEADERS} from 'redux/actions/_constants'
import { useSpring, animated } from 'react-spring'
import tshirt from "assets/tshirt.png"
import bags from "assets/bags.png"
import jacket from "assets/jacket.png"
import jas from "assets/jas.png"
import bycrypt from 'bcryptjs';
import ParticlesBg from "particles-bg";
import {sendOtp} from "redux/actions/authActions";


const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 50}px,${y / 8 + 200}px,0) rotate(20deg)`
const trans2 = (x, y) => `translate3d(${x / 20}px,${y / 6 + 500}px,0) rotate(20deg)`
const trans3 = (x, y) => `translate3d(${x / 10}px,${y / 6 - 300}px,0) rotate(20deg)`
const trans4 = (x, y) => `translate3d(${x / 30}px,${y / 6 - 10}px,0) rotate(20deg)`

const resendTime = 120;

export const RenderImages = () =>
    {
        const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
        return(
            <div className="container-a" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
                <animated.div class="card1" style={{ transform: props.xy.interpolate(trans1) }}><img src={jacket} alt="img"/></animated.div>
                <animated.div class="card2" style={{ transform: props.xy.interpolate(trans2) }}><img src={jas} alt="img"/></animated.div>
                <animated.div class="card3" style={{ transform: props.xy.interpolate(trans3) }}><img src={tshirt} alt="img"/></animated.div>
                <animated.div class="card4" style={{ transform: props.xy.interpolate(trans4) }}><img src={bags} alt="img"/></animated.div>
            </div>
        )
    }
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            nohp: '',
            otp: false,
            otp_val: '',
            isError:false,
            type:'otp',
            // disableButton:false,
            // server_price:0,
            // acc_name:"",
            // acc_number:0,
            errors:{
            },
            logo: BgAuth,
            width:'100px',
            time: {},
            seconds: resendTime
        };
        this.submitHandelar = this.submitHandelar.bind(this);
        this.submitOtp = this.submitOtp.bind(this);
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    getFaviconEl() {
        return document.getElementById("favicon");
    }

    componentDidMount (){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
            // window.location.href='/dashboard'
        }
        // if(this.props.history.location.query===undefined){
            // this.props.history.push('/')
            // window.location.href='/dashboard'
        // }
        this.initFetch();
        
        // let timeLeftVar = this.secondsToTime(this.state.seconds);
        // this.setState({ time: timeLeftVar })
    }

    initFetch() {
        fetch(HEADERS.URL + `auth/config`)
            .then(res => res.json())
            .then(
                (data) => {
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
        if(nextProps.auth.isErrorNo===true){
            this.timer = 0;
            let timeLeftVar = this.secondsToTime(resendTime);
            this.setState({otp:true,seconds:resendTime,time:timeLeftVar});
            setTimeout(function() { //Start the timer
                this.startTimer()
            }.bind(this), 500)
        }
        this.getProps(nextProps)
        //debug otp
        if (this.props.auth.user.otp_anying !==undefined) {
            this.setState({otp_val:this.props.auth.user.otp_anying })
        }
     }
     componentWillMount(){
         document.title="Sangku"
        this.getProps(this.props);
     }
     getProps(param){
         if(param.auth.isAuthenticated){
             param.history.push('/dashboard');
            //  window.location.href = '/dashboard'
         }else{
             if(param.errors){
                 this.setState({errors: param.errors})
             }
         }
     }

    submitHandelar = (event)=>{
        event.preventDefault();
        const {email,password,type,nohp} = this.state;
        if(type!=='otp'){
            // if(email!==''&&password!==''){
            //     const user = {
            //         username: email,
            //         password: password
            //     }
            //     this.props.loginUser(user);
            // }else{
            //     Swal.fire(
            //         'Isi Username dan Password Terlebih Dahulu! ',
            //         'Lengkapi form untuk melanjutkan.',
            //         'error'
            //     )
            // }

        } else {
            if(nohp!==''){
                const user = {
                    type: type,
                    nomor: nohp,
                    islogin: true,
                }
                this.props.sendOtp(user);


            }else{
                Swal.fire(
                    'No Hp Belum Diisi! ',
                    'Lengkapi nomor untuk melanjutkan.',
                    'error'
                )
            }

        }
    }

    submitOtp = async (event)=>{
        event.preventDefault();
        console.log(this.props.auth.user.sender_id);
        const res = await bycrypt.compare(this.state.otp_val,this.props.auth.user.sender_id);
        if(res){
            const {email,password,type,nohp} = this.state;
            const user = {
                type: type,
                nohp: nohp
            };
            this.props.loginUser(user);

        }
        else{
            Swal.fire(
                'Perhatian !! ',
                'OTP Tidak Sesuai.',
                'error'
            )
        }
        // const {otp_val} = this.state;
        // alert(this.props.auth.user.otp);
        // if(otp_val===this.props.auth.user.otp){
        //     this.props.setLoggedin(true);
        //     const token = this.props.auth.user.token;
        //     localStorage.setItem('sangku', btoa(token));
        // }else{
        //     Swal.fire(
        //         'OTP Tidak Sesuai! ',
        //         'Masukan OTP dengan benar.',
        //         'error'
        //     )
        // }
    }

    handleInputChange =(event)=> {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }
    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds === 0) { 
            clearInterval(this.timer);
        }
    }

    render() {
        const {otp_val,nohp, email,password, errors,disableButton} = this.state;
        return (
        <div className="limiter">
            <ParticlesBg type="cobweb" bg={true}/>
            <div className="container-login100">
                <div className="row">
                    <div className={'col-md-6 offset-md-3'}>
                        <div className="wrap-login100" style={{justifyContent:'center', width:'unset'}}>
                                <form className="login100-form validate-form" style={{display:'contents'}}>
                                    <div className="login100-pic js-tilt mb-5" data-tilt>
                                        <img src={this.state.logo} alt="IMG" />
                                    </div>
                                    <span className="login100-form-title">Hi, Welcome back . . .</span>
                                    {this.state.type!=='otp'?
                                        <div>
                                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                                <input type="text" readOnly={disableButton}
                                                    className={email !== '' ? 'input100 has-val' : 'input100'}
                                                    placeholder="Username"
                                                    name="email"
                                                    value={email}
                                                    onChange={this.handleInputChange}/>
                                                    <span className="focus-input100"/>
                                                    <span className="symbol-input100">
                                                        <i className="fa fa-envelope" aria-hidden="true"/>
                                                    </span>
                                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                            </div>
                                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                                <input
                                                    readOnly={disableButton}
                                                    type="password"
                                                    className={password !== '' ? 'input100 has-val' : 'input100'}
                                                    placeholder="Password"
                                                    name="password"
                                                    value={password}
                                                    onChange={this.handleInputChange}/>
                                                    <span className="focus-input100"/>
                                                    <span className="symbol-input100">
                                                        <i className="fa fa-lock" aria-hidden="true"/>
                                                    </span>
                                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                            </div>
                                            <div className="container-login100-form-btn">
                                            <button className="login100-form-btn" onClick={this.submitHandelar}>
                                                Login
                                            </button>
                                            </div>
                                        </div>
                                        :''
                                    }
                                    {this.state.type==='otp'?
                                        <div>
                                            {this.state.otp?
                                            <div>
                                                <div className="wrap-input100 validate-input" data-validate="Otp is required">
                                                    <input
                                                        readOnly={disableButton}
                                                        type="type"
                                                        pattern="\d*"
                                                        className={otp_val !== '' ? 'input100 has-val' : 'input100'}
                                                        placeholder="OTP"
                                                        maxLength="4"
                                                        name="otp_val"
                                                        value={otp_val}
                                                        onChange={this.handleInputChange}/>
                                                        <span className="focus-input100"/>
                                                        <span className="symbol-input100">
                                                            <i className="fa fa-asterisk" aria-hidden="true"/>
                                                        </span>
                                                    {errors.otp_val && (<div className="invalid-feedback">{errors.otp_val}</div>)}
                                                </div>
                                                {String(this.state.time.m)+String(this.state.time.s)!=='00'?
                                                <div>
                                                    <button type="button" className="btn btn-link btn-block">Kirim ulang otp dalam {this.state.time.m +":"+this.state.time.s}</button>
                                                    <div className="container-login100-form-btn">
                                                        <button className="login100-form-btn" onClick={async (event)=>(await this.submitOtp(event))}>
                                                            Validate
                                                        </button>
                                                    </div>
                                                </div>
                                                :
                                                <div className="container-login100-form-btn">
                                                <button className="login100-form-btn" onClick={this.submitHandelar}>
                                                    Resend
                                                </button>
                                                </div>
                                                }
                                            </div>
                                            :
                                            <div>
                                                <div className="wrap-input100 validate-input" data-validate="Number is required">
                                                    <input
                                                        readOnly={disableButton}
                                                        type="Number"
                                                        className={nohp !== '' ? 'input100 has-val' : 'input100'}
                                                        placeholder="No Hp"
                                                        name="nohp"
                                                        value={nohp}
                                                        onChange={this.handleInputChange}/>
                                                        <span className="focus-input100"/>
                                                        <span className="symbol-input100">
                                                            <i className="fa fa-phone" aria-hidden="true"/>
                                                        </span>
                                                    {errors.nohp && (<div className="invalid-feedback">{errors.nohp}</div>)}
                                                </div>
                                                <div className="container-login100-form-btn">
                                                <button className="login100-form-btn" onClick={this.submitHandelar}>
                                                    Process
                                                </button>
                                                </div>
                                            </div>
                                        }
                                        </div>
                                        :''
                                    }
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    sendOtp: PropTypes.func.isRequired,
    setLoggedin: PropTypes.func.isRequired,
    auth: PropTypes.object,
    errors: PropTypes.object
}

const mapStateToProps = ({auth, errors}) =>{

    return{
        auth : auth,
        errors: errors
    }
}

export default connect(mapStateToProps,{loginUser,setLoggedin,sendOtp})(Login);