import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import Preloader from "Preloader";
import {FetchKurir} from "redux/actions/masterdata/kurir/kurir.action";
import ListKurir from "./src/list";


class Kurir extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            activeTab : 0,
            selectedIndex : 0,
            any : localStorage.getItem('any_kurir'),
            by : localStorage.getItem('by_kurir'),
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
        let anyKurir = localStorage.getItem("any_kurir");
        let pageKurir = localStorage.getItem("page_kurir");
        this.props.dispatch(FetchKurir(pageKurir?pageKurir:1,anyKurir?anyKurir:''));
    }
    //Use arrow functions to avoid binding
    handleSelect = (index) => {
        this.setState({selectedIndex: index}, () => {
        });
    };

    render(){
        return (
            <Layout page="Kurir">
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">
                            <div className="card-body">
                                
                            {
                                !this.props.isLoading ? ( <ListKurir
                                    token={this.state.token}
                                    data={this.props.Kurir}
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
    
    return {
        Kurir:state.kurirReducer.data,
        isLoading: state.kurirReducer.isLoading,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Kurir)