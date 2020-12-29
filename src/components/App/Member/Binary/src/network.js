import React,{Component} from 'react';
// import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
import { Link } from 'react-router-dom';
import { FetchNetwork } from '../../../../../redux/actions/member/network.action';
// import { FetchNetwork } from '../../../../redux/actions/member/network.action';
// import jQuery from 'jquery';
class Binary extends Component{
    constructor(props){
        super(props);
        this.state = {
            token:'',
            activeTab : 0,
            selectedIndex : 0,
            numChildren: 0,
            // data: JSON.parse('[{"id": 25,"slug": "mobiles","parent_id": null,"name": "Mobiles","hasChild":true,"pos":"right"},{"id": 30,"slug": "mobiles","parent_id": 25,"name": "Mobiles","hasChild":false,"pos":"right"},{"id": 26,"slug": "mobile-phones-accessories","parent_id": 25,"name": "Mobile Phones accessories","hasChild":true,"pos":"left"},{"id": 27,"slug": "computer-laptop","parent_id": 26,"name": "Computer & Laptop","hasChild":true,"pos":"right"},{"id": 28,"slug": "laptops","parent_id": 27,"name": "Laptops","hasChild":true,"pos":"left"},{"id": 29,"slug": "mobile-phones","parent_id": 26,"name": "Mobiles Phone","hasChild":true,"pos":"left"}]'),
            arr:[
                {
                   "id":25,
                   "parent_id":null,
                   "sponsor_id":null,
                   "detail":{"name":"Mobiles"},
                   "hasChild":true,
                   "pos":"right"
                },
                {
                   "id":30,
                   "parent_id":25,
                   "sponsor_id":null,
                   "detail":{"name":"Mobiles"},
                   "hasChild":false,
                   "pos":"right"
                },
                {
                   "id":26,
                   "parent_id":25,
                   "sponsor_id":null,
                   "detail":{"name":"Mobile Phones accessories"},
                   "hasChild":true,
                   "pos":"left"
                },
                {
                   "id":27,
                   "parent_id":26,
                   "sponsor_id":null,
                   "detail":{"name":"Computer & Laptop"},
                   "hasChild":true,
                   "pos":"right"
                },
                {
                   "id":31,
                   "parent_id":27,
                   "sponsor_id":null,
                   "detail":null,
                   "hasChild":false,
                   "pos":"right"
                },
                {
                   "id":32,
                   "parent_id":29,
                   "sponsor_id":null,
                   "detail":null,
                   "hasChild":false,
                   "pos":"right"
                },
                {
                   "id":33,
                   "parent_id":29,
                   "sponsor_id":null,
                   "detail":null,
                   "hasChild":false,
                   "pos":"left"
                },
                {
                   "id":28,
                   "parent_id":27,
                   "sponsor_id":null,
                   "detail":{"name":"Laptops"},
                   "hasChild":false,
                   "pos":"left"
                },
                {
                   "id":29,
                   "parent_id":26,
                   "sponsor_id":null,
                   "detail":{"name":"Mobiles Phone"},
                   "hasChild":true,
                   "pos":"left"
                }
             ],
             arrs:[]
        };
    }
    getCurrent = (node) => this.state.arrs.filter(cNode => cNode.parent_id === node).map(cNode => (
        <div key={`node_${cNode.id}`} className={`node-${cNode.position}-item binary-level-width-50`}>
            <span className={`binary-hr-line binar-hr-line-${cNode.position} binary-hr-line-width-25`} style={{display: !cNode.hasChild?'none':''}}/>
            {cNode.detail===null?
                // <div className={`node-item-1-child-${cNode.position}`} onClick={(e)=>this.addNew(e,cNode)}>
                <Link to={{ pathname: "/member/add", data: cNode }}>
                    <div className={`node-item-1-child-${cNode.position}`}>
                        <div className="binary-node-single-item user-block user-11">
                            <div className="images_wrapper">
                                {/* <a href="/afl/ref/17/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxNyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9"> */}
                                <img className="profile-rounded-image-small" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/no-user.png?itok=jHw_hHUZ" width={70} height={70} alt="Add new member" title="Add new member" />
                                {/* </a> */}
                            </div>
                                <span className="wrap_content">
                                {/* <a href="/afl/ref/17/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxNyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9"></a> */}
                                Add new member
                                </span>
                        </div>
                        <div className="last_level_user"><i className="fa fa-2x">&nbsp;</i></div>
                    </div>
                </Link>
            :
            <div className={`node-item-1-child-${cNode.position} ${cNode.hasChild?'node-item-root':''}`}>
                <div className="binary-node-single-item user-block user-12">
                    <div className="images_wrapper">
                        <img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src={cNode.picture} width={70} height={70} alt={cNode.name} title={cNode.name} /></div>
                    <span className="wrap_content ">{cNode.name}</span>
                        <div className="pop-up-content">
                            <div className="profile_tooltip_pick">
                                <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src={cNode.picture} width={70} height={70} alt={cNode.name} title={cNode.name} /></div>
                                <div className="full-name">{cNode.name}</div>
                                <div className="username">
                                    <span className="text-label">Membership : </span>
                                    <span className="text-value">{cNode.membership}</span>
                                </div>
                            </div>
                            <div className="tooltip_profile_detaile">
                                <div className="row">
                                    <div className="col-md-6  text-center">
                                        <span className="text-label">LEFT PV</span>
                                        {/* <span className="text-value">$1,300.00</span> */}
                                    </div>
                                    <div className="col-md-6  text-center">
                                        <span className="text-label">RIGHT PV</span>
                                        {/* <span className="text-value">$1,300.00</span> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6  text-center" style={{borderRight: 'solid darkgrey thin'}}>
                                        {/* <span className="text-label">LEFT</span> */}
                                        <span className="text-value">{cNode.left_pv}</span>
                                    </div>
                                    <div className="col-md-6  text-center">
                                        {/* <span className="text-label">RIGHT</span> */}
                                        <span className="text-value">{cNode.right_pv}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="tooltip-footer">
                                <div className="text">
                                    <span className="text-label">Joined Date : </span>
                                    <span className="text-value">{cNode.join_date}</span>
                                </div>
                            </div>
                        </div>

                </div>
                <div id="btn-default" className="last_level_user" onClick={(e)=>this.showNode(e,cNode.id)} style={{display:!cNode.hasChild?'':'none'}}><i id="fa-2x-42" className="fa fa-plus-circle fa-2x" /></div>
            </div>
            }
            <div className="parent-wrapper clearfix" id={cNode.parent_id} >
                {this.getCurrent(cNode.id)}
            </div>
        </div>
    ))

