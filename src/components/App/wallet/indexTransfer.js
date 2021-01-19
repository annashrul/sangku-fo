import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {rmComma, ToastQ, toCurrency} from "helper";
import {postTransfer} from "redux/actions/member/transfer.action";
import Stepper from 'react-stepper-horizontal';
import noUser from '../../../assets/no-user.png'
import imgCancel from '../../../assets/cancel.gif'
import imgCheck from '../../../assets/check.gif'


class IndexTransfer extends Component{
    constructor(props){
        super(props);
        this.state={
            amount:"0",
            id_penerima:"",
            pin:"",
            arrAmount:[
                {id:0,amount:'100,000'},
                {id:1,amount:'200,000'},
                {id:2,amount:'300,000'},
                {id:3,amount:'400,000'},
                {id:4,amount:'500,000'},
                {id:5,amount:'1,000,000'},
            ],
            steps: [{title: 'Pengisian'}, {title: 'Konfirmasi'}, {title: 'Berhasil'}],
            currentStep: 0,
        };
        this.handleChange   = this.handleChange.bind(this);
        this.handleClickPrice   = this.handleClickPrice.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.pinValidate = this.pinValidate.bind(this);

    }

    onClickNext() {
        const { 
            // steps,
            currentStep } = this.state;
        if(currentStep===0){
            if(this.submit()){
                this.setState({
                    currentStep: currentStep + 1,
                });
            }
        } 
        else if(currentStep===1){
            if(this.state.pin!==''){
                if(this.pinValidate()){
                    this.setState({
                        currentStep: currentStep + 1,
                    });
                    this.submit()
                } else {
                    
                }
            } else {
                ToastQ.fire({icon:'error',title:`PIN anda belum diisi!`});
            }
        }
    }
    onClickPrev() {
        const { 
            // steps,
        currentStep } = this.state;
        this.setState({
            currentStep: currentStep - 1,
        });
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
        this.submit()
    }
    submit(){
        let data={};
        data['id_penerima'] = this.state.id_penerima;
        data['amount'] = rmComma(this.state.amount);
        if(isNaN(data['amount'])){
            ToastQ.fire({icon:'error',title:`silahkan masukan nominal anda`});
            return false;
        }
        else if(data['id_penerima']===""||data['id_penerima']==="0"||data['id_penerima']===undefined){
            ToastQ.fire({icon:'error',title:`silahkan masukan penerima`});
            return false;
        }
        else{
            if(this.state.currentStep===1){
                this.props.dispatch(postTransfer(data));
                return true;
            } else {
                return true
            }
        }
    }
    pinValidate(){
        let myPin=123456;
        
        console.log("mypin",myPin)
        console.log("state pin",this.state.pin)
        if(String(myPin)!==String(this.state.pin)){
            ToastQ.fire({icon:'error',title:`PIN yang anda masukan salah!`});
            return false;
        }
        else{
            ToastQ.fire({icon:'success',title:`PIN diterima!`});
            return true;
        }
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.isError===true){
    //         this.setState({amount:"0",id_penerima:""})
    //     }
    // }

    render(){
        const { steps, currentStep } = this.state;

        const blur = {
            WebkitFilter: 'blur(5px)',
            cursor:'no-drop',
            userSelect:'none'
            // margin: '-5px 0 0 -5px',
            // background: 'url(https: images.unsplash.com photo-1511447333015-45b65e60f6d5?ixid="MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=823&q=80&quot)',
            // height:'400px',
            // width:'400px'
        }
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
                                <div className="col-md-12 mb-4">
                                    <Stepper steps={ steps } activeStep={ currentStep } />
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="row">
                                        <div className="col-md-4 d-flex">
                                            <div className="card w-100" style={currentStep===0?null:blur}>
                                                <div className="card-body">
                                                <div className="row no-gutters">
                                                    <div className="w-100 h-100 bg-transparent" style={{position:'absolute',top:'0',left:'0',zIndex:'1', display:currentStep===0?'none':''}}/>
                                                        <div className="col-md-12">
                                                            <label>Pilih nominal cepat</label>
                                                        </div>
                                                        {
                                                            this.state.arrAmount.map((v,i)=>{
                                                                return (
                                                                    <div className="col-6 col-xs-6 col-md-6" key={i} style={{padding:'1px'}}>
                                                                        <button
                                                                            onClick={(event)=>this.handleClickPrice(event,i)}
                                                                            className={`btn btn${this.state.amount===v.amount?'-success':'-outline-success'} btn-block btn-sm p-3`}
                                                                            >
                                                                            {v.amount}
                                                                        </button>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                        <div className="col-md-12">
                                                            <div className="form-group mt-3">
                                                                <label>Nominal</label>
                                                                <input type="text" className={"form-control"} name={"amount"} value={toCurrency(this.state.amount)} onChange={this.handleChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Penerima</label>
                                                                <input type="text" className={"form-control"} name={"id_penerima"} value={this.state.id_penerima} onChange={this.handleChange}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex">
                                            <div className="card w-100" style={currentStep===1?null:blur}>
                                                <div className="card-body pb-0">
                                                    <div className="w-100 h-100 bg-transparent" style={{position:'absolute',top:'0',left:'0',zIndex:'1', display:currentStep===1?'none':''}}/>
                                                    <div className="text-center mb-4">
                                                        <h5>Konfirmasi Transfer</h5>
                                                    </div>
                                                    <div className="profile-thumb-contact text-center mb-4">
                                                        <div className="profile--tumb">
                                                            <img src={noUser} alt="sangqu" />
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                        <h6 className="font-14 mb-0">
                                                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Penerima</small>
                                                        </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                        <span className="font-14">{this.state.id_penerima}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="my-3" />
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                        <h6 className="font-14 mb-0">
                                                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Jumlah Transfer</small>
                                                        </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                        <span className="font-14">{this.state.amount}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="my-3" />
                                                    
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                        <h6 className="font-14 mb-0">
                                                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Biaya Admin</small>
                                                        </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                        <span className="font-14">{this.state.amount}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="my-3" />
                                                    
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                        <h6 className="font-14 mb-0">
                                                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Total</small>
                                                        </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                        <span className="font-14">{this.state.amount}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer bg-transparent border-0 pb-4">
                                                    <hr className="my-3" />
                                                    <div className="form-group m-0">
                                                        <label>PIN</label>
                                                            <input type="password" className="form-control" name="pin" value={this.state.pin} maxLength="6" onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex">
                                            <div className="card w-100" style={currentStep===2?null:blur}>
                                                <div className="card-body d-flex align-items-center">
                                                    <div className="w-100 h-100 bg-transparent" style={{position:'absolute',top:'0',left:'0',zIndex:'1', display:currentStep===2?'none':''}}/>
                                                    <div className="profile-thumb-contact text-center mb-4">
                                                        <div className="profile--tumb">
                                                            <img src={!this.props.isError?imgCancel:imgCheck} alt="sangqu" style={{display:currentStep===2?'':'none'}}/>
                                                        </div>
                                                        <h5 className="mt-15">Transfer {!this.props.isError?'Gagal':'Berhasil'}</h5>
                                                        <p className="mt-15 font-15 text-dark">Transaksi dengan nominal Rp. {toCurrency(this.state.amount)} yang ditujukan kepada Yth. Sdr/i {this.state.id_penerima} telah {!this.props.isError?'gagal diproses':'selesai'}.</p>
                                                        <hr/>
                                                        <small className="text-muted">Kami tidak bertanggung jawab atas kesalahan dalam menulisan sehingga menyebabkan terkirimnya bukan kepada tujuan yang anda tunjukan.</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-2">
                                            <div class="form-group">
                                                {currentStep===0||currentStep===2?'':<button type="button" className="btn btn-info btn-block" onClick={(e) => this.onClickPrev(e)}>KEMBALI</button>}
                                            </div>
                                        </div>
                                        <div className="col-md-2 offset-md-8">
                                            <div class="form-group">
                                                {currentStep===2?'':<button type="button" className="btn btn-info btn-block" onClick={(e) => this.onClickNext(e)}>{currentStep===1?!this.props.isLoadingPost?'PROSES':'Mengirim data ...':'SELANJUTNYA'}</button>}
                                                {currentStep===2?<button type="button" onClick={(e)=>{e.preventDefault();window.location.reload();}} className={"btn btn-primary btn-block"}>SELESAI</button>:''}
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