import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
    ModalHeader,
    ModalBody, ModalFooter,
} from 'reactstrap';
import {ModalToggle} from "redux/actions/modal.action";
import WrapperModal from "../_wrapper.modal";
import {getAlamat} from "../../../../redux/actions/member/alamat.action";
import Skeleton from 'react-loading-skeleton';
import {ModalType} from "../../../../redux/actions/modal.action";
import ModalPin from '../modal_pin'
import {postRedeem} from "../../../../redux/actions/product/redeem.action";
class DetailRedeem extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state= {
            idx:0,
            data:{},
            isModal:false,
            code:0,
        }

    }
    componentWillMount(){
        this.props.dispatch(getAlamat("page=1"));
    }

    componentWillReceiveProps(nextProps){
        this.dataAddress(nextProps.data.data[this.state.idx].id);
    }

    dataAddress(val){
        this.setState({
            data:{alamat:val,id_barang:this.props.detail.id}
        });
    }

    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
    };
    handleChange(i){
        this.setState({idx:i});
        this.dataAddress(this.props.data.data[i].id);
    }

    handleNext(){
        this.setState({
            isModal:true
        });
        this.props.dispatch(ModalType("modalPin"));
    }

    handleSave(num){
        this.setState({
            code:num
        });
        let data={
            "ongkir":0,
            "layanan_pengiriman":"-",
            "alamat":this.state.data.alamat,
            "id_barang":this.state.data.id_barang,
            "pin_member":num
        };
        if(num.length===6){
            this.props.dispatch(postRedeem(data));
            this.setState({
                code:0
            })
        }
    }

    render(){
        const {
            data,
        } = this.props.data;
        const {idx} = this.state;
        return (
            <div>
                <WrapperModal isOpen={this.props.isOpen && this.props.type === "detailRedeem"} size="lg">
                    <ModalHeader toggle={this.toggle}>REDEEM POIN {String(this.props.detail.data.title).toUpperCase()}</ModalHeader>
                    <ModalBody>
                        <small className="text-muted">Detail Redeem</small>
                        <div className="card my-2">
                            <div className="card-body">
                                <div className=" d-flex justify-content-start align-items-end">
                                    <div className="w-25 me-2">
                                        <img src={this.props.detail.data.gambar} className="img-fluid" alt={this.props.detail.data.title}/>
                                    </div>
                                    <div className="w-75">
                                        <h5 className="text-dark m-0">{this.props.detail.data.title}</h5>
                                        <p className="text-secondary m-0">{this.props.detail.data.harga} POIN</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <small className="text-muted">Pilih Alamat</small>
                        <div className="my-2" style={{minHeight:'auto', maxHeight:'250px',overflow:'auto'}}>
                        {
                            !this.props.isLoading?typeof data==='object'?data.length>0?data.map((v,i)=>{
                                return(
                                    <div onClick={event => this.handleChange(i)} key={i} className={`card ${idx===i?'bg-primary':''}`} style={{paddingBottom:'0!important',cursor:"pointer"}}>
                                        <div className="card-body" style={{paddingBottom:'0!important'}}>
                                            <div className="single-contact-area d-flex">
                                                <div>
                                                    <p className={`font-weight-bold font-12 ${idx===i?'text-white':''}`}>
                                                        TIPE ALAMAT : <button className={"btn btn-success"}>{v.title}</button>
                                                    </p>
                                                    <h4 className={`font-18 font-weight-bold ${idx===i?'text-white':''}`}>{v.penerima}</h4>
                                                    <div className="contact-address mt-15">
                                                        <p className={`mb-2 font-weight-bold ${idx===i?'text-white':''}`}>
                                                            {v.main_address}
                                                        </p>
                                                        <p className={`mb-0 font-weight-bold ${idx===i?'text-white':''}`}>{v.no_hp}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }):"":"":(()=>{
                                let container =[];
                                for(let x=0; x<3; x++){
                                    container.push(
                                        <div className="single-contact-area d-flex" style={{padding:"10px"}}>
                                            <div className={"row"}>
                                                <div className="col-md-12">
                                                    <Skeleton width={400} height={20}/>
                                                    <Skeleton width={600} height={20}/>
                                                    <Skeleton width={300} height={20}/>
                                                    <Skeleton width={200} height={20}/>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return container;
                            })()
                        }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className={"btn btn-primary"} onClick={event => this.handleNext()}>LANJUT</button>
                    </ModalFooter>
                </WrapperModal>
                {
                    this.state.isModal?<ModalPin isLoading={this.props.isLoadingPost} code={this.state.code} save={this.handleSave} typePage={'detailRedeem'}/>:null
                }

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        data:state.alamatReducer.data,
        isLoading:state.alamatReducer.isLoading,
        isLoadingPost:state.redeemReducer.isLoadingPost,
        isError:state.redeemReducer.isError
    }
}
export default connect(mapStateToProps)(DetailRedeem);