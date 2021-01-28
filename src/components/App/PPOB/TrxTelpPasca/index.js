import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {rmComma, ToastQ, toCurrency} from "helper";
import {postTransfer} from "redux/actions/member/transfer.action";
import Stepper from 'react-stepper-horizontal';
import noUser from '../../../../assets/no-user.png'
import imgCancel from '../../../../assets/cancel.gif'
import imgCheck from '../../../../assets/check.gif'
import {dataPascabayar, validatePhoneNumber} from "../../../../helper";
import IntlTelInput from 'react-intl-tel-input/dist/components/IntlTelInput';
import ModalPin from "../../modals/modal_pin";
import {ModalToggle, ModalType} from "../../../../redux/actions/modal.action";
const dataKategori=dataPascabayar();

class TrxTelpPasca extends Component{
    constructor(props){
        super(props);
        this.state={
            id_pelanggan:"",
            no_telp:'',
            number:'',
            jenis:"",
            code:0,
            errorMsg:"",
            steps: [{title: 'Pengisian'}, {title: 'Konfirmasi'}, {title: 'Berhasil'}],
            currentStep: 0,
        };
        this.handleChange   = this.handleChange.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.konfirmRefs = React.createRef();
        this.pengisianRefs = React.createRef();
        this.berhasilRefs = React.createRef();
    }
    onClickNext() {
        const {currentStep } = this.state;
        if(currentStep===0){
            if(this.submit()){
                this.setState({
                    currentStep: currentStep + 1,
                });
                this.konfirmRefs.current.scrollIntoView({ block: 'start',  behavior: 'smooth' })
            }

        }
        else if(currentStep===1){
            const bool = !this.props.isOpen;
            this.props.dispatch(ModalToggle(bool));
            this.props.dispatch(ModalType("modalPin"));
        }
    }
    onClickPrev() {
        const {
            // steps,
            currentStep } = this.state;
        this.setState({
            currentStep: currentStep - 1,
        });
        if(currentStep===1){
            this.pengisianRefs.current.scrollIntoView({ block: 'end',  behavior: 'smooth' })
        } else if(currentStep===2){
            this.konfirmRefs.current.scrollIntoView({ block: 'end',  behavior: 'smooth' })
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        this.submit()
    }
    submit(){
        let data={};
        data['jenis'] = this.state.jenis;
        data['id_pelanggan'] = this.state.id_pelanggan;
        data['nohp'] = this.state.number;
        console.log(data['nohp'])
        if(data['jenis']===""){
            ToastQ.fire({icon:'error',title:`silahkan pilih jenis tagihan`});
            return false;
        }
        if(data['id_pelanggan']===""){
            ToastQ.fire({icon:'error',title:`silahkan masukan ID Pelanggan/No Rekening anda`});
            return false;
        }
        if(data['nohp']==='62'||data['nohp']===''){
            ToastQ.fire({icon:'error',title:`silahkan masukan No Telepon anda`});
            return false;
        }
        if(data['nohp'].length<10){
            ToastQ.fire({icon:'error',title:`No Telepon minimal 10 karakter`});
            return false;
        }
        if(data['nohp'].length>14){
            ToastQ.fire({icon:'error',title:`No Telepon maksimal 14 karakter`});
            return false;
        }
        return true;
        // if(isNaN(data['amount'])){
        //     ToastQ.fire({icon:'error',title:`silahkan masukan nominal anda`});
        //     return false;
        // }
        // else if(data['id_penerima']===""||data['id_penerima']==="0"||data['id_penerima']===undefined){
        //     ToastQ.fire({icon:'error',title:`silahkan masukan penerima`});
        //     return false;
        // }
        // else{
        //     if(this.state.currentStep===1){
        //         this.props.dispatch(postTransfer(data));
        //         return true;
        //     } else {
        //         return true
        //     }
        // }
    }
    handleSave(num){
        const {currentStep } = this.state;
        this.setState({
            code:num
        });
        if(num.length===6){
            this.props.dispatch(ModalToggle(false));
            this.setState({
                currentStep: currentStep + 1,
            });
            this.berhasilRefs.current.scrollIntoView();
        }

    }
    handleClick(i){
        this.setState({
            jenis:dataKategori[i].title
        })
    }
    validatePhone(num,number){
        if(number!=='62')
            this.setState({errorMsg:validatePhoneNumber(number)});

    }
    setPhone(num, number) {
        let err='';
        if(num!==''){
            err='';
        }
        if(number.length<3){
            this.setState({provider:'',idx:10000000000});

        }
        this.setState({
            no_telp:number,
            number:num,
            errorMsg:err,
        });
        let prov=null;
        if(number.length>=4){
            // dataPPOB().forEach((v,i)=>{
            //     if(v.code===number.substr(0,5)||v.code===number.substr(0,4)){
            //         prov=v;
            //         return;
            //     }
            // });
            // this.HandleChangeProvider(prov);
            // if(prov!==null){
            //     if(prov.code===number.substr(0,5)||prov.code===number.substr(0,4)){
            //         if(number.length===5){
            //             this.props.dispatch(FetchPulsaAll('nohp',number))
            //         }
            //     }
            // }

        }
    }

    render(){
        const { steps, currentStep,jenis } = this.state;
        const blur = {
            WebkitFilter: 'blur(5px)',
            cursor:'no-drop',
            userSelect:'none'
        }
        return(
            <Layout page="Pembayaran Telepon Pascabayar" subpage="PPOB" link={"/ppob"}>
                <div className="row align-items-center">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="dashboard-header-title mb-3 d-flex justify-content-center">
                            <h5 className="mb-0 text-center font-weight-bold">Pembayaran Telpon Pascabayar</h5>
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
                                            <div ref={this.pengisianRefs} className="card w-100" style={currentStep===0?null:blur}>
                                                <div className="card-body">
                                                    <div className="row no-gutters">
                                                        <div className="w-100 h-100 bg-transparent" style={{position:'absolute',top:'0',left:'0',zIndex:'1', display:currentStep===0?'none':''}}/>
                                                        <div className="col-md-12">
                                                            <label className={"bold black"}>Jenis Tagihan</label>
                                                        </div>
                                                        <div className="row" style={{marginBottom:"10px",overflow:"auto",height:jenis.length>7?"250px":"auto"}}>
                                                            {
                                                                dataKategori.map((v,i)=>{
                                                                    return (
                                                                        <div onClick={event => this.handleClick(i)} className="col-md-12" key={i} style={{marginBottom:"5px",cursor:'pointer'}}>
                                                                            <div className="card" style={{padding:"0",border:jenis===v.title?'1px solid green':'1px solid #EEEEEE',borderRadius:"3px"}}>
                                                                                <div className="card-body" style={{padding:"5px"}}>
                                                                                    <div className="media align-items-center">
                                                                                        <div className="media-body">
                                                                                            <p style={{fontSize:"11px"}} className="mb-0 black">{v.title}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })
                                                            }
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label className={"bold black"}>ID Pelanggan</label>
                                                                <input type="text" className={"form-control"} name={"id_pelanggan"} value={this.state.id_pelanggan} onChange={this.handleChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label className={"bold black"}>No Telepon</label>
                                                                <IntlTelInput
                                                                    preferredCountries={['id']}
                                                                    containerClassName="intl-tel-input"
                                                                    inputClassName="form-control telInput"
                                                                    onPhoneNumberChange={(status, value, countryData, number, id) => {
                                                                        this.setPhone(value.replace(/^0+/, ''), number.replace(/[^A-Z0-9]/ig, ""))
                                                                    }}
                                                                    onPhoneNumberBlur={(status, value, countryData, number, id) => {
                                                                        this.validatePhone(value.replace(/^0+/, ''), number.replace(/[^A-Z0-9]/ig, ""))
                                                                    }}
                                                                    autoFocus={true}
                                                                    separateDialCode={true}
                                                                    format={true}
                                                                    formatOnInit={true}
                                                                    value={this.state.number}
                                                                />
                                                                <small style={{color:"red",fontWeight:"bold"}}>{this.state.errorMsg}</small>

                                                                {/*<input type="text" className={"form-control"} name={"no_telp"} onChange={this.handleChange}/>*/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex">
                                            <div ref={this.konfirmRefs} className="card w-100" style={currentStep===1?null:blur}>
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
                                                                <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Jenis Tagihan</small>
                                                            </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                            <span className="font-14">{this.state.jenis}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="my-3" />
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="font-14 mb-0">
                                                                <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">ID Pelanggan / No Rekening</small>
                                                            </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                            <span className="font-14">{this.state.id_pelanggan}</span>
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
                                                            <span className="font-14">0</span>
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
                                                            <span className="font-14">0</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex">
                                            <div ref={this.berhasilRefs} className="card w-100" style={currentStep===2?null:blur}>
                                                <div className="card-body d-flex align-items-center">
                                                    <div className="w-100 h-100 bg-transparent" style={{position:'absolute',top:'0',left:'0',zIndex:'1', display:currentStep===2?'none':''}}/>
                                                    <div className="profile-thumb-contact text-center mb-4">
                                                        <div className="profile--tumb">
                                                            {this.props.isLoadingPost?
                                                                <div className="spinner-grow" role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                :
                                                                <img src={!this.props.isError?imgCancel:imgCheck} alt="sangqu"/>
                                                            }
                                                        </div>
                                                        <h5 className="mt-15">Transfer {this.props.isLoadingPost?'sedang diproses':!this.props.isError?'Gagal':'Berhasil'}</h5>
                                                        <p className="mt-15 font-15 text-dark">Transaksi dengan nominal Rp. {toCurrency(this.state.amount)} yang ditujukan kepada Yth. Sdr/i {this.state.id_penerima} telah {this.props.isLoadingPost?'sedang diproses':!this.props.isError?'gagal diproses':'selesai'}.</p>
                                                        <hr/>
                                                        <small className="text-muted">Kami tidak bertanggung jawab atas kesalahan dalam menulisan sehingga menyebabkan terkirimnya bukan kepada tujuan yang anda tunjukan.</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 w-100 position-sticky fixed-bottom">
                                        <div className="row justify-content-between">
                                            <div className="col-xs-3">
                                                <div className="form-group">
                                                    {currentStep===0||currentStep===2?'':<button type="button" className="btn btn-info btn-block" onClick={(e) => this.onClickPrev(e)}>KEMBALI</button>}
                                                </div>
                                            </div>
                                            <div className="col-xs-3">
                                                <div className="form-group">
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
                </div>
                {
                    this.props.isOpen?<ModalPin isLoading={this.props.isLoadingPost} code={this.state.code} save={this.handleSave} typePage={''}/>:null
                }
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        auth: state.auth,
        resBank:state.bankReducer.data,
        isLoadingBank:state.bankReducer.isLoading,
        isLoadingPost:state.transferReducer.isLoadingPost,
        isError:state.transferReducer.isError,
    }
}


export default connect(mapStateToProps)(TrxTelpPasca);