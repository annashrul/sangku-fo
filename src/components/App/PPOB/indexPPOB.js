import React,{Component} from 'react'
import Layout from 'components/Layout'
import connect from "react-redux/es/connect/connect";
import iPulsa from "../../../assets/icon/revisi/pulsa.svg"
import iWifiId from "../../../assets/icon/revisi/Icon_PPOB_VOUCHER_WIFI_ID.svg"
import iEtoll from "../../../assets/icon/revisi/Icon_PPOB_E _TOLL.svg"
import {Link} from "react-router-dom";

class IndexPPOB extends Component{
    constructor(props){
        super(props);
        this.state={
            arrPulsa:[
                {img:'https://tripay.co.id/member-page/asset/icons/Pulsa.svg',title:'pulsa-all-operator',link:"/ppob/pulsa-all-operator"},
                {img:'https://tripay.co.id/member-page/asset/icons/paket-data.svg',title:'paket-data',link:"/ppob/paket-data"},
                {img:'https://tripay.co.id/member-page/asset/icons/sms.svg',title:'pulsa-sms-telpon',link:"/ppob/pulsa-sms-telpon"},
            ],
            arrTagihan:[
                {img:'https://tripay.co.id/member-page/asset/icons/token-listrik.svg',title:'pln',link:"/ppob/pembayaran-pln"},
                {img:'https://tripay.co.id/member-page/asset/icons/pdam.svg',title:'pdam',link:"/ppob/pembayaran-pdam"},
                {img:'https://tripay.co.id/member-page/asset/icons/telephone.svg',title:'telpon-kabel',link:"/ppob/pembayaran-telpon-kabel"},
                {img:'https://tripay.co.id/member-page/asset/icons/phone.svg',title:'telpon-pascabayar',link:"/ppob/pembayaran-telpon-pascabayar"},
            ],
            arrLainnya:[
                {img:'https://tripay.co.id/member-page/asset/icons/tol.svg',title:'e-toll',link:"/ppob/e-toll"},
                {img:'https://tripay.co.id/member-page/asset/icons/paket-data.svg',title:'voucher-wifiid',link:"/ppob/voucher-wifiid"},
                {img:'https://tripay.co.id/member-page/asset/icons/e-money.svg',title:'e-money',link:"/ppob/e-money"},
                {img:'https://tripay.co.id/member-page/asset/icons/bpjs.svg',title:'bpjs',link:"/ppob/pembayaran-bpjs"},
                {img:'https://tripay.co.id/member-page/asset/icons/zakat.svg',title:'zakat',link:"/ppob/pembayaran-zakat"},
            ],

        }
    }

    render(){
        return (
            <Layout page="PPOB">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h4 className={"black bold"}>Pulsa Reguler & Paket Data</h4>
                                    </div>
                                    {
                                        this.state.arrPulsa.map((v,i)=>{
                                            return(
                                                <div className="col-md-3" key={i}>
                                                    <div className="wrapperCard" style={{textAlign:"center"}}>
                                                        <Link to={v.link} className="card1" href="#">
                                                            <img style={{height:"100px"}} className={"svgImg"} src={v.img} alt=""/>
                                                            <br/>
                                                            <br/>
                                                            <p>{v.title.toUpperCase().replaceAll('-',' ')}</p>
                                                            <div className="go-corner" href="#">
                                                                <div className="go-arrow">
                                                                    <i className={"fa fa-arrow-right"}/>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginTop:"10px"}}>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h4 className={"black bold"}>Bayar Tagihan</h4>
                                    </div>
                                    {
                                        this.state.arrTagihan.map((v,i)=>{
                                            return(
                                                <div className="col-md-3" key={i}>
                                                    <div className="wrapperCard" style={{textAlign:"center"}}>
                                                        <Link to={v.link} className="card1" href="#">
                                                            <img style={{height:"100px"}} className={"svgImg"} src={v.img} alt=""/>
                                                            <br/>
                                                            <br/>
                                                            <p>{v.title.toUpperCase().replaceAll('-',' ')}</p>
                                                            <div className="go-corner" href="#">
                                                                <div className="go-arrow">
                                                                    <i className={"fa fa-arrow-right"}/>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row" style={{marginTop:"10px"}}>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h4 className={"black bold"}>Pembayaran Lainnya</h4>
                                    </div>
                                    {
                                        this.state.arrLainnya.map((v,i)=>{
                                            return(
                                                <div className="col-md-3" key={i}>
                                                    <div className="wrapperCard" style={{textAlign:"center"}}>
                                                        <Link to={v.link} className="card1" href="#">
                                                            <img style={{height:"100px"}} className={"svgImg"} src={v.img} alt=""/>
                                                            <br/>
                                                            <br/>
                                                            <p>{v.title.toUpperCase().replaceAll('-',' ')}</p>
                                                            <div className="go-corner" href="#">
                                                                <div className="go-arrow">
                                                                    <i className={"fa fa-arrow-right"}/>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
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
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(IndexPPOB);