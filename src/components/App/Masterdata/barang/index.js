import React,{Component} from 'react';
import Layout from "../../../Layout";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import connect from "react-redux/es/connect/connect";
import Preloader from "Preloader";
// import {FetchProduct} from "redux/actions/masterdata/product/product.action";
// import {FetchPriceProduct} from "redux/actions/masterdata/price_product/price_product.action";
// import {FetchKategoriBarang} from "redux/actions/masterdata/group_product/group_product.action";
import {FetchBarang} from "redux/actions/masterdata/barang/barang.action";
import ListBarang from "./master_barang/list";
import {FetchKategoriBarang} from "redux/actions/masterdata/barang/kategori.action";
import ListKategoriBarang from "./master_kategori_barang/list";
import {FetchKelompokBarang} from "redux/actions/masterdata/barang/kelompok.action";
import ListKelompokBarang from "./master_kelompok_barang/list";
// import ListPriceProduct from "./src/master_price_product/list";
// import ListProduct from "./src/master_product/list";
import { Link } from 'react-router-dom';


class Product extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            activeTab : 0,
            selectedIndex : 0,
            any : localStorage.getItem('any_product'),
            by : localStorage.getItem('by_product'),
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
        let anyBarang = localStorage.getItem("any_barang");
        let pageBarang = localStorage.getItem("page_barang");

        let anyKategoriBarang = localStorage.getItem("any_kategori_barang");
        let pageKategoriBarang = localStorage.getItem("page_kategori_barang");

        let anyKelompokBarang = localStorage.getItem("any_kelompok_barang");
        let pageKelompokBarang = localStorage.getItem("page_kelompok_barang");
        if(this.props.auth.user.level==='tenant'){
            this.props.dispatch(FetchBarang(pageBarang?pageBarang:1,`&tenant=${this.props.auth.user.id}`));
        } else {
            this.props.dispatch(FetchBarang(pageBarang?pageBarang:1,anyBarang?anyBarang:''));
        }
        this.props.dispatch(FetchKategoriBarang(pageKategoriBarang?pageKategoriBarang:1,anyKategoriBarang?anyKategoriBarang:''));
        this.props.dispatch(FetchKelompokBarang(pageKelompokBarang?pageKelompokBarang:1,anyKelompokBarang?anyKelompokBarang:''));
    }
    //Use arrow functions to avoid binding
    handleSelect = (index) => {
        this.setState({selectedIndex: index}, () => {
        });
    };

    render(){
        return (
            <Layout page="Product">
                <div className="col-12 box-margin">
                    <div className="card">
                        <Tabs>
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <TabList>
                                    {/* <Tab label="Core Courses" onClick={() =>this.handleSelect(0)}>Barang</Tab>
                                    <Tab label="Core Courses" onClick={() =>this.handleSelect(1)}>Harga Barang</Tab>
                                    <Tab label="Core Courses" onClick={() =>this.handleSelect(2)}>Kelompok Barang</Tab> */}
                                    <Tab label="Core Courses" onClick={() =>this.handleSelect(0)}>Barang</Tab>
                                    <Tab label="Core Courses" onClick={() =>this.handleSelect(1)}>Kategori Barang</Tab>
                                    <Tab label="Core Courses" onClick={() =>this.handleSelect(2)}>Kelompok Barang</Tab>
                                </TabList>
                                <div>
                                    <Link to="upload" className="btn btn-outline-info"><i className="fa fa-upload"></i>&nbsp;IMPORT FROM CSV</Link>
                                </div>
                            </div>
                            <div className="card-header" style={{"height":"5px","backgroundColor":"#f9fafb"}}></div>
                            <div className="card-body">
                                {/* <TabPanel>
                                    {
                                        !this.props.isLoading ? ( <ListProduct
                                            token={this.state.token}
                                            data={this.props.product}
                                            group={this.props.kategoriBarang}
                                        /> ) : <Preloader/>
                                    }
                                </TabPanel>
                                <TabPanel>
                                    {
                                        !this.props.isLoading1 ? ( <ListPriceProduct
                                            token={this.state.token}
                                            data={this.props.priceProduct}
                                        /> ) : <Preloader/>
                                    }
                                </TabPanel>
                                <TabPanel>
                                    {
                                        !this.props.isLoading2 ? ( <ListKategoriBarang
                                            token={this.state.token}
                                            data={this.props.kategoriBarang}
                                        /> ) : <Preloader/>
                                    }
                                </TabPanel> */}
                                <TabPanel>
                                    {
                                        !this.props.isLoading ? ( <ListBarang
                                            token={this.state.token}
                                            data={this.props.barang}
                                        /> ) : <Preloader/>
                                    }
                                </TabPanel>
                                <TabPanel>
                                    {
                                        !this.props.isLoading2 ? ( <ListKategoriBarang
                                            token={this.state.token}
                                            data={this.props.kategoriBarang}
                                        /> ) : <Preloader/>
                                    }
                                </TabPanel>
                                <TabPanel>
                                    {
                                        !this.props.isLoading3 ? ( <ListKelompokBarang
                                            token={this.state.token}
                                            data={this.props.kelompokBarang}
                                        /> ) : <Preloader/>
                                    }
                                </TabPanel>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    
    return {
        barang:state.barangReducer.data,
        isLoading: state.barangReducer.isLoading,
        kategoriBarang:state.kategoriBarangReducer.data,
        isLoading2: state.kategoriBarangReducer.isLoading,
        kelompokBarang:state.kelompokBarangReducer.data,
        isLoading3: state.kelompokBarangReducer.isLoading,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Product)