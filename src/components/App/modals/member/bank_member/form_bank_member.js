import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import {ModalToggle} from "redux/actions/modal.action";
import WrapperModal from "../../_wrapper.modal";
// import Select from 'react-select'
// import {getProvinsi} from "redux/actions/member/provinsi.action";
// import {getKota} from "redux/actions/member/kota.action";
// import {getKecamatan} from "redux/actions/member/kecamatan.action";
// import Skeleton from 'react-loading-skeleton';
// import {postAlamat, putAlamat} from "redux/actions/member/alamat.action";
import {ToastQ} from "helper";
import {postBankMember, putBankMember} from "redux/actions/member/bankMember.action";
import { getBankData } from '../../../../../redux/actions/member/bank.action';
import Select, { components } from "react-select";
import Spinner from 'Spinner'

const { Option } = components;
const IconOption = props => (
<Option {...props}>
    <div className="client-media-content d-flex align-items-center p-1">
    {/* <img className="client-thumb mr-3" src={props.data.icon} alt={props.data.label} /> */}
    <div className="user--media-body">
        <h6 className="mb-0 text-dark font-15">{props.data.label}</h6>
        <span className="font-13 text-dark">{props.data.childLabel}</span>
    </div>
    </div>
</Option>
);
class FormBankMember extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.HandleChangeBank = this.HandleChangeBank.bind(this);
        this.state={
            data_bank:[],
            bank:"",
            bank_name:"",
            acc_name:"",
            acc_no:"",
        }
    }

    HandleChangeBank(bk) {
        console.log(bk);
        this.setState({bank:bk.label})
    }


    getProps(param){
        if(param.detail.id!==''){
            this.setState({
                bank:param.detail.bank_name,
                acc_name:param.detail.acc_name,
                acc_no:param.detail.acc_no,
            });
        }
    }
    componentWillMount(){
        this.props.dispatch(getBankData())
        this.getProps(this.props);
    }

    componentWillReceiveProps(nextProps){
       this.getProps(nextProps);
       let data_bank = []
       if(nextProps.resBank!==undefined&&nextProps.resBank.length>0){
        nextProps.resBank.map((i) => {
            data_bank.push({
                value: i.id,
                label: i.name,
                childLabel: i.code,
                icon: i.value,
            });
            return null;
        });
        this.setState({
            bank_data:data_bank
        })
    }
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
        parsedata['bank_name'] = this.state.bank;
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
                        { typeof this.state.bank_data === 'object'? this.state.bank_data.length>0?
                        <Select
                            defaultValue={this.state.bank_data[0]}
                            options={this.state.bank_data}
                            components={{ Option: IconOption }}
                            onChange={this.HandleChangeBank}
                            value={
                                this.state.bank_data.find(op => {
                                return op.label === this.state.bank
                            })}
                        /> : <Spinner/> : <Spinner/>
                        }
                    </div>
                    <div className="form-group">
                        <label>Atas Nama</label>
                        <input type="text" className="form-control" name="acc_name" value={this.state.acc_name} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>No Rekening</label>
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
        isLoadingData: state.bankReducer.isLoadingData,
        resBank: state.bankReducer.data_bank,
        isError: state.bankMemberReducer.isError,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(FormBankMember);