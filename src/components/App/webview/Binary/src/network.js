import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { HEADERS } from 'redux/actions/_constants';
import noUser from 'assets/no-user.png';
import Default from 'assets/default.png'
import Preloader from 'PreloaderWebview'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { UncontrolledTooltip } from 'reactstrap';

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
            isOpen: true,
            id_member:''
        };
    this.handleChange = this.handleChange.bind(this)
    }

    alertHandle(e, cNode) {
        e.preventDefault();
        Swal.fire({
            title: cNode.name + ` <img src=${cNode.badge} alt="user" width="30px" class="thumb-xs mb-2 ml-1 rounded-circle"/>`,
            html:
                `
                <div class="row mb-2 text-center">
                    <div class="profile_tooltip_pick" style="width:100%">
                        <div class="username">
                            <span class="text-label">Jenjang Karir : </span>
                            <span class="text-value">${cNode.jenjang_karir}</span>
                        </div>
                        <div class="username">
                            <span class="text-label">UID : </span>
                            <span class="text-value">${cNode.id}</span>
                        </div>
                    </div>
                </div>
                <div class="tooltip_profile_detaile" style="width:100%">
                    <div class="row mb-2">
                        <div class="col-6 col-md-6  text-center">
                            <span class="text-label font-12">PV KIRI</span>
                        </div>
                        <div class="col-6 col-md-6  text-center">
                            <span class="text-label font-12">PV KANAN</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 col-md-6  text-center" style="border-right: solid darkgrey thin">
                            <span class="text-value">${cNode.left_pv}</span>
                        </div>
                        <div class="col-6 col-md-6  text-center">
                            <span class="text-value">${cNode.right_pv}</span>
                        </div>
                    </div>
                    <hr/>
                    <div class="row mb-2">
                        <div class="col-6 col-md-6  text-center">
                            <span class="text-label font-12">REWARD KIRI</span>
                        </div>
                        <div class="col-6 col-md-6  text-center">
                            <span class="text-label font-12">REWARD KANAN</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 col-md-6  text-center" style="border-right: solid darkgrey thin">
                            <span class="text-value">${cNode.left_reward}</span>
                        </div>
                        <div class="col-6 col-md-6  text-center">
                            <span class="text-value">${cNode.right_reward}</span>
                        </div>
                    </div>
                </div>
                `,
            confirmButtonText: 'Tutup',
            focusConfirm: false,
            preConfirm: () => {
                return true;
            }
        })
    }

    getCurrent = (node) => this.state.arrs.sort(function (a, b) {
        if (a.position < b.position) { return -1 }
        if (a.position > b.position) { return 1 }
        return 0
    })
        .filter(cNode => cNode.parent_id === node).map(cNode => (
            <li id={`li_${cNode.id}`} key={`node_${cNode.id}`}>
                {cNode.detail === null ?
                    <a href={'/web_view/regist/' + btoa(this.props.datum + '|' + JSON.stringify(cNode))}>
                        <div className={`eps-nc ${cNode.parent_id !== null ? 'eps-path' : ''}`} nid={cNode.parent_id}>
                            <div className="usr-pic">
                                <img src={noUser} alt="sangqu"
                                    className="img" /> </div>
                            <div className="usr-name"><i className="fa fa-plus" />&nbsp;Member</div>
                        </div>
                    </a>
                    :
                    <div>
                        <div className={`binary-node-single-item eps-nc ${cNode.parent_id !== null ? 'eps-path' : ''} user-block user-12`} style={{ borderColor: "#c0c0c0", borderWidth: '3px' }}>

                            <div
                                className="ribbon_wrapper images_wrapper"
                                style={{ height: "-webkit-fill-available", position: 'inherit', zIndex: '2' }}
                            >
                                <div
                                    className="ribbon ribbon-vertical-l d-none"
                                    style={{
                                        lineHeight: "unset",
                                        width: "70px",
                                        transform: "rotate(-45deg)",
                                        left: "-40px",
                                        top: "-15px",
                                    }}
                                >
                                    <img
                                        src={cNode.badge}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `${Default}`;
                                        }}
                                        alt="user"
                                        className="thumb-xs mb-2 rounded-circle"
                                    />
                                </div>
                                <img
                                    className="profile-rounded-image-small h-100"
                                    style={{
                                        borderColor: "#ccc",
                                        WebkitBoxReflect: 'below 0px linear-gradient(to bottom, rgba(0,0,0,0.0), rgb(0 0 0 / 20%))'
                                    }}
                                    src={cNode.picture}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `${Default}`;
                                    }}
                                    width={70}
                                    height={70}
                                    alt={cNode.name}
                                    title={cNode.name}
                                />
                            </div>
                            <div
                                className="alert alert-primary mt-2 font-12 text-dark border-1"
                                style={{
                                    borderColor: cNode.membership === "Basic"
                                        ? "#c0c0c0"
                                        : cNode.membership === "Bisnis"
                                            ? "#DAA520"
                                            : cNode.membership === "Executive"
                                                ? "#732044"
                                                : "#000000",
                                    borderWidth: "3px",
                                    zIndex: 1,
                                    padding: "0px",
                                    // backgroundColor: "#ffffff",
                                    width: '10em',
                                    right: '2em',
                                    display: 'inline-table',
                                    backgroundColor: cNode.membership === "Basic"
                                        ? "#c0c0c0"
                                        : cNode.membership === "Bisnis"
                                            ? "#DAA520"
                                            : cNode.membership === "Executive"
                                                ? "#732044"
                                                : "#000000",
                                    top: '-7.4em'
                                }}
                            >
                                <div className="pop-up-content" style={{ height: 'max-content' }}>
                                    <div className="profile_tooltip_pick p-0" style={{ marginTop: '7em' }}>
                                        <div className="full-name m-0 p-1 font-16 d-flex align-items-center justify-content-center" style={{
                                            backgroundColor:
                                                cNode.membership === "Basic"
                                                    ? "#c0c0c0"
                                                    : cNode.membership === "Bisnis"
                                                        ? "#DAA520"
                                                        : cNode.membership === "Executive"
                                                            ? "#732044"
                                                            : "#000000",
                                            height: '6em'
                                        }}><strong className="text-light">{cNode.name}</strong></div>
                                        <div className="username d-flex justify-content-between align-items-center m-0">
                                            <span className="text-value p-1" style={{ backgroundColor: cNode.kualifikasi > 0 ? '#004896' : '#c0c0c0', color: cNode.kualifikasi > 0 ? '#fff' : '#000' }}>{cNode.id}</span>
                                            <span className="text-value px-2 py-1 font-weight-bold text-dark">{cNode.kualifikasi}</span>
                                        </div>
                                    </div>
                                    <div className="tooltip_profile_detaile">
                                        <div className="row mb-2">
                                            <div className="col-6 col-md-6  text-center">
                                                <span className="text-label font-11">KIRI</span>
                                            </div>
                                            <div className="col-6 col-md-6  text-center">
                                                <span className="text-label font-11">KANAN</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 col-md-4  text-center">
                                                <span className="text-value">{cNode.left_pv}</span>
                                            </div>
                                            <div className="col-4 col-md-4  text-center">
                                                <span className="text-value">PV</span>
                                            </div>
                                            <div className="col-4 col-md-4  text-center">
                                                <span className="text-value">{cNode.right_pv}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 col-md-4  text-center">
                                                <span className="text-value">
                                                    {cNode.left_reward}
                                                </span>
                                            </div>
                                            <div className="col-4 col-md-4  text-center">
                                                <span className="text-value">RW</span>
                                            </div>
                                            <div className="col-4 col-md-4  text-center">
                                                <span className="text-value">
                                                    {cNode.right_reward}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 col-md-4  text-center">
                                                <span className="text-value">
                                                    {cNode.left_ro}
                                                </span>
                                            </div>
                                            <div className="col-4 col-md-4  text-center">
                                                <span className="text-value">RO</span>
                                            </div>
                                            <div className="col-4 col-md-4  text-center">
                                                <span className="text-value">
                                                    {cNode.right_ro}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            id={`btnAdd_${cNode.id}`}
                            className="last_level_user"
                            style={{ display: "none", zIndex: 1 }}
                        >
                            <i id={"UncontrolledTooltipAdd_" + cNode.id} className="fa fa-plus-circle fa-2x zoom-hover" onClick={(e) => this.showNode(e, cNode.id)} />
                            {/* <UncontrolledTooltip placement="bottom" target={"UncontrolledTooltipAdd_"+cNode.id}>
                        Lihat downline langsung.
                    </UncontrolledTooltip> */}
                            {cNode.parent_id === null && cNode.position === null ? '' :
                                <Link to={{ pathname: `/web_view/binary/${btoa(cNode.id + '|' + String(atob(this.props.datum)).split('|')[1])}` }}>
                                    <i id={"UncontrolledTooltipNew_" + cNode.id} className="fa fa-level-up fa-2x zoom-hover mx-1" />
                                    {/* <UncontrolledTooltip placement="bottom" target={"UncontrolledTooltipNew_"+cNode.id}>
                            Lihat downline sebagai Node utama.
                        </UncontrolledTooltip> */}
                                </Link>
                            }
                        </div>
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
        fetch(HEADERS.URL + `member/network/${btoa(id)}`, { headers })
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({ loading: false });
                    if (data.status === 'success') {
                        // document.getElementById('li_'+id).innerHTML = '<ul id=wrapper_'+id+'></ul>';
                        if (data.result.length <= 0) {
                            let joined = this.state.arrs.concat(
                                { "parent_id": id, "position": 'left', 'hasChild': false, "detail": null },
                                { "parent_id": id, "position": 'right', 'hasChild': false, "detail": null },
                            );
                            this.setState({
                                arrs: joined
                            })
                            document.getElementById('btnAdd_' + id).style.display = 'none';
                            // document.getElementById('node-wrapper-'+id).classList.add("node-item-root");
                        } else {
                            document.getElementById('btnAdd_' + id).style.display = 'none';
                            // document.getElementById('node-wrapper-'+id).classList.add("node-item-root");

                            if (data.result.length === 1) {
                                if (data.result[0].position === 'left') {
                                    let joinedA = this.state.arrs.concat({ "parent_id": id, "position": 'right', 'hasChild': false, "detail": null },);
                                    let joinedB = joinedA.concat(data.result);
                                    this.setState({ arrs: joinedB })
                                } else {
                                    let joinedA = this.state.arrs.concat({ "parent_id": id, "position": 'left', 'hasChild': false, "detail": null },);
                                    let joinedB = joinedA.concat(data.result);
                                    this.setState({ arrs: joinedB })
                                }
                            } else if (data.result.length === 2) {
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
    showNode(e, data) {
        e.preventDefault();
        this.showFetch(data);
    }
    addNew(e, data) {
        e.preventDefault();
        // alert(JSON.stringify(data))
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
        if (this.props.match.params.id!==undefined && this.state.id_member==='') {
            this.setState({id_member:this.props.match.params.id!==undefined?atob(this.props.match.params.id).split('|')[0]:this.props.match.params.id})
        }
    }
    componentDidMount() {
        this.setState({ arrs: this.props.dataList })
        this.getProps(this.props);
    }
    getProps(props) {
        this.flatToTree(this.state.arrs === [] ? props.dataList : this.state.arrs, 0)
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

    render() {
        return (
            <div>
                {this.state.loading ?
                    <Preloader />
                    :
                    <div id="block-system-main" className="block block-system clearfix" >
                        <div className="row d-flex align-items-center justify-content-between mt-1 mx-1">
                            <div className="col-md-4 col-sm-6 offset-md-4 offset-sm-3">
                                <div className="input-group">
                                <input type="text" className="form-control" placeholder="Cari berdasarkan ID Member" defaultValue={this.state.id_member} name="id_member" onChange={this.handleChange} />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button" onClick={(e) => { e.preventDefault(); if (this.state.id_member !== '') { this.props.history.push({pathname: `/web_view/binary/${btoa(this.state.id_member + '|' + String(atob(this.props.datum)).split('|')[1])}`}) }}}>Cari</button>
                                </div>
                                </div>
                            </div>

                            </div>
                        <div className="binary-genealogy-tree binary_tree_extended">

                            <div className="sponsor-tree-wrapper">
                                <div className="eps-sponsor-tree eps-tree" zoom={6} style={{
                                    position: 'static',
                                    width: '100%',
                                    height: '110vh'
                                }}>
                                    <ul>
                                        {this.getCurrent(null)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                }
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