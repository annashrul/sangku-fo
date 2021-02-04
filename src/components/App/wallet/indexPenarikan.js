import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {rmComma, ToastQ, toCurrency} from "helper";
// import {postTransfer} from "redux/actions/member/transfer.action";
import Stepper from 'react-stepper-horizontal';
// import noUser from '../../../assets/no-user.png'
import imgCancel from '../../../assets/cancel.gif'
import imgCheck from '../../../assets/check.gif'
// import { FetchAvailableMember } from '../../../redux/actions/member/member.action';
import ModalPin from '../modals/modal_pin';
import { ModalToggle, ModalType } from '../../../redux/actions/modal.action';
import { withRouter } from 'react-router-dom';
import Select, { components } from "react-select";
import {getBankMember} from "redux/actions/member/bankMember.action";
import {postPenarikan} from "redux/actions/member/penarikan.action";
import imgDefault from 'assets/default.png';
import File64 from "components/common/File64";
import { putMember } from '../../../redux/actions/member/member.action';

const options = [
    { value: "AXIS", label: "AXIS", chipLabel:"TEST", icon: "https://tripay.co.id/assets/images/provider/axis.png" },
    { value: "INDOSAT", label: "INDOSAT", chipLabel:"TEST", icon: "https://tripay.co.id/assets/images/provider/indosat.png" }
];

const { Option } = components;
const IconOption = props => (
<Option {...props}>
    {/* <img className="mr-2"
    src={props.data.icon}
    style={{ width: 36 }}
    alt={props.data.label}
    />
    {props.data.label} */}
    {/* <br/>
    <img className="mr-2"
    src={props.data.icon}
    style={{ width: 36, visibility:'hidden' }}
    alt={props.data.label}
    />
    {props.data.chipLabel} */}
    {/* <div className="card mb-1 p-0"> */}
    {/* <div className="card-body"> */}
    <div className="client-media-content d-flex align-items-center p-1">
    {/* <img className="client-thumb mr-3" src={props.data.icon} alt={props.data.label} /> */}
    <div className="user--media-body">
        <h6 className="mb-0 text-dark font-15">{props.data.label}</h6>
        <span className="font-13 text-dark">{props.data.childLabel}</span>
    </div>
    </div>
    {/* </div> */}
    {/* </div> */}

</Option>
);

