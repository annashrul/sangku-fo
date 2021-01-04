import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import {ModalToggle} from "redux/actions/modal.action";
import WrapperModal from "../../_wrapper.modal";
import Select from 'react-select'
import {getProvinsi} from "redux/actions/member/provinsi.action";
import {getKota} from "redux/actions/member/kota.action";
import {getKecamatan} from "redux/actions/member/kecamatan.action";
import Skeleton from 'react-loading-skeleton';
import {postAlamat, putAlamat} from "redux/actions/member/alamat.action";
import {ToastQ} from "helper";
import {postBankMember, putBankMember} from "redux/actions/member/bankMember.action";

class FormBankMember extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            bank_name:"",
            acc_name:"",
            acc_no:"",
        }
    }




    getProps(param){
        if(param.detail.id!==''){
            this.setState({
                bank_name:param.detail.bank_name,
                acc_name:param.detail.acc_name,
                acc_no:param.detail.acc_no,
            });
        }
    }
    componentWillMount(){
        this.getProps(this.props);
    }

    componentWillReceiveProps(nextProps){
       this.getProps(nextProps);
    }

    clearState(){
        this.setState({
            bank_name:"",
            acc_name:"",
            acc_no:"",
        });
    }
    handleChange(e){
        e.preventDefault();
        let column = e.target.name;
        let value = e.target.value;
        this.setState({[column]:value});
    }


    toggle(e){
        e.preventDefault();
        this.clearState();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));

    };
    handleSubmit(e) {
        e.preventDefault();
        let parsedata = {};
        parsedata['bank_name'] = this.state.bank_name;
        parsedata['acc_name'] = this.state.acc_name;
        parsedata['acc_no'] = this.state.acc_no;
        if(parsedata['bank_name']===''){
            ToastQ.fire({icon:'error',title:`nama bank tidak boleh kosong`});
        }
        else if(parsedata['acc_name']===''){
            ToastQ.fire({icon:'error',title:`nama akun tidak boleh kosong`});
        }
        else if(parsedata['acc_no']===''){
            ToastQ.fire({icon:'error',title:`no akun tidak boleh kosong`});
        }
        else{
            if(this.props.detail.id!==''){
                this.props.dispatch(putBankMember(parsedata,this.props.detail.id));
            }
            else{
                this.props.dispatch(postBankMember(parsedata));
            }
            if(this.props.isError===true){
                this.clearState();
            }
        }

    }

    render(){
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "FormBankMember"} size="md">
                <ModalHeader toggle={this.toggle}>{this.props.detail.id===''?"Tambah Bank":"Ubah Bank"}</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nama Bank</label>
                        <input type="text" className="form-control" name="bank_name" value={this.state.bank_name} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Nama Akun</label>
                        <input type="text" className="form-control" name="acc_name" value={this.state.acc_name} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>No Akun</label>
                        <input type="number" className="form-control" name="acc_no" value={this.state.acc_no} onChange={this.handleChange} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="form-group" style={{textAlign:"right"}}>
                        <button style={{color:"white"}} type="button" className="btn btn-warning mb-2 mr-2" onClick={this.toggle} ><i className="ti-close"/>Keluar</button>
                        <button type="submit" className="btn btn-primary mb-2 mr-2" onClick={this.handleSubmit} ><i className="ti-save" />{!this.props.isLoadingPost?'Simpan':'Loading ......'}</button>
                    </div>
                </ModalFooter>
            </WrapperModal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoadingPost: state.bankMemberReducer.isLoadingPost,
        isError: state.bankMemberReducer.isError,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(FormBankMember);