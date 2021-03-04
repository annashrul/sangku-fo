import React,{Component} from 'react';
import connect from "react-redux/es/connect/connect";
import { FetchNetworkWebview } from 'redux/actions/member/network.action';
import Spinner from 'Spinner'
import BinaryNetwork from './src/network'
class Binary extends Component{

    getProps(props){
        const params = (atob(props.match.params.id)).split('|')
        console.log(params);
        this.props.dispatch(FetchNetworkWebview(btoa(params[0]), true, 'network', params[1]))
    }
   
    componentDidMount(){
        this.getProps(this.props)
    }
    // componentDidUpdate(prevState){
    //     if(prevState.auth.user.referral_code!==this.props.auth.user.referral_code){
    //         this.getProps(this.props);
    //     }
    // }
    render(){
        require("../../Member/Sponsor/sponsor-style.css"); // here
        require("./tree.css"); // here
        require("./treedev.css"); // here
        return (
                <div className="card">
                    <div className="card-body">
                        {
                            !this.props.isLoading?
                            <BinaryNetwork dataList={this.props.list}/>
                            :<Spinner/>
                        }
                    </div>
                </div>
        );
    }
}


const mapStateToProps = (state) => {
    // console.log(state.networkReducer)
    return {
        isLoading:state.networkReducer.isLoading,
        list:state.networkReducer.data,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Binary)