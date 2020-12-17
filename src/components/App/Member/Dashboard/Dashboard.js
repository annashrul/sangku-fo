import React, { Component } from 'react';
import Index from './src/index'
import {connect} from 'react-redux'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Index/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Dashboard);