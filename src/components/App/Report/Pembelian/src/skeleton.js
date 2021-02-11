import Skeleton from 'react-loading-skeleton';
import React,{Component} from 'react'

class Skeletons extends Component {

    constructor(props) {
        super(props)
    }

    render(){
        return(
            
            <div>
                {
                    (() => {
                        const rows = [];
                        for (let i = 0; i < 2; i++) {
                            rows.push(
                                <div key={i} className="card" style={{borderRadius:"10px",marginBottom:"10px"}}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-3" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                <p style={{color:"rgb(66, 181, 73)",fontWeight:"bold"}}><Skeleton width={'50%'}/><br/>
                                                    <span className={"black"} style={{fontWeight:"normal"}}><Skeleton/></span><br/>

                                                </p>
                                            </div>
                                            <div className="col-md-2" style={{verticalAlign:"left",borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                    <span className={"bold"}><Skeleton/></span>
                                                </p>
                                            </div>
                                            <div className="col-md-2" style={{verticalAlign:"left",borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                    <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                </p>
                                            </div>
                                            <div className="col-md-5" style={{verticalAlign:"left"}}>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                            <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                            <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                            <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                            <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-6" style={{borderRight:"1px solid rgba(0,0,0,.1)"}}>
                                                <div className="media">
                                                    <Skeleton height={70} width={70}/>
                                                    <div className="media-body" style={{marginLeft:"10px"}}>
                                                        <span style={{color:"rgb(250, 89, 29)"}}><Skeleton width={'100%'}/></span><br/>
                                                        <span style={{color:"rgb(250, 89, 29)"}}><Skeleton width={'50%'}/></span><br/>
                                                        <span style={{color:"rgb(250, 89, 29)"}}><Skeleton width={'30%'}/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <p className={"black"}><Skeleton width={'50%'}/><br/>
                                                    <span className={"bold"} style={{color:"rgb(250, 89, 29)"}}><Skeleton/></span>
                                                </p>
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

export default Skeletons