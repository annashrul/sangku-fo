import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import Skeleton from 'react-loading-skeleton';
import {getBank} from "redux/actions/member/bank.action";
import {rmComma, ToastQ, toCurrency} from "helper";
import {postDeposit} from "redux/actions/member/deposit.action";


class IndexDeposit extends Component{
    constructor(props){
        super(props);
        this.state={
            amount:"0",
            bank:0,
            idBank:"",
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
        this.handleClickBank   = this.handleClickBank.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);

    }

    componentWillMount(){
        this.props.dispatch(getBank());
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

    handleClickBank(e,i,id){
        e.preventDefault();
        this.setState({bank:i,idBank:id});
    }


    handleSubmit(e){
        e.preventDefault();
        let data={};
        data['id_bank_destination'] = this.state.idBank;
        data['amount'] = rmComma(this.state.amount);
        if(isNaN(data['amount'])){
            ToastQ.fire({icon:'error',title:`silahkan masukan nominal anda`});
        }
        else{
            this.props.dispatch(postDeposit(data));
        }
        console.log(isNaN(data['amount']));
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isError===true){
            this.setState({amount:"0"});
        }
    }

    render(){
        return(
            <Layout page={"Deposit"} subpage="Wallet">
                <div className="row align-items-center">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="dashboard-header-title mb-3 d-flex justify-content-center">
                            <h5 className="mb-0 text-center font-weight-bold">Deposit</h5>
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
                                                                <label>Masukan Nominal</label>
                                                                <input type="text" className={"form-control"} name={"amount"} value={toCurrency(this.state.amount)} onChange={this.handleChange}/>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12" style={{borderTop:"1px solid #EEEEEE"}}>
                                                            <div className="form-group" style={{marginTop:"10px"}}>
                                                                <label>Pilih Bank</label>
                                                                {
                                                                    typeof this.props.resBank.data==='object'?this.props.resBank.data.length>0?this.props.resBank.data.map((v,i)=>{
                                                                        return (

                                                                            <div key={i} className="card" onClick={(event)=>this.handleClickBank(event,i,v.id)} style={this.state.bank===i?{backgroundColor:'#EEEEEE'}:{backgroundColor:'transparent'}}>
                                                                                <div className="card-body">
                                                                                    <div className="single-smart-card d-flex justify-content-between">
                                                                                        <div className="text">
                                                                                            <h5 style={{color:"green"}}>{v.bank_name}</h5>
                                                                                            <p style={{fontSize:"12px"}}>{v.acc_name} <br/> {v.acc_no}</p>
                                                                                        </div>
                                                                                        <div className="icon">
                                                                                            <i className={`fa ${this.state.bank===i?'fa-check':'fa-angle-double-right'} font-30`} style={{color:`${this.state.bank===i?'green':''}`}}/>
                                                                                        </div>
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
        isLoadingPost:state.depositReducer.isLoadingPost,
        isError:state.depositReducer.isError,
    }
}


export default connect(mapStateToProps)(IndexDeposit);