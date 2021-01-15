import React, { Component } from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import imgCover from 'assets/cover.png';
import imgDefault from 'assets/default.png';
import { Toast } from 'bootstrap';

class IndexProfile extends Component{
    constructor(props){
        super(props);
        this.handleCart    = this.handleCart.bind(this);
        this.handleDetail    = this.handleDetail.bind(this);
        this.hanhandleChange    = this.handleChange.bind(this);
        this.state = {
            isEdit:false,
            full_name:''
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            full_name:nextProps.auth.user.full_name
        })
    }

    handleCart(e,i){
        e.preventDefault();
        console.log(this.props.resPaket.data[i].id);
        let data={
            "id_paket":this.props.resPaket.data[i].id,
            "qty":1
        };
    }
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
    render(){
        console.log("full_name",this.state.full_name)
        return(
            <Layout page="Profile">
                <div className="row">
                    <div className="col-12">
                        <div className="profile-header-area mb-130">
                        <div className="card border-none">
                            <div className="thumb bg-img height-300" style={{backgroundImage: `url(${imgCover})`}}>
                            </div>
                        </div>
                        <div className="profile-heading-text">
                            <div className="d-md-flex align-items-center justify-content-between">
                            <div className="info d-flex align-items-center mb-30-xs">
                                <div className="profile-heading-thumb mr-3">
                                <img className="border-radius-50" alt="kahve" src={this.props.auth.user.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${imgDefault}`}} />
                                </div>
                                <div className="text">
                                <h4>{this.props.auth.user.full_name}</h4>
                                <p className="mb-0">{this.props.auth.user.referral_code}</p>
                                </div>
                            </div>
                            <div className="store">
                                <div className="row mb-30-xs">
                                {/* <div className="col-6 text-center text-nowrap">
                                    <span className="text-primary font-18 font-weight-bold mb-0">{this.props.auth.user.membership}</span>
                                    <span className="d-block text-dark font-weight-bold">Membership</span>
                                </div> */}
                                <div className="col-12 text-center">
                                    {this.props.auth.user.have_pin?
                                    ''
                                    :
                                    <span className="mb-0 font-18 font-weight-bold text-danger">Anda belum mengatur PIN, atur PIN terlebih dahulu.</span>}
                                    {/* <span className="d-block text-dark font-weight-bold">Total Referral</span> */}
                                </div>
                                </div>
                            </div>
                            {/* <button type="button" className="btn btn-rounded btn-primary" onClick={(e)=>this.handleEdit(e)}>
                                <span className="btn-inner--icon"><i className="zmdi zmdi-edit" /></span>
                                <span className="btn-inner--text">&nbsp;Edit</span>
                            </button> */}
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <img className="img-fluid" src={this.props.auth.user.picture} alt="img" onError={(e)=>{e.target.onerror = null; e.target.src=`${imgDefault}`}}  />
                            <div className="card-body">
                                <div className="row mb-30">
                                <div className="col-12">
                                    <a href="#" className="btn text-uppercase border btn-block btn-outline-secondary">Unggah Gambar</a>
                                </div>
                                </div>
                                <p className="font-11">Besar file: maksimum 4.000.000 bytes (4 Megabytes) Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8 box-margin">
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
                                                        <button type="submit" className="btn btn-primary" disabled={!this.state.isEdit}>SIMPAN</button>
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
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
    }
}
export default connect(mapStateToProps)(IndexProfile);