import React, { Component } from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import imgCover from 'assets/cover.png';
import imgDefault from 'assets/default.png';
import File64 from "components/common/File64";
import { FetchDetailMember, putMember } from '../../../../redux/actions/member/member.action';
import {ToastQ, toRp} from 'helper'
import Swal from 'sweetalert2';
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import FormBankMember from "../../modals/member/bank_member/form_bank_member"
import FormAlamat from "../../modals/member/alamat/form_alamat"
import {
    deleteAlamat,
    getAlamat
} from "redux/actions/member/alamat.action";
import {
    deleteBankMember,
    getBankMember
} from "redux/actions/member/bankMember.action";
import Skeleton from 'react-loading-skeleton';
import { NOTIF_ALERT } from '../../../../redux/actions/_constants';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import Cropper from 'react-easy-crop'
import getCroppedImg from 'cropImage'
import StickyBox from "react-sticky-box";
import socketIOClient from "socket.io-client";
import {HEADERS} from 'redux/actions/_constants'
import Cookies from 'js-cookie'
const socket = socketIOClient(HEADERS.URL, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});
class IndexProfile extends Component{
    constructor(props){
        super(props);
        this.handleDetail    = this.handleDetail.bind(this);
        this.handleChange    = this.handleChange.bind(this);
        this.handleChangeImage    = this.handleChangeImage.bind(this);
        this.handleSubmit    = this.handleSubmit.bind(this);
        this.handleDeleteAlamat    = this.handleDeleteAlamat.bind(this);
        this.handleDeleteBank    = this.handleDeleteBank.bind(this);
        this.handleModalAlamat    = this.handleModalAlamat.bind(this);
        this.handleModalBank    = this.handleModalBank.bind(this);
        this.handleSearchAlamat    = this.handleSearchAlamat.bind(this);
        this.handleSearchBank    = this.handleSearchBank.bind(this);
        this.handleSubmitFoto    = this.handleSubmitFoto.bind(this);
        this.onCropComplete    = this.onCropComplete.bind(this);
        this.handleLoadMoreAlamat    = this.handleLoadMoreAlamat.bind(this);
        this.handleLoadMoreBank    = this.handleLoadMoreBank.bind(this);
        this.handleAutoWd    = this.handleAutoWd.bind(this);
        this.showPin    = this.showPin.bind(this);
        this.alamatInnerRef = React.createRef();
        this.bankInnerRef = React.createRef();
        this.state = {
            showPin:false,
            isEdit:false,
            editFoto:false,
            member_detail:{},
            full_name:'',
            picture:'',
            pin:'',
            password:'',
            re_password:'',
            any_alamat:'',
            any_bank:'',
            autoWd:false,
            cropped:'',
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 1 / 1,
        }
        
        socket.on('refresh_dashboard',(data)=>{
            this.refreshData(atob(Cookies.get('sangqu_exp')));
        })
       
        socket.on("set_dashboard", (data) => {
            console.log("set_dashboard",data);
           this.setState({
               load_socket:false,
               autoWd: data.auto_wd,
           })
        });

    }
    componentDidUpdate(prevState){
        if(prevState.auth.user.id!==this.props.auth.user.id){
            // let page=localStorage.page_pin;
            this.props.dispatch(FetchDetailMember(this.props.auth.user.id));
        }
    }
    componentWillMount(){
        this.refreshData(atob(Cookies.get('sangqu_exp')));
        this.props.dispatch(getAlamat(`page=1`));
        this.props.dispatch(getBankMember(`page=1`));
        if(this.props.auth.user.id!==undefined){
            this.props.dispatch(FetchDetailMember(this.props.auth.user.id));
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            full_name:nextProps.auth.user.full_name,
            picture:nextProps.auth.user.picture,
            member_detail:nextProps.data_member,
        })
    }

    onCropChange = crop => {
        this.setState({ crop })
    }
    showPin(e){
        e.preventDefault()
        this.setState({ showPin:!this.state.showPin })
    }

    
    refreshData(id){
        socket.emit('get_dashboard', {id_member:id})
        socket.emit('get_notif', {id_member:id})
    }
    onCropComplete = (croppedArea, croppedAreaPixels) => {
    // 
    var that = this
    try {
            let res = ''
            const croppedImage = getCroppedImg(
                this.state.picture,
                croppedAreaPixels
            )
            Promise.resolve(croppedImage).then(function(value) {
                let getRes = ''
                
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        getRes = reader.result
                        that.setState({cropped:reader.result})
                        // 
                    };
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', value);
                xhr.responseType = 'blob';
                xhr.send();
                res = getRes
                
            })
            // setCroppedImage(croppedImage)
            
            this.setState({cropped:res})
        } catch (e) {
            console.error(e)
        }
    }

    onZoomChange = zoom => {
    this.setState({ zoom })
    }

    handleChangeImage(files) {
        if (files.status==='success'){
            // this.props.dispatch(putMember({picture:files.base64},this.props.auth.user.id))
            this.setState({
                picture: files.base64
            })
        }
    };

    handleDetail(e,i){
        e.preventDefault();
        alert(i);
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }
    toggleEdit(e){
        e.preventDefault()
        this.setState({isEdit:!this.state.isEdit});
    }
    toggleEditFoto(e){
        e.preventDefault()
        this.setState({editFoto:!this.state.editFoto});
    }
    handleSubmitFoto(e){
        e.preventDefault()
        this.props.dispatch(putMember({picture:this.state.cropped},this.props.auth.user.id))
    }
    handleSubmit(e){
        e.preventDefault()
        let param = {}
        param['full_name'] = this.state.full_name
        param['pin'] = parseInt(this.state.pin,10)
        param['password'] = this.state.password

        if(param.full_name===''){
            delete param.full_name
        }
        if(param.pin===''){
            delete param.pin
        }
        if(param.password===''){
            delete param.password
        } else {
            if(this.state.re_password===''){
                ToastQ.fire({icon:'danger',title:`Ulangi katasandi belum diisi`});
            } else if(this.state.re_password!==param.password){
                ToastQ.fire({icon:'danger',title:`Ulangi katasandi dan katasandi tidak sesuai`});
            }
        }
        Swal.fire({
            title: 'Informasi!',
            text: "Pastikan data yang akan diubah telah benar.",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Lanjut, Ubah',
            cancelButtonText: 'Batal'
        }).then(function(result){
            if (result.value) {
                this.props.dispatch(putMember(param,this.props.auth.user.id))
            }
        }.bind(this))
    }
    handleSearchAlamat(e){
        e.preventDefault();
        let where = "";
        let any = this.state.any_alamat;
        if(any!==null&&any!==undefined&&any!==""){
            where+=`q=${any}`;
            this.props.dispatch(getAlamat(where));
        }
    }
    handleSearchBank(e){
        e.preventDefault();
        let where = "";
        let any = this.state.any_bank;
        if(any!==null&&any!==undefined&&any!==""){
            where+=`q=${any}`;
            this.props.dispatch(getBankMember(where));
        }
    }
    handleModalBank(e,i){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("FormBankMember"));
        if(i!==''){
            
            this.setState({detail:{

                "id":this.props.data_bank.data[i].id,
                "bank_name":this.props.data_bank.data[i].bank_name,
                "acc_name":this.props.data_bank.data[i].acc_name,
                "acc_no": this.props.data_bank.data[i].acc_no,
            }});
        }
        else{
            this.setState({detail:{id:""}});
        }

    }

    handleDeleteBank(e,id){
        e.preventDefault();
        Swal.fire({
            title: 'Perhatian !!!',
            text: `Anda yakin akan menghapus data ini ??`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Oke, Hapus`,
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(deleteBankMember(id));
            }
        })
    }


    handleModalAlamat(e,i){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formAlamat"));
        if(i!==''){
            this.setState({detail:{
                "id":this.props.data_alamat.data[i].id,
                "id_member":this.props.data_alamat.data[i].id_member,
                "title":this.props.data_alamat.data[i].title,
                "penerima":this.props.data_alamat.data[i].penerima,
                "main_address": this.props.data_alamat.data[i].main_address,
                "kd_prov":this.props.data_alamat.data[i].kd_prov,
                "kd_kota":this.props.data_alamat.data[i].kd_kota,
                "kd_kec": this.props.data_alamat.data[i].kd_kec,
                "no_hp": this.props.data_alamat.data[i].no_hp,
                "ismain": this.props.data_alamat.data[i].ismain,
            }});
        }
        else{
            this.setState({detail:{id:"",isMain:this.props.data_alamat.length>0?0:1}});
        }

    }

    handleDeleteAlamat(e,id){
        e.preventDefault();
        Swal.fire({
            title: 'Perhatian !!!',
            text: `Anda yakin akan menghapus data ini ??`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Oke, Hapus`,
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(deleteAlamat(id));
            }
        })
    }

    handleLoadMoreAlamat(){
        if (this.alamatInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = this.alamatInnerRef.current;
            if (parseInt(scrollTop,10) + parseInt(clientHeight,10) === parseInt(scrollHeight,10)) {
              // TO SOMETHING HERE
                
                let perpage = parseInt(this.props.data_alamat.per_page,10);
                let lengthData = parseInt(this.props.data_alamat.total,10);
                if(perpage===lengthData || perpage<lengthData){
                    let where = '';
                    if(perpage!==undefined&&perpage!==null&&perpage!==''){
                        where+=`page=1&perpage=${perpage+10}`
                    }
                    this.props.dispatch(getAlamat(where));
                }
                else{
                    Swal.fire({allowOutsideClick: false,
                        title: 'Perhatian',
                        icon: 'warning',
                        text: 'Tidak ada data.',
                    });
                }
            }
        }
    }
    handleLoadMoreBank(){
        if (this.bankInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = this.bankInnerRef.current;
            if (parseInt(scrollTop,10) + parseInt(clientHeight,10) === parseInt(scrollHeight,10)) {
              // TO SOMETHING HERE
                
                let perpage = parseInt(this.props.data_bank.per_page,10);
                let lengthData = parseInt(this.props.data_bank.total,10);
                if(perpage===lengthData || perpage<lengthData){
                    let where = '';
                    if(perpage!==undefined&&perpage!==null&&perpage!==''){
                        where+=`page=1&perpage=${perpage+10}`
                    }
                    this.props.dispatch(getBankMember(where));
                }
                else{
                    Swal.fire({allowOutsideClick: false,
                        title: 'Perhatian',
                        icon: 'warning',
                        text: 'Tidak ada data.',
                    });
                }
            }
        }
    }

    handleAutoWd(e){
        // e.preventDefault();
        Swal.fire({
            title: 'Informasi!',
            text: this.state.autoWd?'Matikan Auto WD?':'Nyalakan Auto WD',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Proses',
            cancelButtonText: 'Batal'
        }).then(function(result){
            if (result.value) {
                this.props.dispatch(putMember({auto_wd:this.state.autoWd?0:1},this.props.auth.user.id))
                this.setState({
                    autoWd:!this.state.autoWd
                })
            }
        }.bind(this))
    }

    render(){
        
        const {
            saldo,
            sponsor,
            left_pv,
            right_pv,
            total_payment,
            membership,
            jenjang_karir,
            pin,
        } = this.state.member_detail
        return(
            <Layout page="Profile">
                <div className="row">
                    <div className="col-12">
                        <div className="profile-header-area mb-130">
                        <div className="card border-none bg-transparent shadow-none">
                            <div className="thumb bg-img height-300" style={{backgroundImage: `url(${imgCover})`,backgroundPosition:'bottom'}}>
                            </div>
                            <div className="row" style={{marginTop:'-100px', marginBottom:'-100px', zIndex:'1'}}>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.state.editFoto===false?
                                            <div className="card box-margin">
                                                <div className="text-center p-4" >
                                                    <img className="img-fluid rounded-circle shadow mb-3 w-100" alt="sangqu" src={this.state.picture!==''?this.state.picture:this.props.auth.user.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${imgDefault}`}}  />
                                                    <button type="button" className="btn btn-outline-secondary btn-sm btn-rounded font-11 mb-2" onClick={(e)=>this.toggleEditFoto(e)}><i className="fa fa-pencil" /> Ubah Foto</button>
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="font-20 mb-0">{this.props.auth.user.full_name}</h5>
                                                    <p className="mb-2">{this.props.auth.user.referral_code}</p>
                                                </div>
                                            </div>
                                            :
                                            <>
                                            <div className="card box-margin w-100" style={{height:'400px'}}>
                                                <Cropper
                                                    image={this.state.picture}
                                                    crop={this.state.crop}
                                                    zoom={this.state.zoom}
                                                    aspect={this.state.aspect}
                                                    cropShape="round"
                                                    showGrid={false}
                                                    onCropChange={this.onCropChange}
                                                    onCropComplete={this.onCropComplete}
                                                    onZoomChange={this.onZoomChange}
                                                />
                                            </div>
                                            <div className="card box-margin">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="text-center p-4" >
                                                            <div className="form-group">
                                                                <File64
                                                                    multiple={ false }
                                                                    maxSize={2048} //in kb
                                                                    fileType='png,jpg' //pisahkan dengan koma
                                                                    className="form-control-file"
                                                                    onDone={ this.handleChangeImage }
                                                                    showPreview={false}
                                                                    lang='id'
                                                                    // previewLink={this.state.prev}
                                                                    // previewConfig={{
                                                                    //     width:'200px',
                                                                    //     height: '200px'
                                                                    // }}
                                                                />
                                                            </div>
                                                            <p className="font-11">Besar file: maksimum 2.000.000 bytes (2 Megabytes) Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="row pr-4 pl-4 pb-4">
                                                            <div className="col-md-6">
                                                                <button className="btn btn-outline-danger btn-block btn-rounded" type="button" onClick={(e)=>this.toggleEditFoto(e)}>Batal</button>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <button className="btn btn-outline-primary btn-block btn-rounded" type="button" onClick={(e)=>this.handleSubmitFoto(e)}>Simpan</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </>
                                            }
                                        </div>
                                    </div>
                                    
                                    <StickyBox offsetTop={100} offsetBottom={20}>
                                            <div className="card box-margin">
                                                    <div className="card-body">
                                                        <div className="form-inline d-flex justify-content-between">
                                                            <h4>Ubah data diri</h4>
                                                            <button type="button" className="btn btn-outline-dark" onClick={(e)=>this.toggleEdit(e)} disabled={this.state.isEdit}><i className="zmdi zmdi-edit"></i></button>
                                                        </div>
                                                        <div className="personal-information mt-30">
                                                            <div className="name-text">
                                                                <form>
                                                                    <table border="0" width="100%">
                                                                        <thead>
                                                                            <tr>
                                                                                <td width="35%"></td>
                                                                                <td width="65%"></td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><h6 className="font-14"><span className="text-muted">Nama Lengkap</span></h6></td>
                                                                                <td>
                                                                                    <div className="form-group">
                                                                                        <input
                                                                                            className="form-control"
                                                                                            type="text"
                                                                                            style={{padding: '9px',fontWeight:'bolder'}}
                                                                                            name="full_name"
                                                                                            defaultValue={this.state.full_name}
                                                                                            readOnly={!this.state.isEdit}
                                                                                            onChange={(e) => this.handleChange(e)}/>
                                                                                    </div>
                                                                                </td>
                                                                                {/* <td><h6 className="font-14">: {parseFloat(active_balance).toFixed(8)}</h6></td> */}
                                                                            </tr>
                                                                            <tr>
                                                                                <td><h6 className="font-14"><span className="text-muted">PIN</span></h6></td>
                                                                                <td>
                                                                                    <div className="form-group">
                                                                                        <div className="input-group mb-3">
                                                                                            <input
                                                                                                className="form-control"
                                                                                                type={this.state.showPin?"text":"password"}
                                                                                                style={{padding: '9px',fontWeight:'bolder'}}
                                                                                                name="pin"
                                                                                                defaultValue=""
                                                                                                maxLength="6"
                                                                                                readOnly={!this.state.isEdit}
                                                                                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                                                                                onChange={(e) => this.handleChange(e)}/>
                                                                                            <div className="input-group-append">
                                                                                                <button type="button" className="btn btn-outline-dark" onClick={(e)=>this.showPin(e)}><i className={`zmdi zmdi-eye${this.state.showPin?'':'-off'}`}></i></button>
                                                                                            </div>
                                                                                            <small id="passwordHelpBlock" class="form-text text-muted">
                                                                                                Kosongkan jika tidak akan di update.
                                                                                            </small>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                {/* <td><h6 className="font-14">: {parseFloat(investment).toFixed(8)}</h6></td> */}
                                                                            </tr>
                                                                        </tbody>
                                                                        <tfoot>
                                                                            <tr>
                                                                                <td colSpan="2" className="text-right">
                                                                                    {/* <button type="reset" className="btn btn-danger">BATAL</button>&nbsp; */}
                                                                                    <button type="button" className="btn btn-primary" onClick={(e)=>this.handleSubmit(e)} disabled={!this.state.isEdit}>SIMPAN</button>
                                                                                </td>
                                                                            </tr>
                                                                        </tfoot>
                                                                    </table>
                                                                </form>
                                                                {/* <h6 className="font-14"><span className="text-muted">Active Balace :</span> {parseFloat(active_balance).toFixed(8)}</h6>
                                                                <h6 className="font-14"><span className="text-muted">Investment :</span> {parseFloat(investment).toFixed(8)}</h6>
                                                                <h6 className="font-14"><span className="text-muted">Payment :</span> {parseFloat(payment).toFixed(8)}</h6>
                                                                <h6 className="font-14"><span className="text-muted">Referral Code :</span> {kd_referral}</h6>
                                                                <h6 className="font-14"><span className="text-muted">Address :</span> {address}</h6> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </StickyBox>
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-12">
                                        <div className="card box-margin">
                                                <div className="card-body">
                                                    <div className="form-inline d-flex justify-content-between mb-30">
                                                        <div>
                                                            <p className="text-muted m-0">Membership</p>
                                                            <h5 className="text-black">{membership}</h5>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted m-0">Auto WD</p>
                                                            {/* <h5 className="text-black">{membership}</h5> */}
                                                                {/* <div className="card h-100 box-margin">
                                                                    <div className="card-body">
                                                                        <div className="d-flex justify-content-between align-items-center p-1">
                                                                            <p class="p-0 m-0">AUTO WITHDRAW</p>
                                                                        <div className="d-flex justify-content-start align-items-center" > */}
                                                                        <div className="new-checkbox">
                                                                                    <label className="switch m-0">
                                                                                        <input type="checkbox" checked={this.state.autoWd} onChange={(e)=>this.handleAutoWd(e)} />
                                                                                        <span className="slider rounded-lg"></span>
                                                                                    </label>
                                                                        </div>
                                                                                {/* </div>
                                                                        </div>
                                                                    </div>
                                                                </div> */}
                                                        </div>
                                                        {/* <a className="user-avatar text-right" href={()=>null}><img src="http://ptnetindo.com:6694/badge/executive.png" alt="user" className="img-fluid w-50" /> </a> */}
                                                    </div>
                                                    <div className="form-inline d-flex justify-content-between w-50 mb-30">
                                                        <div>
                                                            <p className="text-muted m-0">Jenjang Karir</p>
                                                            <h5 className="text-black">{jenjang_karir}</h5>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted m-0">Saldo</p>
                                                            <h5 className="text-black">{toRp(saldo)}</h5>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted m-0">Total Pembayaran</p>
                                                            <h5 className="text-black">{toRp(total_payment)}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="card bg-transparent border img-thumbnail p-4 shadow-none">
                                                        <div className="row form-inline d-flex justify-content-between">
                                                            <div className="col-md-3 border-right">
                                                                <p className="text-muted m-0">
                                                                    <span className="circle bg-primary-soft mr-2" style={{width: '25px', height: '25px', lineHeight: '25px', float: 'left'}}><i className="fa fa-user" aria-hidden="true" style={{}} /></span>
                                                                    Total Sponsor
                                                                </p>
                                                                <h5 className="text-black">{sponsor}</h5>
                                                            </div>
                                                            <div className="col-md-3 border-right">
                                                                <p className="text-muted m-0">
                                                                    <span className="circle bg-warning-soft mr-2" style={{width: '25px', height: '25px', lineHeight: '25px', float: 'left'}}><i className="fa fa-shield" aria-hidden="true" style={{}} /></span>
                                                                    PIN Tersedia
                                                                </p>
                                                                <h5 className="text-black">{pin}</h5>
                                                            </div>
                                                            <div className="col-md-3 border-right">
                                                                <p className="text-muted m-0">
                                                                    <span className="circle bg-success-soft mr-2" style={{width: '25px', height: '25px', lineHeight: '25px', float: 'left'}}><i className="fa fa-arrow-left" aria-hidden="true" style={{}} /></span>
                                                                    PV Kiri
                                                                </p>
                                                                <h5 className="text-black">{left_pv}</h5>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <p className="text-muted m-0">
                                                                    <span className="circle bg-danger-soft mr-2" style={{width: '25px', height: '25px', lineHeight: '25px', float: 'left'}}><i className="fa fa-arrow-right" aria-hidden="true" style={{}} /></span>
                                                                    PV Kanan
                                                                </p>
                                                                <h5 className="text-black">{right_pv}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="card box-margin">
                                                <div className="card-body">
                                                    <div className="form-inline d-flex justify-content-between">
                                                        <h4>Alamat Saya</h4>
                                                        <div className="d-flex">
                                                        <div className="input-group mr-2">
                                                            <input type="text" className="form-control" name="any_alamat" value={this.state.any_alamat} onChange={(e) => this.handleChange(e)} placeholder="Cari data Alamat" aria-label="Cari data Alamat" aria-describedby="basic-addon2" />
                                                            <div className="input-group-append">
                                                                <button className="btn btn-outline-dark" type="button" onClick={(e)=>this.handleSearchAlamat(e)}><i className="zmdi zmdi-search"/></button>
                                                            </div>
                                                        </div>
                                                        <button type="button" className="btn btn-outline-dark" onClick={(e)=>this.handleModalAlamat(e,'')}><i className="zmdi zmdi-plus"></i></button>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="p-2" style={{maxHeight:'500px', minHeight:'auto',overflow:'auto'}} onScroll={() => this.handleLoadMoreAlamat()} ref={this.alamatInnerRef}>
                                                    {
                                                        typeof this.props.data_alamat.data === 'object' ? this.props.data_alamat.data.length > 0 ?
                                                            this.props.data_alamat.data.map((v, i) => {
                                                                return (
                                                                    <div className="card p-3 mb-2">
                                                                    <div className="d-flex align-items-center justify-content-between">
                                                                    <div className="d-flex align-items-center mr-3">
                                                                    <div className="mr-3">
                                                                        <UncontrolledButtonDropdown>
                                                                            <DropdownToggle  className="bg-primary border-none rounded font-22">
                                                                                <i className="zmdi zmdi-more"></i>
                                                                            </DropdownToggle>
                                                                        <DropdownMenu>
                                                                            <DropdownItem  onClick={(e)=>this.handleModalAlamat(e,i)}><i className="ti-pencil-alt"></i> Edit</DropdownItem>
                                                                            <DropdownItem onClick={(e)=>this.handleDeleteAlamat(e,v.id)}><i className="ti-trash"></i> Delete</DropdownItem>
                                                                        </DropdownMenu>
                                                                        </UncontrolledButtonDropdown>
                                                                    </div>
                                                                        <div className="user-text-table">
                                                                        <h6 className="d-inline-block font-20 mb-0">{v.title} - {v.penerima}</h6>
                                                                        <p className="mb-0">{v.main_address}</p>
                                                                        </div>
                                                                    </div>
                                                                    <span className="bg-secondary p-1 rounded text-white">{v.no_hp}</span>
                                                                    </div>
                                                                    </div>
                                                                );
                                                            })
                                                            :(()=>{
                                                                let container =[];
                                                                for(let x=0; x<10; x++){
                                                                    container.push(
                                                                        <div key={x} className="card p-3 mb-2">
                                                                            <div className="d-flex align-items-center justify-content-between">
                                                                            <div className="d-flex align-items-center mr-3">
                                                                            <div className="mr-3">
                                                                                <Skeleton height={50} width={50}/>
                                                                            </div>
                                                                                <div className="user-text-table">
                                                                                <h6 className="d-inline-block font-20 mb-0"><Skeleton width={50}/></h6>
                                                                                <p className="mb-0"><Skeleton width={80}/></p>
                                                                                </div>
                                                                            </div>
                                                                            <Skeleton width={50}/>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                                return container;
                                                            })()
                                                            : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" />


                                                    }
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="card box-margin">
                                                <div className="card-body">
                                                    <div className="form-inline d-flex justify-content-between">
                                                        <h4>Bank Saya</h4>
                                                        <div className="d-flex">
                                                        <div className="input-group mr-2">
                                                            <input type="text" className="form-control" name="any_bank" value={this.state.any_bank} onChange={(e) => this.handleChange(e)} placeholder="Cari data Bank" aria-label="Cari data Bank" aria-describedby="basic-addon2" />
                                                            <div className="input-group-append">
                                                                <button className="btn btn-outline-dark" type="button" onClick={(e)=>this.handleSearchBank(e)}><i className="zmdi zmdi-search"/></button>
                                                            </div>
                                                        </div>
                                                        <button type="button" className="btn btn-outline-dark" onClick={(e)=>this.handleModalBank(e,'')} ><i className="zmdi zmdi-plus"></i></button>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row justify-content-center d-flex" style={{maxHeight:'500px', minHeight:'auto',overflow:'auto'}} onScroll={() => this.handleLoadMoreBank()} ref={this.bankInnerRef}>
                                                    {
                                                        typeof this.props.data_bank.data === 'object' ? this.props.data_bank.data.length > 0 ?
                                                            this.props.data_bank.data.map((v, i) => {
                                                                return (
                                                                    <div className="col-md-6 box-margin">
                                                                    <div className="card p-4 h-100">
                                                                    <div className="d-flex align-items-center justify-content-between">
                                                                    <div className="d-flex align-items-center mr-3">
                                                                    <div className="mr-3">
                                                                        <UncontrolledButtonDropdown>
                                                                            <DropdownToggle  className="bg-primary border-none rounded font-22">
                                                                                <i className="zmdi zmdi-more"></i>
                                                                            </DropdownToggle>
                                                                        <DropdownMenu>
                                                                            <DropdownItem  onClick={(e)=>this.handleModalBank(e,i)}><i className="ti-pencil-alt"></i> Edit</DropdownItem>
                                                                            <DropdownItem onClick={(e)=>this.handleDeleteBank(e,v.id)}><i className="ti-trash"></i> Delete</DropdownItem>
                                                                        </DropdownMenu>
                                                                        </UncontrolledButtonDropdown>
                                                                    </div>
                                                                        <div className="user-text-table">
                                                                        <h6 className="d-inline-block font-20 mb-0">{v.bank_name}</h6>
                                                                        <p className="mb-0">{v.acc_name}</p>
                                                                        </div>
                                                                    </div>
                                                                    <span className="bg-secondary p-1 rounded text-white">{v.acc_no}</span>
                                                                    </div>
                                                                    </div>
                                                                    </div>
                                                                );
                                                            })
                                                            :(()=>{
                                                                let container =[];
                                                                for(let x=0; x<10; x++){
                                                                    container.push(
                                                                        <div key={x} className="col-md-6">
                                                                        <div className="card p-4 box-margin">
                                                                            <div className="d-flex align-items-center justify-content-between">
                                                                            <div className="d-flex align-items-center mr-3">
                                                                            <div className="mr-3">
                                                                                <Skeleton height={50} width={50}/>
                                                                            </div>
                                                                                <div className="user-text-table">
                                                                                <h6 className="d-inline-block font-20 mb-0"><Skeleton width={50}/></h6>
                                                                                <p className="mb-0"><Skeleton width={80}/></p>
                                                                                </div>
                                                                            </div>
                                                                            <Skeleton width={50}/>
                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                    )
                                                                }
                                                                return container;
                                                            })()
                                                            : <img src={NOTIF_ALERT.NO_DATA} alt="sangqu" />


                                                    }
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-4 d-none">
                        <div className="card">
                            <img className="img-fluid" src={this.state.picture} alt="img" onError={(e)=>{e.target.onerror = null; e.target.src=`${imgDefault}`}}  />
                            <div className="card-body">
                                <div className="row mb-30">
                                    <div className="col-12">
                                    {/* <Cropper
                                        image={this.state.picture}
                                        crop={this.state.crop}
                                        zoom={this.state.zoom}
                                        aspect={this.state.aspect}
                                        onCropChange={this.onCropChange}
                                        onCropComplete={this.onCropComplete}
                                        onZoomChange={this.onZoomChange}
                                    /> */}
                                        {/* <input type="file" hidden ref={this.inputReference} onChange={this.fileUploadInputChange} /> */}
                                        <div className="form-group">
                                            {/* <label htmlFor="inputState" className="col-form-label">Logo {this.props.data_detail!==undefined?<small>(kosongkan apabila tidak ada perubahan.)</small>:""}</label><br/> */}
                                            <File64
                                                multiple={ false }
                                                maxSize={2048} //in kb
                                                fileType='png, jpg' //pisahkan dengan koma
                                                className="form-control-file"
                                                onDone={ this.handleChangeImage }
                                                showPreview={false}
                                                lang='id'
                                                // previewLink={this.state.prev}
                                                // previewConfig={{
                                                //     width:'200px',
                                                //     height: '200px'
                                                // }}
                                            />
                                            {/* <div className="invalid-feedback" style={this.state.error.logo!==""?{display:'block'}:{display:'none'}}>
                                                {this.state.error.logo}
                                            </div> */}
                                        </div>
                                        {/* <a href={() => false} className="btn text-uppercase border btn-block btn-outline-secondary" onClick={this.fileUploadAction}>Unggah Gambar</a> */}
                                    </div>
                                </div>
                                <p className="font-11">Besar file: maksimum 2.000.000 bytes (2 Megabytes) Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8 box-margin d-none">
                        <div className="card box-margin">
                            <div className="card-body">
                                <div className="form-inline d-flex justify-content-between">
                                    <h4>Ubah data diri</h4>
                                    <button type="button" className="btn btn-outline-dark" onClick={(e)=>this.toggleEdit(e)} disabled={this.state.isEdit}><i className="zmdi zmdi-edit"></i></button>
                                </div>
                            <div className="personal-information mt-30">
                                <div className="name-text">
                                    <form>
                                        <table border="0" width="100%">
                                            <thead>
                                                <tr>
                                                    <td width="35%"></td>
                                                    <td width="65%"></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><h6 className="font-14"><span className="text-muted">Nama Lengkap</span></h6></td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                style={{padding: '9px',fontWeight:'bolder'}}
                                                                name="full_name"
                                                                defaultValue={this.state.full_name}
                                                                readOnly={!this.state.isEdit}
                                                                onChange={(e) => this.handleChange(e)}/>
                                                        </div>
                                                    </td>
                                                    {/* <td><h6 className="font-14">: {parseFloat(active_balance).toFixed(8)}</h6></td> */}
                                                </tr>
                                                <tr>
                                                    <td><h6 className="font-14"><span className="text-muted">PIN</span></h6></td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                style={{padding: '9px',fontWeight:'bolder'}}
                                                                name="pin"
                                                                defaultValue=""
                                                                readOnly={!this.state.isEdit}
                                                                onChange={(e) => this.handleChange(e)}/>
                                                        </div>
                                                    </td>
                                                    {/* <td><h6 className="font-14">: {parseFloat(investment).toFixed(8)}</h6></td> */}
                                                </tr>
                                                <tr>
                                                    <td colSpan="2">
                                                        <hr/>
                                                        <label className="font-11 text-danger">Kosongkan kolom apabila katasandi tidak akan diubah!</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><h6 className="font-14"><span className="text-muted">Katasandi</span></h6></td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                style={{padding: '9px',fontWeight:'bolder'}}
                                                                name="password"
                                                                defaultValue=""
                                                                readOnly={!this.state.isEdit}
                                                                onChange={(e) => this.handleChange(e)}/>
                                                        </div>
                                                    </td>
                                                    {/* <td><h6 className="font-14">: {parseFloat(payment).toFixed(8)}</h6></td> */}
                                                </tr>
                                                <tr>
                                                    <td><h6 className="font-14"><span className="text-muted">Ulangi katasandi</span></h6></td>
                                                    <td>
                                                        <div className="form-group">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                style={{padding: '9px',fontWeight:'bolder'}}
                                                                name="confirm_password"
                                                                defaultValue=""
                                                                readOnly={!this.state.isEdit}
                                                                onChange={(e) => this.handleChange(e)}/>
                                                        </div>
                                                    </td>
                                                    {/* <td><h6 className="font-14">: {kd_referral}</h6></td> */}
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="2" className="text-right">
                                                        {/* <button type="reset" className="btn btn-danger">BATAL</button>&nbsp; */}
                                                        <button type="button" className="btn btn-primary" onClick={(e)=>this.handleSubmit(e)} disabled={!this.state.isEdit}>SIMPAN</button>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </form>
                                    {/* <h6 className="font-14"><span className="text-muted">Active Balace :</span> {parseFloat(active_balance).toFixed(8)}</h6>
                                    <h6 className="font-14"><span className="text-muted">Investment :</span> {parseFloat(investment).toFixed(8)}</h6>
                                    <h6 className="font-14"><span className="text-muted">Payment :</span> {parseFloat(payment).toFixed(8)}</h6>
                                    <h6 className="font-14"><span className="text-muted">Referral Code :</span> {kd_referral}</h6>
                                    <h6 className="font-14"><span className="text-muted">Address :</span> {address}</h6> */}
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <ModalProfile detail={this.props.detail} auth={this.props.auth} param={(arr)=>this.props.history.push(arr)}/> */}
                {
                    this.props.isOpen===true?<FormBankMember
                        detail={this.state.detail}
                    />:null
                }
                {
                    this.props.isOpen===true?<FormAlamat
                        detail={this.state.detail}
                    />:null
                }
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        isLoadingAlamat: state.alamatReducer.isLoading,
        data_alamat:state.alamatReducer.data,
        isLoadingBank: state.bankMemberReducer.isLoading,
        data_bank:state.bankMemberReducer.data,
        data_member:state.memberReducer.data_detail_member,
        isOpen:state.modalReducer,
    }
}
export default connect(mapStateToProps)(IndexProfile);