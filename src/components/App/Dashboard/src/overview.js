import React, { Component } from 'react'
import { noImage } from "helper";
import DashboardReward from '../../modals/dashboard/dashboard_redeem';
import { ModalToggle, ModalType } from '../../../../redux/actions/modal.action';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { putMember } from '../../../../redux/actions/member/member.action';
import Swal from 'sweetalert2';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: "",
            autoWd: this.props.auto_wd === 1 ? true : false,
        };
        this.toggleReward = this.toggleReward.bind(this);
        this.handleAutoWd = this.handleAutoWd.bind(this);
        // this.handleModal   = this.handleModal.bind(this);
    }
    toggleReward(e, id) {
        // e.preventDefault()
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("dashboardReward"));
        this.setState({
            detail: { id: id, reward: this.props.reward, jenjang_karir: this.props.jenjang_karir }
        })
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.auto_wd!==this.props.auto_wd){
    //         this.setState({
    //             autoWd:this.props.auto_wd===1?true:false
    //         })
    //     }
    // }
    handleAutoWd(e) {
        // e.preventDefault();
        Swal.fire({
            title: 'Informasi!',
            text: this.state.autoWd ? 'Matikan Auto WD?' : 'Nyalakan Auto WD',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Proses',
            cancelButtonText: 'Batal'
        }).then(function (result) {
            if (result.value) {
                this.props.dispatch(putMember({ auto_wd: this.state.autoWd ? 0 : 1 }, this.props.auth.user.id))
                this.setState({
                    autoWd: !this.state.autoWd
                })
            }
        }.bind(this))
    }
    // handleModal(e,data){
    //     e.preventDefault()
    //     // this.setState({pin_reaktivasi:data})
    //     const bool = !this.props.isOpen;
    //     this.props.dispatch(ModalToggle(bool));
    //     this.props.dispatch(ModalType(""));
    // }
    render() {
        const blur = {
            WebkitFilter: 'blur(5px)',
            cursor: 'not-allowed',
            userSelect: 'none'
        }
        let rewardBool = !this.props.reward.is_claimed && this.props.reward.id !== '-';
        return (
            <div className="h-100 box-margin">
                <div className="card h-100 box-margin">
                    {/* <div className="card-header bg-transparent border-bottom-0 h3">Overview</div> */}
                    <div className="card-body" style={{ padding: '2.2rem' }}>
                        <div className="justify-content-between">
                            <div className="user-profile-heading" style={{ textAlign: 'center' }}>
                                <div className="profile-img">
                                    <img style={{ borderRadius: '50%', width: '100px' }} src={this.props.picture} onError={(e) => { e.target.onerror = null; e.target.src = `${noImage()}` }} alt="" />
                                </div>
                                <div className="profile-text" style={{ marginTop: '4px' }}>
                                    <div style={{ fontSize: '1.5em' }}>{this.props.user}</div>
                                    {/* <div style={{fontSize:'.9em'}}>{this.props.jenjang_karir}</div> */}
                                    <div style={{ fontSize: '.8em', marginTop: '5px' }}>{this.props.is_stockist}</div>
                                </div>
                            </div>
                            <a href='/profile' className="btn btn-primary btn-sm text-light m-3 p-2" style={{ cursor: 'pointer', width: '90%', marginTop: "10px" }}><i className="fa fa-user"></i> Lihat Profil</a>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col-md-6 col-6" style={{ borderRight: '2px solid gray' }}>
                                <div className="row mr-2">
                                    <div className="col-md-5 col-5" style={{ paddingRight: 0 }}>
                                        <img src={this.props.membership_badge} alt="sangqu" width="100%" />
                                    </div>
                                    <div className="col-md-7 col-7 pl-2 pr-0">
                                        <div style={{ marginTop: '5px' }}>{this.props.membership}</div>
                                        <div style={{ fontSize: '.7em', color: 'gray', fontWeight: 'bold' }}>Status Terkini.</div>
                                        <a href={() => false} className="badge badge-primary badge-sm text-light" style={{ cursor: 'pointer', padding: '4px', fontSize: '.8em' }} onClick={(e) => this.props.handleModal(e)}><i className="fa fa-refresh fa-spin"></i> Re-aktivasi</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-6">
                                <div className="row mr-2">
                                    <div className="col-md-5 col-5" style={{ paddingRight: 0 }}>
                                        <img src={this.props.jenjang_karir_badge} alt="sangqu" width="100%" />
                                    </div>
                                    <div className="col-md-7 col-7 pl-2 pr-0">
                                        <div style={{ marginTop: '5px' }}>{this.props.jenjang_karir}</div>
                                        <div style={{ fontSize: '.7em', color: 'gray', fontWeight: 'bold' }}>Poin reward.</div>
                                        <div style={{ fontSize: '.8em', color: 'black', fontWeight: 'light' }}>Poin : {this.props.reward_kiri} | {this.props.reward_kanan}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="card h-100 box-margin">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center p-1">
                            <p className="p-0 m-0">AUTO WITHDRAW</p>
                            <div className="new-checkbox">
                                <div className="d-flex justify-content-start align-items-center" >
                                    <label className="switch m-0">
                                        <input type="checkbox" checked={this.state.autoWd} onChange={(e)=>this.handleAutoWd(e)}/>
                                        <span className="slider rounded-lg"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="card" style={{ display: rewardBool ? '' : 'none', zIndex: 1, bottom: '245px' }}>
                    <div className="card-body" style={rewardBool ? null : blur}>
                        {/* <div className="card-body" style={{padding:'22px'}}> */}
                        <div className="row">
                            <div className="w-100 h-100 bg-transparent" style={{ position: 'absolute', top: '0', left: '0', zIndex: '1', display: rewardBool ? 'none' : '' }} />
                            <div className="col-md-4 col-4" style={{ height: '100px' }}>
                                <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="sangqu" src={this.props.reward.gambar} />
                            </div>
                            <div className="col-md-8 col-8">
                                <h5>
                                    {this.props.reward.title}
                                </h5>
                                <p className="title-widget-team mb-0">{this.props.reward.caption}</p>
                                <a href={() => { return null }} className='badge badge-info cursor-pointer text-white' onClick={(e) => this.toggleReward(e, this.props.reward.id)}>Klaim Hadiah</a>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.detail !== "" && this.props.isOpen ? <DashboardReward dashboard={this.state.detail} /> : null
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        isOpen: state.modalReducer,
    }
}


export default withRouter(connect(mapStateToProps)(Overview));