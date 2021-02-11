import React,{Component} from 'react';
import Fade from 'react-reveal/Fade';


class About extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return(
            <div className="row about-how">
                <h1 className="intro-header" style={{margin:'0 auto'}}>{this.props.data===undefined?'':this.props.data.title}</h1>   
                 <Fade top>
                    <p className="lead mt-3 howit" dangerouslySetInnerHTML={{ __html: this.props.data===undefined?'':this.props.data.deskripsi }} >
                    </p>
                </Fade>        
                    <Fade top>
                        <div className="row">
                            {
                                this.props.data!==undefined?
                                    this.props.data.data.map((item,index)=>{
                                        return(
                                            <div key={index} className="col-12 col-xs-12 col-sm-6 col-md-4 mt-4 pt-2">
                                                <div className="card work-process border-0 text-center rounded shadow pricing-rates">
                                                <div className="card-body">
                                                    <img src={item.image} className="avatar avatar-small mb-3" alt={item.title} />
                                                    <h4 className="title">{item.title}</h4>
                                                    <p className="text-muted para">
                                                    {item.deskripsi} </p>
                                                    <ul className="list-unstyled d-flex justify-content-between mb-0 mt-2">
                                                    <li className="step h1 mb-0 font-weight-bold">Step 0{index+1}.</li>
                                                    <li className="step-icon"><i className="mdi mdi-chevron-double-right mdi-36px" /></li>
                                                    </ul>
                                                </div>
                                                </div>
                                            </div>
                                        )
                                    })                            
                                :''
                            }
                           
                        </div>

                    </Fade>
            </div>
        );
    }
}

export default About;