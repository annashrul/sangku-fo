import React,{Component} from 'react';
import {connect} from "react-redux";
import TempPra from "../temp_pra";
class TrxPdam extends Component{
    render(){
        return <TempPra page={"Pembayaran PDAM"}/>
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}


export default connect(mapStateToProps)(TrxPdam);