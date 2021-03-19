import React,{Component} from 'react';
import connect from "react-redux/es/connect/connect";
import SponsorNode from './src/sponsor';
import { FetchNetworkWebview } from 'redux/actions/member/network.action';
// import jQuery from 'jquery';
class Sponsor extends Component{

   getProps(props){
         const params = (atob(props.match.params.id)).split('|')
         this.props.dispatch(FetchNetworkWebview(btoa(params[0]), true, 'sponsor', params[1]))
   }
  
   componentDidMount(){
         this.getProps(this.props)
   }
   componentDidUpdate(prevState){
      if(prevState.auth.user.referral_code!==this.props.auth.user.referral_code){
         this.getProps(this.props);
      }
   }

    render(){
       require("./sponsor-style.css"); // here
       require("../../Member/Binary/tree.css"); // here
       require("../../Member/Binary/treedev.css"); // here
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