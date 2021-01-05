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

class PenjualanReportExcel extends Component{
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
    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
    };
    printDocument = (e) => {
        e.preventDefault();
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
        let data = typeof this.props.penjualanReportExcel.data === 'object'?this.props.penjualanReportExcel.data.map(v=> [
           v.no_faktur_mutasi,
           moment(v.tgl_mutasi).format("DD-MM-YYYY"),
           v.lokasi_asal,
           v.lokasi_tujuan,
           v.no_faktur_beli,
           v.status==='0'?statusQ('info','Dikirim'):(v.status==='1'?statusQ('success','Diterima'):""),
           v.keterangan,
        ]):'';
        // data +=["TOTAL","","","","","","","","",tprice];
        to_pdf(
            "penjualan_",
            stringHtml,
            headers,
            data,
            // footer
        );
        this.toggle(e);
      }
    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "formPenjualanExcel"} size={this.state.view === false?'md':'xl'} aria-labelledby="contained-modal-title-vcenter" centered keyboard>
                {/* <ModalHeader toggle={this.toggle}>{this.props.detail===undefined?"Manage Export":"Update PenjualanExcel"}</ModalHeader> */}
                <form onSubmit={this.handleSubmit}>
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
                                        <img src={imgPdf} alt=""></img>
                                    </div>
                                    <div className="gallery-text-area">
                                        <div className="gallery-icon">
                                            <button type="button" className="btn btn-circle btn-lg btn-danger" onClick={(e => this.printDocument(e))}><i className="fa fa-print"></i></button>
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
                                                table={'laporan_penjualan'}
                                                filename={'laporan_penjualan'}
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
                        <table className="table table-hover table-bordered table-responsive"  id="laporan_penjualan" style={{display:this.state.view === false?'none':'inline-table'}}>
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
                                        this.props.penjualanReportExcel!==undefined? typeof this.props.penjualanReportExcel.data==='object'? this.props.penjualanReportExcel.data.length>0?
                                            this.props.penjualanReportExcel.data.map((v,i)=>{
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
                </form>
            </WrapperModal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        penjualanReportExcel:state.penjualanReducer.data_report_excel,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(PenjualanReportExcel);