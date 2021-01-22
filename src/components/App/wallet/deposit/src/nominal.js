import React, { Component } from 'react';
// import moment from 'moment';
// import Skeleton from 'react-loading-skeleton';

class Card extends Component{
    constructor(props){
        super(props);
        this.state={
          
        };
    }

    render(){

        return(
            <div className="col-md-6">
                <label>Pilih nominal cepat</label>
                <div className="row">
                    {
                        this.props.arrAmount.map((v,i)=>{
                            return (
                                <div className="col-3 col-xs-3 col-md-3" key={i} style={{marginBottom:"10px"}}>
                                    <button
                                    onClick = {
                                        (event) => this.props.handleClickPrice(event, i)
                                    }
                                    className = {
                                        `btn ${this.props.amount===v.amount?'btn-success':'btn-default'} btn-block btn-sm`
                                    }
                                    style = {{
                                            border: "2px solid green",
                                            borderRadius: "10px",
                                            color: `${this.props.amount===v.amount?'white':'green'}`,
                                            fontWeight: "bold"
                                        }} 
                                    > 
                                        Rp {v.amount} 
                                    </button>
                                </div>
                            );
                        })
                    }

                </div>
            </div>

        );
    }
}


export default Card;