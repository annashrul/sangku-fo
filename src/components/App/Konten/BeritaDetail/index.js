import React, { Component } from 'react'
import Layout from 'components/Layout'
import connect from "react-redux/es/connect/connect";
import moment from "moment";
import { getBeritaDetail, getBerita } from '../../../../redux/actions/konten/berita.action';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import Default from '../../../../assets/default.png'
class BeritaDetail extends Component {
    constructor(props) {
        super(props);
        this.handleLoadMore = this.handleLoadMore.bind(this)
        this.toggleCollapse = this.toggleCollapse.bind(this)
        this.beritaInnerRef = React.createRef()
        this.beritaMobileInnerRef = React.createRef()
        this.state = {
            isOpen: false,
            dataEnd: false,
        }
    }
    componentWillReceiveProps(nextProps) {
        //     if(nextProps.beritaDetail.title===undefined){
        //         this.props.dispatch(getBeritaDetail(nextProps.match.params.id))
        //     }
        // this.unlisten = this.props.history.listen((location, action) => {
        //     this.props.dispatch(getBeritaDetail(this.props.match.params.id))
        // });
    }
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.props.dispatch(getBeritaDetail(this.props.match.params.id))
            this.setState({ isOpen: false })
        }
    }
    componentWillMount() {

        this.props.dispatch(getBeritaDetail(this.props.match.params.id))
        this.props.dispatch(getBerita(1))
    }
    toggleCollapse(e) {
        e.preventDefault();
        this.setState({ isOpen: !this.state.isOpen })
    }
    handleLoadMore(e, param) {
        e.preventDefault()
        let pick = param === 'mobile' ? this.beritaMobileInnerRef.current : this.beritaInnerRef.current
        if (!this.state.dataEnd) {
            if (pick) {
                const { scrollTop, scrollHeight, clientHeight } = pick;
                if (parseInt(scrollTop, 10) + parseInt(clientHeight, 10) === parseInt(scrollHeight, 10)) {
                    // TO SOMETHING HERE

                    let perpage = parseInt(this.props.beritaBerita.per_page, 10);
                    let lengthBrg = parseInt(this.props.beritaBerita.total, 10);
                    if (perpage === lengthBrg || perpage < lengthBrg) {
                        let where = '';
                        if (perpage !== undefined && perpage !== null && perpage !== '') {
                            where += `&perpage=${perpage + 10}`
                        }
                        this.props.dispatch(getBerita(1, where));
                        // this.setState({scrollPage:this.state.scrollPage+5});
                    }
                    else {
                        Swal.fire({
                            allowOutsideClick: false,
                            title: 'Perhatian',
                            icon: 'warning',
                            text: 'Tidak ada data.',
                        });
                        this.setState({ dataEnd: true })
                    }
                }
            }
        }
    }
    render() {
        const {
            writer,
            title,
            category,
            caption,
            video,
            picture,
            created_at,
        } = this.props.beritaDetail;
        return (
            <Layout page="Berita">
                <div className="mb-2">
                    <Link to={`/konten/berita`} className="btn btn-lg btn-outline-link border-none btn-rounded text-primary pl-0"><i className="fa fa-chevron-left" />&nbsp;Semua Berita</Link>
                </div>
                <div className="row box-margin">
                    <div className="col-md-8">
                        {!this.props.isLoadingBeritaDetail ?
                            <div className="card box-margin">
                                <img className="img-fluid" src={picture} alt="img" onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} />
                                <div className="card-body">
                                    <h3 className="mt-0 font-24">{title}</h3>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <p className="font-12 m-0"><i className="fa fa-user" />&nbsp;{writer}</p>
                                        <p className="font-12 m-0"><i className="fa fa-calendar" />&nbsp;{moment(created_at).format('YYYY-MM-DD HH:mm')}</p>
                                    </div>
                                    <div>
                                        <h6 className="font-12 mb-4">Kategori : {category}</h6>
                                        {video !== '-' && video !== null && video !== undefined ?
                                            <div className="embed-responsive embed-responsive-16by9">
                                                <iframe title="video" className="embed-responsive-item" src={video} allowFullScreen />
                                            </div>
                                            : ''}

                                        <div dangerouslySetInnerHTML={{ __html: caption }}></div>
                                    </div>

                                </div>
                            </div>
                            :
                            <div className="card">
                                <Skeleton className="img-fluid" style={{ height: '300px' }} />
                                <div className="card-body">
                                    <h3 className="mt-0 font-24"><Skeleton style={{ width: '100%', height: '40px' }} /></h3>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <p className="font-12"><i className="fa fa-user" />&nbsp;<Skeleton width={80} /></p>
                                        <p className="font-12"><i className="fa fa-calendar" />&nbsp;<Skeleton width={80} /></p>
                                    </div>
                                    <div>
                                        <h6 className="font-12">Kategori : <Skeleton width={80} /></h6>
                                        {video !== '-' && video !== null && video !== undefined ?
                                            <div className="embed-responsive embed-responsive-16by9">
                                                <iframe title="video" className="embed-responsive-item" src={video} allowFullScreen />
                                            </div>
                                            : ''}
                                        <div><Skeleton style={{ width: '100%', height: '30px' }} count={15} /></div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-md-4">
                        {/* DESKTOP VERSION START */}
                        <div className="card d-none d-md-block" style={{ position: 'sticky', top: '100px' }}>
                            <div className="card-header bg-transparent pb-2 border-none"><h5 className="text-dark">Berita Lainnya</h5></div>
                            <div className="card-body pt-0" style={{ minHeight: 'auto', maxHeight: '300px', overflowX: 'auto' }} onScroll={(e) => this.handleLoadMore(e, 'desktop')} ref={this.beritaInnerRef}>
                                {
                                    !this.props.isLoadingBerita ? (
                                        <div className="outer">
                                            <div className="inner" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {
                                                    typeof this.props.beritaBerita.data === 'object' ? this.props.beritaBerita.data.length > 0 ?
                                                        this.props.beritaBerita.data.map((v, i) => {
                                                            return (
                                                                <Link key={i} to={`/konten/berita/${v.id}`} style={{ flex: '1 1 auto' }}>
                                                                    <div className="cards card1 bg-light mr-1 pb-1 cursor-pointer">
                                                                        <div className="d-flex align-items-center justify-content-start">
                                                                            <img className="img-fluid mr-2 mt-n3" src={v.picture} onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} alt={v.title} style={{ height: '50px', width: 'auto' }} />
                                                                            <p className="font-20">{v.title}</p>
                                                                        </div>
                                                                        <div className="go-corner bg-danger" href="#">
                                                                            <div className="go-arrow bg-danger">
                                                                                <i className={`fa fa-search text-danger`} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            );
                                                        }) : "No Data." : "No Data."
                                                }
                                            </div>
                                        </div>
                                    ) :
                                        <div className="row w-100 m-0">
                                            {
                                                (() => {
                                                    const rows = [];
                                                    for (let i = 0; i < 9; i++) {
                                                        rows.push(
                                                            <div className="col-md-4 p-0 pr-1">
                                                                <Skeleton height={60} style={{ width: '100%' }} />
                                                            </div>
                                                        );
                                                    }
                                                    return rows;
                                                })()
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                        {/* DESKTOP VERSION END */}
                        <div className="card fixed-bottom d-block d-md-none shadow-lg rounded-lg" style={{ zIndex: '1' }}>
                            <button type="button" className="btn btn-lg btn-block btn-outline-success rounded-lg rounded-top border-none mb-1 bg-transparent text-success" onClick={(e) => this.toggleCollapse(e)}>BERITA LAINNYA&nbsp;<i className={`fa fa-angle-${!this.state.isOpen ? 'up' : 'down'}`} /></button>
                            <Collapse isOpen={this.state.isOpen}>
                                <div style={{ overflow: 'auto', minHeight: 'auto', maxHeight: '300px' }} onScroll={(e) => this.handleLoadMore(e, 'mobile')} ref={this.beritaMobileInnerRef}>
                                    <div className="outer">
                                        <div className="inner" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {
                                                typeof this.props.beritaBerita.data === 'object' ? this.props.beritaBerita.data.length > 0 ?
                                                    this.props.beritaBerita.data.map((v, i) => {
                                                        return (
                                                            <Link key={i} to={`/konten/berita/${v.id}`} style={{ flex: '1 1 auto' }}>
                                                                <div className="cards card1 bg-light mr-1 pb-1 cursor-pointer">
                                                                    <div className="d-flex align-items-center justify-content-start">
                                                                        <img className="img-fluid mr-2 mt-n3" src={v.picture} onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} alt={v.title} style={{ height: '50px', width: 'auto' }} />
                                                                        <p className="font-20 text-dark">{v.title}</p>
                                                                    </div>
                                                                    <div className="go-corner bg-danger" href="#">
                                                                        <div className="go-arrow bg-danger">
                                                                            <i className={`fa fa-search text-danger`} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        );
                                                    }) : "No Data." : "No Data."
                                            }
                                        </div>
                                    </div>
                                    {
                                        this.props.isLoadingBerita ? <Skeleton height={60} style={{ width: '100%' }} /> : ''
                                    }
                                </div>
                            </Collapse>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth,
        isLoadingBeritaDetail: state.beritaReducer.isLoadingBeritaDetail,
        beritaDetail: state.beritaReducer.data_berita_detail,
        beritaBerita: state.beritaReducer.data_berita,
        isLoadingBerita: state.beritaReducer.isLoadingBerita,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(BeritaDetail);