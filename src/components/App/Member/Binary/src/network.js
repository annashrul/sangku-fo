import React,{Component} from 'react';
import connect from "react-redux/es/connect/connect";
import { Link } from 'react-router-dom';
import Preloader from 'Preloader'
import moment from 'moment'
import { HEADERS } from '../../../../../redux/actions/_constants';
import noUser from 'assets/no-user.png';
import Default from 'assets/default.png'
class Binary extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            activeTab : 0,
            selectedIndex : 0,
            numChildren: 0,
            loading:false,
            arrs:[]
        };
    }
    getCurrent = (node) => this.state.arrs.filter(cNode => cNode.parent_id === node).map(cNode => (
        <div key={`node_${cNode.id===undefined?Math.random():cNode.id}`} className={`node-${cNode.position===null?'right':cNode.position}-item binary-level-width-50`}>
            <span id={`line-${cNode.position}-${cNode.id}`} className={`binary-hr-line binar-hr-line-${cNode.position} binary-hr-line-width-25`} style={{display: cNode.detail!==null?'none':''}}/>
            {cNode.detail===null?
                <Link to={{ pathname: "/member/add", data: cNode }}>
                    <div className={`node-item-1-child-${cNode.position}`}>
                        <div className="binary-node-single-item user-block user-11">
                            <div className="images_wrapper">
                                <img className="profile-rounded-image-small" src={noUser} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} width={70} height={70} alt="Add new member" title="Add new member" />
                            </div>
                                <div class="alert alert-primary mt-1" style={{padding:'unset', backgroundColor:'#7266ba',zIndex:1, padding:'3px'}}>
                                <i className="fa fa-plus"></i>&nbsp;
                                Member
                                </div>
                        </div>
                        <div className="last_level_user"><i className="fa fa-2x">&nbsp;</i></div>
                    </div>
                </Link>
            :
            <div id={`node-wrapper-${cNode.id}`} className={`node-item-1-child-${cNode.position} node-item-root`}>
                <div className="binary-node-single-item user-block user-12">
                    <div className="ribbon_wrapper images_wrapper">
                <div className="ribbon ribbon-vertical-l" style={{lineHeight:'unset',width:'70px',transform:'rotate(-45deg)',left:'-40px',top:'-15px'}}><img src={cNode.badge} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} alt="user" class="thumb-xs mb-2 rounded-circle"/></div>
                        <img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src={cNode.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} width={70} height={70} alt={cNode.name} title={cNode.name} /></div>
                    <div class="alert alert-primary mt-1" style={{padding:'unset', backgroundColor:'#7266ba',zIndex:1, padding:'3px'}}>{cNode.name}</div>
                        <div className="pop-up-content">
                            <div className="profile_tooltip_pick">
                                <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src={cNode.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} width={70} height={70} alt={cNode.name} title={cNode.name} /></div>
                                <div className="full-name">{cNode.name}</div>
                                <div className="username">
                                    <span className="text-label">UID : </span>
                                    <span className="text-value">{cNode.id}</span>
                                </div>
                                <div className="username">
                                    <span className="text-label">Membership : </span>
                                    <img src={cNode.badge} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} style={{width:'10%'}} alt="user" class="thumb-xs mb-2 rounded-circle"/>
                                </div>
                            </div>
                            <div className="tooltip_profile_detaile">
                                <div className="row">
                                    <div className="col-md-6  text-center">
                                        <span className="text-label">LEFT PV</span>
                                    </div>
                                    <div className="col-md-6  text-center">
                                        <span className="text-label">RIGHT PV</span>
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
                            </div>
                            <div className="tooltip-footer">
                                <div className="text">
                                    <span className="text-label">Joined Date : </span>
                                    <span className="text-value">{moment(cNode.join_date).format('YYYY-MM-DD')}</span>
                                </div>
                            </div>
                        </div>

                </div>
                <div id={`btnAdd_${cNode.id}`} className="last_level_user" onClick={(e)=>this.showNode(e,cNode.id)} style={{display:'none'}}><i id="fa-2x-42" className="fa fa-plus-circle fa-2x" /></div>
            </div>
            }
            <div className="parent-wrapper clearfix" id={cNode.parent_id} >
                {this.getCurrent(cNode.id)}
            </div>
        </div>
    ))

    showFetch(id){
        this.setState({loading:true});
        fetch(HEADERS.URL + `member/network/${btoa(id)}`)
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({loading:false});
                if(data.status==='success'){
                    if(data.result.length<=0){
                        let joined = this.state.arrs.concat(
                            {"parent_id":id,"position":'left','hasChild':false,"detail":null},
                            {"parent_id":id,"position":'right','hasChild':false,"detail":null},
                            );
                        this.setState({
                            arrs:joined
                        })
                        document.getElementById('btnAdd_'+id).style.display = 'none';
                        document.getElementById('node-wrapper-'+id).classList.add("node-item-root");
                    } else {
                        document.getElementById('btnAdd_'+id).style.display = 'none';
                        document.getElementById('node-wrapper-'+id).classList.add("node-item-root");
                        if(data.result.length=1){
                            if(data.result[0].position==='left'){
                                let joinedA = this.state.arrs.concat({"parent_id":id,"position":'right','hasChild':false,"detail":null},);
                                let joinedB = joinedA.concat(data.result);
                                this.setState({arrs:joinedB})
                            } else {
                                let joinedA = this.state.arrs.concat({"parent_id":id,"position":'left','hasChild':false,"detail":null},);
                                let joinedB = joinedA.concat(data.result);
                                this.setState({arrs:joinedB})
                            }
                        } else {
                        let joined = this.state.arrs.concat(data.result);
                        this.setState({arrs:joined})
                        }
                    }
                }
            },
            (error) => {
                this.setState({loading:false});
                // this.setState({
                //     isLoaded: true,
                //     error
                // });
            }
        )
    }

    showNode(e,data){
        e.preventDefault();
        this.showFetch(data);
    }
    addNew(e,data){
        e.preventDefault();
        alert(JSON.stringify(data))
    }
    flatToTree(data,root){
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
    componentWillMount(){
        this.setState({arrs:this.props.dataList})
        this.getProps(this.props);
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.dataList!==this.props.dataList){
            this.setState({arrs:this.props.dataList})
        }
        if (this.state.arrs.length !== prevState.arrs.length){
            this.getProps(this.props);
            console.log("true")
        }
        console.log("false")
        console.log("this.state.arrs.length",this.state.arrs.length)
        console.log("prevState.arrs.length",prevState.arrs.length)
    }
    componentDidMount(){
        this.setState({arrs:this.props.dataList})
        this.getProps(this.props);
    }
    getProps(props){
        let myTree = this.flatToTree(this.state.arrs===[]?props.dataList:this.state.arrs,0)
        console.log("myTree",myTree);
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
                const res = findItemNested(this.state.arrs===[]?props.dataList:this.state.arrs, elemA.id, "children");
                if(res[0].children === undefined){
                    if(elemA.hasChild){
                        document.getElementById('btnAdd_'+elemA.id).style.display = '';
                        document.getElementById('node-wrapper-'+elemA.id).classList.remove("node-item-root")
                        if(document.getElementById('line-left-'+elemA.id)!==null){
                            document.getElementById('line-left-'+elemA.id).style.display = '';
                        }
                        if(document.getElementById('line-right-'+elemA.id)!==null){
                            document.getElementById('line-right-'+elemA.id).style.display = '';
                        }
                    }
                } else {
                    console.log("res.children",res[0].children);
                    if(res[0].children.length===1){
                        if(res[0].children[0].position==='left'){
                            let joinedA = this.state.arrs.concat({"parent_id":res[0].id,"position":'right','hasChild':false,"detail":null},);
                            this.setState({arrs:joinedA})
                        } else {
                            let joinedA = this.state.arrs.concat({"parent_id":res[0].id,"position":'left','hasChild':false,"detail":null},);
                            this.setState({arrs:joinedA})
                        }
                    }
                    console.log("nnnnnnnnnnnnnnn",true)
                }
            });
    }
    render(){
        console.log("newwwwwwwww",this.state.arrs)
        return (
            <div className="card">
                {this.state.loading?<Preloader/> : ''}
                <div className="card-body">
                    <div id="block-system-main" className="block block-system clearfix">
                        <div className="binary-genealogy-tree binary_tree_extended">
                            <div className="binary-genealogy-level-0 clearfix">
                                <div className="no_padding parent-wrapper clearfix text-center" style={{display:'inline-table'}}>
                                    <div className="node-right-item">
                                        {this.getCurrent(null)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    // console.log(state.networkReducer)
    return {
        isLoading:state.networkReducer.isLoading,
        list:state.networkReducer.data,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Binary)