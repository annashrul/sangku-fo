import React,{Component} from 'react';
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
import {stringifyFormData} from "helper";
import File64 from "components/common/File64";
import { Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs';
import { FetchDetailPin } from '../../../../../redux/actions/pin/pin.action';
import Spinner from 'Spinner'
import Preloader from 'Preloader'
import { createMember } from '../../../../../redux/actions/authActions';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
class MemberForm extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLevel = this.handleLevel.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.state = {
            full_name:'',
            mobile_no:'',
            id_card:'-',
            pin:'-',
            picture:'-',
            membership:'3a385e1d-21f7-4c73-9554-c818f0078c6f',
            device_id:'-',
            signup_source:'website',
            sponsor:'-',
            upline:'SK5711868832',
            pin_regist:'',
            prev:'',
            confirm:false,
            error:{
                full_name:'',
                mobile_no:'',
                id_card:'',
                pin:'',
                picture:'',
                membership:'',
                device_id:'',
                signup_source:'',
                sponsor:'',
                upline:'',
                pin_regist:'',
                prev:'',}
        };
        this.handleMembership = this.handleMembership.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    getProps(param){
        this.setState({sponsor:param.auth.user.referral_code})
    }
    componentWillMount(){
        this.getProps(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.getProps(nextProps);
    }
    handleLevel(val) {
        let err = Object.assign({}, this.state.error, {level: ""});
        this.setState({
            level: val.value,
            error: err
        });
    }
    handleChange = (event) => {

        this.setState({ [event.target.name]: event.target.value });
        let err = Object.assign({}, this.state.error, {[event.target.name]: ""});
        this.setState({error: err});
    };
    toggle(e){
        e.preventDefault();
        if(e.target.id==='cancel'){
            window.location.reload();
        } else {
            this.setState({confirm:!this.state.confirm})
        }
    };

    handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        let data = new FormData(form);
        let parseData = stringifyFormData(data);
        parseData['full_name'] = this.state.full_name;
        parseData['mobile_no'] = this.state.mobile_no;
        parseData['id_card'] = this.state.id_card;
        parseData['pin'] = this.state.pin;
        parseData['picture'] = this.state.picture;
        // parseData['membership'] = this.state.membership;
        parseData['device_id'] = this.state.device_id;
        parseData['signup_source'] = this.state.signup_source;
        parseData['sponsor'] = this.state.sponsor;
        parseData['upline'] = this.state.upline;
        parseData['pin_regist'] = this.state.pin_regist===''?'':JSON.parse(this.state.pin_regist).kode;
        let err = this.state.error;
        
        console.log("dddddddddddddddd",parseData)

        if(parseData['full_name']===''||parseData['full_name']===undefined){
            err = Object.assign({}, err, {full_name:"Nama lengkap tidak boleh kosong"});
            this.setState({confirm:false, error: err});
        }
        else if(parseData['mobile_no']===''||parseData['mobile_no']===undefined){
            err = Object.assign({}, err, {mobile_no:"No Telpon tidak boleh kosong"});
            this.setState({confirm:false, error: err});
        }
        else if(parseData['id_card']===''||parseData['id_card']===undefined){
            err = Object.assign({}, err, {id_card:"ID Card tidak boleh kosong"});
            this.setState({confirm:false, error: err});
        }
        else if(parseData['pin']===''||parseData['pin']===undefined){
            err = Object.assign({}, err, {pin:"PIN tidak boleh kosong"});
            this.setState({confirm:false, error: err});
        }
        else if(parseData['picture']===''||parseData['picture']===undefined){
            err = Object.assign({}, err, {picture:"Gambar tidak boleh kosong"});
            this.setState({confirm:false, error: err});
        }
        // else if(parseData['membership']===''||parseData['membership']===undefined){
        //     err = Object.assign({}, err, {membership:"membership tidak boleh kosong"});
        //     this.setState({error: err});
        // }
        else if(parseData['device_id']===''||parseData['device_id']===undefined){
            err = Object.assign({}, err, {device_id:"Device ID tidak boleh kosong"});
            this.setState({confirm:false, error: err});
        }
        else if(parseData['signup_source']===''||parseData['signup_source']===undefined){
            err = Object.assign({}, err, {signup_source:"Signup Source tidak boleh kosong"});
            this.setState({confirm:false, error: err});
        }
        else if(parseData['sponsor']===''||parseData['sponsor']===undefined){
            err = Object.assign({}, err, {sponsor:"Sponsor tidak boleh kosong"});
            this.setState({confirm:false, error: err});
        }
        else if(parseData['upline']===''||parseData['upline']===undefined){
            err = Object.assign({}, err, {upline:"Upline tidak boleh kosong"});
            this.setState({confirm:false, error: err});
        }
        else if(parseData['pin_regist']===''||parseData['pin_regist']===undefined){
            err = Object.assign({}, err, {pin_regist:"Membership belum dipilih"});
            this.setState({confirm:false, error: err});
        }
        else{
            // if (this.props.detail !== undefined) {
                console.log("tes",this.props)
                Swal.fire({
                    title: 'Informasi!',
                    text: "Pastikan data yang diinput telah benar.",
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Lanjut, Daftar',
                    cancelButtonText: 'Batal'
                }).then((result) => {
                    if (result.value) {
                        this.props.dispatch(createMember(parseData));
                    }
                })
            // }
        }
    }
    handleChangeImage(files) {
        this.setState({
            picture: files.base64
        })
    };
    handleMembership(e,val) {
        e.preventDefault();
        console.log(e.target)
        this.props.dispatch(FetchDetailPin(String(val).toLowerCase()));
        // this.setState({
        //     membership: val
        // })
    };
    render(){
        const {
            full_name,kode,paket,point_volume,category,
        } = this.state.pin_regist===''?'':JSON.parse(this.state.pin_regist);
        console.log(this.state.pin_regist===''?'':JSON.parse(this.state.pin_regist))
        return (
            !this.props.isLoadingAuth?
                !this.props.registered?
                <Card>
                    <CardHeader className="bg-transparent"><h4>Tambah Member Baru</h4></CardHeader>
                    <CardBody>
                        <form onSubmit={this.handleSubmit}>
                                <div className={`row ${!this.state.confirm?'':'d-none'}`}>
                                    <div className="col-md-6">
                                        <Card>
                                            <CardBody>
                                                <div className="form-group">
                                                    <label>Nama Lengkap</label>
                                                    <input type="text" className="form-control form-control-lg" name="full_name" value={this.state.full_name} onChange={this.handleChange}  />
                                                    <div className="invalid-feedback" style={this.state.error.full_name!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.full_name}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>No. Telp.</label>
                                                    <input
                                                            type="tel"
                                                            pattern="\d*"
                                                            maxLength="14"
                                                            className="form-control form-control-lg"
                                                            name="mobile_no"
                                                            value={this.state.mobile_no}
                                                            onChange={this.handleChange}  />
                                                    <div className="invalid-feedback" style={this.state.error.mobile_no!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.mobile_no}
                                                    </div>
                                                </div>
                                                {/* <div className="form-group">
                                                    <label>No. Identitas (KTP)</label>
                                                    <input
                                                            type="text"
                                                            pattern="\d*"
                                                            maxLength="24"
                                                            className="form-control form-control-lg"
                                                            name="id_card"
                                                            value={this.state.id_card}
                                                            onChange={this.handleChange}  />
                                                    <div className="invalid-feedback" style={this.state.error.id_card!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.id_card}
                                                    </div>
                                                </div> */}
                                                {/* <div className="form-group">
                                                    <label>PIN</label>
                                                    <input
                                                            type="text"
                                                            pattern="\d*"
                                                            maxLength="6"
                                                            className="form-control form-control-lg"
                                                            name="pin"
                                                            value={this.state.pin}
                                                            onChange={this.handleChange}  />
                                                    <div className="invalid-feedback" style={this.state.error.pin!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.pin}
                                                    </div>
                                                </div> */}
                                                {/* <div className="form-group">
                                                    <label htmlFor="inputState" className="col-form-label">Foto {this.props.data_detail!==undefined?<small>(kosongkan apabila tidak ada perubahan.)</small>:""}</label><br/>
                                                    <File64
                                                        multiple={ false }
                                                        maxSize={2048} //in kb
                                                        fileType='png, jpg' //pisahkan dengan koma
                                                        className="mr-3 form-control-file"
                                                        onDone={ this.handleChangeImage }
                                                        showPreview={true}
                                                        lang='id'
                                                        previewLink={this.state.prev}
                                                        previewConfig={{
                                                            width:'200px',
                                                            height: '200px'
                                                        }}
                                                        />
                                                    <div className="invalid-feedback" style={this.state.error.logo!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.logo}
                                                    </div>
                                                </div> */}
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <div className="col-md-6">
                                        <Card>
                                            <CardBody>
                                                <div className="form-group">
                                                    <label>Sponsor</label>
                                                    <input type="text" className="form-control form-control-lg" name="sponsor" value={this.state.sponsor} onChange={this.handleChange} readOnly />
                                                    <div className="invalid-feedback" style={this.state.error.sponsor!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.sponsor}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Upline</label>
                                                    <input type="text" className="form-control form-control-lg" name="upline" value={this.state.upline} onChange={this.handleChange} readOnly />
                                                    <div className="invalid-feedback" style={this.state.error.upline!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.upline}
                                                    </div>
                                                </div>
                                                {/* <div className="form-group">
                                                    <label>PIN Regist</label>
                                                    <input type="text" className="form-control form-control-lg" name="pin_regist" value={this.state.pin_regist} onChange={this.handleChange} readOnly />
                                                    <div className="invalid-feedback" style={this.state.error.pin_regist!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.pin_regist}
                                                    </div>
                                                </div> */}
                                                <div className="form-group">
                                                    <label>Membership</label>
                                                    <Tabs>
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <TabList>
                                                                    {
                                                                        (
                                                                            typeof this.props.availPin === 'object' ?
                                                                                this.props.availPin.map((v,i)=>{
                                                                                    return(
                                                                                        <Tab key={i} className="w-100 p-2 text-center cursor-pointer img-thumbnail mb-1" label="Core Courses" onClick={(e) =>this.handleMembership(e,v.title)}>{`${v.title} - ${v.jumlah}`}</Tab>
                                                                                    )
                                                                                })
                                                                                : "No data."
                                                                        )
                                                                    }
                                                                </TabList>
                                                            </div>
                                                            <div className="col-md-8">
                                                                {
                                                                    (
                                                                        typeof this.props.availPin === 'object' ?
                                                                        this.props.availPin.map((v,i)=>{
                                                                            return(
                                                                                <TabPanel key={i}>
                                                                                    {
                                                                                    !this.props.isLoading&&this.props.pinList!==undefined?
                                                                                        <Card className="bg-primary text-white"><CardBody>
                                                                                            <div className="form-group">
                                                                                                {
                                                                                                    this.props.pinList.length<=0?
                                                                                                    <div className="text-center"><a href="!#" target="_blank"><h3 className="text-light" >Click me!</h3></a></div>
                                                                                                    :
                                                                                                    <div>
                                                                                                        <label>Daftar PIN {v.title}</label>
                                                                                                        <select className="form-control" name="pin_regist" defaultValue={this.state.pin_regist} value={this.state.pin_regist} onChange={this.handleChange}>
                                                                                                            <option value="">==== Pilih PIN  ====</option>
                                                                                                            {
                                                                                                                (
                                                                                                                    typeof this.props.pinList.data === 'object' ?
                                                                                                                        this.props.pinList.data.map((w,j)=>{
                                                                                                                            return(
                                                                                                                                <option key={j} value={JSON.stringify(w)}>{w.kode} | {w.paket}</option>
                                                                                                                            )
                                                                                                                        })
                                                                                                                        : "No data."
                                                                                                                )
                                                                                                            }
                                                                                                        </select>
                                                                                                        <div className="invalid-feedback" style={this.state.error.pin_regist!==""?{display:'block'}:{display:'none'}}>
                                                                                                            {this.state.error.pin_regist}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                }
                                                                                            </div>
                                                                                        </CardBody></Card>
                                                                                        :<Spinner/>
                                                                                    }
                                                                                </TabPanel>
                                                                            )
                                                                        })
                                                                        : "No data."
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    </Tabs>
                                                    <div className="invalid-feedback" style={this.state.error.pin_regist!==""?{display:'block'}:{display:'none'}}>
                                                        {this.state.error.pin_regist}
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                                <div className={`row ${this.state.confirm?'':'d-none'}`}>
                                    <div className="col-md-6 offset-md-3 mb-5">
                                        <Card>
                                            <CardHeader className="bg-primary text-light text-center">PIN Detail</CardHeader>
                                            <CardBody>
                                                <Table striped>
                                                    <thead className="bg-primary">
                                                        <tr>
                                                            <th className="text-center text-light">Nama</th>
                                                            <th className="text-center text-light">Kode</th>
                                                            <th className="text-center text-light">Paket</th>
                                                            <th className="text-center text-light">Volume</th>
                                                            <th className="text-center text-light">Kategori</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th className="text-center" scope="row">{full_name}</th>
                                                            <th className="text-center" scope="row">{kode}</th>
                                                            <th className="text-center" scope="row">{paket}</th>
                                                            <th className="text-center" scope="row">{point_volume}</th>
                                                            <th className="text-center" scope="row">{category}</th>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </div>
                                    <div className="col-md-6 offset-md-3 mb-5">
                                        <Card>
                                            <CardHeader className="bg-primary text-light text-center">Detail Member Baru</CardHeader>
                                            <CardBody>
                                                <Table>
                                                    <thead className="bg-transparent" style={{visibility:'collapse'}}>
                                                        <tr>
                                                            <th className="text-left text-light w-25"></th>
                                                            <th className="text-left text-light w-75"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th className="text-left" scope="row">Nama Lengkap</th>
                                                            <th className="text-left" scope="row">: {this.state.full_name}</th>
                                                        </tr>
                                                        <tr>
                                                            <th className="text-left" scope="row">No. Telpon</th>
                                                            <th className="text-left" scope="row">: {this.state.mobile_no}</th>
                                                        </tr>
                                                        <tr>
                                                            <th className="text-left" scope="row">Sponsor</th>
                                                            <th className="text-left" scope="row">: {this.state.sponsor}</th>
                                                        </tr>
                                                        <tr>
                                                            <th className="text-left" scope="row">Upline</th>
                                                            <th className="text-left" scope="row">: {this.state.upline}</th>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </div>
                                <div className="form-group mt-2" style={{textAlign:"right"}}>
                                    <button type="button" className="btn btn-warning mb-2 mr-2" id={this.state.confirm?'back':'cancel'} onClick={this.toggle}><i className="ti-close" />{this.state.confirm?'Kembali':'Batal'}</button>
                                    <button type="button" className={`btn btn-primary mb-2 mr-2 ${!this.state.confirm?'':'d-none'}`} onClick={this.toggle}><i className="ti-close" /> Selanjutnya</button>
                                    <button type="submit" className={`btn btn-primary mb-2 mr-2 ${this.state.confirm?'':'d-none'}`} ><i className="ti-save" /> Daftarkan</button>
                                </div>
                        </form>
                    </CardBody>
                </Card>
                :
                <div>
                    <Card className="box-margin">
                        <CardHeader className="bg-transparent"><h4>Detail Pendaftaran</h4></CardHeader>
                        <CardBody>
                            <Table striped>
                                <thead className="bg-transparent" style={{visibility:'collapse'}}>
                                    <tr>
                                        <th className="text-left text-light w-50"></th>
                                        <th className="text-left text-dark w-50"><h5>Detail</h5></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className="text-left" scope="row">Nama Lengkap</th>
                                        <th className="text-left" scope="row">: {this.state.full_name}</th>
                                    </tr>
                                    <tr>
                                        <th className="text-left" scope="row">No. Telpon</th>
                                        <th className="text-left" scope="row">: {this.state.mobile_no}</th>
                                    </tr>
                                    <tr>
                                        <th className="text-left" scope="row">Sponsor</th>
                                        <th className="text-left" scope="row">: {this.state.sponsor}</th>
                                    </tr>
                                    <tr>
                                        <th className="text-left" scope="row">Upline</th>
                                        <th className="text-left" scope="row">: {this.state.upline}</th>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                        <CardFooter className="bg-transparent">
                            <button className="btn btn-primary mr-1" onClick={(e)=>{e.preventDefault();window.location.reload()}}>Daftarkan Member Lagi</button>
                            <button className="btn btn-info mr-1" onClick={(e)=>{e.preventDefault();window.location.href = '/'}}>Ke Halaman Utama</button>
                            {/* <Link to="/" className="btn btn-primary">Ke Halaman Utama</Link> */}
                        </CardFooter>
                    </Card>
                    <Card className="box-margin">
                        <CardHeader className="bg-transparent"><h4>Akses Masuk</h4></CardHeader>
                        <CardBody>
                            <div>
                                <h5>Untuk pengguna yang telah berhasil di daftarkan, harap diarahkan untuk proses masuk sistem dengan menggunakan no telpon yang baru saja didaftarkan!</h5>
                                <p>No Telpon : {this.state.mobile_no}</p>
                            </div>
                        </CardBody>
                        <CardFooter className="bg-transparent">
                            <button className="btn btn-primary mr-1" onClick={(e)=>{e.preventDefault();window.location.reload()}}>Daftarkan Member Lagi</button>
                            <button className="btn btn-info mr-1" onClick={(e)=>{e.preventDefault();window.location.href = '/'}}>Ke Halaman Utama</button>
                            {/* <Link to="/" className="btn btn-primary">Ke Halaman Utama</Link> */}
                        </CardFooter>
                    </Card>
                </div>
            : <Preloader/>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        pinList:state.pinReducer.data_detail,
        isLoading:state.pinReducer.isLoading,
        isLoadingAuth:state.auth.isLoading,
        registered:state.auth.isRegistered,
        auth:state.auth
        // Level:state.userLevelReducer.data,
    }
}
export default connect(mapStateToProps)(MemberForm);