import React,{Component} from 'react'
import Skeleton from 'react-loading-skeleton';

class Cards extends Component {
    render(){
        // let dataID = [];
        return(
            <div>
                 {
                    (() => {
                        const rows = [];
                        for (let i = 0; i < 2; i++) {
                            let status=<Skeleton width="80px"/>;
                            rows.push(
                            <div key={i} className="card" style={{borderRadius:"10px",marginBottom:"10px"}}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <span className={"black"} style={{fontWeight:"normal"}}><Skeleton width="150px"/></span>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-9" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                            <p style={{color:"rgb(66, 181, 73)",fontWeight:"900"}}>
                                                <span className={"black"} style={{fontWeight:"bolder"}}><Skeleton width="100px"/></span><br/>
                                                <Skeleton width="150px"/>
                                            </p>
                                        </div>
                                        <div className="col-md-3" style={{verticalAlign:"left"}}>
                                            <p className={"black"}>
                                                <Skeleton width="100px"/><br/>
                                                <Skeleton width="100px"/>
                                            </p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-4" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                            <div className="media">
                                                <div style={{height:'70px',width:'70px',marginRight:'20px'}}>
                                                    <Skeleton width = '70px' height='70px'/>
                                                </div>
                                                <div className="media-body">
                                                    <h5 style={{color:"rgb(66, 181, 73)"}} className="mt-0 font-17 bold"><Skeleton width="150px"/></h5>
                                                    <span style={{color:"black",fontWeight:"bold"}}><Skeleton width="100px"/></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 style={{color:"rgb(66, 181, 73)"}} className="mt-0 font-17 bold"><Skeleton width="100px"/></h5>
                                                    <span style={{color:"rgb(250, 89, 29)",fontWeight:"bold"}}>{status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="media">
                                                <div className="media-body">
                                                    <Skeleton style={{marginTop:'20px',float:"right"}} width="80px" height='30px'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                        }
                        return rows;
                    })()
                }
            </div>
        )
    }
}

export default Cards