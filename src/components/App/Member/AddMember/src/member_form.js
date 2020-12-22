import React,{Component} from 'react';
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
import {stringifyFormData} from "helper";
import File64 from "components/common/File64";
import { Card, CardBody, CardHeader } from 'reactstrap';
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs';
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
            id_card:'',
            pin:'',
            picture:'',
            membership:'3a385e1d-21f7-4c73-9554-c818f0078c6f',
            device_id:'',
            signup_source:'',
            sponsor:'SK5711868830',
            upline:'SK5711868828',
            pin_regist:'SK1D43250000',
            prev:'',
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
                    picture: param.detail.data.picture,
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
                picture:'',
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
        parseData['picture'] = this.state.image===undefined?'':this.state.image.base64;
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
            if(parseData['picture']===''||parseData['picture']===undefined){
                delete parseData.picture
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
                else if(parseData['picture']===''||parseData['picture']===undefined){
                    err = Object.assign({}, err, {picture:"picture tidak boleh kosong"});
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
            picture: files
        })
    };
    handleMembership(e,val) {
        e.preventDefault();
        console.log(e.target)
        this.setState({
            membership: val
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
                                                        type="type"
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
                                            <div className="form-group">
                                                <label>No. Identitas (KTP)</label>
                                                <input
                                                        type="type"
                                                        pattern="\d*"
                                                        maxLength="24"
                                                        className="form-control form-control-lg"
                                                        name="id_card"
                                                        value={this.state.id_card}
                                                        onChange={this.handleChange}  />
                                                <div className="invalid-feedback" style={this.state.error.id_card!==""?{display:'block'}:{display:'none'}}>
                                                    {this.state.error.id_card}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>PIN</label>
                                                <input
                                                        type="type"
                                                        pattern="\d*"
                                                        maxLength="6"
                                                        className="form-control form-control-lg"
                                                        name="pin"
                                                        value={this.state.pin}
                                                        onChange={this.handleChange}  />
                                                <div className="invalid-feedback" style={this.state.error.pin!==""?{display:'block'}:{display:'none'}}>
                                                    {this.state.error.pin}
                                                </div>
                                            </div>
                                            <div className="form-group">
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
                                            </div>
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
                                            <div className="form-group">
                                                <label>PIN Regist</label>
                                                <input type="text" className="form-control form-control-lg" name="pin_regist" value={this.state.pin_regist} onChange={this.handleChange} readOnly />
                                                <div className="invalid-feedback" style={this.state.error.pin_regist!==""?{display:'block'}:{display:'none'}}>
                                                    {this.state.error.pin_regist}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Membership</label>
                                                <Tabs>
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <TabList>
                                                                <Tab className="w-100 p-2 text-center cursor-pointer img-thumbnail mb-1" label="Core Courses" onClick={(e) =>this.handleMembership(e,0)}>Bronze</Tab>
                                                                <Tab className="w-100 p-2 text-center cursor-pointer img-thumbnail mb-1" label="Core Courses" onClick={(e) =>this.handleMembership(e,1)}>Silver</Tab>
                                                                <Tab className="w-100 p-2 text-center cursor-pointer img-thumbnail mb-1" label="Core Courses" onClick={(e) =>this.handleMembership(e,2)}>Platinum</Tab>
                                                            </TabList>
                                                        </div>
                                                        <div className="col-md-9">
                                                        <TabPanel>
                                                            <Card className="bg-primary text-white"><CardBody>Bronze</CardBody></Card>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <Card className="bg-info text-white"><CardBody>Silver</CardBody></Card>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <Card className="bg-warning text-white"><CardBody>Platinum</CardBody></Card>
                                                        </TabPanel>
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