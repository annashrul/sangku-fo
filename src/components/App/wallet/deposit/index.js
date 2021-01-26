import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {getBank} from "redux/actions/member/bank.action";
import {rmComma, ToastQ, toCurrency} from "helper";
import {postDeposit} from "redux/actions/member/deposit.action";
import Nominal from './src/nominal'
import Wallet from 'assets/wallet.png'
import Bank from './src/bank'
import Swal from "sweetalert2";

class IndexDeposit extends Component{
    constructor(props){
        super(props);
        this.state={
            amount:"0",
            bank:0,
            idBank:"",
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
            Swal.fire({
                title: 'Perhatian !!!',
                html: `Pastikan data yang anda input sudah benar.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: `Oke`,
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.value) {
                    this.props.dispatch(postDeposit(data));
                }

            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isError===true){
            this.setState({amount:"0"});
        }
    }

    render(){
        return(
            <Layout page={"Deposit"} subpage="Wallet">
                <div className="row" style={{padding:"20px", lineHeight:'1.6'}}>
                    {/* <div className="card" style={{boxShadow:"0px -4px 3px #EEEEEE",borderRadiusTop:"10px",border:"2px solid #EEEEEE",padding:"20px"}}> */}
                            
                            
                    <div className="col-md-5 col-sm-5 col-lg-5" >
                        <div className="form-group" style={{marginTop:"10px"}}>
                            <label>Nominal Deposit</label>
                            <div className="row">
                                <div className="col-md-2 col-sm-2" style={{paddingRight:0}}>
                                    <img src={Wallet} alt="wallet" width="70px"/>
                                </div>
                                <div className="col-md-6 col-sm-6" style={{paddingLeft:0}}>
                                    <input type="text" className={"form-control"} style={{marginTop:'15px'}} name={"amount"} value={toCurrency(this.state.amount)} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Nominal
                        handleClickPrice={this.handleClickPrice}
                        amount={this.state.amount}
                        arrAmount = {
                            this.state.arrAmount
                        }
                    />
                    <Bank
                        data={this.props.resBank.data}
                        handleClickBank={this.handleClickBank}
                        bank={this.state.bank}
                    />

                            
                    {/* </div> */}
                    <button onClick={this.handleSubmit} className={"btn btn-primary btn-block"}>{!this.props.isLoadingPost?'Simpan':'Loading ...'}</button>
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