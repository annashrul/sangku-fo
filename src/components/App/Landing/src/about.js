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
                    <h1 className="intro-header">Tentang Kami</h1>
                    </div>
                    <div className="col-eight">
                        <Fade top>
                            <p className="lead">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos laboriosam totam harum autem quas facilis nihil nulla quos sunt explicabo sequi ipsum molestias voluptates quasi nesciunt quia animi, molestiae est. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae labore ullam amet sit velit id temporibus, praesentium dolore voluptatem tenetur officia recusandae qui! Obcaecati, quibusdam omnis libero a similique harum.
                            </p>
                        </Fade>
                    </div>                       
                </div>
                <How/>
                
            </section>

        );
    }
}

export default About;