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
                {img:'https://ecs7.tokopedia.net/img/cache/100-square/attachment/2020/8/28/47197032/47197032_914c9752-19e1-42b0-8181-91ef0629fd8a.png',title:'pulsa-all-operator',link:"/ppob/pulsa-all-operator"},
                {img:'https://ecs7.tokopedia.net/img/cache/100-square/attachment/2019/10/22/21181130/21181130_907dac9a-c185-43d1-b459-2389f0b6efea.png',title:'paket-data',link:"/ppob/paket-data"},
                {img:'https://tripay.co.id/member-page/asset/icons/sms.svg',title:'pulsa-sms-telpon',link:"/ppob/pulsa-sms-telpon"},
            ],
            arrTagihan:[
                {img:'https://tripay.co.id/member-page/asset/icons/token-listrik.svg',title:'pln',link:"/ppob/pembayaran-pln"},
                {img:'https://tripay.co.id/member-page/asset/icons/pdam.svg',title:'pdam',link:"/ppob/pembayaran-pdam"},
                {img:'https://tripay.co.id/member-page/asset/icons/telephone.svg',title:'telpon-kabel',link:"/ppob/pembayaran-telpon-kabel"},
                {img:'https://ecs7.tokopedia.net/img/cache/100-square/attachment/2019/10/22/21181130/21181130_53682a49-5247-4374-82c0-4c2a8d3bdbea.png',title:'telpon-pascabayar',link:"/ppob/pembayaran-telpon-pascabayar"},
            ],
            arrLainnya:[
                {img:'https://tripay.co.id/member-page/asset/icons/tol.svg',title:'e-toll',link:"/ppob/e-toll"},
                {img:'https://tripay.co.id/member-page/asset/icons/paket-data.svg',title:'voucher-wifiid',link:"/ppob/voucher-wifiid"},
                {img:'https://tripay.co.id/member-page/asset/icons/e-money.svg',title:'e-money',link:"/ppob/e-money"},
                {img:'https://ecs7.tokopedia.net/img/cache/100-square/attachment/2021/1/7/22166894/22166894_a0e8d558-59eb-47af-bdc1-abc0f4d45a84.png',title:'bpjs',link:"/ppob/pembayaran-bpjs"},
                {img:'https://ecs7.tokopedia.net/img/cache/100-square/attachment/2019/12/13/51829405/51829405_77281743-12fd-402b-b212-67b52516229c.png',title:'zakat',link:"/ppob/pembayaran-zakat"},
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