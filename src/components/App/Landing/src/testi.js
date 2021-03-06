import React, { Component } from 'react';
// import Fade from 'react-reveal/Fade';
// import HeadShake from 'react-reveal/HeadShake';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Testimoni extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,

        };
        return (
            <section id="testimonials">
                <div className="row">
                    <div className="col-twelve">
                        <h1 className="intro-header">Apa Kata Mereka.</h1>
                    </div>
                </div>
                <Slider {...settings}>
                    {
                        this.props.data !== undefined ?
                            this.props.data.map((item, index) => {
                                return (
                                    <div id="testimonial-slider" >
                                        <div className="row owl-wrap" >
                                            <div className="owl-carousel">
                                                <p style={{ paddingTop: '30px', paddingBottom: '20px' }}>
                                                    {item.caption.replace(/<[^>]*>?/gm, '')}
                                                </p>
                                                {item.video === '-' ? '' : <a href={item.video} className="button stroke"><i className="fa fa-play" aria-hidden="true"></i>&nbsp;</a>}
                                                <div className="testimonial-author">
                                                    <img src={item.picture} alt={item.writer} />
                                                    <div className="author-info">
                                                        {item.writer}
                                                        <span className="position">{item.jobs}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : ''
                    }
                </Slider>
            </section>

        );
    }
}

export default Testimoni;