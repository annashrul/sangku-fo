import React, { Component } from 'react';
import MemberForm from './src/member_form'
import {connect} from 'react-redux'
import Layout from 'components/Layout';
import { FetchAvailablePin } from '../../../../redux/actions/pin/pin.action';
import Preloader from 'Preloader'
import { setRegistered } from '../../../../redux/actions/authActions';
class AddMember extends Component {
    componentWillMount(){
        this.props.dispatch(FetchAvailablePin(1));
        this.props.dispatch(setRegistered(false));
    }
    render() {
        return (
            <Layout page="AddMember">
                {
                    !this.props.isLoading?
                    <MemberForm availPin={this.props.getPin}/>
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
        isLoading:state.isLoading
    }
}
export default connect(mapStateToProps)(AddMember);