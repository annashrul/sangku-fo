import React,{Component} from 'react'
import connect from "react-redux/es/connect/connect";
import TempPasca from "../temp_pasca"
class VoucherWifiid extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <TempPasca page={'Pembayaran Voucher Wifi ID'}/>
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(VoucherWifiid);