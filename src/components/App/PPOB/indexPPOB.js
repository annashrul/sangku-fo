import React,{Component} from 'react'
import Layout from 'components/Layout'
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import {getKategoriPPOB} from "../../../redux/actions/ppob/kategoriPPOB.action";
import Skeleton from 'react-loading-skeleton';

class IndexPPOB extends Component{
    constructor(props){
        super(props);
        this.state={
          arrKategori:[
              {title:'Pulsa Reguler & Paket Data',index:'TOPUP'},
              {title:'Bayar Tagihan',index:'TAGIHAN'},
              {title:'Pembayaran Lainnya',index:'LAIN'},
          ]
        };
    }

    componentWillMount(){
        this.props.dispatch(getKategoriPPOB());
    }

    render(){
        return (
            <Layout page="PPOB">
                {
                    this.state.arrKategori.map((val,key)=>{
                        return(
                            <div className="row" key={key} style={{marginBottom:"10px"}}>
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-12" style={{paddingBottom:"5px"}}>
                                                    <h4 className={"black bold"}>{val.title}</h4>
                                                </div>
                                                {
                                                    this.props.data[val.index]!==undefined?this.props.data[val.index].map((v,i)=>{
                                                        let kategori = v.title.replaceAll(" ","-").replaceAll(".","-");
                                                        return(
                                                            <div className="col-md-3" key={i}>
                                                                <div className="wrapperCard" style={{textAlign:"center"}}>
                                                                    <Link to={`/ppob/${v.kategori===0?'prabayar':'pascabayar'}/${kategori.toLowerCase()}/${btoa(v.code)}`} className="card1" href="#">
                                                                        <img style={{height:"100px"}} className={"svgImg"} src={v.logo} alt=""/>
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
                                                    }):(() => {
                                                        const rows = [];
                                                        for (let i = 0; i < 4; i++) {
                                                            rows.push(
                                                                <div className="col-md-3" key={i}>
                                                                    <div className="wrapperCard" style={{textAlign:"center"}}>
                                                                        <Skeleton width={'100%'} height={200}/>
                                                                        <br/>
                                                                        <p><Skeleton/></p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                        return rows;
                                                    })()
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }

            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        data:state.kategoriPPOBReducer.data,
        isLoading:state.kategoriPPOBReducer.isLoading
    }
}
export default connect(mapStateToProps)(IndexPPOB);