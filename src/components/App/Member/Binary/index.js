import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
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
             ]
        };
    }
    getCurrent = (node) => this.state.arr.filter(cNode => cNode.parent_id === node).map(cNode => (
        <div key={`node_${cNode.id}`} className={`node-${cNode.pos}-item binary-level-width-50`}>
            <span className={`binary-hr-line binar-hr-line-${cNode.pos} binary-hr-line-width-25`} style={{display: cNode.parent_id===null?'none':''}}/>
            {cNode.detail===null?
                <div className={`node-item-1-child-${cNode.pos}`} onClick={(e)=>this.addNew(e,cNode)}>
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
            <div className={`node-item-1-child-${cNode.pos} ${cNode.hasChild?'node-item-root':''}`}>
                <div className="binary-node-single-item user-block user-12"><div className="images_wrapper"><img className="profile-rounded-image-small" style={{borderColor: '#ccc'}} src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE" width={70} height={70} alt="dexaxe" title="dexaxe" /></div>
                    <span className="wrap_content ">ID : {cNode.id} | PID : {cNode.parent_id}</span>
                </div>
                {/* <div id="btn-default" className="last_level_user" ><i id="fa-2x-42" className="fa fa-plus-circle fa-2x" /></div> */}
            </div>
            }
            <div className="parent-wrapper clearfix">
                {this.getCurrent(cNode.id)}
            </div>
        </div>
    ))

    addNew(e,data){
        e.preventDefault();
        alert(JSON.stringify(data))
    }
    render(){
        return (
            <Layout page="Binary">
                <div className="col-12">
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
                </div>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        // users:state.usersReducer.data,
        // isLoading2: state.usersReducer.isLoading,
        // userLevel:state.userLevelReducer.data,
        // isLoading3: state.userLevelReducer.isLoading,
        auth: state.auth

    }
}

export default connect(mapStateToProps)(Binary)