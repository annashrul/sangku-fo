import React, { Component } from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import { FetchNetwork } from 'redux/actions/member/network.action';
import Spinner from 'Spinner'
import BinaryNetwork from './src/network'
import MyNProgress from '../../../../myNProgress';
import { setNetwork } from '../../../../redux/actions/member/network.action';
import { RESET_PROPS_ARR } from '../../../../redux/actions/_constants';
import Swal from 'sweetalert2';
class Binary extends Component {

    getProps(props) {
        this.props.dispatch(FetchNetwork(btoa(props.match.params.id === undefined ? props.auth.user.referral_code : atob(props.match.params.id)), true, 'network'))
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
    // componentWillReceiveProps(nextProps){
    //     if (this.props.msg ==="Upline tidak dikenali."){
    //         alert('Upline tidak dikenali.')
    //     }
    // }
    componentDidUpdate(prevState) {
        if (prevState.auth.user.referral_code !== this.props.auth.user.referral_code || prevState.match.params.id !== this.props.match.params.id) {
            this.getProps(this.props);
        }
        if (this.props.msg !== "Berhasil mengambil data." && this.props.msg!==undefined && this.props.msg!=='') {
            Swal.fire({
                title: 'Informasi !!!',
                text: this.props.msg,
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'Saya Mengerti',
                // cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.value) {
                    this.props.dispatch(setNetwork(RESET_PROPS_ARR));
                    window.history.back();
                }
            })
        }
        console.log(this.props.msg);
    }
    render() {

        return (
            <Layout page="Genealogy Binary" subpage="Jaringan">
                <MyNProgress isAnimating={this.props.isLoading} />
                <div className="card">
                    <div className="card-body">
                        {
                            !this.props.isLoading ?
                                <BinaryNetwork dataList={this.props.list} match={this.props.match} history={this.props.history} />
                                : <Spinner />
                        }
                    </div>
                </div>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    // 
    return {
        isLoading: state.networkReducer.isLoading,
        list: state.networkReducer.data,
        msg: state.networkReducer.msg,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Binary)