import React,{Component} from 'react';
import {connect} from "react-redux";
import TempPra from "../temp_pra";
class TrxTelpPasca extends Component{
    render(){
        return <TempPra page={"Pembayaran Telepon Pascabayar"}/>
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}


export default connect(mapStateToProps)(TrxTelpPasca);