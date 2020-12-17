import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import Preloader from "Preloader";
import {FetchPromo} from "redux/actions/masterdata/promo/promo.action";
import ListPromo from "./src/list";


class Promo extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            activeTab : 0,
            selectedIndex : 0,
            any : localStorage.getItem('any_promo'),
            by : localStorage.getItem('by_promo'),
        };
    }
    componentWillReceiveProps = (nextProps) => {
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
    componentWillMount(){
        let anyPromo = localStorage.getItem("any_promo");
        let pagePromo = localStorage.getItem("page_promo");
        this.props.dispatch(FetchPromo(pagePromo?pagePromo:1,anyPromo?anyPromo:''));
    }
    //Use arrow functions to avoid binding
    handleSelect = (index) => {
        this.setState({selectedIndex: index}, () => {
        });
    };

    render(){
        return (
            <Layout page="Promo">
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">
                            <div className="card-body">
                                
                            {
                                !this.props.isLoading ? ( <ListPromo
                                    token={this.state.token}
                                    data={this.props.Promo}
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
        Promo:state.promoReducer.data,
        isLoading: state.promoReducer.isLoading,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Promo)