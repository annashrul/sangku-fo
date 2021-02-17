import React, {Component} from 'react'
import {noImage} from "helper";
import DashboardReward from '../../modals/dashboard/dashboard_redeem';
import { ModalToggle, ModalType } from '../../../../redux/actions/modal.action';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

class Overview extends Component {
    constructor(props){
        super(props);
        this.state={
            detail:"",
        };
        this.toggleReward   = this.toggleReward.bind(this);
    }
    toggleReward(e,id){
        // e.preventDefault()
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("dashboardReward"));
        this.setState({
            detail:{id:id}
        })
    }
    render(){
        const blur = {
            WebkitFilter: 'blur(5px)',
            cursor:'no-drop',
            userSelect:'none'
        }
        let rewardBool = false
        rewardBool = this.props.reward.is_claimed||this.props.reward_kanan===this.props.reward_kiri
        return(
            <div>
                <div className="card h-100 box-margin">
                    {/* <div className="card-header bg-transparent border-bottom-0 h3">Overview</div> */}
                    <div className="card-body" style={{padding:'2.2rem'}}>
                        <div className="justify-content-between">
                            <div className="user-profile-heading" style={{textAlign:'center'}}>
                                <div className="profile-img">
                                    <img style={{borderRadius:'50%',width:'100px'}} src={this.props.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}}  alt=""/>
                                </div>
                                <div className="profile-text" style={{marginTop:'4px'}}>
                                    <div style={{fontSize:'1.5em'}}>{this.props.user}</div>
                                    <div style={{fontSize:'.9em'}}>{this.props.jenjang_karir}</div>
                                    <div style={{fontSize:'.8em',marginTop:'5px'}}>{this.props.uid}</div>
                                </div>
                            </div>
                            <a href='/profile' className="btn btn-primary btn-sm text-light m-3 p-2" style={{cursor:'pointer',width:'90%',marginTop:"10px"}}><i class="fa fa-user"></i> Lihat Profil</a>
                        </div>
                        <div className="row justify-content-between">
                                    <div className="col-md-6" style={{borderRight:'2px solid gray'}}>
                                        <div className="row mr-2">
                                            <div className="col-md-5" style={{paddingRight:0}}>
                                            <img src={this.props.membership_badge} width="100%"/>
                                            </div>
                                            <div className="col-md-7 pl-2 pr-0">
                                                <div style={{marginTop:'5px'}}>{this.props.membership}</div>
                                                <div style={{fontSize:'.7em',color:'gray',fontWeight:'bold'}}>Status Terkini.</div>
                                                <a href={() => false} className="badge badge-primary badge-sm text-light" style={{cursor:'pointer',padding:'4px',fontSize:'.8em'}} onClick={(e)=>this.props.handleModal(e)}><i class="fa fa-refresh fa-spin"></i> Re-aktivasi</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row mr-2">
                                            <div className="col-md-5" style={{paddingRight:0}}>
                                            <img src={this.props.jenjang_karir_badge} width="100%"/>
                                            </div>
                                            <div className="col-md-7 pl-2 pr-0">
                                                <div style={{marginTop:'5px'}}>{this.props.jenjang_karir}</div>
                                                <div style={{fontSize:'.7em',color:'gray',fontWeight:'bold'}}>Karir terkini.</div>
                                                <div style={{fontSize:'.8em',color:'black',fontWeight:'light'}}>Poin : {this.props.reward_kiri} | {this.props.reward_kanan}</div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                </div>
                <div className="card h-100">
                    <div id="overlay"></div>
                    <div className="card-body" style={rewardBool?null:blur}>
                    {/* <div className="card-body" style={{padding:'22px'}}> */}
                        <div className="row">
                        <div className="w-100 h-100 bg-transparent" style={{position:'absolute',top:'0',left:'0',zIndex:'1', display:rewardBool?'none':''}}/>
                            <div className="col-md-4" style={{height:'100px'}}>
                                <img style={{width:'100%',height:'100%',objectFit:'contain'}} src={this.props.reward.gambar}/>
                            </div>
                            <div className="col-md-8">
                                <h5>
                                    {this.props.reward.title}
                                </h5>
                                <p className="title-widget-team mb-0">{this.props.reward.caption}</p>
                                <a href={() => {return null}} className='badge badge-info cursor-pointer text-white' onClick={(e)=>this.toggleReward(e,this.props.reward.id)}>Klaim Hadiah</a>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.isOpen?<DashboardReward dashboard={this.state.detail}/>:null
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