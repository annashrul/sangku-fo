import React,{Component} from 'react'
import connect from "react-redux/es/connect/connect";
import TempPasca from "../temp_pasca"
class PulsaSmsTelp extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <TempPasca page={'Pembayaran Pulsa SMS Telepon'}/>
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(PulsaSmsTelp);