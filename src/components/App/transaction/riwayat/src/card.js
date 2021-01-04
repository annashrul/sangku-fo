import React, { Component } from 'react';
import moment from 'moment';
class Card extends Component{
    constructor(props){
        super(props);
    }

    render(){

        return(
            <div className='col-md-12 col-sm-12 col-lg-12'>
                <div className="card rounded mb-2" style={{borderLeft:'8px solid #333'}}>
                    <div className="card-body p-3">
                        <div className="media">
                            <div className="media-body text-center mr-2" style={{maxWidth:'100px',minWidth:'100px'}}>
                                <h5 className="mb-1">{moment(this.props.created_at).format('HH:MM')}</h5>
                                <p className="mb-0 text-muted">
                                {moment(this.props.created_at).format('YYYY-DD-MM')}
                                </p>
                            </div>
                            <div className="media-body text-left" style={{marginLeft:'20px'}}>
                                <p className="mb-2 text-mute">{this.props.note}</p>
                                <h6 className="mb-1 text-black">{this.props.kd_trx}</h6>
                            </div>
                            <div className="media-body text-left ml-1" style={{maxWidth:'200px',minWidth:'200px'}}>
                                <h6 className="mb-1 text-success">+ {this.props.amount_in}</h6>
                                <p className="mb-0 text-danger">
                                - {this.props.amount_out}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Card;