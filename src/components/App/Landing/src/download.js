import React,{Component} from 'react';
import Fade from 'react-reveal/Fade';
import HeadShake from 'react-reveal/HeadShake';

class Download extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return(
            <section id="download">
                <div className="row">
                    <div className="col-full">
                        <h1 className="intro-header" data-aos="fade-up">{this.props.data===undefined?'':this.props.data.title}</h1>
                        <Fade top>
                            <p className="lead" data-aos="fade-up" dangerouslySetInnerHTML={{ __html: this.props.data===undefined?'':this.props.data.deskripsi }}>
                            </p>
                        </Fade>
                        <HeadShake>
                            <ul className="download-badges">
                                {/* <li><a href={() => false} title="" class="badge-appstore"  data-aos="fade-up">App Store</a></li> */}
                                <li><a href={ this.props.data===undefined?'':this.props.data.link} title className="badge-googleplay" data-aos="fade-up">Play Store</a></li>
                            </ul>
                        </HeadShake>
                    </div>
                </div>
            </section>

        );
    }
}

export default Download;