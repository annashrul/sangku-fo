import React,{Component} from 'react';
import {ModalToggle} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
import WrapperModal from "../../_wrapper.modal";
import {ModalBody} from "reactstrap";
import moment from "moment";
import {to_pdf,statusQ} from "helper";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import jsPDF from 'jspdf';
import imgExcel from 'assets/xls.png';
import imgPdf from 'assets/pdf.png';
import "jspdf-autotable";
import {getReportPembelianExcel} from "../../../../../redux/actions/transaction/pembelian.action";
// import { renderToString } from 'react-dom/server';

class PembelianReportExcel extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleView = this.handleView.bind(this);
        this.printDocument = this.printDocument.bind(this);
        this.state = {
            title:'',
            jenis: '',
            type:'',
            view:false,
            error:{
                title:'',
                jenis: '',
                type:'',
            }
        };

    }
    handleView = (e) => {
        e.preventDefault();
        this.setState({
            view:!this.state.view
        })
    }
    componentWillMount(){
        this.props.dispatch(getReportPembelianExcel('page=1'));
    }
    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps",nextProps.pembelianReportExcel)
    }
    toggle = (e) => {
        e.preventDefault();
        localStorage.removeItem("modalExportReport");
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
    };
    printDocument = (e) => {
        // e.preventDefault();
        let stringHtml = '';
        stringHtml+=
        '<div style="text-align:center>'+
        '<h3 align="center"><center>PERIODE : '+this.props.startDate + ' - ' + this.props.endDate+'</center></h3>'+
        '<h3 align="center"><center>&nbsp;</center></h3>'+
        '<h3 style="text-align:center"><center>LAPORAN MUTASI</center></h3>'+
        '</div>';

        const headers = [[
            "Kode Faktur",
            "Tanggal Mutasi",
            "Lokasi Asal",
            "Lokasi Tujuan",
            "No. Faktur Beli",
            "Status",
            "Keterangan",
        ]];
        let data = typeof this.props.pembelianReportExcel.data === 'object'?this.props.pembelianReportExcel.data.map(v=> [
           v.kd_trx,
           moment(v.created_at).format("DD-MM-YYYY"),
           "LOKASI ASAL",
           "LOKASI TUJUAN",
            v.kd_trx,
            v.kd_trx,
            v.kd_trx,
        ]):'';
        to_pdf(
            "pembelian_",
            stringHtml,
            headers,
            data,
            // footer
        );
        console.log(data);
        // this.toggle(e);
      }
    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "formPembelianExcel"} size={this.state.view === false?'md':'xl'} aria-labelledby="contained-modal-title-vcenter" centered keyboard>
                {/* <ModalHeader toggle={this.toggle}>{this.props.detail===undefined?"Manage Export":"Update PembelianExcel"}</ModalHeader> */}
                <ModalBody>
                    <button type="button" className="close"><span aria-hidden="true" onClick={(e => this.toggle(e))}>×</span><span className="sr-only">Close</span></button>
                    <h3 className="text-center">Manage Export</h3>
                    <div className="row mb-4">
                        {/* <div className="col-4">
                                <button type="button" className="btn btn-info btn-block" onClick={(e => this.handleView(e))}>VIEW</button>
                            </div> */}
                        <div className="col-6">
                            <div className="single-gallery--item">
                                <div className="gallery-thumb">
                                    <img src={imgPdf} alt=""/>
                                </div>
                                <div className="gallery-text-area">
                                    <div className="gallery-icon">
                                        {/*<button onClick={print}>print</button>*/}

                                        <button type="button" className="btn btn-circle btn-lg btn-danger" onClick={(e => this.printDocument(e))}>
                                        <i className="fa fa-print"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="single-gallery--item">
                                <div className="gallery-thumb">
                                    <img src={imgExcel} alt=""></img>
                                </div>
                                <div className="gallery-text-area">
                                    <div className="gallery-icon" onClick={(e => this.toggle(e))}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-circle btn-lg btn-success"
                                            table={'laporan_pembelian'}
                                            filename={'laporan_pembelian'}
                                            sheet="kas"
                                            buttonText={<i className="fa fa-print"></i>}>
                                        </ReactHTMLTableToExcel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row mt-4">
                            <div className="col-12">
                                <button type="button" className="btn btn-info float-right">CLOSE</button>
                            </div>
                        </div> */}
                    {/* <hr></hr> */}
                    <table className="table table-hover table-bordered table-responsive"  id="laporan_pembelian" style={{display:this.state.view === false?'none':'inline-table'}}>
                        <thead className="bg-light">
                        <tr>
                            <th className="text-black" colSpan={7}>{this.props.startDate} - {this.props.startDate}</th>
                        </tr>
                        <tr>
                            <th className="text-black" colSpan={7}>LAPORAN ALOKASI MUTASI</th>
                        </tr>

                        <tr>
                            <th className="text-black" rowSpan="2" style={columnStyle}>Kode Faktur</th>
                            <th className="text-black" rowSpan="2" style={columnStyle}>Tanggal Mutasi</th>
                            <th className="text-black" rowSpan="2" style={columnStyle}>Lokasi Asal</th>
                            <th className="text-black" rowSpan="2" style={columnStyle}>Lokasi Tujuan</th>
                            <th className="text-black" rowSpan="2" style={columnStyle}>No. Faktur Beli</th>
                            <th className="text-black" rowSpan="2" style={columnStyle}>Status</th>
                            <th className="text-black" rowSpan="2" style={columnStyle}>Keterangan</th>
                        </tr>
                        <tr></tr>
                        </thead>
                        {
                            <tbody>
                            {
                                this.props.pembelianReportExcel!==undefined? typeof this.props.pembelianReportExcel.data==='object'? this.props.pembelianReportExcel.data.length>0?
                                    this.props.pembelianReportExcel.data.map((v,i)=>{
                                        return (
                                            <tr key={i}>
                                                <td style={columnStyle}>{v.no_faktur_mutasi}</td>
                                                <td style={columnStyle}>{moment(v.tgl_mutasi).format("DD-MM-YYYY")}</td>
                                                <td style={columnStyle}>{v.lokasi_asal}</td>
                                                <td style={columnStyle}>{v.lokasi_tujuan}</td>
                                                <td style={columnStyle}>{v.no_faktur_beli}</td>
                                                <td style={columnStyle}>{v.status==='0'?statusQ('info','Dikirim'):(v.status==='1'?statusQ('success','Diterima'):"")}</td>
                                                <td style={columnStyle}>{v.keterangan}</td>
                                            </tr>
                                        );
                                    }) : "No data." : "No data." : "No data."
                            }
                            </tbody>
                        }
                    </table>
                </ModalBody>
            </WrapperModal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pembelianReportExcel:state.pembelianReducer.data_report_excel,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isLoadingReportExcel:state.pembelianReducer.isLoadingReportExcel
    }
}
export default connect(mapStateToProps)(PembelianReportExcel);