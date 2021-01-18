import React,{Component} from 'react';
import moment from 'moment'

class Footer extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        return(
            <footer>
                <div className="footer-main">
                    <div className="row">  
                    <div className="col-three md-1-3 tab-full footer-info">            
                        <div className="footer-logo" />
                        <ul className="footer-social-list">
                            <li>
                                <a href={() => false}><i className="fa fa-facebook-square" /></a>
                            </li>
                            <li>
                                <a href={() => false}><i className="fa fa-twitter" /></a>
                            </li>
                            <li>
                                <a href={() => false}><i className="fa fa-behance" /></a>
                            </li>
                            <li>
                                <a href={() => false}><i className="fa fa-dribbble" /></a>
                            </li>
                            <li>
                                <a href={() => false}><i className="fa fa-instagram" /></a>
                            </li>
                        </ul>

                    </div> {/* end footer-info */}
                    <div className="col-three md-1-3 tab-1-2 mob-full footer-contact">
                        <h4>Contact</h4>
                        <p style={{color: 'rgba(255, 255, 255, 0.25)'}}>
                        Bandung Trade Mall Blok C1 No.32, Babakan Surabaya, Kiaracondong, Bandung City, West Java 40272		        
                        </p>
                        <br/>
                        <p style={{color: 'rgba(255, 255, 255, 0.25)'}}>
                        someone@dazzlesite.com <br />
                        Phone: (+63) 555 1212 <br />
                        Fax: (+63) 555 0100    
                        </p>                    
                    </div> {/* end footer-contact */}  
                    <div className="col-two md-1-3 tab-1-2 mob-full footer-site-links">
                        <h4>Site Links</h4>
                        <ul className="list-links">
                        <li><a href={() => false}>Home</a></li>
                        <li><a href={() => false}>About Us</a></li>
                        <li><a href={() => false}>Blog</a></li>
                        <li><a href={() => false}>FAQ</a></li>
                        <li><a href={() => false}>Terms</a></li>
                        <li><a href={() => false}>Privacy Policy</a></li>
                        </ul>	      		
                    </div> {/* end footer-site-links */} 
                    <div className="col-four md-1-2 tab-full footer-subscribe">
                        <h4>Legalitas</h4>
                        <p style={{color: 'rgba(255, 255, 255, 0.25)'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div> {/* end footer-subscribe */}         
                    </div> {/* /row */}
                </div> {/* end footer-main */}
                <div className="footer-bottom">
                    <div className="row">
                    <div className="col-twelve">
                        <div className="copyright">
                        <span>© Copyright Sangqu {moment().format('YYYY')}.</span> 
                        <span>Design by <a href="http://www.styleshout.com/" style={{color: 'rgba(255, 255, 255, 0.25)'}}>styleshout</a></span>		         	
                        </div>
                        <div id="go-top">
                        <a className="smoothscroll" title="Back to Top" href="#top"><i className="icon-arrow-up" /></a>
                        </div>         
                    </div>
                    </div> {/* end footer-bottom */}     	
                </div>
            </footer>


        );
    }
}

export default Footer;