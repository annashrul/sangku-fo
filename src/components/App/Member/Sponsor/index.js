import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import SponsorNode from './src/sponsor';
import { FetchNetwork } from 'redux/actions/member/network.action';
import Spinner from 'Spinner'
// import jQuery from 'jquery';
class Sponsor extends Component{
   //  constructor(props){
   //      super(props);
   //      this.state = {
   //          token:'',
   //          activeTab : 0,
   //          selectedIndex : 0,
   //          numChildren: 0,
   //          // data: JSON.parse('[{"id": 25,"slug": "mobiles","parent_id": null,"name": "Mobiles","hasChild":true,"pos":"right"},{"id": 30,"slug": "mobiles","parent_id": 25,"name": "Mobiles","hasChild":false,"pos":"right"},{"id": 26,"slug": "mobile-phones-accessories","parent_id": 25,"name": "Mobile Phones accessories","hasChild":true,"pos":"left"},{"id": 27,"slug": "computer-laptop","parent_id": 26,"name": "Computer & Laptop","hasChild":true,"pos":"right"},{"id": 28,"slug": "laptops","parent_id": 27,"name": "Laptops","hasChild":true,"pos":"left"},{"id": 29,"slug": "mobile-phones","parent_id": 26,"name": "Mobiles Phone","hasChild":true,"pos":"left"}]'),
   //          arr:[
   //              {
   //                 "id":25,
   //                 "parent_id":null,
   //                 "detail":{"name":"Mobiles"},
   //                 "hasChild":true,
   //              },
   //              {
   //                 "id":30,
   //                 "parent_id":25,
   //                 "detail":{"name":"Mobiles"},
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":26,
   //                 "parent_id":25,
   //                 "detail":{"name":"Mobile Phones accessories"},
   //                 "hasChild":true,
   //              },
   //              {
   //                 "id":34,
   //                 "parent_id":25,
   //                 "detail":{"name":"Mobile Phones accessories"},
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":35,
   //                 "parent_id":25,
   //                 "detail":{"name":"Mobile Phones accessories"},
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":36,
   //                 "parent_id":25,
   //                 "detail":{"name":"Mobile Phones accessories"},
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":37,
   //                 "parent_id":25,
   //                 "detail":{"name":"Mobile Phones accessories"},
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":27,
   //                 "parent_id":26,
   //                 "detail":{"name":"Computer & Laptop"},
   //                 "hasChild":true,
   //              },
   //              {
   //                 "id":31,
   //                 "parent_id":27,
   //                 "detail":null,
   //                 "hasChild":true,
   //              },
   //              {
   //                 "id":41,
   //                 "parent_id":31,
   //                 "detail":null,
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":42,
   //                 "parent_id":31,
   //                 "detail":null,
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":43,
   //                 "parent_id":31,
   //                 "detail":null,
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":39,
   //                 "parent_id":29,
   //                 "detail":null,
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":40,
   //                 "parent_id":29,
   //                 "detail":null,
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":32,
   //                 "parent_id":29,
   //                 "detail":null,
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":33,
   //                 "parent_id":29,
   //                 "detail":null,
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":28,
   //                 "parent_id":27,
   //                 "detail":{"name":"Laptops"},
   //                 "hasChild":false,
   //              },
   //              {
   //                 "id":29,
   //                 "parent_id":26,
   //                 "detail":{"name":"Mobiles Phone"},
   //                 "hasChild":true,
   //              }
   //           ]
   //      };
   //  }
   //  getCurrent = (node) => this.state.arr.filter(cNode => cNode.parent_id === node).map(cNode => (
   //      <li key={`node_${cNode.id}`}>
   //          <div className="eps-nc" nid={12}>
   //              <div className="usr-pic">
   //                  <img src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/business-man-1.jpg?itok=zhxmnAkU"
   //                      className="img" /> </div>
   //              <div className="usr-name">{cNode.detail===null?'Unknown':cNode.detail.name}</div>
   //              <div className="usr-popup">
   //                  <div className="popup-loader">
   //                      <div className="loader loader-bar" />
   //                  </div>
   //              </div>
   //          </div>
   //          {cNode.hasChild?
   //          <ul>
   //              {this.getCurrent(cNode.id)}
   //          </ul>
   //          :''}
   //      </li>
   //  ))

   getProps(props){
      if(props.auth.user.referral_code!==undefined){
         this.props.dispatch(FetchNetwork(btoa(props.auth.user.referral_code),true,'sponsor'))
      }
   }
   // componentWillReceiveProps(nextProps){
   //     // if(this.state.arrs.length>0){

   //     // } else {
   //     //     this.setState({arrs:nextProps.list.data===undefined?[]:nextProps.list.data.data})
   //     // }
   //     this.getProps(nextProps);
   // }
   componentDidMount(){
         this.getProps(this.props)
   }
   componentDidUpdate(prevState){
         // if(this.state.arrs.length<=0){
            if(prevState.auth.user.referral_code!==this.props.auth.user.referral_code){
               // this.getProps(this.props)
               // this.props.dispatch(FetchNetwork(btoa('MB5711868825'),true))
               // this.props.dispatch(FetchNetwork(btoa(this.props.auth.user.referral_code),true))
               this.getProps(this.props);
            }
         // }
         // if(this.props.auth.user.referral_code!==undefined){
         //    this.getProps(this.props)
         // }
   }

    render(){
       require("./sponsor-style.css"); // here
       require("../../Member/Binary/tree.css"); // here
       require("../../Member/Binary/treedev.css"); // here
       return (
            <Layout page="Sponsor">
               <div className="card">
                  <div className="card-body">

                        {/* ========================================================= */}
                        {
                        !this.props.isLoading?
                        <SponsorNode dataList={this.props.list}/>
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
   console.log(state)
   return {
      isLoading:state.networkReducer.isLoading,
      list:state.networkReducer.data,
      auth: state.auth
   }
}

export default connect(mapStateToProps)(Sponsor)