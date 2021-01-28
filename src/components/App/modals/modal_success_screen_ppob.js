import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    ModalHeader,
    ModalBody, ModalFooter,
} from 'reactstrap';
import WrapperModal from "./_wrapper.modal";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import OTPInput, { ResendOTP } from "otp-input-react";
import {postRedeem} from "../../../redux/actions/product/redeem.action";

class ModalSuccessScreenPPOB extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle = (e) => {
        e.preventDefault();
        window.location.href=this.props.page;
    };

    render(){
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "modalSuccessScreenPPOB"} size="md">
                <ModalHeader toggle={this.toggle}>
                    <p>TRANSAKSI BERHASIL !!!</p>
                </ModalHeader>
                <ModalBody>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="font-20 mb-1">SELAMAT .... </h5>
                            <p className="mb-20">TRANSAKSI ANDA BERHASIL!</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="dashboard-content-right">
                                    <h2 className="text-success font-36 font-weight-bold">$59k</h2>
                                    <p className="font-15 font-weight-bold">You have done 65.6% more <br/>sales today.</p>
                                    <button type="button" className="btn btn-primary mt-15">View Sales</button>
                                </div>
                                <div className="dashboard-content-left wow shake" data-wow-delay="0.6s">
                                    <img src="https://i.pinimg.com/originals/69/94/87/699487bb246152a16ccedd1a18814b4e.gif" className="img-fluid" alt="Dashboard" width="180" height="180"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>

            </WrapperModal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(ModalSuccessScreenPPOB);