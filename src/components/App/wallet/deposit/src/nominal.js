import React, { Component } from 'react';
// import moment from 'moment';
// import Skeleton from 'react-loading-skeleton';

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
            <div className="col-md-6">
                <label>Pilih nominal cepat</label>
                <div className="row">
                    {
                        this.state.arrAmount.map((v,i)=>{
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