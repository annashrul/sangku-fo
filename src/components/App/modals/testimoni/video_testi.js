import React,{Component} from 'react';
import {ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {ModalToggle} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
import WrapperModal from "../_wrapper.modal";
// import File64 from "components/common/File64";

class VideoTesti extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.setState({});
    };

    render(){
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "VideoTesti"} size="lg">
                <ModalHeader toggle={this.toggle}>Video Testimonial</ModalHeader>
                <ModalBody>
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={this.props.videoTesti} title="sangqu" allowFullScreen />
                </div>
                </ModalBody>
                <ModalFooter>
                    <div className="form-group" style={{textAlign:"right"}}>
                        <button type="button" className="btn btn-warning mb-2 mr-2" onClick={this.toggle}><i className="ti-close" /> Cancel</button>
                        {/* <button type="submit" className="btn btn-primary mb-2 mr-2" onClick={this.handleSubmit} ><i className="ti-save" /> {!this.props.isLoadingPost?'Simpan':'Loading ......'}</button> */}
                    </div>
                </ModalFooter>
            </WrapperModal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isError:state.checkoutReducer.isError,
    }
}
export default connect(mapStateToProps)(VideoTesti);
