import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import { FetchNetwork } from 'redux/actions/member/network.action';
import Spinner from 'Spinner'
import BinaryNetwork from './src/network'
class Binary extends Component{

    getProps(props){
        this.props.dispatch(FetchNetwork(btoa(props.auth.user.referral_code),true,'network'))
    }
    // componentWillReceiveProps(nextProps){
    //     // if(this.state.arrs.length>0){

    //     // } else {
    //     //     this.setState({arrs:nextProps.list.data===undefined?[]:nextProps.list.data.data})
    //     // }
    //     this.getProps(nextProps);
    // }
    componentDidMount(){
        this.getProps(this.props)
    }
    componentDidUpdate(prevState){
        // if(this.state.arrs.length<=0){
            if(prevState.auth.user.referral_code!==this.props.auth.user.referral_code){
                // this.getProps(this.props)
                // this.props.dispatch(FetchNetwork(btoa('MB5711868825'),true))
                // this.props.dispatch(FetchNetwork(btoa(this.props.auth.user.referral_code),true))
                this.getProps(this.props);
            }
        // }
    }
    // componentWillMount(){
    //     this.getProps(this.props)
    // }
    render(){
        require("../../Member/Sponsor/sponsor-style.css"); // here
        require("./tree.css"); // here
        require("./treedev.css"); // here
        return (
            <Layout page="Genealogy Binary" subpage="Jaringan">
                <div className="card">
                    <div className="card-body">
                        {
                            !this.props.isLoading?
                            <BinaryNetwork dataList={this.props.list}/>
                            :<Spinner/>
                        }
                    </div>
                </div>
            </Layout>
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