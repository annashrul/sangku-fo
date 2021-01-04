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

class FormAlamat extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeProvinsi = this.handleChangeProvinsi.bind(this);
        this.handleChangeKota = this.handleChangeKota.bind(this);
        this.handleChangeKecamatan = this.handleChangeKecamatan.bind(this);
        this.state={
            title:"",
            penerima:"",
            main_address:"",
            kd_prov:"",
            kd_kota:"",
            kd_kec:"",
            no_hp:"",
            ismain:"",
            provinsi_data:[],
            kota_data:[],
            kecamatan_data:[],
        }
    }


    componentWillMount(){
        this.props.dispatch(getProvinsi());
        if(this.props.detail.id!==''){
            this.setState({
                kd_prov:this.props.detail.kd_prov,
                kd_kota:this.props.detail.kd_kota,
                kd_kec:this.props.detail.kd_kec,
                main_address:this.props.detail.main_address,
            })
            this.props.dispatch(getKota(this.props.detail.kd_prov));
            this.props.dispatch(getKecamatan(this.props.detail.kd_kota));

        }


    }

    componentWillReceiveProps(nextProps){
        let prov=[],kota=[],kecamatan=[];
        nextProps.dataProvinsi.map((v,i)=>{
           prov.push({
               value: v.id,
               label: v.name
           })
        });
        nextProps.dataKota.map((v,i)=>{
            kota.push({
                value: v.id,
                label: v.name
            })
        });
        nextProps.dataKecamatan.map((v,i)=>{
            kecamatan.push({
                value: v.id,
                label: v.kecamatan
            })
        });
        this.setState({provinsi_data:prov,kota_data:kota,kecamatan_data:kecamatan,ismain:nextProps.detail.isMain});
        if(nextProps.detail.id!==''){
            this.setState({
                title:nextProps.detail.title,
                penerima:nextProps.detail.penerima,
                no_hp:nextProps.detail.no_hp,
            });
            // this.handleChangeKota({value:nextProps.detail.kd_kota});
            // this.handleChangeKecamatan({value:nextProps.detail.kd_kec});
        }

    }

    clearState(){
        this.setState({
            title:"",
            penerima:"",
            main_address:"",
            kd_prov:"",
            kd_kota:"",
            kd_kec:"",
            no_hp:"",
            ismain:"",
        });
    }
    handleChange(e){
        e.preventDefault();
        let column = e.target.name;
        let value = e.target.value;
        this.setState({[column]:value});
    }

    handleChangeProvinsi(val){
        this.props.dispatch(getKota(val.value));
        this.setState({
            kd_prov:val.value,
            main_address:`Provinsi ${val.label}`
        })
    }
    handleChangeKota(val){
        this.props.dispatch(getKecamatan(val.value));
        let add='';
        add+=`Kota ${val.label}, ${this.state.main_address}`;
        this.setState({
            kd_kota:val.value,
            main_address:add
        })
    }
    handleChangeKecamatan(val){
        let add='';
        add+=`Kecamatan ${val.label}, ${this.state.main_address}`;
        this.setState({
            kd_kec:val.value,
            main_address:add
        })
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
        parsedata['title'] = this.state.title;
        parsedata['penerima'] = this.state.penerima;
        parsedata['main_address'] = this.state.main_address;
        parsedata['kd_prov'] = this.state.kd_prov;
        parsedata['kd_kota'] = this.state.kd_kota;
        parsedata['kd_kec'] = this.state.kd_kec;
        parsedata['no_hp'] = this.state.no_hp;
        parsedata['ismain'] = this.state.ismain;

        console.log(parsedata);
        if(parsedata['title']===''){
            ToastQ.fire({icon:'error',title:`title tidak boleh kosong`});
        }
        else if(parsedata['penerima']===''){
            ToastQ.fire({icon:'error',title:`penerima tidak boleh kosong`});
        }
        else if(parsedata['no_hp']===''){
            ToastQ.fire({icon:'error',title:`penerima tidak boleh kosong`});
        }
        else if(parsedata['kd_prov']===''){
            ToastQ.fire({icon:'error',title:`provinsi tidak boleh kosong`});
        }
        else if(parsedata['kd_kota']===''){
            ToastQ.fire({icon:'error',title:`kota tidak boleh kosong`});
        }
        else if(parsedata['kd_kec']===''){
            ToastQ.fire({icon:'error',title:`kecamatan tidak boleh kosong`});
        }
        else if(parsedata['main_address']===''){
            ToastQ.fire({icon:'error',title:`detail alamat tidak boleh kosong`});
        }
        else{
            if(this.props.detail.id!==''){
                this.props.dispatch(putAlamat(parsedata,this.props.detail.id));
            }
            else{
                this.props.dispatch(postAlamat(parsedata));
            }
            if(this.props.isError===true){
                this.clearState();
            }
        }

    }

    render(){
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "formAlamat"} size="lg">
                <ModalHeader toggle={this.toggle}>{this.props.detail.id===''?"Tambah Alamat":"Ubah Alamat"}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>title</label>
                                <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Penerima</label>
                                <input type="text" className="form-control" name="penerima" value={this.state.penerima} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>No Telepon</label>
                                <input type="number" className="form-control" name="no_hp" value={this.state.no_hp} onChange={this.handleChange} />
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Provinsi</label>
                                <Select
                                    options={this.state.provinsi_data} placeholder="Pilih Provinsi"
                                    onChange={this.handleChangeProvinsi}
                                    value={this.state.provinsi_data.find(op => {return op.value === this.state.kd_prov})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Kota</label>
                                {
                                    !this.props.isLoadingKota?(
                                        <Select
                                            options={this.state.kota_data} placeholder="Pilih Kota"
                                            onChange={this.handleChangeKota}
                                            value={this.state.kota_data.find(op => {return op.value === this.state.kd_kota})}
                                        />
                                    ):<Skeleton height={37}/>
                                }
                            </div>
                            <div className="form-group">
                                <label>Kecamatan</label>
                                {
                                    !this.props.isLoadingKecamatan?(
                                        <Select
                                            options={this.state.kecamatan_data} placeholder="Pilih Kecamatan"
                                            onChange={this.handleChangeKecamatan}
                                            value={this.state.kecamatan_data.find(op => {return op.value === this.state.kd_kec})}
                                        />
                                    ):<Skeleton height={37}/>
                                }

                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Detail Alamat <small style={{color:"green",fontWeight:"bold"}}>( contoh : nama jalan, rt, rw, kelurahan, kecamatan, kota, provinsi, no rumah )</small></label>
                                <textarea name="main_address" className="form-control" cols="30" rows="10" value={this.state.main_address} onChange={this.handleChange} placeholder={"masukan detail alamat selengkap mungkin, karena alamat ini akan digunakan ketika pengiriman anda"}/>
                            </div>
                        </div>
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
        isLoadingPost: state.alamatReducer.isLoadingPost,
        isLoadingKota: state.kotaReducer.isLoading,
        isLoadingKecamatan: state.kecamatanReducer.isLoading,
        isError: state.alamatReducer.isError,

        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        dataProvinsi:state.provinsiReducer.data,
        dataKota:state.kotaReducer.data,
        dataKecamatan:state.kecamatanReducer.data,
    }
}
export default connect(mapStateToProps)(FormAlamat);