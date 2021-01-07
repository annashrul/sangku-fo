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
                        <h1 className="intro-header" data-aos="fade-up">Dapatkan Aplikasi Sangqu !</h1>
                        <Fade top>
                            <p className="lead" data-aos="fade-up">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            </p>
                        </Fade>
                        <HeadShake>
                            <ul className="download-badges">
                                {/* <li><a href="#" title="" class="badge-appstore"  data-aos="fade-up">App Store</a></li> */}
                                <li><a href="#" title className="badge-googleplay" data-aos="fade-up">Play Store</a></li>
                            </ul>
                        </HeadShake>
                    </div>
                </div>
            </section>

        );
    }
}

export default Download;