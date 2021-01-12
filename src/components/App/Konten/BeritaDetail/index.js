import React,{Component} from 'react'
import Layout from 'components/Layout'
import Paginationq from "helper";
import connect from "react-redux/es/connect/connect";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import moment from "moment";
import {rangeDate} from "helper";
import Preloader from "Preloader";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { getBeritaDetail } from '../../../../redux/actions/konten/berita.action';
import Swal from 'sweetalert2';
class BeritaDetail extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentWillMount(){
        let page=localStorage.page_berita;
        this.handleParameter(page!==undefined&&page!==null?page:1);
    }
    render(){
        const {
            per_page,
            last_page,
            current_page,
            data
        } = this.props.beritaBerita;
        return (
            <Layout page="Berita">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12" style={{zoom:"100%"}}>
                                        <div className="row">
                                            <div className="col-6 col-xs-6 col-md-4">
                                                <div className="form-group">
                                                    <label>Cari</label>
                                                    <input className="form-control" type="text" style={{padding: '9px',fontWeight:'bolder'}} name="any" value={this.state.any} onChange={(e) => this.handleChange(e)}/>
                                                </div>
                                            </div>
                                            <div className="col-6 col-xs-6 col-md-2">
                                                <div className="form-group">
                                                    <button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={this.handleSearch}>
                                                        <i className="fa fa-search"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 1, 900: 2}}>
                                    <Masonry>
                                        {
                                            !this.props.isLoadingBerita?(
                                                (
                                                    typeof data === 'object' ? data.length>0?
                                                        data.map((v,i)=>{
                                                            return(
                                                                <div className="card m-2">
                                                                    <div className="card-body">
                                                                        <img src={`https://picsum.photos/${Math.floor(Math.random() * 500) + 400}/${Math.floor(Math.random() * 400) + 300}`} alt="img"/>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        : "No data." : "No data."
                                                )
                                            ):<Preloader/>
                                        }
                                    </Masonry>
                                </ResponsiveMasonry>
                                <div style={{"marginTop":"20px","float":"right"}}>
                                    <Paginationq
                                        current_page={current_page}
                                        per_page={per_page}
                                        total={parseInt((per_page*last_page),10)}
                                        callback={this.handlePageChange.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header bg-primary"><h5 className="text-light">Kategori</h5></div>
                            <div className="card-body p-1" style={{height:'300px', overflowX:'auto'}}>
                            {
                                !this.props.isLoadingBeritaKategori?(
                                    (
                                        typeof this.props.beritaKategori.data === 'object' ? this.props.beritaKategori.data.length>0?
                                            this.props.beritaKategori.data.map((v,i)=>{
                                                return(
                                                    <div className="card rounded mb-2" style={{borderLeft: '8px solid rgb(251, 67, 74)'}}>
                                                        <div className="card-body p-1">
                                                            <div className="media">
                                                                <div className="media-body text-center mr-2" style={{maxWidth: 100, minWidth: 100}}>
                                                                    <button type="button" onClick={(e)=>(this.handleParameter(e))} className="btn btn-link"><h6 className="mt-1" style={{whiteSpace:'nowrap'}}>{v.title}</h6></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : "No data." : "No data."
                                    )
                                ):<Preloader/>
                            }
                            <div className="form-group mb-0">
                                <button className={"btn btn-primary"} style={{width:"100%"}} onClick={this.handleLoadMore}>{this.props.isLoadingBeritaKategori?'tunggu sebentar ...':'Tampilkan lebih banyak'}</button>
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
    console.log("state.beritaReducer",state.beritaReducer)
    return {
        auth:state.auth,
        beritaBerita:state.beritaReducer.data_berita,
        beritaKategori:state.beritaReducer.data_berita_kategori,
        isLoadingBerita:state.beritaReducer.isLoadingBerita,
        isLoadingKategori:state.beritaReducer.isLoadingBeritaKategori,
        beritaDetail:state.beritaReducer.data_berita_detail,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(BeritaDetail);