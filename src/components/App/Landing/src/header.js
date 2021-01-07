import React,{Component} from 'react';
import { Link } from 'react-router-dom';


class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
    }

    render(){
        console.log(this.props.isLoggedin);
        return(
            <header id="header" className="row">   
                <div className="header-logo">
                    <a href="#home">Sangqu</a>
                </div>
                <nav id="header-nav-wrap">
                    <ul className="header-main-nav">
                    <li className="current"><a className="smoothscroll" href="#home" title="home">Home</a></li>
                    <li><a className="smoothscroll" href="#about" title="about">Tentang</a></li>
                    <li><a className="smoothscroll" href="#pricing" title="pricing">Paket</a></li>
                    <li><a className="smoothscroll" href="#testimonials" title="testimonials">Testimoni</a></li>
                    <li><a className="smoothscroll" href="#download" title="download">Download</a></li>	
                    </ul>
                    {
                        this.props.isLoggedin?
                            <Link className="button button-primary cta" to={{ pathname: '/dashboard', query: { config: this.state.type } }} >Member Area &nbsp; <i className="fa fa-users font-12" /></Link>
                            :
                            <Link className="button button-primary cta" to={{ pathname: '/login', query: { config: this.state.type } }} >Sign In &nbsp; <i className="fa fa-user-circle font-12" /></Link>

                    }
                </nav>
                <a className="header-menu-toggle" href="#"><span>Menu</span></a>    	
            </header> 
        );
    }
}

export default Header;