import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
// import Iframe from 'react-iframe';

// let items = [];
class Product extends Component{

    render(){
        return (
            <Layout page="Product">
                <div className="col-12 box-margin">
                    <div className="card">
                      {/* <div className="card-body">
                        <Iframe url="tree.html"
                          width="100%"
                          height="768px"
                          id="myId"
                          className="myClassname"
                          // display="initial"
                          // position="relative"
                          /> */}
                      {/* </div> */}
                    </div>
                </div>


            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        // users:state.usersReducer.data,
        // isLoading2: state.usersReducer.isLoading,
        // userLevel:state.userLevelReducer.data,
        // isLoading3: state.userLevelReducer.isLoading,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Product)