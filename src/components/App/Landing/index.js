import React,{Component} from 'react';
import {connect} from "react-redux";
import Header from './src/header'
import Home from './src/home'
import About from './src/about'
import Pricing from './src/pricing'
import Testi from './src/testi'
import Download from './src/download'
import Footer from './src/footer'
// import { Helmet } from "react-helmet";
import {HEADERS} from 'redux/actions/_constants'
import {FetchSite} from 'redux/actions/site.action'
import Preloader from 'Preloader'
// import {isMobile} from 'react-device-detect';
// import Swal from "sweetalert2";

class Landing extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            load:true
        }
        
    }
    componentWillMount(){
        this.props.dispatch(FetchSite())
    }

    componentDidMount(){
        this.initFetch(false);
    }

    initFetch(check){
        document.getElementsByTagName('body')[0].style.zoom = '100%';
        document.getElementsByTagName('body')[0].style.background = '#141515';
        var head = document.getElementsByTagName('head')[0];
        var cssnode = document.createElement('link');

        cssnode.type = 'text/css';
        cssnode.rel = 'stylesheet';
        cssnode.href = '/landing/css/main.css';

        head.appendChild(cssnode);
        var cssnode2 = document.createElement('link');

        cssnode2.type = 'text/css';
        cssnode2.rel = 'stylesheet';
        cssnode2.href = '/landing/css/base.css';

        head.appendChild(cssnode2);
        fetch(HEADERS.URL + `auth/config`)
        .then(res => res.json())
        .then(
            (data) => {
                localStorage.setItem("configType",data.result.type)
                // document.title = `${data.result.title}`;
                setTimeout(function () {
                        this.setState({
                            type: data.result.type,
                            load: false
                        })
                }.bind(this), 500)
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    componentWillUnmount(){
        document.getElementsByTagName('body')[0].style.zoom='90%';
        document.getElementsByTagName('body')[0].style.background = '#f9fafb';

        document.querySelector("link[href='/landing/css/main.css']").remove()
        document.querySelector("link[href='/landing/css/base.css']").remove()
    }

    render(){
        return(
            <div>
                
               
           {
               this.props.isloading? (
                <Preloader/>
            ): this.state.load?(
                <Preloader/>
            ):(
                <div>
                    <Header 
                        isLoggedin={this.props.auth.isAuthenticated}
                        logo={this.props.sites.logo}
                        title={this.props.sites.title}
                    />
                    <Home
                        title={this.props.sites.title}
                        data={this.props.sites.header}
                        social_media = {
                            this.props.sites.social_media
                        }

                    />
                    
                    <About
                        data={this.props.sites.about}
                        howto={this.props.sites.howto}
                    />
                    <Pricing
                        data={this.props.sites.paket}
                    />
                    <Testi
                        data={this.props.sites.testimoni}
                    />
                    <Download
                        data={this.props.sites.download}
                    />
                    <Footer
                        logo={this.props.sites.logo}
                        title={this.props.sites.title}
                        address={this.props.sites.address}
                        email={this.props.sites.email}
                        no_telp={this.props.sites.no_telp}
                        fax={this.props.sites.fax}
                        legalitas={this.props.sites.legalitas}
                        social_media={this.props.sites.social_media}
                    />
                </div>
            )
}

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        sites: state.siteReducer.data,
        isloading: state.siteReducer.isLoading
    }
}


export default connect(mapStateToProps)(Landing);