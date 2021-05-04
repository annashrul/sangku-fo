import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import { FetchNetwork } from 'redux/actions/member/network.action';
import Spinner from 'Spinner'
import BinaryNetwork from './src/network'
class Binary extends Component{

    getProps(props){
        console.log("data props",props.match.params.id);
        this.props.dispatch(FetchNetwork(btoa(props.match.params.id===undefined?props.auth.user.referral_code:atob(props.match.params.id)),true,'network'))
        var head = document.getElementsByTagName('head')[0];

        var cssnode3 = document.createElement('link');

        cssnode3.type = 'text/css';
        cssnode3.rel = 'stylesheet';
        cssnode3.href = '/genealogy/sponsor-style.css';
        head.appendChild(cssnode3);

        var cssnode = document.createElement('link');

        cssnode.type = 'text/css';
        cssnode.rel = 'stylesheet';
        cssnode.href = '/genealogy/tree.css';

        head.appendChild(cssnode);
        var cssnode2 = document.createElement('link');

        cssnode2.type = 'text/css';
        cssnode2.rel = 'stylesheet';
        cssnode2.href = '/genealogy/treedev.css';
        head.appendChild(cssnode2);

    }

    componentDidMount() {
        this.getProps(this.props)
    }

    componentWillUnmount() {
        document.querySelector("link[href='/genealogy/sponsor-style.css']").remove()
        document.querySelector("link[href='/genealogy/tree.css']").remove()
        document.querySelector("link[href='/genealogy/treedev.css']").remove()
    }
    componentDidUpdate(prevState){
            if(prevState.auth.user.referral_code!==this.props.auth.user.referral_code||prevState.match.params.id!==this.props.match.params.id){
                this.getProps(this.props);
            }
    }
    render(){
        
        return (
            <Layout page="Genealogy Binary" subpage="Jaringan">
                <div className="card">
                    <div className="card-body">
                        {
                            !this.props.isLoading?
                            <BinaryNetwork dataList={this.props.list} match={this.props.match}/>
                            :<Spinner/>
                        }
                    </div>
                </div>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    // 
    return {
        isLoading:state.networkReducer.isLoading,
        list:state.networkReducer.data,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Binary)