    // getTree(node){
    //     this.state.arrs.forEach(elem => {
    //         if(elem.parent_id === node){
    //             <div key={`node_${elem.id}`} className={`node-${elem.position}-item binary-level-width-50`}>
    //                 <span className={`binary-hr-line binar-hr-line-${elem.position} binary-hr-line-width-25`} style={{display: !elem.hasChild?'none':''}}/>
    //                 {elem.detail===null?
    //                     <div className={`node-item-1-child-${elem.position}`} onClick={(e)=>this.addNew(e,elem)}>
    //                         <div className="binary-node-single-item user-block user-11">
    //                             <div className="images_wrapper">
    //                                 <a href="/afl/ref/17/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxNyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9">
    //                                 <img className="profile-rounded-image-small" src={elem.picture} width={70} height={70} alt="Add new member" title="Add new member" /></a>
    //                             </div>
    //                                 <span className="wrap_content">
    //                                 <a href="/afl/ref/17/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxNyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9">Add new member</a></span>
    //                         </div>
    //                         <div className="last_level_user"><i className="fa fa-2x">&nbsp;</i></div>
    //                     </div>
    //                 :
    //                 <div className={`node-item-1-child-${elem.position} ${elem.hasChild?'node-item-root':''}`}>
    //                     <div className="binary-node-single-item user-block user-12"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width={70} height={70} alt="dexaxe" title="dexaxe" /></div>
    //                         <span className="wrap_content ">{elem.name}</span>
    //                             {/* <div className="pop-up-content">
    //                                 <div className="profile_tooltip_pick">
    //                                     <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/business-man-1.jpg?itok=zhxmnAkU" width={70} height={70} alt="mlm.member" title="mlm.member" /></div>
    //                                     <div className="full-name">John Joseph </div>
    //                                     <div className="username">
    //                                         <span className="text-label">Username : </span>
    //                                         <span className="text-value">mlm.member</span>
    //                                     </div>
    //                                 </div>
    //                                 <div className="tooltip_profile_detaile">
    //                                     <div className="text">
    //                                         <span className="text-label">Sales (Left)</span>
    //                                         <span className="text-value">$0.00</span>
    //                                     </div>
    //                                     <div className="text">
    //                                         <span className="text-label">Sales (Right)</span>
    //                                         <span className="text-value">$0.00</span>
    //                                     </div>
    //                                     <div className="text">
    //                                         <span className="text-label">Carry-forward (Right)</span>
    //                                         <span className="text-value">$0.00</span>
    //                                     </div>
    //                                     <div className="text">
    //                                         <span className="text-label">Carry-forward (Left)</span>
    //                                         <span className="text-value">$1,300.00</span>
    //                                     </div>
    //                                 </div>
    //                                 <div className="tooltip-footer">
    //                                     <div className="text">
    //                                         <span className="text-label">Joined Date : </span>
    //                                         <span className="text-value">2019-04-01 08:30:00</span>
    //                                     </div>
    //                                 </div>
    //                             </div> */}

