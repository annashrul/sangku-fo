import React,{Component} from 'react';
import Shake from 'react-reveal/Shake';
import Fade from 'react-reveal/Fade';

class Pricing extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return(
            <section id="pricing">
                <div className="row pricing-content">
                    <div className="col-four pricing-intro">
                    <Fade top>
                        <h1 className="intro-header" data-aos="fade-up">Beragam Pilihan Paket</h1>
                        <p data-aos="fade-up">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus fuga minima, unde quos quasi sint modi labore placeat facilis vel iste, hic accusamus id corporis vitae voluptate doloremque, harum perferendis!
                        </p>
                    </Fade>
                    </div>
                    <div className="col-eight pricing-table">
                    <div className="row">
                        <Shake>
                            <div className="col-md-4 p-md-0">
                            {/* BEGIN TABLE */}
                            <div className="table-default table2 blue">
                                {/* BEGIN TABLE HEADER */}
                                <div className="table__header">
                                {/* <h2 className="table__header--title">Silver</h2> */}
                                <img className="table__header--icon" src="http://ptnetindo.com:6694/badge/silver.png" alt="Basic Icon" />
                                <p data-price={120} className="table__header--price">
                                    Rp 150.000
                                </p>
                                </div>
                                {/* END TABLE HEADER */}
                                <div className="table__content">
                                {/* BEGIN TABLE LIST */}
                                <ul className="table__content--list">
                                    <li>Limited Times Marketing</li>
                                    <li>500 Anylytics Campaings</li>
                                    <li>250,000 crawled Page</li>
                                    <li className="muted">Unlimited Updates</li>
                                    <li className="muted">Free Website Design</li>
                                </ul>
                                {/* END TABLE LIST */}
                                </div>
                                {/* BEGIN TABLE FOOTER */}
                                <div className="table__footer">
                                <a href="#" className="button">Get Started</a>
                                </div>
                                {/* END TABLE FOOTER */}
                            </div>
                            {/* END TABLE */}
                            </div>
                            <div className="col-md-4 p-md-0" style={{zIndex:1}}>
                            {/* BEGIN TABLE */}
                            <div className="table-default table2 recommended cyan" >
                                {/* BEGIN TABLE HEADER */}
                                <div className="table__header">
                                {/* <h2 className="table__header--title">Gold</h2> */}
                                <img className="table__header--icon" src="http://ptnetindo.com:6694/badge/gold.png" alt="Standard Icon" />
                                <p data-price={250} className="table__header--price">
                                    Rp 350.000
                                </p>
                                </div>
                                {/* END TABLE HEADER */}
                                <div className="table__content">
                                {/* BEGIN TABLE LIST */}
                                <ul className="table__content--list">
                                    <li>Limited Times Marketing</li>
                                    <li>500 Anylytics Campaings</li>
                                    <li>250,000 crawled Page</li>
                                    <li>Unlimited Updates</li>
                                    <li className="muted">Free Website Design</li>
                                </ul>
                                {/* END TABLE LIST */}
                                </div>
                                {/* BEGIN TABLE FOOTER */}
                                <div className="table__footer">
                                <a href="#" className="button">Get Started</a>
                                </div>
                                {/* END TABLE FOOTER */}
                            </div>
                            {/* END TABLE */}
                            </div>
                            <div className="col-md-4 p-md-0">
                            {/* BEGIN TABLE */}
                            <div className="table-default table2 yellow">
                                {/* BEGIN TABLE HEADER */}
                                <div className="table__header">
                                {/* <h2 className="table__header--title">Platinum</h2> */}
                                <img className="table__header--icon" src="http://ptnetindo.com:6694/badge/platinum.png" alt="Premium Icon" />
                                <p data-price={520} className="table__header--price">
                                    Rp 550.000
                                </p>
                                </div>
                                {/* END TABLE HEADER */}
                                <div className="table__content">
                                {/* BEGIN TABLE LIST */}
                                <ul className="table__content--list">
                                    <li>Limited Times Marketing</li>
                                    <li>500 Anylytics Campaings</li>
                                    <li>250,000 crawled Page</li>
                                    <li>Unlimited Updates</li>
                                    <li>Free Website Design</li>
                                </ul>
                                {/* END TABLE LIST */}
                                </div>
                                {/* BEGIN TABLE FOOTER */}
                                <div className="table__footer">
                                <a href="#" className="button">Get Started</a>
                                </div>
                                {/* END TABLE FOOTER */}
                            </div>
                            {/* END TABLE */}
                            </div>
                        </Shake>
                       
                    </div>             
                    </div> {/* end pricing-table */}
                </div> {/* end pricing-content */}
                </section>

        );
    }
}

export default Pricing;