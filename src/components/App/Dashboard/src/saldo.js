import React, {Component} from 'react'
import {toRp} from "helper";
import {HEADERS} from 'redux/actions/_constants'
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';

class Overview extends Component {
    constructor(props){
        super(props);
        this.wallet_redirect=this.wallet_redirect.bind(this)
    }

    wallet_redirect(e,url){
        e.preventDefault();
        this.props.history.push({pathname: '/'+url,state: {from: this.props.location.pathname}});
    }
    render(){
        return(
            <div className="card h-100">
                <div className="card-header heading-footer" style={{background:`url('https://image.freepik.com/free-vector/abstract-futuristic-purple-background-with-shiny-lines_23-2148392375.jpg')`,backgroundSize:'cover'}}>
                    <h6>SangQu Pay</h6>
                </div>
                <div className="card-block text-center">
                    <div className="panel-profile-img">{
                        <h1><small>Rp</small> {toRp(this.props.saldo)}</h1>
                    }
                    </div>
                    <div className="saldo-aktif-title">
                        <h1>Saldo Aktif</h1>
                    </div>
                    <div className="content-widget-dashboard" style={{marginBottom:'30px'}}>
                        <div className="row mt-3 mb-4">
                            <div className='col-md-6 col-6'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px', cursor:'pointer'}} onClick={(e)=>this.wallet_redirect(e,'deposit')}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5><img src={HEADERS.URL+"/icon/Icon_Utama_TopUp.svg"} className="img-circle" alt="" style={{height: '30px', width: '30px', objectFit: 'contain'}} />
                                                </h5>
                                                <p className="title-widget-team mb-0">Deposit</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='col-md-4 col-4'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px', cursor:'pointer'}} onClick={(e)=>this.wallet_redirect(e,'transfer')}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5><img src={HEADERS.URL+"/icon/Icon_Utama_TopUp.svg"} className="img-circle " alt="" style={{height: '30px', width: '30px', objectFit: 'contain'}} />
                                                </h5>
                                                <p className="title-widget-team mb-0">Transfer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className='col-md-6 col-6'>
                                <div className="card">
                                    <div className="card-body" style={{padding:'10px', cursor:'pointer'}} onClick={(e)=>this.wallet_redirect(e,'penarikan')}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h5><img src={HEADERS.URL+"/icon/Icon_Utama_TopUp.svg"} className="img-circle " alt="" style={{height: '30px', width: '30px', objectFit: 'contain'}} />
                                                </h5>
                                                <p className="title-widget-team mb-0">Withdraw</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <ul className="positions text-dark">
                        <li className="pos-card" id="pos_1">
                            <div className="content"> 
                                <div className="title d-inline-block">
                                <img src={HEADERS.URL+"/icon/Icon_Utama_TopUp.svg"} className="img-circle mr-2 ml-1" alt="" style={{height: '30px', width: '30px', objectFit: 'contain'}} />
                                <div className="content-title">
                                    <h1>Bonus diterima</h1> <h6>Total komisi dan bonus anda</h6></div>
                                </div>
                                <div className="amount"><small>Rp</small> {toRp(this.props.saldo_bonus)}</div>
                            </div>
                        </li>
                        <li className="pos-card" id="pos_1">
                            <div className="content"> 
                                <div className="title d-inline-block">
                                <img src={HEADERS.URL+"/icon/Icon_Utama_TopUp.svg"} className="img-circle mr-2 ml-1" alt="" style={{height: '30px', width: '30px', objectFit: 'contain'}} />
                                <div className="content-title">
                                    <h1>Bonus Sponsor</h1> <h6>Total bonus dari member yang anda sponsori</h6></div>
                                </div>
                                <div className="amount"><small>Rp</small> {toRp(this.props.bonus_sponsor)}</div>
                            </div>
                        </li>
                        <li className="pos-card" id="pos_1">
                            <div className="content"> 
                                <div className="title d-inline-block">
                                <img src={HEADERS.URL+"/icon/Icon_Utama_TopUp.svg"} className="img-circle mr-2 ml-1" alt="" style={{height: '30px', width: '30px', objectFit: 'contain'}} />
                                <div className="content-title">
                                    <h1>Total Withdrawal</h1> <h6>Total penarikan bonus.</h6></div>
                                </div>
                                <div className="amount"><small>Rp</small> {toRp(this.props.withdrawal)}</div>
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(connect()(Overview));