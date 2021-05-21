import React,{Component} from 'react';
import connect from "react-redux/es/connect/connect";
import moment from 'moment'
import { HEADERS } from '../../../../../redux/actions/_constants';
import noUser from 'assets/no-user.png';
import Default from 'assets/default.png'
import Preloader from 'PreloaderWebview'
import Cookies from 'js-cookie';

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
        };
    }
 
    getCurrent = (node) => this.state.arrs.sort(function(a,b){if(a.position < b.position) { return -1 } if(a.position > b.position) { return 1 } return 0}).filter(cNode => cNode.parent_id === node).map(cNode => (
        <li id={`li_${cNode.id}`} key={`node_${cNode.id}`} style={{visibility:cNode.id===undefined?'hidden':''}}>
            {cNode.detail===null?
                <div className="eps-nc" nid={cNode.parent_id}>
                    <div className="usr-pic">
                        <img src={noUser} alt="sangqu"
                            className="img" /> </div>
                    <div className="usr-name"><i className="fa fa-plus"/>&nbsp;Member</div>
                </div>
                :
                <div>
                <div className={`binary-node-single-item eps-nc ${cNode.parent_id!==null?'eps-path':''} user-block user-${cNode.id}`}>
                    <div className="ribbon_wrapper images_wrapper" style={{height:'-webkit-fill-available'}}>
                        <img className="profile-rounded-image-small h-100" style={{borderColor: '#ccc'}} src={cNode.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} width={70} height={70} alt={cNode.name} title={cNode.name} /></div>
                        <div className="alert alert-primary mt-2 font-12" style={{backgroundColor:'#7266ba',zIndex:1, padding:'3px',whiteSpace:'nowrap'}}>{String(cNode.name).replace(/ .*/,'')}</div>
                            <div className="pop-up-content">
                                <div className="profile_tooltip_pick">
                                    <div className="image_tooltip"><img className="profile-rounded-image-tooltip h-100" src={cNode.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} width={70} height={70} alt={cNode.name} title={cNode.name} /></div>
                                    <div className="full-name">
                                        {cNode.name}
                                        {/* &nbsp; */}
                                        </div>
                                    <div className="username">
                                        <span className="text-label">UID : </span>
                                        <span className="text-value">{cNode.id}</span>
                                    </div>
                                </div>
                                <div className="tooltip-footer">
                                    <div className="text">
                                        <span className="text-label">Tanggal Bergabung : </span>
                                        <span className="text-value">{moment(cNode.join_date).format('YYYY-MM-DD')}</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                    {
                        cNode.hasChild?
                        <div id={`btnAdd_${cNode.id}`} className="last_level_user" onClick={(e)=>this.showNode(e,cNode.id)} style={{display:'none'}}><i id="fa-2x-42" className="fa fa-plus-circle fa-2x" /></div>
                        :''
                    }
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
        const headers = {
            'Authorization': atob(Cookies.get('sangqu_datum')),
            'username': HEADERS.USERNAME,
            'password': HEADERS.PASSWORD,
            'myconnection': `apps`,
            'Content-Type': `application/x-www-form-urlencoded`
        }
        fetch(HEADERS.URL + `member/sponsor/${btoa(id)}`, { headers })
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({loading:false});
                if(data.status==='success'){
                    if(data.result.length<=0){
                        document.getElementById('btnAdd_'+id).style.display = 'none';
                    } else {
                        document.getElementById('btnAdd_'+id).style.display = 'none';
                        
                        if(data.result.length===1){
                        } else if(data.result.length>=2) {
                            let joined = this.state.arrs.concat(data.result);
                            this.setState({arrs:joined})
                        }
                    }
                }
            },
            (error) => {
                this.setState({loading:false});
            }
        )
    }

    showNode(e,data){
        e.preventDefault();
        this.showFetch(data);
    }
    addNew(e,data){
        e.preventDefault();
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
    
    setSize(e,param){
        // e.preventDefault();
        if (param==='zoom-in') {
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
                document.querySelector('.eps-sponsor-tree.eps-tree').style.transform =  new_style;
                document.querySelector('.eps-sponsor-tree.eps-tree').setAttribute('zoom', i);
            }
        }
        if (param==='zoom-out') {
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
                document.querySelector('.eps-sponsor-tree.eps-tree').style.transform =  new_style;
                document.querySelector('.eps-sponsor-tree.eps-tree').setAttribute('zoom', i);
            }
        }
        if (param==='default') {
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
                document.querySelector('.eps-sponsor-tree.eps-tree').style.transform =  new_style;
                document.querySelector('.eps-sponsor-tree.eps-tree').setAttribute('zoom', i);
            }
        }
    }
    render(){
        return (
            <div id="block-system-main" className="block block-system clearfix">
                
                {this.state.loading?
                <Preloader/>
                 : <div className="binary-genealogy-tree binary_tree_extended">
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