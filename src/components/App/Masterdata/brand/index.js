import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import Preloader from "Preloader";
import {FetchBrand} from "redux/actions/masterdata/brand/brand.action";
import ListBrand from "./src/list";


class Brand extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            activeTab : 0,
            selectedIndex : 0,
            any : localStorage.getItem('any_brand'),
            by : localStorage.getItem('by_brand'),
        };
    }
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.user) {
            // let access = nextProps.auth.user.access;
            // if(access!==undefined&&access!==null){
            //     if(nextProps.auth.user.access[10]['label']==="0"){
            //         alert("bukan halaman kamu");
            //         this.props.history.push({
            //             pathname: '/',
            //             state: {from: this.props.location.pathname}
            //         });
            //     }
            // }
        }
    }
    UNSAFE_componentWillMount(){
        let anyBrand = localStorage.getItem("any_brand");
        let pageBrand = localStorage.getItem("page_brand");
        this.props.dispatch(FetchBrand(pageBrand?pageBrand:1,anyBrand?anyBrand:''));
    }
    //Use arrow functions to avoid binding
    handleSelect = (index) => {
        this.setState({selectedIndex: index}, () => {
        });
    };

    render(){
        return (
            <Layout page="Brand">
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">
                            <div className="card-body">
                                
                            {
                                !this.props.isLoading ? ( <ListBrand
                                    token={this.state.token}
                                    data={this.props.Brand}
                                /> ) : <Preloader/>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        Brand:state.brandReducer.data,
        isLoading: state.brandReducer.isLoading,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Brand)