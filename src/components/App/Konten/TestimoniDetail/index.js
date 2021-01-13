import React,{Component} from 'react'
import Layout from 'components/Layout'
import connect from "react-redux/es/connect/connect";
import moment from "moment";
import Preloader from "Preloader";
import { getTestimoniDetail, getTestimoniKategori } from '../../../../redux/actions/konten/testimoni.action';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
class TestimoniDetail extends Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.props.dispatch(getTestimoniDetail(this.props.match.params.id))
        this.handleLoadMore = this.handleLoadMore.bind(this)
    }
    componentWillMount(){
        this.props.dispatch(getTestimoniKategori(1))
    }
    handleLoadMore(){
        // this.setState({
        //     isScroll:true
        // });

        let perpage = parseInt(this.props.testimoniKategori.per_page,10);
        let lengthBrg = parseInt(this.props.testimoniKategori.total,10);
        if(perpage===lengthBrg || perpage<lengthBrg){
            let where = '';
            if(perpage!==undefined&&perpage!==null&&perpage!==''){
                where+=`&perpage=${perpage+10}`
            }
            this.props.dispatch(getTestimoniKategori(1, where));
            // this.setState({scrollPage:this.state.scrollPage+5});
        }
        else{
            Swal.fire({allowOutsideClick: false,
                title: 'Perhatian',
                icon: 'warning',
                text: 'Tidak ada data.',
            });
        }
    }
    render(){
        const {
            writer,
            title,
            category,
            caption,
            // type,
            video,
            picture,
            created_at,
        } = this.props.testimoniDetail;
        return (
            <Layout page="Testimoni">
                <div className="row">
                    <div className="col-md-8">
                    {
                                !this.props.isLoadingTestimoniDetail?
                        <div className="card">
                            <img className="img-fluid" src={picture} alt="img"/>
                            <div className="card-body">
                                <h3 className="mt-0 font-24">{title}</h3>
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p className="font-12"><i className="fa fa-user"/>&nbsp;{writer}</p>
                                    <p className="font-12"><i className="fa fa-calendar"/>&nbsp;{moment(created_at).format('YYYY-MM-DD HH:mm')}</p>
                                </div>
                                <div>
                                    <h6 className="font-12">Kategori : {category}</h6>
                                    {video!=='-'&&video!==null&&video!==undefined?
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe className="embed-responsive-item" src={video} allowFullScreen />
                                    </div>
                                    :''}
                                    <div dangerouslySetInnerHTML={{__html: caption}}></div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="card">
                            <Skeleton className="img-fluid" style={{height:'300px'}}/>
                            <div className="card-body">
                                <h3 className="mt-0 font-24"><Skeleton style={{width:'100%', height:'40px'}}/></h3>
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p className="font-12"><i className="fa fa-user"/>&nbsp;<Skeleton width={80} /></p>
                                    <p className="font-12"><i className="fa fa-calendar"/>&nbsp;<Skeleton width={80} /></p>
                                </div>
                                <div>
                                    <h6 className="font-12">Kategori : <Skeleton width={80}/></h6>
                                    {video!=='-'&&video!==null&&video!==undefined?
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe className="embed-responsive-item" src={video} allowFullScreen />
                                    </div>
                                    :''}
                                    <div><Skeleton style={{width:'100%', height:'30px'}} count={15}/></div>
                                </div>
                            </div>
                        </div>
                    }
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header bg-primary"><h5 className="text-light">Kategori</h5></div>
                            <div className="card-body p-1" style={{height:'300px', overflowX:'auto'}}>
                            {
                                !this.props.isLoadingKategori?(
                                    (
                                        typeof this.props.testimoniKategori.data === 'object' ? this.props.testimoniKategori.data.length>0?
                                            this.props.testimoniKategori.data.map((v,i)=>{
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
                                ):(() => {
                                    const rows = [];
                                    for (let i = 0; i < 10; i++) {
                                        rows.push(
                                                <Skeleton style={{width:'100%', height:'50px'}} />
                                        );
                                    }
                                    return rows;
                                })()
                            }
                            <div className="form-group mb-0">
                                <button className={"btn btn-primary"} style={{width:"100%"}} onClick={this.handleLoadMore}>{this.props.isLoadingKategori?'tunggu sebentar ...':'Tampilkan lebih banyak'}</button>
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
    console.log("state.testimoniReducer",state.testimoniReducer)
    return {
        auth:state.auth,
        testimoniKategori:state.testimoniReducer.data_testimoni_kategori,
        isLoadingTestimoniDetail:state.testimoniReducer.isLoadingTestimoniDetail,
        isLoadingKategori:state.testimoniReducer.isLoadingTestimoniKategori,
        testimoniDetail:state.testimoniReducer.data_testimoni_detail,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(TestimoniDetail);