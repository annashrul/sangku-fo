import React, { Component } from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import SponsorNode from './src/sponsor';
import { FetchNetwork } from 'redux/actions/member/network.action';
import Spinner from 'Spinner'
import MyNProgress from '../../../../myNProgress';
// import jQuery from 'jquery';
class Sponsor extends Component {


   getProps(props) {
      if (props.auth.user.referral_code !== undefined) {
         this.props.dispatch(FetchNetwork(btoa(props.auth.user.referral_code), true, 'sponsor'))
      }
      var head = document.getElementsByTagName('head')[0];

      var cssnode3 = document.createElement('link');

      cssnode3.type = 'text/css';
      cssnode3.rel = 'stylesheet';
      cssnode3.href = '/sponsor/sponsor-style.css';
      head.appendChild(cssnode3);

      var cssnode = document.createElement('link');

      cssnode.type = 'text/css';
      cssnode.rel = 'stylesheet';
      cssnode.href = '/sponsor/tree.css';

      head.appendChild(cssnode);
      var cssnode2 = document.createElement('link');

      cssnode2.type = 'text/css';
      cssnode2.rel = 'stylesheet';
      cssnode2.href = '/sponsor/treedev.css';
      head.appendChild(cssnode2);

   }

   componentDidMount() {
      this.getProps(this.props)
   }

   componentWillUnmount() {
      document.querySelector("link[href='/sponsor/sponsor-style.css']").remove()
      document.querySelector("link[href='/sponsor/tree.css']").remove()
      document.querySelector("link[href='/sponsor/treedev.css']").remove()
   }
   componentDidUpdate(prevState) {
      if (prevState.auth.user.referral_code !== this.props.auth.user.referral_code) {
         this.getProps(this.props);
      }
   }

   render() {
      return (
         <Layout page="Sponsor">
            <MyNProgress isAnimating={this.props.isLoading} />
            <div className="card">
               <div className="card-body">

                  {/* ========================================================= */}
                  {
                     !this.props.isLoading ?
                        <SponsorNode dataList={this.props.list} />
                        : <Spinner />
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
      isLoading: state.networkReducer.isLoading,
      list: state.networkReducer.data,
      auth: state.auth
   }
}

export default connect(mapStateToProps)(Sponsor)