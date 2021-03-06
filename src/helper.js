import React,{Component} from "react";
import jsPDF from "jspdf";
import Pagination from "react-js-pagination";
import connect from "react-redux/es/connect/connect";
import moment from "moment";
import Swal from "sweetalert2";
import dollarY from 'assets/status/dollar_y.svg'
import dollar from 'assets/status/dollar.svg'
import dollarWhite from 'assets/status/dollar_white.svg'
import pack_deliveryY from 'assets/status/pack_delivery_y.svg'
import pack_deliveryWhite from 'assets/status/pack_delivery_y_white.svg'
import pack_delivery from 'assets/status/pack_delivery_y_non.svg'
import pack_deliveredY from 'assets/status/pack_delivered_y.svg'
import pack_deliveredWhite from 'assets/status/pack_delivered_y_white.svg'
import pack_delivered from 'assets/status/pack_delivered_y_non.svg'
import truckY from 'assets/status/truck_y.svg'
import truckWhite from 'assets/status/truck_y_white.svg'
import truck from 'assets/status/truck_y_non.svg'
import confirmY from 'assets/status/confirmation.svg'
import confirmWhite from 'assets/status/confirmation_white.svg'
import confirm from 'assets/status/confirmation_non.svg'
import { isMobileOnly } from "react-device-detect";
import Axios from "axios";
// import { renderToString } from 'react-dom/server';




export const validatePhoneNumber=(no)=>{
    let err='';
    if(no.length<10){
        err='Nomor terlalu pendek, minimal 10 karakter';
    }
    if(no.length>14){
        err='Nomor terlalu panjang, maksimal 14 karakter';
    }
    return err;
}

