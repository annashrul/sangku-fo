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
                        <div className="footer-logo" style={{background: `url("${this.props.logo}") no-repeat center`,backgroundSize: '100%'}}/>

                        <ul className="footer-social-list">
                            <li>
                            <a href={this.props.social_media===undefined?'':this.props.social_media.fb}><i className="fa fa-facebook-square" /></a>
                            </li>
                            <li>
                            <a href={this.props.social_media===undefined?'':this.props.social_media.tw}><i className="fa fa-twitter" /></a>
                            </li>
                            <li>
                            <a href={this.props.social_media===undefined?'':this.props.social_media.ig}><i className="fa fa-instagram" /></a>
                            </li>
                            <li>
                            <a href={this.props.social_media===undefined?'':this.props.social_media.yt}><i className="fa fa-youtube-play" /></a>
                            </li>
                        </ul>

                    </div> {/* end footer-info */}
                    <div className="col-three md-1-3 tab-1-2 mob-full footer-contact">
                        <h4>Contact</h4>
                        <p style={{color: 'rgba(255, 255, 255, 0.25)'}}>
                        {this.props.address}	        
                        </p>
                        <br/>
                        <p style={{color: 'rgba(255, 255, 255, 0.25)'}}>
                        {this.props.email} <br />
                        Phone: {this.props.no_telp} <br />
                        {this.props.fax!=='-'?'Fax: '+this.props.fax:''}    
                        </p>                    
                    </div> {/* end footer-contact */}  
                    <div className="col-two md-1-3 tab-1-2 mob-full footer-site-links">
                        <h4>Site Links</h4>
                        <ul className="list-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">Tentang Kami</a></li>
                        <li><a href="#pricing">Paket</a></li>
                        <li><a href="#testimonials">Testimoni</a></li>
                        <li><a href="/terms-and-condition">Terms and Conditions</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        </ul>	      		
                    </div> {/* end footer-site-links */} 
                    <div className="col-four md-1-2 tab-full footer-subscribe">
                        <h4>Legalitas</h4>
                        <p style={{color: 'rgba(255, 255, 255, 0.25)'}} dangerouslySetInnerHTML={{ __html: this.props.legalitas===undefined?'':this.props.legalitas }} ></p>
                    </div> {/* end footer-subscribe */}         
                    </div> {/* /row */}
                </div> {/* end footer-main */}
                <div className="footer-bottom">
                    <div className="row">
                    <div className="col-twelve">
                        <div className="copyright">
                        <span>© Copyright {this.props.title} {moment().format('YYYY')}.</span> 
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