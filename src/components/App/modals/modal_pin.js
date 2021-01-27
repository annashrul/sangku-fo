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

class ModalPin extends Component{
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
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "modalPin"} size="lg" style={{backgroundColor:"black"}}>
                <ModalHeader toggle={this.toggle} style={{backgroundColor:"black",color:"white"}}>
                   <p className={"text-white"}>KEAMANAN</p>
                </ModalHeader>
                <ModalBody style={{backgroundColor:"black"}}>
                    <div className="row">
                        <div className="col-md-6">
                            <img src="https://www.gbb.co.in/wp-content/uploads/2017/02/Firewall-companies-in-hyderabad.png" alt=""/>
                        </div>
                        <div className="col-md-6" style={{margin:"auto"}}>
                            <p className={"text-white"} style={{textAlign:"center"}}>masukan PIN demi keamanan bertransaksi anda di sistem ini !</p>
                            <OTPInput
                                value={this.props.code}
                                onChange={this.props.save}
                                autoFocus={true}
                                OTPLength={6}
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
export default connect(mapStateToProps)(ModalPin);