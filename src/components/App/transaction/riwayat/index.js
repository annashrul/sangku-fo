import React, { Component } from 'react';
import {connect} from "react-redux";
import {Card, CardBody, CardHeader} from "reactstrap";
import Layout from 'components/Layout';
import Cards from './src/card'
import Paginationq,{toRp} from "helper";
import {getRiwayat} from "redux/actions/transaction/riwayat.action";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import {NOTIF_ALERT} from "redux/actions/_constants";

class IndexCart extends Component{
    constructor(props){
        super(props);
        this.HandleChangeInputValue    = this.HandleChangeInputValue.bind(this);
        this.state={
            res_cart:[],
        }
    }
    componentWillMount(){
        this.props.dispatch(getRiwayat());
    }
    componentWillReceiveProps(nextProps){
       
    }

    HandleChangeInputValue(e,i){
        e.preventDefault();
        let column = e.target.name;
        let value = e.target.value;
        let res_cart = [...this.state.res_cart];
        res_cart[i] = {...res_cart[i], [column]: value};
        this.setState({ res_cart });
    }

    render(){
        const {
            total,
            per_page,
            current_page,
        } = this.props.raw_data;
        return(
            <Layout page="Riwayat Transaksi">
               
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-lg-12">
                        <div className="row" style={{padding:'20px'}}>
                            {
                                this.props.data.length>0?
                                    this.props.data.map((item,key)=>{
                                        return <Cards
                                            created_at={item.created_at}
                                            note={item.note}
                                            kd_trx={item.kd_trx}
                                            amount_in = {toRp(parseInt(item.trx_in),true)}
                                            amount_out={toRp(parseInt(item.trx_out),true)}
                                        />
                                }): ""
                            }
                        </div>
                        <div style={{padding:'20px',"marginTop":"20px","marginBottom":"20px","float":"left"}}>
                            <h5>Summary</h5>
                        </div>
                        <div style={{padding:'20px',"marginTop":"20px","marginBottom":"20px","float":"right"}}>
                            <Paginationq
                                current_page={current_page}
                                per_page={per_page}
                                total={total}
                                callback={this.handlePage}
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        data:state.riwayatReducer.data,
        raw_data: state.riwayatReducer.raw_data,
        isLoading: state.cartReducer.isLoading,
        isLoadingPost:state.cartReducer.isLoadingPost
    }
}
export default connect(mapStateToProps)(IndexCart);