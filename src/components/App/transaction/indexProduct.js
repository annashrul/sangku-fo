import React, { Component } from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import Skeleton from 'react-loading-skeleton';
import {noImage, toRp} from "helper";
import {getPaket} from "redux/actions/product/paket.action";
import {getCart, postCart} from "redux/actions/product/cart.action";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import IndexRegister from '../../App/Member/paket/indexRegister';
import IndexRO from '../../App/Member/paket/indexRO';


class IndexProduct extends Component{
    constructor(props){
        super(props);
        this.handleSelect    = this.handleSelect.bind(this);
    }

    handleSelect = (index) => {
        this.setState({selectedIndex: index}, () => {
        });
    };
    render(){

        return(
            <Layout page="Product">
                <div className="card">
                    <Tabs>
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <TabList>
                                <Tab label="Core Courses" onClick={() =>this.handleSelect(0)}>Barang Register</Tab>
                                <Tab label="Core Courses" onClick={() =>this.handleSelect(1)}>Barang RO</Tab>
                            </TabList>
                        </div>
                        <div className="card-header" style={{"height":"5px","backgroundColor":"#f9fafb"}}/>
                        <div className="card-body">
                            <TabPanel>
                                <IndexRegister/>
                            </TabPanel>
                            <TabPanel>
                                <IndexRO/>
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        resPaket:state.paketReducer.data,
        isLoading: state.paketReducer.isLoading,
        isLoadingPost:state.cartReducer.isLoadingPost
    }
}
export default connect(mapStateToProps)(IndexProduct);