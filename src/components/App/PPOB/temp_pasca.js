import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import { ToastQ, toCurrency} from "helper";
import Stepper from 'react-stepper-horizontal';
// import noUser from '../../../assets/no-user.png'
// import imgCancel from '../../../assets/cancel.gif'
import imgCheck from '../../../assets/check.gif'
import {validatePhoneNumber} from "../../../helper";
import IntlTelInput from 'react-intl-tel-input/dist/components/IntlTelInput';
import ModalPin from "../modals/modal_pin";
import ModalOtp from "../modals/modal_otp";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import {FetchPulsaAll} from "../../../redux/actions/ppob/pulsa_all/pulsa_all.action";
import Skeleton from 'react-loading-skeleton';
import {postPascabayar} from "../../../redux/actions/ppob/pascabayar.action";
import {sendOtp} from "../../../redux/actions/authActions";
import Link from "react-router-dom/es/Link";

// const dataKategori=dataPascabayar();

class TempPasca extends Component{
    constructor(props){
        super(props);
        this.state={
            dataUser:{},
            dataStep2:{},
            id_pelanggan:"",
            no_telp:'',
            number:'',
            jenis:"",
            price:0,
            pin:0,
            otp:0,
            isPin:false,
            // code:0,
            errorMsg:"",
            steps: [{title: 'Pengisian'}, {title: 'Konfirmasi'}, {title: 'Berhasil'}],
            currentStep: 0,
            path:this.props.location.pathname.split("/"),
            code:this.props.location.pathname.split("/")[4],
        };
        this.handleChange   = this.handleChange.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSaveOtp = this.handleSaveOtp.bind(this);
        this.handleSavePin = this.handleSavePin.bind(this);
        this.konfirmRefs = React.createRef();
        this.pengisianRefs = React.createRef();
        this.berhasilRefs = React.createRef();
    }
    componentDidMount(){
        localStorage.setItem("isPin","-");
    }
    componentWillMount(){
        localStorage.setItem("isPin","-");
        this.props.dispatch(FetchPulsaAll(`kategori=${atob(this.state.code)}`))
    }
    // componentDidUpdate(prevState){
    //     if (prevState.auth.isErrorNo === true && (prevState.isOpen !== this.props.isOpen)) {
    //         this.props.dispatch(ModalToggle(true));
    //         this.props.dispatch(ModalType("modalOtp"));
    //     }
    // }
    componentWillReceiveProps(nextProps){
        const {currentStep } = this.state;
        // if (nextProps.auth.isErrorNo === true && localStorage.isPin==="false") {
        //     this.props.dispatch(ModalToggle(true));
        //     this.props.dispatch(ModalType("modalOtp"));
        // }
        if (localStorage.isPin==="true") {
            this.props.dispatch(ModalType("modalPin"));
        }
        if(nextProps.auth.user!==undefined){
            this.setState({
                dataUser:{name:nextProps.auth.user.full_name,nohp:nextProps.auth.user.mobile_no}
            })
        }
        // if(this.props.isLoadingCheckout){
            // if(!nextProps.isErrorCheckout){
                
            //     this.setState({
            //         currentStep: currentStep + 1,
            //     });
                // this.konfirmRefs.current.scrollIntoView({ block: 'start',  behavior: 'smooth' })

            // }
        // }
        if(this.props.isLoadingCekTagihan){
            if (nextProps.dataTagihan !== undefined && typeof nextProps.dataTagihan === 'object') {
                console.log('nextProps.dataTagihan', currentStep);
                var size = Object.keys(nextProps.dataTagihan).length;

                if (size>2) {
                    this.setState({
                        currentStep:  1,
                        dataStep2:{
                            admin: nextProps.dataTagihan.admin,
                            kd_trx: nextProps.dataTagihan.kd_trx,
                            nama_palanggan: nextProps.dataTagihan.nama_palanggan,
                            periode:nextProps.dataTagihan.periode,
                            tagihan: nextProps.dataTagihan.tagihan,
                            target: nextProps.dataTagihan.target,
                            total_bayar: nextProps.dataTagihan.total_bayar,
                            no_pelanggan: nextProps.dataTagihan.no_pelanggan,
                            produk: nextProps.dataTagihan.produk,
                        }
                    });
                }else if(currentStep===1){
                    localStorage.setItem("isPin", "-");
                    this.setState({
                        currentStep: 2
                    })
                }
                this.konfirmRefs.current.scrollIntoView({ block: 'start',  behavior: 'smooth' })
            }
        }

    }
    onClickNext() {
        const {currentStep } = this.state;
        if(currentStep===0){
            if(this.submit()){
                let data={};
                data['code'] = this.state.jenis;
                data['nopel'] = this.state.id_pelanggan;
                data['nohp'] = this.state.no_telp;
                this.props.dispatch(postPascabayar(data,'tagihan'));
            }

        }
        else if(currentStep===1){
            localStorage.setItem("isPin","true");
            // localStorage.setItem("isPin","false");
            // this.props.dispatch(sendOtp({
            //     type: '-',
            //     nomor: this.state.dataUser.nohp,
            //     islogin: true,
            //     nama:this.state.dataUser.name,
            // }));
            this.props.dispatch(ModalToggle(true));
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
        data['code'] = this.state.jenis;
        data['nopel'] = this.state.id_pelanggan;
        data['nohp'] = this.state.no_telp;
        if(data['code']===""){
            ToastQ.fire({icon:'error',title:`silahkan pilih jenis tagihan`});
            return false;
        }
        if(data['nopel']===""){
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
    }
    handleSaveOtp(num){
        // const {currentStep } = this.state;
        this.setState({
            otp:num
        });
        if(num.length===4){
            if(num===this.props.auth.user_otp.otp_anying){
                localStorage.setItem("isPin","true");
                this.props.dispatch(ModalType("modalPin"));
            }
        }

    }
    handleSavePin(num){
        // const {currentStep } = this.state;
        this.setState({
            pin:num
        });

        if(num.length===6){
            this.props.dispatch(postPascabayar({
                "kd_trx":this.state.dataStep2.kd_trx,
                "pin":num
                },'checkout'
            ));

        }

    }
    handleClick(jenis){
        this.setState({
            jenis:jenis,
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

    }
    render(){
        const { steps, currentStep,jenis } = this.state;
        console.log(currentStep);
        const blur = {
            WebkitFilter: 'blur(5px)',
            cursor:'no-drop',
            userSelect:'none'
        }
        const {
            data
        } = this.props.pulsa_allPulsaAll;
        return(
            <Layout page={this.state.path[3].replaceAll("-"," ").toUpperCase()} subpage="PPOB" link={"/ppob"}>
                <div className="row align-items-center">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="dashboard-header-title mb-3 d-flex justify-content-center">
                            <h5 className="mb-0 text-center font-weight-bold">{this.props.page}</h5>
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
                                                        <div className="col-md-12" style={{marginBottom:"10px",overflow:"auto",height:typeof data==='object'? data.length>7?"250px":"auto":""}}>
                                                            {
                                                                !this.props.isLoading?typeof data==='object'? data.length>0?data.map((v,i)=>{
                                                                    return (
                                                                        <div onClick={event => this.handleClick(v.code)}  className={`card ${v.code===jenis?'bgGreen':''}`} key={i} style={{border:"1px solid #EEEEEE",marginBottom:"5px",cursor:'pointer',padding:"0",borderRadius:"3px",width:"100%"}}>
                                                                            <div className="card-body" style={{padding:"5px",width:"100%"}}>
                                                                                <p style={{fontSize:"11px",color:v.code===jenis?'white':'black'}} className="mb-0">{v.note}</p>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }):"":"":(() => {
                                                                    const rows = [];
                                                                    for (let i = 0; i < 5; i++) {
                                                                        rows.push(
                                                                            <div className="card" key={i} style={{marginBottom:"5px",cursor:'pointer',padding:"0",border:'1px solid #EEEEEE',borderRadius:"3px",width:"100%"}}>
                                                                                <div className="card-body" style={{padding:"5px",width:"100%"}}>
                                                                                    <p style={{fontSize:"11px"}} className="mb-0 black"><Skeleton/></p>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return rows;
                                                                })()
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
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="font-14 mb-0">
                                                                <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Jenis Tagihan</small>
                                                            </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                            <span className="font-14">{this.state.dataStep2.produk}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="my-3" />
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="font-14 mb-0">
                                                                <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">No Pelanggan / No Rekening</small>
                                                            </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                            <span className="font-14">{this.state.dataStep2.no_pelanggan}</span>
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
                                                            <span className="font-14">Rp {toCurrency(this.state.dataStep2.admin)} .-</span>
                                                        </div>
                                                    </div>
                                                    <hr className="my-3" />
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="font-14 mb-0">
                                                                <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Tagihan</small>
                                                            </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                            <span className="font-14">Rp {toCurrency(this.state.dataStep2.tagihan)} .-</span>
                                                        </div>
                                                    </div>
                                                    <hr className="my-3" />

                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="font-14 mb-0">
                                                                <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Total Bayar</small>
                                                            </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                            <span className="font-14">Rp {toCurrency(this.state.dataStep2.total_bayar)} .-</span>
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
                                                                <img src={imgCheck} alt="sangqu"/>
                                                            }
                                                        </div>
                                                        <h5 className="mt-15">Transaksi Berhasil</h5>
                                                        <p className="mt-15 font-15 text-dark">Terimakasih telah melakukan transaksi {this.state.path[3].replaceAll("-"," ")} disini.</p>
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
                                                    {currentStep===2?'':<button type="button" className="btn btn-info btn-block" onClick={(e) => this.onClickNext(e)}>{currentStep===1?'PROSES':currentStep===0?(this.props.isLoadingCekTagihan?'loading':'SELANJUTNYA'):''}</button>}
                                                    {currentStep===2?<Link to={'/ppob'}><button type="button" className={"btn btn-primary btn-block"}>SELESAI</button></Link>:''}
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
                    // this.props.isOpen?<ModalPin isLoading={false} code={this.state.pin} save={this.handleSave} typePage={''}/>:null
                    localStorage.isPin==="false"?<ModalOtp isLoading={false} code={this.state.otp} save={this.handleSaveOtp} typePage={''} otp={this.props.auth.user_otp!==undefined?this.props.auth.user_otp.otp_anying:''}/>:null
                }
                {
                    localStorage.isPin==="true"?<ModalPin isLoading={this.props.isLoadingCheckout} code={this.state.pin} save={this.handleSavePin} typePage={''}/>:null
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
        pulsa_allPulsaAll:state.pulsa_allReducer.data,
        isLoading:state.pulsa_allReducer.isLoading,
        isLoadingCekTagihan:state.pascabayarReducer.isLoadingPost,
        isErrorCekTagihan:state.pascabayarReducer.isError,
        isErrorCheckout:state.pascabayarReducer.isErrorCheckout,
        isLoadingCheckout:state.pascabayarReducer.isLoadingPost,
        isErrorCheckout:state.pascabayarReducer.isError,
        dataTagihan:state.pascabayarReducer.data
    }
}


export default connect(mapStateToProps)(TempPasca);