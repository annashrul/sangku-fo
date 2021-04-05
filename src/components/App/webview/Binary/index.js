import React,{Component} from 'react';
import connect from "react-redux/es/connect/connect";
import { FetchNetworkWebview } from 'redux/actions/member/network.action';
import BinaryNetwork from './src/network'
class Binary extends Component{

    getProps(props){
        const params = (atob(props.match.params.id)).split('|')
        this.props.dispatch(FetchNetworkWebview(btoa(params[0]), true, 'network', params[1]))

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
   
    componentDidMount(){
        this.getProps(this.props)
    }

    componentWillUnmount() {
        document.querySelector("link[href='/genealogy/sponsor-style.css']").remove()
        document.querySelector("link[href='/genealogy/tree.css']").remove()
        document.querySelector("link[href='/genealogy/treedev.css']").remove()
    }
    
    render(){
        return (
                <div>
                    {
                        !this.props.isLoading?
                        <BinaryNetwork dataList={this.props.list} datum={this.props.match.params.id}/>
                        :''
                    }
                </div>
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