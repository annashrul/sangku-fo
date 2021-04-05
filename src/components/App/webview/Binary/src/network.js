import React,{Component} from 'react';
import connect from "react-redux/es/connect/connect";
import { HEADERS } from 'redux/actions/_constants';
import noUser from 'assets/no-user.png';
import Default from 'assets/default.png'
import Preloader from 'PreloaderWebview'
import Swal from 'sweetalert2';

class Sponsor extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            activeTab : 0,
            selectedIndex : 0,
            numChildren: 0,
            loading:false,
            arrs:[],
            isOpen:true
        };
    }

    alertHandle(e, cNode) {
        e.preventDefault();
        Swal.fire({
            title: cNode.name+` <img src=${cNode.badge} alt="user" width="30px" class="thumb-xs mb-2 ml-1 rounded-circle"/>`,
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
  
    getCurrent = (node) => this.state.arrs.sort(function(a,b){
            if(a.position < b.position) { return -1 } 
            if(a.position > b.position) { return 1 } 
            return 0
        })
        .filter(cNode => cNode.parent_id === node).map(cNode => (
        <li id={`li_${cNode.id}`} key={`node_${cNode.id}`}>
            {cNode.detail===null?
                <a href={'/web_view/regist/'+btoa(this.props.datum+'|'+JSON.stringify(cNode))}>
                    <div className={`eps-nc ${cNode.parent_id!==null?'eps-path':''}`} nid={cNode.parent_id}>
                        <div className="usr-pic">
                            <img src={noUser} alt="sangqu"
                                className="img" /> </div>
                        <div className="usr-name"><i className="fa fa-plus"/>&nbsp;Member</div>
                    </div>
                </a>
                :
                <div>
                <div className={`binary-node-single-item eps-nc ${cNode.parent_id!==null?'eps-path':''} user-block user-12`}>
                    <div className="ribbon_wrapper images_wrapper" style={{height:'-webkit-fill-available'}} onClick={(event)=>this.alertHandle(event,cNode)}>
                        <div className="ribbon ribbon-vertical-l" style={{lineHeight:'unset',width:'70px',transform:'rotate(-45deg)',left:'-40px',top:'-15px'}}>
                            <img src={cNode.badge} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} alt="user" class="thumb-xs mb-2 rounded-circle"/>
                        </div>
                        <img className="profile-rounded-image-small h-100" style={{borderColor: '#ccc'}} src={cNode.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} width={70} height={70} alt={cNode.name} title={cNode.name} />
                    </div>
                    <div class="alert alert-primary mt-2 font-12" style={{backgroundColor:'#7266ba',zIndex:1, padding:'3px',whiteSpace:'nowrap'}}>{String(cNode.name).replace(/ .*/,'')}</div>
                </div>
                <div id={`btnAdd_${cNode.id}`} className="last_level_user" onClick={(e)=>this.showNode(e,cNode.id)} style={{display:'none'}}><i id="fa-2x-42" className="fa fa-plus-circle fa-2x" /></div>
            </div>
            }
            {cNode.hasChild?
            <ul id={`wrapper_${cNode.id}`}>
                {this.getCurrent(cNode.id)}
            </ul>
            :''}
        </li>
    ))

    showFetch(id){
        this.setState({loading:true});
        fetch(HEADERS.URL + `member/network/${btoa(id)}`)
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({loading:false});
                if(data.status==='success'){
                    // document.getElementById('li_'+id).innerHTML = '<ul id=wrapper_'+id+'></ul>';
                    if(data.result.length<=0){
                        let joined = this.state.arrs.concat(
                            {"parent_id":id,"position":'left','hasChild':false,"detail":null},
                            {"parent_id":id,"position":'right','hasChild':false,"detail":null},
                            );
                        this.setState({
                            arrs:joined
                        })
                        document.getElementById('btnAdd_'+id).style.display = 'none';
                        // document.getElementById('node-wrapper-'+id).classList.add("node-item-root");
                    } else {
                        document.getElementById('btnAdd_'+id).style.display = 'none';
                        // document.getElementById('node-wrapper-'+id).classList.add("node-item-root");
                        
                        if(data.result.length===1){
                            if(data.result[0].position==='left'){
                                let joinedA = this.state.arrs.concat({"parent_id":id,"position":'right','hasChild':false,"detail":null},);
                                let joinedB = joinedA.concat(data.result);
                                this.setState({arrs:joinedB})
                            } else {
                                let joinedA = this.state.arrs.concat({"parent_id":id,"position":'left','hasChild':false,"detail":null},);
                                let joinedB = joinedA.concat(data.result);
                                this.setState({arrs:joinedB})
                            }
                        } else if(data.result.length===2) {
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
        // alert(JSON.stringify(data))
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
        }
    }
    componentDidMount(){
        this.setState({arrs:this.props.dataList})
        this.getProps(this.props);
    }
    getProps(props){
        this.flatToTree(this.state.arrs===[]?props.dataList:this.state.arrs,0)
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
                }
            } else {
                if(res[0].children.length===1){
                    if(res[0].children[0].position==='left'){
                        let joinedA = this.state.arrs.concat({"parent_id":res[0].id,"position":'right','hasChild':false,"detail":null},);
                        this.setState({arrs:joinedA})
                    } else {
                        let joinedA = this.state.arrs.concat({"parent_id":res[0].id,"position":'left','hasChild':false,"detail":null},);
                        this.setState({arrs:joinedA})
                    }
                }
            }
        });
    }
    
    render(){
        return (
            <div>
                  {this.state.loading?
                    <Preloader/>
                 : 
                    <div id="block-system-main" className="block block-system clearfix" >
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
        isLoading:state.networkReducer.isLoading,
        list:state.networkReducer.data,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Sponsor)