import React,{Component} from 'react';
// import How from './howitworks'
import Fade from 'react-reveal/Fade';

class Content extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return(
            <section id="content-pages">
                <Fade>
                    <div className="row add-bottom" style={{maxWidth:'900px'}}>
                        <div className="col-twelve tab-full">
                        <p className="lead" dangerouslySetInnerHTML={{ __html: this.props.data===undefined?'':this.props.data }}></p>   			
                        </div>
                    </div>
                </Fade>
            </section>
        );
    }
}

export default Content;