import React, { Component } from 'react';
// import {ModalToggle, ModalType} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
import { stringifyFormData } from "helper";
// import File64 from "components/common/File64";
import { Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { TabList, Tabs, Tab } from 'react-tabs';
import { FetchDetailPin } from 'redux/actions/pin/pin.action';
// import Spinner from 'Spinner'
import Spinner from 'Spinner'
import { createMember } from 'redux/actions/authActions';
import Swal from 'sweetalert2';
import Default from 'assets/default.png'
import { sendOtp } from "redux/actions/authActions";
import PropTypes from 'prop-types';
import bycrypt from 'bcryptjs';
import { withRouter } from 'react-router-dom';
import { ToastQ } from 'helper'
import IntlTelInput from 'react-intl-tel-input/dist/components/IntlTelInput';
import { getBankData } from '../../../../../redux/actions/member/bank.action';
import Select, { components } from "react-select";
import { FetchAvailableMember } from '../../../../../redux/actions/member/member.action';
import Skeleton from 'react-loading-skeleton';
// import { object } from 'prop-types';
// import OTPInput, { ResendOTP } from "otp-input-react";
const resendTime = 300;
const { Option } = components;
const IconOption = props => (
    <Option {...props}>
        <div className="client-media-content d-flex align-items-center p-1">
            {/* <img className="client-thumb mr-3" src={props.data.icon} alt={props.data.label} /> */}
            <div className="user--media-body">
                <h6 className="mb-0 text-dark font-15">{props.data.label}</h6>
                <span className="font-13 text-dark">{props.data.childLabel}</span>
            </div>
        </div>
    </Option>
);
class MemberForm extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLevel = this.handleLevel.bind(this);
        this.handleMembership = this.handleMembership.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleSponsor = this.handleSponsor.bind(this);
        this.handleSponsorFind = this.handleSponsorFind.bind(this);
        this.showPin = this.showPin.bind(this);
        this.state = {
            full_name: '',
            mobile_no: '',
            acc_no: '',
            number: '',
            id_card: '-',
            pin: '',
            pin_re: '',
            picture: '-',
            membership: '-',
            device_id: '-',
            signup_source: 'website',
            findSponsor: '',
            sponsorship: 'me',
            sponsor: '-',
            sponsor_name: '-',
            sponsor_picture: '-',
            temp_sponsor: '-',
            temp_sponsor_name: '-',
            temp_sponsor_picture: '-',
            upline: '-',
            upline_name: '-',
            upline_picture: '-',
            pin_regist: '',
            otp_val: '',
            bank_data: [],
            bank_name: '',
            bank_no: '',
            position: '-',
            prev: '',
            confirm: false,
            isOtp: false,
            isSend: false,
            time: {},
            seconds: resendTime,
            showPin: false,
            showPinRe: false,
            error: {
                full_name: '',
                mobile_no: '',
                acc_no: '',
                id_card: '',
                pin: '',
                pin_re: '',
                picture: '',
                membership: '',
                device_id: '',
                signup_source: '',
                sponsor: '',
                upline: '',
                pin_regist: '',
                otp_val: '',
                bank_name: '',
                bank_no: '',
                prev: '',
            }
        };
        this.handleMembership = this.handleMembership.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setPhone = this.setPhone.bind(this);
        this.HandleChangeBank = this.HandleChangeBank.bind(this);
        this.submitOtp = this.submitOtp.bind(this);
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.isErrorNo === true) {
            if (!this.state.isOtp) {
                this.timer = 0;
                let timeLeftVar = this.secondsToTime(resendTime);
                this.setState({ otp: true, seconds: resendTime, time: timeLeftVar });
                setTimeout(function () { //Start the timer
                    this.startTimer()
                }.bind(this), 500)
            }
        }
        let data_bank = []
        if (nextProps.resBank !== undefined && nextProps.resBank.length > 0) {
            nextProps.resBank.map((i) => {
                data_bank.push({
                    value: i.id,
                    label: i.name,
                    childLabel: i.code,
                    icon: i.value,
                });
                return null;
            });
            this.setState({
                bank_data: data_bank
            })
        }
        this.getProps(nextProps)
        //debug otp
        // if (this.props.auth.user_otp !==undefined) {
        //     this.setState({otp_val:this.props.auth.user_otp.otp_anying })
        // }

        if (this.props.memberAvail !== undefined && this.props.memberAvail.referral_code !== undefined) {
            if (this.state.sponsor !== this.props.memberAvail.referral_code) {
                this.setState({
                    sponsor: this.props.memberAvail.referral_code,
                    sponsor_name: this.props.memberAvail.full_name,
                    sponsor_picture: this.props.memberAvail.picture,
                })
            }
        }
    }
    //  componentDidUpdate(prevState){

    //     // if (this.props.data_avail!==undefined&&this.props.data_avail.referral_code!==undefined) {
    //         // if (this.state.sponsor !==this.props.data_avail.referral_code) {
    //         if (prevState.data_avail !==this.props.data_avail) {
    //             this.setState({
    //                 sponsor:this.props.data_avail.referral_code,
    //                 sponsor_name:this.props.data_avail.full_name,
    //                 sponsor_picture:this.props.data_avail.picture,
    //             })
    //         }
    //         // }
    //     // }
    //  }
    getProps(param) {
        if (this.props.dataAdd === undefined) {
            // window.location.href = '/binary'
            this.props.history.push({ pathname: '/binary' });
        }
        const findItemNested = (arr, itemId, nestingKey) => arr.reduce((a, c) => {
            return a.length
                ? a
                : c.id === itemId
                    ? a.concat(c)
                    : c[nestingKey]
                        ? a.concat(findItemNested(c[nestingKey], itemId, nestingKey))
                        : a
        }, []);
        const res = findItemNested(this.props.dataUpline, this.props.dataId, null);
        if (res[0] !== undefined) {
            if (this.state.sponsorship === 'me') {
                this.setState({
                    sponsor: param.auth.user.referral_code,
                    sponsor_name: param.auth.user.full_name,
                    sponsor_picture: param.auth.user.picture,
                    upline: this.props.dataAdd.parent_id,
                    upline_name: res[0].name,
                    upline_picture: res[0].picture,
                    position: this.props.dataAdd.position,
                })
            }
        }
    }
    componentWillMount() {
        this.getProps(this.props);
        this.props.getBankData()
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.getProps(this.props)
        }


        // if (prevProps.sponsor !=='-') {
        //     this.setState({
        //         sponsor:this.props.memberAvail.referral_code,
        //         sponsor_name:this.props.memberAvail.full_name,
        //         sponsor_picture:this.props.memberAvail.picture,
        //     })
        // }
    }
    showPin(e, param) {
        e.preventDefault()
        this.setState({ [param]: !this.state[param] })
    }
    HandleChangeBank(bk) {
        this.setState({ bank_name: bk.label })
        let err = Object.assign({}, this.state.error, { bank_name: "" });
        this.setState({ error: err });
    }
    handleLevel(val) {
        let err = Object.assign({}, this.state.error, { level: "" });
        this.setState({
            level: val.value,
            error: err
        });
    }
    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.value });
        let err = Object.assign({}, this.state.error, { [event.target.name]: "" });
        this.setState({ error: err });
    };
    setPhone(num, number) {
        this.setState({
            mobile_no: number,
            number: num
        })
    }
    toggle(e) {
        e.preventDefault();
        if (e.target.id === 'cancel') {
            window.location.reload();
        } else {
            let parseData = {};
            parseData['full_name'] = this.state.full_name;
            parseData['mobile_no'] = this.state.mobile_no;
            parseData['id_card'] = this.state.id_card;
            parseData['pin'] = this.state.pin;
            parseData['pin_re'] = this.state.pin_re;
            parseData['picture'] = this.state.picture;
            parseData['bank_name'] = this.state.bank_name;
            parseData['bank_no'] = this.state.bank_no;
            // parseData['membership'] = this.state.membership;
            parseData['device_id'] = this.state.device_id;
            parseData['signup_source'] = this.state.signup_source;
            parseData['sponsor'] = this.state.sponsor;
            parseData['upline'] = this.state.upline;
            parseData['pin_regist'] = this.state.pin_regist.id;
            let err = this.state.error;



            if (parseData['full_name'] === '' || parseData['full_name'] === undefined) {
                err = Object.assign({}, err, { full_name: "Nama lengkap tidak boleh kosong" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['mobile_no'] === '' || parseData['mobile_no'] === undefined) {
                err = Object.assign({}, err, { mobile_no: "No Telpon tidak boleh kosong" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['pin_regist'] === '' || parseData['pin_regist'] === undefined) {
                err = Object.assign({}, err, { pin_regist: "Membership belum dipilih atau pilihan tidak sesuai dengan jumlah PIN yang anda miliki!" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['id_card'] === '' || parseData['id_card'] === undefined) {
                err = Object.assign({}, err, { id_card: "ID Card tidak boleh kosong" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['bank_name'] === '' || parseData['bank_name'] === undefined) {
                err = Object.assign({}, err, { bank_name: "Nama Bank belum dipilih!" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['bank_no'] === '' || parseData['bank_no'] === undefined) {
                err = Object.assign({}, err, { bank_no: "Data No Rekening tidak boleh kosong!" });
                this.setState({ confirm: false, error: err });
            }
            else if (isNaN(String(parseData['bank_no']).replace(/[0-9]/g, ''))) {
                err = Object.assign({}, err, { bank_no: "Data No Rekening harus berupa angka" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['pin'] === '' || parseData['pin'] === undefined) {
                err = Object.assign({}, err, { pin: "PIN tidak boleh kosong" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['pin'].length < 6) {
                err = Object.assign({}, err, { pin: "PIN masih kurang dari 6 digit" });
                this.setState({ confirm: false, error: err });
            }
            else if (isNaN(String(parseData['pin']).replace(/[0-9]/g, ''))) {
                err = Object.assign({}, err, { pin: "PIN harus berupa angka" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['pin_re'] === '' || parseData['pin_re'] === undefined) {
                err = Object.assign({}, err, { pin_re: "PIN tidak boleh kosong" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['pin_re'].length < 6) {
                err = Object.assign({}, err, { pin_re: "PIN masih kurang dari 6 digit" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['pin'] !== parseData['pin_re']) {
                err = Object.assign({}, err, { pin_re: "PIN tidak sesuai!" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['picture'] === '' || parseData['picture'] === undefined) {
                err = Object.assign({}, err, { picture: "Gambar tidak boleh kosong" });
                this.setState({ confirm: false, error: err });
            }
            // else if(parseData['membership']===''||parseData['membership']===undefined){
            //     err = Object.assign({}, err, {membership:"membership tidak boleh kosong"});
            //     this.setState({error: err});
            // }
            else if (parseData['device_id'] === '' || parseData['device_id'] === undefined) {
                err = Object.assign({}, err, { device_id: "Device ID tidak boleh kosong" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['signup_source'] === '' || parseData['signup_source'] === undefined) {
                err = Object.assign({}, err, { signup_source: "Signup Source tidak boleh kosong" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['sponsor'] === '' || parseData['sponsor'] === undefined) {
                err = Object.assign({}, err, { sponsor: "Sponsor tidak boleh kosong" });
                this.setState({ confirm: false, error: err });
            }
            else if (parseData['upline'] === '' || parseData['upline'] === undefined) {
                err = Object.assign({}, err, { upline: "Upline tidak boleh kosong" });
                this.setState({ confirm: false, error: err });
            }
            else {
                this.setState({ confirm: !this.state.confirm })
            }
        }
    };

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        let data = new FormData(form);
        let parseData = stringifyFormData(data);
        parseData['full_name'] = this.state.full_name;
        parseData['mobile_no'] = this.state.mobile_no;
        parseData['id_card'] = this.state.id_card;
        parseData['pin'] = this.state.pin;
        parseData['picture'] = this.state.picture;
        parseData['bank'] = { 'bank_name': this.state.bank_name, 'acc_name': this.state.full_name, 'acc_no': this.state.bank_no };
        parseData['bank_name'] = this.state.bank_name;
        parseData['bank_no'] = this.state.bank_no;
        // parseData['membership'] = this.state.membership;
        parseData['position'] = this.state.position;
        parseData['device_id'] = this.state.device_id;
        parseData['signup_source'] = this.state.signup_source;
        parseData['sponsor'] = this.state.sponsor;
        parseData['upline'] = this.state.upline;
        parseData['pin_regist'] = this.state.pin_regist.id;
        let err = this.state.error;

        if (parseData['full_name'] === '' || parseData['full_name'] === undefined) {
            err = Object.assign({}, err, { full_name: "Nama lengkap tidak boleh kosong" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['mobile_no'] === '' || parseData['mobile_no'] === undefined) {
            err = Object.assign({}, err, { mobile_no: "No Telpon tidak boleh kosong" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['pin_regist'] === '' || parseData['pin_regist'] === undefined) {
            err = Object.assign({}, err, { pin_regist: "Membership belum dipilih atau pilihan tidak sesuai dengan jumlah PIN yang anda miliki!" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['id_card'] === '' || parseData['id_card'] === undefined) {
            err = Object.assign({}, err, { id_card: "ID Card tidak boleh kosong" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['bank_name'] === '' || parseData['bank_name'] === undefined) {
            err = Object.assign({}, err, { bank_name: "Nama Bank belum dipilih!" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['bank_no'] === '' || parseData['bank_no'] === undefined) {
            err = Object.assign({}, err, { bank_no: "Data No Rekening tidak boleh kosong!" });
            this.setState({ confirm: false, error: err });
        }
        else if (isNaN(String(parseData['bank_no']).replace(/[0-9]/g, ''))) {
            err = Object.assign({}, err, { bank_no: "Data No Rekening harus berupa angka" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['pin'] === '' || parseData['pin'] === undefined) {
            err = Object.assign({}, err, { pin: "PIN tidak boleh kosong" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['pin'].length < 6) {
            err = Object.assign({}, err, { pin: "PIN masih kurang dari 6 digit" });
            this.setState({ confirm: false, error: err });
        }
        else if (isNaN(String(parseData['pin']).replace(/[0-9]/g, ''))) {
            err = Object.assign({}, err, { pin: "PIN harus berupa angka" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['pin_re'] === '' || parseData['pin_re'] === undefined) {
            err = Object.assign({}, err, { pin_re: "PIN tidak boleh kosong" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['pin_re'].length < 6) {
            err = Object.assign({}, err, { pin_re: "PIN masih kurang dari 6 digit" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['pin'] !== parseData['pin_re']) {
            err = Object.assign({}, err, { pin_re: "PIN tidak sesuai!" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['picture'] === '' || parseData['picture'] === undefined) {
            err = Object.assign({}, err, { picture: "Gambar tidak boleh kosong" });
            this.setState({ confirm: false, error: err });
        }
        // else if(parseData['membership']===''||parseData['membership']===undefined){
        //     err = Object.assign({}, err, {membership:"membership tidak boleh kosong"});
        //     this.setState({error: err});
        // }
        else if (parseData['device_id'] === '' || parseData['device_id'] === undefined) {
            err = Object.assign({}, err, { device_id: "Device ID tidak boleh kosong" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['signup_source'] === '' || parseData['signup_source'] === undefined) {
            err = Object.assign({}, err, { signup_source: "Signup Source tidak boleh kosong" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['sponsor'] === '' || parseData['sponsor'] === undefined) {
            err = Object.assign({}, err, { sponsor: "Sponsor tidak boleh kosong" });
            this.setState({ confirm: false, error: err });
        }
        else if (parseData['upline'] === '' || parseData['upline'] === undefined) {
            err = Object.assign({}, err, { upline: "Upline tidak boleh kosong" });
            this.setState({ confirm: false, error: err });
        }
        else {
            // if (this.props.detail !== undefined) {

            Swal.fire({
                title: 'Informasi!',
                text: "Pastikan data yang diinput telah benar.",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Lanjut, Daftar',
                cancelButtonText: 'Batal'
            }).then(function (result) {
                if (result.value) {
                    this.props.createMember(parseData);
                }
            }.bind(this))
            // }
        }
    }
    handleOtp(e) {
        e.preventDefault();
        let nohp = this.state.mobile_no
        if (nohp !== '') {
            this.setState({ isSend: true })
            const user = {
                type: 'otp',
                nomor: nohp,
                isRegister: true,
            }
            this.props.sendOtp(user);
        } else {
            Swal.fire(
                'No Hp Belum Diisi! ',
                'Lengkapi nomor untuk melanjutkan.',
                'error'
            )
        }
    }
    submitOtp = async (e) => {
        e.preventDefault();

        if (this.state.otp_val !== '') {
            const res = await bycrypt.compare(this.state.otp_val, this.props.auth.user_otp.sender_id);
            if (res) {
                // true
                ToastQ.fire({ icon: 'success', title: `Kode Aktivasi Sesuai!` });
                this.setState({ isOtp: true, time: {}, seconds: resendTime })
                clearInterval(this.timer);
            }
            else {
                Swal.fire(
                    'Perhatian !! ',
                    'Kode Aktivasi Tidak Sesuai.',
                    'error'
                )
            }
        } else {
            Swal.fire(
                'Perhatian !! ',
                'Kode Aktivasi Belum Diisi.',
                'error'
            )
        }
    }
    handleChangeImage(files) {
        this.setState({
            picture: files.base64
        })
    };
    handleSponsor(e, data) {
        e.preventDefault();
        this.setState({
            sponsorship: data
        })
        if (data === 'their') {
            this.setState({
                temp_sponsor: this.state.sponsor,
                temp_sponsor_name: this.state.sponsor_name,
                temp_sponsor_picture: this.state.sponsor_picture,

                sponsor: '-',
                sponsor_name: '-',
                sponsor_picture: '-',
            })
        } else {
            this.setState({
                sponsor: this.state.temp_sponsor,
                sponsor_name: this.state.temp_sponsor_name,
                sponsor_picture: this.state.temp_sponsor_picture,
            })

        }
    };
    handleSponsorFind(e) {
        e.preventDefault();
        this.props.FetchAvailableMember(this.state.findSponsor, this.state.upline);
    };
    handleMembership(e, val) {
        e.preventDefault();
        if (parseInt(val.jumlah, 10) > 0) {
            let err = this.state.error;
            err = Object.assign({}, err, { pin_regist: "" });
            this.setState({
                pin_regist: val,
                error: err
            })
        } else {
            this.setState({
                pin_regist: {}
            })
            ToastQ.fire({ icon: 'info', title: `Jumlah PIN yang anda miliki masih kurang!` });
        }
    };

    secondsToTime(secs) {
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
        // const {
        //     full_name,kode,paket,point_volume,category,
        // } = this.state.pin_regist===''?'':JSON.parse(this.state.pin_regist);
        // 
        // const { data } = this.props.location
        // 
        return (
            !this.props.isLoadingAuth ?
                !this.props.registered ?
                    <Card>
                        {/* <CardHeader className="bg-transparent"><h4>Tambah Member Baru</h4></CardHeader> */}
                        <CardBody>
                            <form onSubmit={this.handleSubmit}>
                                <div className={`row ${!this.state.confirm ? '' : 'd-none'}`}>
                                    <div className="col-md-6 offset-md-3">
                                        <Card>
                                            <CardBody>
                                                <div className="form-group">
                                                    <label>Nama Lengkap</label>
                                                    <input type="text" className="form-control form-control-lg" name="full_name" value={this.state.full_name} onChange={this.handleChange} />
                                                    <div className="invalid-feedback" style={this.state.error.full_name !== "" ? { display: 'block' } : { display: 'none' }}>
                                                        {this.state.error.full_name}
                                                    </div>
                                                </div>
                                                {/* <div className="form-group">
                                                    <label>No. Telp.</label>
                                                    <input
                                                            type="tel"
                                                            pattern="\d*"
                                                            maxLength="14"
                                                            className="form-control form-control-lg"
                                                            name="mobile_no"
                                                            value={this.state.mobile_no}
                                                            onChange={this.handleChange}  />
                                                    <div className="invalid-feedback" style={this.state.error.mobile_no!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.mobile_no}
                                                    </div>
                                                </div> */}
                                                <div className="form-group">
                                                    <label>No. Telp.</label>
                                                    {String(this.state.time.m) + String(this.state.time.s) !== '00' && this.state.time.m !== undefined ?
                                                        <h5 className="text-center text-danger">Kirim ulang kode aktivasi dalam {this.state.time.m + ":" + this.state.time.s}</h5>
                                                        :
                                                        <div className="row">
                                                            <div className="col-md-8">
                                                                {/* <input type="text" id="chat-search" name="search" className="form-control form-control-sm" placeholder="Search" value=""> */}
                                                                {/* <input
                                                                    type="tel"
                                                                    pattern="\d*"
                                                                    maxLength="14"
                                                                    className="form-control form-control-lg"
                                                                    name="mobile_no"
                                                                    value={this.state.mobile_no}
                                                                    onChange={this.handleChange}
                                                                    readOnly={this.state.isOtp} /> */}
                                                                <IntlTelInput
                                                                    preferredCountries={['id']}
                                                                    css={['intl-tel-input', 'form-control-sm']}
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
                                                                {/* <span className="input-group-append"> */}
                                                                <button type="button" className={`btn btn-${this.state.isOtp ? 'success' : 'primary'} btn-block`} onClick={(e) => this.handleOtp(e)} disabled={this.state.isOtp} style={{ padding: '11px' }} >{this.state.isOtp ? 'Terverifikasi' : 'Verifikasi'}</button>
                                                                {/* </span> */}
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className="invalid-feedback" style={this.state.error.mobile_no !== "" ? { display: 'block' } : { display: 'none' }}>
                                                        {this.state.error.mobile_no}
                                                    </div>
                                                    <div className="card mt-1" style={{ display: this.state.isSend && !this.state.isOtp ? '' : 'none' }}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <label>Kode Aktivasi</label>
                                                                    <div className="input-group input-group-md">
                                                                        {/* <input type="text" id="chat-search" name="search" className="form-control form-control-sm" placeholder="Search" value=""> */}
                                                                        <input
                                                                            type="tel"
                                                                            pattern="\d*"
                                                                            maxLength="6"
                                                                            className="form-control form-control-md"
                                                                            name="otp_val"
                                                                            value={this.state.otp_val}
                                                                            onInput={this.handleChange} />
                                                                        {/* <OTPInput
                                                                                value={this.state.otp_val}
                                                                                onChange={this.handleChange}
                                                                                autoFocus={true}
                                                                                OTPLength={6}
                                                                                otpType="number"
                                                                                disabled={false}
                                                                                style={{AlignItem:"center",justifyContent:"center"}}
                                                                            /> */}
                                                                        <span className="input-group-append">
                                                                            <button type="button" className="btn btn-primary" onClick={async (e) => (await this.submitOtp(e))}><i className="fa fa-check"></i></button>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <label style={{ visibility: 'collapse' }}>Kode Aktivasi</label>
                                                                    <div className="alert alert-primary font-12" style={{ backgroundColor: '#7266ba', zIndex: 1, padding: '3px' }}>
                                                                        Masukan kode Aktivasi pada nomor yang sedang anda daftarkan dan mintalah kode tersebut dengan bijak.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Sponsorship</label>
                                                    <div className="row no-gutters">
                                                        <div className="col-6">
                                                            <button type="button" className={`btn${this.state.sponsorship === 'me' ? '-danger' : '-secondary zoom-hover'} btn-block p-2 border-none`} disabled={this.state.sponsorship === 'me'} onClick={(e) => this.handleSponsor(e, 'me')}>Saya sebagai Sponsor</button>
                                                        </div>
                                                        <div className="col-6">
                                                            <button type="button" className={`btn${this.state.sponsorship === 'their' ? '-danger' : '-secondary zoom-hover'} btn-block p-2 border-none`} disabled={this.state.sponsorship === 'their'} onClick={(e) => this.handleSponsor(e, 'their')}>Orang lain sebagai Sponsor</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`form-group ${this.state.sponsorship === 'their' ? '' : 'd-none'}`}>
                                                    <label>Cari Sponsorship</label>
                                                    <div className="input-group mb-3">
                                                        <input type="text" className="form-control" placeholder="Kode Sponsor" name="findSponsor" value={this.state.findSponsor} onChange={this.handleChange} />
                                                        <div className="input-group-append">
                                                            {this.props.isLoadingAvail ?
                                                                <button className="btn btn-primary" type="button" disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /><span className="sr-only">Loading...</span></button>
                                                                :
                                                                <button className="btn btn-primary" type="button" onClick={(e) => this.handleSponsorFind(e)}><i className="fa fa-search" /></button>
                                                            }
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* <div className="form-group">
                                                    <label>No. Identitas (KTP)</label>
                                                    <input
                                                            type="text"
                                                            pattern="\d*"
                                                            maxLength="24"
                                                            className="form-control form-control-lg"
                                                            name="id_card"
                                                            value={this.state.id_card}
                                                            onChange={this.handleChange}  />
                                                    <div className="invalid-feedback" style={this.state.error.id_card!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.id_card}
                                                    </div>
                                                </div> */}

                                                {/* <div className="form-group">
                                                    <label htmlFor="inputState" className="col-form-label">Foto {this.props.data_detail!==undefined?<small>(kosongkan apabila tidak ada perubahan.)</small>:""}</label><br/>
                                                    <File64
                                                        multiple={ false }
                                                        maxSize={2048} //in kb
                                                        fileType='png, jpg' //pisahkan dengan koma
                                                        className="mr-3 form-control-file"
                                                        onDone={ this.handleChangeImage }
                                                        showPreview={true}
                                                        lang='id'
                                                        previewLink={this.state.prev}
                                                        previewConfig={{
                                                            width:'200px',
                                                            height: '200px'
                                                        }}
                                                        />
                                                    <div className="invalid-feedback" style={this.state.error.logo!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.logo}
                                                    </div>
                                                </div> */}
                                                {/* </CardBody>
                                        </Card>
                                    </div>
                                    <div className="col-md-6  offset-md-3">
                                        <Card>
                                            <CardBody> */}
                                                <div className="col-md-10 offset-md-1">
                                                    <div className="row">
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-group">
                                                                <label>Sponsor</label>
                                                                {/* 
                                                                <input type="text" className="form-control form-control-lg" name="sponsor" value={this.state.sponsor} onChange={this.handleChange} readOnly />
                                                                <div className="invalid-feedback" style={this.state.error.sponsor!==""?{display:'block'}:{display:'none'}}>
                                                                    {this.state.error.sponsor}
                                                                </div> */}
                                                                <div className="member-content-area">
                                                                    <div className="member-contact-content d-flex align-items-center mb-4">
                                                                        <div className="contact-thumb">
                                                                            <img src={this.state.sponsor_picture} onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} alt="sangqu" />
                                                                        </div>
                                                                        <div className="member-contact-info">
                                                                            <h5>{this.state.sponsor_name}</h5>
                                                                            <span className="badge badge-success badge-pill">{this.state.sponsor}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-6">
                                                            <div className="form-group">
                                                                <label>Upline</label>
                                                                {/* <input type="text" className="form-control form-control-lg" name="upline" value={this.state.upline} onChange={this.handleChange} readOnly />
                                                                <div className="invalid-feedback" style={this.state.error.upline!==""?{display:'block'}:{display:'none'}}>
                                                                    {this.state.error.upline}
                                                                </div> */}
                                                                <div className="member-content-area">
                                                                    <div className="member-contact-content d-flex align-items-center mb-4">
                                                                        <div className="contact-thumb">
                                                                            <img src={this.state.upline_picture} onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} alt="sangqu" />
                                                                        </div>
                                                                        <div className="member-contact-info">
                                                                            <h5>{this.state.upline_name}</h5>
                                                                            <span className="badge badge-success badge-pill">{this.state.upline}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Position</label>
                                                    <input type="text" className="form-control form-control-lg" name="position" value={String(this.state.position).toUpperCase()} onChange={this.handleChange} readOnly />
                                                    <div className="invalid-feedback" style={this.state.error.position !== "" ? { display: 'block' } : { display: 'none' }}>
                                                        {this.state.error.position}
                                                    </div>
                                                </div>
                                                {/* <div className="form-group">
                                                    <label>PIN Regist</label>
                                                    <input type="text" className="form-control form-control-lg" name="pin_regist" value={this.state.pin_regist} onChange={this.handleChange} readOnly />
                                                    <div className="invalid-feedback" style={this.state.error.pin_regist!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.pin_regist}
                                                    </div>
                                                </div> */}
                                                <div className="form-group" style={{ display: this.state.isOtp ? '' : 'none' }}>
                                                    <div className="d-md-flex justify-content-between align-items-center d-none">
                                                        <label>Pilih Membership</label>
                                                        {/* <label>PIN YANG ANDA MILIKI : {this.props.availPin !== undefined?this.props.availPin.total_pin:''} PIN</label> */}
                                                    </div>
                                                    <div className="text-left d-block d-md-none">
                                                        {/* <label>PIN YANG ANDA MILIKI : {this.props.availPin !== undefined?this.props.availPin.total_pin:''} PIN</label> */}
                                                        <br />
                                                        <label>Pilih Membership</label>
                                                    </div>
                                                    <Tabs>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <TabList>
                                                                    <div className="row m-1 justify-content-center">
                                                                        <Tab className="col-auto btn btn-outline-dark w-40 m-2 p-4 text-center cursor-pointer text-uppercase shadow-sm rounded d-none"></Tab>
                                                                        {
                                                                            (
                                                                                typeof this.props.availPin === 'object' ?
                                                                                    this.props.availPin.length > 0 ?
                                                                                        this.props.availPin.map((v, i) => {
                                                                                            return (
                                                                                                <Tab key={i} className="col-md-5 col-12 btn btn-outline-dark w-40 m-2 p-4 text-center cursor-pointer text-uppercase shadow-sm rounded" label="Core Courses" onClick={(e) => this.handleMembership(e, v)}>
                                                                                                    <img className="img-fluid" src={v.badge} alt="sangqu" style={{ height: '100px' }} />
                                                                                                    <br />
                                                                                                    <a href={() => false} className="font-24">{`${v.title}`}</a>
                                                                                                    <br />
                                                                                                    <a href={() => false} className="font-11">Sebanyak {`${v.jumlah}`} PIN Tersedia</a>
                                                                                                </Tab>
                                                                                            )
                                                                                        })
                                                                                        :
                                                                                        (() => {
                                                                                            const rows = [];
                                                                                            for (let i = 0; i < 2; i++) {
                                                                                                rows.push(
                                                                                                    <Tab key={i} className="col-md-5 col-12 btn btn-outline-dark w-40 m-2 p-4 text-center cursor-pointer text-uppercase shadow-sm rounded">
                                                                                                        <Skeleton style={{ width: '100px', height: '100px' }} circle={true} />
                                                                                                        <br />
                                                                                                        <Skeleton style={{ width: '30%', height: '30px' }} />
                                                                                                        <br />
                                                                                                        <Skeleton style={{ width: '45%', height: '20px' }} />
                                                                                                    </Tab>
                                                                                                );
                                                                                            }
                                                                                            return rows;
                                                                                        })()
                                                                                    : "No data."
                                                                            )
                                                                        }
                                                                    </div>
                                                                </TabList>
                                                            </div>
                                                        </div>
                                                    </Tabs>
                                                    <div className="invalid-feedback" style={this.state.error.pin_regist !== "" ? { display: 'block' } : { display: 'none' }}>
                                                        {this.state.error.pin_regist}
                                                    </div>

                                                    {/* <div className="form-group">
                                                        <label>DATA REKENING</label>
                                                        <input
                                                            type="text"
                                                            pattern="\d*"
                                                            maxLength="17"
                                                            className="form-control form-control-lg"
                                                            name="acc_no"
                                                            value={this.state.acc_no}
                                                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                                            onChange={this.handleChange}  />
                                                                <small className="text-warning">Masukan Data Rekening yang bersangkutan, wajib diisi dan bersifat permanen!.</small>
                                                        <div className="invalid-feedback" style={this.state.error.acc_no!==""?{display:'block'}:{display:'none'}}>
                                                            {this.state.error.acc_no}
                                                        </div>
                                                    </div> */}

                                                    <div className="img-thumbnail rounded-lg p-2" style={{ borderColor: '#e8ebf1' }}>
                                                        {/* <hr/> */}
                                                        <small className="text-muted">Data Bank</small>
                                                        <div className="form-group">
                                                            <label>Nama Bank</label>
                                                            {typeof this.state.bank_data === 'object' ? this.state.bank_data.length > 0 ?
                                                                <Select
                                                                    defaultValue={this.state.bank_data[0]}
                                                                    options={this.state.bank_data}
                                                                    components={{ Option: IconOption }}
                                                                    onChange={this.HandleChangeBank}
                                                                    value={
                                                                        this.state.bank_data.find(op => {
                                                                            return op.label === this.state.bank
                                                                        })}
                                                                /> : <Spinner /> : <Spinner />
                                                            }
                                                            <div className="invalid-feedback" style={this.state.error.bank_name !== "" ? { display: 'block' } : { display: 'none' }}>
                                                                {this.state.error.bank_name}
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Nomor Rekening Bank</label>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-lg"
                                                                name="bank_no"
                                                                maxLength="17"
                                                                value={this.state.bank_no}
                                                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                                                onChange={this.handleChange} />
                                                            <div className="invalid-feedback" style={this.state.error.bank_no !== "" ? { display: 'block' } : { display: 'none' }}>
                                                                {this.state.error.bank_no}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>PIN</label>
                                                        <div className="input-group mb-3">
                                                            <input
                                                                type={this.state.showPin ? "text" : "password"}
                                                                pattern="\d*"
                                                                maxLength="6"
                                                                className="form-control form-control-lg password-cus"
                                                                name="pin"
                                                                value={this.state.pin}
                                                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                                                onChange={this.handleChange} />
                                                            <div className="input-group-append" style={{ zIndex: 0 }}>
                                                                <button type="button" className="btn btn-outline-dark" onClick={(e) => this.showPin(e, 'showPin')}><i className={`zmdi zmdi-eye${this.state.showPin ? '' : '-off'}`}></i></button>
                                                            </div>
                                                        </div>
                                                        <small className="text-muted">Masukan 6 digit angka yang akan digunakan member baru untuk login.</small>
                                                        <div className="invalid-feedback" style={this.state.error.pin !== "" ? { display: 'block' } : { display: 'none' }}>
                                                            {this.state.error.pin}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>ULANGI PIN</label>
                                                        <div className="input-group mb-3">
                                                            <input
                                                                type={this.state.showPinRe ? "text" : "password"}
                                                                pattern="\d*"
                                                                maxLength="6"
                                                                className="form-control form-control-lg password-cus"
                                                                name="pin_re"
                                                                value={this.state.pin_re}
                                                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                                                onChange={this.handleChange} />
                                                            <div className="input-group-append" style={{ zIndex: 0 }}>
                                                                <button type="button" className="btn btn-outline-dark" onClick={(e) => this.showPin(e, 'showPinRe')}><i className={`zmdi zmdi-eye${this.state.showPinRe ? '' : '-off'}`}></i></button>
                                                            </div>
                                                        </div>
                                                        <small className="text-muted">Masukan kembali 6 digit angka yang telah anda input sebelumnya.</small>
                                                        <div className="invalid-feedback" style={this.state.error.pin_re !== "" ? { display: 'block' } : { display: 'none' }}>
                                                            {this.state.error.pin_re}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                                <div className={`row ${this.state.confirm ? '' : 'd-none'}`}>
                                    <div className="col-md-6 offset-md-3 mb-5">
                                        <Card>
                                            <CardHeader className="bg-primary text-light text-center">Membership Detail</CardHeader>
                                            <CardBody>
                                                <Table striped>
                                                    <thead className="bg-primary">
                                                        <tr>
                                                            <th className="text-center text-light">Membership</th>
                                                            <th className="text-center text-light">Syarat</th>
                                                            {/* <th className="text-center text-light">Paket</th>
                                                            <th className="text-center text-light">Volume</th>
                                                            <th className="text-center text-light">Kategori</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th className="text-center" scope="row">{this.state.pin_regist !== '' && this.state.pin_regist !== undefined ? this.state.pin_regist.title : ''}</th>
                                                            <th className="text-center" scope="row">{this.state.pin_regist !== '' && this.state.pin_regist !== undefined ? this.state.pin_regist.jumlah : ''} PIN</th>
                                                            {/* <th className="text-center" scope="row">{paket}</th>
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
                                                    <thead className="bg-transparent" style={{ visibility: 'collapse' }}>
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
                                                        {/* <tr>
                                                            <th className="text-left" scope="row">Data Rekening</th>
                                                            <th className="text-left" scope="row">: {this.state.acc_no}</th>
                                                        </tr> */}
                                                        <tr>
                                                            <th className="text-left" scope="row">Nama Bank</th>
                                                            <th className="text-left" scope="row">: {this.state.bank_name}</th>
                                                        </tr>
                                                        <tr>
                                                            <th className="text-left" scope="row">No. Bank</th>
                                                            <th className="text-left" scope="row">: {this.state.bank_no}</th>
                                                        </tr>
                                                        <tr>
                                                            <th className="text-left align-middle" scope="row">Sponsor</th>
                                                            <th className="text-left align-middle" scope="row">
                                                                <div className="member-content-area">
                                                                    <div className="member-contact-content d-flex align-items-center">
                                                                        <span>:</span> &nbsp;&nbsp;&nbsp;
                                                                        <div className="contact-thumb">
                                                                            <img src={this.state.sponsor_picture} onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} alt="sangqu" />
                                                                        </div>
                                                                        <div className="member-contact-info">
                                                                            <h5>{this.state.sponsor_name}</h5>
                                                                            <span className="badge badge-success badge-pill">{this.state.sponsor}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th className="text-left align-middle" scope="row">Upline</th>
                                                            <th className="text-left align-middle" scope="row">
                                                                <div className="member-content-area">
                                                                    <div className="member-contact-content d-flex align-items-center">
                                                                        <span>:</span> &nbsp;&nbsp;&nbsp;
                                                                        <div className="contact-thumb">
                                                                            <img src={this.state.upline_picture} onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} alt="sangqu" />
                                                                        </div>
                                                                        <div className="member-contact-info">
                                                                            <h5>{this.state.upline_name}</h5>
                                                                            <span className="badge badge-success badge-pill">{this.state.upline}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                                <div className="form-group mt-2" style={{ textAlign: "right" }}>
                                    <button type="button" className="btn btn-warning mb-2 mr-2" id={this.state.confirm ? 'back' : 'cancel'} onClick={this.toggle}><i className="ti-close" />{this.state.confirm ? 'Kembali' : 'Batal'}</button>
                                    <button type="button" className={`btn btn-primary mb-2 mr-2 ${!this.state.confirm ? '' : 'd-none'}`} onClick={this.toggle} disabled={!this.state.isOtp} ><i className="ti-close" /> Selanjutnya</button>
                                    <button type="submit" className={`btn btn-primary mb-2 mr-2 ${this.state.confirm ? '' : 'd-none'}`} ><i className="ti-save" /> Daftarkan</button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                    :
                    <div>
                        <Card className="box-margin">
                            <CardHeader className="bg-transparent"><h4>Detail Pendaftaran</h4></CardHeader>
                            <CardBody>
                                <Table striped>
                                    <thead className="bg-transparent" style={{ visibility: 'collapse' }}>
                                        <tr>
                                            <th className="text-left text-light w-50"></th>
                                            <th className="text-left text-dark w-50"><h5>Detail</h5></th>
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
                                        {/* <tr>
                                        <th className="text-left" scope="row">Data Rekening</th>
                                        <th className="text-left" scope="row">: {this.state.acc_no}</th>
                                    </tr> */}
                                        <tr>
                                            <th className="text-left" scope="row">Nama Bank</th>
                                            <th className="text-left" scope="row">: {this.state.bank_name}</th>
                                        </tr>
                                        <tr>
                                            <th className="text-left" scope="row">No. Bank</th>
                                            <th className="text-left" scope="row">: {this.state.bank_no}</th>
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
                            <CardFooter className="bg-transparent">
                                <button className="btn btn-primary mr-1" onClick={(e) => { e.preventDefault(); window.location.reload() }}>Daftarkan Member Lagi</button>
                                <button className="btn btn-info mr-1" onClick={(e) => { e.preventDefault(); window.location.href = '/' }}>Ke Halaman Utama</button>
                                {/* <Link to="/" className="btn btn-primary">Ke Halaman Utama</Link> */}
                            </CardFooter>
                        </Card>
                        <Card className="box-margin">
                            <CardHeader className="bg-transparent"><h4>Akses Masuk</h4></CardHeader>
                            <CardBody>
                                <div>
                                    <h5>Untuk pengguna yang telah berhasil di daftarkan, harap diarahkan untuk proses masuk sistem dengan menggunakan no telpon yang baru saja didaftarkan!</h5>
                                    <p>No Telpon : {this.state.mobile_no}</p>
                                </div>
                            </CardBody>
                            <CardFooter className="bg-transparent">
                                <button className="btn btn-primary mr-1" onClick={(e) => { e.preventDefault(); window.location.reload() }}>Daftarkan Member Lagi</button>
                                <button className="btn btn-info mr-1" onClick={(e) => { e.preventDefault(); window.location.href = '/' }}>Ke Halaman Utama</button>
                                {/* <Link to="/" className="btn btn-primary">Ke Halaman Utama</Link> */}
                            </CardFooter>
                        </Card>
                    </div>
                : <Spinner spinnerLabel="Sedang memproses data..." />
        );
    }
}

MemberForm.propTypes = {
    sendOtp: PropTypes.func.isRequired,
    FetchDetailPin: PropTypes.func.isRequired,
    createMember: PropTypes.func.isRequired,
    errors: PropTypes.object
}

const mapStateToProps = (state) => {

    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        pinList: state.pinReducer.data_detail,
        isLoading: state.pinReducer.isLoading,
        isLoadingAuth: state.auth.isLoading,
        isLoadingData: state.bankReducer.isLoadingData,
        resBank: state.bankReducer.data_bank,
        registered: state.auth.isRegistered,
        auth: state.auth,
        isLoadingAvail: state.memberReducer.isLoadingAvail,
        memberAvail: state.memberReducer.data_avail,
        // Level:state.userLevelReducer.data,
    }
}
export default withRouter(connect(mapStateToProps, { sendOtp, FetchDetailPin, createMember, getBankData, FetchAvailableMember })(MemberForm));
