import React, { Component } from 'react';
import MemberForm from './src/member_form'
import {connect} from 'react-redux'
import Layout from 'components/Layout';
import { FetchAvailablePin } from 'redux/actions/pin/pin.action';
import Preloader from 'Preloader'
import { setRegistered } from 'redux/actions/authActions';
import { FetchNetwork } from 'redux/actions/member/network.action';
class AddMember extends Component {
    componentWillMount(){
        this.props.dispatch(FetchAvailablePin(1));
        this.props.dispatch(setRegistered(false));
        this.props.dispatch(FetchNetwork(btoa(this.props.location.data===undefined?null:this.props.location.data.parent_id),true))
    }
    render() {
        console.log(this.props.location.data)
        return (
            <Layout page="AddMember">
                {
                    !this.props.isLoading?
                    <MemberForm availPin={this.props.getPin} dataAdd={this.props.location.data} dataUpline={this.props.list} dataId={this.props.location.data===undefined?null:this.props.location.data.parent_id}/>
                    :<Preloader/>
                }
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        getPin:state.pinReducer.data_available,
        list:state.networkReducer.data,
        isLoading:state.isLoading
    }
}
export default connect(mapStateToProps)(AddMember);