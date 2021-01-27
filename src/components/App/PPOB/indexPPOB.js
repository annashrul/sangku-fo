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
            arrProduct:[
                {img:iPulsa,title:'pulsa-all-operator',link:"/ppob/pulsa-all-operator"},
                {img:iPulsa,title:'paket-data',link:"/ppob/paket-data"},
                {img:iPulsa,title:'pulsa-sms-telpon',link:"/ppob/pulsa-sms-telpon"},
                {img:iPulsa,title:'pulsa-transfer',link:"/ppob/pulsa-transfer"},
                {img:iEtoll,title:'e-toll',link:"/ppob/e-toll"},
                {img:iWifiId,title:'voucher-wifiid',link:"/ppob/voucher-wifiid"},
                {img:iPulsa,title:'e-money',link:"/ppob/e-money"},
                {img:iPulsa,title:'pln',link:"/ppob/pembayaran-pln"},
                {img:iPulsa,title:'tv',link:"/ppob/pembayaran-tv"},
                {img:iPulsa,title:'pdam',link:"/ppob/pembayaran-pdam"},
                {img:iPulsa,title:'telpon-kabel',link:"/ppob/pembayaran-telpon-kabel"},
                {img:iPulsa,title:'telpon-pascabayar',link:"/ppob/pembayaran-telpon-pascabayar"},
                {img:iPulsa,title:'bpjs',link:"/ppob/pembayaran-bpjs"},
                {img:iPulsa,title:'asuransi',link:"/ppob/pembayaran-asuransi"},
                {img:iPulsa,title:'multifinance',link:"/ppob/pembayaran-multifinance"},
                {img:iPulsa,title:'kereta-api',link:"/ppob/pembayaran-kereta-api"},
                {img:iPulsa,title:'zakat',link:"/ppob/pembayaran-zakat"},
            ]
        }
    }

    render(){
        return (
            <Layout page="PPOB">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="card">
                                <div className="card-body">
                                   <div className="row">
                                       {
                                           this.state.arrProduct.map((v,i)=>{
                                               return(
                                                   <div className="col-md-2" key={i}>
                                                       <div className="wrapperCard" style={{textAlign:"center"}}>
                                                           <Link to={v.link} className="card1" href="#">
                                                               <img style={{height:"50px"}} className={"svgImg"} src={v.img} alt=""/>
                                                               <br/>
                                                               <br/>
                                                               <p>{v.title}</p>
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