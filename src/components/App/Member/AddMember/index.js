import React, { Component } from 'react';
import MemberForm from './src/member_form'
import {connect} from 'react-redux'
import Layout from 'components/Layout';

class AddMember extends Component {
    render() {
        return (
            <Layout page="AddMember">
                <MemberForm/>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.auth
    }
}
export default connect(mapStateToProps)(AddMember);