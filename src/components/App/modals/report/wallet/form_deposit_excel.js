import React,{Component} from 'react';
import {ModalToggle} from "redux/actions/modal.action";
import connect from "react-redux/es/connect/connect";
import WrapperModal from "../../_wrapper.modal";
import {ModalBody} from "reactstrap";
import moment from "moment";
// import {to_pdf} from "helper";
import imgExcel from 'assets/xlsx.png';
import imgCsv from 'assets/csv.png';
// import "jspdf-autotable";
import XLSX from 'xlsx'
import { toRp } from 'helper';
import MyProgressbar from 'myProgressbar';

class DepositReportExcel extends Component{
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
        '<h3 style="text-align:center"><center>LAPORAN RECEIVE</center></h3>'+
        '</div>';
        
        const headers = [[
            "No Faktur",
            "Tanggal",
            "Penerima",
            "Tipe",
            "Pelunasan",
            "Diskon",
            "PPN",
            "Supplier",
            "Operator",
            "Lokasi",
            "Serial",
            "Kontrabon",
            "Jumlah Kontabon",
            "Qty Beli",
            "Total Beli",
        ]];
        let data = typeof this.props.depositReportExcel.data === 'object'?this.props.depositReportExcel.data.map(v=> [
           v.no_faktur_beli,
           moment(v.tgl_beli).format("YYYY-MM-DD"),
           v.nama_penerima,
           v.type,
           v.pelunasan,
           v.disc,
           v.ppn,
           v.supplier,
           v.operator,
           v.lokasi,
           v.serial,
           v.kontabon,
           v.jumlah_kontrabon,
           v.qty_beli,
           v.total_beli,
        ]):'';
        // data +=["TOTAL","","","","","","","","",tprice];
        // to_pdf(
        //     "deposit_",
        //     stringHtml,
        //     headers,
        //     data,
        //     // footer
        // );
        this.toggle(e);
      }
      printDocumentXLsx = (e,param) => {
        e.preventDefault();

        let header = [
                        ['LAPORAN PENARIKAN'],
                        ['PERIODE : '+this.props.startDate + ' - ' + this.props.endDate+''],
                        [''],
                        [
                            'No Faktur',
                            'Tanggal',
                            // 'Nama Pemilik Bank',
                            'Bank',
                            // 'No. Akun',
                            'Amount',
                            'Fee',
                            // 'Nama',
                            'Status',
                        ]
                    ]
        let footer = [
                        // ['TOTAL','','','','',toRp(this.props.totalPenjualanExcel.omset),toRp(this.props.totalPenjualanExcel.dis_item),toRp(this.props.totalPenjualanExcel.dis_rp),this.props.totalPenjualanExcel.dis_persen,'','','','',toRp(this.props.totalPenjualanExcel.kas_lain),'',toRp(this.props.totalPenjualanExcel.gt),toRp(this.props.totalPenjualanExcel.rounding),toRp(this.props.totalPenjualanExcel.bayar),toRp(this.props.totalPenjualanExcel.change),toRp(this.props.totalPenjualanExcel.jml_kartu),toRp(this.props.totalPenjualanExcel.charge),'','','','']
                    ]
        // Kd Trx	Tanggal	Jam	Customer	Kasir	Omset	Diskon			HPP	Hrg Jual	Profit	Reg.Member	Trx Lain	Keterangan	Grand Total	Rounding	Tunai	Change	Transfer	Charge	Nama Kartu	Status	Lokasi	Jenis Trx
                        // Peritem(%)	Total(rp)	Total(%)	
                        															

        let raw = typeof this.props.depositReportExcel.data === 'object'?this.props.depositReportExcel.data.map(v => [
            v.kd_trx,
            moment(v.created_at).format("YYYY-MM-DD"),
            // v.acc_name,
            v.bank_name,
            // v.acc_no,
            toRp(v.amount),
            v.charge,
            // v.full_name,
            v.status===0?'Pending':v.status===1?'Selesai':v.status===2?'Batal':''
        ]):'';

        let body = header.concat(raw);

        let data = footer===undefined||footer===[]?body:body.concat(footer);

        // let data = this.props.saleReportExcel.data;
        
        let ws = XLSX.utils.json_to_sheet(data, {skipHeader:true});
        // let ws = XLSX.utils.json_to_sheet(data, {header:header,skipHeader:true});
        let merge = [
                {s: {r:0, c:0},e: {r:0, c:14}},
                {s: {r:1, c:0},e: {r:1, c:14}},
            ];
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'] = merge;
        ws['!ref'] = XLSX.utils.encode_range({
            s: { c: 0, r: 0 },
            e: { c: 14, r: 1 + data.length + 1}
        });
        ws["A1"].s = {
            alignment: {
                vertical: 'center',
            }
        };
        
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        let exportFileName = `Laporan_Deposit_${moment(new Date()).format('YYYYMMDDHHMMss')}.${param==='csv'?`csv`:`xlsx`}`;
        XLSX.writeFile(wb, exportFileName, {type:'file', bookType:param==='csv'?"csv":"xlsx"});

        this.toggle(e);
    }
    render(){
        // const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        // const {data} = this.props.data;
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "formDepositExcel"} size={this.state.view === false?'md':'xl'} aria-labelledby="contained-modal-title-vcenter" centered keyboard>
                {/* <ModalHeader toggle={this.toggle}>{this.props.detail===undefined?"Manage Export":"Update DepositExcel"}</ModalHeader> */}
                <form onSubmit={this.handleSubmit}>
                    {!this.props.isLoading?
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
                                        <img src={imgExcel} alt=""></img>
                                    </div>
                                    <div className="gallery-text-area">
                                        <div className="gallery-icon">
                                            <button type="button" className="btn btn-circle btn-lg btn-success" onClick={(e => this.printDocumentXLsx(e,'xlsx'))}><i className="fa fa-print"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="single-gallery--item">
                                    <div className="gallery-thumb">
                                        <img src={imgCsv} alt=""></img>
                                    </div>
                                    <div className="gallery-text-area">
                                        <div className="gallery-icon">
                                            <button type="button" className="btn btn-circle btn-lg btn-success" onClick={(e => this.printDocumentXLsx(e,'csv'))}><i className="fa fa-print"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-6 offset-3">
                                <div className="single-gallery--item">
                                    <div className="gallery-thumb">
                                        <img src={imgExcel} alt=""></img>
                                    </div>
                                    <div className="gallery-text-area">
                                        <div className="gallery-icon" onClick={(e => this.toggle(e))}>
                                            <ReactHTMLTableToExcel
                                                className="btn btn-circle btn-lg btn-success"
                                                table={'laporan_deposit'}
                                                filename={'laporan_deposit'}
                                                sheet="kas"
                                                buttonText={<i className="fa fa-print"></i>}>
                                            </ReactHTMLTableToExcel>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {/* <div className="row mt-4">
                            <div className="col-12">
                                <button type="button" className="btn btn-info float-right">CLOSE</button>
                            </div>
                        </div> */}
                        {/* <hr></hr> */}
                    </ModalBody> : 
                    <MyProgressbar myprogressbarLabel={`Sedang memuat data ${this.props.persenDl}%`} myprogressbarPersen={this.props.persenDl+'%'}/>
                    // <Spinner spinnerLabel={`Sedang memuat data ${this.props.persenDl}%`}/>
                    }
                </form>
            </WrapperModal>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        // data:state.depositReducer.data,
        isLoading: state.depositReducer.isLoading,
        persenDl: state.depositReducer.persenDl,
        depositReportExcel:state.depositReducer.data_report_excel,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(DepositReportExcel);