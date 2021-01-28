import React,{Component} from 'react';
import {connect} from "react-redux";
import TempPra from "../temp_pra";
class TrxBpjs extends Component{
    render(){
        return <TempPra page={"Pembayaran BPJS"}/>
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}


export default connect(mapStateToProps)(TrxBpjs);