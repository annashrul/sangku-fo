import React,{Component} from 'react';
import {ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {ModalToggle} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
import File64 from "components/common/File64";
import {ToastQ} from "helper";
import WrapperModal from "../_wrapper.modal";
import {noImage} from "helper";
import {postBuktiTransfer} from "redux/actions/product/checkout.action";

class FormUploadBuktiTransfer extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            foto:"",
        };
    }

    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.setState({});
    };
    getFiles(files) {
        console.log(files);
        if(files.type==="image/jpeg"||files.type==="image/jpg"||files.type==="image/png"){
            this.setState({
                foto: files
            })
        }
        else{
            this.setState({
                foto: ''
            })
            ToastQ.fire({icon:'error',title:`format gambar harus png, jpeg atau jpg`});
        }
    };

    handleSubmit(e){
        e.preventDefault();
        if(this.state.foto===""||this.state.foto===undefined){
            ToastQ.fire({icon:'error',title:`silahkan upload bukti transfer anda`});
        }
        else{
            this.props.dispatch(postBuktiTransfer({bukti:this.state.foto.base64},this.props.kd_trx));
            if(this.props.isError===true){
                this.setState({
                    foto: ''
                });
            }
        }
    }

    render(){
        console.log(this.state.foto.base64);
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "FormUploadBuktiTransfer"} size="md">
                <ModalHeader toggle={this.toggle}>Upload Bukti Transfer</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="inputState" className="col-form-label">Foto</label><br/>
                        <File64
                            multiple={ false }
                            maxSize={2048} //in kb
                            fileType='png, jpg' //pisahkan dengan koma
                            className="mr-3 form-control-file"
                            showPreview={false}
                            onDone={ this.getFiles.bind(this) } />
                    </div>
                    <div className="text-center">
                        <img src={this.state.foto.base64!==undefined?this.state.foto.base64:noImage()} alt="sangqu"/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="form-group" style={{textAlign:"right"}}>
                        <button type="button" className="btn btn-warning mb-2 mr-2" onClick={this.toggle}><i className="ti-close" /> Cancel</button>
                        <button type="submit" className="btn btn-primary mb-2 mr-2" onClick={this.handleSubmit} ><i className="ti-save" /> {!this.props.isLoadingPost?'Simpan':'Loading ......'}</button>
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
        isLoadingPost:state.checkoutReducer.isLoadingPost,
    }
}
export default connect(mapStateToProps)(FormUploadBuktiTransfer);
