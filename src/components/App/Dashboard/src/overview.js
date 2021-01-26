import React, {Component} from 'react'
import {noImage} from "helper";

class Overview extends Component {
    render(){
        return(
            <div className="card">
                {/* <div className="card-header bg-transparent border-bottom-0 h3">Overview</div> */}
                <div className="card-body">
                    <div className="justify-content-between">
                        <div className="user-profile-heading" style={{textAlign:'center'}}>
                            <div className="profile-img">
                                <img style={{borderRadius:'50%',width:'100px'}} src={this.props.user.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}}  alt=""/>
                            </div>
                            <div className="profile-text" style={{marginTop:'4px'}}>
                                <div style={{fontSize:'1.5em'}}>{this.props.user.full_name}</div>
                                <div style={{fontSize:'.9em'}}>Member</div>
                                <div style={{fontSize:'.8em',marginTop:'5px'}}>{this.props.user.referral_code}</div>
                            </div>
                        </div>
                        <a href={() => false} className="btn btn-primary btn-sm text-light m-3 p-2" style={{cursor:'pointer',width:'90%',marginTop:"10px"}} onClick={(e)=>this.handleModal(e)}><i class="fa fa-user"></i> Lihat Profil</a>

                    </div>
                    <div className="row justify-content-between">
                                <div className="col-md-6" style={{borderRight:'2px solid gray'}}>
                                    <div className="row mr-2">
                                        <div className="col-md-5" style={{paddingRight:0}}>
                                        <img src="http://ptnetindo.com:6694/badge/silver.png" width="100%"/>
                                        </div>
                                        <div className="col-md-7 pl-2 pr-0">
                                            <div style={{marginTop:'5px'}}>Silver</div>
                                            <div style={{fontSize:'.7em',color:'gray',fontWeight:'bold'}}>Status Terkini.</div>
                                            <a href={() => false} className="badge badge-primary badge-sm text-light" style={{cursor:'pointer',padding:'4px',fontSize:'.8em'}} onClick={(e)=>this.handleModal(e)}><i class="fa fa-refresh fa-spin"></i> Re-aktivasi</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row mr-2">
                                        <div className="col-md-5" style={{paddingRight:0}}>
                                        <img src="http://ptnetindo.com:6694/badge/silver.png" width="100%"/>
                                        </div>
                                        <div className="col-md-7 pl-2 pr-0">
                                            <div style={{marginTop:'5px'}}>Member</div>
                                            <div style={{fontSize:'.7em',color:'gray',fontWeight:'bold'}}>Karir terkini.</div>
                                            <div style={{fontSize:'.8em',color:'black',fontWeight:'light'}}>Poin : 50:50</div>
                                            {/* <a href={() => false} className="badge badge-primary badge-sm text-light" style={{cursor:'pointer',padding:'4px',fontSize:'.8em'}} onClick={(e)=>this.handleModal(e)}><i class="fa fa-refresh fa-spin"></i> Re-aktivasi</a> */}
                                        </div>
                                    </div>
                                </div>

                            {/* <div className="row" style={{marginTop:'15px'}}>
                                <div className="col-md-4 pr-0">
                                    <h6 style={{fontSize:'1em',color:'gray'}}>Saldo Utama</h6>
                                    <h5>Rp 13.000.000</h5>
                                </div>
                                <div className="col-md-4 pr-0">
                                    <h6 style={{fontSize:'1em',color:'gray'}}>Poin RO</h6>
                                    <h5>10.000 Poin</h5>
                                </div>
                            </div>
                            <div className="row" style={{marginTop:'15px'}}>
                                <div className="col-md-4 pr-0">
                                    <h6 style={{fontSize:'1em',color:'gray'}}>SangQuota</h6>
                                    <h5>Rp 13.000.000</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className = "row pr-0" >
                                        <div className="col-md-6 pr-0">
                                            <h6 style={{fontSize:'1em',color:'gray'}}>Reward Kiri</h6>
                                            <h5>1234</h5>
                                        </div>
                                        <div className="col-md-6 pr-0">
                                            <h6 style={{fontSize:'1em',color:'gray'}}>Reward Kanan</h6>
                                            <h5>1234</h5>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
            </div>
        )
    }
}

export default Overview;