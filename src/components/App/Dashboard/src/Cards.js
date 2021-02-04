import React, {Component} from 'react'
import {HEADERS} from 'redux/actions/_constants'

class Cards extends Component {
    render(){
        return(
            <div className={this.props.className===undefined?'col-md-6 col-xl-6 box-margin':this.props.className}>
                <div className="card">
                    <div className="card-body" style={{padding:'10px', cursor:'pointer', textAlign:'center'}} onClick={(e)=>this.wallet_redirect(e,'deposit')}>
                        <div className="row">
                            <div className="col-12">
                                <h5><img src={HEADERS.URL+"/icon/Icon_Utama_TopUp.svg"} className="img-circle" alt="" style={{height: '100px', width: '100px', objectFit: 'contain'}} />
                                </h5>
                                <p className="mb-0" style={{fontSize:'1em'}}>Deposit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards;