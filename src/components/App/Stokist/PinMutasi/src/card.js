import React, { Component } from 'react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';

class Card extends Component{
    render(){
// created_at: "2021-04-28T09:43:22.505Z"
// full_name: "Sangqu -01"
// id: "b7a735c7-7059-450e-8296-0a9cd4d056bd"
// id_member: "555d0e4a-474e-41f8-8857-f68b5f092ab9"
// id_paket: "423b09b9-c387-481f-abbc-87203cb992ea"
// jenis_pin: "Regular"
// jenis_transaksi: "ORDER"
// jumlah: 1
// note: "Pin dari pembelian paket Paket Basic SQAyu"
// paket: "Paket Basic SQAyu"
// tipe: "0"
// totalrecords: "2"
// updated_at: "2021-04-28T09:43:22.505Z"
        return(
            <div className='col-md-12 col-sm-12 col-lg-12'>
                <div className="card rounded mb-2">
                    <div className="card-body p-3">
                        <div className="media">
                            <div className="media-body text-center mr-2" style={{maxWidth:'100px',minWidth:'100px'}}>
                                <h5 className="mb-1">{this.props.isLoading?<Skeleton width='80px'/>:this.props.jenis_pin}</h5>
                                <p className="mb-0 text-muted">
                                {this.props.isLoading?<Skeleton width='50px'/>:moment(this.props.created_at).format('YYYY-DD-MM')}
                                </p>
                            </div>
                            <div className="media-body text-left" style={{marginLeft:'20px'}}>
                                <p className="mb-2 text-mute">{this.props.isLoading?<Skeleton width='350px'/>:this.props.note}</p>
                                <h6 className="mb-1 text-black">{this.props.isLoading?<Skeleton width='200px'/>:this.props.jenis_transaksi+" - "+this.props.paket}</h6>
                            </div>
                            <div className="media-body text-center ml-1" style={{maxWidth:'200px',minWidth:'200px'}}>
                                <h6 className="mb-1 text-muted">Jumlah</h6>
                                <p className="mb-0 text-dark">
                                {this.props.isLoading?<Skeleton width='100px'/>:this.props.jumlah}
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