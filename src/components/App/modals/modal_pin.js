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
import Keamanan from 'assets/keamanan.png'

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
                <ModalHeader toggle={this.toggle}>KEAMANAN</ModalHeader>

                <ModalBody style={{backgroundColor:"black"}}>
                    <div className="row">
                        <div className="col-md-6">
                            <img src={Keamanan} alt="Keamanan"/>
                        </div>
                        <div className="col-md-6" style={{margin:"auto"}}>
                            <p className={"text-white"} style={{textAlign:"center"}}>Masukan PIN demi keamanan anda saat bertransaksi pada aplikasi sangQu!</p>
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
                                            <div className="spinner-border text-primary ml-10" role="status" aria-hidden="true"/>
                                            <strong className={"text-black text-center"} style={{position:"absolute",marginLeft:"10px",marginTop:"5px",verticalAlign:"middle"}}>Tunggu sebentar..</strong>
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