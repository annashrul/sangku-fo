import React,{Component} from 'react';
import How from './howitworks'
import Fade from 'react-reveal/Fade';

class About extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return(
            <section id="about">
                <div className="row about-intro">
                    <div className="col-four">
                    <h1 className="intro-header">{this.props.data===undefined?'':this.props.data.title}</h1>
                    </div>
                    <div className="col-eight">
                        <Fade top>
                            <p className="lead" dangerouslySetInnerHTML={{ __html: this.props.data===undefined?'':this.props.data.deskripsi }} >
                            </p>
                        </Fade>
                    </div>                       
                </div>
                <How
                    data={this.props.howto}
                />
                
            </section>

        );
    }
}

export default About;