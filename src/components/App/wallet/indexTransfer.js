import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {rmComma, ToastQ, toCurrency} from "helper";
import {postTransfer} from "redux/actions/member/transfer.action";


class IndexTransfer extends Component{
    constructor(props){
        super(props);
        this.state={
            amount:"0",
            id_penerima:"",
            arrAmount:[
                {id:0,amount:'100,000'},
                {id:1,amount:'200,000'},
                {id:2,amount:'300,000'},
                {id:3,amount:'400,000'},
                {id:4,amount:'500,000'},
                {id:5,amount:'1,000,000'},
            ],
        };
        this.handleChange   = this.handleChange.bind(this);
        this.handleClickPrice   = this.handleClickPrice.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);

    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleClickPrice(e,i){
        e.preventDefault();
        this.setState({
            amount:this.state.arrAmount[i].amount
        })
    }

    handleSubmit(e){
        e.preventDefault();
        let data={};
        data['id_penerima'] = this.state.id_penerima;
        data['amount'] = rmComma(this.state.amount);
        if(isNaN(data['amount'])){
            ToastQ.fire({icon:'error',title:`silahkan masukan nominal anda`});
        }
        else if(data['id_penerima']===""||data['id_penerima']==="0"||data['id_penerima']===undefined){
            ToastQ.fire({icon:'error',title:`silahkan masukan penerima`});
        }
        else{
            this.props.dispatch(postTransfer(data));
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isError===true){
            this.setState({amount:"0",id_penerima:""})
        }
    }

    render(){
        return(
            <Layout page={"Transfer"}>
                <div className="row align-items-center">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="dashboard-header-title mb-3 d-flex justify-content-center">
                            <h5 className="mb-0 text-center font-weight-bold">Transfer</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="container">
                            <div className="row">
                                <div className="col d-flex justify-content-center">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-md-4 d-flex justify-content-center">
                                            <div className="row">
                                                <div className="card" style={{height:'500px',overflowY:'auto',boxShadow:"0px -4px 3px #EEEEEE",borderRadiusTop:"10px",border:"2px solid #EEEEEE",padding:"20px"}}>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label>Pilih nominal cepat</label>
                                                        </div>
                                                        {
                                                            this.state.arrAmount.map((v,i)=>{
                                                                return (
                                                                    <div className="col-4 col-xs-4 col-md-4" key={i} style={{marginBottom:"10px"}}>
                                                                        <button onClick={(event)=>this.handleClickPrice(event,i)} className={`btn ${this.state.amount===v.amount?'btn-success':'btn-default'}`} style={{border:"2px solid green",borderRadius:"10px",color:`${this.state.amount===v.amount?'white':'green'}`,fontWeight:"bold"}}>{v.amount}</button>
                                                                    </div>
                                                                );
                                                            })
                                                        }

                                                        <div className="col-md-12" style={{borderTop:"1px solid #EEEEEE"}}>
                                                            <div className="form-group" style={{marginTop:"10px"}}>
                                                                <label>Nominal</label>
                                                                <input type="text" className={"form-control"} name={"amount"} value={toCurrency(this.state.amount)} onChange={this.handleChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12" style={{borderTop:"1px solid #EEEEEE"}}>
                                                            <div className="form-group" style={{marginTop:"10px"}}>
                                                                <label>Penerima</label>
                                                                <input type="text" className={"form-control"} name={"id_penerima"} value={this.state.id_penerima} onChange={this.handleChange}/>
                                                            </div>
                                                        </div>

                                                        {/*<div className="col-md-12" style={{borderTop:"1px solid #EEEEEE"}}>*/}
                                                            {/*<div className="form-group" style={{marginTop:"10px"}}>*/}
                                                                {/*<label>Keterangan</label>*/}
                                                                {/*<textarea name="" className="form-control" cols="30" rows="10"/>*/}
                                                                {/*/!*<input type="text" className={"form-control"} name={"amount"} value={toCurrency(this.state.amount)} onChange={this.handleChange}/>*!/*/}
                                                            {/*</div>*/}
                                                        {/*</div>*/}

                                                    </div>
                                                </div>
                                                <button onClick={this.handleSubmit} className={"btn btn-primary btn-block"}>{!this.props.isLoadingPost?'Simpan':'Loading ...'}</button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        resBank:state.bankReducer.data,
        isLoadingBank:state.bankReducer.isLoading,
        isLoadingPost:state.transferReducer.isLoadingPost,
        isError:state.transferReducer.isError,
    }
}


export default connect(mapStateToProps)(IndexTransfer);