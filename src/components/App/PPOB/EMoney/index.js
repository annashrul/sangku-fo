import React,{Component} from 'react'
import connect from "react-redux/es/connect/connect";
import TempPasca from "../temp_pasca"
class EMoney extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <TempPasca page={'GANTI'}/>
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(EMoney);