class IndexPenarikan extends Component{
    constructor(props){
        super(props);
        this.state={
            amount:"0",
            bank_data:[],
            bank:"",
            id_bank:"",
            picture:"",
            code:"0",
            pin:"",
            member_data:{},
            bank:"",
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
        this.HandleChangeBank   = this.HandleChangeBank.bind(this);
        this.handleChange   = this.handleChange.bind(this);
        this.handleClickPrice   = this.handleClickPrice.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleId = this.handleId.bind(this);
        this.konfirmRefs = React.createRef();
        this.pengisianRefs = React.createRef();
        this.berhasilRefs = React.createRef();
    }
    componentWillMount(){
        this.props.dispatch(getBankMember());
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.resBank);
        let data_bank=[];
        if(nextProps.resBank!==undefined&&nextProps.resBank.data!==undefined){
            nextProps.resBank.data.map((i) => {
                data_bank.push({
                    value: i.id,
                    label: i.acc_name,
                    childLabel: i.bank_name,
                    icon: i.value,
                });
                return null;
            });
        }
        this.setState({bank_data:data_bank})
    }
    componentDidUpdate(prevState){
        if(prevState.isOpen===true&&this.state.currentStep===2){
            this.setState({currentStep:this.state.currentStep-1});
        }
        if(prevState.isOpen===false&&prevState.isError===false&&this.state.currentStep===1&&this.state.pin!==''){
            this.setState({currentStep:2});
        }
    }
    HandleChangeBank(bk) {
        console.log(bk);
        this.setState({bank:bk})
    }
    onClickNext() {
        const { 
            currentStep } = this.state;
        if(currentStep===0){
            if(this.valid()){
                this.setState({
                    currentStep: currentStep + 1,
                    pin:''
                });
                // this.props.dispatch(FetchAvailableMember(this.state.id_bank))
            }
            // window.scrollTo(0, konfirmasiNode.offsetTop);
            this.konfirmRefs.current.scrollIntoView({ block: 'start',  behavior: 'smooth' })
        } 
        else if(currentStep===1){
            if(this.state.bank!=={}&&this.state.bank.value!==undefined){
                this.setState({
                    currentStep: currentStep + 1,
                });
                this.berhasilRefs.current.scrollIntoView()
                this.setState({
                    isModal:true
                });
                const bool = !this.props.isOpen;
                this.props.dispatch(ModalToggle(bool));
                this.props.dispatch(ModalType("modalPin"));
            } 
            // else {
            //     this.props.dispatch(FetchAvailableMember(this.state.id_bank))
            // }
        }
    }
    onClickPrev() {
        const {
            currentStep } = this.state;
        this.setState({
            currentStep: currentStep - 1,
        });
        if(currentStep===1){
            this.pengisianRefs.current.scrollIntoView({ block: 'end',  behavior: 'smooth' })
            this.setState({member_data:{}})
        } else if(currentStep===2){
            this.konfirmRefs.current.scrollIntoView({ block: 'end',  behavior: 'smooth' })
        }
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

    handleSubmit(num){
        // e.preventDefault();
        this.setState({pin:num})
        if(num.length===6&&this.valid){
            let data={};
            data['id_bank'] = this.state.bank.value;
            data['pin_member'] = num;
            data['amount'] = rmComma(this.state.amount);
            this.props.dispatch(postPenarikan(data));
            this.props.dispatch(ModalToggle(false));
            this.setState({
                pin:0,
                isModal:false
            })
        }
    }
    valid(){
        let data={};
        data['id_bank'] = this.state.bank.value;
        data['pin_member'] = this.state.pin;
        data['amount'] = rmComma(this.state.amount);
        if(isNaN(data['amount'])){
            ToastQ.fire({icon:'error',title:`silahkan masukan nominal anda`});
            return false;
        }
        else if(data['amount']<10000){
            ToastQ.fire({icon:'error',title:`Minimal nominal transfer adalah 10.000`});
            return false;
        }
        else if(this.state.bank.value===""||this.state.bank.value==="0"||this.state.bank.value===undefined){
            ToastQ.fire({icon:'error',title:`silahkan masukan data bank`});
            return false;
        }
        else if(this.state.pin===""||this.state.pin==="0"||this.state.pin===undefined){
            // ToastQ.fire({icon:'error',title:`silahkan masukan penerima`});
            return true;
        }
        else{
            return true;
        }
    }
    handleChangeImage(files) {
        if (files.status==='success'){
            this.setState({
                picture: files.base64
            })
        }
    };
    handleId(e){
        e.preventDefault()
        if(this.state.picture!==''&&this.state.picture!==undefined){
            this.props.dispatch(putMember({id_card:this.state.picture},this.props.auth.user.id))
        }
    }
    render(){
        const { steps, currentStep } = this.state;

        const blur = {
            WebkitFilter: 'blur(5px)',
            cursor:'no-drop',
            userSelect:'none'
        }

        console.log(this.props.auth.user.have_id);
        return(
            <Layout page={"Penarikan"} subpage="Wallet">
                <div className="row">
                    {this.props.auth.user.have_id===undefined||this.props.auth.user.have_id==false?
                    <div className="col-12 box-margin">
                        <div className="row">
                            {/* <div className="col-md-3 d-flex">
                                <div className="card h-100">
                                    <img className="img-fluid" src={this.state.picture} alt="img" onError={(e)=>{e.target.onerror = null; e.target.src=`${imgDefault}`}}  />
                                    <div className="card-body">
                                        <div className="row mb-30">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <File64
                                                        multiple={ false }
                                                        maxSize={2048} //in kb
                                                        fileType='png, jpg' //pisahkan dengan koma
                                                        className="form-control-file"
                                                        onDone={ this.handleChangeImage }
                                                        showPreview={false}
                                                        lang='id'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="font-11">Besar file: maksimum 2.000.000 bytes (2 Megabytes) Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-md-12">
                                <div className="jumbotron text-center">
                                    <div className="card-body">
                                        <h3>Untuk melakukan penarikan, kami harus memastikan bahwa anda bukan robot. Maka dari itu silahkan unggah foto identitas anda seperti KTP/SIM/KITAS dsb.</h3>
                                        {/* <div className="card-body"> */}
                                            <div className="row mb-30">
                                                <div className="col-md-4 offset-md-4">
                                                    <img className="img-fluid mb-2" src={this.state.picture} alt="img" onError={(e)=>{e.target.onerror = null; e.target.src=`${imgDefault}`}}  />
                                                    <div className="form-group">
                                                        <File64
                                                            multiple={ false }
                                                            maxSize={2048} //in kb
                                                            fileType='png, jpg' //pisahkan dengan koma
                                                            className="form-control-file"
                                                            onDone={ this.handleChangeImage }
                                                            showPreview={false}
                                                            lang='id'
                                                        />
                                                    </div>
                                                    {this.state.picture!==''?<button type="button" className="btn btn-outline-secondary btn-block" onClick={(e)=>this.handleId(e)}>SIMPAN</button>:''}
                                                </div>
                                            </div>
                                            <p className="font-11">Besar file: maksimum 2.000.000 bytes (2 Megabytes) Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    :
                    <div className="col-12 box-margin">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <Stepper steps={ steps } activeStep={ currentStep } />
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="row">
                                        <div className="col-md-4 d-flex">
                                            <div ref={this.pengisianRefs} className="card w-100" style={currentStep===0?null:this.state.bank!=={}&&this.state.bank.value!==undefined?blur:null}>
                                                <div className="card-body">
                                                <div className="row no-gutters">
                                                    <div className="w-100 h-100 bg-transparent" style={{position:'absolute',top:'0',left:'0',zIndex:'1', display:currentStep===0?'none':this.state.bank!=={}&&this.state.bank.value!==undefined?'':'none'}}/>
                                                        <div className="col-md-12">
                                                            {/* <label>Pilih nominal cepat</label> */}
                                                            <div className="card text-white text-center bg-success">
                                                            <div className="card-body">
                                                                <h4 className="text-white">IDR 200.000</h4>
                                                                <p className="card-text text-white">Saldo Tersedia</p>
                                                                <button
                                                                type="button"
                                                                className="btn btn-outline-success btn-rounded border-light text-white"
                                                                onClick={(event)=>this.handleClickPrice(event,1)}>TARIK SEMUA SALDO</button>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        {/* {
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
                                                        } */}
                                                        <div className="col-md-12">
                                                            <div className="form-group mt-3">
                                                                <label>Nominal</label>
                                                                <input type="text" className={"form-control"} name={"amount"} value={toCurrency(this.state.amount)} onChange={this.handleChange}/>
                                                                <small className="text-muted">Setiap penarikan akan dikenakan fee sebesar IDR 0,-</small>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            {/* <div className="form-group">
                                                                <label>Penerima</label>
                                                                <input type="text" className={"form-control"} name={"id_bank"} value={this.state.id_bank} onChange={this.handleChange}/>
                                                            </div> */}
                                                            <div className="form-group">
                                                                <label>Pilih Rekening Bank</label>
                                                                <Select
                                                                    defaultValue={this.state.bank_data[0]}
                                                                    options={this.state.bank_data}
                                                                    components={{ Option: IconOption }}
                                                                    onChange={this.HandleChangeBank}
                                                                    value={this.state.bank}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex">
                                            <div ref={this.konfirmRefs} className="card w-100" style={currentStep===1&&this.state.bank!=={}&&this.state.bank.value!==undefined&&!this.props.isLoadingAvail?null:blur}>
                                                <div className="card-body pb-0">
                                                    <div className="w-100 h-100 bg-transparent" style={{position:'absolute',top:'0',left:'0',zIndex:'1', display:currentStep===1&&this.state.bank!=={}&&this.state.bank.value!==undefined&&!this.props.isLoadingAvail?'none':''}}/>
                                                    <div className="text-center mb-30">
                                                        <h5>Konfirmasi Penarikan</h5>
                                                    </div>
                                                    {/* <div className="profile-thumb-contact text-center mb-4">
                                                        <div className="profile--tumb">
                                                            <img src={this.state.member_data!=={}&&this.state.member_data!==undefined?this.state.member_data.picture:noUser} alt="sangqu" />
                                                        </div>
                                                    </div> */}
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                        <h6 className="font-14 mb-0">
                                                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Bank Tujuan</small>
                                                        </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                        <span className="font-14">{this.state.bank!=={}&&this.state.bank!==undefined?this.state.bank.label:''}</span>
                                                        </div>
                                                    </div>
                                                    <hr className="my-3" />
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                        <h6 className="font-14 mb-0">
                                                            <i className="fa fa-circle-o mr-2 text-info" /><small className=" text-muted">Pemilik Bank</small>
                                                        </h6>
                                                        </div>
                                                        <div className="col-auto">
                                                        <span className="font-14">{this.state.bank!=={}&&this.state.bank!==undefined?this.state.bank.childLabel:''}</span>
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
                                                        <span className="font-14">{this.state.amount}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="card-footer bg-transparent border-0 pb-4">
                                                    <hr className="my-3" />
                                                    <div className="form-group m-0">
                                                        <label>PIN</label>
                                                            <input type="password" className="form-control" name="pin" value={this.state.pin} maxLength="6" onChange={this.handleChange}/>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex">
                                            <div ref={this.berhasilRefs} className="card w-100" style={currentStep===2&&this.state.isModal===false?null:blur}>
                                                <div className="card-body d-flex align-items-center">
                                                    <div className="w-100 h-100 bg-transparent" style={{position:'absolute',top:'0',left:'0',zIndex:'1', display:currentStep===2&&this.state.isModal===false?'none':''}}/>
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
                                                        <h5 className="mt-15">Penarikan {this.props.isLoadingPost?'sedang diproses':!this.props.isError?'Gagal':'Berhasil'}</h5>
                                                        <p className="mt-15 font-15 text-dark">Transaksi dengan nominal Rp. {toCurrency(this.state.amount)} yang ditujukan kepada Yth. Sdr/i {this.state.bank!=={}&&this.state.bank!==undefined?this.state.bank.childLabel:''} {this.props.isLoadingPost?'sedang diproses':!this.props.isError?'gagal diproses':'telah selesai'}.</p>
                                                        <hr/>
                                                        <small className="text-muted">Kami tidak bertanggung jawab atas kesalahan dalam menulisan sehingga menyebabkan terkirimnya bukan kepada tujuan yang anda tunjukan.</small>
                                                        <button type="button" className="btn btn-sm btn-outline-success mt-2" onClick={(e)=>{e.preventDefault();this.props.history.push({pathname:'/transaksi/riwayat'})}}>Lihat Riwayat</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4 w-100 position-sticky fixed-bottom">
                                        <div className="row justify-content-between">
                                            <div className="col-xs-3">
                                                <div class="form-group">
                                                    {currentStep===0||currentStep===2?'':this.state.bank!=={}&&this.state.bank.value!==undefined?<button type="button" className="btn btn-info btn-block" onClick={(e) => this.onClickPrev(e)}>KEMBALI</button>:''}
                                                </div>
                                            </div>
                                            <div className="col-xs-3">
                                                <div class="form-group">
                                                    {currentStep===2?'':<button type="button" className="btn btn-info btn-block" onClick={(e) => this.onClickNext(e)}>{currentStep===1?!this.props.isLoadingPost?this.props.isLoadingAvail?'Tunggu sebentar...':this.state.bank!=={}&&this.state.bank.label!==undefined?'PROSES':'SELANJUTNYA':'Mengirim data ...':'SELANJUTNYA'}</button>}
                                                    {currentStep===2?<button type="button" onClick={(e)=>{e.preventDefault();window.location.reload();}} className={"btn btn-primary btn-block"}>SELESAI</button>:''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                {
                    this.state.isModal?<ModalPin isLoading={this.props.isLoadingPost} code={this.state.pin} save={this.handleSubmit} typePage={'FormWalletTransfer'}/>:null
                }
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        resBank:state.bankMemberReducer.data,
        isLoadingBank:state.bankReducer.isLoading,
        isLoadingPost:state.penarikanReducer.isLoadingPost,
        isError:state.penarikanReducer.isError,
        isOpen: state.modalReducer,
    }
}


export default withRouter(connect(mapStateToProps)(IndexPenarikan));