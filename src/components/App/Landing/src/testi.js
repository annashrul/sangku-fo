import React,{Component} from 'react';
import Fade from 'react-reveal/Fade';
import HeadShake from 'react-reveal/HeadShake';


class Testimoni extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return(
            <section id="testimonials">
                <div className="row">
                    <div className="col-twelve">
                    <h1 className="intro-header">Apa Kata Mereka.</h1>
                    </div>   		
                </div>   	
                <div className="row owl-wrap">
                    <div id="testimonial-slider">
                    <div className="slides owl-carousel">
                        <Fade top>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus expedita quo illo eos reiciendis, fuga neque animi corporis eligendi vero tempore soluta quod quisquam et quibusdam temporibus iure? Quos, tenetur.
                            </p> 
                            <a href={() => false} className="button stroke"><i class="fa fa-play" aria-hidden="true"></i>&nbsp;</a>
                        </Fade>
                        <HeadShake>
                            <div className="testimonial-author">
                                <img src="http://192.168.100.10:3010/images/member/default.png" alt="sangqu" />
                                <div className="author-info">
                                Tatang
                                <span className="position">Wiraswasta.</span>
                                </div>
                            </div>                 
                        </HeadShake>
                    </div> {/* end slides */}
                    </div> {/* end testimonial-slider */}         
                </div> {/* end flex-container */}
            </section>

        );
    }
}

export default Testimoni;