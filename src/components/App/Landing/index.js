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
import Preloader from 'Preloader'
class Landing extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            load:true
        }
        
    }
    componentWillMount(){
        
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
                {/* <Helmet link={[
                    {
                        "rel": "stylesheet", 
                        "href": "/landing/css/main.css"
                    }, {
                        "rel": "stylesheet",
                        "href": "/landing/css/base.css"
                    }
                ]}
                /> */}
           { this.state.load?(
                <Preloader/>
            ):(
                <div>
                    <Header 
                        isLoggedin={this.props.auth.isAuthenticated}
                    />
                    <Home/>
                    <About/>
                    <Pricing/>
                    <Testi/>
                    <Download/>
                    <Footer/>
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
    }
}


export default connect(mapStateToProps)(Landing);