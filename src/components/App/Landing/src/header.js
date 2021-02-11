import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom"


class Header extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            path:'/'
        };
        this.onClickMenu=this.onClickMenu.bind(this)
    }

    onClickMenu(e){
        e.preventDefault();
        this.setState({
            isOpen:!this.state.isOpen,
            home:true,
            about:false,
            pricing:false,
            testimonials:false,
            download:false,
        })
    }
    componentDidMount(){
        this.setState({
            path: this.props.location.pathname
        });
    }

    render(){
        return(
            <header id="header" className="row">   
                <div className="header-logo" style={{background: `url("${this.props.logo}") no-repeat center`,backgroundSize: '100%'}}>
                    <a href={this.state.path==='/'?'#home':'/'}>{this.props.title}</a>
                </div>
                <nav id="header-nav-wrap" style={this.state.isOpen?{display:'block'}:{display:'none'}}>
                    <ul className="header-main-nav">
                    <li className="current"><a className="smoothscroll" href={this.state.path==='/'?'#home':'/'} title="home">Home</a></li>
                    <li><a className="smoothscroll" href={this.state.path==='/'?"#about":'/'} title="about">Tentang</a></li>
                    <li><a className="smoothscroll" href={this.state.path==='/'?"#pricing":'/'} title="pricing">Paket</a></li>
                    <li><a className="smoothscroll" href={this.state.path==='/'?"#testimonials":'/'} title="testimonials">Testimoni</a></li>
                    <li><a className="smoothscroll" href={this.state.path==='/'?"#download":'/'} title="download">Download</a></li>	
                    </ul>
                    {
                        this.props.isLoggedin?
                            <Link className="button button-primary cta" to={{ pathname: '/dashboard', query: { config: this.state.type } }} >Member Area &nbsp; <i className="fa fa-users font-12" /></Link>
                            :
                            <Link className="button button-primary cta" to={{ pathname: '/login', query: { config: this.state.type } }} >Sign In &nbsp; <i className="fa fa-user-circle font-12" /></Link>

                    }
                </nav>
                <a className="header-menu-toggle" href="#" onClick={(e)=>this.onClickMenu(e)}><span>Menu</span></a>    	
            </header> 
        );
    }
}

export default withRouter(Header);