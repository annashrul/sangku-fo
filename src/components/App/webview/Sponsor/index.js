import React,{Component} from 'react';
import connect from "react-redux/es/connect/connect";
import SponsorNode from './src/sponsor';
import { FetchNetworkWebview } from 'redux/actions/member/network.action';
// import jQuery from 'jquery';
class Sponsor extends Component{

   getProps(props){
         const params = (atob(props.match.params.id)).split('|')
         this.props.dispatch(FetchNetworkWebview(btoa(params[0]), true, 'sponsor', params[1]))
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
      if(prevState.auth.user.referral_code!==this.props.auth.user.referral_code){
         this.getProps(this.props);
      }
   }

    render(){
       return (
            <div>
                  {
                     !this.props.isLoading?
                     <SponsorNode dataList={this.props.list}/>
                     :''
                  }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
   console.log(state)
   return {
      isLoading:state.networkReducer.isLoading,
      list:state.networkReducer.data,
      auth: state.auth
   }
}

export default connect(mapStateToProps)(Sponsor)