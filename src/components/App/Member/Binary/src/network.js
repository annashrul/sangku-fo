import React,{Component} from 'react';
// import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
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
            <span className={`binary-hr-line binar-hr-line-${cNode.position} binary-hr-line-width-25`} style={{display: cNode.parent_id===null?'none':''}}/>
            {cNode.detail===null?
                <div className={`node-item-1-child-${cNode.position}`} onClick={(e)=>this.addNew(e,cNode)}>
                    <div className="binary-node-single-item user-block user-11">
                        <div className="images_wrapper">
                            <a href="/afl/ref/17/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxNyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9">
                            <img className="profile-rounded-image-small" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/no-user.png?itok=jHw_hHUZ" width={70} height={70} alt="Add new member" title="Add new member" /></a>
                        </div>
                            <span className="wrap_content">
                            <a href="/afl/ref/17/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIxNyIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktdHJlZSJ9">Add new member</a></span>
                    </div>
                    <div className="last_level_user"><i className="fa fa-2x">&nbsp;</i></div>
                </div>
            :
            <div className={`node-item-1-child-${cNode.position} ${cNode.parent_id===null?'node-item-root':''}`}>
                <div className="binary-node-single-item user-block user-12"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width={70} height={70} alt="dexaxe" title="dexaxe" /></div>
                    <span className="wrap_content ">{cNode.name}</span>
                        {/* <div className="pop-up-content">
                            <div className="profile_tooltip_pick">
                                <div className="image_tooltip"><img className="profile-rounded-image-tooltip" src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/business-man-1.jpg?itok=zhxmnAkU" width={70} height={70} alt="mlm.member" title="mlm.member" /></div>
                                <div className="full-name">John Joseph </div>
                                <div className="username">
                                    <span className="text-label">Username : </span>
                                    <span className="text-value">mlm.member</span>
                                </div>
                            </div>
                            <div className="tooltip_profile_detaile">
                                <div className="text">
                                    <span className="text-label">Sales (Left)</span>
                                    <span className="text-value">$0.00</span>
                                </div>
                                <div className="text">
                                    <span className="text-label">Sales (Right)</span>
                                    <span className="text-value">$0.00</span>
                                </div>
                                <div className="text">
                                    <span className="text-label">Carry-forward (Right)</span>
                                    <span className="text-value">$0.00</span>
                                </div>
                                <div className="text">
                                    <span className="text-label">Carry-forward (Left)</span>
                                    <span className="text-value">$1,300.00</span>
                                </div>
                            </div>
                            <div className="tooltip-footer">
                                <div className="text">
                                    <span className="text-label">Joined Date : </span>
                                    <span className="text-value">2019-04-01 08:30:00</span>
                                </div>
                            </div>
                        </div> */}

                </div>
                <div id="btn-default" className="last_level_user" onClick={(e)=>this.addNew(e,cNode.id)} style={{display:cNode.parent_id!==null?'':'none'}}><i id="fa-2x-42" className="fa fa-plus-circle fa-2x" /></div>
            </div>
            }
            <div className="parent-wrapper clearfix" id={cNode.parent_id} style={{display:cNode.parent_id===null?'':'none'}}>
                {this.getCurrent(cNode.id)}
            </div>
        </div>
    ))

    addNew(e,data){
        e.preventDefault();
        this.props.dispatch(FetchNetwork(btoa(data),false))
        // alert(JSON.stringify(data))
    }

    // componentWillReceiveProps(nextProps,prevProps){
    //     console.log("nextProps",nextProps)
    //     console.log("prevProps",prevProps)

    //     if(this.state.arrs.length<=0){
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
    // componentDidMount(){

    //     if(this.state.arrs.length<=0){
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
    componentDidMount(){

        if(this.state.arrs.length<=0){
            this.setState({arrs:this.props.dataList})
        } else {
            console.log("asdasfafadfadf")
            // this.setState({arrs:this.props.list})console.log("asdasfafadfadf")
            // this.setState({arrs:this.props.list})
            // var joined = this.state.arrs.concat(this.props.list[0]);
            // this.setState({
            //     arrs:joined
            // })
            let joined = Object.assign({}, this.state.arrs, this.props.list[0]);
            this.setState({arrs: joined});
        }
        console.log(this.state.arrs)
    }
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
    componentWillUnmount() {
        localStorage.setItem('someSavedState', JSON.stringify(this.state))
      }
    render(){
        console.log(this.state.arrs)
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