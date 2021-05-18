import React, { Component } from 'react';
import { ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ModalToggle } from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
import File64 from "components/common/File64";
import { ToastQ } from "helper";
import WrapperModal from "../_wrapper.modal";
import Default from 'assets/default.png'
import { postTestimoni } from '../../../../redux/actions/konten/testimoni.action';

class FormAddTestimoni extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            foto: "",
            atas_nama: '',
            title: '',
            caption: '',
            video: '-',
            error: {
                title: '',
                caption: '',
                video: '',
                foto: '',
                atas_nama: '',
            }
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ atas_nama: nextProps.auth.user.full_name })
    }
    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
    };
    handleSubmit(e) {
        e.preventDefault()
        let parse = {}
        parse['title'] = this.state.title
        parse['picture'] = this.state.foto === '' ? '-' : this.state.foto.base64
        parse['video'] = this.state.video
        parse['caption'] = this.state.caption
        parse['type'] = 1
        parse['id_category'] = '7de638c6-e336-4b53-9beb-0a90f109911e'
        if (this.state.title === '' || this.state.title === undefined) {
            let txtErr = 'Judul masih kosong!'
            ToastQ.fire({ icon: 'error', title: txtErr });
            let err = Object.assign({}, this.state.error, { 'title': txtErr });
            this.setState({ error: err });
        }
        else if (this.state.caption === '' || this.state.caption === undefined) {
            let txtErr = 'Testimoni masih kosong!'
            ToastQ.fire({ icon: 'error', title: txtErr });
            let err = Object.assign({}, this.state.error, { 'caption': txtErr });
            this.setState({ error: err });
        }
        // else if(this.state.video===''||this.state.video===undefined){
        //     let txtErr = 'Video masih kosong!'
        //     ToastQ.fire({icon:'error',title:txtErr});
        //     let err = Object.assign({}, this.state.error, {'video': txtErr});
        //     this.setState({error: err});
        // }
        // else if(this.state.foto===''||this.state.foto===undefined){
        //     let txtErr = 'Foto masih kosong!'
        //     ToastQ.fire({icon:'error',title:txtErr});
        //     let err = Object.assign({}, this.state.error, {'foto': txtErr});
        //     this.setState({error: err});
        // }
        else {
            this.props.dispatch(postTestimoni(parse));
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        let err = Object.assign({}, this.state.error, { [event.target.name]: "" });
        this.setState({ error: err });
    };
    getFiles(files) {
        this.setState({
            foto: files
        })
    };
    render() {
        return (
            <div>
                <WrapperModal isOpen={this.props.isOpen && this.props.type === "FormAddTestimoni"} size="md">
                    <ModalHeader toggle={this.toggle}>Tambah Testimoni</ModalHeader>
                    <ModalBody>
                        <>
                            <form>
                                <div className="form-group">
                                    <label>Atas Nama</label>
                                    <div className="input-group">
                                        <input className={`form-control ${this.state.error.atas_nama !== "" ? 'is-invalid' : ''}`} type="text" name="atas_nama" value={this.state.atas_nama} onChange={(e) => { return false }} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Pekerjaan</label>
                                    <div className="input-group">
                                        <input className={`form-control ${this.state.error.title !== "" ? 'is-invalid' : ''}`} type="text" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Testimoni</label>
                                    <div className="input-group">
                                        <textarea className={`form-control ${this.state.error.caption !== "" ? 'is-invalid' : ''}`} type="text" name="caption" rows={3} value={this.state.caption} onChange={(e) => this.handleChange(e)}>

                                        </textarea>
                                        {/* <input className={`form-control ${this.state.error.caption!==""?'is-invalid':''}`} type="text" name="caption" value={this.state.caption} onChange={(e) => this.handleChange(e)}/> */}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Video</label>
                                    <div className="input-group">
                                        <input className={`form-control ${this.state.error.video !== "" ? 'is-invalid' : ''}`} type="text" name="video" value={this.state.video} onChange={(e) => this.handleChange(e)} />
                                        <small className="text-muted">Isi dengan URL video, apabila URL tersebut diambil dari YouTube, pastikan URL tersebut merupakan <a href="https://support.google.com/youtube/answer/171780?hl=id" target="_blank" rel="noopener noreferrer">embed-URL <i className="zmdi zmdi-open-in-new" /></a></small>
                                        <small className="text-danger">Biarkan kosong atau isi dengan tanda (-) jika tidak akan mengikutsertakan video</small>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputState" className="col-form-label">Foto</label><br />
                                    <File64
                                        multiple={false}
                                        maxSize={2048} //in kb
                                        fileType='png,jpg' //pisahkan dengan koma
                                        className="mr-3 form-control-file"
                                        showPreview={false}
                                        onDone={this.getFiles.bind(this)} />
                                </div>
                                <div className="text-center">
                                    {this.state.foto.base64 !== undefined ? <img src={this.state.foto.base64 !== undefined ? this.state.foto.base64 : Default} alt="sangqu" /> : ''}
                                </div>
                            </form>
                        </>
                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex align-items-end justify-content-between w-100">
                            <div className="form-group mb-0 mt-0">
                                <button type="button" className="btn btn-warning mr-2" onClick={this.toggle}>BATAL</button>
                                <button type="button" className="btn btn-info mr-2" onClick={this.handleSubmit}>{this.props.isLoadingPost ? 'TAMBAH' : 'Menyimpan ...'}</button>
                                {/* <button type="submit" className="btn btn-primary mr-2" onClick={this.handlePin} ><i className="ti-save" /> {!this.props.isLoadingPost?'TAMBAH':'Menyimpan ...'}</button> */}
                            </div>
                        </div>
                    </ModalFooter>
                </WrapperModal>
                {/* {
                this.state.isModal?<ModalPin isLoading={this.props.isLoadingPost} code={this.state.code} save={this.handleSubmit} typePage={'FormAddTestimoni'}/>:null
            } */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isLoadingPost: state.testimoniReducer.isLoadingPost,
    }
}
export default connect(mapStateToProps)(FormAddTestimoni);