export const dataPPOB=()=>{
    return [
        { code:"62838",value: "AXIS", label: "AXIS", icon: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Axis_logo.png", isDisabled: true },
        { code:"62857",value: "INDOSAT", label: "INDOSAT", icon: "https://seeklogo.com/images/I/indosat-ooredoo-logo-1020D6C606-seeklogo.com.png", isDisabled: true }
    ];
}

export const dataPascabayar=()=>{
    return [
        {title:"AETRA JAKARTA (Biaya Admin Rp. 2,750)"},
        {title:"PALYJA JAKARTA (Biaya Admin Rp. 3,300)"},
        {title:"PDAM KAB. BALANGAN (Biaya Admin Rp. 3,200)"},
        {title:"PDAM KAB. BANGKALAN (Biaya Admin Rp. 3,000)"},
        {title:"PDAM KAB. BATANG (Biaya Admin Rp. 3,400)"},
        {title:"PDAM KAB. BOGOR (Biaya Admin Rp. 3,600)"},
        {title:"PDAM KAB. BOJONEGORO (Biaya Admin Rp. 2,800)"},
        // {title:"PDAM KAB. BOJONEGORO (Biaya Admin Rp. 2,800)"},
        // {title:"PDAM KAB. BOJONEGORO (Biaya Admin Rp. 2,800)"},
        // {title:"PDAM KAB. BOJONEGORO (Biaya Admin Rp. 2,800)"},
        // {title:"PDAM KAB. BOJONEGORO (Biaya Admin Rp. 2,800)"},
        // {title:"PDAM KAB. BOJONEGORO (Biaya Admin Rp. 2,800)"},
    ];
}




export const noImage=()=>{
    return 'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png';
}

export const statusOrder=(type,status,iswhite=false)=>{
    if(type==='dollar'){
        return (!iswhite?(status?dollarY:dollar):dollarWhite)
    } else if (type === 'packing') {
        return (!iswhite ? (status ? pack_deliveryY : pack_delivery) : pack_deliveryWhite)
    } else if (type === 'delivered') {
        return (!iswhite?(status ? pack_deliveredY : pack_delivered): pack_deliveredWhite)
    } else if (type === 'truck') {
        return (!iswhite?(status ? truckY : truck):truckWhite)
    } else if (type === 'confirm') {
        return (!iswhite ? (status ? confirmY : confirm) : confirmWhite)
    }
}

export const stringifyFormData = (fd) => {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return data;
}
export const to_pdf = (filename,title='',header=[],body=[],footer=[])=>{
    const doc = jsPDF('portrait', 'pt', 'A4');
    // const marginLeft = 40;
    doc.setFontSize(15);
    let content = {
        headStyles:{backgroundColor:[0,0,0,0]},
        footStyles:{},
        bodyStyles:{lineWidth: 1, lineColor: [33, 33, 33], marginBottom:20},
        theme:'grid',
        startY: 100,
        head: header,
        body: body,
        foot:footer,
        margin: {bottom: 60, top: 40}
    };
    // doc.html(title, marginLeft, 40, {'align':'center' });
    doc.html(title);
    // doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    // addFooters(doc);
    return doc.save(filename+"report.pdf");

}
export const to_pdf_l = (filename,title='',header=[],body=[],footer=[])=>{
    // const doc = jsPDF('landscape', 'pt', 'A4');
    // const marginLeft = 10;
    // doc.setFontSize(10);
    // let content = {
    //     headStyles:{backgroundColor:[0,0,0,0]},
    //     footStyles:{},
    //     bodyStyles:{lineWidth: 1, lineColor: [33, 33, 33], marginBottom:20},
    //     theme:'grid',
    //     startY: 100,
    //     head: header,
    //     body: body,
    //     foot:footer,
    //     margin: {bottom: 60, top: 40}
    // };
    // doc.fromHTML(title, marginLeft, 10, {'align':'center' });
    // // doc.text(title, marginLeft, 40);
    // doc.autoTable(content);
    // addFooters(doc);
    // return doc.save(filename+"report.pdf");

}

export const addFooters = doc => {
    var width   = doc.internal.pageSize.getWidth();
    var height  = doc.internal.pageSize.getHeight();
    doc.page=1;
    // const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(7);
    doc.text(width-40, height - 30, 'Page - ' + doc.page);
    doc.page ++;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    return doc;
}
var date = new Date();
date.setDate(date.getDate());
export const rangeDate = {
    'Hari Ini'          : [moment(),moment()],
    'Kemarin'           : [date.setDate(date.getDate()-1), date.setDate(date.getDate())],
    '7 Hari Terakhir'   : [moment().subtract(6, 'days'), moment()],
    '30 Hari Terakhir'  : [moment().subtract(29, 'days'), moment()],
    'Minggu Ini'        : [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
    'Minggu Lalu'       : [moment().subtract(1, 'weeks').startOf('isoWeek'), moment().subtract(1, 'weeks').endOf('isoWeek')],
    'Bulan Ini'         : [moment().startOf('month'), moment().endOf('month')],
    'Bulan Lalu'        : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    'Tahun Ini'         : [moment().startOf('year'), moment().endOf('year')],
    'Tahun Lalu'        : [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
};



export const toMoney = (angka) => {
    return angka.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
// export const toCurrency = (angka) => {
//     return isEmpty(angka)?'':angka.toString().replace(/,|\D/g,'').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
export const toCurrency = (angka) => {
    let numbers=0;
    if(angka===null) return 0;
    if (parseInt(angka) === 0) return 0;
    if(parseFloat(angka)<0){
        numbers = angka.toString().replace('-', '');
        
    }else{
        numbers=angka;
    }
    var number_string = (numbers===''||numbers===undefined)? String(0.0) : numbers.toString().replace(/,|\D/g,''),
        split = number_string.split('.'),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan koma jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        var separator = sisa ? ',' : '';
        rupiah += separator + ribuan.join(',');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    rupiah = (parseFloat(angka) < 0) ? "-" + rupiah.replace(/^0+/, ''):rupiah.replace(/^0+/, '');
    return rupiah;
}
export const rmComma = (angka) => {
    let numbers=0;
    if(parseFloat(angka)<0){
        numbers = angka.toString().replace('-', '');
    }else{
        numbers=angka;
    }
    var number_string = (numbers===''||numbers===undefined)? String(0.0) : numbers.toString().replace(/,|\D/g,''),
        split = number_string.split('.'),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        rupiah += ribuan.join('');
    }

    rupiah = split[1] !== undefined ? rupiah + '' + split[1] : rupiah;
    rupiah = (parseFloat(angka) < 0) ? "-" + rupiah.replace(/^0+/, ''):rupiah.replace(/^0+/, '');
    return parseInt(rupiah,10);
}
// export const rmComma = (angka) => {
//     
//     return parseInt(isEmpty(angka)?0:angka.toString().replace(/,/g,''),10);
// }
export const toPersen= (val1,val2) => {
    let con =  (parseFloat(val1)/parseInt(val2,10))*100;
    return con.toFixed(2);
}
export const toNominal= (val1,val2) => {
    let con =  parseFloat(val1) * (parseFloat(val2)/100);
    return con.toFixed(2);
}

export const toRp = (angka,usePrefix=false) => {
    // return Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(txt);
    // var number_string = angka.toString().replace(/[^,\d]/g, ''),
    let numbers=0;
    if(parseFloat(angka)<0){
        numbers = angka.toString().replace('-', '');
    }else{
        numbers=angka;
    }
    var number_string = (numbers===''||numbers===undefined||numbers===null)? String(0.0) : numbers.toString(),
        split = number_string.split('.'),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    rupiah = (parseFloat(angka) < 0) ? "-" + rupiah:rupiah;
    return usePrefix?"Rp "+rupiah:rupiah;
};
export const ToastQ = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }

})
export const statusQ = (lbl,txt) => {
    if(lbl === 'success'){
        return <button className="btn btn-success btn-sm btn-status" style={{fontSize:'8px'}}>{txt}</button>
    }else if(lbl==='danger'){
        return <button className="btn btn-danger btn-sm btn-status" style={{fontSize:'8px'}}>{txt}</button>
    }else if(lbl==='warning'){
        return <button className="btn btn-warning btn-sm btn-status" style={{fontSize:'8px',color:'white'}}>{txt}</button>
    }else if(lbl==='info'){
        return <button className="btn btn-info btn-sm btn-status" style={{fontSize:'8px'}}>{txt}</button>
    }

};

