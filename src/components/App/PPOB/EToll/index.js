import React,{Component} from 'react';
import {connect} from "react-redux";
import TempPra from "../temp_pra";
class EToll extends Component{
    render(){
        return <TempPra page={"Pembayaran E-Toll"}/>
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}


export default connect(mapStateToProps)(EToll);