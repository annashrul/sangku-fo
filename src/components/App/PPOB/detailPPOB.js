import React,{Component} from 'react'
import Layout from 'components/Layout'
import connect from "react-redux/es/connect/connect";
import ModalPin from "../modals/modal_pin";
import ModalSuccessScreenPPOB from "../modals/modal_success_screen_ppob";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import {toCurrency} from "../../../helper";
import {postCheckoutPPOB} from "../../../redux/actions/ppob/pulsa_all/pulsa_all.action";
import * as Swal from "sweetalert2";


class DetailPPOB extends Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state= {
            provider: '',
            no_telp: '',
            number: '',
            code: 0,
            retrievedObject: {}
        }
    }

    componentWillMount(){
        const rtr = localStorage.getItem('dataPPOB');
        let retrievedObject = JSON.parse(rtr);
        this.setState({
            retrievedObject:retrievedObject
        });

    }

    componentWillReceiveProps(nextProps){
        if(localStorage.dataPPOB===undefined){
            Swal.fire({
                title: '<strong>TRANSAKSI BERHASIL !!!!!!!</strong>',
                icon: 'success',
                html:"terimakasi telah bertransaksi disini .....",
            }).then((result) => {
                this.props.history.push({pathname: '/ppob'});
            })
        }
    }

    handleNext(){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("modalPin"));
    }
    handleSave(num){
        this.setState({
            code:num
        });
        const {retrievedObject}=this.state;
        let data={
            "code":retrievedObject.kode,
            "nohp":retrievedObject.nomor.replaceAll("-",""),
            "mtr_pln":"-",
            "pin":num
        }
        if(num.length===6){
            this.props.dispatch(postCheckoutPPOB(data));
        }

    }

    render(){
        const path = this.props.location.pathname;
        const {retrievedObject}=this.state;
        let page = path.split("/")[3].replaceAll('-',' ');
        return (
            <Layout page={`Checkout ${page}`} subpage="PPOB" link={"/ppob"}>
                <div className="row" style={{backgroundColor:"white",padding:"20px"}}>
                    <div className="col-md-8">
                        <table className={"table"}>
                            <thead>
                            <tr>
                                <th style={{border:"none",paddingLeft:"0"}}><h5 style={{color:"grey"}}><i className="fa fa-dot-circle-o font-30 text-info"/> Jenis Layanan</h5></th>
                                <th style={{border:"none"}}><h5 style={{color:"grey"}}>:</h5></th>
                                <th style={{border:"none"}}><h5>{retrievedObject.layanan}</h5></th>
                            </tr>
                            <tr>
                                <th style={{paddingLeft:"0"}}><h5 style={{color:"grey"}}><i className="fa fa-dot-circle-o font-30 text-info"/> Nomor</h5></th>
                                <th><h5 style={{color:"grey"}}>:</h5></th>
                                <th><h5>{retrievedObject.nomor}</h5></th>
                            </tr>
                            <tr>
                                <th style={{paddingLeft:"0"}}><h5 style={{color:"grey"}}><i className="fa fa-dot-circle-o font-30 text-info"/> Harga</h5></th>
                                <th><h5 style={{color:"grey"}}>:</h5></th>
                                <th><h5 className="txtRed">Rp {toCurrency(retrievedObject.harga)} .-</h5></th>
                            </tr>
                            {
                                page==='pulsa all operator'?(
                                    <tr>
                                        <th style={{paddingLeft:"0"}}><h5 style={{color:"grey"}}><i className="fa fa-dot-circle-o font-30 text-info"/> Nominal</h5></th>
                                        <th><h5 style={{color:"grey"}}>:</h5></th>
                                        <th><h5 className="txtRed">Rp {toCurrency(parseInt(retrievedObject.keterangan.split(' ')[1].replaceAll(".","")))} .-</h5></th>
                                    </tr>
                                ):null
                            }

                            <tr>
                                <th style={{border:"none",paddingLeft:"0"}}><h5 style={{color:"grey"}}><i className="fa fa-dot-circle-o font-30 text-info"/> Keterangan</h5></th>
                                <th style={{border:"none"}}><h5 style={{color:"grey"}}>:</h5></th>
                                <th style={{border:"none"}}><h5>{retrievedObject.keterangan}</h5></th>
                            </tr>
                            </thead>
                        </table>

                    </div>
                    <div className="col-md-4">
                        <div className="card ">
                            <div className="card-body ">
                                <h5>Ringkasan Pembayaran</h5><br/>
                                <h6 style={{color:"grey"}}>Metode Pembayaran</h6>
                                <h6>Saldo</h6><br/>
                                <h6 style={{color:"grey"}}>Subtotal</h6>
                                <h6 className="txtRed">Rp {toCurrency(retrievedObject.harga)} .-</h6>
                                <hr/>
                                <table className={"table"}>
                                    <thead>
                                    <tr>
                                        <th style={{border:"none",paddingLeft:"0"}}><h6 style={{color:"grey"}}>Total Tagihan</h6></th>
                                        <th style={{border:"none"}}><h4 className="txtRed text-right">Rp {toCurrency(retrievedObject.harga)} .-</h4></th>
                                    </tr>

                                    </thead>

                                </table>
                                <button className={"btn btn-primary btn-block"} onClick={event => this.handleNext()}>Bayar</button>
                            </div>
                        </div>

                    </div>

                </div>
                {
                    this.props.isOpen?<ModalPin isLoading={this.props.isLoadingPost} code={this.state.code} save={this.handleSave} typePage={''}/>:null
                }
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        auth:state.auth,
        isError:state.pulsa_allReducer.isError,
        isLoadingPost:state.pulsa_allReducer.isLoadingPost,
    }
}
export default connect(mapStateToProps)(DetailPPOB);