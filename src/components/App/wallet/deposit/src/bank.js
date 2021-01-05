import React, { Component } from 'react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';

class Card extends Component{
    constructor(props){
        super(props);
        this.state={
            arrAmount:[
                {id:0,amount:'50,000'},
                {id:0,amount:'100,000'},
                {id:1,amount:'200,000'},
                {id:2,amount:'300,000'},
                {id:3,amount:'400,000'},
                {id:4,amount:'500,000'},
                {id:4,amount:'700,000'},
                {id:5,amount:'1,000,000'},
            ],
        };
    }

    render(){

        return(
            <div className="col-md-12" style={{borderTop:"1px solid #EEEEEE"}}>
                <div className="form-group" style={{marginTop:"10px"}}>
                    <label>Pilih Bank</label>
                    <div className="row">
                        {
                            typeof this.props.data==='object'?this.props.data.length>0?this.props.data.map((v,i)=>{
                                return (
                                    //     <div key={i} className="card" onClick={(event)=>this.props.handleClickBank(event,i,v.id)} style={this.props.bank===i?{backgroundColor:'#EEEEEE'}:{backgroundColor:'transparent'}}>
                                    //         <div className="card-body row">
                                    //             <div className="col-md-3 col-sm-3">
                                    //                 <img width="150px" style={{marginTop:'10px'}}/>
                                    //             </div>
                                    //             <div className="col-md-9 col-sm-9">
                                    //                 <div className="single-smart-card d-flex justify-content-between" style={{marginTop:'10px'}}>
                                    //                     <div className="text">
                                    //                         <h5 style={{color:"green"}}>{v.acc_no}</h5>
                                    //                         <p style={{fontSize:"15px"}}>{v.acc_name}</p>
                                    //                     </div>
                                    //                     <div className="icon" style={{marginTop:'10px'}}>
                                    //                         <i className={`fa ${this.props.bank===i?'fa-check':''} font-30`} style={{color:`${this.props.bank===i?'green':''}`}}/>
                                    //                     </div>
                                    //                 </div>
                                                    
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    <div className="col-md-6 col-sm-6">
                                        
                                        <div className={this.props.bank===i?"radio list-payment active-payment":"radio list-payment"} onClick={(event)=>this.props.handleClickBank(event,i,v.id)}>
                                            <img src={v.logo} alt={v.bank_name}  />
                                            <div className="text-wrapper">
                                            <h5 className="text-title">{v.acc_name}</h5>
                                            <span className="text-sm">{v.acc_no}</span>
                                            </div>
                                        </div>
                                    </div>

                                );
                            }):"":(()=>{
                                let container =[];
                                for(let x=0; x<4; x++){
                                    container.push(
                                        <div className={"card"} style={{borderBottom:"1px solid #EEEEEE"}}>
                                            <div className="card-body">
                                                <div><Skeleton width={100}/></div>
                                                <div><Skeleton width={200}/></div>
                                                <div><Skeleton width={300}/></div>
                                            </div>
                                        </div>
                                    )
                                }
                                return container;
                            })()
                        }

                    </div>
                </div>
            </div>

        );
    }
}


export default Card;