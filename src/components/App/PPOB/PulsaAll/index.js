import React,{Component} from 'react'
import connect from "react-redux/es/connect/connect";
import TempPasca from "../temp_pasca"
class PulsaAll extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <TempPasca page={'Pembayaran Pulsa All Operator'}/>
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(PulsaAll);