import React,{Component} from 'react';
import Layout from "../../../Layout";
import connect from "react-redux/es/connect/connect";
// import jQuery from 'jquery';
class Sponsor extends Component{
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
                   "detail":{"name":"Mobiles"},
                   "hasChild":true,
                },
                {
                   "id":30,
                   "parent_id":25,
                   "detail":{"name":"Mobiles"},
                   "hasChild":false,
                },
                {
                   "id":26,
                   "parent_id":25,
                   "detail":{"name":"Mobile Phones accessories"},
                   "hasChild":true,
                },
                {
                   "id":34,
                   "parent_id":25,
                   "detail":{"name":"Mobile Phones accessories"},
                   "hasChild":false,
                },
                {
                   "id":35,
                   "parent_id":25,
                   "detail":{"name":"Mobile Phones accessories"},
                   "hasChild":false,
                },
                {
                   "id":36,
                   "parent_id":25,
                   "detail":{"name":"Mobile Phones accessories"},
                   "hasChild":false,
                },
                {
                   "id":37,
                   "parent_id":25,
                   "detail":{"name":"Mobile Phones accessories"},
                   "hasChild":false,
                },
                {
                   "id":27,
                   "parent_id":26,
                   "detail":{"name":"Computer & Laptop"},
                   "hasChild":true,
                },
                {
                   "id":31,
                   "parent_id":27,
                   "detail":null,
                   "hasChild":true,
                },
                {
                   "id":41,
                   "parent_id":31,
                   "detail":null,
                   "hasChild":false,
                },
                {
                   "id":42,
                   "parent_id":31,
                   "detail":null,
                   "hasChild":false,
                },
                {
                   "id":43,
                   "parent_id":31,
                   "detail":null,
                   "hasChild":false,
                },
                {
                   "id":39,
                   "parent_id":29,
                   "detail":null,
                   "hasChild":false,
                },
                {
                   "id":40,
                   "parent_id":29,
                   "detail":null,
                   "hasChild":false,
                },
                {
                   "id":32,
                   "parent_id":29,
                   "detail":null,
                   "hasChild":false,
                },
                {
                   "id":33,
                   "parent_id":29,
                   "detail":null,
                   "hasChild":false,
                },
                {
                   "id":28,
                   "parent_id":27,
                   "detail":{"name":"Laptops"},
                   "hasChild":false,
                },
                {
                   "id":29,
                   "parent_id":26,
                   "detail":{"name":"Mobiles Phone"},
                   "hasChild":true,
                }
             ]
        };
    }
    getCurrent = (node) => this.state.arr.filter(cNode => cNode.parent_id === node).map(cNode => (
        <li key={`node_${cNode.id}`}>
            <div className="eps-nc" nid={12}>
                <div className="usr-pic">
                    <img src="https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/user-profile-images/business-man-1.jpg?itok=zhxmnAkU"
                        className="img" /> </div>
                <div className="usr-name">{cNode.detail===null?'Unknown':cNode.detail.name}</div>
                <div className="usr-popup">
                    <div className="popup-loader">
                        <div className="loader loader-bar" />
                    </div>
                </div>
            </div>
            {cNode.hasChild?
            <ul>
                {this.getCurrent(cNode.id)}
            </ul>
            :''}
        </li>
    ))

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
            if (new_style != undefined) {
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
            if (new_style != undefined) {
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
            if (new_style != undefined) {
                document.querySelector('.eps-sponsor-tree.eps-tree').style.transform =  new_style;
                document.querySelector('.eps-sponsor-tree.eps-tree').setAttribute('zoom', i);
            }
        }
    }
    render(){
        return (
            <Layout page="Sponsor">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            {/* ========================================================= */}

                            <div id="block-system-main" className="block block-system clearfix">
                                <div className="binary-genealogy-tree binary_tree_extended">
                                    <div className="zoom-wrapper m-t-lg m-b-lg">
                                        <ul className="zoom-lists">
                                            <li><button className="btn btn-primary btn-circle m-1" onClick={(e)=>this.setSize(e,'zoom-in')}><i className="fa fa-search-plus"/></button></li>
                                            <li><button className="btn btn-primary btn-circle m-1" onClick={(e)=>this.setSize(e,'zoom-out')}><i className="fa fa-search-minus"/></button></li>
                                            <li><button className="btn btn-primary btn-circle m-1" onClick={(e)=>this.setSize(e,'default')}><i className="fa fa-refresh"/></button></li>
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
                            </div>

                            {/* ====================================================== */}
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

export default connect(mapStateToProps)(Sponsor)