import React, { Component } from 'react';
// import {ModalToggle, ModalType} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
// import File64 from "components/common/File64";
import { Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { TabList, Tabs, Tab } from 'react-tabs';
import { FetchDetailPinWebView } from 'redux/actions/pin/pin.action';
// import Spinner from 'Spinner'
import Preloader from 'PreloaderWebview'
import { createMemberWebView } from 'redux/actions/authActions';
import Swal from 'sweetalert2';
import Default from 'assets/default.png'
import { sendOtp } from "redux/actions/authActions";
import PropTypes from 'prop-types';
import bycrypt from 'bcryptjs';
import { withRouter } from 'react-router-dom';
import { ToastQ } from 'helper'
import IntlTelInput from 'react-intl-tel-input/dist/components/IntlTelInput';
import { FetchAvailableMember } from '../../../../../redux/actions/member/member.action';
import { getBankData } from '../../../../../redux/actions/member/bank.action';

import Spinner from 'Spinner'

import Select, { components } from "react-select";
import Skeleton from 'react-loading-skeleton';
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

const resendTime = 300;
class MemberForm extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLevel = this.handleLevel.bind(this);
        this.handleMembership = this.handleMembership.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.showPin = this.showPin.bind(this);
        this.HandleChangeBank = this.HandleChangeBank.bind(this);
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
            signup_source: 'android',
            sponsor: '-',
            sponsor_name: '-',
            sponsor_picture: '-',
            upline: '-',
            showPin: false,
            showPinRe: false,
            upline_name: '-',
            upline_picture: '-',
            pin_regist: '',
            otp_val: '',
            position: '-',
            prev: '',
            confirm: false,
            isOtp: false,
            isSend: false,
            time: {},
            seconds: resendTime,
            findSponsor: '',
            sponsorship: 'me',
            bank_data: [],
            bank_name: '',
            bank_no: '',
            temp_sponsor: '-',
            temp_sponsor_name: '-',
            temp_sponsor_picture: '-',
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
        if (this.props.auth.user_otp !== undefined) {
            this.setState({ otp_val: this.props.auth.user_otp.otp_anying })
        }
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
    getProps(param) {
        if (this.state.sponsorship === 'me') {
            this.setState({
                sponsor: this.props.dataSponsor !== undefined ? this.props.dataSponsor.id : '',
                sponsor_name: this.props.dataSponsor !== undefined ? this.props.dataSponsor.name : '',
                sponsor_picture: this.props.dataSponsor !== undefined ? this.props.dataSponsor.picture : '',
                upline: this.props.dataUpline === undefined ? '' : this.props.dataUpline.id,
                upline_name: this.props.dataUpline === undefined ? '' : this.props.dataUpline.name,
                upline_picture: this.props.dataUpline === undefined ? '' : this.props.dataUpline.picture,
                position: this.props.posisi,
            })
        }
    }
    componentWillMount() {
        this.getProps(this.props);
        this.props.getBankData()
    }
    componentWillReceiveProps(nextProps) {
        this.getProps(nextProps);
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.getProps(this.props)
        }
    }
    handleLevel(val) {
        let err = Object.assign({}, this.state.error, { level: "" });
        this.setState({
            level: val.value,
            error: err
        });
    }
    handleChange = (event) => {

        if (event.target.name === 'pin') {
            if (event.target.value.length >= 0 && event.target.value.length <= 6) {
                this.setState({ [event.target.name]: event.target.value });
            } else {
                ToastQ.fire({ icon: 'error', title: `PIN harus 6 digit angka!` });
            }

        } else {
            this.setState({ [event.target.name]: event.target.value });
            let err = Object.assign({}, this.state.error, { [event.target.name]: "" });
            this.setState({ error: err });
        }

    };
    HandleChangeBank(bk) {
        this.setState({ bank_name: bk.label })
        let err = Object.assign({}, this.state.error, { bank_name: "" });
        this.setState({ error: err });
    }
    showPin(e, param) {
        e.preventDefault()
        this.setState({ [param]: !this.state[param] })
    }
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
            let parseData = {
                full_name: this.state.full_name,
                mobile_no: this.state.mobile_no,
                bank_no: this.state.bank_no,
                bank_name: this.state.bank_name,
                id_card: this.state.id_card,
                pin: this.state.pin,
                pin_re: this.state.pin_re,
                picture: this.state.picture,
                position: this.state.position,
                device_id: this.state.device_id,
                signup_source: this.state.signup_source,
                sponsor: this.state.sponsor,
                upline: this.state.upline,
                pin_regist: this.state.pin_regist.id,
            };
            let err = this.state.error;

            if (parseData.full_name === '' || parseData.full_name === undefined) {
                ToastQ.fire({
                    icon: 'error',
                    title: `Nama lengkap tidak boleh kosong!`
                });
            } else if (parseData.mobile_no === '' || parseData.mobile_no === undefined) {
                ToastQ.fire({
                    icon: 'error',
                    title: `No. Telp tidak boleh kosong!`
                });
            } else if (parseData.pin === '' || parseData.pin === undefined) {
                ToastQ.fire({
                    icon: 'error',
                    title: `PIN tidak boleh kosong!`
                });

            } else if (parseData.pin.length > 6 || parseData.pin.length < 6) {
                ToastQ.fire({
                    icon: 'error',
                    title: `PIN harus 6 digit angka!`
                });
            } else if (isNaN(String(parseData.pin).replace(/[0-9]/g, ''))) {
                ToastQ.fire({
                    icon: 'error',
                    title: `PIN harus berupa digit angka!`
                });
            } else if (parseData.pin_re === '' || parseData.pin_re === undefined) {
                ToastQ.fire({
                    icon: 'error',
                    title: `PIN tidak boleh kosong!`
                });
            } else if (parseData.pin_re.length > 6 || parseData.pin_re.length < 6) {
                ToastQ.fire({
                    icon: 'error',
                    title: `PIN harus 6 digit angka!`
                });
            } else if (parseData.pin_re !== parseData.pin) {
                ToastQ.fire({
                    icon: 'error',
                    title: `PIN tidak sesuai!`
                });
            } else if (parseData.bank_name === '' || parseData.bank_name === undefined) {
                ToastQ.fire({
                    icon: 'error',
                    title: `Bank belum dipilih!`
                });
            } else if (parseData.bank_no === '' || parseData.bank_no === undefined) {
                ToastQ.fire({
                    icon: 'error',
                    title: `Data No Rekening tidak boleh kosong!`
                });
            } else if (isNaN(String(parseData.bank_no).replace(/[0-9]/g, ''))) {
                ToastQ.fire({
                    icon: 'error',
                    title: `Data No Rekening harus berupa digit angka!`
                });
            }
            else if (parseData['pin_regist'] === '' || parseData['pin_regist'] === undefined) {
                err = Object.assign({}, err, { pin_regist: "Membership belum dipilih atau pilihan tidak sesuai dengan jumlah PIN yang anda miliki!" });
                this.setState({ confirm: false, error: err });
            }
            else {
                this.setState({ confirm: !this.state.confirm })
            }
        }
    };

    handleSubmit(e) {
        e.preventDefault();
        let parseData = {
            full_name: this.state.full_name,
            mobile_no: this.state.mobile_no,
            bank: { 'bank_name': this.state.bank_name, 'acc_no': this.state.bank_no, 'acc_name': this.state.full_name },
            id_card: this.state.id_card,
            pin: this.state.pin,
            picture: this.state.picture,
            position: this.state.position,
            device_id: this.state.device_id,
            signup_source: this.state.signup_source,
            sponsor: this.state.sponsor,
            upline: this.state.upline,
            pin_regist: this.state.pin_regist.id,
        };

        if (parseData.full_name === '' || parseData.full_name === undefined) {
            ToastQ.fire({ icon: 'error', title: `Nama lengkap tidak boleh kosong!` });
        }
        else if (parseData.mobile_no === '' || parseData.mobile_no === undefined) {
            ToastQ.fire({ icon: 'error', title: `No. Telp tidak boleh kosong!` });
        } else if (parseData.acc_no === '' || parseData.acc_no === undefined) {
            ToastQ.fire({
                icon: 'error',
                title: `Data Rekening tidak boleh kosong!`
            });
        } else if (isNaN(String(parseData.acc_no).replace(/[0-9]/g, ''))) {
            ToastQ.fire({
                icon: 'error',
                title: `Data Rekening harus berupa digit angka!`
            });
        }
        else if (parseData.pin === '' || parseData.pin === undefined) {
            ToastQ.fire({ icon: 'error', title: `PIN tidak boleh kosong!` });
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
                    this.props.createMemberWebView(parseData);
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

    render() {

        return (
            !this.props.isLoadingAuth ?
                !this.props.registered ?
                    <form className='container' onSubmit={this.handleSubmit}>
                        <div className={`row ${!this.state.confirm ? '' : 'd-none'}`} style={{ padding: '20px' }}>
                            <br />
                            <div className="col-12 col-md-6 offset-md-3">
                                <div className="form-group">
                                    <label className='text-dark'>Nama Lengkap</label>
                                    <input type="text" className="form-control form-control-lg" name="full_name" value={this.state.full_name} onChange={this.handleChange} />
                                    <div className="invalid-feedback" style={this.state.error.full_name !== "" ? { display: 'block' } : { display: 'none' }}>
                                        {this.state.error.full_name}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className='text-dark'>No. Telp.</label>
                                    {String(this.state.time.m) + String(this.state.time.s) !== '00' && this.state.time.m !== undefined ?
                                        <h5 className="text-center text-danger">Kirim ulang kode aktivasi dalam {this.state.time.m + ":" + this.state.time.s}</h5>
                                        :
                                        <div className="row">
                                            <div className="col-8 col-md-8">
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
                                            <div className="col-4 col-md-4">
                                                <button type="button" className={`btn btn-${this.state.isOtp ? 'success' : 'primary'} btn-block`} onClick={(e) => this.handleOtp(e)} disabled={this.state.isOtp} style={{ padding: '11px' }} >{this.state.isOtp ? 'Terverifikasi' : 'Verifikasi'}</button>
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
                                                    <label className='text-dark'>Kode Aktivasi</label>
                                                    <div className="input-group input-group-md">
                                                        <input
                                                            type="tel"
                                                            pattern="\d*"
                                                            maxLength="6"
                                                            className="form-control form-control-md"
                                                            name="otp_val"
                                                            value={this.state.otp_val}
                                                            onInput={this.handleChange} />
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
                                            <button type="button" className={`btn${this.state.sponsorship === 'me' ? '-danger' : '-secondary'} btn-block p-2`} disabled={this.state.sponsorship === 'me'} onClick={(e) => this.handleSponsor(e, 'me')}>Saya sebagai Sponsor</button>
                                        </div>
                                        <div className="col-6">
                                            <button type="button" className={`btn${this.state.sponsorship === 'their' ? '-danger' : '-secondary'} btn-block p-2`} disabled={this.state.sponsorship === 'their'} onClick={(e) => this.handleSponsor(e, 'their')}>Orang lain sebagai Sponsor</button>
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
                                <div className="col-md-10 offset-md-1">
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="form-group">
                                                <label className='text-dark'>Sponsor</label>
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
                                                <label className='text-dark'>Upline</label>
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
                                    <label className='text-dark'>Position</label>
                                    <input type="text" className="form-control form-control-lg" name="position" value={String(this.state.position).toUpperCase()} onChange={this.handleChange} readOnly />
                                    <div className="invalid-feedback" style={this.state.error.position !== "" ? { display: 'block' } : { display: 'none' }}>
                                        {this.state.error.position}
                                    </div>
                                </div>

                                <div className="form-group" style={{ display: this.state.isOtp ? '' : 'none' }}>
                                    <div className="d-md-flex justify-content-between align-items-center d-none">
                                        <label className='text-dark'>Pilih Membership</label>
                                    </div>
                                    <div className="text-left d-block d-md-none">
                                        <br />
                                        <label className='text-dark'>Pilih Membership</label>
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
                                    <div className="form-group">
                                        <label className='text-dark'>Buat PIN</label>
                                        <div className="input-group mb-3">
                                            <input
                                                type={this.state.showPin ? "text" : "password"}
                                                maxLength="6"
                                                className="form-control form-control-lg"
                                                name="pin"
                                                value={this.state.pin}
                                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                                onChange={this.handleChange} />
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-outline-dark" onClick={(e) => this.showPin(e, 'showPin')}><i className={`zmdi zmdi-eye${this.state.showPin ? '' : '-off'}`}></i></button>
                                            </div>
                                        </div>
                                        <small id="passwordHelpBlock" className="form-text text-muted">
                                            Silahkan buatkan PIN untuk downline anda, PIN ini akan dipakai ketika downline anda akan login untuk pertama kali.
                                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label className='text-dark'>Ulangi PIN</label>
                                        <div className="input-group mb-3">
                                            <input
                                                type={this.state.showPinRe ? "text" : "password"}
                                                maxLength="6"
                                                className="form-control form-control-lg"
                                                name="pin_re"
                                                value={this.state.pin_re}
                                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                                onChange={this.handleChange} />
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-outline-dark" onClick={(e) => this.showPin(e, 'showPinRe')}><i className={`zmdi zmdi-eye${this.state.showPinRe ? '' : '-off'}`}></i></button>
                                            </div>
                                        </div>
                                        <small id="passwordHelpBlock" className="form-text text-muted">
                                            Silahkan samakan PIN dengan PIN yang sudah anda ketik sebelumnya.
                                                        </small>
                                    </div>

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
                                </div>
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
                                                <tr>
                                                    <th className="text-left" scope="row">Nama Bank</th>
                                                    <th className="text-left" scope="row">: {this.state.bank_name}</th>
                                                </tr>
                                                <tr>
                                                    <th className="text-left" scope="row">No Rekening Bank</th>
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
                                </Card>
                            </div>
                        </div>
                        <div className="form-group mt-2" style={{ textAlign: "right" }}>
                            <a className="btn btn-danger mb-2 mr-2" href={`/web_view/binary/${this.props.raw_token}`}> Kembali ke genealogy</a>

                            <button type="button" className={`btn btn-warning mb-2 mr-2 ${this.state.confirm ? '' : 'd-none'}`} id='back' onClick={this.toggle}><i className="ti-close" />Sebelumnya</button>
                            <button type="button" className={`btn btn-primary mb-2 mr-2 ${!this.state.confirm ? '' : 'd-none'}`} onClick={this.toggle} disabled={!this.state.isOtp} ><i className="ti-close" /> Selanjutnya</button>
                            <button type="submit" className={`btn btn-primary mb-2 mr-2 ${this.state.confirm ? '' : 'd-none'}`} ><i className="ti-save" /> Daftarkan</button>
                        </div>
                    </form>
                    :
                    <div>
                        <Card className="box-margin">
                            <CardHeader className="bg-transparent"><h4 className='text-dark'>Detail Pendaftaran</h4></CardHeader>
                            <CardBody>
                                <Table striped>
                                    <thead className="bg-transparent" style={{ visibility: 'collapse' }}>
                                        <tr>
                                            <th className="text-left text-light w-50"></th>
                                            <th className="text-left text-dark w-50"><h5 className='text-dark'>Detail</h5></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="text-left text-dark" scope="row">Nama Lengkap</th>
                                            <th className="text-left text-dark" scope="row">: {this.state.full_name}</th>
                                        </tr>
                                        <tr>
                                            <th className="text-left text-dark" scope="row">No. Telpon</th>
                                            <th className="text-left text-dark" scope="row">: {this.state.mobile_no}</th>
                                        </tr>
                                        <tr>
                                            <th className="text-left text-dark" scope="row">Nama Bank</th>
                                            <th className="text-left text-dark" scope="row">: {this.state.bank_name}</th>
                                        </tr>
                                        <tr>
                                            <th className="text-left text-dark" scope="row">No Rekening Bank</th>
                                            <th className="text-left text-dark" scope="row">: {this.state.bank_no}</th>
                                        </tr>
                                        <tr>
                                            <th className="text-left text-dark" scope="row">Sponsor</th>
                                            <th className="text-left text-dark" scope="row">: {this.state.sponsor}</th>
                                        </tr>
                                        <tr>
                                            <th className="text-left text-dark" scope="row">Upline</th>
                                            <th className="text-left text-dark" scope="row">: {this.state.upline}</th>
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
                                    <h5 className='text-dark'>Untuk pengguna yang telah berhasil di daftarkan, harap diarahkan untuk proses masuk sistem dengan menggunakan no telpon yang baru saja didaftarkan!</h5>
                                    <p>No Telpon : {this.state.mobile_no}</p>
                                </div>
                            </CardBody>
                            <CardFooter className="bg-transparent">
                                <a className="btn btn-primary mr-1" href={`/web_view/binary/${this.props.raw_token}`}> Kembali ke genealogy</a>

                                {/* <Link to="/" className="btn btn-primary">Ke Halaman Utama</Link> */}
                            </CardFooter>
                        </Card>
                    </div>
                : <Preloader />
        );
    }
}

MemberForm.propTypes = {
    sendOtp: PropTypes.func.isRequired,
    FetchDetailPinWebView: PropTypes.func.isRequired,
    createMemberWebView: PropTypes.func.isRequired,
    getBankData: PropTypes.func.isRequired,
    errors: PropTypes.object
}

const mapStateToProps = (state) => {

    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        pinList: state.pinReducer.data_detail,
        isLoading: state.pinReducer.isLoading,
        isLoadingAuth: state.auth.isLoading,
        registered: state.auth.isRegistered,
        auth: state.auth,
        isLoadingAvail: state.memberReducer.isLoadingAvail,
        memberAvail: state.memberReducer.data_avail,
        isLoadingData: state.bankReducer.isLoadingData,
        resBank: state.bankReducer.data_bank,
        // Level:state.userLevelReducer.data,
    }
}
export default withRouter(connect(mapStateToProps, { sendOtp, FetchDetailPinWebView, createMemberWebView, FetchAvailableMember, getBankData })(MemberForm));
