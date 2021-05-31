import React, { Component } from 'react';
import { ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ModalToggle, ModalType } from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
// import File64 from "components/common/File64";
// import {ToastQ} from "helper";
import WrapperModal from "../_wrapper.modal";
import { pinRoAktivasi } from '../../../../redux/actions/pin/pin.action';
import ModalPin from '../../modals/modal_pin'
// import { FetchAvailableMember } from '../../../../redux/actions/member/member.action';

class FormAktivasiRo extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handlePin = this.handlePin.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            foto: "",
            uuid: '',
            pin: '',
            pin_data: '',
            member_data: {},
            isModal: '',
            code: 0,
            error: {
                uuid: '',
                pin: '',
                pin_data: '',
            }
        };
    }

    componentDidUpdate(prevState) {
        if (prevState.data !== this.props.data) {
            this.setState({ pin_data: this.props.data })
        }
        if (prevState.memberAvail !== this.props.memberAvail) {
            this.setState({ member_data: this.props.memberAvail })
        }
    }
    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.setState({
            pin: '',
            // pin_data:'',
            member_data: '',
            uuid: '',
        });
    };
    handlePin() {
        //  if(this.state.member_data.referral_code===''||this.state.member_data.referral_code===undefined){
        //     let txtErr = 'Anda belum memilih penerima!'
        //     ToastQ.fire({icon:'error',title:txtErr});
        //     let err = Object.assign({}, this.state.error, {'member_data': txtErr});
        //     this.setState({error: err});
        // } else {
        this.setState({
            isModal: true
        });
        this.props.dispatch(ModalType("modalPin"));
        // }
    }
    handleSave(num) {
        this.setState({
            code: num
        });
        let parse = {}
        parse['pin_member'] = num
        parse['id_membership'] = this.state.pin_data.id
        if (num.length === 6) {
            this.props.dispatch(pinRoAktivasi(parse));
            this.setState({
                code: 0
            });
        }
        // }
    }
    // handleSearch(){
    //     if(this.state.uuid!==undefined&&this.state.uuid!==''){
    //         this.props.dispatch(FetchAvailableMember(this.state.uuid));
    //     } else {
    //         let txtErr = 'Penerima masih kosong!'
    //         ToastQ.fire({icon:'error',title:txtErr});
    //         let err = Object.assign({}, this.state.error, {'uuid': txtErr});
    //         this.setState({error: err});
    //     }
    // }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        let err = Object.assign({}, this.state.error, { [event.target.name]: "" });
        this.setState({ error: err });
    };
    render() {
        console.log("this.state.pin_data",this.state.pin_data);
        console.log("this.props.data",this.props.data);
        return (
            <div>
                <WrapperModal isOpen={this.props.isOpen && this.props.type === "FormAktivasiRo"} size="md">
                    <ModalHeader toggle={this.toggle}>Aktivasi PIN RO</ModalHeader>
                    <ModalBody>
                        <div className="progress h-5 mb-2">
                            <div className="progress-bar w-100 bg-success" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        <div className="alert alert-info bg-white text-center text-dark" role="alert">
                            Anda akan melakukan aktivasi PIN RO {this.state.pin_data.title}.
                </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex align-items-end justify-content-between w-100">
                            <div className="form-group mb-0 mt-0">
                                <button type="button" className="btn btn-warning mr-2" onClick={this.toggle}><i className="ti-close" /> Batal</button>
                                <button type="submit" className="btn btn-primary mr-2" onClick={this.handlePin} ><i className="ti-save" /> {!this.props.isLoadingPost ? 'Aktivasi' : 'Loading ......'}</button>
                            </div>
                        </div>
                    </ModalFooter>
                </WrapperModal>
                {
                    this.state.isModal ? <ModalPin isLoading={this.props.isLoadingPost} code={this.state.code} save={this.handleSave} typePage={'FormAktivasiRo'} /> : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isError: state.checkoutReducer.isError,
        isLoadingPost: state.checkoutReducer.isLoadingPost,
        isLoading: state.pinReducer.isLoading,
        isLoadingAvail: state.memberReducer.isLoadingAvail,
        memberAvail: state.memberReducer.data_avail,
    }
}
export default connect(mapStateToProps)(FormAktivasiRo);
