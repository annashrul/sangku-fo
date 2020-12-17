import React,{Component} from 'react';
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
import {stringifyFormData} from "helper";
import FileBase64 from "react-file-base64";
import Select from 'react-select'
import { Card, CardBody, CardHeader } from 'reactstrap';
class MemberForm extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLevel = this.handleLevel.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.state = {
            id:'',
            level:'',
            level_data:[],
            nama:'',
            username:'',
            password:'',
            status:'',
            photo:'',
            error:{
                id:'',
                level:'',
                nama:'',
                username:'',
                password:'',
                status:'',
                photo:'',}
        };
    }
    getProps(param){
        if (param.detail !== undefined) {
            if (param.detail.data !== undefined) {
                this.setState({
                    level: param.detail.data.id_level,
                    nama: param.detail.data.nama,
                    username: param.detail.data.username,
                    // password: param.detail.data.password,
                    status: param.detail.data.status,
                    photo: param.detail.data.photo,
                    id: param.detail.data.id,
                })
            }
        }
        else{
            this.setState({
                id:'',
                level:'',
                nama:'',
                username:'',
                password:'',
                status:'',
                photo:'',
            })
        }
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
        if(this.props.fastAdd===undefined){
            const bool = !this.props.isOpen;
            this.props.dispatch(ModalToggle(bool));
        }
        if(this.props.fastAdd===true){
            this.props.dispatch(ModalType('formBarang'));
            // this.props.dispatch(FetchUsers(1,'','999'));
        }
    };

    handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        let data = new FormData(form);
        let parseData = stringifyFormData(data);
        parseData['id_level'] = this.state.level;
        parseData['nama'] = this.state.nama;
        parseData['username'] = this.state.username;
        parseData['password'] = this.state.password;
        parseData['status'] = this.state.status;
        parseData['photo'] = this.state.image===undefined?'':this.state.image.base64;
        let err = this.state.error;

        console.log("dddddddddddddddd",parseData)

        if(parseData['nama']===''||parseData['nama']===undefined){
            err = Object.assign({}, err, {nama:"nama tidak boleh kosong"});
            this.setState({error: err});
        }
        else if(parseData['username']===''||parseData['username']===undefined){
            err = Object.assign({}, err, {username:"username tidak boleh kosong"});
            this.setState({error: err});
        }
        else if(parseData['id_level']===''||parseData['id_level']===undefined){
            err = Object.assign({}, err, {level:"level tidak boleh kosong"});
            this.setState({error: err});
        }
        else if(parseData['status']===''||parseData['status']===undefined){
            err = Object.assign({}, err, {status:"status tidak boleh kosong"});
            this.setState({error: err});
        }
        else{
            if(parseData['password']===''||parseData['password']===undefined){
                delete parseData.password
            }
            if(parseData['photo']===''||parseData['photo']===undefined){
                delete parseData.photo
            }
            if (this.props.detail !== undefined) {
                console.log("tes")
                // this.props.dispatch(updateUsers(this.state.id,parseData));
                    const bool = !this.props.isOpen;
                    this.props.dispatch(ModalToggle(bool));
            }else{
                if(parseData['password']===''||parseData['password']===undefined){
                    err = Object.assign({}, err, {password:"password tidak boleh kosong"});
                    this.setState({error: err});
                }
                else if(parseData['photo']===''||parseData['photo']===undefined){
                    err = Object.assign({}, err, {photo:"photo tidak boleh kosong"});
                    this.setState({error: err});
                } else {
                    // this.props.dispatch(createUsers(parseData));
                    const bool = !this.props.isOpen;
                    this.props.dispatch(ModalToggle(bool));
                }
            }
        }
    }
    handleChangeImage(files) {
        this.setState({
            image: files
        })
    };
    render(){
        return (
            <Card>
                <CardHeader className="bg-transparent"><h4>Add New Member</h4></CardHeader>
                <CardBody>
                    <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Nama Lengkap</label>
                                        <input type="text" className="form-control form-control-lg" name="nama" value={this.state.nama} onChange={this.handleChange}  />
                                        <div className="invalid-feedback" style={this.state.error.nama!==""?{display:'block'}:{display:'none'}}>
                                            {this.state.error.nama}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>No. Telp.</label>
                                        <input type="text" className="form-control form-control-lg" name="nama" value={this.state.nama} onChange={this.handleChange}  />
                                        <div className="invalid-feedback" style={this.state.error.nama!==""?{display:'block'}:{display:'none'}}>
                                            {this.state.error.nama}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>No. Identitas (KTP)</label>
                                        <input type="text" className="form-control form-control-lg" name="nama" value={this.state.nama} onChange={this.handleChange}  />
                                        <div className="invalid-feedback" style={this.state.error.nama!==""?{display:'block'}:{display:'none'}}>
                                            {this.state.error.nama}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Level</label>
                                        <Select options={this.state.level_data} placeholder="Pilih Level" onChange={this.handleLevel} value={this.state.level_data.find(op => {return op.value === this.state.level})}/>
                                        <div className="invalid-feedback"
                                                style={this.state.error.level !== "" ? {display: 'block'} : {display: 'none'}}
                                                >
                                            {this.state.error.level}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputState" className="col-form-label">Foto {this.props.detail!==undefined?<small>kosongkan apabila tidak akan diubah</small>:""}</label><br/>
                                        <FileBase64
                                            multiple={ false }
                                            className="mr-3 form-control form-control-lg-file"
                                            onDone={ this.handleChangeImage } />
                                            <div className="invalid-feedback"
                                                style={this.state.error.photo !== "" ? {display: 'block'} : {display: 'none'}}
                                                    >
                                                {this.state.error.photo}
                                            </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select className="form-control form-control-lg" name="status" defaultValue={this.state.status} value={this.state.status} onChange={this.handleChange}>
                                            <option value="">==== Pilih ====</option>
                                            <option value="1">Aktif</option>
                                            <option value="0">Tidak Aktif</option>
                                        </select>
                                        <div className="invalid-feedback" style={this.state.error.status!==""?{display:'block'}:{display:'none'}}>
                                            {this.state.error.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group" style={{textAlign:"right"}}>
                                <button type="button" className="btn btn-warning mb-2 mr-2" onClick={this.toggle}><i className="ti-close" /> Cancel</button>
                                <button type="submit" className="btn btn-primary mb-2 mr-2" ><i className="ti-save" /> Simpan</button>
                            </div>
                    </form>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        // Level:state.userLevelReducer.data,
    }
}
export default connect(mapStateToProps)(MemberForm);