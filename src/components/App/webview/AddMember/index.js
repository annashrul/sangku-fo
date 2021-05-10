import React, { Component } from 'react';
import MemberForm from './src/member_form'
import {connect} from 'react-redux'
// import { FetchAvailablePinWebView } from 'redux/actions/pin/pin.action';
import { setRegistered } from 'redux/actions/authActions';
import Preloader from 'PreloaderWebview'
import { FetchNetworkWebview } from '../../../../redux/actions/member/network.action';
import { FetchAvailablePinWebView } from '../../../../redux/actions/pin/pin.action';
// import { FetchNetworkWebview } from 'redux/actions/member/network.action';

class AddMember extends Component {

    constructor(props){
        super(props);
        this.state={
            posisi:'',
            raw_token:'',
            token:''
        }
    }
    componentWillMount(){
        const datum = (atob(decodeURIComponent(this.props.match.params.id))).split('|');
        const params = (atob(decodeURIComponent(datum[0]))).split('|');
        const uplines= JSON.parse(datum[1])
        this.setState({
            posisi: uplines.position,
            raw_token: datum[0],
            token: atob(params[1])
        })
        this.props.dispatch(FetchNetworkWebview(btoa(params[0]), true, 'network', params[1]));
        this.props.dispatch(FetchNetworkWebview(btoa(uplines.parent_id), true, 'network', params[1], true));

        this.props.dispatch(FetchAvailablePinWebView(atob(params[1])));
        this.props.dispatch(setRegistered(false));
        // this.props.dispatch(FetchNetwork(btoa(this.props.location.data===undefined?null:this.props.location.data.parent_id),true,'network'))
    }
    render() {
        
        return (
            <div>
                {
                    this.props.isLoading?<Preloader/>:
                    <MemberForm
                        availPin={this.props.getPin}
                        posisi={this.state.posisi}
                        raw_token={this.state.raw_token}
                        token={this.state.token}
                        dataUpline={this.props.upline[0]}
                        dataSponsor={this.props.list[0]}/>
                }
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        getPin:state.pinReducer.data_available,
        list:state.networkReducer.data,
        upline:state.networkReducer.upline,
        isLoading: state.networkReducer.isLoading
    }
}
export default connect(mapStateToProps)(AddMember);