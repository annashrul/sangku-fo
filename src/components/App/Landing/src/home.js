import React,{Component} from 'react';
import Iphone from './iphone.png'
import HeadShake from 'react-reveal/HeadShake';
import Flip from 'react-reveal/Flip';


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return(
            <section id="home">
                <div className="overlay" />
                <div className="home-content">        
                    <div className="row contents">                     
                    <div className="home-content-left">
                        <h3>Selamat datang di Sangqu</h3>
                        <h1>
                        Sangqu <br />
                        Tag line space <br />
                        Here.
                        </h1>
                        <HeadShake>
                            <div className="buttons">
                                <a href="#download" className="smoothscroll button stroke">
                                    <span className="icon-circle-down" aria-hidden="true" />
                                    Download Aplikasi
                                </a>
                                {/* <a href="http://player.vimeo.com/video/14592941?title=0&amp;byline=0&amp;portrait=0&amp;color=39b54a" data-lity class="button stroke">
                                            <span class="icon-play" aria-hidden="true"></span>
                                            Watch Video
                                        </a> */}
                            </div>                                         
                        </HeadShake>
                    </div>
                    <div className="home-image-right">
                        <Flip left>
                            <img src={Iphone}  />
                        </Flip>
                    </div>
                    </div>
                </div> {/* end home-content */}
                <ul className="home-social-list">
                    <li>
                    <a href="#"><i className="fa fa-facebook-square" /></a>
                    </li>
                    <li>
                    <a href="#"><i className="fa fa-twitter" /></a>
                    </li>
                    <li>
                    <a href="#"><i className="fa fa-instagram" /></a>
                    </li>
                    <li>
                    <a href="#"><i className="fa fa-youtube-play" /></a>
                    </li>
                </ul>
                {/* end home-social-list */}
                <div className="home-scrolldown">
                    <a href="#about" className="scroll-icon smoothscroll">
                    <span>Scroll Down</span>
                    <i className="icon-arrow-right" aria-hidden="true" />
                    </a>
                </div>
            </section>

        );
    }
}

export default Home;