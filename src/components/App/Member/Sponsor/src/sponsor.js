import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import moment from 'moment'
import { HEADERS } from '../../../../../redux/actions/_constants';
import noUser from 'assets/no-user.png';
import Default from 'assets/default.png'
import MyNProgress from '../../../../../myNProgress';
import Cookies from 'js-cookie';
class Sponsor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            activeTab: 0,
            selectedIndex: 0,
            numChildren: 0,
            loading: false,
            arrs: [],
        };
    }
    getCurrent = (node) => this.state.arrs.sort(function (a, b) { if (a.position < b.position) { return -1 } if (a.position > b.position) { return 1 } return 0 }).filter(cNode => cNode.parent_id === node).map(cNode => (
        <li id={`li_${cNode.id}`} key={`node_${cNode.id}`} style={{ visibility: cNode.id === undefined ? 'hidden' : '' }}>
            {cNode.detail === null ?
                <div className="eps-nc" nid={cNode.parent_id}>
                    <div className="usr-pic">
                        <img src={noUser} alt="sangqu"
                            className="img" /> </div>
                    <div className="usr-name"><i className="fa fa-plus" />&nbsp;Member</div>
                </div>
                :
                // <div className="eps-nc" nid={cNode.id}>
                //     <div className="usr-pic">
                //         <img src={cNode.picture}
                //             className="img" /> </div>
                //     <div className="usr-name">{cNode.name+' '+cNode.position}</div>
                //     <div className="usr-popup">
                //         <div className="popup-loader">
                //             <div className="loader loader-bar" />
                //         </div>
                //     </div>
                //     <div id={`btnAdd_${cNode.id}`} className="last_level_user" onClick={(e)=>this.showNode(e,cNode.id)} style={{display:'none'}}><i id="fa-2x-42" className="fa fa-plus-circle fa-2x" /></div>
                // </div>
                <div>
                    <div className={`binary-node-single-item eps-nc ${cNode.parent_id !== null ? 'eps-path' : ''} user-block user-${cNode.id}`}>
                        <div className="ribbon_wrapper images_wrapper" style={{ height: '-webkit-fill-available' }}>
                            {/* <div className="ribbon ribbon-vertical-l" style={{lineHeight:'unset',width:'70px',transform:'rotate(-45deg)',left:'-40px',top:'-15px'}}><img src={cNode.badge} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} alt="user" className="thumb-xs mb-2 rounded-circle"/></div> */}
                            <img className="profile-rounded-image-small h-100" style={{ borderColor: '#ccc' }} src={cNode.picture} onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} width={70} height={70} alt={cNode.name} title={cNode.name} /></div>
                        <div className="alert alert-primary mt-2 font-12" style={{ backgroundColor: '#7266ba', zIndex: 1, padding: '3px', whiteSpace: 'nowrap' }}>{String(cNode.name).replace(/ .*/, '')}</div>
                        <div className="pop-up-content">
                            <div className="profile_tooltip_pick">
                                <div className="image_tooltip"><img className="profile-rounded-image-tooltip h-100" src={cNode.picture} onError={(e) => { e.target.onerror = null; e.target.src = `${Default}` }} width={70} height={70} alt={cNode.name} title={cNode.name} /></div>
                                <div className="full-name">
                                    {cNode.name}
                                    {/* &nbsp; */}
                                    {/* <img src={cNode.badge} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} style={{width:'10%'}} alt="user" className="thumb-xs mb-2 rounded-circle"/> */}
                                </div>
                                <div className="username">
                                    <span className="text-label">UID : </span>
                                    <span className="text-value">{cNode.id}</span>
                                </div>
                                {/* <div className="username">
                                        <span className="text-label">Membership : </span>
                                        <img src={cNode.badge} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} style={{width:'10%'}} alt="user" className="thumb-xs mb-2 rounded-circle"/>
                                    </div> */}
                            </div>
                            {/* <div className="tooltip_profile_detaile">
                                    <div className="row mb-2">
                                        <div className="col-md-6  text-center">
                                            <span className="text-label">PV KIRI</span>
                                        </div>
                                        <div className="col-md-6  text-center">
                                            <span className="text-label">PV KANAN</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6  text-center" style={{borderRight: 'solid darkgrey thin'}}>
                                            <span className="text-value">{cNode.left_pv}</span>
                                        </div>
                                        <div className="col-md-6  text-center">
                                            <span className="text-value">{cNode.right_pv}</span>
                                        </div>
                                    </div>
                                </div> */}
                            <div className="tooltip-footer">
                                <div className="text">
                                    <span className="text-label">Tanggal Bergabung : </span>
                                    <span className="text-value">{moment(cNode.join_date).format('YYYY-MM-DD')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        cNode.hasChild ?
                            <div id={`btnAdd_${cNode.id}`} className="last_level_user" style={{ display: 'none' }}>
                                {/* <i id="fa-2x-42" className="fa fa-plus-circle fa-2x" /> */}
                                <i id={`toHide_${cNode.id}`} className="fa fa-plus-circle fa-2x zoom-hover" onClick={(e) => this.showNode(e, cNode.id)} />
                                <div id={`toShow_${cNode.id}`} className="spinner-border spinner-border-sm mb-2" role="status" style={{ display: "none", cursor:'no-drop'}}></div>
                            </div>
                            : ''
                    }
                </div>
            }
            {cNode.hasChild ?
                <ul id={`wrapper_${cNode.id}`}>
                    {this.getCurrent(cNode.id)}
                </ul>
                : ''}
        </li>
    ))

    showFetch(id) {
        this.setState({ loading: true });
        const headers = {
            'Authorization': atob(Cookies.get('sangqu_datum')),
            'username': HEADERS.USERNAME,
            'password': HEADERS.PASSWORD,
            'myconnection': `apps`,
            'Content-Type': `application/x-www-form-urlencoded`
        }
        document.getElementById("toHide_" + id).style.display = 'none';
        document.getElementById("toShow_" + id).style.display = '';
        fetch(HEADERS.URL + `member/sponsor/${btoa(id)}`, { headers })
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({ loading: false });
                    document.getElementById('btnAdd_' + id).style.display = 'none';
                    document.getElementById("toShow_" + id).style.display = 'none';
                    if (data.status === 'success') {
                        // document.getElementById('li_'+id).innerHTML = '<ul id=wrapper_'+id+'></ul>';
                        if (data.result.length <= 0) {
                            // let joined = this.state.arrs.concat(
                            //     {"parent_id":id,"position":'left','hasChild':false,"detail":null},
                            //     {"parent_id":id,"position":'right','hasChild':false,"detail":null},
                            //     );
                            // this.setState({
                            //     arrs:joined
                            // })
                            // document.getElementById('btnAdd_' + id).style.display = 'none';
                            // document.getElementById('node-wrapper-'+id).classList.add("node-item-root");
                        } else {
                            document.getElementById('btnAdd_' + id).style.display = 'none';
                            // document.getElementById('node-wrapper-'+id).classList.add("node-item-root");

                            if (data.result.length === 1) {
                                // if(data.result[0].position==='left'){
                                //     let joinedA = this.state.arrs.concat({"parent_id":id,"position":'right','hasChild':false,"detail":null},);
                                //     let joinedB = joinedA.concat(data.result);
                                //     this.setState({arrs:joinedB})
                                // } else {
                                //     let joinedA = this.state.arrs.concat({"parent_id":id,"position":'left','hasChild':false,"detail":null},);
                                //     let joinedB = joinedA.concat(data.result);
                                //     this.setState({arrs:joinedB})
                                // }
                            } else if (data.result.length >= 2) {
                                let joined = this.state.arrs.concat(data.result);
                                this.setState({ arrs: joined })
                            }
                        }
                    }
                },
                (error) => {
                    this.setState({ loading: false });
                    // this.setState({
                    //     isLoaded: true,
                    //     error
                    // });
                }
            )
    }

    showNode(e, data) {
        e.preventDefault();
        this.showFetch(data);
    }
    addNew(e, data) {
        e.preventDefault();
        alert(JSON.stringify(data))
    }
    flatToTree(data, root) {
        let r = [], o = {};
        data.forEach(function (a) {
            if (o[a.id] && o[a.id].children) {
                a.children = o[a.id] && o[a.id].children;
            }
            o[a.id] = a;
            if (a.parent_id === root) {
                r.push(a);
            }
            else {
                o[a.parent_id] = o[a.parent_id] || {};
                o[a.parent_id].children = o[a.parent_id].children || [];
                o[a.parent_id].children.push(a);
            }
        });
        return r;
    }
    componentWillMount() {
        this.setState({ arrs: this.props.dataList })
        this.getProps(this.props);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataList !== this.props.dataList) {
            this.setState({ arrs: this.props.dataList })
        }
        if (this.state.arrs.length !== prevState.arrs.length) {
            this.getProps(this.props);
        }
    }
    componentDidMount() {
        this.setState({ arrs: this.props.dataList })
        this.getProps(this.props);
    }
    getProps(props) {
        this.flatToTree(this.state.arrs === [] ? props.dataList : this.state.arrs, 0)
        // 

        const findItemNested = (arr, itemId, nestingKey) => arr.reduce((a, c) => {
            return a.length
                ? a
                : c.id === itemId
                    ? a.concat(c)
                    : c[nestingKey]
                        ? a.concat(findItemNested(c[nestingKey], itemId, nestingKey))
                        : a
        }, []);

        this.state.arrs.forEach(elemA => {
            const res = findItemNested(this.state.arrs === [] ? props.dataList : this.state.arrs, elemA.id, "children");

            if (res[0].children === undefined) {
                if (elemA.hasChild) {
                    document.getElementById('btnAdd_' + elemA.id).style.display = '';
                    // document.getElementById('wrapper_'+elemA.id).remove();
                    // document.getElementById('node-wrapper-'+elemA.id).classList.remove("node-item-root")
                    // if(document.getElementById('line-left-'+elemA.id)!==null){
                    //     document.getElementById('line-left-'+elemA.id).style.display = '';
                    // }
                    // if(document.getElementById('line-right-'+elemA.id)!==null){
                    //     document.getElementById('line-right-'+elemA.id).style.display = '';
                    // }
                }
            } else {

                if (res[0].children.length === 1) {
                    if (res[0].children[0].position === 'left') {
                        let joinedA = this.state.arrs.concat({ "parent_id": res[0].id, "position": 'right', 'hasChild': false, "detail": null },);
                        this.setState({ arrs: joinedA })
                    } else {
                        let joinedA = this.state.arrs.concat({ "parent_id": res[0].id, "position": 'left', 'hasChild': false, "detail": null },);
                        this.setState({ arrs: joinedA })
                    }
                }

            }
        });
    }

    setSize(e, param) {
        // e.preventDefault();
        if (param === 'zoom-in') {
            let style = document.querySelector('.eps-sponsor-tree.eps-tree').getAttribute('zoom');
            let zoom_levels = {
                1: "matrix(0.5, 0, 0, 0.5, 0, 0)",
                2: "matrix(0.6, 0, 0, 0.6, 0, 0)",
                3: "matrix(0.7, 0, 0, 0.7, 0, 0)",
                4: "matrix(0.8, 0, 0, 0.8, 0, 0)",
                5: "matrix(0.9, 0, 0, 0.9, 0, 0)",
                6: "matrix(1, 0, 0, 1, 0, 0)"
            };
            let i = parseInt(style) + 1;
            let new_style = zoom_levels[i]
            if (new_style !== undefined) {
                document.querySelector('.eps-sponsor-tree.eps-tree').style.transform = new_style;
                document.querySelector('.eps-sponsor-tree.eps-tree').setAttribute('zoom', i);
            }
        }
        if (param === 'zoom-out') {
            let style = document.querySelector('.eps-sponsor-tree.eps-tree').getAttribute('zoom');
            let zoom_levels = {
                1: "matrix(0.5, 0, 0, 0.5, 0, 0)",
                2: "matrix(0.6, 0, 0, 0.6, 0, 0)",
                3: "matrix(0.7, 0, 0, 0.7, 0, 0)",
                4: "matrix(0.8, 0, 0, 0.8, 0, 0)",
                5: "matrix(0.9, 0, 0, 0.9, 0, 0)",
                6: "matrix(1, 0, 0, 1, 0, 0)"
            };
            let i = parseInt(style) - 1;
            let new_style = zoom_levels[i]
            if (new_style !== undefined) {
                document.querySelector('.eps-sponsor-tree.eps-tree').style.transform = new_style;
                document.querySelector('.eps-sponsor-tree.eps-tree').setAttribute('zoom', i);
            }
        }
        if (param === 'default') {
            // let style = e.target.getAttribute('zoom');
            let zoom_levels = {
                1: "matrix(0.5, 0, 0, 0.5, 0, 0)",
                2: "matrix(0.6, 0, 0, 0.6, 0, 0)",
                3: "matrix(0.7, 0, 0, 0.7, 0, 0)",
                4: "matrix(0.8, 0, 0, 0.8, 0, 0)",
                5: "matrix(0.9, 0, 0, 0.9, 0, 0)",
                6: "matrix(1, 0, 0, 1, 0, 0)"
            };
            let i = 6;
            let new_style = zoom_levels[i]
            if (new_style !== undefined) {
                document.querySelector('.eps-sponsor-tree.eps-tree').style.transform = new_style;
                document.querySelector('.eps-sponsor-tree.eps-tree').setAttribute('zoom', i);
            }
        }
    }
    render() {

        return (
            <div id="block-system-main" className="block block-system clearfix">
                <MyNProgress isAnimating={this.state.loading} />
                <div className="binary-genealogy-tree binary_tree_extended">
                    <div className="zoom-wrapper m-t-lg m-b-lg">
                        <ul className="zoom-lists">
                            <li><button className="btn btn-primary btn-circle m-1" onClick={(e) => this.setSize(e, 'zoom-in')}><i className="fa fa-search-plus" /></button></li>
                            <li><button className="btn btn-primary btn-circle m-1" onClick={(e) => this.setSize(e, 'zoom-out')}><i className="fa fa-search-minus" /></button></li>
                            <li><button className="btn btn-primary btn-circle m-1" onClick={(e) => this.setSize(e, 'default')}><i className="fa fa-refresh" /></button></li>
                        </ul>
                    </div>
                    <div className="sponsor-tree-wrapper">
                        <div className="eps-sponsor-tree eps-tree" zoom={6}>
                            <ul>
                                {this.getCurrent(null)}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.loading ?
                    <div className="pb-2 position-sticky fixed-bottom">
                        <div className="progress h-8">
                            <div className="progress-bar bg-primary progress-bar-animated progress-bar-striped" style={{ width: '100%' }} role="progressbar"> <span className="sr-only">Memuat data...</span> </div>
                        </div>
                    </div>
                    : ''}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    // 
    return {
        isLoading: state.networkReducer.isLoading,
        list: state.networkReducer.data,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Sponsor)