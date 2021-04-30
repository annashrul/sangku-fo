import React, { Component } from 'react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';

class Card extends Component{
    render(){

        return(
            // <div className='col-md-12 col-sm-12 col-lg-12'>
                <div className="card bg-white shadow-sm border-bottom mb-2">
                    <div className="card-body p-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-1 text-black">{this.props.isLoading?<Skeleton width='200px'/>:this.props.jenis_transaksi+" - "+this.props.paket}</h6>
                            <div className="d-flex align-items-end">
                                <h5 className="mb-0 mr-1">{this.props.isLoading?<Skeleton width='80px'/>:this.props.jenis_pin}</h5>
                                <small className="mb-0 text-muted">
                                {this.props.isLoading?<Skeleton width='50px'/>:moment(this.props.created_at).format('YYYY-DD-MM')}
                                </small>
                            </div>
                        </div>
                        <hr className="mb-1 mt-1"/>
                        <div className="d-flex justify-content-between">
                            {/* <div className="media-body text-center mr-2" style={{maxWidth:'100px',minWidth:'100px'}}>
                                <h5 className="mb-1">{this.props.isLoading?<Skeleton width='80px'/>:moment(this.props.created_at).format('HH:MM')}</h5>
                                <p className="mb-0 text-muted">
                                {this.props.isLoading?<Skeleton width='50px'/>:moment(this.props.created_at).format('YYYY-DD-MM')}
                                </p>
                            </div> */}
                            <div className="text-left w-75">
                                <p className="mb-2 text-mute">{this.props.isLoading?<Skeleton width='350px'/>:this.props.note}</p>
                            </div>
                            <div className="text-center ml-1 w-25">
                                <h6 className="mb-1 text-muted">Jumlah</h6>
                                <p className="mb-0 text-dark">
                                {this.props.isLoading?<Skeleton width='100px'/>:this.props.jumlah}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            // </div>
        );
    }
}


export default Card;