import React, { Component } from 'react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';

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
                                <h5 className="mb-1">{this.props.isLoading?<Skeleton width='80px'/>:moment(this.props.created_at).format('HH:MM')}</h5>
                                <p className="mb-0 text-muted">
                                {this.props.isLoading?<Skeleton width='50px'/>:moment(this.props.created_at).format('YYYY-DD-MM')}
                                </p>
                            </div>
                            <div className="media-body text-left" style={{marginLeft:'20px'}}>
                                <p className="mb-2 text-mute">{this.props.isLoading?<Skeleton width='350px'/>:this.props.note}</p>
                                <h6 className="mb-1 text-black">{this.props.isLoading?<Skeleton width='200px'/>:this.props.kd_trx}</h6>
                            </div>
                            <div className="media-body text-left ml-1" style={{maxWidth:'200px',minWidth:'200px'}}>
                                <h6 className="mb-1 text-success">+ {this.props.isLoading?<Skeleton width='100px'/>:this.props.amount_in}</h6>
                                <p className="mb-0 text-danger">
                                - {this.props.isLoading?<Skeleton width='100px'/>:this.props.amount_out}
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