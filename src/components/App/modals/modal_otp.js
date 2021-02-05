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

class ModalOtp extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount(){
        setTimeout(function () {
            // const fcs=document.querySelector("input[data-testid='input']");
            // fcs.focus();
        }.bind(this), 500)
    }


    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType(this.props.typePage));
    };

    render(){
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "modalOtp"} size="lg">
                <ModalHeader toggle={this.toggle}>KEAMANAN</ModalHeader>

                <ModalBody style={{backgroundColor:"black"}}>
                    <div className="row">
                        <div className="col-md-6">
                            <img src="https://www.gbb.co.in/wp-content/uploads/2017/02/Firewall-companies-in-hyderabad.png" alt=""/>
                        </div>
                        <div className="col-md-6" style={{margin:"auto"}}>
                            <p className={"text-white"} style={{textAlign:"center"}}>masukan OTP yang kami kirim ke no telepon anda ! {this.props.otp}</p>
                            <OTPInput
                                value={this.props.code}
                                onChange={this.props.save}
                                autoFocus={true}
                                OTPLength={4}
                                otpType="number"
                                disabled={false}
                                style={{AlignItem:"center",justifyContent:"center"}}
                                secure
                            />
                            <br/>
                            {
                                this.props.isLoading?(
                                    <div className="col-md-12">
                                        <div className="d-flex align-items-center">
                                            <div className="spinner-border text-primary ml-auto" role="status" aria-hidden="true"/>
                                            <strong className={"text-white"}>Tunggu sebentar    ...</strong>
                                        </div>
                                    </div>
                                ):null
                            }
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
export default connect(mapStateToProps)(ModalOtp);