export const getMargin = (hrg_jual,hrg_beli) => {
    return (((parseInt(hrg_jual,10)-parseInt(hrg_beli,10))/parseInt(hrg_beli,10))*100).toFixed(2);
};

export const kassa = (param='')=>{
    let data=[];
    if(param==='semua'){
        data.push({value: "",label: "Semua Kassa"})
    }
    data.push(
        {value: "A",label: "A"},{value: "B",label: "B"},{value: "C",label: "C"},{value: "D",label: "D"},{value: "E",label: "E"},{value: "F",label: "F"},{value: "G",label: "G"},{value: "H",label: "H"},
        {value: "I",label: "I"},{value: "J",label: "J"},{value: "K",label: "K"},{value: "L",label: "L"},{value: "M",label: "M"},{value: "N",label: "N"},{value: "O",label: "O"},{value: "P",label: "P"},
        {value: "Q",label: "Q"},{value: "R",label: "R"},{value: "S",label: "S"},{value: "T",label: "T"},{value: "U",label: "U"},{value: "V",label: "V"},{value: "W",label: "W"},{value: "X",label: "X"},
        {value: "Y",label: "Y"},{value: "Z",label: "Z"}
    );
    return data;
};

export const lengthBrg = (str)=>{
    let txt = str.length>15?`${str.substr(0,15)} ...`:str;
    return txt.toLowerCase();
}
export const CapitalizeEachWord=(str)=>{
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

export const emptyCache = ()=>{
    if('caches' in window){
        caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach(name => {
                caches.delete(name);
            })
        });

        Axios.defaults.headers = {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        };

        // Makes sure the page reloads. Changes are only visible after you refresh.
        document.cookie = "sangqu_datum=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "sangqu_exp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.replace(`/login`); //Removes the current page from the session history and navigates to the given URL.
    }
}
class Paginationq extends Component{
    // constructor(props){
    //     super(props);
    // }
    render(){
        return (
            <Pagination
                activePage={parseInt(this.props.current_page,10)}
                itemsCountPerPage={parseInt(this.props.per_page,10)}
                totalItemsCount={parseInt(this.props.total,10)}
                pageRangeDisplayed={3}
                onChange={this.props.callback}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="page-item active"
                disabledClass="page-item disabled"
                prevPageText={!isMobileOnly?'Sebelumnya':'<'}
                nextPageText={!isMobileOnly?'Selanjutnya':'>'}
                firstPageText={!isMobileOnly?'Pertama':'<<'}
                lastPageText={!isMobileOnly?'Terakhir':'>>'}
            />
        )
    }
}


export default connect()(Paginationq)