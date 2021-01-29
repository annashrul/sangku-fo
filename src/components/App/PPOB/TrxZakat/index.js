import React,{Component} from 'react';
import {connect} from "react-redux";
import TempPra from "../temp_pra";
class TrxZakat extends Component{
    render(){
        return <TempPra page={"Pembayaran Zakat"}/>
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}


export default connect(mapStateToProps)(TrxZakat);