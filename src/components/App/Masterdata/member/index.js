import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import Preloader from "Preloader";
import {FetchMember} from "redux/actions/masterdata/member/member.action";
import ListMember from "./src/list";


class Member extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            activeTab : 0,
            selectedIndex : 0,
            any : localStorage.getItem('any_member'),
            by : localStorage.getItem('by_member'),
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
        let anyMember = localStorage.getItem("any_member");
        let pageMember = localStorage.getItem("page_member");
        this.props.dispatch(FetchMember(pageMember?pageMember:1,anyMember?anyMember:''));
    }
    //Use arrow functions to avoid binding
    handleSelect = (index) => {
        this.setState({selectedIndex: index}, () => {
        });
    };

    render(){
        return (
            <Layout page="Member">
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">
                            <div className="card-body">
                                
                            {
                                !this.props.isLoading ? ( <ListMember
                                    token={this.state.token}
                                    data={this.props.Member}
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
        Member:state.memberReducer.data,
        isLoading: state.memberReducer.isLoading,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Member)