    //                     </div>
    //                     <div id="btn-default" className="last_level_user" onClick={(e)=>this.addNew(e,elem.id)} style={{display:!elem.hasChild?'':'none'}}><i id="fa-2x-42" className="fa fa-plus-circle fa-2x" /></div>
    //                 </div>
    //                 }
    //                 <div className="parent-wrapper clearfix" id={elem.parent_id} >
    //                     {this.getTree(elem.id)}
    //                 </div>
    //             </div>
    //         }
    //     });
    // }
   showNode(e,data){
        e.preventDefault();
        this.props.dispatch(FetchNetwork(btoa(data),false))
        // alert(JSON.stringify(data))
    }
    addNew(e,data){
        e.preventDefault();
        alert(JSON.stringify(data))
    }

    // componentWillReceiveProps(nextProps,prevProps){
    //     console.log("nextProps",nextProps)
    //     console.log("prevProps",prevProps)

    //     if(this.state.arrs.length===[]){
    //         this.setState({arrs:this.props.dataList})
    //     } else {
    //         console.log("asdasfafadfadf")
    //         // this.setState({arrs:this.props.list})
    //         var joined = this.state.arrs.concat(this.props.list[0]);
    //         this.setState({
    //             arrs:joined
    //         })
    //     }
        
    //     console.log(this.state.arrs)
    // }
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
        if(this.state.arrs.length===[]){
            this.setState({arrs:this.props.dataList})
        } else {
            console.log("asdasfafadfadf")
            // this.setState({arrs:this.props.list})console.log("asdasfafadfadf")
            // this.setState({arrs:this.props.list})
            var joined = this.state.arrs.concat(this.props.list[0]);
            this.setState({
                arrs:joined
            })
        }
    }
    componentDidMount(){
        // console.log("aaaaaaaaaaaaaaaa",this.state.arrs)
        // let nodes = [{ id: 6, parent_id: 1, name: null }, { id: 1, parent_id: 0, name: "kpittu" }, { id: 2, parent_id: 0, name: "news" }, { id: 3, parent_id: 0, name: "menu" }, { id: 4, parent_id: 3, name: "node" }, { id: 5, parent_id: 4, name: "subnode" }]
        // let toTree  = this.state.arrs
        // let myArrs = []
        // toTree.forEach(element => {
        //     console.log(element)
        //     myArrs.push(element)
        // });
        // console.log("bbbbbbbbbbbbbbbb",toTree)
        // console.log("cccccccccccccccc",nodes)
        // console.log("dddddddddddddddd",myArrs)
        // let myTree = function (data, root) {
        //     let r = [], o = {};
        //     data.forEach(function (a) {
        //         if (o[a.id] && o[a.id].children) {
        //             a.children = o[a.id] && o[a.id].children;
        //         }
        //         o[a.id] = a;
        //         if (a.parent_id === root) {
        //             r.push(a);
        //         }
        //         else {
        //             o[a.parent_id] = o[a.parent_id] || {};
        //             o[a.parent_id].children = o[a.parent_id].children || [];
        //             o[a.parent_id].children.push(a);
        //         }
        //     });
        //     return r;
        // }(myArrs, 0);
    let myTree = this.flatToTree(this.state.arrs.length===[]?this.props.dataList:this.state.arrs,0)
    console.log("myTree",myTree);
    // const array=[{id:1,name:"bla",children:[{id:23,name:"bla",children:[{id:88,name:"bla"},{id:99,name:"bla"}]},{id:43,name:"bla"},{id:45,name:"bla",children:[{id:43,name:"bla"},{id:46,name:"bla"}]}]},{id:12,name:"bla",children:[{id:232,name:"bla",children:[{id:848,name:"bla"},{id:959,name:"bla"}]},{id:433,name:"bla"},{id:445,name:"bla",children:[{id:443,name:"bla"},{id:456,name:"bla",children:[{id:97,name:"bla"},{id:56,name:"bla"}]}]}]},{id:15,name:"bla",children:[{id:263,name:"bla",children:[{id:868,name:"bla"},{id:979,name:"bla"}]},{id:483,name:"bla"},{id:445,name:"bla",children:[{id:423,name:"bla"},{id:436,name:"bla"}]}]}];

        // const findItemNested = (arr, itemId, nestingKey) => (
        // arr.reduce((a, item) => {
        //     if (a) return a;
        //     if (item.id === itemId) return item;
        //     if (item[nestingKey]) return findItemNested(item[nestingKey], itemId, nestingKey)
        // }, null)
        // );
        // const res = findItemNested(tree, 2, "children");
        // console.log("resss",res);


        // const findById = (id, nestingKey) => {

        //     let array = tree
        //     for (let index = 0; index < array.length; index++) {
        //         const element = array[index];
        //         if (element.id === id) {
        //           return element;
        //         } else {
        //           if (element[nestingKey]) {
        //             const found = findById(element[nestingKey], id);
            
        //             if (found) {
        //               return found;
        //             }
        //           }
        //         }
        //       }
        //   }
          
        // const res = findById(6, "children");
        // console.log("resss",res);


        const findItemNested = (arr, itemId, nestingKey) => arr.reduce((a, c) => {
            return a.length
            ? a
            : c.id === itemId
            ? a.concat(c)
            : c[nestingKey]
                ? a.concat(findItemNested(c[nestingKey], itemId, nestingKey))
                : a
        }, []);
        //   const res = findItemNested(this.state.arrs, "SK5711868826", "children");
        // console.log("resss",res[0]);

        // let items = localStorage.getItem('valArrays');
        // if(items===null){
            // this.setState({arrs:this.props.dataList})
            (this.state.arrs.length===[]?this.props.dataList:this.state.arrs).forEach(elemA => {
                // this.state.arrs.forEach(elemB => {
                //     if(elemA.id===elemB.parent_id){
                //         console.log("kkkkkkkkkkkkkkkkkkkkkkkkk",elemA.id+"  =  "+elemB.parent_id+"  =  "+elemB.name+"  =  "+elemB.position)
                //         // if((elemA.id===elemB.parent_id)&&elemB.position!=='left'){
                //             let joined = this.state.arrs.concat({"parent_id":elemB.parent_id,"position":(elemB.position==='left'?'right':'left'),"name":"tes","hasChild":true,"id":0,"detail":null});
                //             this.setState({
                //                 arrs:joined
                //             })
                //         // }
                //         // let joined = this.props.dataList.concat(this.props.list);
                //     }
                //     // else {
                //     //     console.log("oooooooooooooooooooooo",elemA.id+"  =  "+elemB.parent_id+"  =  "+elemB.name+"  =  "+elemB.position)
                //     //     // var joined = this.state.arrs.concat(
                //     //     //     {"parent_id":elemB.parent_id,"position":'right',"name":"tes","hasChild":true,"id":0},
                //     //     //     {"parent_id":elemB.parent_id,"position":'left',"name":"tes","hasChild":true,"id":0},
                //     //     //     );
                //     //     // this.setState({
                //     //     //     arrs:joined
                //     //     // })
                //     // }
                //     // this.state.arrs.filter(cNode => cNode.parent_id === node).map(item => (
                //     //     ({ ...item, children: nest(items, item.id) })
                //     // ))
                //     // const helper = this.state.arrs.reduce((h, o) => (h[o.id] = Object.assign({}, o), h), Object.create(null));
                //     // const tree = this.state.arrs.reduce((t, node) => {
                //     //     const current = helper[node.id];
                        
                //     //     if(current.parent_id === 0) { // if it doesn't have a parent push to root
                //     //       t.push(current);
                //     //     } else {
                //     //       helper[node.parent_id].children || (helper[node.parent_id].children = []) // add the children array to the parent, if it doesn't exist
                //     //       helper[node.parent_id].children.push(current); // push the current item to the parent children array
                //     //     }
                        
                //     //     return t;
                //     //   }, []);
                //     //   console.log(tree);
                // });
                
                const res = findItemNested(this.state.arrs.length===[]?this.props.dataList:this.state.arrs, elemA.id, "children");
                console.log("resss",res[0]);
                if(res.children === undefined && elemA.id!==undefined){
                    let joined = this.state.arrs.length===[]?this.props.dataList:this.state.arrs.concat(
                        {"parent_id":elemA.id,"position":'left','hasChild':true,"detail":null},
                        {"parent_id":elemA.id,"position":'right','hasChild':true,"detail":null},
                        );
                    this.setState({
                        arrs:joined
                    })
                }
            });
        // } else {
        //     let toObject = JSON.parse(items);
        // //     console.log("asdasfafadfadf",this.props.list)
        // //     // this.setState({arrs:this.props.list})console.log("asdasfafadfadf")
        // //     // this.setState({arrs:this.props.list})
        //     var joined = toObject.concat(this.props.list);
        //     this.setState({
        //         arrs:joined
        //     })
        // }
        // console.log("ssssssssssssss",items);
    }
    // componentDidMount(){

    //     if(this.state.arrs.length===[]){
    //         this.setState({arrs:this.props.dataList})
    //     } else {
    //         console.log("asdasfafadfadf")
    //         // this.setState({arrs:this.props.list})console.log("asdasfafadfadf")
    //         // this.setState({arrs:this.props.list})
    //         // var joined = this.state.arrs.concat(this.props.list[0]);
    //         // this.setState({
    //         //     arrs:joined
    //         // })
    //         let joined = Object.assign({}, this.state.arrs, this.props.list[0]);
    //         this.setState({arrs: joined});
    //     }
    //     console.log(this.state.arrs)
    // }
    // componentDidUpdate(prevState){
    //     if(this.props.dataList!==prevState.dataList){
    //         this.setState({arrs:this.props.dataList})
    //     } else {
    //         console.log("asdasfafadfadf")
    //         // this.setState({arrs:this.props.list})console.log("asdasfafadfadf")
    //         // this.setState({arrs:this.props.list})
    //         var joined = this.state.arrs.concat(this.props.list[0]);
    //         this.setState({
    //             arrs:joined
    //         })
    //     }
    //     console.log(this.state.arrs)
    // }
    // componentWillUnmount() {
    //     localStorage.setItem('valArrays', JSON.stringify(this.state.arrs))
    //   }
    render(){
        console.log("newwwwwwwww",this.state.arrs)
        return (
            <div className="card">
                <div className="card-body">
                    <div id="block-system-main" className="block block-system clearfix">
                        <div className="binary-genealogy-tree binary_tree_extended">
                            <div className="binary-genealogy-level-0 clearfix">
                                <div className="no_padding parent-wrapper clearfix text-center" style={{display:'inline-table'}}>
                                    {/* <div className="node-centere-item binary-level-width-100"> */}
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
    console.log(state.networkReducer)
    return {
        isLoading:state.networkReducer.isLoading,
        list:state.networkReducer.data,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Binary)