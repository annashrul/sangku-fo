import React,{Component} from 'react'
import connect from "react-redux/es/connect/connect";
import TempPasca from "../temp_pasca"
class PaketData extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <TempPasca page={'Pembayaran Paket Data'}/>
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(PaketData);