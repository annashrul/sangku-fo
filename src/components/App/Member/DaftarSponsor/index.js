import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import SponsorList from './src/sponsor';
import { FetchNetwork } from 'redux/actions/member/network.action';
import Spinner from 'Spinner'
// import jQuery from 'jquery';
class DaftarSponsor extends Component{
   

   getProps(props){
      if(props.auth.user.referral_code!==undefined){
         this.props.dispatch(FetchNetwork(btoa(props.auth.user.referral_code),true,'sponsor'))
      }
   }

   componentDidMount() {
      this.getProps(this.props)
   }

   componentWillUnmount() {
      
   }
   componentDidUpdate(prevState){
      if(prevState.auth.user.referral_code!==this.props.auth.user.referral_code){
         this.getProps(this.props);
      }
   }

    render(){
       return (
            <Layout page="Daftar Sponsor">
               <div className="card">
                  <div className="card-body">

                        {/* ========================================================= */}
                        {
                        !this.props.isLoading?
                        <SponsorList dataList={this.props.list}/>
                        :<Spinner/>
                     }
                        {/* ====================================================== */}
                  </div>
               </div>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
   
   return {
      isLoading:state.networkReducer.isLoading,
      list:state.networkReducer.data,
      auth: state.auth
   }
}

export default connect(mapStateToProps)(DaftarSponsor)